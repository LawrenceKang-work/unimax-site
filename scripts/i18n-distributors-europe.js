/* for-distributors-europe/ 的五语译文。
 * 结构与 i18n-guides/*.js 一致(meta/breadcrumbName/articleHeadline/articleDescription/faq/html),
 * 但该页不在 guides/ 目录下,由专门的 gen-distributors-europe-pages.js 处理,不复用 gen-guide-pages.js。
 * 共享导航/footer 文案直接 require 首页字典(同 i18n-guides/_shared.js 的做法)。
 * 认证名称(GMP/MeSTI/HALAL (JAKIM)/ISO 9001/HACCP)与公司名(UniPro/Orient Biotech Sdn Bhd/
 * Wellness Alliance/Wellness Network GmbH)原样保留,不翻译。
 */
const home = require('./i18n-dict.js');
const DOC_LANG = { zh: 'zh-Hans', ms: 'ms', pl: 'pl', nl: 'nl', de: 'de' };

const TABLE_EN = `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>What you build</th><th>What you carry</th></tr>
        </thead>
        <tbody>
          <tr><td>Private label / own brand</td><td>Formula, brand, packaging, compliance</td><td>Everything, including formulation and unsold-inventory risk</td></tr>
          <tr><td>Distribute UNI MAX</td><td>Nothing — the brand is ready-made</td><td>Sales and distribution in your market</td></tr>
        </tbody>
      </table>`;

const CHAIN_EN = `      <ol class="gd-chain">
        <li><b>UniPro</b> — the brand owner behind UNI MAX.</li>
        <li><b>Orient Biotech Sdn Bhd</b> — the producing facility in Malaysia; the GMP, MeSTI, HALAL, ISO 9001 and HACCP certificates are registered here.</li>
        <li><b>Wellness Alliance</b> — international distribution.</li>
        <li class="is-you"><b>Wellness Network GmbH</b> — the European partnership desk. This is who you deal with for the European market.</li>
      </ol>`;

const UL_TIERS_EN = `      <ul>
        <li><strong>Stockist / trial</strong> — a suggested first order of 12–24 boxes to test your shelf.</li>
        <li><strong>Wholesale partner</strong> — typically 50–100 boxes.</li>
        <li><strong>Regional distributor</strong> — 300+ boxes, for partners taking a market.</li>
      </ul>`;

function shared(lang) {
  const h = home[lang];
  return {
    docLang: DOC_LANG[lang],
    backToUniMax: { zh: '返回 UNI MAX', ms: 'Kembali ke UNI MAX', pl: 'Powrót do UNI MAX', nl: 'Terug naar UNI MAX', de: 'Zurück zu UNI MAX' }[lang],
    relatedReading: { zh: '相关阅读', ms: 'Bacaan berkaitan', pl: 'Powiązane artykuły', nl: 'Gerelateerd lezen', de: 'Weiterführende Artikel' }[lang],
    nav: { overview: h['nav.overview'], why: h['nav.why'], partnerships: h['nav.partnerships'], about: h['nav.about'], faq: h['nav.faq'], contact: h['nav.contact'], benefits: h['nav.benefits'], formula: h['nav.formula'], trust: h['nav.trust'] },
    ctaOrder: h['cta.order'],
    footAbout: h['foot.about'], footExplore: h['foot.explore'], footProduct: h['foot.product'], footContact: h['foot.contact'],
    footP: [h['foot.p1'], h['foot.p2'], h['foot.p3'], h['foot.p4']],
    footDisclaimer: h['foot.disclaimer'], footCopy: h['foot.copy'], footMade: h['foot.made'],
  };
}

module.exports = {

zh: {
  shared: shared('zh'),
  meta: {
    title: '面向欧洲的清真活力 Shot 供应商 — 分销 UNI MAX | UNI MAX',
    desc: '在你的欧洲市场分销一款成品、清真认证的东革阿里活力饮。零售就绪成品盒、现成品牌、欧洲合作台 —— 不用研发配方，不用建工厂。',
    ogTitle: '面向欧洲的清真活力饮供应商 — 分销 UNI MAX',
    ogDesc: '一款为欧洲分销商准备的成品、清真认证的东革阿里活力饮 —— 零售就绪、品牌自有，通过我们的欧洲合作伙伴交付。',
  },
  breadcrumbName: '面向欧洲分销商',
  articleHeadline: '在欧洲分销一款成品清真活力饮',
  articleDescription: '欧洲分销商如何把一款成品、清真认证的东革阿里活力饮加入自己的产品线 —— 品牌自有产品、认证工厂、零售就绪成品盒与欧洲合作台。',
  faq: [
    { q: '我要怎么成为欧洲的 UNI MAX 分销商？', a: '在 WhatsApp 上告诉我们你的市场与预计采购量。欧洲订单通过我们的欧洲分销合作伙伴处理，所以你所在地区的条款与交付会由一个常驻欧洲的合作台来安排，而不只是从马来西亚这一边。' },
    { q: 'UNI MAX 是贴牌代工，还是一个成品品牌？', a: '是一个成品、品牌自有的产品。和贴牌代工不同——贴牌需要你自己研发配方、自己打造品牌——你分销的是一个现成的 UNI MAX 品牌，产品、包装、配方与认证都已经现成。你要做的只是把它加进你的产品线并卖出去。' },
    { q: '这款产品持有哪些认证？', a: 'GMP、MeSTI、HALAL（JAKIM）、ISO 9001 与 HACCP，均登记在生产工厂 Orient Biotech Sdn Bhd 名下。证书每年更新，如果你需要用于尽职调查的当前版本，联系我们时提出即可，我们会发送最新版。' },
    { q: '产品是怎么运送到欧洲的？', a: '通过我们的欧洲分销合作伙伴。进口以及你所在本地市场的具体安排，会由负责你所在地区的合作伙伴来搭建，所以你对接的是一个常驻欧洲的合作台。' },
    { q: '最低订购量是多少？', a: '试销起点很小——首笔零售代销商订单建议 12–24 盒（每盒 30 × 10 克即饮独立包），批发伙伴 50–100 盒，区域分销商 300 盒以上。实际数量与条款以询价确认为准。' },
  ],
  html: {
    'For Distributors · Europe': '面向分销商 · 欧洲',
    'Distribute a ready-to-sell halal vitality drink in Europe.': '在欧洲分销一款即可上架销售的清真活力饮。',
    'UNI MAX is a finished, halal-certified botanical vitality drink — 30 ready-to-drink sachets to a box, already branded and documented. For a European distributor, that means a shelf-ready product you can add to your range without developing a formula, building a factory, or chasing certifications yourself.':
      'UNI MAX 是一款成品、清真认证的植物活力饮 —— 每盒 30 包即饮独立包，品牌与文件都已现成。对欧洲分销商来说，这意味着一款可以直接上架的产品，你无需自己研发配方、建工厂，也不用自己去申请各项认证。',

    'Distributing a finished brand vs. private label': '分销一个成品品牌 vs 贴牌代工',
    'If you have been looking at <em>private label supplements in Europe</em>, you already know the work it asks for: develop a formula, commission a factory, own the labelling and the compliance, and carry the risk if it does not move. Distributing a finished brand is the other route — the product, packaging, formula and certifications already exist, and you carry the finished goods into your market.':
      '如果你一直在考虑<em>在欧洲做贴牌补剂</em>，你应该已经知道这条路要花多少功夫：研发配方、委托工厂生产、自己负责标签与合规，卖不动的话风险也自己扛。分销一个成品品牌是另一条路——产品、包装、配方与认证都已经现成，你要做的是把这些成品带进你的市场。',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>路径</th><th>你要打造什么</th><th>你要承担什么</th></tr>
        </thead>
        <tbody>
          <tr><td>贴牌代工／自有品牌</td><td>配方、品牌、包装、合规</td><td>一切都要你自己扛，包括配方研发与滞销库存的风险</td></tr>
          <tr><td>分销 UNI MAX</td><td>什么都不用打造——品牌已经现成</td><td>在你的市场做销售与分销</td></tr>
        </tbody>
      </table>`,
    'UNI MAX is <strong>brand-owned by UniPro</strong> and produced at a certified facility — a ready-made brand, not a blank you have to build. You are adding a finished product to your range, not starting a manufacturing project.':
      'UNI MAX <strong>品牌归 UniPro 所有</strong>，在一家认证工厂生产 —— 是一个现成的品牌，而不是一张需要你自己从头填的白纸。你要做的是把一款成品加进你的产品线，而不是启动一个生产项目。',

    'What you would be distributing': '你将要分销的是什么',
    "UNI MAX is a botanical lychee vitality drink with Tongkat Ali, supplied as <strong>10&nbsp;g × 30 ready-to-drink sachets</strong> per retail box. It sits in the men's vitality and energy category, and the sachet format merchandises like a beverage rather than competing on a shelf of identical capsule bottles — a format difference that gives a distributor something distinct to place.":
      'UNI MAX 是一款含东革阿里的植物荔枝活力饮，以每个零售盒 <strong>10&nbsp;克 × 30 包即饮独立包</strong>的形式供货。它属于男性活力与能量这个品类，独立包的形态陈列起来更像一款饮料，而不是在一整墙一模一样的胶囊瓶里硬拼——这种形态上的差异，能让分销商拿出一款有区分度的产品来铺货。',

    'Certifications': '认证',
    'UNI MAX is produced under our manufacturing partner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, which holds:':
      'UNI MAX 由我们的生产合作伙伴 <strong>Orient Biotech Sdn&nbsp;Bhd</strong> 生产，该工厂持有以下认证：',
    "These certificates are renewed every year. Between a certificate's expiry and the re-issued copy being uploaded here there can be a short display gap, so the versions shown may not always be the latest — please bear with us. If you would like the <strong>current certificate for your due diligence, just ask when you contact us</strong> and we will send the latest copy.":
      '这些证书每年更新一次。从证书到期到新版证书上传到本站之间，可能会有短暂的展示空档，所以本站展示的版本不一定始终是最新的，还请见谅。如果你出于尽职调查<strong>需要当前有效的证书，联系我们时提出即可</strong>，我们会发送最新版本。',

    'Who you are working with': '你实际对接的是谁',
    'UNI MAX runs on a four-part supply chain. The certifications above are registered to the producing facility (link 02), and your day-to-day contact for Europe is the last link:':
      'UNI MAX 运作在一条四方供应链上。以上认证登记在生产工厂（第 02 环）名下，而你在欧洲的日常对接方是链条上的最后一环：',
    [CHAIN_EN]: `      <ol class="gd-chain">
        <li><b>UniPro</b> —— UNI MAX 背后的品牌方。</li>
        <li><b>Orient Biotech Sdn Bhd</b> —— 位于马来西亚的生产工厂，GMP、MeSTI、HALAL、ISO 9001 与 HACCP 证书均登记在这里。</li>
        <li><b>Wellness Alliance</b> —— 国际分销。</li>
        <li class="is-you"><b>Wellness Network GmbH</b> —— 欧洲合作台。这就是你在欧洲市场要对接的人。</li>
      </ol>`,

    'How European delivery works': '欧洲交付如何运作',
    'European orders are handled through our <strong>European distribution partner</strong> (Wellness Network GmbH). Importation and the arrangements for your local market are set up with the partner for your territory — so you work with a Europe-based desk, not only a Malaysian office. Tell us your market and we will point you to the right terms.':
      '欧洲订单通过我们的<strong>欧洲分销合作伙伴</strong>（Wellness Network GmbH）处理。进口以及你所在本地市场的具体安排，会由负责你所在地区的合作伙伴来搭建 —— 所以你对接的是一个常驻欧洲的合作台，而不只是马来西亚这边的办公室。告诉我们你的市场，我们会为你指向合适的条款。',

    'Partnership levels': '合作分级',
    [UL_TIERS_EN]: `      <ul>
        <li><strong>零售代销商／试销</strong>——建议首单 12–24 盒，用来测试你的货架。</li>
        <li><strong>批发伙伴</strong>——通常 50–100 盒。</li>
        <li><strong>区域分销商</strong>——300 盒以上，适合正在拿下一个市场的合作伙伴。</li>
      </ul>`,
    'Actual quantities, pricing and terms are confirmed on enquiry and discussed directly over WhatsApp. A first position costs a trial, not a container.':
      '实际数量、价格与条款以询价确认为准，直接通过 WhatsApp 沟通。踏入这个产品的第一步，花的是一次试销的成本，不是一整个货柜的成本。',

    'Distributor FAQ': '分销商常见问题',
    'What European distributors ask first.': '欧洲分销商最先问的问题。',

    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX 批发与分销</a>',
    "Wholesale supplements for resale: buyer's guide</a>": '转售用批发补剂：买家指南</a>',
    '>Start a supplement business — or become a distributor?</a>': '>自创补剂品牌——还是做分销商？</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>如何甄选东革阿里供应商</a>',

    'Become a UNI MAX distributor in Europe.': '成为 UNI MAX 在欧洲的分销商。',
    'A finished, halal-certified vitality drink for your market — ready-to-shelf boxes, brand-owned, delivered via our European partner. Tell us your territory and we will confirm terms.':
      '一款为你的市场准备的成品、清真认证活力饮 —— 即可上架的成品盒、品牌自有，通过我们的欧洲合作伙伴交付。告诉我们你所在的地区，我们会为你确认合作条款。',
  },
},

ms: {
  shared: shared('ms'),
  meta: {
    title: 'Pembekal Energy Shot Halal untuk Eropah — Edarkan UNI MAX | UNI MAX',
    desc: 'Edarkan minuman vitaliti Tongkat Ali siap, bertauliah halal di pasaran Eropah anda. Kotak sedia-runcit, jenama sedia dibuat dan meja perkongsian Eropah — tiada formula untuk dibangunkan, tiada kilang untuk dibina.',
    ogTitle: 'Pembekal Minuman Vitaliti Halal untuk Eropah — Edarkan UNI MAX',
    ogDesc: 'Minuman vitaliti Tongkat Ali siap, bertauliah halal untuk pengedar Eropah — sedia-runcit, dimiliki jenama, dihantar melalui rakan Eropah kami.',
  },
  breadcrumbName: 'Untuk Pengedar di Eropah',
  articleHeadline: 'Edarkan minuman vitaliti halal siap di Eropah',
  articleDescription: 'Bagaimana pengedar Eropah boleh menambah minuman vitaliti Tongkat Ali siap, bertauliah halal ke dalam julat mereka — produk milik jenama, kemudahan bertauliah, kotak sedia-runcit dan meja perkongsian Eropah.',
  faq: [
    { q: 'Bagaimana saya boleh menjadi pengedar UNI MAX di Eropah?', a: 'Mesej kami di WhatsApp dengan pasaran anda dan jumlah yang anda fikirkan. Pesanan Eropah diuruskan melalui rakan pengedaran Eropah kami, jadi terma dan penghantaran untuk wilayah anda diatur dengan meja berpangkalan Eropah, bukan hanya dari Malaysia.' },
    { q: 'Adakah UNI MAX label persendirian, atau jenama siap?', a: 'Produk siap, dimiliki jenama. Berbeza dengan label persendirian, di mana anda membangunkan formula dan membina jenama sendiri, anda mengedarkan jenama UNI MAX yang sedia dibuat — produk, pembungkusan, formula dan pensijilan sudah wujud. Anda menambahnya ke dalam julat anda dan menjualnya.' },
    { q: 'Pensijilan apa yang dibawa produk ini?', a: 'GMP, MeSTI, HALAL (JAKIM), ISO 9001 dan HACCP, didaftarkan kepada kemudahan pengeluar Orient Biotech Sdn Bhd. Sijil diperbaharui setiap tahun; jika anda memerlukan salinan semasa untuk usaha wajar, tanya semasa anda menghubungi kami dan kami akan menghantar yang terkini.' },
    { q: 'Bagaimana produk dihantar ke Eropah?', a: 'Melalui rakan pengedaran Eropah kami. Pengimportan dan pengaturan untuk pasaran tempatan anda disediakan dengan rakan untuk wilayah anda, jadi anda bekerja dengan meja berpangkalan Eropah.' },
    { q: 'Apakah pesanan minimum?', a: 'Kedudukan percubaan bermula kecil — dicadangkan 12–24 kotak untuk pesanan penstok pertama, 50–100 kotak untuk rakan pemborongan dan 300+ untuk pengedar serantau. Kuantiti dan terma sebenar disahkan semasa pertanyaan.' },
  ],
  html: {
    'For Distributors · Europe': 'Untuk Pengedar · Eropah',
    'Distribute a ready-to-sell halal vitality drink in Europe.': 'Edarkan minuman vitaliti halal sedia jual di Eropah.',
    'UNI MAX is a finished, halal-certified botanical vitality drink — 30 ready-to-drink sachets to a box, already branded and documented. For a European distributor, that means a shelf-ready product you can add to your range without developing a formula, building a factory, or chasing certifications yourself.':
      'UNI MAX ialah minuman vitaliti botani siap, bertauliah halal — 30 sachet sedia minum sekotak, sudah berjenama dan berdokumentasi. Bagi pengedar Eropah, itu bermakna produk sedia rak yang boleh anda tambah ke julat anda tanpa membangunkan formula, membina kilang, atau mengejar pensijilan sendiri.',

    'Distributing a finished brand vs. private label': 'Mengedar jenama siap vs label persendirian',
    'If you have been looking at <em>private label supplements in Europe</em>, you already know the work it asks for: develop a formula, commission a factory, own the labelling and the compliance, and carry the risk if it does not move. Distributing a finished brand is the other route — the product, packaging, formula and certifications already exist, and you carry the finished goods into your market.':
      'Jika anda pernah melihat <em>suplemen label persendirian di Eropah</em>, anda sudah tahu kerja yang dituntutnya: membangunkan formula, mengontrak kilang, memiliki pelabelan dan pematuhan, dan menanggung risiko jika ia tidak laku. Mengedar jenama siap ialah laluan lain — produk, pembungkusan, formula dan pensijilan sudah wujud, dan anda membawa barangan siap ke pasaran anda.',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Laluan</th><th>Apa yang anda bina</th><th>Apa yang anda bawa</th></tr>
        </thead>
        <tbody>
          <tr><td>Label persendirian / jenama sendiri</td><td>Formula, jenama, pembungkusan, pematuhan</td><td>Segalanya, termasuk formulasi dan risiko inventori tidak terjual</td></tr>
          <tr><td>Edarkan UNI MAX</td><td>Tiada apa — jenama sudah sedia dibuat</td><td>Jualan dan pengedaran di pasaran anda</td></tr>
        </tbody>
      </table>`,
    'UNI MAX is <strong>brand-owned by UniPro</strong> and produced at a certified facility — a ready-made brand, not a blank you have to build. You are adding a finished product to your range, not starting a manufacturing project.':
      'UNI MAX <strong>dimiliki jenama oleh UniPro</strong> dan dihasilkan di kemudahan bertauliah — jenama yang sedia dibuat, bukan kosong yang perlu anda bina. Anda menambah produk siap ke julat anda, bukan memulakan projek pembuatan.',

    'What you would be distributing': 'Apa yang akan anda edarkan',
    "UNI MAX is a botanical lychee vitality drink with Tongkat Ali, supplied as <strong>10&nbsp;g × 30 ready-to-drink sachets</strong> per retail box. It sits in the men's vitality and energy category, and the sachet format merchandises like a beverage rather than competing on a shelf of identical capsule bottles — a format difference that gives a distributor something distinct to place.":
      'UNI MAX ialah minuman vitaliti laici botani dengan Tongkat Ali, dibekalkan sebagai <strong>10&nbsp;g × 30 sachet sedia minum</strong> setiap kotak runcit. Ia berada dalam kategori vitaliti dan tenaga lelaki, dan format sachet diperdagangkan seperti minuman berbanding bersaing di rak botol kapsul yang serupa — perbezaan format yang memberi pengedar sesuatu yang berbeza untuk diletakkan.',

    'Certifications': 'Pensijilan',
    'UNI MAX is produced under our manufacturing partner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, which holds:':
      'UNI MAX dihasilkan di bawah rakan pengilangan kami <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, yang memegang:',
    "These certificates are renewed every year. Between a certificate's expiry and the re-issued copy being uploaded here there can be a short display gap, so the versions shown may not always be the latest — please bear with us. If you would like the <strong>current certificate for your due diligence, just ask when you contact us</strong> and we will send the latest copy.":
      'Sijil ini diperbaharui setiap tahun. Antara luput sijil dan salinan yang dikeluarkan semula dimuat naik di sini, mungkin ada jurang paparan yang singkat, jadi versi yang dipaparkan mungkin tidak selalu yang terkini — harap maklum. Jika anda mahukan <strong>sijil semasa untuk usaha wajar anda, tanya sahaja semasa anda menghubungi kami</strong> dan kami akan menghantar salinan terkini.',

    'Who you are working with': 'Dengan siapa anda bekerja',
    'UNI MAX runs on a four-part supply chain. The certifications above are registered to the producing facility (link 02), and your day-to-day contact for Europe is the last link:':
      'UNI MAX beroperasi pada rantaian bekalan empat bahagian. Pensijilan di atas didaftarkan kepada kemudahan pengeluar (pautan 02), dan kenalan harian anda untuk Eropah ialah pautan terakhir:',
    [CHAIN_EN]: `      <ol class="gd-chain">
        <li><b>UniPro</b> — pemilik jenama di sebalik UNI MAX.</li>
        <li><b>Orient Biotech Sdn Bhd</b> — kemudahan pengeluar di Malaysia; sijil GMP, MeSTI, HALAL, ISO 9001 dan HACCP didaftarkan di sini.</li>
        <li><b>Wellness Alliance</b> — pengedaran antarabangsa.</li>
        <li class="is-you"><b>Wellness Network GmbH</b> — meja perkongsian Eropah. Ini adalah siapa yang anda berurusan untuk pasaran Eropah.</li>
      </ol>`,

    'How European delivery works': 'Bagaimana penghantaran Eropah berfungsi',
    'European orders are handled through our <strong>European distribution partner</strong> (Wellness Network GmbH). Importation and the arrangements for your local market are set up with the partner for your territory — so you work with a Europe-based desk, not only a Malaysian office. Tell us your market and we will point you to the right terms.':
      'Pesanan Eropah diuruskan melalui <strong>rakan pengedaran Eropah</strong> kami (Wellness Network GmbH). Pengimportan dan pengaturan untuk pasaran tempatan anda disediakan dengan rakan untuk wilayah anda — jadi anda bekerja dengan meja berpangkalan Eropah, bukan hanya pejabat Malaysia. Beritahu kami pasaran anda dan kami akan tunjukkan terma yang betul.',

    'Partnership levels': 'Tahap kerjasama',
    [UL_TIERS_EN]: `      <ul>
        <li><strong>Penstok / percubaan</strong> — pesanan pertama yang dicadangkan 12–24 kotak untuk menguji rak anda.</li>
        <li><strong>Rakan pemborongan</strong> — biasanya 50–100 kotak.</li>
        <li><strong>Pengedar serantau</strong> — 300+ kotak, untuk rakan kongsi yang mengambil pasaran.</li>
      </ul>`,
    'Actual quantities, pricing and terms are confirmed on enquiry and discussed directly over WhatsApp. A first position costs a trial, not a container.':
      'Kuantiti, harga dan terma sebenar disahkan semasa pertanyaan dan dibincangkan terus melalui WhatsApp. Kedudukan pertama kosnya setanding percubaan, bukan kontena.',

    'Distributor FAQ': 'Soalan Lazim Pengedar',
    'What European distributors ask first.': 'Apa yang ditanya pengedar Eropah dahulu.',

    '>UNI MAX wholesale &amp; distribution</a>': '>Pemborongan &amp; pengedaran UNI MAX</a>',
    "Wholesale supplements for resale: buyer's guide</a>": 'Suplemen borong untuk dijual semula: panduan pembeli</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Mulakan perniagaan suplemen — atau jadi pengedar?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Memilih pembekal Tongkat Ali</a>',

    'Become a UNI MAX distributor in Europe.': 'Jadi pengedar UNI MAX di Eropah.',
    'A finished, halal-certified vitality drink for your market — ready-to-shelf boxes, brand-owned, delivered via our European partner. Tell us your territory and we will confirm terms.':
      'Minuman vitaliti siap, bertauliah halal untuk pasaran anda — kotak sedia-rak, dimiliki jenama, dihantar melalui rakan Eropah kami. Beritahu kami wilayah anda dan kami akan sahkan terma.',
  },
},

pl: {
  shared: shared('pl'),
  meta: {
    title: 'Halal Energy Shot dla Europy — Dystrybuuj UNI MAX | UNI MAX',
    desc: 'Dystrybuuj gotowy, certyfikowany halal napój witalny z Tongkat Ali na swoim rynku europejskim. Pudełka gotowe do sprzedaży, gotowa marka i europejskie biuro partnerstwa — bez opracowywania receptury, bez budowy fabryki.',
    ogTitle: 'Dostawca Halal Napoju Witalnego dla Europy — Dystrybuuj UNI MAX',
    ogDesc: 'Gotowy, certyfikowany halal napój witalny z Tongkat Ali dla europejskich dystrybutorów — gotowy do sprzedaży, należący do marki, dostarczany przez naszego europejskiego partnera.',
  },
  breadcrumbName: 'Dla Dystrybutorów w Europie',
  articleHeadline: 'Dystrybuuj gotowy halal napój witalny w Europie',
  articleDescription: 'Jak europejscy dystrybutorzy mogą dodać gotowy, certyfikowany halal napój witalny z Tongkat Ali do swojej oferty — produkt należący do marki, certyfikowany zakład, pudełka gotowe do sprzedaży i europejskie biuro partnerstwa.',
  faq: [
    { q: 'Jak zostać dystrybutorem UNI MAX w Europie?', a: 'Napisz do nas na WhatsApp, podając swój rynek i wolumeny, które masz na myśli. Zamówienia europejskie są obsługiwane przez naszego europejskiego partnera dystrybucyjnego, więc warunki i dostawa dla twojego terytorium są ustalane z biurem opartym w Europie, a nie tylko z Malezji.' },
    { q: 'Czy UNI MAX to private label, czy gotowa marka?', a: 'Gotowy produkt należący do marki. W przeciwieństwie do private label, gdzie sam opracowujesz recepturę i budujesz markę, dystrybuujesz gotową markę UNI MAX — produkt, opakowanie, receptura i certyfikaty już istnieją. Dodajesz ją do swojej oferty i sprzedajesz.' },
    { q: 'Jakie certyfikaty posiada produkt?', a: 'GMP, MeSTI, HALAL (JAKIM), ISO 9001 i HACCP, zarejestrowane na zakład produkcyjny Orient Biotech Sdn Bhd. Certyfikaty są odnawiane corocznie; jeśli potrzebujesz aktualnej kopii do due diligence, zapytaj przy kontakcie z nami, a wyślemy najnowszą.' },
    { q: 'Jak produkt jest dostarczany do Europy?', a: 'Przez naszego europejskiego partnera dystrybucyjnego. Import i ustalenia dla twojego lokalnego rynku są ustalane z partnerem dla twojego terytorium, więc współpracujesz z biurem opartym w Europie.' },
    { q: 'Jakie jest minimalne zamówienie?', a: 'Pozycja próbna zaczyna się od małej skali — sugerowane 12–24 pudełek na pierwsze zamówienie punktu sprzedaży, 50–100 pudełek dla partnerów hurtowych i 300+ dla dystrybutorów regionalnych. Rzeczywiste ilości i warunki są potwierdzane przy zapytaniu.' },
  ],
  html: {
    'For Distributors · Europe': 'Dla Dystrybutorów · Europa',
    'Distribute a ready-to-sell halal vitality drink in Europe.': 'Dystrybuuj gotowy do sprzedaży halal napój witalny w Europie.',
    'UNI MAX is a finished, halal-certified botanical vitality drink — 30 ready-to-drink sachets to a box, already branded and documented. For a European distributor, that means a shelf-ready product you can add to your range without developing a formula, building a factory, or chasing certifications yourself.':
      'UNI MAX to gotowy, certyfikowany halal botaniczny napój witalny — 30 saszetek gotowych do picia w pudełku, już oznakowany marką i udokumentowany. Dla europejskiego dystrybutora oznacza to produkt gotowy do sprzedaży, który możesz dodać do swojej oferty bez opracowywania receptury, budowania fabryki czy samodzielnego zdobywania certyfikatów.',

    'Distributing a finished brand vs. private label': 'Dystrybucja gotowej marki a private label',
    'If you have been looking at <em>private label supplements in Europe</em>, you already know the work it asks for: develop a formula, commission a factory, own the labelling and the compliance, and carry the risk if it does not move. Distributing a finished brand is the other route — the product, packaging, formula and certifications already exist, and you carry the finished goods into your market.':
      'Jeśli przyglądałeś się <em>suplementom private label w Europie</em>, już wiesz, jakiej pracy to wymaga: opracowanie receptury, zlecenie produkcji fabryce, odpowiedzialność za etykietowanie i zgodność oraz ponoszenie ryzyka, jeśli produkt się nie sprzeda. Dystrybucja gotowej marki to inna droga — produkt, opakowanie, receptura i certyfikaty już istnieją, a ty wprowadzasz gotowy towar na swój rynek.',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Droga</th><th>Co budujesz</th><th>Co nosisz</th></tr>
        </thead>
        <tbody>
          <tr><td>Private label / własna marka</td><td>Receptura, marka, opakowanie, zgodność</td><td>Wszystko, w tym recepturę i ryzyko niesprzedanego zapasu</td></tr>
          <tr><td>Dystrybuuj UNI MAX</td><td>Nic — marka jest gotowa</td><td>Sprzedaż i dystrybucję na twoim rynku</td></tr>
        </tbody>
      </table>`,
    'UNI MAX is <strong>brand-owned by UniPro</strong> and produced at a certified facility — a ready-made brand, not a blank you have to build. You are adding a finished product to your range, not starting a manufacturing project.':
      'UNI MAX <strong>należy do marki UniPro</strong> i jest produkowany w certyfikowanym zakładzie — to gotowa marka, a nie pusta karta, którą musisz zbudować. Dodajesz gotowy produkt do swojej oferty, a nie rozpoczynasz projekt produkcyjny.',

    'What you would be distributing': 'Co byłbyś dystrybutorem',
    "UNI MAX is a botanical lychee vitality drink with Tongkat Ali, supplied as <strong>10&nbsp;g × 30 ready-to-drink sachets</strong> per retail box. It sits in the men's vitality and energy category, and the sachet format merchandises like a beverage rather than competing on a shelf of identical capsule bottles — a format difference that gives a distributor something distinct to place.":
      'UNI MAX to botaniczny napój witalny liczi z Tongkat Ali, dostarczany jako <strong>10&nbsp;g × 30 saszetek gotowych do picia</strong> w pudełku detalicznym. Znajduje się w kategorii witalności i energii dla mężczyzn, a format saszetki jest prezentowany jak napój, zamiast konkurować na półce z identycznymi butelkami kapsułek — różnica formatu, która daje dystrybutorowi coś wyróżniającego się do zaoferowania.',

    'Certifications': 'Certyfikaty',
    'UNI MAX is produced under our manufacturing partner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, which holds:':
      'UNI MAX jest produkowany przez naszego partnera produkcyjnego <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, który posiada:',
    "These certificates are renewed every year. Between a certificate's expiry and the re-issued copy being uploaded here there can be a short display gap, so the versions shown may not always be the latest — please bear with us. If you would like the <strong>current certificate for your due diligence, just ask when you contact us</strong> and we will send the latest copy.":
      'Te certyfikaty są odnawiane co roku. Między wygaśnięciem certyfikatu a przesłaniem tutaj ponownie wydanej kopii może wystąpić krótka luka w wyświetlaniu, więc pokazane wersje mogą nie zawsze być najnowsze — prosimy o wyrozumiałość. Jeśli chcesz uzyskać <strong>aktualny certyfikat do swojego due diligence, po prostu zapytaj przy kontakcie z nami</strong>, a wyślemy najnowszą kopię.',

    'Who you are working with': 'Z kim współpracujesz',
    'UNI MAX runs on a four-part supply chain. The certifications above are registered to the producing facility (link 02), and your day-to-day contact for Europe is the last link:':
      'UNI MAX działa w oparciu o czteroczęściowy łańcuch dostaw. Powyższe certyfikaty są zarejestrowane na zakład produkcyjny (ogniwo 02), a twoim codziennym kontaktem dla Europy jest ostatnie ogniwo:',
    [CHAIN_EN]: `      <ol class="gd-chain">
        <li><b>UniPro</b> — właściciel marki stojący za UNI MAX.</li>
        <li><b>Orient Biotech Sdn Bhd</b> — zakład produkcyjny w Malezji; certyfikaty GMP, MeSTI, HALAL, ISO 9001 i HACCP są tu zarejestrowane.</li>
        <li><b>Wellness Alliance</b> — dystrybucja międzynarodowa.</li>
        <li class="is-you"><b>Wellness Network GmbH</b> — europejskie biuro partnerstwa. To z nim masz do czynienia w przypadku rynku europejskiego.</li>
      </ol>`,

    'How European delivery works': 'Jak działa dostawa w Europie',
    'European orders are handled through our <strong>European distribution partner</strong> (Wellness Network GmbH). Importation and the arrangements for your local market are set up with the partner for your territory — so you work with a Europe-based desk, not only a Malaysian office. Tell us your market and we will point you to the right terms.':
      'Zamówienia europejskie są obsługiwane przez naszego <strong>europejskiego partnera dystrybucyjnego</strong> (Wellness Network GmbH). Import i ustalenia dla twojego lokalnego rynku są organizowane z partnerem dla twojego terytorium — więc współpracujesz z biurem opartym w Europie, a nie tylko z biurem w Malezji. Podaj nam swój rynek, a wskażemy ci odpowiednie warunki.',

    'Partnership levels': 'Poziomy współpracy',
    [UL_TIERS_EN]: `      <ul>
        <li><strong>Punkt sprzedaży / próba</strong> — sugerowane pierwsze zamówienie 12–24 pudełek do przetestowania swojej półki.</li>
        <li><strong>Partner hurtowy</strong> — zazwyczaj 50–100 pudełek.</li>
        <li><strong>Dystrybutor regionalny</strong> — 300+ pudełek, dla partnerów obejmujących rynek.</li>
      </ul>`,
    'Actual quantities, pricing and terms are confirmed on enquiry and discussed directly over WhatsApp. A first position costs a trial, not a container.':
      'Rzeczywiste ilości, ceny i warunki są potwierdzane przy zapytaniu i omawiane bezpośrednio przez WhatsApp. Pierwsza pozycja kosztuje tyle, co próba, a nie kontener.',

    'Distributor FAQ': 'FAQ dla dystrybutorów',
    'What European distributors ask first.': 'Co europejscy dystrybutorzy pytają najpierw.',

    '>UNI MAX wholesale &amp; distribution</a>': '>Hurt i dystrybucja UNI MAX</a>',
    "Wholesale supplements for resale: buyer's guide</a>": 'Suplementy hurtowe do odsprzedaży: przewodnik kupującego</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Założyć firmę suplementową — czy zostać dystrybutorem?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Jak wybrać dostawcę Tongkat Ali</a>',

    'Become a UNI MAX distributor in Europe.': 'Zostań dystrybutorem UNI MAX w Europie.',
    'A finished, halal-certified vitality drink for your market — ready-to-shelf boxes, brand-owned, delivered via our European partner. Tell us your territory and we will confirm terms.':
      'Gotowy, certyfikowany halal napój witalny dla twojego rynku — pudełka gotowe do sprzedaży, należące do marki, dostarczane przez naszego europejskiego partnera. Podaj nam swoje terytorium, a potwierdzimy warunki.',
  },
},

nl: {
  shared: shared('nl'),
  meta: {
    title: 'Distribueer Halal Energy Shot UNI MAX in Europa | UNI MAX',
    desc: 'Distribueer een kant-en-klare, halal-gecertificeerde Tongkat Ali-vitaliteitsdrank in uw Europese markt. Verkoopklare dozen, een kant-en-klaar merk en een Europees partnerschapsbureau — geen formule om te ontwikkelen, geen fabriek om te bouwen.',
    ogTitle: 'Halal Vitaliteitsdrank Leverancier voor Europa — Distribueer UNI MAX',
    ogDesc: 'Een kant-en-klare, halal-gecertificeerde Tongkat Ali-vitaliteitsdrank voor Europese distributeurs — verkoopklaar, merkeigen, geleverd via onze Europese partner.',
  },
  breadcrumbName: 'Voor Distributeurs in Europa',
  articleHeadline: 'Distribueer een kant-en-klare halal vitaliteitsdrank in Europa',
  articleDescription: 'Hoe Europese distributeurs een kant-en-klare, halal-gecertificeerde Tongkat Ali-vitaliteitsdrank aan hun assortiment kunnen toevoegen — merkeigen product, gecertificeerde faciliteit, verkoopklare dozen en een Europees partnerschapsbureau.',
  faq: [
    { q: 'Hoe word ik een UNI MAX-distributeur in Europa?', a: 'Stuur ons een bericht op WhatsApp met uw markt en de volumes die u voor ogen heeft. Europese bestellingen worden afgehandeld via onze Europese distributiepartner, dus voorwaarden en levering voor uw gebied worden geregeld met een in Europa gevestigd bureau, niet alleen vanuit Maleisië.' },
    { q: 'Is UNI MAX private label, of een kant-en-klaar merk?', a: 'Een kant-en-klaar, merkeigen product. In tegenstelling tot private label, waarbij u zelf een formule ontwikkelt en het merk opbouwt, distribueert u het kant-en-klare UNI MAX-merk — product, verpakking, formule en certificeringen bestaan al. U voegt het toe aan uw assortiment en verkoopt het.' },
    { q: 'Welke certificeringen heeft het product?', a: 'GMP, MeSTI, HALAL (JAKIM), ISO 9001 en HACCP, geregistreerd op de producerende faciliteit Orient Biotech Sdn Bhd. Certificaten worden jaarlijks vernieuwd; als u de huidige kopie nodig heeft voor uw due diligence, vraag er dan naar wanneer u contact met ons opneemt, en wij sturen de nieuwste.' },
    { q: 'Hoe wordt het product naar Europa geleverd?', a: 'Via onze Europese distributiepartner. Import en de regelingen voor uw lokale markt worden opgezet met de partner voor uw gebied, zodat u samenwerkt met een in Europa gevestigd bureau.' },
    { q: 'Wat is de minimumbestelling?', a: 'Een proefpositie begint klein — voorgestelde 12–24 dozen voor een eerste bestelling van een retailer, 50–100 dozen voor groothandelspartners en 300+ voor regionale distributeurs. Werkelijke hoeveelheden en voorwaarden worden bevestigd bij navraag.' },
  ],
  html: {
    'For Distributors · Europe': 'Voor Distributeurs · Europa',
    'Distribute a ready-to-sell halal vitality drink in Europe.': 'Distribueer een verkoopklare halal vitaliteitsdrank in Europa.',
    'UNI MAX is a finished, halal-certified botanical vitality drink — 30 ready-to-drink sachets to a box, already branded and documented. For a European distributor, that means a shelf-ready product you can add to your range without developing a formula, building a factory, or chasing certifications yourself.':
      'UNI MAX is een kant-en-klare, halal-gecertificeerde botanische vitaliteitsdrank — 30 drinkklare sachets per doos, al voorzien van merk en documentatie. Voor een Europese distributeur betekent dat een verkoopklaar product dat u aan uw assortiment kunt toevoegen zonder zelf een formule te ontwikkelen, een fabriek te bouwen of certificeringen na te jagen.',

    'Distributing a finished brand vs. private label': 'Een kant-en-klaar merk distribueren vs. private label',
    'If you have been looking at <em>private label supplements in Europe</em>, you already know the work it asks for: develop a formula, commission a factory, own the labelling and the compliance, and carry the risk if it does not move. Distributing a finished brand is the other route — the product, packaging, formula and certifications already exist, and you carry the finished goods into your market.':
      'Als u heeft gekeken naar <em>private-label supplementen in Europa</em>, weet u al hoeveel werk dit vergt: een formule ontwikkelen, een fabriek inschakelen, verantwoordelijk zijn voor etikettering en compliance, en het risico dragen als het niet verkoopt. Het distribueren van een kant-en-klaar merk is de andere route — het product, de verpakking, de formule en de certificeringen bestaan al, en u brengt het afgewerkte product naar uw markt.',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>Wat u opbouwt</th><th>Wat u draagt</th></tr>
        </thead>
        <tbody>
          <tr><td>Private label / eigen merk</td><td>Formule, merk, verpakking, compliance</td><td>Alles, inclusief formulering en risico op onverkochte voorraad</td></tr>
          <tr><td>UNI MAX distribueren</td><td>Niets — het merk is kant-en-klaar</td><td>Verkoop en distributie in uw markt</td></tr>
        </tbody>
      </table>`,
    'UNI MAX is <strong>brand-owned by UniPro</strong> and produced at a certified facility — a ready-made brand, not a blank you have to build. You are adding a finished product to your range, not starting a manufacturing project.':
      'UNI MAX is <strong>eigendom van het merk UniPro</strong> en wordt geproduceerd bij een gecertificeerde faciliteit — een kant-en-klaar merk, geen leeg canvas dat u zelf moet opbouwen. U voegt een kant-en-klaar product toe aan uw assortiment, u start geen productieproject.',

    'What you would be distributing': 'Wat u zou distribueren',
    "UNI MAX is a botanical lychee vitality drink with Tongkat Ali, supplied as <strong>10&nbsp;g × 30 ready-to-drink sachets</strong> per retail box. It sits in the men's vitality and energy category, and the sachet format merchandises like a beverage rather than competing on a shelf of identical capsule bottles — a format difference that gives a distributor something distinct to place.":
      'UNI MAX is een botanische lychee-vitaliteitsdrank met Tongkat Ali, geleverd als <strong>10&nbsp;g × 30 drinkklare sachets</strong> per retaildoos. Het bevindt zich in de categorie mannen-vitaliteit en -energie, en het sachetformaat wordt gepresenteerd als een drankje in plaats van te concurreren op een schap met identieke capsuleflesjes — een formaatverschil dat een distributeur iets onderscheidends geeft om te plaatsen.',

    'Certifications': 'Certificeringen',
    'UNI MAX is produced under our manufacturing partner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, which holds:':
      'UNI MAX wordt geproduceerd door onze productiepartner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, die beschikt over:',
    "These certificates are renewed every year. Between a certificate's expiry and the re-issued copy being uploaded here there can be a short display gap, so the versions shown may not always be the latest — please bear with us. If you would like the <strong>current certificate for your due diligence, just ask when you contact us</strong> and we will send the latest copy.":
      'Deze certificaten worden elk jaar vernieuwd. Tussen het verlopen van een certificaat en het uploaden van de opnieuw uitgegeven kopie hier kan een korte weergavekloof zitten, dus de getoonde versies zijn mogelijk niet altijd de nieuwste — heeft u geduld met ons. Als u de <strong>huidige certificering voor uw due diligence wilt, vraag er dan gewoon naar wanneer u contact met ons opneemt</strong>, en wij sturen de nieuwste kopie.',

    'Who you are working with': 'Met wie u samenwerkt',
    'UNI MAX runs on a four-part supply chain. The certifications above are registered to the producing facility (link 02), and your day-to-day contact for Europe is the last link:':
      'UNI MAX draait op een viervoudige toeleveringsketen. De bovenstaande certificeringen zijn geregistreerd op de producerende faciliteit (schakel 02), en uw dagelijkse contact voor Europa is de laatste schakel:',
    [CHAIN_EN]: `      <ol class="gd-chain">
        <li><b>UniPro</b> — de merkeigenaar achter UNI MAX.</li>
        <li><b>Orient Biotech Sdn Bhd</b> — de producerende faciliteit in Maleisië; de GMP-, MeSTI-, HALAL-, ISO 9001- en HACCP-certificaten zijn hier geregistreerd.</li>
        <li><b>Wellness Alliance</b> — internationale distributie.</li>
        <li class="is-you"><b>Wellness Network GmbH</b> — het Europese partnerschapsbureau. Met hen heeft u te maken voor de Europese markt.</li>
      </ol>`,

    'How European delivery works': 'Hoe Europese levering werkt',
    'European orders are handled through our <strong>European distribution partner</strong> (Wellness Network GmbH). Importation and the arrangements for your local market are set up with the partner for your territory — so you work with a Europe-based desk, not only a Malaysian office. Tell us your market and we will point you to the right terms.':
      'Europese bestellingen worden afgehandeld via onze <strong>Europese distributiepartner</strong> (Wellness Network GmbH). Import en de regelingen voor uw lokale markt worden opgezet met de partner voor uw gebied — zodat u samenwerkt met een in Europa gevestigd bureau, niet alleen een Maleisisch kantoor. Vertel ons uw markt en wij wijzen u naar de juiste voorwaarden.',

    'Partnership levels': 'Partnerschapsniveaus',
    [UL_TIERS_EN]: `      <ul>
        <li><strong>Wederverkoper / proef</strong> — een voorgestelde eerste bestelling van 12–24 dozen om uw schap te testen.</li>
        <li><strong>Groothandelspartner</strong> — doorgaans 50–100 dozen.</li>
        <li><strong>Regionale distributeur</strong> — 300+ dozen, voor partners die een markt innemen.</li>
      </ul>`,
    'Actual quantities, pricing and terms are confirmed on enquiry and discussed directly over WhatsApp. A first position costs a trial, not a container.':
      'Werkelijke hoeveelheden, prijzen en voorwaarden worden bevestigd bij navraag en rechtstreeks besproken via WhatsApp. Een eerste positie kost een proef, geen container.',

    'Distributor FAQ': 'Veelgestelde vragen voor distributeurs',
    'What European distributors ask first.': 'Wat Europese distributeurs als eerste vragen.',

    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX groothandel &amp; distributie</a>',
    "Wholesale supplements for resale: buyer's guide</a>": 'Groothandelssupplementen voor wederverkoop: de koopgids</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Een supplementenbedrijf starten — of distributeur worden?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Een Tongkat Ali-leverancier kiezen</a>',

    'Become a UNI MAX distributor in Europe.': 'Word een UNI MAX-distributeur in Europa.',
    'A finished, halal-certified vitality drink for your market — ready-to-shelf boxes, brand-owned, delivered via our European partner. Tell us your territory and we will confirm terms.':
      'Een kant-en-klare, halal-gecertificeerde vitaliteitsdrank voor uw markt — verkoopklare dozen, merkeigen, geleverd via onze Europese partner. Vertel ons uw gebied en wij bevestigen de voorwaarden.',
  },
},

de: {
  shared: shared('de'),
  meta: {
    title: 'Halal Energy Shot für Europa — UNI MAX Vertreiben | UNI MAX',
    desc: 'Vertreiben Sie ein fertiges, halal-zertifiziertes Tongkat-Ali-Vitalitätsgetränk in Ihrem europäischen Markt. Verkaufsfertige Boxen, eine fertige Marke und eine europäische Partnerschaftsstelle — keine Rezeptur zu entwickeln, keine Fabrik zu bauen.',
    ogTitle: 'Halal-Vitalitätsgetränk-Lieferant für Europa — UNI MAX Vertreiben',
    ogDesc: 'Ein fertiges, halal-zertifiziertes Tongkat-Ali-Vitalitätsgetränk für europäische Vertriebspartner — verkaufsfertig, markeneigen, geliefert über unseren europäischen Partner.',
  },
  breadcrumbName: 'Für Vertriebspartner — Europa',
  articleHeadline: 'Ein fertiges Halal-Vitalitätsgetränk in Europa vertreiben',
  articleDescription: 'Wie europäische Vertriebspartner ein fertiges, halal-zertifiziertes Tongkat-Ali-Vitalitätsgetränk zu ihrem Sortiment hinzufügen können — markeneigenes Produkt, zertifizierte Anlage, verkaufsfertige Boxen und eine europäische Partnerschaftsstelle.',
  faq: [
    { q: 'Wie werde ich UNI-MAX-Vertriebspartner in Europa?', a: 'Schreiben Sie uns auf WhatsApp mit Ihrem Markt und den Mengen, die Sie im Sinn haben. Europäische Bestellungen werden über unseren europäischen Vertriebspartner abgewickelt, sodass Konditionen und Lieferung für Ihr Gebiet mit einer in Europa ansässigen Stelle vereinbart werden, nicht nur aus Malaysia.' },
    { q: 'Ist UNI MAX Private Label oder eine fertige Marke?', a: 'Ein fertiges, markeneigenes Produkt. Im Gegensatz zu Private Label, bei dem Sie selbst eine Rezeptur entwickeln und die Marke aufbauen, vertreiben Sie die fertige UNI-MAX-Marke — Produkt, Verpackung, Rezeptur und Zertifizierungen existieren bereits. Sie fügen sie zu Ihrem Sortiment hinzu und verkaufen sie.' },
    { q: 'Welche Zertifizierungen trägt das Produkt?', a: 'GMP, MeSTI, HALAL (JAKIM), ISO 9001 und HACCP, registriert auf die Produktionsanlage Orient Biotech Sdn Bhd. Zertifikate werden jährlich erneuert; wenn Sie die aktuelle Kopie für Ihre Sorgfaltsprüfung benötigen, fragen Sie einfach bei Kontaktaufnahme mit uns, und wir senden die neueste.' },
    { q: 'Wie wird das Produkt nach Europa geliefert?', a: 'Über unseren europäischen Vertriebspartner. Import und die Regelungen für Ihren lokalen Markt werden mit dem Partner für Ihr Gebiet eingerichtet, sodass Sie mit einer in Europa ansässigen Stelle zusammenarbeiten.' },
    { q: 'Was ist die Mindestbestellung?', a: 'Eine Testposition beginnt klein — empfohlene 12–24 Boxen für eine erste Bestellung als Einzelhändler, 50–100 Boxen für Großhandelspartner und 300+ für regionale Vertriebspartner. Tatsächliche Mengen und Konditionen werden bei Anfrage bestätigt.' },
  ],
  html: {
    'For Distributors · Europe': 'Für Vertriebspartner · Europa',
    'Distribute a ready-to-sell halal vitality drink in Europe.': 'Vertreiben Sie ein verkaufsfertiges Halal-Vitalitätsgetränk in Europa.',
    'UNI MAX is a finished, halal-certified botanical vitality drink — 30 ready-to-drink sachets to a box, already branded and documented. For a European distributor, that means a shelf-ready product you can add to your range without developing a formula, building a factory, or chasing certifications yourself.':
      'UNI MAX ist ein fertiges, halal-zertifiziertes botanisches Vitalitätsgetränk — 30 trinkfertige Sachets pro Box, bereits mit Marke versehen und dokumentiert. Für einen europäischen Vertriebspartner bedeutet das ein verkaufsfertiges Produkt, das Sie Ihrem Sortiment hinzufügen können, ohne selbst eine Rezeptur zu entwickeln, eine Fabrik zu bauen oder Zertifizierungen zu jagen.',

    'Distributing a finished brand vs. private label': 'Eine fertige Marke vertreiben vs. Private Label',
    'If you have been looking at <em>private label supplements in Europe</em>, you already know the work it asks for: develop a formula, commission a factory, own the labelling and the compliance, and carry the risk if it does not move. Distributing a finished brand is the other route — the product, packaging, formula and certifications already exist, and you carry the finished goods into your market.':
      'Wenn Sie sich <em>Private-Label-Nahrungsergänzungsmittel in Europa</em> angesehen haben, wissen Sie bereits, wie viel Arbeit das erfordert: eine Rezeptur entwickeln, eine Fabrik beauftragen, für Kennzeichnung und Compliance verantwortlich sein und das Risiko tragen, falls es sich nicht verkauft. Der Vertrieb einer fertigen Marke ist der andere Weg — das Produkt, die Verpackung, die Rezeptur und die Zertifizierungen existieren bereits, und Sie bringen die Fertigware in Ihren Markt.',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Weg</th><th>Was Sie aufbauen</th><th>Was Sie tragen</th></tr>
        </thead>
        <tbody>
          <tr><td>Private Label / eigene Marke</td><td>Rezeptur, Marke, Verpackung, Compliance</td><td>Alles, einschließlich Rezeptur und Risiko unverkaufter Bestände</td></tr>
          <tr><td>UNI MAX vertreiben</td><td>Nichts — die Marke ist bereits fertig</td><td>Verkauf und Vertrieb in Ihrem Markt</td></tr>
        </tbody>
      </table>`,
    'UNI MAX is <strong>brand-owned by UniPro</strong> and produced at a certified facility — a ready-made brand, not a blank you have to build. You are adding a finished product to your range, not starting a manufacturing project.':
      'UNI MAX <strong>gehört der Marke UniPro</strong> und wird in einer zertifizierten Anlage hergestellt — eine fertige Marke, keine leere Fläche, die Sie selbst aufbauen müssen. Sie fügen Ihrem Sortiment ein fertiges Produkt hinzu, Sie starten kein Produktionsprojekt.',

    'What you would be distributing': 'Was Sie vertreiben würden',
    "UNI MAX is a botanical lychee vitality drink with Tongkat Ali, supplied as <strong>10&nbsp;g × 30 ready-to-drink sachets</strong> per retail box. It sits in the men's vitality and energy category, and the sachet format merchandises like a beverage rather than competing on a shelf of identical capsule bottles — a format difference that gives a distributor something distinct to place.":
      'UNI MAX ist ein botanisches Litschi-Vitalitätsgetränk mit Tongkat Ali, geliefert als <strong>10&nbsp;g × 30 trinkfertige Sachets</strong> pro Einzelhandelsbox. Es befindet sich in der Kategorie Männer-Vitalität und -Energie, und das Sachet-Format wird wie ein Getränk vermarktet, statt in einem Regal mit identischen Kapselflaschen zu konkurrieren — ein Formatunterschied, der einem Vertriebspartner etwas Eigenständiges zum Platzieren gibt.',

    'Certifications': 'Zertifizierungen',
    'UNI MAX is produced under our manufacturing partner <strong>Orient Biotech Sdn&nbsp;Bhd</strong>, which holds:':
      'UNI MAX wird von unserem Produktionspartner <strong>Orient Biotech Sdn&nbsp;Bhd</strong> hergestellt, der über folgende Zertifizierungen verfügt:',
    "These certificates are renewed every year. Between a certificate's expiry and the re-issued copy being uploaded here there can be a short display gap, so the versions shown may not always be the latest — please bear with us. If you would like the <strong>current certificate for your due diligence, just ask when you contact us</strong> and we will send the latest copy.":
      'Diese Zertifikate werden jedes Jahr erneuert. Zwischen dem Ablauf eines Zertifikats und dem Hochladen der neu ausgestellten Kopie hier kann es eine kurze Anzeigelücke geben, sodass die gezeigten Versionen möglicherweise nicht immer die neuesten sind — wir bitten um Verständnis. Wenn Sie das <strong>aktuelle Zertifikat für Ihre Sorgfaltsprüfung wünschen, fragen Sie einfach bei Kontaktaufnahme mit uns</strong>, und wir senden die neueste Kopie.',

    'Who you are working with': 'Mit wem Sie zusammenarbeiten',
    'UNI MAX runs on a four-part supply chain. The certifications above are registered to the producing facility (link 02), and your day-to-day contact for Europe is the last link:':
      'UNI MAX arbeitet mit einer vierteiligen Lieferkette. Die oben genannten Zertifizierungen sind auf die Produktionsanlage registriert (Glied 02), und Ihr täglicher Ansprechpartner für Europa ist das letzte Glied:',
    [CHAIN_EN]: `      <ol class="gd-chain">
        <li><b>UniPro</b> — der Markeninhaber hinter UNI MAX.</li>
        <li><b>Orient Biotech Sdn Bhd</b> — die Produktionsanlage in Malaysia; die GMP-, MeSTI-, HALAL-, ISO 9001- und HACCP-Zertifikate sind hier registriert.</li>
        <li><b>Wellness Alliance</b> — internationaler Vertrieb.</li>
        <li class="is-you"><b>Wellness Network GmbH</b> — die europäische Partnerschaftsstelle. Mit dieser haben Sie es für den europäischen Markt zu tun.</li>
      </ol>`,

    'How European delivery works': 'Wie die Lieferung in Europa funktioniert',
    'European orders are handled through our <strong>European distribution partner</strong> (Wellness Network GmbH). Importation and the arrangements for your local market are set up with the partner for your territory — so you work with a Europe-based desk, not only a Malaysian office. Tell us your market and we will point you to the right terms.':
      'Europäische Bestellungen werden über unseren <strong>europäischen Vertriebspartner</strong> (Wellness Network GmbH) abgewickelt. Import und die Regelungen für Ihren lokalen Markt werden mit dem Partner für Ihr Gebiet eingerichtet — sodass Sie mit einer in Europa ansässigen Stelle zusammenarbeiten, nicht nur mit einem malaysischen Büro. Teilen Sie uns Ihren Markt mit, und wir weisen Ihnen die richtigen Konditionen zu.',

    'Partnership levels': 'Partnerschaftsstufen',
    [UL_TIERS_EN]: `      <ul>
        <li><strong>Einzelhändler / Test</strong> — eine empfohlene Erstbestellung von 12–24 Boxen, um Ihr Regal zu testen.</li>
        <li><strong>Großhandelspartner</strong> — typischerweise 50–100 Boxen.</li>
        <li><strong>Regionaler Vertriebspartner</strong> — 300+ Boxen, für Partner, die einen Markt erschließen.</li>
      </ul>`,
    'Actual quantities, pricing and terms are confirmed on enquiry and discussed directly over WhatsApp. A first position costs a trial, not a container.':
      'Tatsächliche Mengen, Preise und Konditionen werden bei Anfrage bestätigt und direkt über WhatsApp besprochen. Eine erste Position kostet einen Test, keinen Container.',

    'Distributor FAQ': 'FAQ für Vertriebspartner',
    'What European distributors ask first.': 'Was europäische Vertriebspartner zuerst fragen.',

    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX Großhandel &amp; Vertrieb</a>',
    "Wholesale supplements for resale: buyer's guide</a>": 'Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Nahrungsergänzungsmittel-Firma gründen — oder Vertriebspartner werden?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Einen Tongkat-Ali-Lieferanten wählen</a>',

    'Become a UNI MAX distributor in Europe.': 'Werden Sie UNI-MAX-Vertriebspartner in Europa.',
    'A finished, halal-certified vitality drink for your market — ready-to-shelf boxes, brand-owned, delivered via our European partner. Tell us your territory and we will confirm terms.':
      'Ein fertiges, halal-zertifiziertes Vitalitätsgetränk für Ihren Markt — regalfertige Boxen, markeneigen, geliefert über unseren europäischen Partner. Teilen Sie uns Ihr Gebiet mit, und wir bestätigen die Konditionen.',
  },
},

};
