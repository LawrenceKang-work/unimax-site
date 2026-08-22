/* UNI MAX /guides/* 文章页的语言版生成器
 *
 *   node scripts/gen-guide-pages.js
 *   → 对每篇 guides/<slug>/index.html,只要 scripts/i18n-guides/<slug>.js 存在,
 *     就生成 <lang>/guides/<slug>/index.html(zh/ms/pl/nl/de,视该字典覆盖了哪些语言)
 *
 * 沿用 gen-wholesale-pages.js 的安全机制(字符串替换 + 命中数断言),但拆成三层:
 *   1) 共享头尾骨架 —— 用 scripts/i18n-guides/_shared.js(复用首页字典,不重新翻译)
 *   2) 结构化区块(FAQ / JSON-LD / 语言菜单 / footer 语言组)—— 整块重建,不做字符串匹配,
 *      避免这些重复结构（相同的 <details>…</details> 在 8 篇里长得一样）互相打架
 *   3) 正文自由文本(H1/导语/H2/段落/表格/CTA note)—— 字符串替换 + 命中数断言,
 *      英文源页一改这里就报错,不会悄悄产出漏译页面
 *
 * ⚠️ 每篇 guide 的字典文件是**增量的**:只放这篇独有的内容,共享骨架不用重复翻译。
 * ⚠️ **新增一篇译文字典后,连跑两次**:第一次生成 5 个语言文件时,同一篇内其它兄弟语言
 *    还没落地(比如生成 zh 版那一刻 ms 版文件还不存在),互链会先退回该语言首页;
 *    英文源页的 hreflang 也是在这轮最后才回写。第二次跑,所有语言文件已经都在硬盘上,
 *    互链才会真正指向彼此。这是一次性的启动效应,收敛后再跑多少次都不变(已实测四连跑,
 *    第三次起字节数就不再变化)。
 * ⚠️ 站内互链(/guides/other-slug/、/wholesale/)在全部替换跑完后统一后处理:
 *    目标语言版本存在就指向它,不存在就留着指向英文版 —— 所以**不需要在字典里
 *    手写语言前缀**,永远照抄英文源页的 href 原样放进字典,生成器自动决定目标。
 *    这也意味着以后新增更多译文,重跑一次全部旧译文页的互链会自动跟着升级。
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://unimaxofficial.com';
const SHARED = require('./i18n-guides/_shared.js');

const HREF_LANG = { en: 'en', zh: 'zh-Hans', ms: 'ms', pl: 'pl', nl: 'nl', de: 'de' };
const LANG_FULL = { en: 'English', zh: '中文', ms: 'Bahasa Melayu', pl: 'Polski', nl: 'Nederlands', de: 'Deutsch' };
const LANG_SHORT = { en: 'EN', zh: '中文', ms: 'BM', pl: 'PL', nl: 'NL', de: 'DE' };
const ALL_LANGS = ['en', 'zh', 'ms', 'pl', 'nl', 'de'];
const TARGET_LANGS = ['zh', 'ms', 'pl', 'nl', 'de'];

/* wholesale 目前只有 zh/ms 译版(pl/nl/de 未做 —— 欧盟合规顾虑未澄清前不放大,见 CLAUDE.md) */
const WHOLESALE_LANGS = ['en', 'zh', 'ms'];

/* ---------- 发现:哪些 guide 已有译文字典、已有哪些语言的成品页 ---------- */
const guidesDir = path.join(ROOT, 'guides');
const allSlugs = fs.readdirSync(guidesDir).filter(d =>
  fs.existsSync(path.join(guidesDir, d, 'index.html')));

const dictDir = path.join(ROOT, 'scripts', 'i18n-guides');
const slugsWithDict = allSlugs.filter(s => fs.existsSync(path.join(dictDir, `${s}.js`)));

/* 某篇 guide 在某语言下,已经真的生成过成品页(用于互链目标判定,不依赖本次是否重新生成) */
function guideExists(slug, lang) {
  if (lang === 'en') return allSlugs.includes(slug);
  return fs.existsSync(path.join(ROOT, lang, 'guides', slug, 'index.html'));
}

function wholesaleTarget(lang) {
  return WHOLESALE_LANGS.includes(lang) ? (lang === 'en' ? '/wholesale/' : `/${lang}/wholesale/`) : '/wholesale/';
}
function home(lang) { return lang === 'en' ? '/' : `/${lang}/`; }
function guideTarget(slug, lang) {
  if (lang === 'en') return `/guides/${slug}/`;
  return guideExists(slug, lang) ? `/${lang}/guides/${slug}/` : `/guides/${slug}/`;
}

/* ---------- 替换引擎:带命中数断言(与 gen-wholesale-pages.js 同一套) ---------- */
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
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function escAttr(s) { return esc(s).replace(/"/g, '&quot;'); }
function escJson(s) { return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"'); }

/* ---------- 整块重建:语言菜单(6 语,已译版指向译文页,未译指向该语言首页) ---------- */
function buildLangMenu(slug, cur) {
  const tick = '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  const items = ALL_LANGS.map(l =>
    `            <a href="${guideTarget(slug, l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' class="active"' : ''} role="menuitem">${LANG_FULL[l]} ${tick}</a>`
  ).join('\n');
  return `<div class="lang-menu" role="menu">\n${items}\n          </div>`;
}
function buildFooterLang(slug, cur) {
  const items = ALL_LANGS.map(l =>
    `          <a class="lang-btn" href="${guideTarget(slug, l)}" hreflang="${HREF_LANG[l]}"${l === cur ? ' aria-current="page"' : ''}>${LANG_SHORT[l]}</a>`
  ).join('\n');
  return `<div class="wsl-flang">\n${items}\n        </div>`;
}

/* ---------- 整块重建:FAQ(HTML 手风琴 + JSON-LD),8 篇结构完全一致,不做字符串匹配 ---------- */
function buildFaqHtml(faq) {
  return faq.map((item, i) =>
    `      <details${i === 0 ? ' open' : ''}>\n        <summary>${esc(item.q)}</summary>\n        <p>${item.a}</p>\n      </details>`
  ).join('\n');
}
function buildFaqJsonLd(faq) {
  const items = faq.map(item =>
    `    {"@type":"Question","name":"${escJson(item.q)}","acceptedAnswer":{"@type":"Answer","text":"${escJson(item.aPlain || item.a)}"}}`
  ).join(',\n');
  return `"mainEntity":[\n${items}\n  ]`;
}

/* ================= 主流程 ================= */
console.log(`发现 ${allSlugs.length} 篇 guide,其中 ${slugsWithDict.length} 篇有译文字典:${slugsWithDict.join(', ') || '(无)'}\n`);

for (const slug of slugsWithDict) {
  const DICT = require(path.join(dictDir, `${slug}.js`));
  const SRC = path.join(guidesDir, slug, 'index.html');
  const src = fs.readFileSync(SRC, 'utf8');
  const langs = Object.keys(DICT).filter(l => TARGET_LANGS.includes(l));

  for (const lang of langs) {
    const D = DICT[lang];
    const S = SHARED[lang];
    let h = src;

    const cut = h.indexOf('</head>');
    if (cut === -1) throw new Error(`[${slug}/${lang}] 找不到 </head>`);
    let head = h.slice(0, cut), body = h.slice(cut);

    /* 1) <html lang> */
    head = replaceExact(head, '<html lang="en">', `<html lang="${S.docLang}">`, 'once', `${slug}/${lang}/htmlLang`);

    /* 2) meta:title/desc/og —— 用正则动态抓当前英文值再替换,不硬编码每篇的旧文案
          (8 篇各不相同,硬编码会让脚本臃肿且每加一篇要改脚本本体) */
    head = replaceTag(head, /<title>([\s\S]*?)<\/title>/, `<title>${esc(D.meta.title)}</title>`, `${slug}/${lang}/title`);
    head = replaceTag(head, /<meta name="description" content="([\s\S]*?)" \/>/, `<meta name="description" content="${escAttr(D.meta.desc)}" />`, `${slug}/${lang}/desc`);
    head = replaceTag(head, /<meta property="og:title" content="([\s\S]*?)" \/>/, `<meta property="og:title" content="${escAttr(D.meta.ogTitle)}" />`, `${slug}/${lang}/ogTitle`);
    head = replaceTag(head, /<meta property="og:description" content="([\s\S]*?)" \/>/, `<meta property="og:description" content="${escAttr(D.meta.ogDesc)}" />`, `${slug}/${lang}/ogDesc`);

    /* 3) canonical + og:url 自指本语言,补 og:locale;去掉"无译版"的过时注释 */
    head = replaceExact(head, `<link rel="canonical" href="${ORIGIN}/guides/${slug}/" />`,
      `<link rel="canonical" href="${ORIGIN}${guideTarget(slug, lang)}" />`, 'once', `${slug}/${lang}/canonical`);
    head = replaceExact(head, `<meta property="og:url" content="${ORIGIN}/guides/${slug}/" />`,
      `<meta property="og:url" content="${ORIGIN}${guideTarget(slug, lang)}" />\n<meta property="og:locale" content="${S.docLang}" />`,
      'once', `${slug}/${lang}/ogUrl`);
    head = head.replace(/<!-- 单语言页:无译版[\s\S]*?-->\n?/, '');

    /* 4) JSON-LD:Breadcrumb + Article(整块重建,字段来自字典) */
    head = replaceBlock(head, '"@type":"BreadcrumbList"', '</script>',
      `"@type":"BreadcrumbList",\n  "itemListElement":[\n    {"@type":"ListItem","position":1,"name":"Home","item":"${ORIGIN}${home(lang)}"},\n    {"@type":"ListItem","position":2,"name":"${escJson(D.breadcrumbName)}","item":"${ORIGIN}${guideTarget(slug, lang)}"}\n  ]\n}\n</script>`,
      `${slug}/${lang}/breadcrumbJsonLd`);
    const srcDates = /"datePublished":"([^"]+)"[\s\S]*?"dateModified":"([^"]+)"/.exec(src);
    if (!srcDates) throw new Error(`[${slug}] 找不到 Article JSON-LD 日期`);
    head = replaceBlock(head, '"@type":"Article"', '</script>',
      `"@type":"Article",\n  "headline":"${escJson(D.articleHeadline)}",\n  "description":"${escJson(D.articleDescription)}",\n  "datePublished":"${srcDates[1]}",\n  "dateModified":"${srcDates[2]}",\n  "mainEntityOfPage":"${ORIGIN}${guideTarget(slug, lang)}",\n  "author":{"@type":"Organization","name":"UNI MAX by UniPro","url":"${ORIGIN}/"},\n  "publisher":{"@type":"Organization","name":"UNI MAX by UniPro","url":"${ORIGIN}/"}\n}\n</script>`,
      `${slug}/${lang}/articleJsonLd`);

    /* 5) JSON-LD:FAQPage(整块重建) */
    head = replaceBlock(head, '"@type":"FAQPage"', '}\n</script>',
      `"@type":"FAQPage",\n  ${buildFaqJsonLd(D.faq)}\n}\n</script>`, `${slug}/${lang}/faqJsonLd`);

    /* ---- body ---- */
    /* 6) 语言菜单 + footer 语言组:整块重建 */
    body = replaceBlock(body, '<div class="lang-menu" role="menu">', '</div>', buildLangMenu(slug, lang), `${slug}/${lang}/langMenu`);
    body = replaceBlock(body, '<div class="wsl-flang">', '</div>', buildFooterLang(slug, lang), `${slug}/${lang}/footerLang`);

    /* 7) FAQ 手风琴:整块重建(锚点用 wsl-faq 容器的第一个 <details 到最后一个 </details>) */
    body = replaceBlock(body, '<div class="wsl-faq">\\s*', '</details>\\s*\\n    </div>',
      `<div class="wsl-faq">\n${buildFaqHtml(D.faq)}\n    </div>`, `${slug}/${lang}/faqHtml`);

    /* 8) 头部导航 + footer 共享文案(复用首页字典,'many' 断言 —— FAQ/Become a Partner 等词条在页内不止一处) */
    body = replaceExact(body, '>Overview</a>', `>${S.nav.overview}</a>`, 'once', `${slug}/${lang}/navOverview`);
    body = replaceExact(body, '>Why UNI MAX</a>', `>${S.nav.why}</a>`, 'once', `${slug}/${lang}/navWhy`);
    body = replaceExact(body, '>Partnerships</a>', `>${S.nav.partnerships}</a>`, 'once', `${slug}/${lang}/navPartnerships`);
    body = replaceExact(body, '>About</a>', `>${S.nav.about}</a>`, 'once', `${slug}/${lang}/navAbout`);
    body = replaceExact(body, '>FAQ</a>', `>${S.nav.faq}</a>`, 'many', `${slug}/${lang}/navFaq`);
    body = replaceExact(body, '>Contact</a>', `>${S.nav.contact}</a>`, 'once', `${slug}/${lang}/navContact`);
    body = replaceExact(body, '<span>Become a Partner</span>', `<span>${S.ctaOrder}</span>`, 'many', `${slug}/${lang}/ctaOrder`);
    body = replaceExact(body, 'Back to UNI MAX', S.backToUniMax, 'once', `${slug}/${lang}/backToUniMax`);
    body = replaceExact(body, '<h2>Related reading</h2>', `<h2>${S.relatedReading}</h2>`, 'once', `${slug}/${lang}/relatedReading`);
    body = replaceExact(body, '<p>Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.</p>',
      `<p>${S.footAbout}</p>`, 'once', `${slug}/${lang}/footAbout`);
    body = replaceExact(body, '>Explore</h3>', `>${S.footExplore}</h3>`, 'once', `${slug}/${lang}/footExplore`);
    body = replaceExact(body, '>Benefits</a>', `>${S.nav.benefits}</a>`, 'once', `${slug}/${lang}/footBenefits`);
    body = replaceExact(body, '>Formula</a>', `>${S.nav.formula}</a>`, 'once', `${slug}/${lang}/footFormula`);
    body = replaceExact(body, '>Certified</a>', `>${S.nav.trust}</a>`, 'once', `${slug}/${lang}/footCertified`);
    body = replaceExact(body, '>Product</h3>', `>${S.footProduct}</h3>`, 'once', `${slug}/${lang}/footProductH`);
    body = replaceExact(body, '<li>10g × 30 sachets</li>', `<li>${S.footP[0]}</li>`, 'once', `${slug}/${lang}/footP1`);
    body = replaceExact(body, '<li>Ready-to-drink</li>', `<li>${S.footP[1]}</li>`, 'once', `${slug}/${lang}/footP2`);
    body = replaceExact(body, '<li>Botanical lychee</li>', `<li>${S.footP[2]}</li>`, 'once', `${slug}/${lang}/footP3`);
    body = replaceExact(body, '<li>HALAL certified</li>', `<li>${S.footP[3]}</li>`, 'once', `${slug}/${lang}/footP4`);
    body = replaceExact(body, '>Contact</h3>', `>${S.footContact}</h3>`, 'once', `${slug}/${lang}/footContactH`);
    body = replaceExact(body,
      'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.',
      S.footDisclaimer, 'once', `${slug}/${lang}/disclaimer`);
    body = replaceExact(body, '<span>© <span id="yr">2026</span> UniPro · UNI MAX. All rights reserved.</span>',
      `<span>${S.footCopy.replace('2026', '<span id="yr">2026</span>')}</span>`, 'once', `${slug}/${lang}/footCopy`);
    body = replaceExact(body, '<span>Manufactured in Malaysia by Orient Biotech Sdn Bhd.</span>',
      `<span>${S.footMade}</span>`, 'once', `${slug}/${lang}/footMade`);

    /* 9) 本篇独有正文(H1/导语/H2/段落/表格/CTA note/eyebrow 等) */
    for (const [from, to] of Object.entries(D.html)) {
      body = replaceExact(body, from, to, 'once', `${slug}/${lang}/html`);
    }

    /* 10) 埋点 page 字段(用于归因区分)—— 各篇命名不完全一致(有的是全 slug,有的是缩写),
          不假设具体值,正则找 page: "guide-任意内容" 原样加语言后缀 */
    {
      const pm = /page:\s*"(guide-[a-z0-9-]+)"/.exec(body);
      if (!pm) throw new Error(`[${slug}/${lang}] 找不到埋点 page 字段`);
      body = replaceExact(body, `page: "${pm[1]}"`, `page: "${pm[1]}-${lang}"`, 'once', `${slug}/${lang}/trackingPage`);
    }

    h = head + body;

    /* 11) 站内互链后处理:/guides/other-slug/ 与 /wholesale/ 按目标语言是否已有译版决定去向;
          /# 首页锚点与裸 / 加语言前缀。顺序:先长(/guides/.../、/wholesale/)后短(/#、/)。
          ⚠️ 跳过指向本篇自己的 /guides/${slug}/ —— 那是语言菜单里"English"那一项,
          buildLangMenu 已经正确定案为英文源页,这里再扫一遍会把它错改成当前目标语言
          (第一次真实踩到:zh 版菜单里的 English 选项被错误指回了 zh 版自己)。 */
    h = h.replace(/href="\/guides\/([a-z0-9-]+)\/"/g, (m, s) => s === slug ? m : `href="${guideTarget(s, lang)}"`);
    h = h.replace(/href="\/wholesale\/"/g, `href="${wholesaleTarget(lang)}"`);
    h = h.split('href="/#').join(`href="${home(lang)}#`);
    h = replaceExact(h, '<a href="/" class="brand logo"', `<a href="${home(lang)}" class="brand logo"`, 'once', `${slug}/${lang}/brand`);
    h = replaceExact(h, '<a href="/" class="wsl-back">', `<a href="${home(lang)}" class="wsl-back">`, 'once', `${slug}/${lang}/back`);

    /* 12) 生成标记 */
    h = h.replace('<head>', `<head>\n<!-- 本文件由 scripts/gen-guide-pages.js 从 guides/${slug}/index.html 生成。语言: ${lang}。\n     直接改本文件会在下次生成时被覆盖 —— 内容改英文源页,译文改 scripts/i18n-guides/${slug}.js。 -->`);

    const outDir = path.join(ROOT, lang, 'guides', slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), h, 'utf8');

    const leftover = countEnglishLeftover(h);
    console.log(`/${lang}/guides/${slug}/  写出 ${h.length} 字节  |  html 词条 ${Object.keys(D.html).length} 条`
      + (leftover.length ? `\n    ⚠️ 疑似未译: ${leftover.join(' / ')}` : '  ✓ 无残留英文正文'));
  }

  updateEnglishSource(slug);
}

/* ---------- 英文源页回写:语言菜单/footer 语言组指向真实译文 + 补 hreflang alternate ----------
   本篇一旦有了译文字典,源页原本"无译版,不加 hreflang"的状态就过时了 —— 这里同步改掉,
   而不是留着旧状态等人手动发现。只改语言相关的这几处,正文一个字不动。 */
function updateEnglishSource(slug) {
  const SRC = path.join(guidesDir, slug, 'index.html');
  let h = fs.readFileSync(SRC, 'utf8');
  const before = h;

  h = h.replace(/<!-- 单语言页:无译版[\s\S]*?-->\n?/, '');

  const hreflangBlock = ALL_LANGS
    .map(l => `<link rel="alternate" hreflang="${HREF_LANG[l]}" href="${ORIGIN}${guideTarget(slug, l)}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}/guides/${slug}/" />`)
    .join('\n');
  if (!h.includes('rel="alternate" hreflang="zh-Hans"')) {
    h = replaceExact(h, '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
      `${hreflangBlock}\n<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`, 'once', `${slug}/en/insertHreflang`);
  }

  h = replaceBlock(h, '<div class="lang-menu" role="menu">', '</div>', buildLangMenu(slug, 'en'), `${slug}/en/langMenu`);
  h = replaceBlock(h, '<div class="wsl-flang">', '</div>', buildFooterLang(slug, 'en'), `${slug}/en/footerLang`);

  if (h !== before) {
    fs.writeFileSync(SRC, h, 'utf8');
    console.log(`  ↳ 英文源页 guides/${slug}/ 语言菜单 + hreflang 已同步指向真实译文`);
  }
}

function replaceTag(html, re, rebuilt, where) {
  const matches = html.match(new RegExp(re.source, 'g'));
  if (!matches || matches.length !== 1) throw new Error(`[${where}] 期望恰好 1 次,实际 ${matches ? matches.length : 0} 次`);
  return html.replace(re, rebuilt);
}

/* 粗筛:正文里是否还留着成句的英文(同 gen-wholesale-pages.js 的判据) */
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
