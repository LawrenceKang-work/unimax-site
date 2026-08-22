/* guides/tongkat-ali-drink-vs-capsules/ 的五语译文(本篇独有内容,共享头尾见 _shared.js)。
 * key 必须与源页字节完全一致(含 &amp; / &nbsp; / em dash 等),由 gen-guide-pages.js 断言命中数。
 *
 * 表格/列表这类多行英文原文块只在文件里出现一次(存成常量),用作 computed key,
 * 避免同一段英文在 5 个语言块里重复抄 5 遍、也避免把多行模板字符串直接写成对象字面量的
 * key(那样写语法上必须套 [ ] 才是合法的 computed property,直接裸写会报错)。
 */

const TABLE_EN = `      <table class="gd-table">
        <thead>
          <tr><th>Format</th><th>What it is</th><th>Best suited to</th><th>Retail considerations</th></tr>
        </thead>
        <tbody>
          <tr><td>Capsules</td><td>Measured extract in a shell</td><td>Online supplement buyers</td><td>Pharmacy-adjacent look; shelf presence is weak; strong online competition</td></tr>
          <tr><td>Raw powder</td><td>Bulk extract by the kilogram</td><td>Formulators and brand builders</td><td>Not retailable as-is; months of work from powder to product</td></tr>
          <tr><td>Coffee mix</td><td>Instant coffee + Tongkat Ali</td><td>Habitual coffee drinkers</td><td>Established category in ASEAN; crowded and price-driven</td></tr>
          <tr><td>Ready-to-drink sachet</td><td>Standalone botanical formula, single-serve</td><td>Everyday convenience use</td><td>Impulse-friendly; works on gym counters, wellness shops and e-commerce bundles</td></tr>
        </tbody>
      </table>`;

const UL_EN = `      <ul>
        <li><strong>No dosing friction.</strong> One sachet is one serving — nothing to measure, nothing to explain at the till.</li>
        <li><strong>Impulse-friendly price point.</strong> A box of 30 sachets sits naturally beside drinks and snacks, not behind a pharmacy counter.</li>
        <li><strong>A format people already understand.</strong> Sachet drinks are an established habit across ASEAN and halal markets — the behaviour does not need to be taught.</li>
      </ul>`;

module.exports = {

zh: {
  meta: {
    title: '东革阿里饮品 vs 胶囊：形态指南 | UNI MAX',
    desc: '即饮独立包、胶囊、咖啡冲剂还是原粉？东革阿里各形态对比——日常使用与零售商、分销商选品都用得上。',
    ogTitle: '东革阿里饮品 vs 胶囊：形态指南 — UNI MAX',
    ogDesc: '东革阿里各形态对比——即饮独立包、胶囊、咖啡冲剂与原粉——覆盖日常使用与零售场景。',
  },
  breadcrumbName: '东革阿里饮品 vs 胶囊',
  articleHeadline: '东革阿里饮品 vs 胶囊：如何选对形态',
  articleDescription: '东革阿里各形态对比——即饮独立包、胶囊、咖啡冲剂与原粉——覆盖日常使用与零售商、分销商的选品需求。',
  faq: [
    { q: '东革阿里饮品和东革阿里咖啡是同一回事吗？', a: '不是。东革阿里咖啡是在即溶咖啡里加入东革阿里提取物——基底是咖啡。东革阿里活力饮则是独立的植物复方，东革阿里是主角成分，通常搭配其他植物成分、氨基酸与营养素，而不是咖啡。' },
    { q: '10 克装的东革阿里饮品独立包通常含有什么？', a: '以 UNI MAX 为例：每包 10 克结合三重东革阿里（黄、红、黑）与 12 种以上植物成分及营养素，包括瓜拉那、适应原与氨基酸，无额外添加糖。具体配方因品牌而异。' },
    { q: '零售商能不能不用重新分装就直接上架东革阿里饮品？', a: '可以，前提是供货本身就是零售就绪的成品。以 UNI MAX 为例，供货形态是 30 × 10 克独立包的品牌盒，在认证的马来西亚工厂生产，合作方无需额外分装或重新配方即可直接上架。' },
  ],
  html: {
    'Format Guide': '形态指南',
    'Tongkat Ali drink vs capsules: choosing the right format.': '东革阿里饮品 vs 胶囊：如何选对形态。',
    'Tongkat Ali is sold as capsules, loose powder, coffee mixes and ready-to-drink sachets. This guide compares the formats — for everyday use, and for retailers and distributors deciding what to put on shelf.':
      '东革阿里在市面上有胶囊、散装粉末、咖啡冲剂与即饮独立包等多种形态。本指南逐一对比——既为日常使用者，也为正在决定上架什么的零售商与分销商。',

    'The four common Tongkat Ali formats': '东革阿里的四种常见形态',
    '<p><strong>Capsules</strong> are the most widespread format online: a measured dose of extract in a two-piece shell. They travel well and are easy to compare on extract strength, but they look and feel like medicine — which limits where they can be sold and how casually they are picked up.</p>':
      '<p><strong>胶囊</strong>是网上最常见的形态：定量提取物装入两片式胶囊壳。便于携带，也容易按提取物浓度做横向比较，但外观和使用方式都更像药品——这限制了它能在哪些渠道销售，也限制了顾客随手拿起的意愿。</p>',
    '<p><strong>Raw extract powder</strong> is how most Tongkat Ali actually leaves Malaysia: bulk kilograms sold to formulators. It is an ingredient, not a product — whoever buys it still needs a formula, a filling plant, packaging and certifications before anything reaches a consumer.</p>':
      '<p><strong>原料提取粉末</strong>是东革阿里离开马来西亚时最真实的形态：按公斤批量卖给配方商。这是原料，不是成品——买家拿到手后，还得自己搞定配方、灌装产线、包装与认证，才能真正送到消费者手上。</p>',
    '<p><strong>Coffee mixes</strong> — kopi Tongkat Ali — are a long-standing Malaysian tradition: instant coffee with Tongkat Ali extract added. The base is coffee; Tongkat Ali is the supporting act.</p>':
      '<p><strong>咖啡冲剂</strong>——也就是东革阿里咖啡——是马来西亚由来已久的传统：即溶咖啡里加入东革阿里提取物。基底是咖啡，东革阿里只是配角。</p>',
    '<p><strong>Ready-to-drink vitality sachets</strong> flip that around: a standalone botanical formula in single-serve sachets, with Tongkat Ali as the hero ingredient supported by other botanicals, amino acids and nutrients. No shaker, no measuring, no coffee base.</p>':
      '<p><strong>即饮活力独立包</strong>则反过来：以植物复方为主体、单份独立包装，东革阿里是主角，搭配其他植物成分、氨基酸与营养素。不用摇杯，不用量取，也没有咖啡基底。</p>',

    'How the formats compare': '各形态对比一览',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>形态</th><th>是什么</th><th>最适合</th><th>零售考量</th></tr>
        </thead>
        <tbody>
          <tr><td>胶囊</td><td>壳内定量提取物</td><td>线上补剂购买者</td><td>外观偏药房风格，货架存在感弱，线上竞争激烈</td></tr>
          <tr><td>原料粉末</td><td>按公斤计的散装提取物</td><td>配方商与品牌打造者</td><td>无法直接零售；从粉末到成品要走数月流程</td></tr>
          <tr><td>咖啡冲剂</td><td>即溶咖啡 + 东革阿里</td><td>有喝咖啡习惯的人群</td><td>在东盟已是成熟品类，竞争拥挤且以价格为导向</td></tr>
          <tr><td>即饮独立包</td><td>单份植物复方，独立包装</td><td>日常便利场景</td><td>适合冲动购买，健身房前台、保健品店与电商组合装都适用</td></tr>
        </tbody>
      </table>`,

    'Why format matters more in retail than online': '为什么形态在零售场景比线上更重要',
    '<p>Online, a shopper can read labels for ten minutes. On a shelf or a counter, a product gets a few seconds. Single-serve sachets carry three practical advantages there:</p>':
      '<p>线上购物，顾客能花十分钟细读成分标签。到了货架或柜台前，一款产品能争取到的只有几秒钟。独立包在这个场景里有三个实际优势：</p>',
    [UL_EN]: `      <ul>
        <li><strong>无需算剂量。</strong> 一包就是一份——不用量取，收银台前也不用多解释。</li>
        <li><strong>价位适合冲动购买。</strong> 一盒 30 包自然摆在饮料和零食旁，而不是躲在药房柜台后面。</li>
        <li><strong>顾客早就熟悉这种形态。</strong> 独立包饮品在东盟与清真市场已是成熟的消费习惯——不用重新教育顾客。</li>
      </ul>`,

    'Where a finished drink fits for distributors': '成品饮品对分销商意味着什么',
    '<p>For a wholesaler or distributor, the real comparison is not capsule vs sachet — it is <em>ingredient vs finished product</em>. Buying raw powder means building a brand: formulation, stability, packaging design, certification, filling. Stocking a finished ready-to-drink product means the manufacturer has already done that work on a certified line, and the reseller\'s job is distribution.</p>':
      '<p>对批发商或分销商来说，真正要比较的不是胶囊和独立包，而是<em>原料和成品</em>。买原料粉末等于要自己搭建一个品牌：配方研发、稳定性、包装设计、认证、灌装，样样都得做。而备货一款成品即饮饮品，意味着厂家已经在认证产线上把这些工作都做完了，经销商要做的只是分销。</p>',
    'UNI MAX, for example, is supplied retail-ready: a botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red and Black), 10&nbsp;g × 30 sachets per branded box, produced and filled at a HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facility in Malaysia (Orient Biotech Sdn Bhd). Suggested entry MOQ starts at 12 boxes. See <a href="/wholesale/">wholesale &amp; distribution terms</a>.':
      '以 UNI MAX 为例：零售就绪供货——三重东革阿里（黄、红、黑）植物荔枝活力饮，10&nbsp;克 × 30 包一品牌盒，在马来西亚一家持有 HALAL（JAKIM）、GMP、MeSTI、ISO&nbsp;9001 与 HACCP 认证的工厂（Orient Biotech Sdn Bhd）生产灌装。建议入门起订量 12 盒起。详见<a href="/wholesale/">批发与分销条款</a>。',

    'Format FAQ': '形态常见问题',
    'Common questions about Tongkat Ali formats.': '关于东革阿里形态的常见问题。',

    '>What is a Tongkat Ali sachet drink?</a>': '>什么是东革阿里独立包饮品？</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>如何甄选东革阿里供应商</a>',
    '>Start a supplement business — or become a distributor?</a>': '>自创品牌还是做分销商？</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX 批发与分销</a>',

    'Looking at the drink format for your market?': '正在为你的市场考察这种饮品形态？',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors. Tell us your market and volume and we will confirm terms.':
      'UNI MAX 面向零售商、批发商与区域分销商提供零售就绪供货。告诉我们你的市场与订货量，我们会为你确认合作条款。',
  },
},

ms: {
  meta: {
    title: 'Minuman Tongkat Ali vs Kapsul: Panduan Format | UNI MAX',
    desc: 'Sachet sedia minum, kapsul, kopi campuran atau serbuk mentah? Perbandingan format Tongkat Ali — untuk penggunaan harian dan untuk peruncit serta pengedar yang membuat keputusan stok.',
    ogTitle: 'Minuman Tongkat Ali vs Kapsul: Panduan Format — UNI MAX',
    ogDesc: 'Perbandingan format Tongkat Ali — sachet sedia minum, kapsul, kopi campuran dan serbuk mentah — untuk penggunaan harian dan runcit.',
  },
  breadcrumbName: 'Minuman Tongkat Ali vs Kapsul',
  articleHeadline: 'Minuman Tongkat Ali vs Kapsul: Memilih Format yang Tepat',
  articleDescription: 'Perbandingan format Tongkat Ali — sachet sedia minum, kapsul, kopi campuran dan serbuk mentah — untuk penggunaan harian dan untuk peruncit serta pengedar.',
  faq: [
    { q: 'Adakah minuman Tongkat Ali sama seperti kopi Tongkat Ali?', a: 'Tidak. Kopi Tongkat Ali ialah kopi segera dengan ekstrak Tongkat Ali ditambah — asasnya kopi. Minuman vitaliti Tongkat Ali pula formula botani berdiri sendiri di mana Tongkat Ali menjadi bahan utama, biasanya digabungkan dengan botani, asid amino dan nutrien lain berbanding kopi.' },
    { q: 'Apa yang biasanya terkandung dalam sachet minuman Tongkat Ali 10 g?', a: 'Menggunakan UNI MAX sebagai contoh: setiap sachet 10 g menggabungkan Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam) dengan 12+ botani dan nutrien, termasuk guarana, adaptogen dan asid amino, tanpa gula tambahan. Formula berbeza mengikut jenama.' },
    { q: 'Bolehkah peruncit menstok minuman Tongkat Ali tanpa membungkus semula?', a: 'Ya, jika ia dibekalkan sebagai produk sedia-runcit yang siap. UNI MAX, sebagai contoh, dibekalkan dalam kotak berjenama 30 × 10 g sachet, dihasilkan di kemudahan bertauliah Malaysia, jadi rakan kongsi boleh meletakkannya di rak tanpa pembungkusan tambahan atau formula semula.' },
  ],
  html: {
    'Format Guide': 'Panduan Format',
    'Tongkat Ali drink vs capsules: choosing the right format.': 'Minuman Tongkat Ali vs kapsul: memilih format yang tepat.',
    'Tongkat Ali is sold as capsules, loose powder, coffee mixes and ready-to-drink sachets. This guide compares the formats — for everyday use, and for retailers and distributors deciding what to put on shelf.':
      'Tongkat Ali dijual dalam bentuk kapsul, serbuk longgar, kopi campuran dan sachet sedia minum. Panduan ini membandingkan format-format tersebut — untuk penggunaan harian, dan untuk peruncit serta pengedar yang sedang membuat keputusan apa hendak distok.',

    'The four common Tongkat Ali formats': 'Empat format Tongkat Ali yang biasa dijumpai',
    '<p><strong>Capsules</strong> are the most widespread format online: a measured dose of extract in a two-piece shell. They travel well and are easy to compare on extract strength, but they look and feel like medicine — which limits where they can be sold and how casually they are picked up.</p>':
      '<p><strong>Kapsul</strong> ialah format paling meluas dalam talian: dos ekstrak yang diukur dalam cengkerang dua keping. Mudah dibawa dan mudah dibandingkan dari segi kekuatan ekstrak, tetapi rupa dan rasanya seperti ubat — ini menghadkan tempat ia boleh dijual dan sejauh mana ia diambil secara santai.</p>',
    '<p><strong>Raw extract powder</strong> is how most Tongkat Ali actually leaves Malaysia: bulk kilograms sold to formulators. It is an ingredient, not a product — whoever buys it still needs a formula, a filling plant, packaging and certifications before anything reaches a consumer.</p>':
      '<p><strong>Serbuk ekstrak mentah</strong> adalah bentuk sebenar kebanyakan Tongkat Ali meninggalkan Malaysia: berkilogram secara pukal dijual kepada pemformula. Ia adalah bahan, bukan produk — sesiapa yang membelinya masih perlu formula, kilang pengisian, pembungkusan dan pensijilan sebelum apa-apa sampai ke tangan pengguna.</p>',
    '<p><strong>Coffee mixes</strong> — kopi Tongkat Ali — are a long-standing Malaysian tradition: instant coffee with Tongkat Ali extract added. The base is coffee; Tongkat Ali is the supporting act.</p>':
      '<p><strong>Kopi campuran</strong> — kopi Tongkat Ali — adalah tradisi Malaysia yang sudah lama wujud: kopi segera ditambah ekstrak Tongkat Ali. Asasnya kopi; Tongkat Ali hanya sokongan.</p>',
    '<p><strong>Ready-to-drink vitality sachets</strong> flip that around: a standalone botanical formula in single-serve sachets, with Tongkat Ali as the hero ingredient supported by other botanicals, amino acids and nutrients. No shaker, no measuring, no coffee base.</p>':
      '<p><strong>Sachet vitaliti sedia minum</strong> pula sebaliknya: formula botani yang berdiri sendiri dalam sachet sajian tunggal, dengan Tongkat Ali sebagai bahan utama disokong oleh botani, asid amino dan nutrien lain. Tiada shaker, tiada ukuran, tiada asas kopi.</p>',

    'How the formats compare': 'Perbandingan format',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Format</th><th>Apa dia</th><th>Paling sesuai untuk</th><th>Pertimbangan runcit</th></tr>
        </thead>
        <tbody>
          <tr><td>Kapsul</td><td>Ekstrak terukur dalam cengkerang</td><td>Pembeli suplemen dalam talian</td><td>Rupa seakan farmasi; kehadiran di rak lemah; persaingan dalam talian sengit</td></tr>
          <tr><td>Serbuk mentah</td><td>Ekstrak pukal berkilogram</td><td>Pemformula dan pembina jenama</td><td>Tidak boleh diruncit terus; berbulan kerja daripada serbuk kepada produk</td></tr>
          <tr><td>Kopi campuran</td><td>Kopi segera + Tongkat Ali</td><td>Peminum kopi tetap</td><td>Kategori mantap di ASEAN; sesak dan didorong harga</td></tr>
          <tr><td>Sachet sedia minum</td><td>Formula botani berdiri sendiri, sajian tunggal</td><td>Kegunaan harian yang mudah</td><td>Mesra pembelian ghairah; sesuai di kaunter gim, kedai kesihatan dan bundle e-dagang</td></tr>
        </tbody>
      </table>`,

    'Why format matters more in retail than online': 'Mengapa format lebih penting dalam runcit berbanding dalam talian',
    '<p>Online, a shopper can read labels for ten minutes. On a shelf or a counter, a product gets a few seconds. Single-serve sachets carry three practical advantages there:</p>':
      '<p>Dalam talian, pembeli boleh membaca label selama sepuluh minit. Di rak atau kaunter, sesuatu produk hanya ada beberapa saat. Sachet sajian tunggal membawa tiga kelebihan praktikal di sini:</p>',
    [UL_EN]: `      <ul>
        <li><strong>Tiada geseran dos.</strong> Satu sachet ialah satu sajian — tiada apa hendak diukur, tiada apa hendak dijelaskan di kaunter bayaran.</li>
        <li><strong>Harga mesra pembelian ghairah.</strong> Kotak 30 sachet duduk semula jadi di sebelah minuman dan snek, bukan di belakang kaunter farmasi.</li>
        <li><strong>Format yang orang sudah faham.</strong> Minuman sachet adalah tabiat mantap di seluruh ASEAN dan pasaran halal — tingkah laku ini tidak perlu diajar.</li>
      </ul>`,

    'Where a finished drink fits for distributors': 'Di mana minuman siap sesuai untuk pengedar',
    '<p>For a wholesaler or distributor, the real comparison is not capsule vs sachet — it is <em>ingredient vs finished product</em>. Buying raw powder means building a brand: formulation, stability, packaging design, certification, filling. Stocking a finished ready-to-drink product means the manufacturer has already done that work on a certified line, and the reseller\'s job is distribution.</p>':
      '<p>Bagi pemborong atau pengedar, perbandingan sebenar bukan kapsul lawan sachet — ia bahan lawan produk siap. Membeli serbuk mentah bermakna membina jenama: formulasi, kestabilan, reka bentuk pembungkusan, pensijilan, pengisian. Menstok produk sedia minum yang siap bermakna pengilang sudah melakukan kerja itu di talian bertauliah, dan kerja penjual semula ialah pengedaran.</p>',
    'UNI MAX, for example, is supplied retail-ready: a botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red and Black), 10&nbsp;g × 30 sachets per branded box, produced and filled at a HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facility in Malaysia (Orient Biotech Sdn Bhd). Suggested entry MOQ starts at 12 boxes. See <a href="/wholesale/">wholesale &amp; distribution terms</a>.':
      'UNI MAX, sebagai contoh, dibekalkan sedia-runcit: minuman vitaliti botani laici dengan Tongkat Ali Tiga Kuasa (Kuning, Merah dan Hitam), 10&nbsp;g × 30 sachet setiap kotak berjenama, dihasilkan dan diisi di kemudahan bertauliah HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 dan HACCP di Malaysia (Orient Biotech Sdn Bhd). MOQ kemasukan yang dicadangkan bermula 12 kotak. Lihat <a href="/wholesale/">terma pemborongan &amp; pengedaran</a>.',

    'Format FAQ': 'Soalan Lazim Format',
    'Common questions about Tongkat Ali formats.': 'Soalan lazim tentang format Tongkat Ali.',

    '>What is a Tongkat Ali sachet drink?</a>': '>Apa itu minuman sachet Tongkat Ali?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Memilih pembekal Tongkat Ali</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Mulakan perniagaan atau jadi pengedar?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Pemborongan &amp; pengedaran UNI MAX</a>',

    'Looking at the drink format for your market?': 'Sedang melihat format minuman untuk pasaran anda?',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors. Tell us your market and volume and we will confirm terms.':
      'UNI MAX dibekalkan sedia-runcit kepada penstok, pemborong dan pengedar serantau. Beritahu kami pasaran dan jumlah anda dan kami akan sahkan terma.',
  },
},

pl: {
  meta: {
    title: 'Napój z Tongkat Ali a kapsułki: przewodnik po formatach | UNI MAX',
    desc: 'Saszetki gotowe do picia, kapsułki, mieszanki kawowe czy surowy proszek? Porównanie formatów Tongkat Ali — do codziennego użytku i dla sprzedawców oraz dystrybutorów wybierających asortyment.',
    ogTitle: 'Napój z Tongkat Ali a kapsułki: przewodnik po formatach — UNI MAX',
    ogDesc: 'Porównanie formatów Tongkat Ali — saszetki gotowe do picia, kapsułki, mieszanki kawowe i surowy proszek — do codziennego użytku i sprzedaży detalicznej.',
  },
  breadcrumbName: 'Napój z Tongkat Ali a kapsułki',
  articleHeadline: 'Napój z Tongkat Ali a kapsułki: jak wybrać właściwy format',
  articleDescription: 'Porównanie formatów Tongkat Ali — saszetki gotowe do picia, kapsułki, mieszanki kawowe i surowy proszek — do codziennego użytku oraz dla sprzedawców i dystrybutorów.',
  faq: [
    { q: 'Czy napój z Tongkat Ali to to samo co kawa z Tongkat Ali?', a: 'Nie. Kawa z Tongkat Ali to kawa rozpuszczalna z dodatkiem ekstraktu Tongkat Ali — bazą jest kawa. Napój witalny z Tongkat Ali to samodzielna formuła botaniczna, w której Tongkat Ali jest głównym składnikiem, zwykle łączonym z innymi roślinami, aminokwasami i składnikami odżywczymi, a nie z kawą.' },
    { q: 'Co zazwyczaj zawiera 10-gramowa saszetka napoju z Tongkat Ali?', a: 'Na przykładzie UNI MAX: każda 10-gramowa saszetka łączy Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny) z ponad 12 roślinami i składnikami odżywczymi, w tym guaraną, adaptogenami i aminokwasami, bez dodatku cukru. Formuły różnią się w zależności od marki.' },
    { q: 'Czy sprzedawcy detaliczni mogą trzymać na stanie napój z Tongkat Ali bez przepakowywania?', a: 'Tak, jeśli jest dostarczany jako gotowy produkt przeznaczony do sprzedaży detalicznej. UNI MAX, dla przykładu, dostarczany jest w markowych pudełkach po 30 × 10 g saszetek, produkowanych w certyfikowanym zakładzie w Malezji, dzięki czemu partnerzy mogą wystawić go na półkę bez dodatkowego pakowania czy zmiany receptury.' },
  ],
  html: {
    'Format Guide': 'Przewodnik po formatach',
    'Tongkat Ali drink vs capsules: choosing the right format.': 'Napój z Tongkat Ali a kapsułki: jak wybrać właściwy format.',
    'Tongkat Ali is sold as capsules, loose powder, coffee mixes and ready-to-drink sachets. This guide compares the formats — for everyday use, and for retailers and distributors deciding what to put on shelf.':
      'Tongkat Ali sprzedawany jest w postaci kapsułek, luźnego proszku, mieszanek kawowych i saszetek gotowych do picia. Ten przewodnik porównuje te formaty — zarówno do codziennego użytku, jak i dla sprzedawców oraz dystrybutorów decydujących, co wprowadzić do oferty.',

    'The four common Tongkat Ali formats': 'Cztery popularne formaty Tongkat Ali',
    '<p><strong>Capsules</strong> are the most widespread format online: a measured dose of extract in a two-piece shell. They travel well and are easy to compare on extract strength, but they look and feel like medicine — which limits where they can be sold and how casually they are picked up.</p>':
      '<p><strong>Kapsułki</strong> to najpopularniejszy format w internecie: odmierzona dawka ekstraktu w dwuczęściowej otoczce. Dobrze się transportują i łatwo porównać ich moc ekstraktu, ale wyglądają i sprawiają wrażenie leku — co ogranicza, gdzie mogą być sprzedawane i jak swobodnie ktoś je bierze do ręki.</p>',
    '<p><strong>Raw extract powder</strong> is how most Tongkat Ali actually leaves Malaysia: bulk kilograms sold to formulators. It is an ingredient, not a product — whoever buys it still needs a formula, a filling plant, packaging and certifications before anything reaches a consumer.</p>':
      '<p><strong>Surowy proszek ekstraktu</strong> to forma, w jakiej większość Tongkat Ali faktycznie opuszcza Malezję: hurtowe kilogramy sprzedawane producentom formuł. To surowiec, nie produkt — kupujący i tak musi jeszcze opracować recepturę, zapewnić linię pakowania, opakowanie i certyfikaty, zanim cokolwiek trafi do konsumenta.</p>',
    '<p><strong>Coffee mixes</strong> — kopi Tongkat Ali — are a long-standing Malaysian tradition: instant coffee with Tongkat Ali extract added. The base is coffee; Tongkat Ali is the supporting act.</p>':
      '<p><strong>Mieszanki kawowe</strong> — kopi Tongkat Ali — to długoletnia malezyjska tradycja: kawa rozpuszczalna z dodatkiem ekstraktu Tongkat Ali. Bazą jest kawa; Tongkat Ali gra tu drugie skrzypce.</p>',
    '<p><strong>Ready-to-drink vitality sachets</strong> flip that around: a standalone botanical formula in single-serve sachets, with Tongkat Ali as the hero ingredient supported by other botanicals, amino acids and nutrients. No shaker, no measuring, no coffee base.</p>':
      '<p><strong>Saszetki witalności gotowe do picia</strong> odwracają tę zależność: samodzielna formuła botaniczna w saszetkach jednorazowych, w której Tongkat Ali jest głównym składnikiem wspieranym przez inne rośliny, aminokwasy i składniki odżywcze. Bez shakera, bez odmierzania, bez bazy kawowej.</p>',

    'How the formats compare': 'Porównanie formatów',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Format</th><th>Co to jest</th><th>Najlepiej sprawdza się dla</th><th>Aspekty sprzedaży detalicznej</th></tr>
        </thead>
        <tbody>
          <tr><td>Kapsułki</td><td>Odmierzony ekstrakt w otoczce</td><td>Kupujący suplementy online</td><td>Wygląd zbliżony do apteki; słaba obecność na półce; silna konkurencja online</td></tr>
          <tr><td>Surowy proszek</td><td>Hurtowy ekstrakt na kilogramy</td><td>Producenci formuł i twórcy marek</td><td>Nie nadaje się do sprzedaży w tej postaci; miesiące pracy od proszku do produktu</td></tr>
          <tr><td>Mieszanka kawowa</td><td>Kawa rozpuszczalna + Tongkat Ali</td><td>Regularni konsumenci kawy</td><td>Ugruntowana kategoria w ASEAN; zatłoczona i cenowo konkurencyjna</td></tr>
          <tr><td>Saszetka gotowa do picia</td><td>Samodzielna formuła botaniczna, porcja jednorazowa</td><td>Codzienna wygoda</td><td>Sprzyja zakupom impulsywnym; sprawdza się przy ladzie na siłowni, w sklepach ze zdrową żywnością i zestawach e-commerce</td></tr>
        </tbody>
      </table>`,

    'Why format matters more in retail than online': 'Dlaczego format ma większe znaczenie w sprzedaży detalicznej niż online',
    '<p>Online, a shopper can read labels for ten minutes. On a shelf or a counter, a product gets a few seconds. Single-serve sachets carry three practical advantages there:</p>':
      '<p>Online kupujący może czytać etykietę przez dziesięć minut. Na półce lub przy ladzie produkt ma na to kilka sekund. Saszetki jednorazowe mają tu trzy praktyczne przewagi:</p>',
    [UL_EN]: `      <ul>
        <li><strong>Brak tarcia przy dawkowaniu.</strong> Jedna saszetka to jedna porcja — nic do odmierzenia, nic do tłumaczenia przy kasie.</li>
        <li><strong>Cena sprzyjająca zakupom impulsywnym.</strong> Pudełko 30 saszetek naturalnie stoi obok napojów i przekąsek, a nie za ladą apteczną.</li>
        <li><strong>Format, który ludzie już znają.</strong> Napoje w saszetkach to ugruntowany nawyk w całym ASEAN i na rynkach halal — nie trzeba uczyć tego zachowania od nowa.</li>
      </ul>`,

    'Where a finished drink fits for distributors': 'Gdzie gotowy napój pasuje z perspektywy dystrybutorów',
    '<p>For a wholesaler or distributor, the real comparison is not capsule vs sachet — it is <em>ingredient vs finished product</em>. Buying raw powder means building a brand: formulation, stability, packaging design, certification, filling. Stocking a finished ready-to-drink product means the manufacturer has already done that work on a certified line, and the reseller\'s job is distribution.</p>':
      '<p>Dla hurtownika czy dystrybutora prawdziwym porównaniem nie są kapsułki kontra saszetka — to surowiec kontra gotowy produkt. Zakup surowego proszku oznacza budowanie marki od zera: receptura, stabilność, projekt opakowania, certyfikacja, napełnianie. Trzymanie na stanie gotowego produktu do picia oznacza, że producent już wykonał tę pracę na certyfikowanej linii, a zadaniem resellera jest dystrybucja.</p>',
    'UNI MAX, for example, is supplied retail-ready: a botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red and Black), 10&nbsp;g × 30 sachets per branded box, produced and filled at a HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facility in Malaysia (Orient Biotech Sdn Bhd). Suggested entry MOQ starts at 12 boxes. See <a href="/wholesale/">wholesale &amp; distribution terms</a>.':
      'UNI MAX, dla przykładu, dostarczany jest gotowy do sprzedaży: botaniczny napój witalny liczi z Tongkat Ali Potrójnej Mocy (żółty, czerwony i czarny), 10&nbsp;g × 30 saszetek w markowym pudełku, produkowany i napełniany w certyfikowanym zakładzie HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 i HACCP w Malezji (Orient Biotech Sdn Bhd). Sugerowane wejściowe MOQ zaczyna się od 12 pudełek. Zobacz <a href="/wholesale/">warunki hurtu i dystrybucji</a>.',

    'Format FAQ': 'FAQ o formatach',
    'Common questions about Tongkat Ali formats.': 'Najczęstsze pytania o formaty Tongkat Ali.',

    '>What is a Tongkat Ali sachet drink?</a>': '>Czym jest napój Tongkat Ali w saszetce?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Jak wybrać dostawcę Tongkat Ali</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Własna firma czy dystrybucja?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Hurt i dystrybucja UNI MAX</a>',

    'Looking at the drink format for your market?': 'Rozważasz ten format napoju dla swojego rynku?',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors. Tell us your market and volume and we will confirm terms.':
      'UNI MAX dostarczany jest gotowy do sprzedaży detalicznej dla punktów sprzedaży, hurtowników i dystrybutorów regionalnych. Podaj nam swój rynek i wolumen, a potwierdzimy warunki.',
  },
},

nl: {
  meta: {
    title: 'Tongkat Ali-drank vs capsules: formaatgids | UNI MAX',
    desc: 'Kant-en-klare sachets, capsules, koffiemixen of ruwe poeder? Hoe Tongkat Ali-formaten zich verhouden — voor dagelijks gebruik en voor retailers en distributeurs die hun assortiment bepalen.',
    ogTitle: 'Tongkat Ali-drank vs capsules: formaatgids — UNI MAX',
    ogDesc: 'Hoe Tongkat Ali-formaten zich verhouden — kant-en-klare sachets, capsules, koffiemixen en ruwe poeder — voor dagelijks gebruik en retail.',
  },
  breadcrumbName: 'Tongkat Ali-drank vs capsules',
  articleHeadline: 'Tongkat Ali-drank vs capsules: het juiste formaat kiezen',
  articleDescription: 'Hoe Tongkat Ali-formaten zich verhouden — kant-en-klare sachets, capsules, koffiemixen en ruwe poeder — voor dagelijks gebruik en voor retailers en distributeurs.',
  faq: [
    { q: 'Is een Tongkat Ali-drank hetzelfde als Tongkat Ali-koffie?', a: 'Nee. Tongkat Ali-koffie is oploskoffie met toegevoegd Tongkat Ali-extract — de basis is koffie. Een Tongkat Ali-vitaliteitsdrank is een op zichzelf staande botanische formule waarin Tongkat Ali het hoofdingrediënt is, doorgaans gecombineerd met andere botanische stoffen, aminozuren en voedingsstoffen in plaats van koffie.' },
    { q: 'Wat zit er doorgaans in een sachet Tongkat Ali-drank van 10 g?', a: 'Met UNI MAX als voorbeeld: elke sachet van 10 g combineert Tongkat Ali met Drievoudige Kracht (geel, rood en zwart) met 12+ botanische stoffen en voedingsstoffen, waaronder guarana, adaptogenen en aminozuren, zonder toegevoegde suiker. Formules verschillen per merk.' },
    { q: 'Kunnen retailers een Tongkat Ali-drank verkopen zonder deze over te verpakken?', a: 'Ja, als het wordt geleverd als een afgewerkt, verkoopklaar product. UNI MAX wordt bijvoorbeeld geleverd in merkdozen van 30 × 10 g sachets, geproduceerd in een gecertificeerde Maleisische faciliteit, zodat partners het zonder extra verpakking of herformulering in het schap kunnen zetten.' },
  ],
  html: {
    'Format Guide': 'Formaatgids',
    'Tongkat Ali drink vs capsules: choosing the right format.': 'Tongkat Ali-drank vs capsules: het juiste formaat kiezen.',
    'Tongkat Ali is sold as capsules, loose powder, coffee mixes and ready-to-drink sachets. This guide compares the formats — for everyday use, and for retailers and distributors deciding what to put on shelf.':
      'Tongkat Ali wordt verkocht als capsules, losse poeder, koffiemixen en kant-en-klare sachets. Deze gids vergelijkt de formaten — voor dagelijks gebruik, en voor retailers en distributeurs die bepalen wat ze in het schap leggen.',

    'The four common Tongkat Ali formats': 'De vier veelvoorkomende Tongkat Ali-formaten',
    '<p><strong>Capsules</strong> are the most widespread format online: a measured dose of extract in a two-piece shell. They travel well and are easy to compare on extract strength, but they look and feel like medicine — which limits where they can be sold and how casually they are picked up.</p>':
      '<p><strong>Capsules</strong> zijn het meest verspreide formaat online: een afgemeten dosis extract in een tweedelige schaal. Ze reizen goed mee en zijn eenvoudig te vergelijken op extractsterkte, maar ze ogen en voelen als medicijnen — wat beperkt waar ze verkocht kunnen worden en hoe achteloos ze worden opgepakt.</p>',
    '<p><strong>Raw extract powder</strong> is how most Tongkat Ali actually leaves Malaysia: bulk kilograms sold to formulators. It is an ingredient, not a product — whoever buys it still needs a formula, a filling plant, packaging and certifications before anything reaches a consumer.</p>':
      '<p><strong>Ruw extractpoeder</strong> is de vorm waarin het meeste Tongkat Ali Maleisië daadwerkelijk verlaat: bulkkilo\'s verkocht aan formuleerders. Het is een ingrediënt, geen product — wie het koopt heeft nog steeds een formule, een vulinstallatie, verpakking en certificeringen nodig voordat er iets bij een consument terechtkomt.</p>',
    '<p><strong>Coffee mixes</strong> — kopi Tongkat Ali — are a long-standing Malaysian tradition: instant coffee with Tongkat Ali extract added. The base is coffee; Tongkat Ali is the supporting act.</p>':
      '<p><strong>Koffiemixen</strong> — kopi Tongkat Ali — zijn een langlopende Maleisische traditie: oploskoffie met toegevoegd Tongkat Ali-extract. De basis is koffie; Tongkat Ali speelt een ondersteunende rol.</p>',
    '<p><strong>Ready-to-drink vitality sachets</strong> flip that around: a standalone botanical formula in single-serve sachets, with Tongkat Ali as the hero ingredient supported by other botanicals, amino acids and nutrients. No shaker, no measuring, no coffee base.</p>':
      '<p><strong>Kant-en-klare vitaliteitssachets</strong> draaien dat om: een op zichzelf staande botanische formule in sachets voor eenmalig gebruik, met Tongkat Ali als hoofdingrediënt, ondersteund door andere botanische stoffen, aminozuren en voedingsstoffen. Geen shaker, geen afmeten, geen koffiebasis.</p>',

    'How the formats compare': 'Hoe de formaten zich verhouden',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Formaat</th><th>Wat het is</th><th>Meest geschikt voor</th><th>Overwegingen voor retail</th></tr>
        </thead>
        <tbody>
          <tr><td>Capsules</td><td>Afgemeten extract in een schaal</td><td>Online supplementkopers</td><td>Apotheekachtige uitstraling; zwakke schapaanwezigheid; sterke online concurrentie</td></tr>
          <tr><td>Ruwe poeder</td><td>Bulkextract per kilogram</td><td>Formuleerders en merkbouwers</td><td>Niet zomaar te verkopen; maanden werk van poeder naar product</td></tr>
          <tr><td>Koffiemix</td><td>Oploskoffie + Tongkat Ali</td><td>Gewoontekoffiedrinkers</td><td>Gevestigde categorie in ASEAN; druk en prijsgedreven</td></tr>
          <tr><td>Kant-en-klare sachet</td><td>Op zichzelf staande botanische formule, eenmalig gebruik</td><td>Dagelijks gebruiksgemak</td><td>Impulsvriendelijk; werkt bij de balie van sportscholen, wellnesswinkels en e-commercebundels</td></tr>
        </tbody>
      </table>`,

    'Why format matters more in retail than online': 'Waarom formaat meer telt in retail dan online',
    '<p>Online, a shopper can read labels for ten minutes. On a shelf or a counter, a product gets a few seconds. Single-serve sachets carry three practical advantages there:</p>':
      '<p>Online kan een shopper tien minuten lang labels lezen. Op een schap of bij een balie krijgt een product een paar seconden. Sachets voor eenmalig gebruik hebben daar drie praktische voordelen:</p>',
    [UL_EN]: `      <ul>
        <li><strong>Geen doseringsgedoe.</strong> Eén sachet is één portie — niets om af te meten, niets uit te leggen bij de kassa.</li>
        <li><strong>Impulsvriendelijke prijs.</strong> Een doos van 30 sachets staat van nature naast dranken en snacks, niet achter een apotheekbalie.</li>
        <li><strong>Een formaat dat mensen al kennen.</strong> Sachetdrankjes zijn een gevestigde gewoonte in heel ASEAN en op halalmarkten — het gedrag hoeft niet te worden aangeleerd.</li>
      </ul>`,

    'Where a finished drink fits for distributors': 'Waar een afgewerkte drank past voor distributeurs',
    '<p>For a wholesaler or distributor, the real comparison is not capsule vs sachet — it is <em>ingredient vs finished product</em>. Buying raw powder means building a brand: formulation, stability, packaging design, certification, filling. Stocking a finished ready-to-drink product means the manufacturer has already done that work on a certified line, and the reseller\'s job is distribution.</p>':
      '<p>Voor een groothandel of distributeur is de echte vergelijking niet capsule versus sachet — het is ingrediënt versus afgewerkt product. Ruwe poeder kopen betekent een merk bouwen: formulering, stabiliteit, verpakkingsontwerp, certificering, vullen. Een afgewerkt kant-en-klaar product op voorraad houden betekent dat de fabrikant dat werk al heeft gedaan op een gecertificeerde lijn, en dat de taak van de wederverkoper distributie is.</p>',
    'UNI MAX, for example, is supplied retail-ready: a botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red and Black), 10&nbsp;g × 30 sachets per branded box, produced and filled at a HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facility in Malaysia (Orient Biotech Sdn Bhd). Suggested entry MOQ starts at 12 boxes. See <a href="/wholesale/">wholesale &amp; distribution terms</a>.':
      'UNI MAX wordt bijvoorbeeld kant-en-verkoopklaar geleverd: een botanische lychee-vitaliteitsdrank met Tongkat Ali met Drievoudige Kracht (geel, rood en zwart), 10&nbsp;g × 30 sachets per merkdoos, geproduceerd en gevuld in een HALAL (JAKIM)-, GMP-, MeSTI-, ISO&nbsp;9001- en HACCP-gecertificeerde faciliteit in Maleisië (Orient Biotech Sdn Bhd). De voorgestelde instap-MOQ begint bij 12 dozen. Zie <a href="/wholesale/">de voorwaarden voor groothandel &amp; distributie</a>.',

    'Format FAQ': 'Veelgestelde vragen over formaten',
    'Common questions about Tongkat Ali formats.': 'Veelgestelde vragen over Tongkat Ali-formaten.',

    '>What is a Tongkat Ali sachet drink?</a>': '>Wat is een Tongkat Ali sachetdrank?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Een Tongkat Ali-leverancier kiezen</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Eigen bedrijf of distributeur worden?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX groothandel &amp; distributie</a>',

    'Looking at the drink format for your market?': 'Overweegt u dit drankformaat voor uw markt?',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors. Tell us your market and volume and we will confirm terms.':
      'UNI MAX wordt kant-en-verkoopklaar geleverd aan wederverkopers, groothandels en regionale distributeurs. Vertel ons uw markt en volume en wij bevestigen de voorwaarden.',
  },
},

de: {
  meta: {
    title: 'Tongkat-Ali-Getränk vs. Kapseln: Format-Guide | UNI MAX',
    desc: 'Trinkfertige Sachets, Kapseln, Kaffeemischungen oder Rohpulver? Vergleich der Tongkat-Ali-Formate — für den Alltag sowie für Händler und Vertriebspartner bei der Sortimentsentscheidung.',
    ogTitle: 'Tongkat-Ali-Getränk vs. Kapseln: Format-Guide — UNI MAX',
    ogDesc: 'Vergleich der Tongkat-Ali-Formate — trinkfertige Sachets, Kapseln, Kaffeemischungen und Rohpulver — für den Alltag und den Einzelhandel.',
  },
  breadcrumbName: 'Tongkat-Ali-Getränk vs. Kapseln',
  articleHeadline: 'Tongkat-Ali-Getränk vs. Kapseln: das richtige Format wählen',
  articleDescription: 'Vergleich der Tongkat-Ali-Formate — trinkfertige Sachets, Kapseln, Kaffeemischungen und Rohpulver — für den Alltag sowie für Händler und Vertriebspartner.',
  faq: [
    { q: 'Ist ein Tongkat-Ali-Getränk dasselbe wie Tongkat-Ali-Kaffee?', a: 'Nein. Tongkat-Ali-Kaffee ist Instantkaffee mit zugesetztem Tongkat-Ali-Extrakt — die Basis ist Kaffee. Ein Tongkat-Ali-Vitalitätsgetränk ist eine eigenständige botanische Rezeptur, bei der Tongkat Ali die Hauptzutat ist, meist kombiniert mit weiteren Pflanzenstoffen, Aminosäuren und Nährstoffen statt mit Kaffee.' },
    { q: 'Was enthält ein 10-g-Sachet Tongkat-Ali-Getränk typischerweise?', a: 'Am Beispiel von UNI MAX: Jedes 10-g-Sachet kombiniert Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz) mit über 12 Pflanzenstoffen und Nährstoffen, darunter Guarana, Adaptogene und Aminosäuren, ohne Zuckerzusatz. Die Rezepturen variieren je nach Marke.' },
    { q: 'Können Händler ein Tongkat-Ali-Getränk führen, ohne es umzupacken?', a: 'Ja, sofern es als fertiges, verkaufsfertiges Produkt geliefert wird. UNI MAX zum Beispiel wird in Markenboxen mit 30 × 10-g-Sachets geliefert, hergestellt in einer zertifizierten malaysischen Anlage, sodass Partner es ohne zusätzliches Verpacken oder Neuformulierung ins Regal stellen können.' },
  ],
  html: {
    'Format Guide': 'Format-Guide',
    'Tongkat Ali drink vs capsules: choosing the right format.': 'Tongkat-Ali-Getränk vs. Kapseln: das richtige Format wählen.',
    'Tongkat Ali is sold as capsules, loose powder, coffee mixes and ready-to-drink sachets. This guide compares the formats — for everyday use, and for retailers and distributors deciding what to put on shelf.':
      'Tongkat Ali wird als Kapseln, loses Pulver, Kaffeemischungen und trinkfertige Sachets verkauft. Dieser Guide vergleicht die Formate — für den Alltag und für Händler und Vertriebspartner, die entscheiden, was ins Sortiment kommt.',

    'The four common Tongkat Ali formats': 'Die vier gängigen Tongkat-Ali-Formate',
    '<p><strong>Capsules</strong> are the most widespread format online: a measured dose of extract in a two-piece shell. They travel well and are easy to compare on extract strength, but they look and feel like medicine — which limits where they can be sold and how casually they are picked up.</p>':
      '<p><strong>Kapseln</strong> sind das online am weitesten verbreitete Format: eine abgemessene Extraktdosis in einer zweiteiligen Hülle. Sie lassen sich gut transportieren und ihre Extraktstärke leicht vergleichen, wirken aber wie Arzneimittel — was einschränkt, wo sie verkauft werden können und wie beiläufig sie gegriffen werden.</p>',
    '<p><strong>Raw extract powder</strong> is how most Tongkat Ali actually leaves Malaysia: bulk kilograms sold to formulators. It is an ingredient, not a product — whoever buys it still needs a formula, a filling plant, packaging and certifications before anything reaches a consumer.</p>':
      '<p><strong>Rohes Extraktpulver</strong> ist die Form, in der die meisten Tongkat Ali Malaysia tatsächlich verlässt: kiloweise in großen Mengen an Formulierer verkauft. Es ist eine Zutat, kein Produkt — wer es kauft, braucht noch eine Rezeptur, eine Abfüllanlage, Verpackung und Zertifizierungen, bevor überhaupt etwas beim Verbraucher ankommt.</p>',
    '<p><strong>Coffee mixes</strong> — kopi Tongkat Ali — are a long-standing Malaysian tradition: instant coffee with Tongkat Ali extract added. The base is coffee; Tongkat Ali is the supporting act.</p>':
      '<p><strong>Kaffeemischungen</strong> — kopi Tongkat Ali — sind eine langjährige malaysische Tradition: Instantkaffee mit zugesetztem Tongkat-Ali-Extrakt. Die Basis ist Kaffee; Tongkat Ali spielt die Nebenrolle.</p>',
    '<p><strong>Ready-to-drink vitality sachets</strong> flip that around: a standalone botanical formula in single-serve sachets, with Tongkat Ali as the hero ingredient supported by other botanicals, amino acids and nutrients. No shaker, no measuring, no coffee base.</p>':
      '<p><strong>Trinkfertige Vitalitäts-Sachets</strong> kehren das um: eine eigenständige botanische Rezeptur in Einzelportions-Sachets, bei der Tongkat Ali die Hauptzutat ist, unterstützt von weiteren Pflanzenstoffen, Aminosäuren und Nährstoffen. Kein Shaker, kein Abmessen, keine Kaffeebasis.</p>',

    'How the formats compare': 'Formatvergleich',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Format</th><th>Was es ist</th><th>Am besten geeignet für</th><th>Überlegungen für den Einzelhandel</th></tr>
        </thead>
        <tbody>
          <tr><td>Kapseln</td><td>Abgemessener Extrakt in einer Hülle</td><td>Online-Käufer von Nahrungsergänzungsmitteln</td><td>Apothekenähnliche Optik; schwache Präsenz im Regal; starker Online-Wettbewerb</td></tr>
          <tr><td>Rohpulver</td><td>Kiloweiser Bulk-Extrakt</td><td>Formulierer und Markenaufbauer</td><td>So nicht verkaufsfähig; Monate Arbeit vom Pulver zum Produkt</td></tr>
          <tr><td>Kaffeemischung</td><td>Instantkaffee + Tongkat Ali</td><td>Gewohnheitsmäßige Kaffeetrinker</td><td>Etablierte Kategorie in ASEAN; überfüllt und preisgetrieben</td></tr>
          <tr><td>Trinkfertiges Sachet</td><td>Eigenständige botanische Rezeptur, Einzelportion</td><td>Alltägliche, bequeme Nutzung</td><td>Spontankauf-freundlich; funktioniert an Fitnessstudio-Theken, in Wellness-Läden und E-Commerce-Bundles</td></tr>
        </tbody>
      </table>`,

    'Why format matters more in retail than online': 'Warum das Format im Einzelhandel wichtiger ist als online',
    '<p>Online, a shopper can read labels for ten minutes. On a shelf or a counter, a product gets a few seconds. Single-serve sachets carry three practical advantages there:</p>':
      '<p>Online kann ein Käufer zehn Minuten lang Etiketten lesen. Im Regal oder an der Theke hat ein Produkt nur ein paar Sekunden. Einzelportions-Sachets bringen dort drei praktische Vorteile:</p>',
    [UL_EN]: `      <ul>
        <li><strong>Keine Dosierhürden.</strong> Ein Sachet ist eine Portion — nichts abzumessen, nichts an der Kasse zu erklären.</li>
        <li><strong>Spontankauf-freundlicher Preis.</strong> Eine Packung mit 30 Sachets steht ganz natürlich neben Getränken und Snacks, nicht hinter der Apothekentheke.</li>
        <li><strong>Ein Format, das Menschen bereits kennen.</strong> Sachet-Getränke sind in ganz ASEAN und auf Halal-Märkten eine etablierte Gewohnheit — das Verhalten muss niemandem beigebracht werden.</li>
      </ul>`,

    'Where a finished drink fits for distributors': 'Wo ein fertiges Getränk für Vertriebspartner passt',
    '<p>For a wholesaler or distributor, the real comparison is not capsule vs sachet — it is <em>ingredient vs finished product</em>. Buying raw powder means building a brand: formulation, stability, packaging design, certification, filling. Stocking a finished ready-to-drink product means the manufacturer has already done that work on a certified line, and the reseller\'s job is distribution.</p>':
      '<p>Für einen Großhändler oder Vertriebspartner ist der eigentliche Vergleich nicht Kapsel gegen Sachet — es ist Zutat gegen Fertigprodukt. Rohpulver zu kaufen bedeutet, eine Marke aufzubauen: Rezeptur, Stabilität, Verpackungsdesign, Zertifizierung, Abfüllung. Ein fertiges trinkfertiges Produkt zu führen bedeutet, dass der Hersteller diese Arbeit bereits auf einer zertifizierten Linie erledigt hat und die Aufgabe des Wiederverkäufers der Vertrieb ist.</p>',
    'UNI MAX, for example, is supplied retail-ready: a botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red and Black), 10&nbsp;g × 30 sachets per branded box, produced and filled at a HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP certified facility in Malaysia (Orient Biotech Sdn Bhd). Suggested entry MOQ starts at 12 boxes. See <a href="/wholesale/">wholesale &amp; distribution terms</a>.':
      'UNI MAX zum Beispiel wird verkaufsfertig geliefert: ein botanisches Lychee-Vitalitätsgetränk mit Tongkat Ali mit dreifacher Kraft (Gelb, Rot und Schwarz), 10&nbsp;g × 30 Sachets pro Markenbox, hergestellt und abgefüllt in einer nach HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 und HACCP zertifizierten Anlage in Malaysia (Orient Biotech Sdn Bhd). Die empfohlene Einstiegs-MOQ beginnt bei 12 Boxen. Siehe <a href="/wholesale/">Großhandels- &amp; Vertriebsbedingungen</a>.',

    'Format FAQ': 'Format-FAQ',
    'Common questions about Tongkat Ali formats.': 'Häufige Fragen zu Tongkat-Ali-Formaten.',

    '>What is a Tongkat Ali sachet drink?</a>': '>Was ist ein Tongkat-Ali-Sachet-Drink?</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Einen Tongkat-Ali-Lieferanten wählen</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Eigenes Geschäft oder Vertriebspartner?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX Großhandel &amp; Vertrieb</a>',

    'Looking at the drink format for your market?': 'Interessiert an diesem Getränkeformat für Ihren Markt?',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors. Tell us your market and volume and we will confirm terms.':
      'UNI MAX wird verkaufsfertig an Fachhändler, Großhändler und regionale Vertriebspartner geliefert. Teilen Sie uns Ihren Markt und Ihr Volumen mit, und wir bestätigen die Konditionen.',
  },
},

};
