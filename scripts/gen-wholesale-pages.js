/* UNI MAX /wholesale/ 落地页的语言版生成器
 *
 *   node scripts/gen-wholesale-pages.js
 *   → 从 wholesale/index.html 生成 zh/wholesale/index.html 与 ms/wholesale/index.html
 *
 * 为什么不复用 gen-lang-pages.js:那一支是给首页写的,靠 data-i18n 锚点烧录;
 * 而 /wholesale/ 是独立手写的静态页,整页没有 data-i18n。这里改用
 * 「英文原文 → 译文」的字符串替换(表在 scripts/i18n-wholesale.js)。
 *
 * 安全机制 —— 每条替换都断言命中数:
 *   html/jsonld 组必须**恰好 1 次**,all 组必须 **≥1 次**。
 *   不符即抛错中止,一个字节都不写。
 *   所以英文源页改了文案、翻译表没跟上时,这里会立刻炸,而不是悄悄产出半英半中的页面。
 *
 * ⚠️ 英文源页 wholesale/index.html 的**语言菜单与 hreflang 由本脚本校验、但不改写**
 *    (源即目标,自我修改风险大)。改语言菜单结构时两边都要动 —— 跑一次就会告诉你。
 *
 * ⚠️ WhatsApp 预填文案(?text=)刻意保持英文:收件方当前是德国号码,其中文/马来语
 *    阅读能力未确认,把询价消息本地化可能反而造成沟通障碍。客户确认后再改。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://unimaxofficial.com';
const DICT = require('./i18n-wholesale.js');

/* 有 wholesale 译版的语言。pl/nl/de 暂缺 —— 它们在语言菜单里指向各自首页。
   ⚠️ 增补欧盟语言前先看 CLAUDE.md 的 Novel Food 合规条款。 */
const WSL_LANGS = ['en', 'zh', 'ms'];
const HREF_LANG = { en: 'en', zh: 'zh-Hans', ms: 'ms', pl: 'pl', nl: 'nl', de: 'de' };
const LANG_FULL = { en: 'English', zh: '中文', ms: 'Bahasa Melayu', pl: 'Polski', nl: 'Nederlands', de: 'Deutsch' };
const LANG_SHORT = { en: 'EN', zh: '中文', ms: 'BM', pl: 'PL', nl: 'NL', de: 'DE' };
const ALL_LANGS = ['en', 'zh', 'ms', 'pl', 'nl', 'de'];

/* 某语言在语言菜单里该跳到哪:有 wholesale 版就去它的 wholesale 页,否则回该语言首页 */
const targetFor = lang =>
  WSL_LANGS.includes(lang)
    ? (lang === 'en' ? '/wholesale/' : `/${lang}/wholesale/`)
    : `/${lang}/`;

const home = lang => (lang === 'en' ? '/' : `/${lang}/`);

/* ---------- 替换引擎:带命中数断言 ---------- */
function replaceExact(html, from, to, expect, where) {
  const n = html.split(from).length - 1;
  if (expect === 'once' && n !== 1) {
    throw new Error(`[${where}] 期望恰好 1 次,实际 ${n} 次:\n  ${from.slice(0, 90)}`);
  }
  if (expect === 'many' && n < 1) {
    throw new Error(`[${where}] 期望 ≥1 次,实际 0 次:\n  ${from.slice(0, 90)}`);
  }
  return html.split(from).join(to);
}

/* ---------- 整块重建:语言菜单 ---------- */
function buildLangMenu(cur) {
  const tick = '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const items = ALL_LANGS.map(l =>
    `            <a href="${targetFor(l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' class="active"' : ''} role="menuitem">${LANG_FULL[l]} ${tick}</a>`
  ).join('\n');
  return `<div class="lang-menu" role="menu">\n${items}\n          </div>`;
}

/* ---------- 整块重建:footer 平铺语言组 ---------- */
function buildFooterLang(cur) {
  const items = ALL_LANGS.map(l =>
    `          <a class="lang-btn" href="${targetFor(l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' aria-current="page"' : ''}>${LANG_SHORT[l]}</a>`
  ).join('\n');
  return `<div class="wsl-flang">\n${items}\n        </div>`;
}

/* ---------- hreflang 组:只在有译版的语言之间互指 ---------- */
function buildHreflang() {
  const rows = WSL_LANGS.map(l =>
    `<link rel="alternate" hreflang="${HREF_LANG[l]}" href="${ORIGIN}${targetFor(l)}" />`
  );
  rows.push(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}/wholesale/" />`);
  return rows.join('\n');
}

/* 用非贪婪匹配抓整块,避免手写闭合定位 */
function replaceBlock(html, startPat, endMark, rebuilt, where) {
  const re = new RegExp(startPat + '[\\s\\S]*?' + endMark);
  const m = re.exec(html);
  if (!m) throw new Error(`[${where}] 未匹配到区块`);
  if (re.exec(html.slice(m.index + m[0].length))) {
    throw new Error(`[${where}] 区块匹配到多处,锚点不唯一`);
  }
  return html.slice(0, m.index) + rebuilt + html.slice(m.index + m[0].length);
}

/* ================= 主流程 ================= */
const SRC = path.join(ROOT, 'wholesale', 'index.html');
const src = fs.readFileSync(SRC, 'utf8');

/* --- 先校验英文源页:语言菜单与 hreflang 是否与本脚本的认知一致 --- */
const warnings = [];
for (const l of WSL_LANGS) {
  const want = `href="${targetFor(l)}" hreflang="${HREF_LANG[l]}"`;
  if (!src.includes(want)) {
    warnings.push(`英文源页语言菜单缺: ${want}`);
  }
}
if (!src.includes('rel="alternate" hreflang="zh-Hans"')) {
  warnings.push('英文源页缺 hreflang alternate 组(zh/ms 版已存在,英文页需回指)');
}

for (const lang of ['zh', 'ms']) {
  const D = DICT[lang];
  let h = src;

  /* 1) 文案替换 —— **分区进行**:JSON-LD 只在 <head>,正文只在 <body>。
        不分区的话,像「30 ready-to-drink sachets of 10 g...」这种句子会同时命中正文
        和 JSON-LD 里的同义句(后者是前者的超串),命中数断言直接炸。分区后各自唯一。
        顺序上长句优先,避免短 key 先吃掉长句的一部分。 */
  const cut = h.indexOf('</head>');
  if (cut === -1) throw new Error(`[${lang}] 找不到 </head>`);
  let head = h.slice(0, cut), body = h.slice(cut);

  const jsonPairs = Object.entries(D.jsonld).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of jsonPairs) head = replaceExact(head, from, to, 'once', `${lang}/jsonld`);

  const htmlPairs = Object.entries(D.html).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of htmlPairs) body = replaceExact(body, from, to, 'once', `${lang}/html`);

  for (const [from, to] of Object.entries(D.all)) body = replaceExact(body, from, to, 'many', `${lang}/all`);

  h = head + body;

  /* 2) html lang */
  h = replaceExact(h, '<html lang="en">', `<html lang="${D.docLang}">`, 'once', `${lang}/htmlLang`);

  /* 3) head 元数据 */
  h = replaceExact(h,
    '<title>Tongkat Ali Drink Wholesale &amp; Distribution | UNI MAX</title>',
    `<title>${esc(D.meta.title)}</title>`, 'once', `${lang}/title`);
  h = replaceExact(h,
    '<meta name="description" content="Halal-certified ready-to-drink Tongkat Ali vitality drink, retail-ready in 10 g × 30 sachet boxes. Suggested MOQ from 12 boxes. Made in Malaysia." />',
    `<meta name="description" content="${escAttr(D.meta.desc)}" />`, 'once', `${lang}/desc`);
  h = replaceExact(h,
    '<meta property="og:title" content="Tongkat Ali Drink Wholesale &amp; Distribution — UNI MAX" />',
    `<meta property="og:title" content="${escAttr(D.meta.ogTitle)}" />`, 'once', `${lang}/ogTitle`);
  h = replaceExact(h,
    '<meta property="og:description" content="Halal-certified ready-to-drink Tongkat Ali vitality drink in retail-ready boxes. Partnership levels from stockist to regional distributor. Made in Malaysia." />',
    `<meta property="og:description" content="${escAttr(D.meta.ogDesc)}" />`, 'once', `${lang}/ogDesc`);

  /* 4) canonical + og:url 自指 */
  h = replaceExact(h, `<link rel="canonical" href="${ORIGIN}/wholesale/" />`,
    `<link rel="canonical" href="${ORIGIN}/${lang}/wholesale/" />`, 'once', `${lang}/canonical`);
  /* og:locale 源页没有,这里顺带补上(语言版才有意义,英文页保持原样) */
  h = replaceExact(h, `<meta property="og:url" content="${ORIGIN}/wholesale/" />`,
    `<meta property="og:url" content="${ORIGIN}/${lang}/wholesale/" />\n<meta property="og:locale" content="${D.docLang}" />`,
    'once', `${lang}/ogUrl`);

  /* 5) breadcrumb 的 item URL 指向本语言 */
  h = replaceExact(h, `"item":"${ORIGIN}/"`, `"item":"${ORIGIN}/${lang}/"`, 'once', `${lang}/bcHome`);
  h = replaceExact(h, `"item":"${ORIGIN}/wholesale/"`, `"item":"${ORIGIN}/${lang}/wholesale/"`, 'once', `${lang}/bcSelf`);

  /* 6) 语言菜单与 footer 语言组整块重建 */
  h = replaceBlock(h, '<div class="lang-menu" role="menu">', '</div>', buildLangMenu(lang), `${lang}/langMenu`);
  h = replaceBlock(h, '<div class="wsl-flang">', '</div>', buildFooterLang(lang), `${lang}/footerLang`);

  /* 7) 站内链接指向本语言
        注意顺序:先换 /wholesale/(长),再换 /"(短),否则 href="/" 会先吃掉前缀。 */
  /* 导航已与首页统一为 6 项、全部指向首页锚点,本页不再在自己的导航里出现,
     故没有指向自身的链接要改写。下一行的 href="/#" → /{lang}/# 已覆盖全部 6 项。 */
  h = h.split('href="/#').join(`href="${home(lang)}#`);
  h = replaceExact(h, '<a href="/" class="brand logo"', `<a href="${home(lang)}" class="brand logo"`, 'once', `${lang}/brand`);
  h = replaceExact(h, '<a href="/" class="wsl-back">', `<a href="${home(lang)}" class="wsl-back">`, 'once', `${lang}/back`);

  /* 8) 生成标记 */
  h = h.replace('<head>',
    `<head>\n<!-- 本文件由 scripts/gen-wholesale-pages.js 从 wholesale/index.html 生成。语言: ${lang}。\n     直接改本文件会在下次生成时被覆盖 —— 内容改英文源页,译文改 scripts/i18n-wholesale.js。 -->`);

  const outDir = path.join(ROOT, lang, 'wholesale');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), h, 'utf8');

  const leftover = countEnglishLeftover(h);
  console.log(`/${lang}/wholesale/  写出 ${h.length} 字节  |  译文 ${Object.keys(D.html).length + Object.keys(D.jsonld).length + Object.keys(D.all).length} 条`
    + (leftover.length ? `\n    ⚠️ 疑似未译: ${leftover.join(' / ')}` : '  ✓ 无残留英文正文'));
}

if (warnings.length) {
  console.log('\n⚠️ 英文源页待补(本脚本不自动改源页):');
  warnings.forEach(w => console.log('   - ' + w));
} else {
  console.log('\n英文源页校验 ✓  语言菜单与 hreflang 齐备');
}

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return esc(s).replace(/"/g, '&quot;'); }

/* 粗筛:正文里是否还留着成句的英文。品牌名/认证名/单位不算。 */
function countEnglishLeftover(html) {
  const body = html.slice(html.indexOf('<main'));
  const texts = body.match(/>([^<>]{25,})</g) || [];
  const ok = /^[\s\d.,·×—–&+/()%:-]*$/;
  return texts
    .map(t => t.slice(1, -1).trim())
    .filter(t => !ok.test(t))
    .filter(t => /\b(the|and|with|for|your|that|this|from|are|our|you)\b/i.test(t))
    .slice(0, 3);
}
