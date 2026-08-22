/* guides/* 8 篇文章页共用的头部/footer 文案(所有 guide 页的头尾骨架字节完全一致,
 * 只有自引用 slug URL 和 WhatsApp 预填文案的新旧格式不同 —— 这部分不进这个共享表)。
 *
 * 全部复用首页字典(i18n-dict.js)已核准的译文,不新起一套 —— 首页改名这里自动跟随。
 * 只有 guide 页独有、首页没有的几个短语(Back to UNI MAX / Related reading)是这里新增的。
 *
 * 用法:scripts/gen-guide-pages.js 对每篇 guide、每个语言,先套这张共享表,
 * 再套 scripts/i18n-guides/<slug>.js 里该篇独有的正文/FAQ/JSON-LD 译文。
 */
const home = require('../i18n-dict.js');

const DOC_LANG = { zh: 'zh-Hans', ms: 'ms', pl: 'pl', nl: 'nl', de: 'de' };

function build(lang) {
  const h = home[lang];
  return {
    docLang: DOC_LANG[lang],
    backToUniMax: { zh: '返回 UNI MAX', ms: 'Kembali ke UNI MAX', pl: 'Powrót do UNI MAX', nl: 'Terug naar UNI MAX', de: 'Zurück zu UNI MAX' }[lang],
    relatedReading: { zh: '相关阅读', ms: 'Bacaan berkaitan', pl: 'Powiązane artykuły', nl: 'Gerelateerd lezen', de: 'Weiterführende Artikel' }[lang],
    nav: {
      overview: h['nav.overview'], why: h['nav.why'], partnerships: h['nav.partnerships'],
      about: h['nav.about'], faq: h['nav.faq'], contact: h['nav.contact'],
      benefits: h['nav.benefits'], formula: h['nav.formula'], trust: h['nav.trust'],
    },
    ctaOrder: h['cta.order'],
    footAbout: h['foot.about'],
    footExplore: h['foot.explore'],
    footProduct: h['foot.product'],
    footContact: h['foot.contact'],
    footP: [h['foot.p1'], h['foot.p2'], h['foot.p3'], h['foot.p4']],
    footDisclaimer: h['foot.disclaimer'],
    footCopy: h['foot.copy'],
    footMade: h['foot.made'],
  };
}

module.exports = { zh: build('zh'), ms: build('ms'), pl: build('pl'), nl: build('nl'), de: build('de') };
