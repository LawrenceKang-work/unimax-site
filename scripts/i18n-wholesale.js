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
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">see what a halal certification actually covers</a>.':
      'UNI MAX 在持有 HALAL（JAKIM）、GMP（良好生产规范）、MeSTI（马来西亚卫生部）、ISO 9001:2015 与 HACCP 认证的设施中生产 —— 可查看<a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">清真认证到底涵盖什么</a>（英文页面）。',

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
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. See the <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">European Partnership Desk</a> for how EU distribution works, or send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      '可以。欧洲订单由当地的分销合作伙伴交付，本站的销售联络人常驻德国。可查看<a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">欧洲合作台</a>（英文页面）了解欧洲分销的具体运作方式，或直接通过 WhatsApp 告知你的国家与预计订量，我们会为你的市场确认物流与条款。',
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
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">see what a halal certification actually covers</a>.':
      'UNI MAX dihasilkan di kemudahan yang disahkan untuk HALAL (JAKIM), GMP (Amalan Pengilangan Baik), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 dan HACCP — lihat <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">apa yang sebenarnya diliputi oleh pensijilan halal</a> (dalam Bahasa Inggeris).',

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
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. See the <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">European Partnership Desk</a> for how EU distribution works, or send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      'Ya. Pesanan Eropah dipenuhi melalui rakan pengedaran tempatan, dan hubungan jualan untuk laman ini berpangkalan di Jerman. Lihat <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">Meja Kerjasama Eropah</a> (dalam Bahasa Inggeris) untuk cara pengedaran EU berfungsi, atau hantar negara dan anggaran kuantiti anda melalui WhatsApp, dan logistik serta terma akan disahkan untuk pasaran anda.',
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

/* ---------- Polski ---------- */
const pl = {
  docLang: 'pl',
  label: 'Polski',
  meta: {
    title: 'Hurt i Dystrybucja Napoju Tongkat Ali | UNI MAX',
    desc: 'Certyfikowany halal, gotowy do picia napój witalny Tongkat Ali, gotowy do sprzedaży w pudełkach 10 g × 30 saszetek. Sugerowane MOQ od 12 pudełek. Wyprodukowano w Malezji.',
    ogTitle: 'Hurt i Dystrybucja Napoju Tongkat Ali — UNI MAX',
    ogDesc: 'Certyfikowany halal, gotowy do picia napój witalny Tongkat Ali w pudełkach gotowych do sprzedaży. Poziomy współpracy od punktu sprzedaży detalicznej po dystrybutora regionalnego. Wyprodukowano w Malezji.',
  },

  all: {
    '>Benefits</a>': '>' + home.pl['nav.benefits'] + '</a>',
    '>Formula</a>': '>' + home.pl['nav.formula'] + '</a>',
    '>Certified</a>': '>' + home.pl['nav.trust'] + '</a>',
    '>FAQ</a>': '>' + home.pl['nav.faq'] + '</a>',
    '>Overview</a>': '>' + home.pl['nav.overview'] + '</a>',
    '>Why UNI MAX</a>': '>' + home.pl['nav.why'] + '</a>',
    '>Partnerships</a>': '>' + home.pl['nav.partnerships'] + '</a>',
    '>About</a>': '>' + home.pl['nav.about'] + '</a>',
    '>Contact</a>': '>' + home.pl['nav.contact'] + '</a>',
    '<span>Become a Partner</span>': '<span>' + home.pl['cta.order'] + '</span>',
    '<small>boxes</small>': '<small>pudełek</small>',
  },

  html: {
    'Back to UNI MAX': 'Powrót do UNI MAX',
    '<span class="eyebrow">Wholesale &amp; Distribution</span>': '<span class="eyebrow">Hurt i Dystrybucja</span>',
    'Stock a finished botanical vitality drink, not a raw ingredient.':
      'Oferuj gotowy botaniczny napój witalny, nie surowy składnik.',
    'UNI MAX is supplied retail-ready — Triple Force Tongkat Ali in 10&nbsp;g sachets, 30 to a branded box. No repacking, no reformulation, no minimum tonnage. Made in Malaysia in HALAL, GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facilities.':
      'UNI MAX jest dostarczany gotowy do sprzedaży — Tongkat Ali Potrójnej Mocy w saszetkach 10&nbsp;g, 30 sztuk w markowym pudełku. Bez przepakowywania, bez zmiany receptury, bez minimalnego tonażu. Wyprodukowano w Malezji w zakładach certyfikowanych HALAL, GMP, MeSTI, ISO&nbsp;9001 i HACCP.',
    'Same-day WhatsApp reply · Pricing on request': 'Odpowiedź na WhatsApp tego samego dnia · Cena na zapytanie',
    '<span>boxes — suggested entry MOQ</span>': '<span>pudełek — sugerowane MOQ wejściowe</span>',
    '<span>sachets per box, 10 g each</span>': '<span>saszetek w pudełku, po 10 g</span>',
    '<span>botanicals &amp; nutrients</span>': '<span>składników botanicznych i odżywczych</span>',
    '<span>facility certifications</span>': '<span>certyfikatów zakładu</span>',

    '<span class="eyebrow">Why partner on UNI MAX</span>': '<span class="eyebrow">Dlaczego warto współpracować z UNI MAX</span>',
    'Shelf-ready from the first carton.': 'Gotowe na półkę od pierwszego kartonu.',

    'Finished product, not bulk extract': 'Produkt gotowy, nie ekstrakt luzem',
    'Most Tongkat Ali supply out of Malaysia is sold as extract powder by the kilogram, leaving you to formulate, pack and brand it. UNI MAX arrives as a finished consumer product in retail packaging — you can put it on shelf as it is.':
      'Większość dostaw Tongkat Ali z Malezji sprzedawana jest jako proszek ekstraktu na kilogramy, pozostawiając tobie recepturę, pakowanie i markę. UNI MAX dociera jako gotowy produkt konsumencki w opakowaniu detalicznym — możesz od razu wystawić go na półkę.',

    'Entry quantities that suit a first order': 'Ilości wejściowe dopasowane do pierwszego zamówienia',
    'Partnership starts at a suggested 12 boxes, so a single shop, gym or clinic can trial the product without committing to pallet volumes. Larger wholesale and regional distributor levels are available as demand builds.':
      'Współpraca zaczyna się od sugerowanych 12 pudełek, więc pojedynczy sklep, siłownia czy klinika może przetestować produkt bez zobowiązania do ilości paletowych. Większe poziomy hurtowe i regionalnego dystrybutora są dostępne w miarę wzrostu popytu.',

    'Certified manufacturing behind it': 'Za nim stoi certyfikowana produkcja',
    'Produced in facilities holding HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP certification — the documentation set that halal-import buyers and retail chains typically ask for.':
      'Produkowany w zakładach posiadających certyfikaty HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 i HACCP — zestaw dokumentacji, o który zazwyczaj proszą kupujący importujący halal i sieci detaliczne.',

    'A defined consumer format': 'Określony format konsumencki',
    'A 10 g ready-to-drink lychee sachet — no shaker, no capsules, no measuring. The format that suits impulse retail, gym counters and e-commerce bundles alike.':
      'Saszetka liczi gotowa do picia 10 g — bez shakera, bez kapsułek, bez odmierzania. Format, który pasuje zarówno do zakupów impulsywnych, lad w siłowniach, jak i zestawów e-commerce.',

    'Formulated around a recognisable hero': 'Zbudowany wokół rozpoznawalnego głównego składnika',
    'Triple Force Tongkat Ali (Yellow, Red and Black) with guarana, adaptogens and amino acids. Tongkat Ali carries strong existing recognition with buyers across ASEAN and halal markets.':
      'Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny) z guaraną, adaptogenami i aminokwasami. Tongkat Ali cieszy się już silnym rozpoznaniem wśród kupujących w krajach ASEAN i na rynkach halal.',

    'Direct line, no portal': 'Bezpośrednia linia, bez portalu',
    'Enquiries are handled directly over WhatsApp with a same-day reply, so quantities and terms get confirmed in one conversation rather than a ticket queue.':
      'Zapytania są obsługiwane bezpośrednio przez WhatsApp z odpowiedzią tego samego dnia, więc ilości i warunki są potwierdzane w jednej rozmowie, a nie w kolejce zgłoszeń.',

    '<span class="eyebrow">Suggested MOQ · actual confirmed on enquiry</span>':
      '<span class="eyebrow">Sugerowane MOQ · rzeczywiste potwierdzane przy zapytaniu</span>',
    'Choose your <span class="hl">partnership level</span>.': 'Wybierz swój <span class="hl">poziom współpracy</span>.',
    '<h3>Retail Stockist</h3>': '<h3>' + home.pl['order.p1name'] + '</h3>',
    'Small wellness shops, gyms, clinics and supplement stores taking a first position on the product.':
      'Małe sklepy zdrowia, siłownie, kliniki i sklepy z suplementami wprowadzające produkt po raz pierwszy.',
    'Most popular': 'Najpopularniejsze',
    '<h3>Wholesale Partner</h3>': '<h3>' + home.pl['order.p2name'] + '</h3>',
    'E-commerce sellers, larger gyms and multi-branch retailers running the product across more than one channel or location.':
      'Sprzedawcy e-commerce, większe siłownie i sieci detaliczne prowadzące produkt w więcej niż jednym kanale lub lokalizacji.',
    '<h3>Regional Distributor</h3>': '<h3>' + home.pl['order.p3name'] + '</h3>',
    'Country-level or regional partners building distribution across a territory.':
      'Partnerzy krajowi lub regionalni budujący dystrybucję na danym terytorium.',

    '<span class="eyebrow">How it works</span>': '<span class="eyebrow">Jak to działa</span>',
    'Three steps to a first order.': 'Trzy kroki do pierwszego zamówienia.',
    'Send an enquiry': 'Wyślij zapytanie',
    'Message us on WhatsApp with your market, your channel and the volume you have in mind. Same-day reply.':
      'Napisz do nas na WhatsApp, podając swój rynek, kanał i wolumen, który masz na myśli. Odpowiedź tego samego dnia.',
    'Confirm level and terms': 'Potwierdź poziom i warunki',
    'We match you to a partnership level, confirm the actual order quantity and quote pricing for it — the listed MOQs are starting points, not fixed rules.':
      'Dopasujemy cię do poziomu współpracy, potwierdzimy rzeczywistą ilość zamówienia i podamy dla niej cenę — wymienione MOQ to punkty wyjścia, nie sztywne reguły.',
    'Place the order': 'Złóż zamówienie',
    'Order details, documentation and delivery arrangements are confirmed directly with you before anything is finalised.':
      'Szczegóły zamówienia, dokumentacja i ustalenia dotyczące dostawy są potwierdzane bezpośrednio z tobą, zanim cokolwiek zostanie sfinalizowane.',

    '<span class="eyebrow">Certified manufacturing</span>': '<span class="eyebrow">Certyfikowana produkcja</span>',
    'Made in Malaysia, in certified facilities.': 'Wyprodukowano w Malezji, w certyfikowanych zakładach.',
    'alt="HALAL JAKIM Certified"': 'alt="Certyfikat HALAL JAKIM"',
    'alt="GMP Good Manufacturing Practice"': 'alt="GMP Dobra Praktyka Wytwarzania"',
    'alt="MeSTI Kementerian Kesihatan Malaysia"': 'alt="MeSTI Ministerstwo Zdrowia Malezji"',
    'alt="ISO 9001:2015 Certified"': 'alt="Certyfikat ISO 9001:2015"',
    'alt="HACCP Food Safety Certified"': 'alt="Certyfikat HACCP Bezpieczeństwa Żywności"',

    '<span class="eyebrow">Wholesale FAQ</span>': '<span class="eyebrow">FAQ hurtowe</span>',
    'Questions partners ask first.': 'Pytania, które partnerzy zadają najpierw.',

    '<summary>What is the minimum order quantity?</summary>': '<summary>Jaka jest minimalna ilość zamówienia?</summary>',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Sugerowane punkty wyjścia to 12–24 pudełek dla punktu sprzedaży detalicznej, 50–100 pudełek dla partnera hurtowego i 300+ pudełek dla dystrybutora regionalnego. To sugerowane MOQ — rzeczywista ilość jest potwierdzana przy zapytaniu.',

    '<summary>Do you supply finished product or bulk ingredient?</summary>': '<summary>Czy dostarczacie gotowy produkt czy surowiec luzem?</summary>',
    'Finished, retail-ready product — 10 g sachets in branded boxes of 30. UNI MAX is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'Gotowy produkt, przeznaczony do sprzedaży detalicznej — saszetki 10 g w markowych pudełkach po 30 sztuk. UNI MAX nie jest sprzedawany jako ekstrakt luzem ani surowiec, więc partnerzy mogą wystawić go na półkę bez dodatkowego pakowania czy zmiany receptury.',

    '<summary>What certifications does UNI MAX hold?</summary>': '<summary>Jakie certyfikaty posiada UNI MAX?</summary>',
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">see what a halal certification actually covers</a>.':
      'UNI MAX jest produkowany w zakładach certyfikowanych HALAL (JAKIM), GMP (Dobra Praktyka Wytwarzania), MeSTI (Ministerstwo Zdrowia Malezji), ISO 9001:2015 i HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">zobacz, co faktycznie obejmuje certyfikacja halal</a> (strona w języku angielskim).',

    '<summary>Where is UNI MAX manufactured?</summary>': '<summary>Gdzie produkowany jest UNI MAX?</summary>',
    '<p>In Malaysia, in certified manufacturing facilities.</p>': '<p>W Malezji, w certyfikowanych zakładach produkcyjnych.</p>',

    '<summary>What is in each box?</summary>': '<summary>Co znajduje się w każdym pudełku?</summary>',
    '30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '30 saszetek gotowych do picia po 10 g. Receptura łączy Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny) z ponad 12 składnikami botanicznymi i odżywczymi, w tym guaraną, adaptogenami i aminokwasami, bez dodatku cukru.',

    '<summary>How do I get wholesale pricing?</summary>': '<summary>Jak uzyskać ceny hurtowe?</summary>',
    '<summary>Do you deliver to Europe?</summary>': '<summary>Czy dostarczacie do Europy?</summary>',
    'UNI MAX is produced and filled by Orient Biotech Sdn Bhd, a certified manufacturing facility in Malaysia — the certifications above are registered to this facility, so every box a partner stocks comes off a certified line. The brand and formula are owned by UniPro (Malaysia), international distribution is managed by Wellness Alliance Sdn Bhd, and European enquiries are handled by a dedicated partnership desk, Wellness Network GmbH.':
      'UNI MAX jest produkowany i rozlewany przez Orient Biotech Sdn Bhd, certyfikowany zakład produkcyjny w Malezji — powyższe certyfikaty są zarejestrowane na ten zakład, więc każde pudełko, które magazynuje partner, schodzi z certyfikowanej linii. Marka i receptura należą do UniPro (Malezja), dystrybucją międzynarodową zarządza Wellness Alliance Sdn Bhd, a zapytania europejskie obsługuje dedykowane biuro partnerstwa, Wellness Network GmbH.',
    'Finished product, not powder':
      'Produkt gotowy, nie proszek',
    'Not every Tongkat Ali supplier hands you a finished product.':
      'Nie każdy dostawca Tongkat Ali daje ci gotowy produkt.',
    'Many Tongkat Ali suppliers in Malaysia sell raw extract powder. Buying powder means you still need to source a filling plant, design packaging, run stability tests and apply for your own certifications — months of work before the first box reaches a shelf.':
      'Wielu dostawców Tongkat Ali w Malezji sprzedaje surowy proszek ekstraktu. Kupno proszku oznacza, że nadal musisz znaleźć zakład rozlewniczy, zaprojektować opakowanie, przeprowadzić badania stabilności i wystąpić o własne certyfikaty — miesiące pracy, zanim pierwsze pudełko trafi na półkę.',
    'UNI MAX takes the opposite route for wholesale partners and distributors: a finished, shelf-ready botanical vitality drink — 30 sachets to a box, produced on a certified line, with brand, packaging and documentation already done. You order, you receive, you sell.':
      'UNI MAX obiera odwrotną drogę dla partnerów hurtowych i dystrybutorów: gotowy, przeznaczony na półkę botaniczny napój witalny — 30 saszetek w pudełku, produkowany na certyfikowanej linii, z gotową marką, opakowaniem i dokumentacją. Zamawiasz, odbierasz, sprzedajesz.',
    'That is the difference between buying an ingredient and stocking a product — and it is why resellers, gyms, clinics and regional distributors partner with UNI MAX instead of building a brand from powder.':
      'Na tym polega różnica między kupowaniem składnika a magazynowaniem produktu — i dlatego odsprzedawcy, siłownie, kliniki i dystrybutorzy regionalni współpracują z UNI MAX zamiast budować markę od proszku.',
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. See the <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">European Partnership Desk</a> for how EU distribution works, or send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      'Tak. Zamówienia europejskie są realizowane przez lokalnego partnera dystrybucyjnego, a kontakt sprzedażowy dla tej strony znajduje się w Niemczech. Zobacz <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">Europejskie Biuro Partnerstwa</a> (strona w języku angielskim), aby dowiedzieć się, jak działa dystrybucja w UE, lub wyślij swój kraj i planowany wolumen przez WhatsApp, a logistyka i warunki zostaną potwierdzone dla twojego rynku.',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry over WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Cena jest podawana na zapytanie i zależy od poziomu współpracy oraz ilości. Wyślij zapytanie przez WhatsApp, podając swój rynek i planowany wolumen, a warunki zostaną potwierdzone bezpośrednio.',

    'Tell us your market and volume.': 'Podaj nam swój rynek i wolumen.',
    'Send an enquiry and we will confirm the right partnership level, the actual order quantity and pricing for it.':
      'Wyślij zapytanie, a my potwierdzimy odpowiedni poziom współpracy, rzeczywistą ilość zamówienia i cenę.',

    'Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.':
      home.pl['foot.about'],
    '<h3>Explore</h3>': '<h3>' + home.pl['foot.explore'] + '</h3>',
    '<h3>Product</h3>': '<h3>' + home.pl['foot.product'] + '</h3>',
    '<h3>Contact</h3>': '<h3>' + home.pl['foot.contact'] + '</h3>',
    '<li>10g × 30 sachets</li>': '<li>' + home.pl['foot.p1'] + '</li>',
    '<li>Ready-to-drink</li>': '<li>' + home.pl['foot.p2'] + '</li>',
    '<li>Botanical lychee</li>': '<li>' + home.pl['foot.p3'] + '</li>',
    '<li>HALAL certified</li>': '<li>' + home.pl['foot.p4'] + '</li>',
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.':
      home.pl['foot.disclaimer'],
    'UniPro · UNI MAX. All rights reserved.': 'UniPro · UNI MAX. Wszelkie prawa zastrzeżone.',
    'Manufactured in Malaysia by Orient Biotech Sdn Bhd.': 'Wyprodukowano w Malezji przez Orient Biotech Sdn Bhd.',
  },

  jsonld: {
    '"name":"Home"': '"name":"Strona główna"',
    '"name":"Wholesale & Distribution"': '"name":"Hurt i Dystrybucja"',
    '"name":"What is the minimum order quantity?"': '"name":"Jaka jest minimalna ilość zamówienia?"',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner, and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Sugerowane punkty wyjścia to 12–24 pudełek dla punktu sprzedaży detalicznej, 50–100 pudełek dla partnera hurtowego i 300+ pudełek dla dystrybutora regionalnego. To sugerowane MOQ — rzeczywista ilość jest potwierdzana przy zapytaniu.',
    '"name":"Do you supply finished product or bulk ingredient?"': '"name":"Czy dostarczacie gotowy produkt czy surowiec luzem?"',
    'UNI MAX is supplied as a finished, retail-ready product — 10 g sachets in branded boxes of 30. It is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'UNI MAX jest dostarczany jako gotowy produkt, przeznaczony do sprzedaży detalicznej — saszetki 10 g w markowych pudełkach po 30 sztuk. Nie jest sprzedawany jako ekstrakt luzem ani surowiec, więc partnerzy mogą wystawić go na półkę bez dodatkowego pakowania czy zmiany receptury.',
    '"name":"What certifications does UNI MAX hold?"': '"name":"Jakie certyfikaty posiada UNI MAX?"',
    '"name":"Where is UNI MAX manufactured?"': '"name":"Gdzie produkowany jest UNI MAX?"',
    'UNI MAX is made in Malaysia, in certified manufacturing facilities.':
      'UNI MAX jest wytwarzany w Malezji, w certyfikowanych zakładach produkcyjnych.',
    '"name":"What is in each box?"': '"name":"Co znajduje się w każdym pudełku?"',
    'Each box contains 30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      'Każde pudełko zawiera 30 saszetek gotowych do picia po 10 g. Receptura łączy Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny) z ponad 12 składnikami botanicznymi i odżywczymi, w tym guaraną, adaptogenami i aminokwasami, bez dodatku cukru.',
    '"name":"How do I get wholesale pricing?"': '"name":"Jak uzyskać ceny hurtowe?"',
    '"name":"Do you deliver to Europe?"': '"name":"Czy dostarczacie do Europy?"',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry via WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Cena jest podawana na zapytanie i zależy od poziomu współpracy oraz ilości. Wyślij zapytanie przez WhatsApp, podając swój rynek i planowany wolumen, a warunki zostaną potwierdzone bezpośrednio.',
  },
};

/* ---------- Nederlands ---------- */
const nl = {
  docLang: 'nl',
  label: 'Nederlands',
  meta: {
    title: 'Tongkat Ali Drank Groothandel & Distributie | UNI MAX',
    desc: 'Halal-gecertificeerde, drinkklare Tongkat Ali-vitaliteitsdrank, verkoopklaar in dozen van 10 g × 30 sachets. Voorgestelde MOQ vanaf 12 dozen. Gemaakt in Maleisië.',
    ogTitle: 'Tongkat Ali Drank Groothandel & Distributie — UNI MAX',
    ogDesc: 'Halal-gecertificeerde, drinkklare Tongkat Ali-vitaliteitsdrank in verkoopklare dozen. Partnerschapsniveaus van wederverkoper tot regionale distributeur. Gemaakt in Maleisië.',
  },

  all: {
    '>Benefits</a>': '>' + home.nl['nav.benefits'] + '</a>',
    '>Formula</a>': '>' + home.nl['nav.formula'] + '</a>',
    '>Certified</a>': '>' + home.nl['nav.trust'] + '</a>',
    '>FAQ</a>': '>' + home.nl['nav.faq'] + '</a>',
    '>Overview</a>': '>' + home.nl['nav.overview'] + '</a>',
    '>Why UNI MAX</a>': '>' + home.nl['nav.why'] + '</a>',
    '>Partnerships</a>': '>' + home.nl['nav.partnerships'] + '</a>',
    '>About</a>': '>' + home.nl['nav.about'] + '</a>',
    '>Contact</a>': '>' + home.nl['nav.contact'] + '</a>',
    '<span>Become a Partner</span>': '<span>' + home.nl['cta.order'] + '</span>',
    '<small>boxes</small>': '<small>dozen</small>',
  },

  html: {
    'Back to UNI MAX': 'Terug naar UNI MAX',
    '<span class="eyebrow">Wholesale &amp; Distribution</span>': '<span class="eyebrow">Groothandel &amp; Distributie</span>',
    'Stock a finished botanical vitality drink, not a raw ingredient.':
      'Verkoop een kant-en-klare botanische vitaliteitsdrank, geen grondstof.',
    'UNI MAX is supplied retail-ready — Triple Force Tongkat Ali in 10&nbsp;g sachets, 30 to a branded box. No repacking, no reformulation, no minimum tonnage. Made in Malaysia in HALAL, GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facilities.':
      'UNI MAX wordt verkoopklaar geleverd — Tongkat Ali met Drievoudige Kracht in sachets van 10&nbsp;g, 30 stuks per merkdoos. Geen herverpakking, geen herformulering, geen minimumtonnage. Gemaakt in Maleisië in faciliteiten gecertificeerd voor HALAL, GMP, MeSTI, ISO&nbsp;9001 en HACCP.',
    'Same-day WhatsApp reply · Pricing on request': 'WhatsApp-reactie dezelfde dag · Prijs op aanvraag',
    '<span>boxes — suggested entry MOQ</span>': '<span>dozen — voorgestelde instap-MOQ</span>',
    '<span>sachets per box, 10 g each</span>': '<span>sachets per doos, elk 10 g</span>',
    '<span>botanicals &amp; nutrients</span>': '<span>botanische stoffen &amp; voedingsstoffen</span>',
    '<span>facility certifications</span>': '<span>faciliteitscertificeringen</span>',

    '<span class="eyebrow">Why partner on UNI MAX</span>': '<span class="eyebrow">Waarom samenwerken met UNI MAX</span>',
    'Shelf-ready from the first carton.': 'Verkoopklaar vanaf de eerste doos.',

    'Finished product, not bulk extract': 'Eindproduct, geen bulkextract',
    'Most Tongkat Ali supply out of Malaysia is sold as extract powder by the kilogram, leaving you to formulate, pack and brand it. UNI MAX arrives as a finished consumer product in retail packaging — you can put it on shelf as it is.':
      'De meeste Tongkat Ali-aanvoer uit Maleisië wordt per kilogram verkocht als extractpoeder, waardoor u zelf moet formuleren, verpakken en van een merk voorzien. UNI MAX komt aan als een kant-en-klaar consumentenproduct in retailverpakking — u kunt het zo op het schap zetten.',

    'Entry quantities that suit a first order': 'Instaphoeveelheden die passen bij een eerste bestelling',
    'Partnership starts at a suggested 12 boxes, so a single shop, gym or clinic can trial the product without committing to pallet volumes. Larger wholesale and regional distributor levels are available as demand builds.':
      'Partnerschap begint bij voorgestelde 12 dozen, zodat een enkele winkel, sportschool of kliniek het product kan uitproberen zonder zich te binden aan palletvolumes. Grotere groothandels- en regionale distributeursniveaus zijn beschikbaar naarmate de vraag toeneemt.',

    'Certified manufacturing behind it': 'Gecertificeerde productie erachter',
    'Produced in facilities holding HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP certification — the documentation set that halal-import buyers and retail chains typically ask for.':
      'Geproduceerd in faciliteiten met HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 en HACCP-certificering — de documentatieset waar halal-importkopers en retailketens gewoonlijk om vragen.',

    'A defined consumer format': 'Een duidelijk consumentenformaat',
    'A 10 g ready-to-drink lychee sachet — no shaker, no capsules, no measuring. The format that suits impulse retail, gym counters and e-commerce bundles alike.':
      'Een drinkklaar lychee-sachet van 10 g — geen shaker, geen capsules, geen afmeten. Het formaat dat past bij impulsaankopen, sportschoolbalies en e-commercebundels.',

    'Formulated around a recognisable hero': 'Geformuleerd rond een herkenbaar hoofdingrediënt',
    'Triple Force Tongkat Ali (Yellow, Red and Black) with guarana, adaptogens and amino acids. Tongkat Ali carries strong existing recognition with buyers across ASEAN and halal markets.':
      'Tongkat Ali met Drievoudige Kracht (geel, rood en zwart) met guarana, adaptogenen en aminozuren. Tongkat Ali geniet al sterke herkenning bij kopers in ASEAN- en halal-markten.',

    'Direct line, no portal': 'Directe lijn, geen portaal',
    'Enquiries are handled directly over WhatsApp with a same-day reply, so quantities and terms get confirmed in one conversation rather than a ticket queue.':
      'Aanvragen worden rechtstreeks via WhatsApp afgehandeld met een reactie dezelfde dag, zodat hoeveelheden en voorwaarden in één gesprek worden bevestigd in plaats van in een tickettrij.',

    '<span class="eyebrow">Suggested MOQ · actual confirmed on enquiry</span>':
      '<span class="eyebrow">Voorgestelde MOQ · werkelijke hoeveelheid bevestigd bij navraag</span>',
    'Choose your <span class="hl">partnership level</span>.': 'Kies uw <span class="hl">partnerschapsniveau</span>.',
    '<h3>Retail Stockist</h3>': '<h3>' + home.nl['order.p1name'] + '</h3>',
    'Small wellness shops, gyms, clinics and supplement stores taking a first position on the product.':
      'Kleine wellnesswinkels, sportscholen, klinieken en supplementenwinkels die voor het eerst het product opnemen.',
    'Most popular': 'Meest populair',
    '<h3>Wholesale Partner</h3>': '<h3>' + home.nl['order.p2name'] + '</h3>',
    'E-commerce sellers, larger gyms and multi-branch retailers running the product across more than one channel or location.':
      'E-commerceverkopers, grotere sportscholen en retailers met meerdere vestigingen die het product via meer dan één kanaal of locatie voeren.',
    '<h3>Regional Distributor</h3>': '<h3>' + home.nl['order.p3name'] + '</h3>',
    'Country-level or regional partners building distribution across a territory.':
      'Partners op land- of regionaal niveau die distributie opbouwen over een gebied.',

    '<span class="eyebrow">How it works</span>': '<span class="eyebrow">Hoe het werkt</span>',
    'Three steps to a first order.': 'Drie stappen naar een eerste bestelling.',
    'Send an enquiry': 'Stuur een aanvraag',
    'Message us on WhatsApp with your market, your channel and the volume you have in mind. Same-day reply.':
      'Stuur ons een bericht op WhatsApp met uw markt, uw kanaal en het volume dat u voor ogen heeft. Reactie dezelfde dag.',
    'Confirm level and terms': 'Bevestig niveau en voorwaarden',
    'We match you to a partnership level, confirm the actual order quantity and quote pricing for it — the listed MOQs are starting points, not fixed rules.':
      'Wij matchen u met een partnerschapsniveau, bevestigen de werkelijke bestelhoeveelheid en geven daarvoor een prijsopgave — de vermelde MOQ\'s zijn startpunten, geen vaste regels.',
    'Place the order': 'Plaats de bestelling',
    'Order details, documentation and delivery arrangements are confirmed directly with you before anything is finalised.':
      'Besteldetails, documentatie en leveringsregelingen worden rechtstreeks met u bevestigd voordat iets wordt afgerond.',

    '<span class="eyebrow">Certified manufacturing</span>': '<span class="eyebrow">Gecertificeerde productie</span>',
    'Made in Malaysia, in certified facilities.': 'Gemaakt in Maleisië, in gecertificeerde faciliteiten.',
    'alt="HALAL JAKIM Certified"': 'alt="HALAL JAKIM Gecertificeerd"',
    'alt="GMP Good Manufacturing Practice"': 'alt="GMP Goede Productiepraktijken"',
    'alt="MeSTI Kementerian Kesihatan Malaysia"': 'alt="MeSTI Ministerie van Volksgezondheid Maleisië"',
    'alt="ISO 9001:2015 Certified"': 'alt="ISO 9001:2015 Gecertificeerd"',
    'alt="HACCP Food Safety Certified"': 'alt="HACCP Voedselveiligheid Gecertificeerd"',

    '<span class="eyebrow">Wholesale FAQ</span>': '<span class="eyebrow">Veelgestelde vragen groothandel</span>',
    'Questions partners ask first.': 'Vragen die partners als eerste stellen.',

    '<summary>What is the minimum order quantity?</summary>': '<summary>Wat is de minimale bestelhoeveelheid?</summary>',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Voorgestelde startpunten zijn 12–24 dozen voor een retailer, 50–100 dozen voor een groothandelspartner en 300+ dozen voor een regionale distributeur. Dit zijn voorgestelde MOQ\'s — de werkelijke hoeveelheid wordt bevestigd bij navraag.',

    '<summary>Do you supply finished product or bulk ingredient?</summary>': '<summary>Levert u een kant-en-klaar product of een grondstof in bulk?</summary>',
    'Finished, retail-ready product — 10 g sachets in branded boxes of 30. UNI MAX is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'Kant-en-klaar, verkoopklaar product — sachets van 10 g in merkdozen van 30. UNI MAX wordt niet verkocht als bulkextract of grondstof, zodat partners het zonder extra verpakking of herformulering op het schap kunnen zetten.',

    '<summary>What certifications does UNI MAX hold?</summary>': '<summary>Welke certificeringen heeft UNI MAX?</summary>',
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">see what a halal certification actually covers</a>.':
      'UNI MAX wordt vervaardigd in faciliteiten gecertificeerd voor HALAL (JAKIM), GMP (Goede Productiepraktijken), MeSTI (Ministerie van Volksgezondheid Maleisië), ISO 9001:2015 en HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">bekijk wat een halal-certificering werkelijk dekt</a> (Engelstalige pagina).',

    '<summary>Where is UNI MAX manufactured?</summary>': '<summary>Waar wordt UNI MAX vervaardigd?</summary>',
    '<p>In Malaysia, in certified manufacturing facilities.</p>': '<p>In Maleisië, in gecertificeerde productiefaciliteiten.</p>',

    '<summary>What is in each box?</summary>': '<summary>Wat zit er in elke doos?</summary>',
    '30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '30 drinkklare sachets van 10 g. De formule combineert Tongkat Ali met Drievoudige Kracht (geel, rood en zwart) met 12+ botanische stoffen en voedingsstoffen, waaronder guarana, adaptogenen en aminozuren, zonder toegevoegde suiker.',

    '<summary>How do I get wholesale pricing?</summary>': '<summary>Hoe kom ik aan groothandelsprijzen?</summary>',
    '<summary>Do you deliver to Europe?</summary>': '<summary>Levert u aan Europa?</summary>',
    'UNI MAX is produced and filled by Orient Biotech Sdn Bhd, a certified manufacturing facility in Malaysia — the certifications above are registered to this facility, so every box a partner stocks comes off a certified line. The brand and formula are owned by UniPro (Malaysia), international distribution is managed by Wellness Alliance Sdn Bhd, and European enquiries are handled by a dedicated partnership desk, Wellness Network GmbH.':
      'UNI MAX wordt geproduceerd en gevuld door Orient Biotech Sdn Bhd, een gecertificeerde productiefaciliteit in Maleisië — de bovenstaande certificeringen zijn op deze faciliteit geregistreerd, dus elke doos die een partner op voorraad heeft, komt van een gecertificeerde lijn. Het merk en de formule zijn eigendom van UniPro (Maleisië), internationale distributie wordt beheerd door Wellness Alliance Sdn Bhd, en Europese aanvragen worden afgehandeld door een toegewijd partnerschapsbureau, Wellness Network GmbH.',
    'Finished product, not powder':
      'Eindproduct, geen poeder',
    'Not every Tongkat Ali supplier hands you a finished product.':
      'Niet elke Tongkat Ali-leverancier geeft u een kant-en-klaar product.',
    'Many Tongkat Ali suppliers in Malaysia sell raw extract powder. Buying powder means you still need to source a filling plant, design packaging, run stability tests and apply for your own certifications — months of work before the first box reaches a shelf.':
      'Veel Tongkat Ali-leveranciers in Maleisië verkopen ruw extractpoeder. Poeder kopen betekent dat u nog steeds een vulinstallatie moet vinden, verpakking moet ontwerpen, stabiliteitstests moet uitvoeren en uw eigen certificeringen moet aanvragen — maanden werk voordat de eerste doos een schap bereikt.',
    'UNI MAX takes the opposite route for wholesale partners and distributors: a finished, shelf-ready botanical vitality drink — 30 sachets to a box, produced on a certified line, with brand, packaging and documentation already done. You order, you receive, you sell.':
      'UNI MAX slaat voor groothandelspartners en distributeurs de tegenovergestelde weg in: een kant-en-klare, verkoopklare botanische vitaliteitsdrank — 30 sachets per doos, geproduceerd op een gecertificeerde lijn, met merk, verpakking en documentatie al geregeld. U bestelt, u ontvangt, u verkoopt.',
    'That is the difference between buying an ingredient and stocking a product — and it is why resellers, gyms, clinics and regional distributors partner with UNI MAX instead of building a brand from powder.':
      'Dat is het verschil tussen het kopen van een ingrediënt en het op voorraad hebben van een product — en daarom werken wederverkopers, sportscholen, klinieken en regionale distributeurs samen met UNI MAX in plaats van een merk vanaf poeder op te bouwen.',
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. See the <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">European Partnership Desk</a> for how EU distribution works, or send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      'Ja. Europese bestellingen worden afgehandeld via een lokale distributiepartner, en het verkoopcontact voor deze site is gevestigd in Duitsland. Bekijk het <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">Europese Partnerschapsbureau</a> (Engelstalige pagina) voor hoe EU-distributie werkt, of stuur uw land en beoogde volume via WhatsApp, en logistiek en voorwaarden worden voor uw markt bevestigd.',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry over WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Prijzen worden op aanvraag opgegeven en zijn afhankelijk van partnerschapsniveau en hoeveelheid. Stuur een aanvraag via WhatsApp met uw markt en beoogde volume, en voorwaarden worden rechtstreeks bevestigd.',

    'Tell us your market and volume.': 'Vertel ons uw markt en volume.',
    'Send an enquiry and we will confirm the right partnership level, the actual order quantity and pricing for it.':
      'Stuur een aanvraag en wij bevestigen het juiste partnerschapsniveau, de werkelijke bestelhoeveelheid en de prijs ervoor.',

    'Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.':
      home.nl['foot.about'],
    '<h3>Explore</h3>': '<h3>' + home.nl['foot.explore'] + '</h3>',
    '<h3>Product</h3>': '<h3>' + home.nl['foot.product'] + '</h3>',
    '<h3>Contact</h3>': '<h3>' + home.nl['foot.contact'] + '</h3>',
    '<li>10g × 30 sachets</li>': '<li>' + home.nl['foot.p1'] + '</li>',
    '<li>Ready-to-drink</li>': '<li>' + home.nl['foot.p2'] + '</li>',
    '<li>Botanical lychee</li>': '<li>' + home.nl['foot.p3'] + '</li>',
    '<li>HALAL certified</li>': '<li>' + home.nl['foot.p4'] + '</li>',
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.':
      home.nl['foot.disclaimer'],
    'UniPro · UNI MAX. All rights reserved.': 'UniPro · UNI MAX. Alle rechten voorbehouden.',
    'Manufactured in Malaysia by Orient Biotech Sdn Bhd.': 'Vervaardigd in Maleisië door Orient Biotech Sdn Bhd.',
  },

  jsonld: {
    '"name":"Home"': '"name":"Home"',
    '"name":"Wholesale & Distribution"': '"name":"Groothandel & Distributie"',
    '"name":"What is the minimum order quantity?"': '"name":"Wat is de minimale bestelhoeveelheid?"',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner, and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Voorgestelde startpunten zijn 12–24 dozen voor een retailer, 50–100 dozen voor een groothandelspartner, en 300+ dozen voor een regionale distributeur. Dit zijn voorgestelde MOQ\'s — de werkelijke hoeveelheid wordt bevestigd bij navraag.',
    '"name":"Do you supply finished product or bulk ingredient?"': '"name":"Levert u een kant-en-klaar product of een grondstof in bulk?"',
    'UNI MAX is supplied as a finished, retail-ready product — 10 g sachets in branded boxes of 30. It is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'UNI MAX wordt geleverd als een kant-en-klaar, verkoopklaar product — sachets van 10 g in merkdozen van 30. Het wordt niet verkocht als bulkextract of grondstof, zodat partners het zonder extra verpakking of herformulering op het schap kunnen zetten.',
    '"name":"What certifications does UNI MAX hold?"': '"name":"Welke certificeringen heeft UNI MAX?"',
    '"name":"Where is UNI MAX manufactured?"': '"name":"Waar wordt UNI MAX vervaardigd?"',
    'UNI MAX is made in Malaysia, in certified manufacturing facilities.':
      'UNI MAX wordt gemaakt in Maleisië, in gecertificeerde productiefaciliteiten.',
    '"name":"What is in each box?"': '"name":"Wat zit er in elke doos?"',
    'Each box contains 30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      'Elke doos bevat 30 drinkklare sachets van 10 g. De formule combineert Tongkat Ali met Drievoudige Kracht (geel, rood en zwart) met 12+ botanische stoffen en voedingsstoffen, waaronder guarana, adaptogenen en aminozuren, zonder toegevoegde suiker.',
    '"name":"How do I get wholesale pricing?"': '"name":"Hoe kom ik aan groothandelsprijzen?"',
    '"name":"Do you deliver to Europe?"': '"name":"Levert u aan Europa?"',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry via WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Prijzen worden op aanvraag opgegeven en zijn afhankelijk van partnerschapsniveau en hoeveelheid. Stuur een aanvraag via WhatsApp met uw markt en beoogde volume, en voorwaarden worden rechtstreeks bevestigd.',
  },
};

/* ---------- Deutsch ---------- */
const de = {
  docLang: 'de',
  label: 'Deutsch',
  meta: {
    title: 'Tongkat-Ali-Getränk Großhandel & Vertrieb | UNI MAX',
    desc: 'Halal-zertifiziertes, trinkfertiges Tongkat-Ali-Vitalitätsgetränk, verkaufsfertig in Boxen mit 10 g × 30 Sachets. Empfohlene MOQ ab 12 Boxen. Hergestellt in Malaysia.',
    ogTitle: 'Tongkat-Ali-Getränk Großhandel & Vertrieb — UNI MAX',
    ogDesc: 'Halal-zertifiziertes, trinkfertiges Tongkat-Ali-Vitalitätsgetränk in verkaufsfertigen Boxen. Partnerschaftsstufen vom Einzelhändler bis zum regionalen Vertriebspartner. Hergestellt in Malaysia.',
  },

  all: {
    '>Benefits</a>': '>' + home.de['nav.benefits'] + '</a>',
    '>Formula</a>': '>' + home.de['nav.formula'] + '</a>',
    '>Certified</a>': '>' + home.de['nav.trust'] + '</a>',
    '>FAQ</a>': '>' + home.de['nav.faq'] + '</a>',
    '>Overview</a>': '>' + home.de['nav.overview'] + '</a>',
    '>Why UNI MAX</a>': '>' + home.de['nav.why'] + '</a>',
    '>Partnerships</a>': '>' + home.de['nav.partnerships'] + '</a>',
    '>About</a>': '>' + home.de['nav.about'] + '</a>',
    '>Contact</a>': '>' + home.de['nav.contact'] + '</a>',
    '<span>Become a Partner</span>': '<span>' + home.de['cta.order'] + '</span>',
    '<small>boxes</small>': '<small>Boxen</small>',
  },

  html: {
    'Back to UNI MAX': 'Zurück zu UNI MAX',
    '<span class="eyebrow">Wholesale &amp; Distribution</span>': '<span class="eyebrow">Großhandel &amp; Vertrieb</span>',
    'Stock a finished botanical vitality drink, not a raw ingredient.':
      'Führen Sie ein fertiges botanisches Vitalitätsgetränk, keinen Rohstoff.',
    'UNI MAX is supplied retail-ready — Triple Force Tongkat Ali in 10&nbsp;g sachets, 30 to a branded box. No repacking, no reformulation, no minimum tonnage. Made in Malaysia in HALAL, GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facilities.':
      'UNI MAX wird verkaufsfertig geliefert — Tongkat Ali mit dreifacher Kraft in 10&nbsp;g-Sachets, 30 Stück pro Markenbox. Kein Umpacken, keine Neuformulierung, keine Mindesttonnage. Hergestellt in Malaysia in Anlagen, die für HALAL, GMP, MeSTI, ISO&nbsp;9001 und HACCP zertifiziert sind.',
    'Same-day WhatsApp reply · Pricing on request': 'WhatsApp-Antwort am selben Tag · Preis auf Anfrage',
    '<span>boxes — suggested entry MOQ</span>': '<span>Boxen — empfohlene Einstiegs-MOQ</span>',
    '<span>sachets per box, 10 g each</span>': '<span>Sachets pro Box, je 10 g</span>',
    '<span>botanicals &amp; nutrients</span>': '<span>botanische Stoffe &amp; Nährstoffe</span>',
    '<span>facility certifications</span>': '<span>Anlagenzertifizierungen</span>',

    '<span class="eyebrow">Why partner on UNI MAX</span>': '<span class="eyebrow">Warum mit UNI MAX zusammenarbeiten</span>',
    'Shelf-ready from the first carton.': 'Verkaufsfertig ab dem ersten Karton.',

    'Finished product, not bulk extract': 'Fertigprodukt, kein Massenextrakt',
    'Most Tongkat Ali supply out of Malaysia is sold as extract powder by the kilogram, leaving you to formulate, pack and brand it. UNI MAX arrives as a finished consumer product in retail packaging — you can put it on shelf as it is.':
      'Die meisten Tongkat-Ali-Lieferungen aus Malaysia werden als Extraktpulver nach Kilogramm verkauft, sodass Sie selbst für Rezeptur, Verpackung und Markenbildung sorgen müssen. UNI MAX kommt als fertiges Verbraucherprodukt in Einzelhandelsverpackung an — Sie können es direkt ins Regal stellen.',

    'Entry quantities that suit a first order': 'Einstiegsmengen, die zu einer Erstbestellung passen',
    'Partnership starts at a suggested 12 boxes, so a single shop, gym or clinic can trial the product without committing to pallet volumes. Larger wholesale and regional distributor levels are available as demand builds.':
      'Die Partnerschaft beginnt bei empfohlenen 12 Boxen, sodass ein einzelnes Geschäft, Fitnessstudio oder eine Klinik das Produkt testen kann, ohne sich auf Palettenmengen festzulegen. Größere Großhandels- und regionale Vertriebsstufen stehen zur Verfügung, sobald die Nachfrage wächst.',

    'Certified manufacturing behind it': 'Zertifizierte Fertigung dahinter',
    'Produced in facilities holding HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP certification — the documentation set that halal-import buyers and retail chains typically ask for.':
      'Hergestellt in Anlagen mit HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 und HACCP-Zertifizierung — die Dokumentation, nach der Halal-Importkäufer und Einzelhandelsketten üblicherweise fragen.',

    'A defined consumer format': 'Ein klar definiertes Verbraucherformat',
    'A 10 g ready-to-drink lychee sachet — no shaker, no capsules, no measuring. The format that suits impulse retail, gym counters and e-commerce bundles alike.':
      'Ein trinkfertiges Lychee-Sachet mit 10 g — kein Shaker, keine Kapseln, kein Abmessen. Das Format, das sowohl für Impulskäufe, Fitnessstudio-Theken als auch E-Commerce-Bundles geeignet ist.',

    'Formulated around a recognisable hero': 'Aufgebaut um einen bekannten Hauptinhaltsstoff',
    'Triple Force Tongkat Ali (Yellow, Red and Black) with guarana, adaptogens and amino acids. Tongkat Ali carries strong existing recognition with buyers across ASEAN and halal markets.':
      'Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz) mit Guarana, Adaptogenen und Aminosäuren. Tongkat Ali genießt bereits starke Bekanntheit bei Käufern in ASEAN- und Halal-Märkten.',

    'Direct line, no portal': 'Direkte Verbindung, kein Portal',
    'Enquiries are handled directly over WhatsApp with a same-day reply, so quantities and terms get confirmed in one conversation rather than a ticket queue.':
      'Anfragen werden direkt über WhatsApp mit Antwort am selben Tag bearbeitet, sodass Mengen und Konditionen in einem Gespräch bestätigt werden statt in einer Ticket-Warteschlange.',

    '<span class="eyebrow">Suggested MOQ · actual confirmed on enquiry</span>':
      '<span class="eyebrow">Empfohlene MOQ · tatsächliche Menge bei Anfrage bestätigt</span>',
    'Choose your <span class="hl">partnership level</span>.': 'Wählen Sie Ihre <span class="hl">Partnerschaftsstufe</span>.',
    '<h3>Retail Stockist</h3>': '<h3>' + home.de['order.p1name'] + '</h3>',
    'Small wellness shops, gyms, clinics and supplement stores taking a first position on the product.':
      'Kleine Wellness-Geschäfte, Fitnessstudios, Kliniken und Nahrungsergänzungsmittelläden, die das Produkt erstmalig aufnehmen.',
    'Most popular': 'Am beliebtesten',
    '<h3>Wholesale Partner</h3>': '<h3>' + home.de['order.p2name'] + '</h3>',
    'E-commerce sellers, larger gyms and multi-branch retailers running the product across more than one channel or location.':
      'E-Commerce-Verkäufer, größere Fitnessstudios und Einzelhändler mit mehreren Filialen, die das Produkt über mehr als einen Kanal oder Standort führen.',
    '<h3>Regional Distributor</h3>': '<h3>' + home.de['order.p3name'] + '</h3>',
    'Country-level or regional partners building distribution across a territory.':
      'Landesweite oder regionale Partner, die den Vertrieb in einem Gebiet aufbauen.',

    '<span class="eyebrow">How it works</span>': '<span class="eyebrow">So funktioniert es</span>',
    'Three steps to a first order.': 'Drei Schritte zur ersten Bestellung.',
    'Send an enquiry': 'Anfrage senden',
    'Message us on WhatsApp with your market, your channel and the volume you have in mind. Same-day reply.':
      'Schreiben Sie uns auf WhatsApp mit Ihrem Markt, Ihrem Kanal und der Menge, die Sie im Sinn haben. Antwort am selben Tag.',
    'Confirm level and terms': 'Stufe und Konditionen bestätigen',
    'We match you to a partnership level, confirm the actual order quantity and quote pricing for it — the listed MOQs are starting points, not fixed rules.':
      'Wir ordnen Ihnen eine Partnerschaftsstufe zu, bestätigen die tatsächliche Bestellmenge und nennen dafür den Preis — die aufgeführten MOQs sind Ausgangspunkte, keine festen Regeln.',
    'Place the order': 'Bestellung aufgeben',
    'Order details, documentation and delivery arrangements are confirmed directly with you before anything is finalised.':
      'Bestelldetails, Dokumentation und Lieferregelungen werden direkt mit Ihnen bestätigt, bevor etwas endgültig festgelegt wird.',

    '<span class="eyebrow">Certified manufacturing</span>': '<span class="eyebrow">Zertifizierte Fertigung</span>',
    'Made in Malaysia, in certified facilities.': 'Hergestellt in Malaysia, in zertifizierten Anlagen.',
    'alt="HALAL JAKIM Certified"': 'alt="HALAL JAKIM zertifiziert"',
    'alt="GMP Good Manufacturing Practice"': 'alt="GMP Gute Herstellungspraxis"',
    'alt="MeSTI Kementerian Kesihatan Malaysia"': 'alt="MeSTI Gesundheitsministerium Malaysia"',
    'alt="ISO 9001:2015 Certified"': 'alt="ISO 9001:2015 zertifiziert"',
    'alt="HACCP Food Safety Certified"': 'alt="HACCP Lebensmittelsicherheit zertifiziert"',

    '<span class="eyebrow">Wholesale FAQ</span>': '<span class="eyebrow">Großhandel FAQ</span>',
    'Questions partners ask first.': 'Fragen, die Partner zuerst stellen.',

    '<summary>What is the minimum order quantity?</summary>': '<summary>Wie hoch ist die Mindestbestellmenge?</summary>',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Empfohlene Ausgangspunkte sind 12–24 Boxen für einen Einzelhändler, 50–100 Boxen für einen Großhandelspartner und 300+ Boxen für einen regionalen Vertriebspartner. Dies sind empfohlene MOQs — die tatsächliche Menge wird bei Anfrage bestätigt.',

    '<summary>Do you supply finished product or bulk ingredient?</summary>': '<summary>Liefern Sie Fertigprodukt oder Massenrohstoff?</summary>',
    'Finished, retail-ready product — 10 g sachets in branded boxes of 30. UNI MAX is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'Fertiges, verkaufsfertiges Produkt — 10-g-Sachets in Markenboxen zu je 30. UNI MAX wird nicht als Massenextrakt oder Rohstoff verkauft, sodass Partner es ohne zusätzliche Verpackung oder Neuformulierung ins Regal stellen können.',

    '<summary>What certifications does UNI MAX hold?</summary>': '<summary>Welche Zertifizierungen besitzt UNI MAX?</summary>',
    'UNI MAX is manufactured in facilities certified for HALAL (JAKIM), GMP (Good Manufacturing Practice), MeSTI (Kementerian Kesihatan Malaysia), ISO 9001:2015 and HACCP — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">see what a halal certification actually covers</a>.':
      'UNI MAX wird in Anlagen hergestellt, die für HALAL (JAKIM), GMP (Gute Herstellungspraxis), MeSTI (Gesundheitsministerium Malaysia), ISO 9001:2015 und HACCP zertifiziert sind — <a href="/guides/are-energy-drinks-halal/" style="color:var(--navy);font-weight:600">erfahren Sie, was eine Halal-Zertifizierung tatsächlich abdeckt</a> (englischsprachige Seite).',

    '<summary>Where is UNI MAX manufactured?</summary>': '<summary>Wo wird UNI MAX hergestellt?</summary>',
    '<p>In Malaysia, in certified manufacturing facilities.</p>': '<p>In Malaysia, in zertifizierten Produktionsanlagen.</p>',

    '<summary>What is in each box?</summary>': '<summary>Was ist in jeder Box enthalten?</summary>',
    '30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      '30 trinkfertige Sachets zu je 10 g. Die Rezeptur kombiniert Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz) mit über 12 botanischen Stoffen und Nährstoffen, darunter Guarana, Adaptogene und Aminosäuren, ohne zugesetzten Zucker.',

    '<summary>How do I get wholesale pricing?</summary>': '<summary>Wie erhalte ich Großhandelspreise?</summary>',
    '<summary>Do you deliver to Europe?</summary>': '<summary>Liefern Sie nach Europa?</summary>',
    'UNI MAX is produced and filled by Orient Biotech Sdn Bhd, a certified manufacturing facility in Malaysia — the certifications above are registered to this facility, so every box a partner stocks comes off a certified line. The brand and formula are owned by UniPro (Malaysia), international distribution is managed by Wellness Alliance Sdn Bhd, and European enquiries are handled by a dedicated partnership desk, Wellness Network GmbH.':
      'UNI MAX wird von Orient Biotech Sdn Bhd hergestellt und abgefüllt, einer zertifizierten Produktionsanlage in Malaysia — die oben genannten Zertifizierungen sind auf diese Anlage registriert, sodass jede Box, die ein Partner führt, von einer zertifizierten Linie stammt. Marke und Rezeptur gehören UniPro (Malaysia), der internationale Vertrieb wird von Wellness Alliance Sdn Bhd verwaltet, und europäische Anfragen werden von einer dedizierten Partnerschaftsstelle, Wellness Network GmbH, bearbeitet.',
    'Finished product, not powder':
      'Fertigprodukt, kein Pulver',
    'Not every Tongkat Ali supplier hands you a finished product.':
      'Nicht jeder Tongkat-Ali-Lieferant gibt Ihnen ein Fertigprodukt.',
    'Many Tongkat Ali suppliers in Malaysia sell raw extract powder. Buying powder means you still need to source a filling plant, design packaging, run stability tests and apply for your own certifications — months of work before the first box reaches a shelf.':
      'Viele Tongkat-Ali-Lieferanten in Malaysia verkaufen rohes Extraktpulver. Der Kauf von Pulver bedeutet, dass Sie noch eine Abfüllanlage finden, Verpackung gestalten, Stabilitätstests durchführen und eigene Zertifizierungen beantragen müssen — Monate an Arbeit, bevor die erste Box ein Regal erreicht.',
    'UNI MAX takes the opposite route for wholesale partners and distributors: a finished, shelf-ready botanical vitality drink — 30 sachets to a box, produced on a certified line, with brand, packaging and documentation already done. You order, you receive, you sell.':
      'UNI MAX geht für Großhandelspartner und Vertriebspartner den umgekehrten Weg: ein fertiges, verkaufsfertiges botanisches Vitalitätsgetränk — 30 Sachets pro Box, produziert auf einer zertifizierten Linie, mit Marke, Verpackung und Dokumentation bereits erledigt. Sie bestellen, Sie empfangen, Sie verkaufen.',
    'That is the difference between buying an ingredient and stocking a product — and it is why resellers, gyms, clinics and regional distributors partner with UNI MAX instead of building a brand from powder.':
      'Das ist der Unterschied zwischen dem Kauf eines Inhaltsstoffs und dem Führen eines Produkts — und deshalb arbeiten Wiederverkäufer, Fitnessstudios, Kliniken und regionale Vertriebspartner mit UNI MAX zusammen, anstatt eine Marke aus Pulver aufzubauen.',
    'Yes. European orders are fulfilled through a local distribution partner, and the sales contact for this site is Germany-based. See the <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">European Partnership Desk</a> for how EU distribution works, or send your country and intended volume via WhatsApp and logistics and terms will be confirmed for your market.':
      'Ja. Europäische Bestellungen werden über einen lokalen Vertriebspartner abgewickelt, und der Vertriebskontakt für diese Website ist in Deutschland ansässig. Sehen Sie sich die <a href="/for-distributors-europe/" style="color:var(--navy);font-weight:600">Europäische Partnerschaftsstelle</a> (englischsprachige Seite) an, um zu erfahren, wie der EU-Vertrieb funktioniert, oder senden Sie Ihr Land und die geplante Menge über WhatsApp, und Logistik und Konditionen werden für Ihren Markt bestätigt.',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry over WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Preise werden auf Anfrage genannt und hängen von Partnerschaftsstufe und Menge ab. Senden Sie eine Anfrage über WhatsApp mit Ihrem Markt und der geplanten Menge, und die Konditionen werden direkt bestätigt.',

    'Tell us your market and volume.': 'Teilen Sie uns Ihren Markt und Ihre Menge mit.',
    'Send an enquiry and we will confirm the right partnership level, the actual order quantity and pricing for it.':
      'Senden Sie eine Anfrage, und wir bestätigen die passende Partnerschaftsstufe, die tatsächliche Bestellmenge und den Preis dafür.',

    'Universe of Power, Maximum Impact. A botanical lychee vitality drink with Triple Force Tongkat Ali, by UniPro.':
      home.de['foot.about'],
    '<h3>Explore</h3>': '<h3>' + home.de['foot.explore'] + '</h3>',
    '<h3>Product</h3>': '<h3>' + home.de['foot.product'] + '</h3>',
    '<h3>Contact</h3>': '<h3>' + home.de['foot.contact'] + '</h3>',
    '<li>10g × 30 sachets</li>': '<li>' + home.de['foot.p1'] + '</li>',
    '<li>Ready-to-drink</li>': '<li>' + home.de['foot.p2'] + '</li>',
    '<li>Botanical lychee</li>': '<li>' + home.de['foot.p3'] + '</li>',
    '<li>HALAL certified</li>': '<li>' + home.de['foot.p4'] + '</li>',
    'This product is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease. Information on this site relates to general wellness and the structure-function of individual ingredients, and is not a substitute for professional medical advice. Consult a healthcare professional before use, especially if you are pregnant, nursing, taking medication, or managing a health condition. Keep out of reach of children. Not recommended for those under 18.':
      home.de['foot.disclaimer'],
    'UniPro · UNI MAX. All rights reserved.': 'UniPro · UNI MAX. Alle Rechte vorbehalten.',
    'Manufactured in Malaysia by Orient Biotech Sdn Bhd.': 'Hergestellt in Malaysia von Orient Biotech Sdn Bhd.',
  },

  jsonld: {
    '"name":"Home"': '"name":"Startseite"',
    '"name":"Wholesale & Distribution"': '"name":"Großhandel & Vertrieb"',
    '"name":"What is the minimum order quantity?"': '"name":"Wie hoch ist die Mindestbestellmenge?"',
    'Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner, and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.':
      'Empfohlene Ausgangspunkte sind 12–24 Boxen für einen Einzelhändler, 50–100 Boxen für einen Großhandelspartner und 300+ Boxen für einen regionalen Vertriebspartner. Dies sind empfohlene MOQs — die tatsächliche Menge wird bei Anfrage bestätigt.',
    '"name":"Do you supply finished product or bulk ingredient?"': '"name":"Liefern Sie Fertigprodukt oder Massenrohstoff?"',
    'UNI MAX is supplied as a finished, retail-ready product — 10 g sachets in branded boxes of 30. It is not sold as a bulk extract or raw ingredient, so partners can place it on shelf without additional packing or reformulation.':
      'UNI MAX wird als fertiges, verkaufsfertiges Produkt geliefert — 10-g-Sachets in Markenboxen zu je 30. Es wird nicht als Massenextrakt oder Rohstoff verkauft, sodass Partner es ohne zusätzliche Verpackung oder Neuformulierung ins Regal stellen können.',
    '"name":"What certifications does UNI MAX hold?"': '"name":"Welche Zertifizierungen besitzt UNI MAX?"',
    '"name":"Where is UNI MAX manufactured?"': '"name":"Wo wird UNI MAX hergestellt?"',
    'UNI MAX is made in Malaysia, in certified manufacturing facilities.':
      'UNI MAX wird in Malaysia in zertifizierten Produktionsanlagen hergestellt.',
    '"name":"What is in each box?"': '"name":"Was ist in jeder Box enthalten?"',
    'Each box contains 30 ready-to-drink sachets of 10 g. The formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ botanicals and nutrients, including guarana, adaptogens and amino acids, with no added sugar.':
      'Jede Box enthält 30 trinkfertige Sachets zu je 10 g. Die Rezeptur kombiniert Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz) mit über 12 botanischen Stoffen und Nährstoffen, darunter Guarana, Adaptogene und Aminosäuren, ohne zugesetzten Zucker.',
    '"name":"How do I get wholesale pricing?"': '"name":"Wie erhalte ich Großhandelspreise?"',
    '"name":"Do you deliver to Europe?"': '"name":"Liefern Sie nach Europa?"',
    'Pricing is quoted on request and depends on partnership level and quantity. Send an enquiry via WhatsApp with your market and intended volume, and terms will be confirmed directly.':
      'Preise werden auf Anfrage genannt und hängen von Partnerschaftsstufe und Menge ab. Senden Sie eine Anfrage über WhatsApp mit Ihrem Markt und der geplanten Menge, und die Konditionen werden direkt bestätigt.',
  },
};

module.exports = { zh, ms, pl, nl, de };
