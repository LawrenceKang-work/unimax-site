/* guides/plant-based-energy-drink/ 的五语译文(共享头尾见 _shared.js)。
 * key 必须与源页字节完全一致,由 gen-guide-pages.js 断言命中数。
 * 注:FAQ 问答由 buildFaqHtml/buildFaqJsonLd 整块重建,不在此 html 字典里重复(会 0 命中)。
 * 本篇 WhatsApp 链接带 (Sent from: ...) 归因标记,href 原样保留,只译周边文案/锚文本。
 */

const TABLE_EN = `      <table class="gd-table">
        <tr><th>Plant source</th><th>Commonly seen in</th><th>What it contributes</th></tr>
        <tr><td>Yerba mate</td><td>South American-sourced brands</td><td>Natural caffeine, antioxidants</td></tr>
        <tr><td>Guayusa</td><td>Amazonian-sourced brands</td><td>Natural caffeine</td></tr>
        <tr><td>Guarana</td><td>A wide range of brands, including UNI MAX</td><td>Natural caffeine, higher caffeine density per gram than coffee beans</td></tr>
        <tr><td>Ginseng, ashwagandha, cordyceps</td><td>Traditional Southeast &amp; East Asian formulas</td><td>Non-stimulant support — stamina, focus, resilience — no added caffeine</td></tr>
        <tr><td>Tongkat Ali</td><td>Southeast Asian traditional formulas, including UNI MAX</td><td>Non-stimulant vitality support</td></tr>
      </table>`;

const UL_COMPARE_EN = `      <ul>
        <li><strong>Full ingredient list vs proprietary blend</strong> — does the brand disclose every botanical and how much of each, or hide the formula behind a single "proprietary energy blend" line?</li>
        <li><strong>Single stimulant plant vs multiple botanicals</strong> — know which one you're buying, and whether the rest of the list is doing anything beyond flavour.</li>
        <li><strong>What actually sweetens it</strong> — cane sugar, a sugar alternative, honey, or nothing added at all.</li>
        <li><strong>Serving format</strong> — can, bottle, sachet or concentrate — which affects portability, shelf life and how the product is stocked.</li>
      </ul>`;

module.exports = {

zh: {
  meta: {
    title: '什么让一款能量饮料算是「植物基」？| UNI MAX',
    desc: '植物基可以指用一种植物替代咖啡因，也可以指一整套复合植物配方。这个标签实际告诉了你什么，以及 UNI MAX 处在什么位置。',
    ogTitle: '什么让一款能量饮料算是「植物基」？— UNI MAX',
    ogDesc: '单一提神植物，或是一整套复合植物配方——「植物基」两者都涵盖。成分表实际告诉了你什么，以及 UNI MAX 处在什么位置。',
  },
  breadcrumbName: '什么让一款能量饮料算是「植物基」？',
  articleHeadline: '什么让一款能量饮料算是「植物基」？',
  articleDescription: '单一提神植物，或是一整套复合植物配方——「植物基」两者都涵盖。成分表实际告诉了你什么，以及 UNI MAX 处在什么位置。',
  faq: [
    { q: '什么是植物基能量饮料？', a: '植物基能量饮料指的是每一种活性成分——包括咖啡因的来源——都来自植物，而不是在实验室里合成的。这个定义并没有规定要用多少种植物、用哪几种。实际上，一款只围绕单一提神植物打造的配方，和一款由十几种植物组成的配方，都可以被准确地称为植物基。' },
    { q: '植物基能量饮料健康吗？', a: '这取决于具体配方，而不是「植物基」这个标签本身——一款植物基能量饮料仍然可能含有添加糖、高剂量咖啡因，或者除了那种提神植物之外几乎没有别的活性成分。查看完整的成分表和每份用量，比单看「植物基」这个词能告诉你更多信息。这是一般性信息，不是医疗建议。' },
    { q: 'UNI MAX 是植物基的吗？', a: '是的。UNI MAX 配方中的每一种活性成分——三重东革阿里、瓜拉纳、人参、南非醉茄、冬虫夏草、黑接骨木莓与氨基酸——都来自植物，配方中不含任何合成咖啡因或合成兴奋剂。' },
    { q: 'UNI MAX 含有动物来源的成分吗？', a: '这款独立包用蜂蜜轻微增甜，而不是添加糖。蜂蜜是一种天然甜味剂，但它是动物来源的成分，不是植物——所以尽管 UNI MAX 的活性植物成分是植物基的，这款成品并没有以纯素（vegan）作为营销或标签宣称。' },
    { q: 'UNI MAX 含有合成咖啡因吗？', a: '不含。它的咖啡因来自瓜拉纳提取物，这是配方中 12 种以上植物与营养素成分之一，而不是来自合成来源。' },
    { q: '单一植物配方和复合植物配方的能量饮料有什么区别？', a: '单一植物配方用一种提神植物——比如巴拉圭冬青、瓜亚萨或瓜拉纳——替代合成咖啡因，配方里其余的成分通常很少。复合植物配方则把一种提神植物和几种非提神类植物结合在一起，比如适应原类植物或传统草本，让配方所起的作用不只是提供咖啡因这么简单。' },
    { q: 'UNI MAX 在哪里生产？', a: 'UNI MAX 在马来西亚生产，工厂持有 HALAL（JAKIM）、GMP、MeSTI、ISO 9001 与 HACCP 认证。' },
  ],
  html: {
    'Formula Guide': '配方指南',
    'What actually makes an energy drink "plant-based"?': '究竟是什么让一款能量饮料算是「植物基」？',
    'The label covers two very different products: one stimulant plant swapped in for synthetic caffeine, or a full blend of botanicals working together. Here\'s what "plant-based" actually specifies, what it doesn\'t, and where a multi-botanical formula like UNI MAX fits.':
      '这个标签涵盖两种截然不同的产品：一种是用一种提神植物替代合成咖啡因，另一种是一整套植物成分协同起效。这里讲清楚「植物基」这个标签实际规定了什么、没有规定什么，以及像 UNI MAX 这样的复合植物配方处在什么位置。',

    'The short answer': '简短的答案',
    'A <strong>plant-based energy drink</strong> is one where every active ingredient — including the source of caffeine — comes from a plant rather than being made synthetically in a lab. That definition says nothing about how many plants are used or which ones. In practice, most plant-based energy drinks on shelf today build their entire formula around a single stimulant plant, standing in for the synthetic caffeine a conventional energy drink uses. A smaller number combine several botanicals — one stimulant plant alongside non-stimulant herbs — into one formula. Both approaches are genuinely plant-based; they just deliver a different kind of ingredient list.':
      '<strong>植物基能量饮料</strong>指的是每一种活性成分——包括咖啡因的来源——都来自植物，而不是在实验室里合成的。这个定义并没有规定要用多少种植物、用哪几种。实际上，如今货架上大多数植物基能量饮料，是围绕单一一种提神植物打造整套配方的，用它替代传统能量饮料使用的合成咖啡因。较少一部分则把几种植物成分——一种提神植物搭配几种非提神类草本——组合进同一配方。两种做法都是货真价实的植物基，只是给出的成分表不一样。',

    [TABLE_EN]: `      <table class="gd-table">
        <tr><th>植物来源</th><th>常见于</th><th>提供什么作用</th></tr>
        <tr><td>巴拉圭冬青（马黛茶）</td><td>南美来源的品牌</td><td>天然咖啡因、抗氧化物</td></tr>
        <tr><td>瓜亚萨</td><td>亚马逊来源的品牌</td><td>天然咖啡因</td></tr>
        <tr><td>瓜拉纳</td><td>广泛见于各类品牌，包括 UNI MAX</td><td>天然咖啡因，每克咖啡因密度高于咖啡豆</td></tr>
        <tr><td>人参、南非醉茄、冬虫夏草</td><td>东南亚与东亚传统配方</td><td>非提神类支持——耐力、专注、韧性——不额外添加咖啡因</td></tr>
        <tr><td>东革阿里</td><td>东南亚传统配方，包括 UNI MAX</td><td>非提神类活力支持</td></tr>
      </table>`,
    'This table lists common plant sources, not a ranking — different formulas combine them differently, and this is a general guide, not a review of any specific competitor product.':
      '此表列出的是常见植物来源，不是排名——不同配方对它们的组合方式各不相同，这是一份通用指南，不是对任何特定竞品的评测。',

    'Sourcing a multi-botanical formula for your market? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Ask about UNI MAX wholesale terms on WhatsApp →</a>':
      '正在为你的市场寻找一款复合植物配方？<a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">在 WhatsApp 上咨询 UNI MAX 批发条款 →</a>',

    'Why "plant-based" doesn\'t mean one specific recipe': '为什么「植物基」不等于某一种固定配方',
    'Most plant-based energy drinks built for Western retail shelves swap one novel stimulant plant in for synthetic caffeine, then build the whole brand story around that single plant. That makes for a clean, simple ingredient list, but it also means the product is still fundamentally a single-stimulant drink — the same basic mechanism as a conventional energy drink, just sourced from a plant instead of a lab. A second, less common approach combines a stimulant plant with several non-stimulant botanicals — adaptogens such as ashwagandha or ginseng, or herbs such as Tongkat Ali — so the formula is supporting more than alertness alone. Neither approach is more "plant-based" than the other in a strict labelling sense. The real difference is how many plants are doing the work, and what each one is there for.':
      '大多数为西方零售货架打造的植物基能量饮料，用一种新颖的提神植物替代合成咖啡因，然后围绕这一种植物构建整个品牌故事。这样做出来的成分表干净简单，但也意味着这款产品本质上仍然是一款单一提神成分饮品——和传统能量饮料的基本机制一样，只是来源从实验室换成了植物。另一种较少见的做法，是把一种提神植物和几种非提神类植物成分组合在一起——比如南非醉茄或人参这类适应原植物，或者东革阿里这类草本——让配方所支持的不只是提神这一件事。严格按标签定义来说，这两种做法没有哪一种更「植物基」。真正的区别在于有多少种植物在起作用，以及每一种各自负责什么。',

    'A different tradition: multi-botanical herbal formulas': '另一种传统：复合植物草本配方',
    'Most of the plant-based brands built for the US and European market single out one stimulant plant and market around it. A different tradition — used across Southeast and East Asia for centuries before "plant-based" became a Western retail term — builds formulas from several botanicals at once: a stimulant source alongside adaptogens and herbs traditionally used for stamina and resilience. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps and ashwagandha are examples of botanicals from this tradition that appear together in some formulas, rather than any single one of them carrying the whole product alone.':
      '大多数为美国和欧洲市场打造的植物基品牌，挑出一种提神植物，围绕它做营销。而另一种传统——早在「植物基」成为西方零售业术语之前，就已经在东南亚与东亚地区沿用了几个世纪——是同时用几种植物成分构建配方：一种提神来源，搭配传统上用于耐力与韧性的适应原植物与草本。东革阿里（Eurycoma longifolia）、人参、冬虫夏草与南非醉茄，就是这种传统里会一起出现在某些配方中的植物成分实例，而不是靠其中任何一种单独撑起整个产品。',

    'Want the multi-botanical formula and certifications explained for your shelf? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Message UNI MAX on WhatsApp →</a>':
      '想为你的货架了解这套复合植物配方与认证详情？<a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">在 WhatsApp 上给 UNI MAX 留言 →</a>',

    'Where UNI MAX fits': 'UNI MAX 处在什么位置',
    'UNI MAX\'s formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ other botanicals and nutrients: guarana extract for natural caffeine, ginseng, ashwagandha, cordyceps and black elderberry, alongside amino acids (L-arginine, L-citrulline) and a multivitamin premix. Every active ingredient in that list is plant-derived — there is no synthetic caffeine or stimulant anywhere in the formula. The sachet is lightly sweetened with honey rather than added sugar; honey is a natural sweetener, but it\'s an animal-derived ingredient, not a plant, so while UNI MAX\'s active botanicals are plant-based, the finished sachet isn\'t marketed or labelled as vegan.':
      'UNI MAX 的配方把三重东革阿里（黄、红、黑）与 12 种以上其他植物和营养素成分结合在一起：提供天然咖啡因的瓜拉纳提取物、人参、南非醉茄、冬虫夏草与黑接骨木莓，再加上氨基酸（L-精氨酸、L-瓜氨酸）和一套复合维生素预混料。这份清单里的每一种活性成分都来自植物——配方中任何地方都不含合成咖啡因或合成兴奋剂。这款独立包用蜂蜜轻微增甜，而不是添加糖，蜂蜜是一种天然甜味剂，但它是动物来源的成分，不是植物，所以尽管 UNI MAX 的活性植物成分是植物基的，这款成品独立包并没有以纯素（vegan）作为营销或标签宣称。',

    "What to look for if you're comparing plant-based energy drinks": '如果你在比较不同的植物基能量饮料，该看什么',
    'Comparing plant-based energy drinks side by side comes down to a few concrete details, not the phrase printed on the front of the can or box.':
      '把几款植物基能量饮料放在一起比较，最终要看的是几个具体细节，而不是罐身或盒子正面印的那句标语。',
    [UL_COMPARE_EN]: `      <ul>
        <li><strong>完整成分表 vs 专有配方</strong>——品牌是否公开了每一种植物成分及其用量，还是把配方藏在一句「专有能量复合配方」的标签背后？</li>
        <li><strong>单一提神植物 vs 多种植物成分</strong>——弄清楚你买的到底是哪一种，以及清单里剩下的成分除了调味之外还起不起作用。</li>
        <li><strong>实际用什么增甜</strong>——蔗糖、代糖、蜂蜜，还是完全不额外添加。</li>
        <li><strong>饮用形态</strong>——罐装、瓶装、独立包还是浓缩液——这会影响便携性、保质期以及产品的备货方式。</li>
      </ul>`,

    "Why the plant-based framing matters for a distributor's shelf, not only the individual buyer": '为什么「植物基」这个定位不只对个人消费者重要，对分销商的货架同样重要',
    'Consumer interest in plant-based and botanical energy formats has been growing in recent years, as more people look for a version of "energy" built without synthetic stimulants. Most of the visible plant-based options on shelf today are single-plant swaps — one stimulant plant standing in for synthetic caffeine, with a short ingredient list around it. A multi-botanical formula is a genuinely different product within the same category, not a repackaging of the same idea, which gives a distributor a distinct story to tell a retail buyer rather than competing head-on against an already crowded single-plant shelf.':
      '近年来，消费者对植物基与草本能量饮品形态的兴趣一直在增长，越来越多人在寻找一种不依赖合成兴奋剂的「能量」。如今货架上大多数看得见的植物基选项，都是单一植物替代——用一种提神植物替代合成咖啡因，周围配一份简短的成分表。复合植物配方是同一品类里一款货真价实的不同产品，而不是同一个想法的重新包装，这能让分销商向零售买家讲出一个有区分度的故事，而不是正面硬碰一个已经拥挤的单一植物货架。',

    'Want the multi-botanical formula on your shelf?': '想把这套复合植物配方摆上你的货架？',
    'UNI MAX is supplied retail-ready — 30 × 10 g sachets per branded box — to stockists, wholesalers and regional distributors. Tell us your market and volume.':
      'UNI MAX 以零售就绪形态供货——每个品牌盒装 30 × 10 克独立包——供货给零售商、批发商与区域分销商。告诉我们你的市场和采购量。',

    'Formula FAQ': '配方常见问题',
    'Common questions about plant-based energy drinks.': '关于植物基能量饮料的常见问题。',

    '>Energy shot vs energy drink: what\'s the difference?</a>': '>能量 Shot vs 能量饮料：区别是什么？</a>',
    '>Are energy drinks halal or haram?</a>': '>能量饮料是清真（halal）还是禁忌（haram）？</a>',
    '>Tongkat Ali sachet drink, Malaysia: the format explained</a>': '>什么是东革阿里独立包饮品？</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX 批发与分销</a>',
  },
},

ms: {
  meta: {
    title: 'Apa yang Menjadikan Minuman Tenaga "Berasaskan Tumbuhan"? | UNI MAX',
    desc: 'Berasaskan tumbuhan boleh bermaksud satu tumbuhan perangsang menggantikan kafein, atau gabungan botani penuh. Apa yang label itu sebenarnya beritahu anda, dan di mana UNI MAX sesuai.',
    ogTitle: 'Apa yang Menjadikan Minuman Tenaga "Berasaskan Tumbuhan"? — UNI MAX',
    ogDesc: 'Satu tumbuhan perangsang, atau gabungan botani penuh — "berasaskan tumbuhan" merangkumi kedua-duanya. Apa yang senarai ramuan sebenarnya beritahu anda, dan di mana UNI MAX sesuai.',
  },
  breadcrumbName: 'Apa yang Menjadikan Minuman Tenaga "Berasaskan Tumbuhan"?',
  articleHeadline: 'Apa yang Menjadikan Minuman Tenaga "Berasaskan Tumbuhan"?',
  articleDescription: 'Satu tumbuhan perangsang, atau gabungan botani penuh — "berasaskan tumbuhan" merangkumi kedua-duanya. Apa yang senarai ramuan sebenarnya beritahu anda, dan di mana UNI MAX sesuai.',
  faq: [
    { q: 'Apakah minuman tenaga berasaskan tumbuhan?', a: 'Minuman tenaga berasaskan tumbuhan ialah satu di mana setiap ramuan aktif — termasuk sumber kafein — datang daripada tumbuhan berbanding dibuat secara sintetik di makmal. Definisi itu tidak menyatakan berapa banyak tumbuhan digunakan atau yang mana; formula yang dibina sekitar satu tumbuhan perangsang dan satu yang dibina daripada sedozen botani kedua-duanya boleh digambarkan dengan tepat sebagai berasaskan tumbuhan.' },
    { q: 'Adakah minuman tenaga berasaskan tumbuhan sihat?', a: 'Itu bergantung pada formula khusus, bukan label berasaskan tumbuhan itu sendiri — minuman tenaga berasaskan tumbuhan masih boleh membawa gula tambahan, dos kafein tinggi, atau sedikit ramuan aktif selain tumbuhan perangsang. Menyemak senarai ramuan penuh dan saiz sajian memberitahu anda lebih daripada frasa "berasaskan tumbuhan" sahaja. Ini adalah maklumat umum, bukan nasihat perubatan.' },
    { q: 'Adakah UNI MAX berasaskan tumbuhan?', a: 'Ya. Setiap ramuan aktif dalam formula UNI MAX — Tongkat Ali Tiga Kuasa, guarana, ginseng, ashwagandha, cordyceps, elderberry hitam dan asid amino — berasal daripada tumbuhan, tanpa kafein atau perangsang sintetik.' },
    { q: 'Adakah UNI MAX mengandungi sebarang ramuan berasal haiwan?', a: 'Sachet itu dimaniskan sedikit dengan madu berbanding gula tambahan. Madu adalah pemanis semula jadi, tetapi ia adalah ramuan berasal haiwan, bukan tumbuhan — jadi walaupun botani aktif UNI MAX berasaskan tumbuhan, produk siap tidak dipasarkan sebagai vegan.' },
    { q: 'Adakah UNI MAX mengandungi kafein sintetik?', a: 'Tidak. Kafeinnya datang daripada ekstrak guarana, salah satu daripada 12+ botani dan nutrien dalam formula, bukan daripada sumber sintetik.' },
    { q: 'Apakah perbezaan antara minuman tenaga satu-tumbuhan dan pelbagai-botani?', a: 'Formula satu-tumbuhan menggantikan satu tumbuhan perangsang — yerba mate, guayusa atau guarana, contohnya — di tempat kafein sintetik, dan selebihnya senarai ramuan biasanya pendek. Formula pelbagai-botani menggabungkan tumbuhan perangsang dengan beberapa botani bukan perangsang, seperti adaptogen atau herba tradisional, jadi formula itu melakukan lebih daripada sekadar membekalkan kafein sahaja.' },
    { q: 'Di mana UNI MAX dikilangkan?', a: 'UNI MAX dibuat di Malaysia, di kemudahan bertauliah HALAL (JAKIM), GMP, MeSTI, ISO 9001 dan HACCP.' },
  ],
  html: {
    'Formula Guide': 'Panduan Formula',
    'What actually makes an energy drink "plant-based"?': 'Apa yang sebenarnya menjadikan minuman tenaga "berasaskan tumbuhan"?',
    'The label covers two very different products: one stimulant plant swapped in for synthetic caffeine, or a full blend of botanicals working together. Here\'s what "plant-based" actually specifies, what it doesn\'t, and where a multi-botanical formula like UNI MAX fits.':
      'Label itu merangkumi dua produk yang sangat berbeza: satu tumbuhan perangsang menggantikan kafein sintetik, atau gabungan penuh botani yang berfungsi bersama. Inilah apa yang "berasaskan tumbuhan" sebenarnya nyatakan, apa yang tidak, dan di mana formula pelbagai-botani seperti UNI MAX sesuai.',

    'The short answer': 'Jawapan ringkas',
    'A <strong>plant-based energy drink</strong> is one where every active ingredient — including the source of caffeine — comes from a plant rather than being made synthetically in a lab. That definition says nothing about how many plants are used or which ones. In practice, most plant-based energy drinks on shelf today build their entire formula around a single stimulant plant, standing in for the synthetic caffeine a conventional energy drink uses. A smaller number combine several botanicals — one stimulant plant alongside non-stimulant herbs — into one formula. Both approaches are genuinely plant-based; they just deliver a different kind of ingredient list.':
      '<strong>Minuman tenaga berasaskan tumbuhan</strong> ialah satu di mana setiap ramuan aktif — termasuk sumber kafein — datang daripada tumbuhan berbanding dibuat secara sintetik di makmal. Definisi itu tidak menyatakan berapa banyak tumbuhan digunakan atau yang mana. Pada praktiknya, kebanyakan minuman tenaga berasaskan tumbuhan di rak hari ini membina seluruh formula mereka sekitar satu tumbuhan perangsang, menggantikan kafein sintetik yang digunakan minuman tenaga konvensional. Sebilangan kecil menggabungkan beberapa botani — satu tumbuhan perangsang bersama herba bukan perangsang — menjadi satu formula. Kedua-dua pendekatan benar-benar berasaskan tumbuhan; ia hanya memberikan jenis senarai ramuan yang berbeza.',

    [TABLE_EN]: `      <table class="gd-table">
        <tr><th>Sumber tumbuhan</th><th>Biasa dilihat dalam</th><th>Apa yang disumbangkan</th></tr>
        <tr><td>Yerba mate</td><td>Jenama bersumber Amerika Selatan</td><td>Kafein semula jadi, antioksidan</td></tr>
        <tr><td>Guayusa</td><td>Jenama bersumber Amazon</td><td>Kafein semula jadi</td></tr>
        <tr><td>Guarana</td><td>Pelbagai jenama, termasuk UNI MAX</td><td>Kafein semula jadi, kepadatan kafein lebih tinggi per gram berbanding biji kopi</td></tr>
        <tr><td>Ginseng, ashwagandha, cordyceps</td><td>Formula tradisional Asia Tenggara &amp; Timur</td><td>Sokongan bukan perangsang — stamina, fokus, daya tahan — tiada kafein tambahan</td></tr>
        <tr><td>Tongkat Ali</td><td>Formula tradisional Asia Tenggara, termasuk UNI MAX</td><td>Sokongan vitaliti bukan perangsang</td></tr>
      </table>`,
    'This table lists common plant sources, not a ranking — different formulas combine them differently, and this is a general guide, not a review of any specific competitor product.':
      'Jadual ini menyenaraikan sumber tumbuhan biasa, bukan kedudukan — formula berbeza menggabungkannya secara berbeza, dan ini adalah panduan am, bukan ulasan mana-mana produk pesaing tertentu.',

    'Sourcing a multi-botanical formula for your market? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Ask about UNI MAX wholesale terms on WhatsApp →</a>':
      'Sedang mendapatkan formula pelbagai-botani untuk pasaran anda? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Tanya tentang terma pemborongan UNI MAX di WhatsApp →</a>',

    'Why "plant-based" doesn\'t mean one specific recipe': 'Mengapa "berasaskan tumbuhan" tidak bermaksud satu resipi khusus',
    'Most plant-based energy drinks built for Western retail shelves swap one novel stimulant plant in for synthetic caffeine, then build the whole brand story around that single plant. That makes for a clean, simple ingredient list, but it also means the product is still fundamentally a single-stimulant drink — the same basic mechanism as a conventional energy drink, just sourced from a plant instead of a lab. A second, less common approach combines a stimulant plant with several non-stimulant botanicals — adaptogens such as ashwagandha or ginseng, or herbs such as Tongkat Ali — so the formula is supporting more than alertness alone. Neither approach is more "plant-based" than the other in a strict labelling sense. The real difference is how many plants are doing the work, and what each one is there for.':
      'Kebanyakan minuman tenaga berasaskan tumbuhan yang dibina untuk rak runcit Barat menggantikan satu tumbuhan perangsang baharu untuk kafein sintetik, kemudian membina seluruh cerita jenama sekitar tumbuhan tunggal itu. Itu menghasilkan senarai ramuan yang bersih dan ringkas, tetapi ia juga bermakna produk itu masih pada asasnya minuman satu-perangsang — mekanisme asas yang sama seperti minuman tenaga konvensional, hanya bersumber daripada tumbuhan berbanding makmal. Pendekatan kedua, kurang biasa, menggabungkan tumbuhan perangsang dengan beberapa botani bukan perangsang — adaptogen seperti ashwagandha atau ginseng, atau herba seperti Tongkat Ali — jadi formula itu menyokong lebih daripada kewaspadaan sahaja. Tiada satu pendekatan lebih "berasaskan tumbuhan" daripada yang lain dari segi pelabelan yang ketat. Perbezaan sebenar ialah berapa banyak tumbuhan yang melakukan kerja, dan untuk apa setiap satu itu ada.',

    'A different tradition: multi-botanical herbal formulas': 'Tradisi yang berbeza: formula herba pelbagai-botani',
    'Most of the plant-based brands built for the US and European market single out one stimulant plant and market around it. A different tradition — used across Southeast and East Asia for centuries before "plant-based" became a Western retail term — builds formulas from several botanicals at once: a stimulant source alongside adaptogens and herbs traditionally used for stamina and resilience. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps and ashwagandha are examples of botanicals from this tradition that appear together in some formulas, rather than any single one of them carrying the whole product alone.':
      'Kebanyakan jenama berasaskan tumbuhan yang dibina untuk pasaran AS dan Eropah memilih satu tumbuhan perangsang dan memasarkannya sekitarnya. Tradisi yang berbeza — digunakan di seluruh Asia Tenggara dan Timur selama berabad sebelum "berasaskan tumbuhan" menjadi istilah runcit Barat — membina formula daripada beberapa botani sekaligus: sumber perangsang bersama adaptogen dan herba yang secara tradisi digunakan untuk stamina dan daya tahan. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps dan ashwagandha adalah contoh botani daripada tradisi ini yang muncul bersama dalam sesetengah formula, berbanding mana-mana satu daripadanya membawa keseluruhan produk sendirian.',

    'Want the multi-botanical formula and certifications explained for your shelf? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Message UNI MAX on WhatsApp →</a>':
      'Mahu formula pelbagai-botani dan pensijilan diterangkan untuk rak anda? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Mesej UNI MAX di WhatsApp →</a>',

    'Where UNI MAX fits': 'Di mana UNI MAX sesuai',
    'UNI MAX\'s formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ other botanicals and nutrients: guarana extract for natural caffeine, ginseng, ashwagandha, cordyceps and black elderberry, alongside amino acids (L-arginine, L-citrulline) and a multivitamin premix. Every active ingredient in that list is plant-derived — there is no synthetic caffeine or stimulant anywhere in the formula. The sachet is lightly sweetened with honey rather than added sugar; honey is a natural sweetener, but it\'s an animal-derived ingredient, not a plant, so while UNI MAX\'s active botanicals are plant-based, the finished sachet isn\'t marketed or labelled as vegan.':
      'Formula UNI MAX menggabungkan Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam) dengan 12+ botani dan nutrien lain: ekstrak guarana untuk kafein semula jadi, ginseng, ashwagandha, cordyceps dan elderberry hitam, bersama asid amino (L-arginin, L-sitrulin) dan pra-campuran multivitamin. Setiap ramuan aktif dalam senarai itu berasal daripada tumbuhan — tiada kafein atau perangsang sintetik di mana-mana dalam formula. Sachet itu dimaniskan sedikit dengan madu berbanding gula tambahan; madu adalah pemanis semula jadi, tetapi ia adalah ramuan berasal haiwan, bukan tumbuhan, jadi walaupun botani aktif UNI MAX berasaskan tumbuhan, sachet siap tidak dipasarkan atau dilabel sebagai vegan.',

    "What to look for if you're comparing plant-based energy drinks": 'Apa yang perlu dicari jika anda membandingkan minuman tenaga berasaskan tumbuhan',
    'Comparing plant-based energy drinks side by side comes down to a few concrete details, not the phrase printed on the front of the can or box.':
      'Membandingkan minuman tenaga berasaskan tumbuhan bersebelahan bergantung pada beberapa perincian konkrit, bukan frasa yang dicetak di hadapan tin atau kotak.',
    [UL_COMPARE_EN]: `      <ul>
        <li><strong>Senarai ramuan penuh vs campuran proprietari</strong> — adakah jenama mendedahkan setiap botani dan berapa banyak setiap satu, atau menyembunyikan formula di sebalik satu baris "campuran tenaga proprietari"?</li>
        <li><strong>Satu tumbuhan perangsang vs pelbagai botani</strong> — ketahui yang mana anda beli, dan sama ada selebihnya senarai melakukan apa-apa selain perisa.</li>
        <li><strong>Apa yang sebenarnya memaniskannya</strong> — gula tebu, alternatif gula, madu, atau tiada apa-apa yang ditambah.</li>
        <li><strong>Format sajian</strong> — tin, botol, sachet atau pekat — yang mempengaruhi kemudahalihan, jangka hayat rak dan cara produk distok.</li>
      </ul>`,

    "Why the plant-based framing matters for a distributor's shelf, not only the individual buyer": 'Mengapa penonjolan berasaskan tumbuhan penting untuk rak pengedar, bukan hanya pembeli individu',
    'Consumer interest in plant-based and botanical energy formats has been growing in recent years, as more people look for a version of "energy" built without synthetic stimulants. Most of the visible plant-based options on shelf today are single-plant swaps — one stimulant plant standing in for synthetic caffeine, with a short ingredient list around it. A multi-botanical formula is a genuinely different product within the same category, not a repackaging of the same idea, which gives a distributor a distinct story to tell a retail buyer rather than competing head-on against an already crowded single-plant shelf.':
      'Minat pengguna dalam format tenaga berasaskan tumbuhan dan botani telah berkembang dalam tahun-tahun kebelakangan ini, apabila lebih ramai orang mencari versi "tenaga" yang dibina tanpa perangsang sintetik. Kebanyakan pilihan berasaskan tumbuhan yang kelihatan di rak hari ini adalah pertukaran satu-tumbuhan — satu tumbuhan perangsang menggantikan kafein sintetik, dengan senarai ramuan pendek sekelilingnya. Formula pelbagai-botani adalah produk yang benar-benar berbeza dalam kategori yang sama, bukan pembungkusan semula idea yang sama, yang memberi pengedar cerita berbeza untuk diceritakan kepada pembeli runcit berbanding bersaing terus-menerus dengan rak satu-tumbuhan yang sudah sesak.',

    'Want the multi-botanical formula on your shelf?': 'Mahu formula pelbagai-botani di rak anda?',
    'UNI MAX is supplied retail-ready — 30 × 10 g sachets per branded box — to stockists, wholesalers and regional distributors. Tell us your market and volume.':
      'UNI MAX dibekalkan sedia-runcit — 30 × 10 g sachet setiap kotak berjenama — kepada penstok, pemborong dan pengedar serantau. Beritahu kami pasaran dan jumlah anda.',

    'Formula FAQ': 'Soalan Lazim Formula',
    'Common questions about plant-based energy drinks.': 'Soalan biasa tentang minuman tenaga berasaskan tumbuhan.',

    '>Energy shot vs energy drink: what\'s the difference?</a>': '>Energy shot vs minuman tenaga: apa bezanya?</a>',
    '>Are energy drinks halal or haram?</a>': '>Adakah minuman tenaga halal atau haram?</a>',
    '>Tongkat Ali sachet drink, Malaysia: the format explained</a>': '>Apa itu minuman sachet Tongkat Ali?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Pemborongan &amp; pengedaran UNI MAX</a>',
  },
},

pl: {
  meta: {
    title: 'Co Sprawia, że Napój Energetyczny Jest "Roślinny"? | UNI MAX',
    desc: 'Roślinny może oznaczać jedną roślinę pobudzającą zamiast kofeiny, albo pełną mieszankę botaniczną. Co ta etykieta faktycznie mówi i gdzie pasuje UNI MAX.',
    ogTitle: 'Co Sprawia, że Napój Energetyczny Jest "Roślinny"? — UNI MAX',
    ogDesc: 'Jedna roślina pobudzająca, albo pełna mieszanka botaniczna — "roślinny" obejmuje oba przypadki. Co lista składników faktycznie mówi i gdzie pasuje UNI MAX.',
  },
  breadcrumbName: 'Co Sprawia, że Napój Energetyczny Jest "Roślinny"?',
  articleHeadline: 'Co Sprawia, że Napój Energetyczny Jest "Roślinny"?',
  articleDescription: 'Jedna roślina pobudzająca, albo pełna mieszanka botaniczna — "roślinny" obejmuje oba przypadki. Co lista składników faktycznie mówi i gdzie pasuje UNI MAX.',
  faq: [
    { q: 'Czym jest roślinny napój energetyczny?', a: 'Roślinny napój energetyczny to taki, w którym każdy aktywny składnik — w tym źródło kofeiny — pochodzi z rośliny, a nie jest wytwarzany syntetycznie w laboratorium. Ta definicja nie określa, ile roślin się wykorzystuje ani których; recepturę zbudowaną wokół jednej rośliny pobudzającej i taką zbudowaną z kilkunastu składników botanicznych można równie trafnie nazwać roślinną.' },
    { q: 'Czy roślinne napoje energetyczne są zdrowe?', a: 'To zależy od konkretnej receptury, nie od samej etykiety "roślinny" — roślinny napój energetyczny może nadal zawierać dodany cukier, wysoką dawkę kofeiny lub niewiele aktywnych składników poza rośliną pobudzającą. Sprawdzenie pełnej listy składników i wielkości porcji mówi więcej niż samo określenie "roślinny". To ogólna informacja, nie porada medyczna.' },
    { q: 'Czy UNI MAX jest roślinny?', a: 'Tak. Każdy aktywny składnik w recepturze UNI MAX — Tongkat Ali Potrójnej Mocy, guarana, żeń-szeń, ashwagandha, cordyceps, czarny bez i aminokwasy — pochodzi z roślin, bez syntetycznej kofeiny czy stymulantów.' },
    { q: 'Czy UNI MAX zawiera jakiekolwiek składniki pochodzenia zwierzęcego?', a: 'Saszetka jest lekko słodzona miodem zamiast dodanego cukru. Miód jest naturalnym słodzikiem, ale jest składnikiem pochodzenia zwierzęcego, nie rośliną — więc choć aktywne składniki botaniczne UNI MAX są roślinne, gotowy produkt nie jest promowany jako wegański.' },
    { q: 'Czy UNI MAX zawiera syntetyczną kofeinę?', a: 'Nie. Jej kofeina pochodzi z ekstraktu guarany, jednego z ponad 12 składników botanicznych i odżywczych w recepturze, a nie ze źródła syntetycznego.' },
    { q: 'Jaka jest różnica między napojem energetycznym z jedną rośliną a wieloskładnikowym?', a: 'Receptura jednoroślinna zastępuje jedną roślinę pobudzającą — na przykład yerba mate, guayusę lub guaranę — w miejsce syntetycznej kofeiny, a reszta listy składników jest zwykle krótka. Receptura wieloskładnikowa łączy roślinę pobudzającą z kilkoma niepobudzającymi składnikami botanicznymi, takimi jak adaptogeny lub tradycyjne zioła, więc receptura robi więcej niż tylko dostarcza kofeinę.' },
    { q: 'Gdzie produkowany jest UNI MAX?', a: 'UNI MAX jest wytwarzany w Malezji, w zakładach certyfikowanych HALAL (JAKIM), GMP, MeSTI, ISO 9001 i HACCP.' },
  ],
  html: {
    'Formula Guide': 'Przewodnik po recepturze',
    'What actually makes an energy drink "plant-based"?': 'Co właściwie sprawia, że napój energetyczny jest "roślinny"?',
    'The label covers two very different products: one stimulant plant swapped in for synthetic caffeine, or a full blend of botanicals working together. Here\'s what "plant-based" actually specifies, what it doesn\'t, and where a multi-botanical formula like UNI MAX fits.':
      'Ta etykieta obejmuje dwa bardzo różne produkty: jedną roślinę pobudzającą zastępującą syntetyczną kofeinę, albo pełną mieszankę składników botanicznych działających razem. Oto co "roślinny" faktycznie określa, czego nie określa, i gdzie pasuje receptura wieloskładnikowa taka jak UNI MAX.',

    'The short answer': 'Krótka odpowiedź',
    'A <strong>plant-based energy drink</strong> is one where every active ingredient — including the source of caffeine — comes from a plant rather than being made synthetically in a lab. That definition says nothing about how many plants are used or which ones. In practice, most plant-based energy drinks on shelf today build their entire formula around a single stimulant plant, standing in for the synthetic caffeine a conventional energy drink uses. A smaller number combine several botanicals — one stimulant plant alongside non-stimulant herbs — into one formula. Both approaches are genuinely plant-based; they just deliver a different kind of ingredient list.':
      '<strong>Roślinny napój energetyczny</strong> to taki, w którym każdy aktywny składnik — w tym źródło kofeiny — pochodzi z rośliny, a nie jest wytwarzany syntetycznie w laboratorium. Ta definicja nie określa, ile roślin się wykorzystuje ani których. W praktyce większość roślinnych napojów energetycznych dostępnych dziś na półkach buduje całą recepturę wokół jednej rośliny pobudzającej, zastępującej syntetyczną kofeinę stosowaną w konwencjonalnych napojach energetycznych. Mniejsza liczba łączy kilka składników botanicznych — jedną roślinę pobudzającą wraz z niepobudzającymi ziołami — w jedną recepturę. Oba podejścia są prawdziwie roślinne, po prostu dają inny rodzaj listy składników.',

    [TABLE_EN]: `      <table class="gd-table">
        <tr><th>Źródło roślinne</th><th>Powszechnie spotykane w</th><th>Co wnosi</th></tr>
        <tr><td>Yerba mate</td><td>Marki pochodzące z Ameryki Południowej</td><td>Naturalna kofeina, antyoksydanty</td></tr>
        <tr><td>Guayusa</td><td>Marki pochodzące z Amazonii</td><td>Naturalna kofeina</td></tr>
        <tr><td>Guarana</td><td>Szeroki zakres marek, w tym UNI MAX</td><td>Naturalna kofeina, wyższa gęstość kofeiny na gram niż ziarna kawy</td></tr>
        <tr><td>Żeń-szeń, ashwagandha, cordyceps</td><td>Tradycyjne receptury Azji Południowo-Wschodniej i Wschodniej</td><td>Wsparcie niepobudzające — wytrzymałość, koncentracja, odporność — bez dodanej kofeiny</td></tr>
        <tr><td>Tongkat Ali</td><td>Tradycyjne receptury Azji Południowo-Wschodniej, w tym UNI MAX</td><td>Niepobudzające wsparcie witalności</td></tr>
      </table>`,
    'This table lists common plant sources, not a ranking — different formulas combine them differently, and this is a general guide, not a review of any specific competitor product.':
      'Ta tabela wymienia powszechne źródła roślinne, nie ranking — różne receptury łączą je na różne sposoby, a to jest przewodnik ogólny, nie recenzja jakiegokolwiek konkretnego produktu konkurencji.',

    'Sourcing a multi-botanical formula for your market? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Ask about UNI MAX wholesale terms on WhatsApp →</a>':
      'Szukasz receptury wieloskładnikowej dla swojego rynku? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Zapytaj o warunki hurtowe UNI MAX na WhatsApp →</a>',

    'Why "plant-based" doesn\'t mean one specific recipe': 'Dlaczego "roślinny" nie oznacza jednej konkretnej receptury',
    'Most plant-based energy drinks built for Western retail shelves swap one novel stimulant plant in for synthetic caffeine, then build the whole brand story around that single plant. That makes for a clean, simple ingredient list, but it also means the product is still fundamentally a single-stimulant drink — the same basic mechanism as a conventional energy drink, just sourced from a plant instead of a lab. A second, less common approach combines a stimulant plant with several non-stimulant botanicals — adaptogens such as ashwagandha or ginseng, or herbs such as Tongkat Ali — so the formula is supporting more than alertness alone. Neither approach is more "plant-based" than the other in a strict labelling sense. The real difference is how many plants are doing the work, and what each one is there for.':
      'Większość roślinnych napojów energetycznych tworzonych na zachodnie półki detaliczne zastępuje jedną nowatorską roślinę pobudzającą syntetyczną kofeiną, a następnie buduje całą historię marki wokół tej jednej rośliny. Daje to czystą, prostą listę składników, ale oznacza też, że produkt jest wciąż zasadniczo napojem jednoskładnikowym pod względem pobudzenia — ten sam podstawowy mechanizm co konwencjonalny napój energetyczny, tylko pochodzący z rośliny zamiast z laboratorium. Drugie, mniej powszechne podejście łączy roślinę pobudzającą z kilkoma niepobudzającymi składnikami botanicznymi — adaptogenami takimi jak ashwagandha czy żeń-szeń, lub ziołami takimi jak Tongkat Ali — więc receptura wspiera więcej niż samą czujność. Żadne z podejść nie jest bardziej "roślinne" od drugiego w ścisłym sensie etykietowania. Prawdziwa różnica polega na tym, ile roślin wykonuje pracę i po co jest tam każda z nich.',

    'A different tradition: multi-botanical herbal formulas': 'Inna tradycja: wieloskładnikowe receptury ziołowe',
    'Most of the plant-based brands built for the US and European market single out one stimulant plant and market around it. A different tradition — used across Southeast and East Asia for centuries before "plant-based" became a Western retail term — builds formulas from several botanicals at once: a stimulant source alongside adaptogens and herbs traditionally used for stamina and resilience. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps and ashwagandha are examples of botanicals from this tradition that appear together in some formulas, rather than any single one of them carrying the whole product alone.':
      'Większość roślinnych marek tworzonych na rynek amerykański i europejski wyróżnia jedną roślinę pobudzającą i buduje wokół niej marketing. Inna tradycja — stosowana w Azji Południowo-Wschodniej i Wschodniej przez wieki, zanim "roślinny" stał się zachodnim terminem detalicznym — buduje receptury z kilku składników botanicznych naraz: źródła pobudzającego wraz z adaptogenami i ziołami tradycyjnie stosowanymi dla wytrzymałości i odporności. Tongkat Ali (Eurycoma longifolia), żeń-szeń, cordyceps i ashwagandha to przykłady składników botanicznych z tej tradycji, które pojawiają się razem w niektórych recepturach, zamiast by którykolwiek z nich sam niósł cały produkt.',

    'Want the multi-botanical formula and certifications explained for your shelf? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Message UNI MAX on WhatsApp →</a>':
      'Chcesz, aby receptura wieloskładnikowa i certyfikaty zostały wyjaśnione dla twojej półki? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Napisz do UNI MAX na WhatsApp →</a>',

    'Where UNI MAX fits': 'Gdzie pasuje UNI MAX',
    'UNI MAX\'s formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ other botanicals and nutrients: guarana extract for natural caffeine, ginseng, ashwagandha, cordyceps and black elderberry, alongside amino acids (L-arginine, L-citrulline) and a multivitamin premix. Every active ingredient in that list is plant-derived — there is no synthetic caffeine or stimulant anywhere in the formula. The sachet is lightly sweetened with honey rather than added sugar; honey is a natural sweetener, but it\'s an animal-derived ingredient, not a plant, so while UNI MAX\'s active botanicals are plant-based, the finished sachet isn\'t marketed or labelled as vegan.':
      'Receptura UNI MAX łączy Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny) z ponad 12 innymi składnikami botanicznymi i odżywczymi: ekstraktem z guarany na naturalną kofeinę, żeń-szeniem, ashwagandhą, cordyceps i czarnym bzem, wraz z aminokwasami (L-argininą, L-cytruliną) i premiksem multiwitaminowym. Każdy aktywny składnik na tej liście pochodzi z roślin — nigdzie w recepturze nie ma syntetycznej kofeiny ani stymulantu. Saszetka jest lekko słodzona miodem zamiast dodanego cukru; miód jest naturalnym słodzikiem, ale jest składnikiem pochodzenia zwierzęcego, nie rośliną, więc choć aktywne składniki botaniczne UNI MAX są roślinne, gotowa saszetka nie jest promowana ani etykietowana jako wegańska.',

    "What to look for if you're comparing plant-based energy drinks": 'Na co zwrócić uwagę, porównując roślinne napoje energetyczne',
    'Comparing plant-based energy drinks side by side comes down to a few concrete details, not the phrase printed on the front of the can or box.':
      'Porównywanie roślinnych napojów energetycznych obok siebie sprowadza się do kilku konkretnych szczegółów, a nie frazy wydrukowanej z przodu puszki lub pudełka.',
    [UL_COMPARE_EN]: `      <ul>
        <li><strong>Pełna lista składników vs mieszanka zastrzeżona</strong> — czy marka ujawnia każdy składnik botaniczny i jego ilość, czy ukrywa recepturę za jedną linią "zastrzeżonej mieszanki energetycznej"?</li>
        <li><strong>Jedna roślina pobudzająca vs wiele składników botanicznych</strong> — wiedz, którą kupujesz, i czy reszta listy robi coś poza smakiem.</li>
        <li><strong>Czym faktycznie jest słodzony</strong> — cukrem trzcinowym, alternatywą cukru, miodem, czy niczym dodanym.</li>
        <li><strong>Format porcji</strong> — puszka, butelka, saszetka lub koncentrat — co wpływa na przenośność, trwałość i sposób magazynowania produktu.</li>
      </ul>`,

    "Why the plant-based framing matters for a distributor's shelf, not only the individual buyer": 'Dlaczego pozycjonowanie "roślinny" ma znaczenie dla półki dystrybutora, nie tylko indywidualnego kupującego',
    'Consumer interest in plant-based and botanical energy formats has been growing in recent years, as more people look for a version of "energy" built without synthetic stimulants. Most of the visible plant-based options on shelf today are single-plant swaps — one stimulant plant standing in for synthetic caffeine, with a short ingredient list around it. A multi-botanical formula is a genuinely different product within the same category, not a repackaging of the same idea, which gives a distributor a distinct story to tell a retail buyer rather than competing head-on against an already crowded single-plant shelf.':
      'Zainteresowanie konsumentów roślinnymi i botanicznymi formatami energetycznymi rośnie w ostatnich latach, gdy coraz więcej osób szuka wersji "energii" zbudowanej bez syntetycznych stymulantów. Większość widocznych dziś na półce opcji roślinnych to zamienniki jednoroślinne — jedna roślina pobudzająca zastępująca syntetyczną kofeinę, z krótką listą składników wokół niej. Receptura wieloskładnikowa to prawdziwie inny produkt w tej samej kategorii, a nie przepakowanie tego samego pomysłu, co daje dystrybutorowi odrębną historię do opowiedzenia kupującemu detalicznemu, zamiast rywalizować bezpośrednio z już zatłoczoną półką jednoroślinną.',

    'Want the multi-botanical formula on your shelf?': 'Chcesz recepturę wieloskładnikową na swojej półce?',
    'UNI MAX is supplied retail-ready — 30 × 10 g sachets per branded box — to stockists, wholesalers and regional distributors. Tell us your market and volume.':
      'UNI MAX jest dostarczany gotowy do sprzedaży detalicznej — 30 × 10 g saszetek na markowe pudełko — dla punktów sprzedaży, hurtowników i dystrybutorów regionalnych. Podaj nam swój rynek i wolumen.',

    'Formula FAQ': 'FAQ dotyczące receptury',
    'Common questions about plant-based energy drinks.': 'Częste pytania o roślinne napoje energetyczne.',

    '>Energy shot vs energy drink: what\'s the difference?</a>': '>Energy shot a napój energetyczny: jaka jest różnica?</a>',
    '>Are energy drinks halal or haram?</a>': '>Czy napoje energetyczne są halal czy haram?</a>',
    '>Tongkat Ali sachet drink, Malaysia: the format explained</a>': '>Czym jest napój Tongkat Ali w saszetce?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Hurt i dystrybucja UNI MAX</a>',
  },
},

nl: {
  meta: {
    title: 'Wat Maakt een Energiedrank "Plantaardig"? | UNI MAX',
    desc: 'Plantaardig kan één stimulerende plant betekenen die cafeïne vervangt, of een volledige botanische mix. Wat het label u werkelijk vertelt, en waar UNI MAX past.',
    ogTitle: 'Wat Maakt een Energiedrank "Plantaardig"? — UNI MAX',
    ogDesc: 'Eén stimulerende plant, of een volledige botanische mix — "plantaardig" omvat beide. Wat de ingrediëntenlijst werkelijk vertelt, en waar UNI MAX past.',
  },
  breadcrumbName: 'Wat Maakt een Energiedrank "Plantaardig"?',
  articleHeadline: 'Wat Maakt een Energiedrank "Plantaardig"?',
  articleDescription: 'Eén stimulerende plant, of een volledige botanische mix — "plantaardig" omvat beide. Wat de ingrediëntenlijst werkelijk vertelt, en waar UNI MAX past.',
  faq: [
    { q: 'Wat is een plantaardige energiedrank?', a: 'Een plantaardige energiedrank is er een waarbij elk actief ingrediënt — inclusief de bron van cafeïne — afkomstig is van een plant in plaats van synthetisch in een laboratorium te worden gemaakt. Die definitie zegt niets over hoeveel planten worden gebruikt of welke; een formule opgebouwd rond één stimulerende plant en een opgebouwd uit een dozijn botanische stoffen kunnen beide nauwkeurig als plantaardig worden omschreven.' },
    { q: 'Zijn plantaardige energiedranken gezond?', a: 'Dat hangt af van de specifieke formule, niet van het plantaardige label op zich — een plantaardige energiedrank kan nog steeds toegevoegde suiker, een hoge cafeïnedosis, of weinig actieve ingrediënten naast de stimulerende plant bevatten. Het controleren van de volledige ingrediëntenlijst en portiegrootte vertelt u meer dan de uitdrukking "plantaardig" op zich. Dit is algemene informatie, geen medisch advies.' },
    { q: 'Is UNI MAX plantaardig?', a: 'Ja. Elk actief ingrediënt in de formule van UNI MAX — Tongkat Ali met Drievoudige Kracht, guarana, ginseng, ashwagandha, cordyceps, zwarte vlierbes en de aminozuren — is plantaardig, zonder synthetische cafeïne of stimulerende middelen.' },
    { q: 'Bevat UNI MAX dierlijke ingrediënten?', a: 'Het sachet is licht gezoet met honing in plaats van toegevoegde suiker. Honing is een natuurlijke zoetstof, maar het is een dierlijk ingrediënt, geen plant — dus hoewel de actieve botanische stoffen van UNI MAX plantaardig zijn, wordt het eindproduct niet als veganistisch op de markt gebracht.' },
    { q: 'Bevat UNI MAX synthetische cafeïne?', a: 'Nee. De cafeïne komt uit guarana-extract, een van de 12+ botanische stoffen en voedingsstoffen in de formule, niet uit een synthetische bron.' },
    { q: 'Wat is het verschil tussen een energiedrank met één plant en een met meerdere botanische stoffen?', a: 'Een formule met één plant vervangt één stimulerende plant — bijvoorbeeld yerba mate, guayusa of guarana — door synthetische cafeïne, en de rest van de ingrediëntenlijst is meestal kort. Een formule met meerdere botanische stoffen combineert een stimulerende plant met verschillende niet-stimulerende botanische stoffen, zoals adaptogenen of traditionele kruiden, zodat de formule meer doet dan alleen cafeïne leveren.' },
    { q: 'Waar wordt UNI MAX geproduceerd?', a: 'UNI MAX wordt gemaakt in Maleisië, in faciliteiten gecertificeerd voor HALAL (JAKIM), GMP, MeSTI, ISO 9001 en HACCP.' },
  ],
  html: {
    'Formula Guide': 'Formulegids',
    'What actually makes an energy drink "plant-based"?': 'Wat maakt een energiedrank eigenlijk "plantaardig"?',
    'The label covers two very different products: one stimulant plant swapped in for synthetic caffeine, or a full blend of botanicals working together. Here\'s what "plant-based" actually specifies, what it doesn\'t, and where a multi-botanical formula like UNI MAX fits.':
      'Het label omvat twee heel verschillende producten: één stimulerende plant die synthetische cafeïne vervangt, of een volledige mix van botanische stoffen die samenwerken. Dit is wat "plantaardig" daadwerkelijk specificeert, wat niet, en waar een formule met meerdere botanische stoffen zoals UNI MAX past.',

    'The short answer': 'Het korte antwoord',
    'A <strong>plant-based energy drink</strong> is one where every active ingredient — including the source of caffeine — comes from a plant rather than being made synthetically in a lab. That definition says nothing about how many plants are used or which ones. In practice, most plant-based energy drinks on shelf today build their entire formula around a single stimulant plant, standing in for the synthetic caffeine a conventional energy drink uses. A smaller number combine several botanicals — one stimulant plant alongside non-stimulant herbs — into one formula. Both approaches are genuinely plant-based; they just deliver a different kind of ingredient list.':
      'Een <strong>plantaardige energiedrank</strong> is er een waarbij elk actief ingrediënt — inclusief de bron van cafeïne — afkomstig is van een plant in plaats van synthetisch in een laboratorium te worden gemaakt. Die definitie zegt niets over hoeveel planten worden gebruikt of welke. In de praktijk bouwen de meeste plantaardige energiedranken die vandaag op de schappen staan hun hele formule rond één stimulerende plant, ter vervanging van de synthetische cafeïne die een conventionele energiedrank gebruikt. Een kleiner aantal combineert verschillende botanische stoffen — één stimulerende plant naast niet-stimulerende kruiden — in één formule. Beide benaderingen zijn oprecht plantaardig, ze leveren gewoon een ander soort ingrediëntenlijst.',

    [TABLE_EN]: `      <table class="gd-table">
        <tr><th>Plantbron</th><th>Vaak gezien in</th><th>Wat het bijdraagt</th></tr>
        <tr><td>Yerba mate</td><td>Merken uit Zuid-Amerika</td><td>Natuurlijke cafeïne, antioxidanten</td></tr>
        <tr><td>Guayusa</td><td>Merken uit het Amazonegebied</td><td>Natuurlijke cafeïne</td></tr>
        <tr><td>Guarana</td><td>Een breed scala aan merken, waaronder UNI MAX</td><td>Natuurlijke cafeïne, hogere cafeïnedichtheid per gram dan koffiebonen</td></tr>
        <tr><td>Ginseng, ashwagandha, cordyceps</td><td>Traditionele Zuidoost- en Oost-Aziatische formules</td><td>Niet-stimulerende ondersteuning — uithoudingsvermogen, focus, veerkracht — geen toegevoegde cafeïne</td></tr>
        <tr><td>Tongkat Ali</td><td>Traditionele Zuidoost-Aziatische formules, waaronder UNI MAX</td><td>Niet-stimulerende vitaliteitsondersteuning</td></tr>
      </table>`,
    'This table lists common plant sources, not a ranking — different formulas combine them differently, and this is a general guide, not a review of any specific competitor product.':
      'Deze tabel vermeldt veelvoorkomende plantbronnen, geen ranglijst — verschillende formules combineren ze op verschillende manieren, en dit is een algemene gids, geen recensie van een specifiek concurrerend product.',

    'Sourcing a multi-botanical formula for your market? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Ask about UNI MAX wholesale terms on WhatsApp →</a>':
      'Zoekt u een formule met meerdere botanische stoffen voor uw markt? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Vraag naar de groothandelsvoorwaarden van UNI MAX op WhatsApp →</a>',

    'Why "plant-based" doesn\'t mean one specific recipe': 'Waarom "plantaardig" niet één specifiek recept betekent',
    'Most plant-based energy drinks built for Western retail shelves swap one novel stimulant plant in for synthetic caffeine, then build the whole brand story around that single plant. That makes for a clean, simple ingredient list, but it also means the product is still fundamentally a single-stimulant drink — the same basic mechanism as a conventional energy drink, just sourced from a plant instead of a lab. A second, less common approach combines a stimulant plant with several non-stimulant botanicals — adaptogens such as ashwagandha or ginseng, or herbs such as Tongkat Ali — so the formula is supporting more than alertness alone. Neither approach is more "plant-based" than the other in a strict labelling sense. The real difference is how many plants are doing the work, and what each one is there for.':
      'De meeste plantaardige energiedranken die voor westerse winkelschappen zijn gemaakt, vervangen één nieuwe stimulerende plant door synthetische cafeïne en bouwen dan het hele merkverhaal rond die ene plant. Dat levert een schone, eenvoudige ingrediëntenlijst op, maar het betekent ook dat het product in wezen nog steeds een drank met één stimulerend middel is — hetzelfde basismechanisme als een conventionele energiedrank, alleen afkomstig van een plant in plaats van een laboratorium. Een tweede, minder gebruikelijke benadering combineert een stimulerende plant met verschillende niet-stimulerende botanische stoffen — adaptogenen zoals ashwagandha of ginseng, of kruiden zoals Tongkat Ali — zodat de formule meer ondersteunt dan alleen alertheid. Geen van beide benaderingen is meer "plantaardig" dan de andere in strikte labelzin. Het echte verschil is hoeveel planten het werk doen, en waarvoor elke daar is.',

    'A different tradition: multi-botanical herbal formulas': 'Een andere traditie: kruidenformules met meerdere botanische stoffen',
    'Most of the plant-based brands built for the US and European market single out one stimulant plant and market around it. A different tradition — used across Southeast and East Asia for centuries before "plant-based" became a Western retail term — builds formulas from several botanicals at once: a stimulant source alongside adaptogens and herbs traditionally used for stamina and resilience. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps and ashwagandha are examples of botanicals from this tradition that appear together in some formulas, rather than any single one of them carrying the whole product alone.':
      'De meeste plantaardige merken die voor de Amerikaanse en Europese markt zijn gemaakt, lichten één stimulerende plant uit en vermarkten daaromheen. Een andere traditie — eeuwenlang gebruikt in Zuidoost- en Oost-Azië voordat "plantaardig" een westerse retailterm werd — bouwt formules op uit verschillende botanische stoffen tegelijk: een stimulerende bron naast adaptogenen en kruiden die traditioneel worden gebruikt voor uithoudingsvermogen en veerkracht. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps en ashwagandha zijn voorbeelden van botanische stoffen uit deze traditie die samen voorkomen in sommige formules, in plaats van dat een van hen alleen het hele product draagt.',

    'Want the multi-botanical formula and certifications explained for your shelf? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Message UNI MAX on WhatsApp →</a>':
      'Wilt u de formule met meerdere botanische stoffen en certificeringen uitgelegd krijgen voor uw schap? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Stuur UNI MAX een bericht op WhatsApp →</a>',

    'Where UNI MAX fits': 'Waar UNI MAX past',
    'UNI MAX\'s formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ other botanicals and nutrients: guarana extract for natural caffeine, ginseng, ashwagandha, cordyceps and black elderberry, alongside amino acids (L-arginine, L-citrulline) and a multivitamin premix. Every active ingredient in that list is plant-derived — there is no synthetic caffeine or stimulant anywhere in the formula. The sachet is lightly sweetened with honey rather than added sugar; honey is a natural sweetener, but it\'s an animal-derived ingredient, not a plant, so while UNI MAX\'s active botanicals are plant-based, the finished sachet isn\'t marketed or labelled as vegan.':
      'De formule van UNI MAX combineert Tongkat Ali met Drievoudige Kracht (geel, rood en zwart) met 12+ andere botanische stoffen en voedingsstoffen: guarana-extract voor natuurlijke cafeïne, ginseng, ashwagandha, cordyceps en zwarte vlierbes, samen met aminozuren (L-arginine, L-citrulline) en een multivitaminepremix. Elk actief ingrediënt in die lijst is plantaardig — er zit nergens synthetische cafeïne of een stimulerend middel in de formule. Het sachet is licht gezoet met honing in plaats van toegevoegde suiker; honing is een natuurlijke zoetstof, maar het is een dierlijk ingrediënt, geen plant, dus hoewel de actieve botanische stoffen van UNI MAX plantaardig zijn, wordt het kant-en-klare sachet niet als veganistisch op de markt gebracht of gelabeld.',

    "What to look for if you're comparing plant-based energy drinks": 'Waar u op moet letten als u plantaardige energiedranken vergelijkt',
    'Comparing plant-based energy drinks side by side comes down to a few concrete details, not the phrase printed on the front of the can or box.':
      'Het naast elkaar vergelijken van plantaardige energiedranken komt neer op een paar concrete details, niet de zin die vooraan op het blikje of de doos staat gedrukt.',
    [UL_COMPARE_EN]: `      <ul>
        <li><strong>Volledige ingrediëntenlijst vs eigen mix</strong> — maakt het merk elke botanische stof en de hoeveelheid ervan bekend, of verbergt het de formule achter één regel "eigen energiemix"?</li>
        <li><strong>Eén stimulerende plant vs meerdere botanische stoffen</strong> — weet welke u koopt, en of de rest van de lijst iets doet naast smaak.</li>
        <li><strong>Waarmee het daadwerkelijk gezoet wordt</strong> — rietsuiker, een suikeralternatief, honing, of helemaal niets toegevoegd.</li>
        <li><strong>Portieformaat</strong> — blikje, fles, sachet of concentraat — wat de draagbaarheid, houdbaarheid en de manier waarop het product wordt voorraad gehouden beïnvloedt.</li>
      </ul>`,

    "Why the plant-based framing matters for a distributor's shelf, not only the individual buyer": 'Waarom de plantaardige framing belangrijk is voor het schap van een distributeur, niet alleen de individuele koper',
    'Consumer interest in plant-based and botanical energy formats has been growing in recent years, as more people look for a version of "energy" built without synthetic stimulants. Most of the visible plant-based options on shelf today are single-plant swaps — one stimulant plant standing in for synthetic caffeine, with a short ingredient list around it. A multi-botanical formula is a genuinely different product within the same category, not a repackaging of the same idea, which gives a distributor a distinct story to tell a retail buyer rather than competing head-on against an already crowded single-plant shelf.':
      'De belangstelling van consumenten voor plantaardige en botanische energieformaten groeit de laatste jaren, nu meer mensen op zoek zijn naar een versie van "energie" die zonder synthetische stimulerende middelen wordt gebouwd. De meeste zichtbare plantaardige opties op het schap van vandaag zijn vervangingen met één plant — één stimulerende plant die synthetische cafeïne vervangt, met een korte ingrediëntenlijst eromheen. Een formule met meerdere botanische stoffen is een oprecht ander product binnen dezelfde categorie, geen herverpakking van hetzelfde idee, wat een distributeur een onderscheidend verhaal geeft om aan een retailkoper te vertellen in plaats van rechtstreeks te concurreren met een al overvol schap met één plant.',

    'Want the multi-botanical formula on your shelf?': 'Wilt u de formule met meerdere botanische stoffen op uw schap?',
    'UNI MAX is supplied retail-ready — 30 × 10 g sachets per branded box — to stockists, wholesalers and regional distributors. Tell us your market and volume.':
      'UNI MAX wordt verkoopklaar geleverd — 30 × 10 g sachets per merkdoos — aan wederverkopers, groothandels en regionale distributeurs. Vertel ons uw markt en volume.',

    'Formula FAQ': 'Veelgestelde vragen over de formule',
    'Common questions about plant-based energy drinks.': 'Veelvoorkomende vragen over plantaardige energiedranken.',

    '>Energy shot vs energy drink: what\'s the difference?</a>': '>Energy shot vs energiedrank: wat is het verschil?</a>',
    '>Are energy drinks halal or haram?</a>': '>Zijn energiedranken halal of haram?</a>',
    '>Tongkat Ali sachet drink, Malaysia: the format explained</a>': '>Wat is een Tongkat Ali sachetdrank?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX groothandel &amp; distributie</a>',
  },
},

de: {
  meta: {
    title: 'Was Macht ein Energy-Drink "Pflanzenbasiert"? | UNI MAX',
    desc: 'Pflanzenbasiert kann eine einzelne stimulierende Pflanze anstelle von Koffein bedeuten, oder eine vollständige botanische Mischung. Was das Etikett tatsächlich aussagt, und wo UNI MAX passt.',
    ogTitle: 'Was Macht ein Energy-Drink "Pflanzenbasiert"? — UNI MAX',
    ogDesc: 'Eine einzelne stimulierende Pflanze, oder eine vollständige botanische Mischung — "pflanzenbasiert" umfasst beides. Was die Zutatenliste tatsächlich aussagt, und wo UNI MAX passt.',
  },
  breadcrumbName: 'Was Macht ein Energy-Drink "Pflanzenbasiert"?',
  articleHeadline: 'Was Macht ein Energy-Drink "Pflanzenbasiert"?',
  articleDescription: 'Eine einzelne stimulierende Pflanze, oder eine vollständige botanische Mischung — "pflanzenbasiert" umfasst beides. Was die Zutatenliste tatsächlich aussagt, und wo UNI MAX passt.',
  faq: [
    { q: 'Was ist ein pflanzenbasierter Energy-Drink?', a: 'Ein pflanzenbasierter Energy-Drink ist einer, bei dem jeder Wirkstoff — einschließlich der Koffeinquelle — von einer Pflanze stammt, anstatt synthetisch im Labor hergestellt zu werden. Diese Definition sagt nichts darüber aus, wie viele Pflanzen verwendet werden oder welche; eine Rezeptur, die um eine einzelne stimulierende Pflanze herum aufgebaut ist, und eine, die aus einem Dutzend botanischer Stoffe besteht, können beide zutreffend als pflanzenbasiert bezeichnet werden.' },
    { q: 'Sind pflanzenbasierte Energy-Drinks gesund?', a: 'Das hängt von der jeweiligen Rezeptur ab, nicht vom Etikett "pflanzenbasiert" allein — ein pflanzenbasierter Energy-Drink kann dennoch zugesetzten Zucker, eine hohe Koffeindosis oder wenige Wirkstoffe außer der stimulierenden Pflanze enthalten. Die vollständige Zutatenliste und Portionsgröße zu prüfen, sagt Ihnen mehr als der Ausdruck "pflanzenbasiert" allein. Dies ist allgemeine Information, keine medizinische Beratung.' },
    { q: 'Ist UNI MAX pflanzenbasiert?', a: 'Ja. Jeder Wirkstoff in der Rezeptur von UNI MAX — Tongkat Ali mit dreifacher Kraft, Guarana, Ginseng, Ashwagandha, Cordyceps, schwarzer Holunderbeere und die Aminosäuren — stammt aus Pflanzen, ohne synthetisches Koffein oder Stimulanzien.' },
    { q: 'Enthält UNI MAX tierische Zutaten?', a: 'Das Sachet ist leicht mit Honig statt zugesetztem Zucker gesüßt. Honig ist ein natürlicher Süßstoff, aber er ist eine tierische Zutat, keine Pflanze — daher werden zwar UNI MAX\'s aktive Pflanzenstoffe pflanzenbasiert vermarktet, das fertige Produkt jedoch nicht als vegan beworben.' },
    { q: 'Enthält UNI MAX synthetisches Koffein?', a: 'Nein. Sein Koffein stammt aus Guarana-Extrakt, einem der über 12 botanischen Stoffe und Nährstoffe in der Rezeptur, nicht aus einer synthetischen Quelle.' },
    { q: 'Was ist der Unterschied zwischen einem Einzelpflanzen- und einem Mehrfachpflanzen-Energy-Drink?', a: 'Eine Einzelpflanzen-Rezeptur ersetzt eine stimulierende Pflanze — zum Beispiel Yerba Mate, Guayusa oder Guarana — anstelle von synthetischem Koffein, und der Rest der Zutatenliste ist meist kurz. Eine Mehrfachpflanzen-Rezeptur kombiniert eine stimulierende Pflanze mit mehreren nicht-stimulierenden botanischen Stoffen, wie Adaptogenen oder traditionellen Kräutern, sodass die Rezeptur mehr leistet als nur Koffein zu liefern.' },
    { q: 'Wo wird UNI MAX hergestellt?', a: 'UNI MAX wird in Malaysia hergestellt, in Anlagen, die für HALAL (JAKIM), GMP, MeSTI, ISO 9001 und HACCP zertifiziert sind.' },
  ],
  html: {
    'Formula Guide': 'Rezepturleitfaden',
    'What actually makes an energy drink "plant-based"?': 'Was macht einen Energy-Drink eigentlich "pflanzenbasiert"?',
    'The label covers two very different products: one stimulant plant swapped in for synthetic caffeine, or a full blend of botanicals working together. Here\'s what "plant-based" actually specifies, what it doesn\'t, and where a multi-botanical formula like UNI MAX fits.':
      'Das Etikett umfasst zwei sehr unterschiedliche Produkte: eine stimulierende Pflanze anstelle von synthetischem Koffein, oder eine vollständige Mischung botanischer Stoffe, die zusammenwirken. Hier erfahren Sie, was "pflanzenbasiert" tatsächlich festlegt, was nicht, und wo eine Mehrfachpflanzen-Rezeptur wie UNI MAX passt.',

    'The short answer': 'Die kurze Antwort',
    'A <strong>plant-based energy drink</strong> is one where every active ingredient — including the source of caffeine — comes from a plant rather than being made synthetically in a lab. That definition says nothing about how many plants are used or which ones. In practice, most plant-based energy drinks on shelf today build their entire formula around a single stimulant plant, standing in for the synthetic caffeine a conventional energy drink uses. A smaller number combine several botanicals — one stimulant plant alongside non-stimulant herbs — into one formula. Both approaches are genuinely plant-based; they just deliver a different kind of ingredient list.':
      'Ein <strong>pflanzenbasierter Energy-Drink</strong> ist einer, bei dem jeder Wirkstoff — einschließlich der Koffeinquelle — von einer Pflanze stammt, anstatt synthetisch im Labor hergestellt zu werden. Diese Definition sagt nichts darüber aus, wie viele Pflanzen verwendet werden oder welche. In der Praxis bauen die meisten pflanzenbasierten Energy-Drinks, die heute im Regal stehen, ihre gesamte Rezeptur um eine einzelne stimulierende Pflanze herum auf, die das synthetische Koffein eines herkömmlichen Energy-Drinks ersetzt. Eine kleinere Anzahl kombiniert mehrere botanische Stoffe — eine stimulierende Pflanze zusammen mit nicht-stimulierenden Kräutern — zu einer Rezeptur. Beide Ansätze sind wirklich pflanzenbasiert, sie liefern nur eine andere Art von Zutatenliste.',

    [TABLE_EN]: `      <table class="gd-table">
        <tr><th>Pflanzenquelle</th><th>Häufig zu finden in</th><th>Was sie beiträgt</th></tr>
        <tr><td>Yerba Mate</td><td>Marken aus Südamerika</td><td>Natürliches Koffein, Antioxidantien</td></tr>
        <tr><td>Guayusa</td><td>Marken aus dem Amazonasgebiet</td><td>Natürliches Koffein</td></tr>
        <tr><td>Guarana</td><td>Eine breite Palette von Marken, einschließlich UNI MAX</td><td>Natürliches Koffein, höhere Koffeindichte pro Gramm als Kaffeebohnen</td></tr>
        <tr><td>Ginseng, Ashwagandha, Cordyceps</td><td>Traditionelle südost- und ostasiatische Rezepturen</td><td>Nicht-stimulierende Unterstützung — Ausdauer, Fokus, Widerstandskraft — kein zugesetztes Koffein</td></tr>
        <tr><td>Tongkat Ali</td><td>Traditionelle südostasiatische Rezepturen, einschließlich UNI MAX</td><td>Nicht-stimulierende Vitalitätsunterstützung</td></tr>
      </table>`,
    'This table lists common plant sources, not a ranking — different formulas combine them differently, and this is a general guide, not a review of any specific competitor product.':
      'Diese Tabelle listet gängige Pflanzenquellen auf, keine Rangfolge — verschiedene Rezepturen kombinieren sie unterschiedlich, und dies ist ein allgemeiner Leitfaden, keine Bewertung eines bestimmten Konkurrenzprodukts.',

    'Sourcing a multi-botanical formula for your market? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Ask about UNI MAX wholesale terms on WhatsApp →</a>':
      'Suchen Sie eine Mehrfachpflanzen-Rezeptur für Ihren Markt? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Early%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Fragen Sie nach den Großhandelskonditionen von UNI MAX auf WhatsApp →</a>',

    'Why "plant-based" doesn\'t mean one specific recipe': 'Warum "pflanzenbasiert" nicht ein bestimmtes Rezept bedeutet',
    'Most plant-based energy drinks built for Western retail shelves swap one novel stimulant plant in for synthetic caffeine, then build the whole brand story around that single plant. That makes for a clean, simple ingredient list, but it also means the product is still fundamentally a single-stimulant drink — the same basic mechanism as a conventional energy drink, just sourced from a plant instead of a lab. A second, less common approach combines a stimulant plant with several non-stimulant botanicals — adaptogens such as ashwagandha or ginseng, or herbs such as Tongkat Ali — so the formula is supporting more than alertness alone. Neither approach is more "plant-based" than the other in a strict labelling sense. The real difference is how many plants are doing the work, and what each one is there for.':
      'Die meisten pflanzenbasierten Energy-Drinks für westliche Einzelhandelsregale ersetzen eine neuartige stimulierende Pflanze durch synthetisches Koffein und bauen dann die gesamte Markengeschichte um diese eine Pflanze herum auf. Das ergibt eine übersichtliche, einfache Zutatenliste, bedeutet aber auch, dass das Produkt im Grunde immer noch ein Getränk mit einem einzigen Stimulans ist — der gleiche grundlegende Mechanismus wie bei einem herkömmlichen Energy-Drink, nur aus einer Pflanze statt aus einem Labor bezogen. Ein zweiter, weniger verbreiteter Ansatz kombiniert eine stimulierende Pflanze mit mehreren nicht-stimulierenden botanischen Stoffen — Adaptogenen wie Ashwagandha oder Ginseng, oder Kräutern wie Tongkat Ali —, sodass die Rezeptur mehr unterstützt als nur Wachheit. Keiner der Ansätze ist im strengen Etikettierungssinn "pflanzenbasierter" als der andere. Der eigentliche Unterschied liegt darin, wie viele Pflanzen die Arbeit leisten und wofür jede einzelne da ist.',

    'A different tradition: multi-botanical herbal formulas': 'Eine andere Tradition: Kräuterrezepturen mit mehreren botanischen Stoffen',
    'Most of the plant-based brands built for the US and European market single out one stimulant plant and market around it. A different tradition — used across Southeast and East Asia for centuries before "plant-based" became a Western retail term — builds formulas from several botanicals at once: a stimulant source alongside adaptogens and herbs traditionally used for stamina and resilience. Tongkat Ali (Eurycoma longifolia), ginseng, cordyceps and ashwagandha are examples of botanicals from this tradition that appear together in some formulas, rather than any single one of them carrying the whole product alone.':
      'Die meisten pflanzenbasierten Marken für den US-amerikanischen und europäischen Markt heben eine stimulierende Pflanze hervor und vermarkten sie entsprechend. Eine andere Tradition — jahrhundertelang in Südost- und Ostasien verwendet, bevor "pflanzenbasiert" zu einem westlichen Einzelhandelsbegriff wurde — baut Rezepturen aus mehreren botanischen Stoffen gleichzeitig auf: eine stimulierende Quelle zusammen mit Adaptogenen und Kräutern, die traditionell für Ausdauer und Widerstandskraft verwendet werden. Tongkat Ali (Eurycoma longifolia), Ginseng, Cordyceps und Ashwagandha sind Beispiele für botanische Stoffe aus dieser Tradition, die in manchen Rezepturen gemeinsam auftreten, anstatt dass einer von ihnen allein das ganze Produkt trägt.',

    'Want the multi-botanical formula and certifications explained for your shelf? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Message UNI MAX on WhatsApp →</a>':
      'Möchten Sie die Mehrfachpflanzen-Rezeptur und Zertifizierungen für Ihr Regal erklärt bekommen? <a href="https://wa.me/491736986625?text=Hi%20UNI%20MAX%2C%20I%27d%20like%20to%20enquire%20about%20wholesale%20terms.%20(Sent%20from%3A%20Post-conclusion%20CTA)" target="_blank" rel="noopener" style="color:var(--navy);font-weight:700;text-decoration:none">Schreiben Sie UNI MAX auf WhatsApp →</a>',

    'Where UNI MAX fits': 'Wo UNI MAX passt',
    'UNI MAX\'s formula combines Triple Force Tongkat Ali (Yellow, Red and Black) with 12+ other botanicals and nutrients: guarana extract for natural caffeine, ginseng, ashwagandha, cordyceps and black elderberry, alongside amino acids (L-arginine, L-citrulline) and a multivitamin premix. Every active ingredient in that list is plant-derived — there is no synthetic caffeine or stimulant anywhere in the formula. The sachet is lightly sweetened with honey rather than added sugar; honey is a natural sweetener, but it\'s an animal-derived ingredient, not a plant, so while UNI MAX\'s active botanicals are plant-based, the finished sachet isn\'t marketed or labelled as vegan.':
      'Die Rezeptur von UNI MAX kombiniert Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz) mit über 12 weiteren botanischen Stoffen und Nährstoffen: Guarana-Extrakt für natürliches Koffein, Ginseng, Ashwagandha, Cordyceps und schwarzer Holunderbeere, zusammen mit Aminosäuren (L-Arginin, L-Citrullin) und einer Multivitamin-Vormischung. Jeder Wirkstoff auf dieser Liste stammt aus Pflanzen — es gibt nirgendwo in der Rezeptur synthetisches Koffein oder Stimulans. Das Sachet ist leicht mit Honig statt zugesetztem Zucker gesüßt; Honig ist ein natürlicher Süßstoff, aber er ist eine tierische Zutat, keine Pflanze, daher werden zwar UNI MAX\'s aktive Pflanzenstoffe pflanzenbasiert vermarktet, das fertige Sachet jedoch nicht als vegan beworben oder gekennzeichnet.',

    "What to look for if you're comparing plant-based energy drinks": 'Worauf Sie achten sollten, wenn Sie pflanzenbasierte Energy-Drinks vergleichen',
    'Comparing plant-based energy drinks side by side comes down to a few concrete details, not the phrase printed on the front of the can or box.':
      'Der Vergleich pflanzenbasierter Energy-Drinks nebeneinander läuft auf ein paar konkrete Details hinaus, nicht auf den Satz, der vorne auf der Dose oder Schachtel gedruckt ist.',
    [UL_COMPARE_EN]: `      <ul>
        <li><strong>Vollständige Zutatenliste vs. Markenmischung</strong> — legt die Marke jeden botanischen Stoff und dessen Menge offen, oder versteckt sie die Rezeptur hinter einer einzigen Zeile "Marken-Energiemischung"?</li>
        <li><strong>Eine stimulierende Pflanze vs. mehrere botanische Stoffe</strong> — wissen Sie, welche Sie kaufen, und ob der Rest der Liste etwas anderes bewirkt als Geschmack.</li>
        <li><strong>Womit es tatsächlich gesüßt wird</strong> — Rohrzucker, eine Zuckeralternative, Honig, oder nichts Zugesetztes.</li>
        <li><strong>Portionsformat</strong> — Dose, Flasche, Sachet oder Konzentrat — was die Tragbarkeit, Haltbarkeit und die Art der Lagerhaltung des Produkts beeinflusst.</li>
      </ul>`,

    "Why the plant-based framing matters for a distributor's shelf, not only the individual buyer": 'Warum die pflanzenbasierte Positionierung für das Regal eines Vertriebspartners wichtig ist, nicht nur für den einzelnen Käufer',
    'Consumer interest in plant-based and botanical energy formats has been growing in recent years, as more people look for a version of "energy" built without synthetic stimulants. Most of the visible plant-based options on shelf today are single-plant swaps — one stimulant plant standing in for synthetic caffeine, with a short ingredient list around it. A multi-botanical formula is a genuinely different product within the same category, not a repackaging of the same idea, which gives a distributor a distinct story to tell a retail buyer rather than competing head-on against an already crowded single-plant shelf.':
      'Das Verbraucherinteresse an pflanzenbasierten und botanischen Energieformaten ist in den letzten Jahren gewachsen, da immer mehr Menschen nach einer Version von "Energie" suchen, die ohne synthetische Stimulanzien auskommt. Die meisten sichtbaren pflanzenbasierten Optionen im heutigen Regal sind Einzelpflanzen-Ersatz — eine stimulierende Pflanze anstelle von synthetischem Koffein, mit einer kurzen Zutatenliste drumherum. Eine Mehrfachpflanzen-Rezeptur ist ein wirklich anderes Produkt innerhalb derselben Kategorie, keine Neuverpackung derselben Idee, was einem Vertriebspartner eine eigenständige Geschichte gibt, die er einem Einzelhandelskäufer erzählen kann, anstatt direkt gegen ein bereits überfülltes Einzelpflanzen-Regal zu konkurrieren.',

    'Want the multi-botanical formula on your shelf?': 'Möchten Sie die Mehrfachpflanzen-Rezeptur in Ihrem Regal?',
    'UNI MAX is supplied retail-ready — 30 × 10 g sachets per branded box — to stockists, wholesalers and regional distributors. Tell us your market and volume.':
      'UNI MAX wird verkaufsfertig geliefert — 30 × 10 g Sachets pro Markenbox — an Fachhändler, Großhändler und regionale Vertriebspartner. Teilen Sie uns Ihren Markt und Ihr Volumen mit.',

    'Formula FAQ': 'FAQ zur Rezeptur',
    'Common questions about plant-based energy drinks.': 'Häufige Fragen zu pflanzenbasierten Energy-Drinks.',

    '>Energy shot vs energy drink: what\'s the difference?</a>': '>Energy-Shot vs. Energy-Drink: Was ist der Unterschied?</a>',
    '>Are energy drinks halal or haram?</a>': '>Sind Energy-Drinks halal oder haram?</a>',
    '>Tongkat Ali sachet drink, Malaysia: the format explained</a>': '>Was ist ein Tongkat-Ali-Sachet-Getränk?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX Großhandel &amp; Vertrieb</a>',
  },
},

};
