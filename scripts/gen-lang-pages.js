/* UniMax 多语言静态页生成器
 *
 * 从根目录 index.html + app.js 的 I18N/FAQ 字典，烧录出 /zh/ /ms/ /pl/ /nl/ /de/ 五个语言页。
 * 一次性工具,不进站点运行时;repo 保持零依赖零构建。
 *
 * 关键约束:
 *  - applyLang() 用 el.textContent 写译文,故译文是纯文本 → 写回 HTML 时必须转义。
 *  - data-i18n 属性必须保留:客改层(editor.js/worker)拿它当发布锚点 key。
 *  - 语言页在子目录,所有相对资源路径要改成绝对路径,否则 /de/assets/... 404。
 *  - header 语言菜单与移动抽屉改成真实 <a href>,让爬虫能发现其它语言页、无 JS 也能切换。
 *  - 注入 window.__PAGE_LANG__,app.js 据此跳过 applyLang(否则会把烧录好的译文刷回英文)。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const LANGS = ['zh', 'ms', 'pl', 'nl', 'de'];
const DOC_LANG = { en: 'en', zh: 'zh-Hans', ms: 'ms', nl: 'nl', de: 'de', pl: 'pl' };
const LANG_LABEL = { en: 'EN', zh: '中文', ms: 'BM', nl: 'NL', de: 'DE', pl: 'PL' };
const LANG_FULL = { en: 'English', zh: '中文', ms: 'Bahasa Melayu', nl: 'Nederlands', de: 'Deutsch', pl: 'Polski' };
const HOME = { en: '/', zh: '/zh/', ms: '/ms/', nl: '/nl/', pl: '/pl/', de: '/de/' };
const HREF_LANG = { en: 'en', zh: 'zh-Hans', ms: 'ms', nl: 'nl', de: 'de', pl: 'pl' };
const ORIGIN = 'https://unimaxofficial.com';

/* head 区文案:I18N 字典里没有 title/description/OG,单独维护 */
const META = {
  zh: {
    h1: 'UNI MAX — 清真东革阿里活力饮 · 批发分销',
    // 原 26 字/377px,SERP 可用约 580px —— 补上「马来西亚」这个高意图产地词
    title: '马来西亚清真东革阿里活力饮 · 批发与分销合作 | UNI MAX',
    desc: '清真认证东革阿里植物活力饮，10 克 × 30 包。马来西亚制造 — GMP、MeSTI、ISO 9001、HACCP。欢迎批量订购与欧盟分销商洽询。',
    ogTitle: 'UNI MAX — 清真东革阿里活力饮 | 批发与分销',
    ogDesc: '含三重东革阿里的即饮植物荔枝活力饮。10 克 × 30 包，马来西亚制造。欢迎批量订购与欧盟分销商洽询。',
  },
  ms: {
    h1: 'UNI MAX — Minuman Vitaliti Tongkat Ali Halal untuk Borong',
    title: 'Minuman Vitaliti Tongkat Ali Halal — Borong | UNI MAX',
    desc: 'Minuman vitaliti Tongkat Ali halal, 10 g × 30 sachet. Dibuat di Malaysia — GMP, MeSTI, ISO 9001, HACCP. Pesanan pukal & pengedar EU dialu-alukan.',
    ogTitle: 'UNI MAX — Minuman Vitaliti Tongkat Ali Halal | Borong & Pengedaran',
    ogDesc: 'Minuman vitaliti laici botani siap minum dengan Triple Force Tongkat Ali. 10 g × 30 sachet, dibuat di Malaysia. Pesanan pukal & pertanyaan pengedar EU dialu-alukan.',
  },
  pl: {
    h1: 'UNI MAX — Napój witalny Tongkat Ali Halal do sprzedaży hurtowej',
    title: 'Napój witalny Tongkat Ali Halal — hurt | UNI MAX',
    desc: 'Halal napój witalny Tongkat Ali, 10 g × 30 saszetek. Malezja — GMP, MeSTI, ISO 9001, HACCP. Zamówienia hurtowe i zapytania dystrybutorów UE.',
    ogTitle: 'UNI MAX — Napój witalny Tongkat Ali Halal | Hurt i dystrybucja',
    ogDesc: 'Gotowy do picia botaniczny napój liczi z Triple Force Tongkat Ali. 10 g × 30 saszetek, wyprodukowano w Malezji. Zamówienia hurtowe i zapytania dystrybutorów UE mile widziane.',
  },
  nl: {
    h1: 'UNI MAX — Halal Tongkat Ali vitaliteitsdrank voor groothandel',
    title: 'Halal Tongkat Ali vitaliteitsdrank — groothandel | UNI MAX',
    desc: 'Halal Tongkat Ali vitaliteitsdrank, 10 g × 30 sachets. Gemaakt in Maleisië — GMP, MeSTI, ISO 9001, HACCP. Bulkorders en EU-distributeurs welkom.',
    ogTitle: 'UNI MAX — Halal Tongkat Ali vitaliteitsdrank | Groothandel & distributie',
    ogDesc: 'Kant-en-klare botanische lychee-vitaliteitsdrank met Triple Force Tongkat Ali. 10 g × 30 sachets, gemaakt in Maleisië. Bulkorders en aanvragen van EU-distributeurs welkom.',
  },
  de: {
    h1: 'UNI MAX — Halal Tongkat Ali Vitalitätsgetränk für den Großhandel',
    title: 'Halal Tongkat Ali Vitalitätsgetränk — Großhandel | UNI MAX',
    desc: 'Halal Tongkat-Ali-Vitalitätsgetränk, 10 g × 30 Sachets. Malaysia — GMP, MeSTI, ISO 9001, HACCP. Großbestellungen & EU-Händleranfragen willkommen.',
    ogTitle: 'UNI MAX — Halal Tongkat Ali Vitalitätsgetränk | Großhandel & Vertrieb',
    ogDesc: 'Trinkfertiges botanisches Lychee-Vitalitätsgetränk mit Triple Force Tongkat Ali. 10 g × 30 Sachets, hergestellt in Malaysia. Großbestellungen und EU-Händleranfragen willkommen.',
  },
};

/* ---------- 从 app.js 取出 I18N 与 FAQ(它们在 IIFE 闭包里,不能 require) ---------- */
function extractLiteral(src, declRegex) {
  const m = declRegex.exec(src);
  if (!m) throw new Error('未找到声明: ' + declRegex);
  const start = src.indexOf(m[0]) + m[0].length - 1;   // 停在 { 或 [
  const open = src[start];
  const close = open === '{' ? '}' : ']';
  let depth = 0, i = start, inStr = null, esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === open) depth++;
    else if (c === close) { depth--; if (depth === 0) { i++; break; } }
  }
  return src.slice(start, i);
}

const appSrc = fs.readFileSync(path.join(ROOT, 'app.js'), 'utf8');
/* I18N 已移出 app.js(那 67.8KB 对浏览器是死代码,只拖慢解析)，改从 scripts 下读取。
   FAQ 仍内联在 app.js —— renderFAQ 在运行时要用它渲染 DOM。 */
const I18N = require('./i18n-dict.js');
const FAQ = eval('(' + extractLiteral(appSrc, /var\s+FAQ\s*=\s*\[/) + ')');
console.log(`字典载入: I18N ${Object.keys(I18N).join('/')} | FAQ ${FAQ.length} 条`);

/* ---------- HTML 工具 ---------- */
const escHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = s => escHtml(s).replace(/"/g, '&quot;');

/* 在 html 中定位 openTagEnd 之后与之匹配的 </tag>,支持同名嵌套 */
function findCloseTag(html, tag, from) {
  let depth = 1, i = from;
  const openPat = '<' + tag, closePat = '</' + tag;
  while (i < html.length) {
    const o = html.indexOf(openPat, i);
    const c = html.indexOf(closePat, i);
    if (c === -1) return -1;
    // 确认是完整标签名而非前缀(<span 不该匹配 <spanx)
    const okOpen = o !== -1 && /[\s/>]/.test(html[o + openPat.length] || '');
    const okClose = /[\s>]/.test(html[c + closePat.length] || '');
    if (!okClose) { i = c + closePat.length; continue; }
    if (o !== -1 && okOpen && o < c) { depth++; i = o + openPat.length; }
    else { depth--; if (depth === 0) return c; i = c + closePat.length; }
  }
  return -1;
}

/* 把每个 [data-i18n] 元素的内容换成该语言译文(无译文则保留英文原文) */
function bakeI18n(html, lang) {
  const dict = I18N[lang] || {};
  const hits = [];
  const re = /data-i18n="([^"]+)"/g;
  let m;
  while ((m = re.exec(html)) !== null) hits.push({ key: m[1], at: m.index });

  let replaced = 0, missing = new Set();
  // 从后往前替换,避免前面的替换让后面的索引失效
  for (let k = hits.length - 1; k >= 0; k--) {
    const { key, at } = hits[k];
    const val = dict[key];
    if (val == null) { missing.add(key); continue; }

    const lt = html.lastIndexOf('<', at);
    if (lt === -1) continue;
    const tagM = /^<([a-zA-Z][\w-]*)/.exec(html.slice(lt, at));
    if (!tagM) continue;
    const tag = tagM[1];
    const gt = html.indexOf('>', at);
    if (gt === -1) continue;
    if (html[gt - 1] === '/') continue;          // 自闭合,无内容可换
    const contentStart = gt + 1;
    const closeAt = findCloseTag(html, tag, contentStart);
    if (closeAt === -1) continue;

    html = html.slice(0, contentStart) + escHtml(val) + html.slice(closeAt);
    replaced++;
  }
  return { html, replaced, missing: [...missing] };
}

/* ---------- 各语言页的 FAQPage schema ---------- */
function faqSchema(lang) {
  const items = FAQ.map(f => ({
    '@type': 'Question',
    name: (f.q[lang] || f.q.en),
    acceptedAnswer: { '@type': 'Answer', text: (f.a[lang] || f.a.en) },
  }));
  return JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: items }, null, 2);
}

/* ---------- hreflang 组(6 语言互指 + x-default) ---------- */
function hreflangBlock() {
  const rows = Object.keys(HOME).map(l =>
    `<link rel="alternate" hreflang="${HREF_LANG[l]}" href="${ORIGIN}${HOME[l]}" />`);
  rows.push(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}/" />`);
  return rows.join('\n');
}

/* ---------- 生成一个语言页 ---------- */
function buildPage(srcHtml, lang) {
  let h = srcHtml;
  const meta = META[lang];
  const report = {};

  // 1) 烧录译文
  const baked = bakeI18n(h, lang);
  h = baked.html;
  report.replaced = baked.replaced;
  report.missing = baked.missing;

  // 1.5) 中文排版:模板里 span 之间的空格对拉丁语系是必需的,对中文是多余的。
  //      仅当「前段以中文或全角标点结尾」且「后段以中文开头」时才去空格 ——
  //      中英混排(如 "Uni Max 充能")的空格必须保留,故不能无差别删除。
  if (lang === 'zh') {
    const CJK = '\\u4e00-\\u9fff';
    const PUNCT = '，。、；：！？）】》」』';
    const re = new RegExp(
      '([' + CJK + PUNCT + '])(</[a-zA-Z][\\w-]*>)[ \\t]+(<[a-zA-Z][^>]*>)(?=[' + CJK + '])', 'g');
    let prev;
    do { prev = h; h = h.replace(re, '$1$2$3'); } while (h !== prev);   // 连续多段需反复收敛
  }

  // 2) <html lang>
  h = h.replace(/<html lang="en">/, `<html lang="${DOC_LANG[lang]}">`);

  // 3) head 文案
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${escHtml(meta.title)}</title>`);
  h = h.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escAttr(meta.desc)}$2`);
  h = h.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escAttr(meta.ogTitle)}$2`);
  h = h.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escAttr(meta.ogDesc)}$2`);
  h = h.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${ORIGIN}${HOME[lang]}$2`);

  // 4) canonical 自指(hreflang 块在根页已就位,六语言页内容相同,直接继承)
  h = h.replace(/<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${ORIGIN}${HOME[lang]}" />`);

  // 5) 相对资源路径 → 绝对(页面位于子目录)
  //    用通用规则而非只列 src/href —— poster、data-* 等属性同样会 404。
  h = h.replace(/="assets\//g, '="/assets/');
  h = h.replace(/href="styles\.css/g, 'href="/styles.css');
  h = h.replace(/src="app\.js/g, 'src="/app.js');
  h = h.replace(/src="editor\.js/g, 'src="/editor.js');

  // 5.5) /wholesale/ 内链 → 该语言的译版(若有)
  //      zh/ms 已有 wholesale 译版(scripts/gen-wholesale-pages.js 产出),语言页应链到译版
  //      而非英文页;pl/nl/de 暂无译版,保持指向英文 /wholesale/。
  //      ⚠️ 这份名单必须与 gen-wholesale-pages.js 的 WSL_LANGS 一致 —— 加语言时两边都改。
  if (['zh', 'ms'].includes(lang)) {
    h = h.replace(/href="\/wholesale\/"/g, `href="/${lang}/wholesale/"`);
  }

  // 6) 页面语言标记(app.js 据此跳过 applyLang)
  h = h.replace(/window\.__PAGE_LANG__ = "en";/, `window.__PAGE_LANG__ = ${JSON.stringify(lang)};`);

  // 7) FAQPage schema 换成该语言
  h = h.replace(/(<script type="application\/ld\+json" id="faq-schema">)[\s\S]*?(<\/script>)/,
    `$1\n${faqSchema(lang)}\n$2`);

  // 7.5) sr-only H1 按语言替换(它无 data-i18n,不走字典烧录)
  h = h.replace(/(<h1 class="sr-only">)[^<]*(<\/h1>)/, `$1${escHtml(meta.h1)}$2`);

  // 8) 语言标签(静态烧录,app.js 不再更新它们)
  h = h.replace(/(<span id="langLabel">)[^<]*(<\/span>)/, `$1${escHtml(LANG_LABEL[lang])}$2`);
  h = h.replace(/(<span id="footLangLabel">)[^<]*(<\/span>)/, `$1${escHtml(LANG_FULL[lang])}$2`);

  // 9) 语言菜单的当前项高亮:源页高亮的是英文,移到本页语言
  h = h.replace(/<a href="([^"]+)" hreflang="([\w-]+)"(?: class="active")? role="menuitem">/g,
    (_m, href, hl) => {
      const active = href === HOME[lang] ? ' class="active"' : '';
      return `<a href="${href}" hreflang="${hl}"${active} role="menuitem">`;
    });

  // 11) 生成标记
  h = h.replace(/<head>/,
    `<head>\n<!-- 本文件由 scripts/gen-lang-pages.js 从根 index.html + app.js 的 I18N 烧录生成。\n     语言: ${lang}。直接改本文件会在下次重新生成时被覆盖 ——\n     内容改动请改根 index.html 或 app.js 的 I18N 字典后重跑生成器。\n     例外:客改层(editor.js)的线上发布直接写回本文件,重跑前需先同步。 -->`);

  return { html: h, report };
}

/* ---------- 主流程 ---------- */
const srcHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const srcI18nCount = (srcHtml.match(/data-i18n="/g) || []).length;
console.log(`源页 data-i18n 元素: ${srcI18nCount}\n`);

const only = process.argv[2] ? [process.argv[2]] : LANGS;
for (const lang of only) {
  const { html, report } = buildPage(srcHtml, lang);
  const dir = path.join(ROOT, lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html, 'utf8');

  // 对账:生成页必须保留同样多的 data-i18n 锚点,否则客改层会失锚
  const outCount = (html.match(/data-i18n="/g) || []).length;
  const ok = outCount === srcI18nCount;
  console.log(`/${lang}/  译文烧录 ${report.replaced}/${srcI18nCount}  ` +
    `data-i18n 保留 ${outCount} ${ok ? '✓' : '✗ 不一致!'}  ` +
    `无译文回退英文 ${report.missing.length} 个`);
  if (report.missing.length) console.log(`      缺: ${report.missing.join(', ')}`);
}
