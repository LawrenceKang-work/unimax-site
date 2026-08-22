/* 扫描 <lang>/guides/<slug>/index.html 这类已生成的译文页,把 sitemap.xml 里缺的 URL
 * 补上(只加不删、已存在的不重复)。today 传入今天日期(YYYY-MM-DD),因为脚本环境里
 * new Date() 不可用(见 CLAUDE.md Workflow 那条限制,这里虽不是 workflow 但同样规矩:
 * 不在脚本里读系统时间,固定由调用者传入,保证可复现)。
 *
 *   node scripts/sync-sitemap-guides.js 2026-08-22
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://unimaxofficial.com';
const LANGS = ['zh', 'ms', 'pl', 'nl', 'de'];

const today = process.argv[2];
if (!today || !/^\d{4}-\d{2}-\d{2}$/.test(today)) {
  console.error('用法: node scripts/sync-sitemap-guides.js YYYY-MM-DD');
  process.exit(1);
}

const guidesDir = path.join(ROOT, 'guides');
const slugs = fs.readdirSync(guidesDir).filter(d => fs.existsSync(path.join(guidesDir, d, 'index.html')));

const sitemapPath = path.join(ROOT, 'sitemap.xml');
let xml = fs.readFileSync(sitemapPath, 'utf8');

let added = 0;
for (const slug of slugs) {
  for (const lang of LANGS) {
    const file = path.join(ROOT, lang, 'guides', slug, 'index.html');
    if (!fs.existsSync(file)) continue;
    const loc = `${ORIGIN}/${lang}/guides/${slug}/`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    xml = xml.replace('</urlset>', entry + '</urlset>');
    added++;
    console.log('+ ' + loc);
  }
}

if (added) {
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`\n共补 ${added} 条,已写回 sitemap.xml`);
} else {
  console.log('没有需要补的 URL');
}
