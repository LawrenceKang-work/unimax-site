/* for-distributors-europe/ 的语言版生成器
 *
 *   node scripts/gen-distributors-europe-pages.js
 *   → 从 for-distributors-europe/index.html 生成 zh/ms/pl/nl/de 五语版本
 *
 * 架构与 gen-guide-pages.js 一致(三层:共享头尾字符串替换 / 结构块整块重建 / 正文精确替换+
 * 命中数断言),但该页不在 guides/ 目录下、只有一篇,故独立成脚本,不复用 gen-guide-pages.js
 * 的多篇发现循环。
 *
 * 五语全部有真实译版(2026-08-22 用户授权),故本页语言菜单与互链**没有"未译回退英文"这层
 * 复杂度**——不像 guides 那样需要 guideExists() 判断,直接全部指向真实译版即可。
 *
 * 互链目标(全部已有五语译版,直接解析到位):
 *   /wholesale/ 、 /guides/wholesale-supplements-for-resale/ 、
 *   /guides/start-supplement-business-vs-distributor/ 、 /guides/tongkat-ali-drink-supplier-checklist/
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://unimaxofficial.com';
const DICT = require('./i18n-distributors-europe.js');

const HREF_LANG = { en: 'en', zh: 'zh-Hans', ms: 'ms', pl: 'pl', nl: 'nl', de: 'de' };
const LANG_FULL = { en: 'English', zh: '中文', ms: 'Bahasa Melayu', pl: 'Polski', nl: 'Nederlands', de: 'Deutsch' };
const LANG_SHORT = { en: 'EN', zh: '中文', ms: 'BM', pl: 'PL', nl: 'NL', de: 'DE' };
const ALL_LANGS = ['en', 'zh', 'ms', 'pl', 'nl', 'de'];
const TARGET_LANGS = ['zh', 'ms', 'pl', 'nl', 'de'];

const SELF = lang => (lang === 'en' ? '/for-distributors-europe/' : `/${lang}/for-distributors-europe/`);
const home = lang => (lang === 'en' ? '/' : `/${lang}/`);
const guideTarget = (slug, lang) => (lang === 'en' ? `/guides/${slug}/` : `/${lang}/guides/${slug}/`);
const wholesaleTarget = lang => (lang === 'en' ? '/wholesale/' : `/${lang}/wholesale/`);

/* ---------- 替换引擎:带命中数断言(同 gen-guide-pages.js) ---------- */
function replaceExact(html, from, to, expect, where) {
  const n = html.split(from).length - 1;
  if (expect === 'once' && n !== 1) throw new Error(`[${where}] 期望恰好 1 次,实际 ${n} 次:\n  ${from.slice(0, 100)}`);
  if (expect === 'many' && n < 1) throw new Error(`[${where}] 期望 ≥1 次,实际 0 次:\n  ${from.slice(0, 100)}`);
  return html.split(from).join(to);
}
function replaceBlock(html, startPat, endMark, rebuilt, where) {
  const re = new RegExp(startPat + '[\\s\\S]*?' + endMark);
  const m = re.exec(html);
  if (!m) throw new Error(`[${where}] 未匹配到区块`);
  if (re.exec(html.slice(m.index + m[0].length))) throw new Error(`[${where}] 区块匹配到多处,锚点不唯一`);
  return html.slice(0, m.index) + rebuilt + html.slice(m.index + m[0].length);
}

function buildLangMenu(cur) {
  const tick = '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const items = ALL_LANGS.map(l =>
    `            <a href="${SELF(l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' class="active"' : ''} role="menuitem">${LANG_FULL[l]} ${tick}</a>`
  ).join('\n');
  return `<div class="lang-menu" role="menu">\n${items}\n          </div>`;
}
function buildFooterLang(cur) {
  const items = ALL_LANGS.map(l =>
    `          <a class="lang-btn" href="${SELF(l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' aria-current="page"' : ''}>${LANG_SHORT[l]}</a>`
  ).join('\n');
  return `<div class="wsl-flang">\n${items}\n        </div>`;
}
function buildHreflang() {
  const rows = ALL_LANGS.filter(l => l !== 'en').map(l =>
    `<link rel="alternate" hreflang="${HREF_LANG[l]}" href="${ORIGIN}${SELF(l)}" />`
  );
  rows.unshift(`<link rel="alternate" hreflang="en" href="${ORIGIN}/for-distributors-europe/" />`);
  rows.push(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}/for-distributors-europe/" />`);
  return rows.join('\n');
}

function buildFaqHtml(faq) {
  return faq.map((f, i) =>
    `      <details${i === 0 ? ' open' : ''}>\n        <summary>${f.q}</summary>\n        <p>${f.a}</p>\n      </details>`
  ).join('\n');
}
function buildFaqJsonLd(faq) {
  const items = faq.map(f =>
    `{"@type":"Question","name":"${escJson(f.q)}","acceptedAnswer":{"@type":"Answer","text":"${escJson(f.a)}"}}`
  ).join(',');
  return `"mainEntity":[${items}]`;
}
function escJson(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return esc(s).replace(/"/g, '&quot;'); }

function countEnglishLeftover(html) {
  const body = html.slice(html.indexOf('<main'))
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  const texts = body.match(/>([^<>]{25,})</g) || [];
  const ok = /^[\s\d.,·×—–&+/()%:-]*$/;
  return texts
    .map(t => t.slice(1, -1).trim())
    .filter(t => !ok.test(t))
    .filter(t => /\b(the|and|with|for|your|that|this|from|are|our|you)\b/i.test(t))
    .slice(0, 5);
}

/* ================= 主流程 ================= */
const SRC = path.join(ROOT, 'for-distributors-europe', 'index.html');
/* 源文件是 CRLF(与 guides/、wholesale/ 的 LF 不同 —— 大概率是本地编辑器存的),
   而下面所有替换锚点都按 LF 写的(\n)。统一转成 LF 再处理,输出也是 LF,
   与其余生成产物一致(git 的 core.autocrlf 会在检出时转回 CRLF,提交内容仍是 LF)。 */
const src = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');

for (const lang of TARGET_LANGS) {
  const D = DICT[lang];
  const S = D.shared;
  let h = src;

  const cut = h.indexOf('</head>');
  if (cut === -1) throw new Error(`[${lang}] 找不到 </head>`);
  let head = h.slice(0, cut), body = h.slice(cut);

  /* 1) html lang */
  head = replaceExact(head, '<html lang="en">', `<html lang="${S.docLang}">`, 'once', `${lang}/htmlLang`);

  /* 2) meta 标题/描述/OG */
  head = replaceExact(head,
    '<title>Halal Vitality Shot Supplier for Europe — Distribute UNI MAX | UNI MAX</title>',
    `<title>${esc(D.meta.title)}</title>`, 'once', `${lang}/title`);
  head = replaceExact(head,
    '<meta name="description" content="Distribute a finished, halal-certified Tongkat Ali vitality drink in your European market. Retail-ready boxes, a ready-made brand and a European partnership desk — no formula to develop, no factory to build." />',
    `<meta name="description" content="${escAttr(D.meta.desc)}" />`, 'once', `${lang}/desc`);
  head = replaceExact(head,
    '<meta property="og:title" content="Halal Vitality Drink Supplier for Europe — Distribute UNI MAX" />',
    `<meta property="og:title" content="${escAttr(D.meta.ogTitle)}" />`, 'once', `${lang}/ogTitle`);
  head = replaceExact(head,
    '<meta property="og:description" content="A finished, halal-certified Tongkat Ali vitality drink for European distributors — retail-ready, brand-owned, delivered via our European partner." />',
    `<meta property="og:description" content="${escAttr(D.meta.ogDesc)}" />`, 'once', `${lang}/ogDesc`);

  /* 3) canonical + og:url + og:locale */
  head = replaceExact(head, `<link rel="canonical" href="${ORIGIN}/for-distributors-europe/" />`,
    `<link rel="canonical" href="${ORIGIN}${SELF(lang)}" />`, 'once', `${lang}/canonical`);
  head = replaceExact(head, `<meta property="og:url" content="${ORIGIN}/for-distributors-europe/" />`,
    `<meta property="og:url" content="${ORIGIN}${SELF(lang)}" />\n<meta property="og:locale" content="${S.docLang}" />`,
    'once', `${lang}/ogUrl`);

  /* 4) 去掉「单语言页:无译版」旧注释(若存在) */
  head = head.replace(/\n?<!-- 单语言页:无译版,依站规不加 hreflang[^>]*-->/, '');

  /* 5) JSON-LD:Breadcrumb */
  head = replaceExact(head, '"name":"For Distributors — Europe","item":"https://unimaxofficial.com/for-distributors-europe/"',
    `"name":"${escJson(D.breadcrumbName)}","item":"${ORIGIN}${SELF(lang)}"`, 'once', `${lang}/bcName`);
  head = replaceExact(head, `"item":"${ORIGIN}/"}`, `"item":"${ORIGIN}${home(lang)}"}`, 'once', `${lang}/bcHome`);

  /* 6) JSON-LD:Article(整块重建,日期从源页动态提取) */
  const srcDates = /"datePublished":"([^"]+)"[\s\S]*?"dateModified":"([^"]+)"/.exec(head);
  if (!srcDates) throw new Error(`[${lang}] 找不到 Article JSON-LD 日期`);
  head = replaceBlock(head, '"@type":"Article"', '</script>',
    `"@type":"Article",\n  "headline":"${escJson(D.articleHeadline)}",\n  "description":"${escJson(D.articleDescription)}",\n  "datePublished":"${srcDates[1]}",\n  "dateModified":"${srcDates[2]}",\n  "mainEntityOfPage":"${ORIGIN}${SELF(lang)}",\n  "author":{"@type":"Organization","name":"UNI MAX by UniPro","url":"${ORIGIN}/"},\n  "publisher":{"@type":"Organization","name":"UNI MAX by UniPro","url":"${ORIGIN}/"}\n}\n</script>`,
    `${lang}/articleJsonLd`);

  /* 7) JSON-LD:FAQPage(整块重建) */
  head = replaceBlock(head, '"@type":"FAQPage"', '}\n</script>',
    `"@type":"FAQPage",\n  ${buildFaqJsonLd(D.faq)}\n}\n</script>`, `${lang}/faqJsonLd`);

  /* ---- body ---- */
  /* 8) 语言菜单 + footer 语言组:整块重建 */
  body = replaceBlock(body, '<div class="lang-menu" role="menu">', '</div>', buildLangMenu(lang), `${lang}/langMenu`);
  body = replaceBlock(body, '<div class="wsl-flang">', '</div>', buildFooterLang(lang), `${lang}/footerLang`);

  /* 9) FAQ 手风琴:整块重建 */
  body = replaceBlock(body, '<div class="wsl-faq">\\s*', '</details>\\s*\\n    </div>',
    `<div class="wsl-faq">\n${buildFaqHtml(D.faq)}\n    </div>`, `${lang}/faqHtml`);

  /* 10) 头部导航 + footer 共享文案(复用首页字典) */
  body = replaceExact(body, '>Overview</a>', `>${S.nav.overview}</a>`, 'once', `${lang}/navOverview`);
  body = replaceExact(body, '>Why UNI MAX</a>', `>${S.nav.why}</a>`, 'once', `${lang}/navWhy`);
  body = replaceExact(body, '>Partnerships</a>', `>${S.nav.partnerships}</a>`, 'once', `${lang}/navPartnerships`);
  body = replaceExact(body, '>About</a>', `>${S.nav.about}</a>`, 'once', `${lang}/navAbout`);
  body = replaceExact(body, '>FAQ</a>', `>${S.nav.faq}</a>`, 'many', `${lang}/navFaq`);
  body = replaceExact(body, '>Contact</a>', `>${S.nav.contact}</a>`, 'once', `${lang}/navContact`);
  body = replaceExact(body, '<span>Become a Partner</span>', `<span>${S.ctaOrder}</span>`, 'many', `${lang}/ctaOrder`);
  body = replaceExact(body, 'Back to UNI MAX', S.backToUniMax, 'once', `${lang}/backToUniMax`);
  body = replaceExact(body, '<h2>Related reading</h2>', `<h2>${S.relatedReading}</h2>`, 'once', `${lang}/relatedReading`);
  body = replaceExact(body, '<p>Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.</p>',
    `<p>${S.footAbout}</p>`, 'once', `${lang}/footAbout`);
  body = replaceExact(body, '>Explore</h3>', `>${S.footExplore}</h3>`, 'once', `${lang}/footExplore`);
  body = replaceExact(body, '>Benefits</a>', `>${S.nav.benefits}</a>`, 'once', `${lang}/footBenefits`);
  body = replaceExact(body, '>Formula</a>', `>${S.nav.formula}</a>`, 'once', `${lang}/footFormula`);
  body = replaceExact(body, '>Certified</a>', `>${S.nav.trust}</a>`, 'once', `${lang}/footCertified`);
  body = replaceExact(body, '>Product</h3>', `>${S.footProduct}</h3>`, 'once', `${lang}/footProductH`);
  body = replaceExact(body, '<li>10g × 30 sachets</li>', `<li>${S.footP[0]}</li>`, 'once', `${lang}/footP1`);
  body = replaceExact(body, '<li>Ready-to-drink</li>', `<li>${S.footP[1]}</li>`, 'once', `${lang}/footP2`);
  body = replaceExact(body, '<li>Botanical lychee</li>', `<li>${S.footP[2]}</li>`, 'once', `${lang}/footP3`);
  body = replaceExact(body, '<li>HALAL certified</li>', `<li>${S.footP[3]}</li>`, 'once', `${lang}/footP4`);
  body = replaceExact(body, '>Contact</h3>', `>${S.footContact}</h3>`, 'once', `${lang}/footContactH`);
  body = replaceExact(body,
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.',
    S.footDisclaimer, 'once', `${lang}/disclaimer`);
  body = replaceExact(body, '<span>© <span id="yr">2026</span> UniPro · UNI MAX. All rights reserved.</span>',
    `<span>${S.footCopy.replace('2026', '<span id="yr">2026</span>')}</span>`, 'once', `${lang}/footCopy`);
  body = replaceExact(body, '<span>Manufactured in Malaysia by Orient Biotech Sdn Bhd.</span>',
    `<span>${S.footMade}</span>`, 'once', `${lang}/footMade`);

  /* 11) 本篇独有正文 */
  for (const [from, to] of Object.entries(D.html)) {
    body = replaceExact(body, from, to, 'once', `${lang}/html`);
  }

  /* 12) 埋点 page 字段 */
  body = replaceExact(body, 'page: "for-distributors-europe"', `page: "for-distributors-europe-${lang}"`, 'once', `${lang}/trackingPage`);

  h = head + body;

  /* 13) 站内互链:全部五语均已有真实译版,直接解析(顺序:先长后短) */
  h = h.replace(/href="\/guides\/([a-z0-9-]+)\/"/g, (m, s) => `href="${guideTarget(s, lang)}"`);
  h = h.split('href="/wholesale/"').join(`href="${wholesaleTarget(lang)}"`);
  h = h.split('href="/#').join(`href="${home(lang)}#`);
  h = replaceExact(h, '<a href="/" class="brand logo"', `<a href="${home(lang)}" class="brand logo"`, 'once', `${lang}/brand`);
  h = replaceExact(h, '<a href="/" class="wsl-back">', `<a href="${home(lang)}" class="wsl-back">`, 'once', `${lang}/back`);

  /* 14) 生成标记 */
  h = h.replace('<head>',
    `<head>\n<!-- 本文件由 scripts/gen-distributors-europe-pages.js 从 for-distributors-europe/index.html 生成。语言: ${lang}。\n     直接改本文件会在下次生成时被覆盖 —— 内容改英文源页,译文改 scripts/i18n-distributors-europe.js。 -->`);

  const outDir = path.join(ROOT, lang, 'for-distributors-europe');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), h, 'utf8');

  const leftover = countEnglishLeftover(h);
  console.log(`/${lang}/for-distributors-europe/  写出 ${h.length} 字节  |  html 词条 ${Object.keys(D.html).length} 条`
    + (leftover.length ? `\n    ⚠️ 疑似未译: ${leftover.join(' / ')}` : '  ✓ 无残留英文正文'));
}

/* --- 英文源页自身的语言菜单/footer/hreflang 同步(全部五语均有真实译版) --- */
{
  let h = fs.readFileSync(SRC, 'utf8').replace(/\r\n/g, '\n');
  const before = h;

  h = replaceBlock(h, '<div class="lang-menu" role="menu">', '</div>', buildLangMenu('en'), 'en/langMenu');
  h = replaceBlock(h, '<div class="wsl-flang">', '</div>', buildFooterLang('en'), 'en/footerLang');

  if (!h.includes('rel="alternate" hreflang="zh-Hans"')) {
    h = h.replace(
      '<link rel="canonical" href="https://unimaxofficial.com/for-distributors-europe/" />\n<!-- 单语言页:无译版,依站规不加 hreflang(自指 hreflang 是 no-op 噪音,见 CLAUDE.md) -->',
      `<link rel="canonical" href="https://unimaxofficial.com/for-distributors-europe/" />\n<!-- 五语(zh/ms/pl/nl/de)均已有译版(2026-08-22),互指 hreflang。这组由 scripts/gen-distributors-europe-pages.js 校验/生成。 -->\n${buildHreflang()}`
    );
  }

  if (h !== before) {
    fs.writeFileSync(SRC, h, 'utf8');
    console.log('  ↳ 英文源页 for-distributors-europe/ 语言菜单 + hreflang 已同步指向真实译文');
  }
}
