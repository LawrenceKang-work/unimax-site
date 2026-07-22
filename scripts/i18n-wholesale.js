/* UNI MAX /wholesale/ 落地页的多语言文案。
 *
 * 与首页字典(i18n-dict.js)的机制不同:首页靠 data-i18n 锚点烧录,而 /wholesale/ 是
 * 独立手写的静态页、整页没有 data-i18n。这里改用「英文原文 → 译文」的字符串映射,
 * 由 scripts/gen-wholesale-pages.js 做替换。
 *
 * 好处是**英文源页一改,生成器立刻报"未命中"** —— 翻译表不会悄悄过时。
 * 所以每条都带命中数断言:once 必须恰好 1 次,all 必须 ≥1 次且全替换。
 *
 * ⚠️ key 必须与 wholesale/index.html 里的字节完全一致 —— 包括 &amp; / &nbsp; /
 *    em dash(—) / en dash(–) / middot(·)。复制粘贴,别手打。
 * ⚠️ HTML 正文与 JSON-LD 里的同一句话**转义规则不同**(HTML 是 &amp;,JSON 是裸 &),
 *    且措辞本就有细微差异,故分成 html / jsonld 两组,不要合并。
 *
 * 术语一律沿用首页字典,不另起一套 —— 三个合作分级的名称直接 require 过来,
 * 首页改名时这里自动跟随。
 */
const home = require('./i18n-dict.js');

/* ---------- 中文 ---------- */
const zh = {
  docLang: 'zh-Hans',
  label: '中文',
  meta: {
    title: '东革阿里活力饮批发与分销 | UNI MAX',
    desc: '清真认证即饮东革阿里活力饮，零售就绪，10 克 × 30 包/盒。建议起订量 12 盒起。马来西亚制造。',
    ogTitle: '东革阿里活力饮批发与分销 — UNI MAX',
    ogDesc: '清真认证即饮东革阿里活力饮，零售包装即可上架。合作分级从零售代销商到区域总代理。马来西亚制造。',
  },

  /* 导航与页脚的短词:同一个词在 nav 与 footer 各出现一次,故用带标签的 key 定位 */
  all: {
    '>Benefits</a>': '>' + home.zh['nav.benefits'] + '</a>',
    '>Formula</a>': '>' + home.zh['nav.formula'] + '</a>',
    '>Certified</a>': '>' + home.zh['nav.trust'] + '</a>',
    '>FAQ</a>': '>' + home.zh['nav.faq'] + '</a>',
    '>Overview</a>': '>' + home.zh['nav.overview'] + '</a>',
    '>Why UNI MAX</a>': '>' + home.zh['nav.why'] + '</a>',
    '>Partnerships</a>': '>' + home.zh['nav.partnerships'] + '</a>',
    '>About</a>': '>' + home.zh['nav.about'] + '</a>',
    '>Contact</a>': '>' + home.zh['nav.contact'] + '</a>',
    '<span>Become a Partner</span>': '<span>' + home.zh['cta.order'] + '</span>',
    '<small>boxes</small>': '<small>盒</small>',
  },

  html: {
    /* --- header / hero --- */
    'Back to UNI MAX': '返回 UNI MAX',
    '<span class="eyebrow">Wholesale &amp; Distribution</span>': '<span class="eyebrow">批发与分销</span>',
    'Stock a finished botanical vitality drink, not a raw ingredient.':
      '上架的是成品活力饮，不是原料。',
    'UNI MAX is supplied retail-ready — Triple Force Tongkat Ali in 10&nbsp;g sachets, 30 to a branded box. No repacking, no reformulation, no minimum tonnage. Made in Malaysia in HALAL, GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facilities.':
      'UNI MAX 以零售就绪形态供货 —— 三重东革阿里，10&nbsp;克独立包装，30 包一品牌盒。无需分装、无需重新配方、不设吨位门槛。马来西亚制造，生产设施持有 HALAL、GMP、MeSTI、ISO&nbsp;9001 与 HACCP 认证。',
    'Same-day WhatsApp reply · Pricing on request': 'WhatsApp 当天回复 · 价格面议',
    '<span>boxes — suggested entry MOQ</span>': '<span>盒 —— 建议入门起订量</span>',
    '<span>sachets per box, 10 g each</span>': '<span>包/盒，每包 10 克</span>',
    '<span>botanicals &amp; nutrients</span>': '<span>种植物与营养成分</span>',
    '<span>facility certifications</span>': '<span>项工厂认证</span>',

    /* --- why --- */
    '<span class="eyebrow">Why partner on UNI MAX</span>': '<span class="eyebrow">为何与 UNI MAX 合作</span>',
    'Shelf-ready from the first carton.': '从第一箱起就能直接上架。',

    'Finished product, not bulk extract': '成品，而非散装提取物',
    'Most Tongkat Ali supply out of Malaysia is sold as extract powder by the kilogram, leaving you to formulate, pack and brand it. UNI MAX arrives as a finished consumer product in retail packaging — you can put it on shelf as it is.':
      '马来西亚出口的东革阿里多以提取物粉末按公斤计价，配方、分装与品牌化都得你自己来。UNI MAX 交付的是零售包装的成品消费品 —— 收货后原样上架即可。',

    'Entry quantities that suit a first order': '适合首单的入门量',
    'Partnership starts at a suggested 12 boxes, so a single shop, gym or clinic can trial the product without committing to pallet volumes. Larger wholesale and regional distributor levels are available as demand builds.':
      '合作建议从 12 盒起，单家门店、健身房或诊所都能先试销，无需一次吃下整托货量。需求起来后，还有更高的批发与区域总代理分级。',

    'Certified manufacturing behind it': '认证工厂背书',
    'Produced in facilities holding HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP certification — the documentation set that halal-import buyers and retail chains typically ask for.':
      '生产设施持有 HALAL（JAKIM）、GMP、MeSTI、ISO 9001:2015 与 HACCP 认证 —— 正是清真进口买家与零售连锁通常会索取的那套文件。',

    'A defined consumer format': '明确的消费形态',
    'A 10 g ready-to-drink lychee sachet — no shaker, no capsules, no measuring. The format that suits impulse retail, gym counters and e-commerce bundles alike.':
      '10 克即饮荔枝味独立包 —— 不用摇杯、不是胶囊、无需量取。这种形态同样适合冲动型零售、健身房前台与电商组合装。',

    'Formulated around a recognisable hero': '围绕高辨识度主成分配方',
    'Triple Force Tongkat Ali (Yellow, Red and Black) with guarana, adaptogens and amino acids. Tongkat Ali carries strong existing recognition with buyers across ASEAN and halal markets.':
      '三重东革阿里（黄、红、黑）搭配瓜拉那、适应原与氨基酸。东革阿里在东盟与清真市场的买家中本就有很高的认知度。',

    'Direct line, no portal': '直接对接，没有工单系统',
    'Enquiries are handled directly over WhatsApp with a same-day reply, so quantities and terms get confirmed in one conversation rather than a ticket queue.':
      '询价直接走 WhatsApp，当天回复 —— 数量与条款在一次对话里敲定，不必排工单队列。',

    /* --- tiers --- */
    '<span class="eyebrow">Suggested MOQ · actual confirmed on enquiry</span>':
      '<span class="eyebrow">建议起订量 · 实际数量以洽询确认为准</span>',
    'Choose your <span class="hl">partnership level</span>.': '选择你的<span class="hl">合作分级</span>。',
    '<h3>Retail Stockist</h3>': '<h3>' + home.zh['order.p1name'] + '</h3>',
    'Small wellness shops, gyms, clinics and supplement stores taking a first position on the product.':
      '首次进货的小型保健店、健身房、诊所与补剂专卖店。',
    'Most popular': '最受欢迎',
    '<h3>Wholesale Partner</h3>': '<h3>' + home.zh['order.p2name'] + '</h3>',
    'E-commerce sellers, larger gyms and multi-branch retailers running the product across more than one channel or location.':
      '在多个渠道或多个点位同时铺货的电商卖家、大型健身房与多门店零售商。',
    '<h3>Regional Distributor</h3>': '<h3>' + home.zh['order.p3name'] + '</h3>',
    'Country-level or regional partners building distribution across a territory.':
      '在整个区域内建设分销网络的国家级或区域合作伙伴。',

    /* --- process --- */
    '<span class="eyebrow">How it works</span>': '<span class="eyebrow">合作流程</span>',
    'Three steps to a first order.': '三步完成首单。',
    'Send an enquiry': '发起询价',
    'Message us on WhatsApp with your market, your channel and the volume you have in mind. Same-day reply.':
      '在 WhatsApp 上告诉我们你的市场、渠道与预计采购量。当天回复。',
    'Confirm level and terms': '确认分级与条款',
    'We match you to a partnership level, confirm the actual order quantity and quote pricing for it — the listed MOQs are starting points, not fixed rules.':
      '我们为你匹配合作分级、确认实际订购数量并据此报价 —— 页面列出的起订量只是起点，并非硬性规定。',
    'Place the order': '正式下单',
    'Order details, documentation and delivery arrangements are confirmed directly with you before anything is finalised.':
      '订单明细、单证与配送安排都会在最终敲定前与你直接确认。',

    /* --- certs --- */
    '<span class="eyebrow">Certified manufacturing</span>': '<span class="eyebrow">认证生产</span>',
    'Made in Malaysia, in certified facilities.': '马来西亚制造，于认证设施内生产。',
    'alt="HALAL JAKIM Certified"': 'alt="HALAL JAKIM 认证"',
    'alt="GMP Good Manufacturing Practice"': 'alt="GMP 良好生产规范"',
    'alt="MeSTI Kementerian Kesihatan Malaysia"': 'alt="MeSTI 马来西亚卫生部"',
    'alt="ISO 9001:2015 Certified"': 'alt="ISO 9001:2015 认证"',
    'alt="HACCP Food Safety Certified"': 'alt="HACCP 食品安全认证"',

    /* --- FAQ(页面正文;JSON-LD 版本在下面 jsonld 组,措辞略有不同) --- */
    '<span class="eyebrow">Wholesale FAQ</span>': '<span class="eyebrow">批发常见问题</span>',
    'Questions partners ask first.': '合作伙伴最先问的问题。',

    '<summary>What is the minimum order quantity?</summary>': '<summary>最低起订量是多少？</summary>',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      '建议起点为：零售代销商 12–24 盒，批发合作伙伴 50–100 盒，区域总代理 300 盒以上。这些是建议起订量 —— 实际数量以洽询确认为准。',

    '<summary>Do you supply finished product or bulk ingredient?</summary>': '<summary>你们供应的是成品还是散装原料？</summary>',
    'Finished, retail-ready product — 10 g sachets in branded boxes of 30. UNI MAX is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      '零售就绪的成品 —— 10 克独立包装，30 包一品牌盒。UNI MAX 不以散装提取物或原料形式出售，因此合作伙伴无需额外分装或重新配方即可上架。',

    '<summary>What certifications does UNI MAX hold?</summary>': '<summary>UNI MAX 持有哪些认证？</summary>',
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP.':
      'UNI MAX 在持有 HALAL（JAKIM）、GMP（良好生产规范）、MeSTI（马来西亚卫生部）、ISO 9001:2015 与 HACCP 认证的设施中生产。',

    '<summary>Where is UNI MAX manufactured?</summary>': '<summary>UNI MAX 在哪里生产？</summary>',
    '<p>In Malaysia, in certified manufacturing facilities.</p>': '<p>在马来西亚，于认证生产设施内。</p>',

    '<summary>What is in each box?</summary>': '<summary>每盒包含什么？</summary>',
    '30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '30 包 10 克即饮独立包装。配方以三重东革阿里（黄、红、黑）为核心，搭配 12 种以上植物与营养成分，含瓜拉那、适应原与氨基酸，不额外添加糖。',

    '<summary>How do I get wholesale pricing?</summary>': '<summary>如何获取批发价格？</summary>',
    '<summary>Do you deliver to Europe?</summary>': '<summary>你们配送到欧洲吗？</summary>',
    'UNI MAX is produced and filled by Orient Biotech Sdn Bhd, a certified manufacturing facility in Malaysia — the certifications above are registered to this facility, so every box a partner stocks comes off a certified line. The brand and formula are owned by UniPro (Malaysia), international distribution is managed by Wellness Alliance Sdn Bhd, and European enquiries are handled by a dedicated partnership desk, Wellness Network GmbH.':
      'UNI MAX 由 Orient Biotech Sdn Bhd 生产与灌装 —— 这家马来西亚认证工厂持有上方全部认证，合作伙伴上架的每一盒都来自认证产线。品牌与配方由 UniPro (Malaysia) 持有，国际分销由 Wellness Alliance Sdn Bhd 统筹，欧洲市场的询价与订单则由专属合作台 Wellness Network GmbH 对接。',
    'Finished product, not powder':
      '成品，而非原料粉',
    'Not every Tongkat Ali supplier hands you a finished product.':
      '不是每个 Tongkat Ali 供应商，都会把成品交到你手上。',
    'Many Tongkat Ali suppliers in Malaysia sell raw extract powder. Buying powder means you still need to source a filling plant, design packaging, run stability tests and apply for your own certifications — months of work before the first box reaches a shelf.':
      '马来西亚不少 Tongkat Ali 供应商卖的是原料提取粉。买粉意味着你还要自己找灌装厂、设计包装、做稳定性测试、申请自己的认证 —— 在第一盒货上架之前，先耗上几个月。',
    'UNI MAX takes the opposite route for wholesale partners and distributors: a finished, shelf-ready botanical vitality drink — 30 sachets to a box, produced on a certified line, with brand, packaging and documentation already done. You order, you receive, you sell.':
      'UNI MAX 为批发伙伴与分销商走的是相反的路线：一款完成品、可直接上架的植物活力饮 —— 每盒 30 条，产自认证产线，品牌、包装与文件全部现成。你下单、收货、开卖。',
    'That is the difference between buying an ingredient and stocking a product — and it is why resellers, gyms, clinics and regional distributors partner with UNI MAX instead of building a brand from powder.':
      '这就是「买原料」与「上架成品」的差别 —— 也是零售商、健身房、诊所与区域分销商选择与 UNI MAX 合作、而不是从粉末开始自建品牌的原因。',
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. Send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      '可以。欧洲订单由当地的分销合作伙伴交付，本站的销售联络人常驻德国。通过 WhatsApp 告知你的国家与预计订量，我们会为你的市场确认物流与条款。',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry over WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      '价格面议，取决于合作分级与订购数量。请通过 WhatsApp 发起询价并说明你的市场与预计采购量，条款将直接与你确认。',

    /* --- CTA band --- */
    'Tell us your market and volume.': '告诉我们你的市场与采购量。',
    'Send an enquiry and we will confirm the right partnership level, the actual order quantity and pricing for it.':
      '发起询价，我们会为你确认合适的合作分级、实际订购数量与相应价格。',

    /* --- footer(文案全部复用首页字典) --- */
    'Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.':
      home.zh['foot.about'],
    '<h3>Explore</h3>': '<h3>' + home.zh['foot.explore'] + '</h3>',
    '<h3>Product</h3>': '<h3>' + home.zh['foot.product'] + '</h3>',
    '<h3>Contact</h3>': '<h3>' + home.zh['foot.contact'] + '</h3>',
    '<li>10g × 30 sachets</li>': '<li>' + home.zh['foot.p1'] + '</li>',
    '<li>Ready-to-drink</li>': '<li>' + home.zh['foot.p2'] + '</li>',
    '<li>Botanical lychee</li>': '<li>' + home.zh['foot.p3'] + '</li>',
    '<li>HALAL certified</li>': '<li>' + home.zh['foot.p4'] + '</li>',
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.':
      home.zh['foot.disclaimer'],
    'UniPro · UNI MAX. All rights reserved.': 'UniPro · UNI MAX. 保留所有权利。',
    'Manufactured in Malaysia by Orient Biotech Sdn Bhd.': '由 Orient Biotech Sdn Bhd 于马来西亚制造。',
  },

  /* JSON-LD 里的文本 —— 裸 &、措辞与正文略有出入,单独一组 */
  jsonld: {
    '"name":"Home"': '"name":"首页"',
    '"name":"Wholesale & Distribution"': '"name":"批发与分销"',
    '"name":"What is the minimum order quantity?"': '"name":"最低起订量是多少？"',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner, and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      '建议起点为：零售代销商 12–24 盒，批发合作伙伴 50–100 盒，区域总代理 300 盒以上。这些是建议起订量 —— 实际数量以洽询确认为准。',
    '"name":"Do you supply finished product or bulk ingredient?"': '"name":"你们供应的是成品还是散装原料？"',
    'UNI MAX is supplied as a finished, retail-ready product — 10 g sachets in branded boxes of 30. It is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'UNI MAX 以零售就绪的成品形式供货 —— 10 克独立包装，30 包一品牌盒。它不以散装提取物或原料形式出售，因此合作伙伴无需额外分装或重新配方即可上架。',
    '"name":"What certifications does UNI MAX hold?"': '"name":"UNI MAX 持有哪些认证？"',
    '"name":"Where is UNI MAX manufactured?"': '"name":"UNI MAX 在哪里生产？"',
    'UNI MAX is made in Malaysia, in certified manufacturing facilities.':
      'UNI MAX 在马来西亚的认证生产设施内制造。',
    '"name":"What is in each box?"': '"name":"每盒包含什么？"',
    'Each box contains 30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '每盒含 30 包 10 克即饮独立包装。配方以三重东革阿里（黄、红、黑）为核心，搭配 12 种以上植物与营养成分，含瓜拉那、适应原与氨基酸，不额外添加糖。',
    '"name":"How do I get wholesale pricing?"': '"name":"如何获取批发价格？"',
    '"name":"Do you deliver to Europe?"': '"name":"你们配送到欧洲吗？"',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry via WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      '价格面议，取决于合作分级与订购数量。请通过 WhatsApp 发起询价并说明你的市场与预计采购量，条款将直接与你确认。',
  },
};

/* ---------- Bahasa Melayu ---------- */
const ms = {
  docLang: 'ms',
  label: 'Bahasa Melayu',
  meta: {
    title: 'Minuman Tongkat Ali Borong & Pengedaran | UNI MAX',
    desc: 'Minuman vitaliti Tongkat Ali halal siap minum, sedia runcit dalam kotak 10 g × 30 sachet. MOQ dicadangkan dari 12 kotak. Buatan Malaysia.',
    ogTitle: 'Minuman Tongkat Ali Borong & Pengedaran — UNI MAX',
    ogDesc: 'Minuman vitaliti Tongkat Ali halal siap minum dalam kotak sedia runcit. Tahap kerjasama dari penjual runcit hingga pengedar serantau. Buatan Malaysia.',
  },

  all: {
    '>Benefits</a>': '>' + home.ms['nav.benefits'] + '</a>',
    '>Formula</a>': '>' + home.ms['nav.formula'] + '</a>',
    '>Certified</a>': '>' + home.ms['nav.trust'] + '</a>',
    '>FAQ</a>': '>' + home.ms['nav.faq'] + '</a>',
    '>Overview</a>': '>' + home.ms['nav.overview'] + '</a>',
    '>Why UNI MAX</a>': '>' + home.ms['nav.why'] + '</a>',
    '>Partnerships</a>': '>' + home.ms['nav.partnerships'] + '</a>',
    '>About</a>': '>' + home.ms['nav.about'] + '</a>',
    '>Contact</a>': '>' + home.ms['nav.contact'] + '</a>',
    '<span>Become a Partner</span>': '<span>' + home.ms['cta.order'] + '</span>',
    '<small>boxes</small>': '<small>kotak</small>',
  },

  html: {
    'Back to UNI MAX': 'Kembali ke UNI MAX',
    '<span class="eyebrow">Wholesale &amp; Distribution</span>': '<span class="eyebrow">Borong &amp; Pengedaran</span>',
    'Stock a finished botanical vitality drink, not a raw ingredient.':
      'Stok minuman vitaliti botani yang siap dijual, bukan bahan mentah.',
    'UNI MAX is supplied retail-ready — Triple Force Tongkat Ali in 10&nbsp;g sachets, 30 to a branded box. No repacking, no reformulation, no minimum tonnage. Made in Malaysia in HALAL, GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facilities.':
      'UNI MAX dibekalkan sedia runcit — Tongkat Ali Tiga Kuasa dalam sachet 10&nbsp;g, 30 sachet sekotak berjenama. Tiada pembungkusan semula, tiada formulasi semula, tiada minimum tan. Buatan Malaysia di kemudahan bersijil HALAL, GMP, MeSTI, ISO&nbsp;9001 dan HACCP.',
    'Same-day WhatsApp reply · Pricing on request': 'Balasan WhatsApp hari sama · Harga atas permintaan',
    '<span>boxes — suggested entry MOQ</span>': '<span>kotak — MOQ permulaan dicadangkan</span>',
    '<span>sachets per box, 10 g each</span>': '<span>sachet sekotak, 10 g setiap satu</span>',
    '<span>botanicals &amp; nutrients</span>': '<span>botani &amp; nutrien</span>',
    '<span>facility certifications</span>': '<span>pensijilan kemudahan</span>',

    '<span class="eyebrow">Why partner on UNI MAX</span>': '<span class="eyebrow">Mengapa bekerjasama dengan UNI MAX</span>',
    'Shelf-ready from the first carton.': 'Sedia rak dari karton pertama.',

    'Finished product, not bulk extract': 'Produk siap, bukan ekstrak pukal',
    'Most Tongkat Ali supply out of Malaysia is sold as extract powder by the kilogram, leaving you to formulate, pack and brand it. UNI MAX arrives as a finished consumer product in retail packaging — you can put it on shelf as it is.':
      'Kebanyakan bekalan Tongkat Ali dari Malaysia dijual sebagai serbuk ekstrak mengikut kilogram, jadi anda sendiri perlu memformulasi, membungkus dan menjenamakannya. UNI MAX tiba sebagai produk pengguna yang siap dalam pembungkusan runcit — boleh terus diletakkan di rak.',

    'Entry quantities that suit a first order': 'Kuantiti permulaan yang sesuai untuk pesanan pertama',
    'Partnership starts at a suggested 12 boxes, so a single shop, gym or clinic can trial the product without committing to pallet volumes. Larger wholesale and regional distributor levels are available as demand builds.':
      'Kerjasama bermula pada cadangan 12 kotak, jadi sebuah kedai, gim atau klinik boleh mencuba produk ini tanpa terikat dengan jumlah sepalet. Tahap borong dan pengedar serantau yang lebih besar tersedia apabila permintaan meningkat.',

    'Certified manufacturing behind it': 'Pengeluaran bersijil di sebaliknya',
    'Produced in facilities holding HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP certification — the documentation set that halal-import buyers and retail chains typically ask for.':
      'Dihasilkan di kemudahan yang memegang pensijilan HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 dan HACCP — set dokumentasi yang lazimnya diminta oleh pembeli import halal dan rangkaian peruncit.',

    'A defined consumer format': 'Format pengguna yang jelas',
    'A 10 g ready-to-drink lychee sachet — no shaker, no capsules, no measuring. The format that suits impulse retail, gym counters and e-commerce bundles alike.':
      'Sachet laici siap minum 10 g — tiada shaker, tiada kapsul, tiada sukatan. Format yang sesuai untuk runcit impuls, kaunter gim dan bundel e-dagang.',

    'Formulated around a recognisable hero': 'Diformulasi sekitar bahan utama yang dikenali',
    'Triple Force Tongkat Ali (Yellow, Red and Black) with guarana, adaptogens and amino acids. Tongkat Ali carries strong existing recognition with buyers across ASEAN and halal markets.':
      'Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam) dengan guarana, adaptogen dan asid amino. Tongkat Ali sudah mempunyai pengiktirafan yang kuat dalam kalangan pembeli di ASEAN dan pasaran halal.',

    'Direct line, no portal': 'Talian terus, tiada portal',
    'Enquiries are handled directly over WhatsApp with a same-day reply, so quantities and terms get confirmed in one conversation rather than a ticket queue.':
      'Pertanyaan diuruskan terus melalui WhatsApp dengan balasan hari sama, jadi kuantiti dan terma disahkan dalam satu perbualan, bukan dalam barisan tiket.',

    '<span class="eyebrow">Suggested MOQ · actual confirmed on enquiry</span>':
      '<span class="eyebrow">MOQ dicadangkan · jumlah sebenar disahkan semasa pertanyaan</span>',
    'Choose your <span class="hl">partnership level</span>.': 'Pilih <span class="hl">tahap kerjasama</span> anda.',
    '<h3>Retail Stockist</h3>': '<h3>' + home.ms['order.p1name'] + '</h3>',
    'Small wellness shops, gyms, clinics and supplement stores taking a first position on the product.':
      'Kedai kesihatan kecil, gim, klinik dan kedai suplemen yang mengambil posisi pertama pada produk ini.',
    'Most popular': 'Paling popular',
    '<h3>Wholesale Partner</h3>': '<h3>' + home.ms['order.p2name'] + '</h3>',
    'E-commerce sellers, larger gyms and multi-branch retailers running the product across more than one channel or location.':
      'Penjual e-dagang, gim besar dan peruncit berbilang cawangan yang menjalankan produk ini merentasi lebih daripada satu saluran atau lokasi.',
    '<h3>Regional Distributor</h3>': '<h3>' + home.ms['order.p3name'] + '</h3>',
    'Country-level or regional partners building distribution across a territory.':
      'Rakan kongsi peringkat negara atau serantau yang membina pengedaran merentasi sesuatu wilayah.',

    '<span class="eyebrow">How it works</span>': '<span class="eyebrow">Cara ia berfungsi</span>',
    'Three steps to a first order.': 'Tiga langkah ke pesanan pertama.',
    'Send an enquiry': 'Hantar pertanyaan',
    'Message us on WhatsApp with your market, your channel and the volume you have in mind. Same-day reply.':
      'Mesej kami di WhatsApp dengan pasaran anda, saluran anda dan jumlah yang anda fikirkan. Balasan hari sama.',
    'Confirm level and terms': 'Sahkan tahap dan terma',
    'We match you to a partnership level, confirm the actual order quantity and quote pricing for it — the listed MOQs are starting points, not fixed rules.':
      'Kami padankan anda dengan tahap kerjasama, sahkan kuantiti pesanan sebenar dan berikan sebut harga untuknya — MOQ yang disenaraikan ialah titik permulaan, bukan peraturan tetap.',
    'Place the order': 'Buat pesanan',
    'Order details, documentation and delivery arrangements are confirmed directly with you before anything is finalised.':
      'Butiran pesanan, dokumentasi dan pengaturan penghantaran disahkan terus dengan anda sebelum apa-apa dimuktamadkan.',

    '<span class="eyebrow">Certified manufacturing</span>': '<span class="eyebrow">Pengeluaran bersijil</span>',
    'Made in Malaysia, in certified facilities.': 'Buatan Malaysia, di kemudahan bersijil.',
    'alt="HALAL JAKIM Certified"': 'alt="Disahkan HALAL JAKIM"',
    'alt="GMP Good Manufacturing Practice"': 'alt="GMP Amalan Pengilangan Baik"',
    'alt="MeSTI Kementerian Kesihatan Malaysia"': 'alt="MeSTI Kementerian Kesihatan Malaysia"',
    'alt="ISO 9001:2015 Certified"': 'alt="Disahkan ISO 9001:2015"',
    'alt="HACCP Food Safety Certified"': 'alt="Disahkan HACCP Keselamatan Makanan"',

    '<span class="eyebrow">Wholesale FAQ</span>': '<span class="eyebrow">Soalan Lazim Borong</span>',
    'Questions partners ask first.': 'Soalan yang rakan kongsi tanya dahulu.',

    '<summary>What is the minimum order quantity?</summary>': '<summary>Apakah kuantiti pesanan minimum?</summary>',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Titik permulaan yang dicadangkan ialah 12–24 kotak untuk Penjual Runcit, 50–100 kotak untuk Rakan Borong dan 300+ kotak untuk Pengedar Serantau. Ini ialah MOQ cadangan — kuantiti sebenar disahkan semasa pertanyaan.',

    '<summary>Do you supply finished product or bulk ingredient?</summary>': '<summary>Adakah anda membekalkan produk siap atau bahan pukal?</summary>',
    'Finished, retail-ready product — 10 g sachets in branded boxes of 30. UNI MAX is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'Produk siap dan sedia runcit — sachet 10 g dalam kotak berjenama 30 sachet. UNI MAX tidak dijual sebagai ekstrak pukal atau bahan mentah, jadi rakan kongsi boleh meletakkannya di rak tanpa pembungkusan tambahan atau formulasi semula.',

    '<summary>What certifications does UNI MAX hold?</summary>': '<summary>Apakah pensijilan yang dipegang UNI MAX?</summary>',
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP.':
      'UNI MAX dihasilkan di kemudahan yang disahkan untuk HALAL (JAKIM), GMP (Amalan Pengilangan Baik), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 dan HACCP.',

    '<summary>Where is UNI MAX manufactured?</summary>': '<summary>Di manakah UNI MAX dihasilkan?</summary>',
    '<p>In Malaysia, in certified manufacturing facilities.</p>': '<p>Di Malaysia, di kemudahan pengeluaran bersijil.</p>',

    '<summary>What is in each box?</summary>': '<summary>Apakah kandungan setiap kotak?</summary>',
    '30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '30 sachet siap minum 10 g. Formula menggabungkan Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam) dengan 12+ botani dan nutrien, termasuk guarana, adaptogen dan asid amino, tanpa gula tambahan.',

    '<summary>How do I get wholesale pricing?</summary>': '<summary>Bagaimana untuk mendapatkan harga borong?</summary>',
    '<summary>Do you deliver to Europe?</summary>': '<summary>Adakah anda menghantar ke Eropah?</summary>',
    'UNI MAX is produced and filled by Orient Biotech Sdn Bhd, a certified manufacturing facility in Malaysia — the certifications above are registered to this facility, so every box a partner stocks comes off a certified line. The brand and formula are owned by UniPro (Malaysia), international distribution is managed by Wellness Alliance Sdn Bhd, and European enquiries are handled by a dedicated partnership desk, Wellness Network GmbH.':
      'UNI MAX dihasilkan dan diisi oleh Orient Biotech Sdn Bhd — kemudahan pembuatan bertauliah di Malaysia, dan pensijilan di atas didaftarkan atas nama kemudahan ini, jadi setiap kotak yang distok rakan kongsi datang dari barisan pengeluaran yang diperakui. Jenama dan formula dimiliki oleh UniPro (Malaysia), pengedaran antarabangsa diuruskan oleh Wellness Alliance Sdn Bhd, dan pertanyaan pasaran Eropah dikendalikan oleh meja perkongsian khusus, Wellness Network GmbH.',
    'Finished product, not powder':
      'Produk siap, bukan serbuk',
    'Not every Tongkat Ali supplier hands you a finished product.':
      'Bukan semua pembekal Tongkat Ali menyerahkan produk siap kepada anda.',
    'Many Tongkat Ali suppliers in Malaysia sell raw extract powder. Buying powder means you still need to source a filling plant, design packaging, run stability tests and apply for your own certifications — months of work before the first box reaches a shelf.':
      'Ramai pembekal Tongkat Ali di Malaysia menjual serbuk ekstrak mentah. Membeli serbuk bermakna anda masih perlu mencari kilang pengisian, mereka bentuk pembungkusan, menjalankan ujian kestabilan dan memohon pensijilan sendiri — berbulan-bulan kerja sebelum kotak pertama sampai ke rak.',
    'UNI MAX takes the opposite route for wholesale partners and distributors: a finished, shelf-ready botanical vitality drink — 30 sachets to a box, produced on a certified line, with brand, packaging and documentation already done. You order, you receive, you sell.':
      'UNI MAX mengambil laluan sebaliknya untuk rakan borong dan pengedar: minuman vitaliti botani yang siap dan sedia rak — 30 sachet sekotak, dihasilkan di barisan bertauliah, dengan jenama, pembungkusan dan dokumentasi sedia ada. Anda pesan, anda terima, anda jual.',
    'That is the difference between buying an ingredient and stocking a product — and it is why resellers, gyms, clinics and regional distributors partner with UNI MAX instead of building a brand from powder.':
      'Itulah beza antara membeli bahan mentah dan menstok produk — dan itulah sebab peruncit, gim, klinik dan pengedar wilayah memilih bekerjasama dengan UNI MAX daripada membina jenama dari serbuk.',
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. Send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      'Ya. Pesanan Eropah dipenuhi melalui rakan pengedaran tempatan, dan hubungan jualan untuk laman ini berpangkalan di Jerman. Hantar negara dan anggaran kuantiti anda melalui WhatsApp, dan logistik serta terma akan disahkan untuk pasaran anda.',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry over WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Harga diberikan atas permintaan dan bergantung pada tahap kerjasama serta kuantiti. Hantar pertanyaan melalui WhatsApp dengan pasaran dan jumlah yang dihasratkan, dan terma akan disahkan terus.',

    'Tell us your market and volume.': 'Beritahu kami pasaran dan jumlah anda.',
    'Send an enquiry and we will confirm the right partnership level, the actual order quantity and pricing for it.':
      'Hantar pertanyaan dan kami akan sahkan tahap kerjasama yang sesuai, kuantiti pesanan sebenar dan harganya.',

    'Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.':
      home.ms['foot.about'],
    '<h3>Explore</h3>': '<h3>' + home.ms['foot.explore'] + '</h3>',
    '<h3>Product</h3>': '<h3>' + home.ms['foot.product'] + '</h3>',
    '<h3>Contact</h3>': '<h3>' + home.ms['foot.contact'] + '</h3>',
    '<li>10g × 30 sachets</li>': '<li>' + home.ms['foot.p1'] + '</li>',
    '<li>Ready-to-drink</li>': '<li>' + home.ms['foot.p2'] + '</li>',
    '<li>Botanical lychee</li>': '<li>' + home.ms['foot.p3'] + '</li>',
    '<li>HALAL certified</li>': '<li>' + home.ms['foot.p4'] + '</li>',
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.':
      home.ms['foot.disclaimer'],
    'UniPro · UNI MAX. All rights reserved.': 'UniPro · UNI MAX. Hak cipta terpelihara.',
    'Manufactured in Malaysia by Orient Biotech Sdn Bhd.': 'Dihasilkan di Malaysia oleh Orient Biotech Sdn Bhd.',
  },

  jsonld: {
    '"name":"Home"': '"name":"Laman Utama"',
    '"name":"Wholesale & Distribution"': '"name":"Borong & Pengedaran"',
    '"name":"What is the minimum order quantity?"': '"name":"Apakah kuantiti pesanan minimum?"',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner, and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Titik permulaan yang dicadangkan ialah 12–24 kotak untuk Penjual Runcit, 50–100 kotak untuk Rakan Borong, dan 300+ kotak untuk Pengedar Serantau. Ini ialah MOQ cadangan — kuantiti sebenar disahkan semasa pertanyaan.',
    '"name":"Do you supply finished product or bulk ingredient?"': '"name":"Adakah anda membekalkan produk siap atau bahan pukal?"',
    'UNI MAX is supplied as a finished, retail-ready product — 10 g sachets in branded boxes of 30. It is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'UNI MAX dibekalkan sebagai produk siap dan sedia runcit — sachet 10 g dalam kotak berjenama 30 sachet. Ia tidak dijual sebagai ekstrak pukal atau bahan mentah, jadi rakan kongsi boleh meletakkannya di rak tanpa pembungkusan tambahan atau formulasi semula.',
    '"name":"What certifications does UNI MAX hold?"': '"name":"Apakah pensijilan yang dipegang UNI MAX?"',
    '"name":"Where is UNI MAX manufactured?"': '"name":"Di manakah UNI MAX dihasilkan?"',
    'UNI MAX is made in Malaysia, in certified manufacturing facilities.':
      'UNI MAX dibuat di Malaysia, di kemudahan pengeluaran bersijil.',
    '"name":"What is in each box?"': '"name":"Apakah kandungan setiap kotak?"',
    'Each box contains 30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      'Setiap kotak mengandungi 30 sachet siap minum 10 g. Formula menggabungkan Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam) dengan 12+ botani dan nutrien, termasuk guarana, adaptogen dan asid amino, tanpa gula tambahan.',
    '"name":"How do I get wholesale pricing?"': '"name":"Bagaimana untuk mendapatkan harga borong?"',
    '"name":"Do you deliver to Europe?"': '"name":"Adakah anda menghantar ke Eropah?"',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry via WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Harga diberikan atas permintaan dan bergantung pada tahap kerjasama serta kuantiti. Hantar pertanyaan melalui WhatsApp dengan pasaran dan jumlah yang dihasratkan, dan terma akan disahkan terus.',
  },
};

module.exports = { zh, ms };
