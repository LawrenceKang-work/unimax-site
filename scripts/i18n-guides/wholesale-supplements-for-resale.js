/* guides/wholesale-supplements-for-resale/ 的五语译文(共享头尾见 _shared.js)。
 * key 必须与源页字节完全一致,由 gen-guide-pages.js 断言命中数。
 * 注:FAQ 问答由 buildFaqHtml/buildFaqJsonLd 整块重建,不在此 html 字典里重复(会 0 命中)。
 */

const TABLE_EN = `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>Typical gross margin</th><th>What you do for it</th></tr>
        </thead>
        <tbody>
          <tr><td>Reselling an established brand</td><td>15–35%</td><td>Buy wholesale, sell retail — the brand carries recognition and documentation</td></tr>
          <tr><td>White label</td><td>40–60%</td><td>Sell a factory formula under your name — you carry branding and compliance</td></tr>
          <tr><td>Private label / own brand</td><td>60–80%</td><td>Own the formula and brand — you carry everything, including the risk</td></tr>
        </tbody>
      </table>`;

const UL_SUPPLIERS_EN = `      <ul>
        <li><strong>Manufacturers</strong> — produce the goods themselves. Best pricing for bulk ingredient or white-label deals; usually pallet-scale minimums and no interest in small resellers.</li>
        <li><strong>Distributors</strong> — carry multiple brands from multiple factories. Convenient assortment, but you are one step removed from the source and the documentation.</li>
        <li><strong>Brand-direct wholesale</strong> — buying from the brand's own supply chain. Pricing sits between the two, and you get the brand's packaging, certifications and support directly. This is how UNI MAX supplies its partners: brand-owned product, produced at a named certified facility, shipped as retail-ready boxes.</li>
      </ul>`;

const OL_WHERE_EN = `      <ol>
        <li><strong>Direct from brands and manufacturers</strong> — the best trade terms usually come from the source. Look for a published wholesale page with MOQs and a named contact.</li>
        <li><strong>B2B marketplaces</strong> — good for comparing options and requesting samples; supplier quality varies widely, so verification is on you.</li>
        <li><strong>Trade shows</strong> — expensive to attend but the fastest way to meet many suppliers and handle products physically.</li>
        <li><strong>Industry directories</strong> — halal directories, national export directories and category listings; useful because listed suppliers have usually passed some form of vetting.</li>
      </ol>`;

const UL_STOCK_EN = `      <ul>
        <li><strong>Is demand growing or crowded?</strong> Capsules of common vitamins are a price war. Newer formats and newer hero ingredients leave room for margin.</li>
        <li><strong>Does the format differentiate on a shelf?</strong> A ready-to-drink sachet merchandises like a beverage and sells on convenience; another capsule bottle competes with a thousand identical bottles. (More on this: <a href="/guides/tongkat-ali-drink-vs-capsules/">drink vs capsules</a>.)</li>
        <li><strong>Can you get documentation your channel demands?</strong> Halal retail needs halal certification; general food retail wants GMP/HACCP behind the product. No documentation, no shelf.</li>
      </ul>`;

module.exports = {

zh: {
  meta: {
    title: '转售用批发补剂：买家指南 | UNI MAX',
    desc: '批发采购补剂并转售的运作方式——典型利润率区间、三类供应商、去哪里找他们、预期起订量，以及首笔大批量订单前如何核实品质。',
    ogTitle: '转售用批发补剂：买家指南 — UNI MAX',
    ogDesc: '利润率区间、供应商类型、去哪里找营养补剂批发供应商、典型起订量，以及首笔大批量订单前如何核实品质。',
  },
  breadcrumbName: '转售用批发补剂',
  articleHeadline: '转售用批发补剂：买家指南',
  articleDescription: '批发采购补剂并转售的运作方式——典型利润率区间、三类供应商、去哪里找他们、预期起订量，以及首笔大批量订单前如何核实品质。',
  faq: [
    { q: '转售补剂能拿到多少利润率？', a: '业内常引用的区间是：转售成熟品牌通常在 15–35%，白牌大约 40–60%，贴牌自有品牌 60–80%——都是渠道费、运费与关税之前的数字。你的真实利润取决于到岸成本，所以要按批发价加上你所在市场的运费和关税来算，而不是只看标价。' },
    { q: '去哪里能买到转售用的批发补剂？', a: '主要有四个渠道：直接从品牌方和生产厂购买（通常价格最好）、B2B 交易平台、行业展会，以及供应商名录。不管从哪里采购，下单前都要核实：问清楚是哪家工厂生产的、索取认证文件和样品，并以书面形式确认起订量、交货周期和运输条款。' },
    { q: '批发补剂典型的最低订购量是多少？', a: '因供应商类型而异。散装原料供应商的思维单位是公斤和托盘，成品品牌可以从小得多的规模起步。作为参考，UNI MAX 供应零售就绪成品盒，首笔订单建议：零售代销商 12–24 盒，批发伙伴 50–100 盒，区域分销商 300 盒以上。' },
  ],
  html: {
    "Buyer's Guide": '买家指南',
    "Wholesale supplements for resale: the buyer's guide.": '转售用批发补剂：买家指南。',
    "Buying supplements at wholesale and reselling them at retail is one of the most accessible product businesses there is — if you understand the margins, the supplier types and the checks that separate a good first order from an expensive lesson.":
      '以批发价买进补剂、以零售价卖出——这是门槛最低的实体产品生意之一，前提是你要懂利润率、供应商类型，以及能把"一笔靠谱的首单"和"一堂昂贵的教训"区分开来的那些检查。',

    'How the model works': '这个模式是怎么运作的',
    'Wholesale-for-resale is the oldest model in retail: buy in bulk at a discounted trade price, sell at retail price, keep the spread. In supplements it has one twist that matters — the products go <em>into people</em>, so quality documentation (who manufactured it, in which certified facility, with what testing) is part of the product, not paperwork. Resellers who treat documentation as an afterthought inherit their supplier\'s problems.':
      '批发转零售是零售业里最古老的模式：以折扣批发价大批量买进，以零售价卖出，赚中间差价。在补剂这个品类里有一个格外重要的变数——这些产品是要<em>吃进人体里</em>的，所以品质文件（谁生产的、在哪家认证工厂、做过什么检测）是产品的一部分，不是可有可无的文书工作。把文件当成事后补充的转售商，会把供应商的问题一并继承下来。',

    'The margins, honestly': '利润率，说实话',
    'Commonly quoted ranges in the trade, before channel fees, freight and duties:': '业内常引用的区间，都是渠道费、运费与关税之前的数字：',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>路径</th><th>典型毛利率</th><th>你要为此付出什么</th></tr>
        </thead>
        <tbody>
          <tr><td>转售成熟品牌</td><td>15–35%</td><td>批发买进、零售卖出——品牌自带辨识度和文件</td></tr>
          <tr><td>白牌</td><td>40–60%</td><td>用自己的名字卖工厂配方——品牌与合规由你负责</td></tr>
          <tr><td>贴牌代工／自有品牌</td><td>60–80%</td><td>配方与品牌都归你——一切都由你承担，风险也在内</td></tr>
        </tbody>
      </table>`,
    'The pattern: <strong>margin is payment for risk carried</strong>. Higher-margin routes hand you the compliance, branding and unsold-inventory risk that the lower-margin routes leave with the brand owner. Neither is wrong — but calculate from your <em>landed cost</em> (wholesale price + freight + duties for your market), not the list price, or the spreadsheet will flatter you.':
      '规律是：<strong>利润率是为你所承担的风险付的钱</strong>。利润率更高的路径，把合规、品牌与滞销库存的风险都交给了你，而利润率更低的路径则把这些风险留在了品牌方那里。两者都没有错——但一定要按<em>到岸成本</em>（批发价+你所在市场的运费+关税）来算，而不是按标价算，否则表格会给你虚假的好看数字。',

    'The three types of suppliers you will meet': '你会遇到的三类供应商',
    [UL_SUPPLIERS_EN]: `      <ul>
        <li><strong>生产厂</strong>——自己生产货品。散装原料或白牌交易的价格最好，但通常起订量以托盘为单位，对小规模转售商不太感兴趣。</li>
        <li><strong>分销商</strong>——同时代理多家工厂的多个品牌。品类齐全方便，但你和源头、和文件之间隔了一层。</li>
        <li><strong>品牌直供批发</strong>——直接从品牌自己的供应链买进。价格介于前两者之间，你能直接拿到品牌的包装、认证与支持。UNI MAX 就是这样为合作伙伴供货的：品牌自有产品，在具名的认证工厂生产，以零售就绪成品盒发货。</li>
      </ul>`,

    'Where to find nutrition supplements wholesale suppliers': '去哪里找营养补剂批发供应商',
    'Four places, in rough order of pricing quality:': '大致按价格优劣排序，有四个地方：',
    [OL_WHERE_EN]: `      <ol>
        <li><strong>直接找品牌方和生产厂</strong>——最好的交易条款通常来自源头。找有公开批发页面、写明起订量与具名联系人的品牌。</li>
        <li><strong>B2B 交易平台</strong>——适合横向比较选项、索取样品，但供应商品质参差不齐，核实的责任在你自己身上。</li>
        <li><strong>行业展会</strong>——参展成本高，但是最快能见到大量供应商、亲手接触产品的方式。</li>
        <li><strong>行业名录</strong>——清真名录、各国出口名录、品类清单，通常有一定的审核门槛，值得参考。</li>
      </ol>`,
    'Wherever you source, the checks are the same: which facility produces the product, what that facility is certified for, samples before bulk, and MOQ, lead time and shipping terms in writing. The full six-point checklist is here: <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a>.':
      '不管从哪里采购，要核实的东西都一样：哪家工厂生产的、该工厂持有什么认证、大批量前先要样品，以及以书面形式确认起订量、交货周期和运输条款。完整的六项清单在这里：<a href="/guides/tongkat-ali-drink-supplier-checklist/">如何评估一家供应商</a>。',

    'Choosing what to stock: category before product': '选品之前先选品类',
    'Most first-time resellers pick a product they like. Experienced buyers pick a <em>category with momentum and a format gap</em>, then find the best product in it. Three questions that do most of the work:':
      '大多数第一次做转售的人，选的是自己喜欢的产品。有经验的买家选的是<em>有增长势头、又存在形态空白的品类</em>，然后在这个品类里找最好的产品。三个问题基本能帮你做完这个判断：',
    [UL_STOCK_EN]: `      <ul>
        <li><strong>需求是在增长，还是已经拥挤？</strong> 常见维生素的胶囊是一场价格战。更新的形态和更新的主打成分，还留有利润空间。</li>
        <li><strong>这个形态在货架上有没有差异化？</strong> 即饮独立包的陈列方式像饮料，靠便利性取胜，另一瓶胶囊只是在和成千上万瓶一模一样的胶囊竞争。（详见：<a href="/guides/tongkat-ali-drink-vs-capsules/">饮品 vs 胶囊</a>。）</li>
        <li><strong>你能拿到渠道要求的文件吗？</strong> 清真零售需要清真认证，一般食品零售希望产品背后有 GMP／HACCP。没有文件，就上不了货架。</li>
      </ul>`,
    'This is why the men\'s vitality / energy drink corner of the market is an interesting entry category: recognisable hero ingredients, a beverage format that stands out beside capsule walls, and — in UNI MAX\'s case — a finished product with HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP behind it (registered to the producing facility, Orient Biotech Sdn Bhd, Malaysia).':
      '这也是为什么男性活力／能量饮料这个市场角落是个有意思的入门品类：主打成分辨识度高，饮料形态在一整墙胶囊瓶里很显眼——就 UNI MAX 而言，这还是一款背后有 HALAL（JAKIM）、GMP、MeSTI、ISO&nbsp;9001 与 HACCP 认证支撑的成品（登记在生产工厂 Orient Biotech Sdn Bhd，马来西亚，名下）。',

    'What a sensible first order looks like': '一份靠谱的首单大概是什么样子',
    'Bulk ingredient suppliers want pallets. Finished-product brands can start with a shelf trial. As a concrete reference: UNI MAX suggests <strong>12–24 boxes</strong> (30 × 10&nbsp;g ready-to-drink sachets each) for a first stockist order, 50–100 boxes for wholesale partners and 300+ for regional distributors — actual quantities confirmed on enquiry, terms discussed directly over WhatsApp with a same-day reply. A first position costs a trial, not a container.':
      '散装原料供应商要的是整托盘。成品品牌可以从一次货架试销起步。给一个具体参照：UNI MAX 首笔零售代销商订单建议 <strong>12–24 盒</strong>（每盒 30 × 10&nbsp;克即饮独立包），批发伙伴 50–100 盒，区域分销商 300 盒以上——实际数量以询价确认，条款直接通过 WhatsApp 沟通，当天回复。踏入这个产品的第一步，花的是一次试销的成本，不是一整个货柜的成本。',

    'Resale FAQ': '转售常见问题',
    'Questions resellers ask before a first bulk order.': '转售商在下第一笔大批量订单前常问的问题。',

    '>Distribute UNI MAX in Europe — for distributors</a>': '>在欧洲分销 UNI MAX——面向分销商</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>如何甄选东革阿里供应商</a>',
    '>Start a supplement business — or become a distributor?</a>': '>自创补剂品牌——还是做分销商？</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>东革阿里饮品 vs 胶囊：如何选对形态</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX 批发与分销</a>',

    'Want a shelf-ready product to resell?': '想要一款货架就绪的产品来转售？',
    'UNI MAX supplies retail-ready boxes to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX 向零售商、批发商与区域分销商供应零售就绪成品盒——建议起订量 12 盒起。告诉我们你的市场，我们会为你确认合作条款。',
  },
},

ms: {
  meta: {
    title: 'Suplemen Borong untuk Dijual Semula: Panduan Pembeli | UNI MAX',
    desc: 'Bagaimana pembelian suplemen borong untuk dijual semula berfungsi: julat margin biasa, tiga jenis pembekal, di mana mencarinya, MOQ yang dijangka dan cara mengesahkan kualiti sebelum pesanan pukal pertama anda.',
    ogTitle: 'Suplemen Borong untuk Dijual Semula: Panduan Pembeli — UNI MAX',
    ogDesc: 'Julat margin, jenis pembekal, di mana mencari pembekal borong suplemen pemakanan, MOQ biasa dan cara mengesahkan kualiti sebelum pesanan pukal pertama.',
  },
  breadcrumbName: 'Suplemen Borong untuk Dijual Semula',
  articleHeadline: 'Suplemen Borong untuk Dijual Semula: Panduan Pembeli',
  articleDescription: 'Bagaimana pembelian suplemen borong untuk dijual semula berfungsi: julat margin biasa, tiga jenis pembekal, di mana mencarinya, MOQ yang dijangka dan cara mengesahkan kualiti sebelum pesanan pukal pertama.',
  faq: [
    { q: 'Margin apa yang boleh saya jangka daripada menjual semula suplemen?', a: 'Julat yang biasa disebut dalam perdagangan: menjual semula jenama mantap biasanya 15–35%, label putih sekitar 40–60%, dan label persendirian 60–80% — sebelum yuran saluran, penghantaran dan duti. Margin sebenar anda bergantung pada kos mendarat, jadi kira daripada harga borong ditambah tambang dan kastam untuk pasaran anda, bukan hanya harga senarai.' },
    { q: 'Di mana saya boleh membeli suplemen borong untuk dijual semula?', a: 'Empat tempat utama: terus daripada jenama dan pengilang (biasanya tingkat harga terbaik), pasar B2B, ekspo dagangan industri, dan direktori pembekal. Di mana sahaja anda mendapat bekalan, sahkan sebelum komited: tanya kemudahan mana menghasilkan produk, minta dokumen pensijilan dan sampel, dan sahkan MOQ, masa penghantaran dan terma penghantaran secara bertulis.' },
    { q: 'Apakah pesanan minimum biasa untuk suplemen borong?', a: 'Ia berbeza mengikut jenis pembekal. Pembekal bahan pukal berfikir dalam kilogram dan palet; jenama produk siap boleh bermula jauh lebih kecil. Sebagai titik rujukan, UNI MAX membekalkan kotak sedia-runcit dengan pesanan pertama yang dicadangkan 12–24 kotak untuk penstok, 50–100 untuk rakan pemborongan dan 300+ untuk pengedar serantau.' },
  ],
  html: {
    "Buyer's Guide": 'Panduan Pembeli',
    "Wholesale supplements for resale: the buyer's guide.": 'Suplemen borong untuk dijual semula: panduan pembeli.',
    "Buying supplements at wholesale and reselling them at retail is one of the most accessible product businesses there is — if you understand the margins, the supplier types and the checks that separate a good first order from an expensive lesson.":
      'Membeli suplemen secara borong dan menjualnya semula secara runcit adalah salah satu perniagaan produk yang paling mudah diakses — jika anda memahami margin, jenis pembekal dan semakan yang memisahkan pesanan pertama yang baik daripada pengajaran yang mahal.',

    'How the model works': 'Bagaimana model ini berfungsi',
    'Wholesale-for-resale is the oldest model in retail: buy in bulk at a discounted trade price, sell at retail price, keep the spread. In supplements it has one twist that matters — the products go <em>into people</em>, so quality documentation (who manufactured it, in which certified facility, with what testing) is part of the product, not paperwork. Resellers who treat documentation as an afterthought inherit their supplier\'s problems.':
      'Borong-untuk-jual-semula adalah model tertua dalam runcit: beli secara pukal pada harga perdagangan berdiskaun, jual pada harga runcit, simpan lebihan. Dalam suplemen ia mempunyai satu lekukan yang penting — produk itu masuk <em>ke dalam tubuh orang</em>, jadi dokumentasi kualiti (siapa yang mengilangnya, di kemudahan bertauliah mana, dengan ujian apa) adalah sebahagian daripada produk, bukan kertas kerja. Penjual semula yang menganggap dokumentasi sebagai renungan kemudian akan mewarisi masalah pembekal mereka.',

    'The margins, honestly': 'Margin, secara jujur',
    'Commonly quoted ranges in the trade, before channel fees, freight and duties:': 'Julat yang biasa disebut dalam perdagangan, sebelum yuran saluran, tambang dan duti:',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Laluan</th><th>Margin kasar biasa</th><th>Apa yang anda lakukan untuknya</th></tr>
        </thead>
        <tbody>
          <tr><td>Menjual semula jenama mantap</td><td>15–35%</td><td>Beli borong, jual runcit — jenama membawa pengiktirafan dan dokumentasi</td></tr>
          <tr><td>Label putih</td><td>40–60%</td><td>Jual formula kilang di bawah nama anda — anda membawa penjenamaan dan pematuhan</td></tr>
          <tr><td>Label persendirian / jenama sendiri</td><td>60–80%</td><td>Miliki formula dan jenama — anda membawa segalanya, termasuk risiko</td></tr>
        </tbody>
      </table>`,
    'The pattern: <strong>margin is payment for risk carried</strong>. Higher-margin routes hand you the compliance, branding and unsold-inventory risk that the lower-margin routes leave with the brand owner. Neither is wrong — but calculate from your <em>landed cost</em> (wholesale price + freight + duties for your market), not the list price, or the spreadsheet will flatter you.':
      'Corak: <strong>margin adalah bayaran untuk risiko yang dibawa</strong>. Laluan margin lebih tinggi menyerahkan kepada anda pematuhan, penjenamaan dan risiko inventori tidak terjual yang laluan margin lebih rendah tinggalkan kepada pemilik jenama. Kedua-duanya tidak salah — tetapi kira daripada <em>kos mendarat</em> anda (harga borong + tambang + duti untuk pasaran anda), bukan harga senarai, atau hamparan anda akan menyanjung anda.',

    'The three types of suppliers you will meet': 'Tiga jenis pembekal yang akan anda temui',
    [UL_SUPPLIERS_EN]: `      <ul>
        <li><strong>Pengilang</strong> — menghasilkan barangan sendiri. Harga terbaik untuk tawaran bahan pukal atau label putih; biasanya minimum bersaiz palet dan tiada minat pada penjual semula kecil.</li>
        <li><strong>Pengedar</strong> — membawa pelbagai jenama daripada pelbagai kilang. Pemilihan yang mudah, tetapi anda satu langkah terpisah daripada sumber dan dokumentasi.</li>
        <li><strong>Borongan langsung jenama</strong> — membeli daripada rantaian bekalan jenama sendiri. Harga berada di antara kedua-duanya, dan anda mendapat pembungkusan, pensijilan dan sokongan jenama secara langsung. Beginilah UNI MAX membekalkan rakan kongsinya: produk milik jenama, dihasilkan di kemudahan bertauliah bernama, dihantar sebagai kotak sedia-runcit.</li>
      </ul>`,

    'Where to find nutrition supplements wholesale suppliers': 'Di mana mencari pembekal borong suplemen pemakanan',
    'Four places, in rough order of pricing quality:': 'Empat tempat, kira-kira mengikut susunan kualiti harga:',
    [OL_WHERE_EN]: `      <ol>
        <li><strong>Terus daripada jenama dan pengilang</strong> — terma perdagangan terbaik biasanya datang daripada sumber. Cari halaman borong yang diterbitkan dengan MOQ dan kenalan bernama.</li>
        <li><strong>Pasar B2B</strong> — baik untuk membandingkan pilihan dan meminta sampel; kualiti pembekal berbeza-beza dengan ketara, jadi pengesahan adalah tanggungjawab anda.</li>
        <li><strong>Ekspo dagangan</strong> — mahal untuk dihadiri tetapi cara paling pantas untuk bertemu ramai pembekal dan mengendalikan produk secara fizikal.</li>
        <li><strong>Direktori industri</strong> — direktori halal, direktori eksport kebangsaan dan senarai kategori; berguna kerana pembekal yang disenaraikan biasanya telah lulus beberapa bentuk penapisan.</li>
      </ol>`,
    'Wherever you source, the checks are the same: which facility produces the product, what that facility is certified for, samples before bulk, and MOQ, lead time and shipping terms in writing. The full six-point checklist is here: <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a>.':
      'Di mana sahaja anda mendapat bekalan, semakannya sama: kemudahan mana menghasilkan produk, apa kemudahan itu bertauliah untuk, sampel sebelum pukal, dan MOQ, masa penghantaran dan terma penghantaran secara bertulis. Senarai semak enam mata penuh di sini: <a href="/guides/tongkat-ali-drink-supplier-checklist/">cara menilai pembekal</a>.',

    'Choosing what to stock: category before product': 'Memilih apa yang hendak distok: kategori sebelum produk',
    'Most first-time resellers pick a product they like. Experienced buyers pick a <em>category with momentum and a format gap</em>, then find the best product in it. Three questions that do most of the work:':
      'Kebanyakan penjual semula kali pertama memilih produk yang mereka suka. Pembeli berpengalaman memilih <em>kategori dengan momentum dan jurang format</em>, kemudian mencari produk terbaik di dalamnya. Tiga soalan yang melakukan sebahagian besar kerja:',
    [UL_STOCK_EN]: `      <ul>
        <li><strong>Adakah permintaan berkembang atau sesak?</strong> Kapsul vitamin biasa adalah perang harga. Format lebih baharu dan bahan hero lebih baharu meninggalkan ruang untuk margin.</li>
        <li><strong>Adakah format itu membezakan di rak?</strong> Sachet sedia minum diperdagangkan seperti minuman dan menjual atas kemudahan; botol kapsul lain bersaing dengan seribu botol yang serupa. (Lebih lanjut mengenai ini: <a href="/guides/tongkat-ali-drink-vs-capsules/">minuman vs kapsul</a>.)</li>
        <li><strong>Bolehkah anda mendapat dokumentasi yang dituntut saluran anda?</strong> Runcit halal memerlukan pensijilan halal; runcit makanan am mahukan GMP/HACCP di sebalik produk. Tiada dokumentasi, tiada rak.</li>
      </ul>`,
    'This is why the men\'s vitality / energy drink corner of the market is an interesting entry category: recognisable hero ingredients, a beverage format that stands out beside capsule walls, and — in UNI MAX\'s case — a finished product with HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP behind it (registered to the producing facility, Orient Biotech Sdn Bhd, Malaysia).':
      'Inilah sebabnya sudut minuman vitaliti / tenaga lelaki dalam pasaran adalah kategori kemasukan yang menarik: bahan hero yang boleh dikenali, format minuman yang menonjol di sebelah dinding kapsul, dan — dalam kes UNI MAX — produk siap dengan HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 dan HACCP di sebaliknya (didaftarkan kepada kemudahan pengeluar, Orient Biotech Sdn Bhd, Malaysia).',

    'What a sensible first order looks like': 'Bagaimana rupa pesanan pertama yang munasabah',
    'Bulk ingredient suppliers want pallets. Finished-product brands can start with a shelf trial. As a concrete reference: UNI MAX suggests <strong>12–24 boxes</strong> (30 × 10&nbsp;g ready-to-drink sachets each) for a first stockist order, 50–100 boxes for wholesale partners and 300+ for regional distributors — actual quantities confirmed on enquiry, terms discussed directly over WhatsApp with a same-day reply. A first position costs a trial, not a container.':
      'Pembekal bahan pukal mahukan palet. Jenama produk siap boleh bermula dengan percubaan rak. Sebagai rujukan konkrit: UNI MAX mencadangkan <strong>12–24 kotak</strong> (masing-masing 30 × 10&nbsp;g sachet sedia minum) untuk pesanan penstok pertama, 50–100 kotak untuk rakan pemborongan dan 300+ untuk pengedar serantau — kuantiti sebenar disahkan semasa pertanyaan, terma dibincangkan terus melalui WhatsApp dengan balasan hari yang sama. Kedudukan pertama kosnya setanding percubaan, bukan kontena.',

    'Resale FAQ': 'Soalan Lazim Jualan Semula',
    'Questions resellers ask before a first bulk order.': 'Soalan yang ditanya penjual semula sebelum pesanan pukal pertama.',

    '>Distribute UNI MAX in Europe — for distributors</a>': '>Edarkan UNI MAX di Eropah — untuk pengedar</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Memilih pembekal Tongkat Ali</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Mulakan perniagaan suplemen — atau jadi pengedar?</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Minuman Tongkat Ali vs kapsul: memilih format yang tepat</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Pemborongan &amp; pengedaran UNI MAX</a>',

    'Want a shelf-ready product to resell?': 'Mahukan produk sedia-rak untuk dijual semula?',
    'UNI MAX supplies retail-ready boxes to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX membekalkan kotak sedia-runcit kepada penstok, pemborong dan pengedar serantau — kemasukan dicadangkan dari 12 kotak. Beritahu kami pasaran anda dan kami akan sahkan terma.',
  },
},

pl: {
  meta: {
    title: 'Suplementy Hurtowe do Odsprzedaży: Przewodnik Kupującego | UNI MAX',
    desc: 'Jak działa zakup suplementów hurtowych do odsprzedaży: typowe zakresy marż, trzy rodzaje dostawców, gdzie ich znaleźć, jakich MOQ się spodziewać i jak zweryfikować jakość przed pierwszym dużym zamówieniem.',
    ogTitle: 'Suplementy Hurtowe do Odsprzedaży: Przewodnik Kupującego — UNI MAX',
    ogDesc: 'Zakresy marż, rodzaje dostawców, gdzie znaleźć hurtowych dostawców suplementów odżywczych, typowe MOQ i jak zweryfikować jakość przed pierwszym dużym zamówieniem.',
  },
  breadcrumbName: 'Suplementy Hurtowe do Odsprzedaży',
  articleHeadline: 'Suplementy Hurtowe do Odsprzedaży: Przewodnik Kupującego',
  articleDescription: 'Jak działa zakup suplementów hurtowych do odsprzedaży: typowe zakresy marż, trzy rodzaje dostawców, gdzie ich znaleźć, jakich MOQ się spodziewać i jak zweryfikować jakość przed pierwszym dużym zamówieniem.',
  faq: [
    { q: 'Jakiej marży mogę się spodziewać, odsprzedając suplementy?', a: 'Powszechnie cytowane w branży zakresy: odsprzedaż ugruntowanych marek to zwykle 15–35%, white label około 40–60%, a private label 60–80% — przed opłatami kanału, wysyłką i cłami. Twoja rzeczywista marża zależy od kosztu dostarczenia, więc licz od ceny hurtowej plus fracht i cło dla twojego rynku, a nie tylko od ceny katalogowej.' },
    { q: 'Gdzie mogę kupić hurtowe suplementy do odsprzedaży?', a: 'Cztery główne miejsca: bezpośrednio od marek i producentów (zwykle najlepszy poziom cenowy), platformy B2B, targi branżowe i katalogi dostawców. Niezależnie od źródła, zweryfikuj przed zobowiązaniem: zapytaj, który zakład produkuje produkt, poproś o dokumenty certyfikacji i próbki oraz potwierdź MOQ, czas realizacji i warunki wysyłki na piśmie.' },
    { q: 'Jakie jest typowe minimalne zamówienie dla suplementów hurtowych?', a: 'To zależy od typu dostawcy. Dostawcy surowców masowych myślą w kilogramach i paletach, marki produktów gotowych mogą zaczynać od znacznie mniejszej skali. Jako punkt odniesienia, UNI MAX dostarcza pudełka gotowe do sprzedaży z sugerowanym pierwszym zamówieniem 12–24 pudełek dla punktu sprzedaży, 50–100 dla partnerów hurtowych i 300+ dla dystrybutorów regionalnych.' },
  ],
  html: {
    "Buyer's Guide": 'Przewodnik kupującego',
    "Wholesale supplements for resale: the buyer's guide.": 'Suplementy hurtowe do odsprzedaży: przewodnik kupującego.',
    "Buying supplements at wholesale and reselling them at retail is one of the most accessible product businesses there is — if you understand the margins, the supplier types and the checks that separate a good first order from an expensive lesson.":
      'Kupowanie suplementów hurtowo i odsprzedawanie ich detalicznie to jeden z najbardziej dostępnych biznesów produktowych — pod warunkiem, że rozumiesz marże, rodzaje dostawców i kontrole, które oddzielają dobre pierwsze zamówienie od kosztownej lekcji.',

    'How the model works': 'Jak działa ten model',
    'Wholesale-for-resale is the oldest model in retail: buy in bulk at a discounted trade price, sell at retail price, keep the spread. In supplements it has one twist that matters — the products go <em>into people</em>, so quality documentation (who manufactured it, in which certified facility, with what testing) is part of the product, not paperwork. Resellers who treat documentation as an afterthought inherit their supplier\'s problems.':
      'Hurt-do-odsprzedaży to najstarszy model w handlu detalicznym: kup hurtowo po obniżonej cenie handlowej, sprzedaj po cenie detalicznej, zachowaj różnicę. W suplementach jest jeden istotny niuans — produkty trafiają <em>do organizmów ludzi</em>, więc dokumentacja jakości (kto to wyprodukował, w jakim certyfikowanym zakładzie, z jakimi badaniami) jest częścią produktu, a nie papierkową robotą. Odsprzedawcy, którzy traktują dokumentację jako coś dodatkowego, dziedziczą problemy swojego dostawcy.',

    'The margins, honestly': 'Marże, szczerze mówiąc',
    'Commonly quoted ranges in the trade, before channel fees, freight and duties:': 'Powszechnie cytowane w branży zakresy, przed opłatami kanału, frachtem i cłami:',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Droga</th><th>Typowa marża brutto</th><th>Co za to robisz</th></tr>
        </thead>
        <tbody>
          <tr><td>Odsprzedaż ugruntowanej marki</td><td>15–35%</td><td>Kupuj hurtowo, sprzedawaj detalicznie — marka niesie rozpoznawalność i dokumentację</td></tr>
          <tr><td>White label</td><td>40–60%</td><td>Sprzedawaj recepturę fabryki pod swoją nazwą — ty odpowiadasz za markę i zgodność</td></tr>
          <tr><td>Private label / własna marka</td><td>60–80%</td><td>Posiadaj recepturę i markę — bierzesz na siebie wszystko, w tym ryzyko</td></tr>
        </tbody>
      </table>`,
    'The pattern: <strong>margin is payment for risk carried</strong>. Higher-margin routes hand you the compliance, branding and unsold-inventory risk that the lower-margin routes leave with the brand owner. Neither is wrong — but calculate from your <em>landed cost</em> (wholesale price + freight + duties for your market), not the list price, or the spreadsheet will flatter you.':
      'Wzorzec: <strong>marża to zapłata za ponoszone ryzyko</strong>. Drogi z wyższą marżą przekazują tobie zgodność, markę i ryzyko niesprzedanego zapasu, które drogi z niższą marżą pozostawiają właścicielowi marki. Żadna z nich nie jest błędna — ale licz od swojego <em>kosztu dostarczenia</em> (cena hurtowa + fracht + cła dla twojego rynku), a nie od ceny katalogowej, bo inaczej arkusz kalkulacyjny cię oszuka.',

    'The three types of suppliers you will meet': 'Trzy typy dostawców, które napotkasz',
    [UL_SUPPLIERS_EN]: `      <ul>
        <li><strong>Producenci</strong> — sami wytwarzają towar. Najlepsze ceny dla transakcji na surowce masowe lub white label; zwykle minima na skalę palet i brak zainteresowania małymi odsprzedawcami.</li>
        <li><strong>Dystrybutorzy</strong> — prowadzą wiele marek z wielu fabryk. Wygodny asortyment, ale jesteś o jeden krok dalej od źródła i dokumentacji.</li>
        <li><strong>Hurt bezpośredni od marki</strong> — zakup z własnego łańcucha dostaw marki. Cena znajduje się pomiędzy dwoma poprzednimi, a ty otrzymujesz bezpośrednio opakowanie, certyfikaty i wsparcie marki. Tak właśnie UNI MAX zaopatruje swoich partnerów: produkt należący do marki, produkowany w nazwanym certyfikowanym zakładzie, wysyłany jako pudełka gotowe do sprzedaży.</li>
      </ul>`,

    'Where to find nutrition supplements wholesale suppliers': 'Gdzie znaleźć hurtowych dostawców suplementów odżywczych',
    'Four places, in rough order of pricing quality:': 'Cztery miejsca, w przybliżonej kolejności jakości cenowej:',
    [OL_WHERE_EN]: `      <ol>
        <li><strong>Bezpośrednio od marek i producentów</strong> — najlepsze warunki handlowe zwykle pochodzą ze źródła. Szukaj opublikowanej strony hurtowej z MOQ i nazwanym kontaktem.</li>
        <li><strong>Platformy B2B</strong> — dobre do porównywania opcji i zamawiania próbek; jakość dostawców bardzo się różni, więc weryfikacja spoczywa na tobie.</li>
        <li><strong>Targi branżowe</strong> — kosztowne uczestnictwo, ale najszybszy sposób na poznanie wielu dostawców i fizyczne obejrzenie produktów.</li>
        <li><strong>Katalogi branżowe</strong> — katalogi halal, krajowe katalogi eksportowe i listy kategorii; przydatne, bo wymienieni dostawcy zwykle przeszli jakąś formę weryfikacji.</li>
      </ol>`,
    'Wherever you source, the checks are the same: which facility produces the product, what that facility is certified for, samples before bulk, and MOQ, lead time and shipping terms in writing. The full six-point checklist is here: <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a>.':
      'Niezależnie od źródła, kontrole są takie same: który zakład produkuje produkt, do czego ten zakład jest certyfikowany, próbki przed dużym zamówieniem oraz MOQ, czas realizacji i warunki wysyłki na piśmie. Pełna lista kontrolna z sześciu punktów jest tutaj: <a href="/guides/tongkat-ali-drink-supplier-checklist/">jak ocenić dostawcę</a>.',

    'Choosing what to stock: category before product': 'Wybór asortymentu: kategoria przed produktem',
    'Most first-time resellers pick a product they like. Experienced buyers pick a <em>category with momentum and a format gap</em>, then find the best product in it. Three questions that do most of the work:':
      'Większość początkujących odsprzedawców wybiera produkt, który im się podoba. Doświadczeni kupujący wybierają <em>kategorię z momentum i luką formatu</em>, a następnie znajdują w niej najlepszy produkt. Trzy pytania, które wykonują większość pracy:',
    [UL_STOCK_EN]: `      <ul>
        <li><strong>Czy popyt rośnie, czy jest przepełniony?</strong> Kapsułki popularnych witamin to wojna cenowa. Nowsze formaty i nowsze składniki flagowe pozostawiają miejsce na marżę.</li>
        <li><strong>Czy format wyróżnia się na półce?</strong> Saszetka gotowa do picia jest merchandisingowana jak napój i sprzedaje się na wygodzie; kolejna butelka kapsułek konkuruje z tysiącem identycznych butelek. (Więcej na ten temat: <a href="/guides/tongkat-ali-drink-vs-capsules/">napój vs kapsułki</a>.)</li>
        <li><strong>Czy możesz zdobyć dokumentację wymaganą przez twój kanał?</strong> Handel halal wymaga certyfikacji halal, ogólny handel spożywczy chce mieć za produktem GMP/HACCP. Bez dokumentacji nie ma miejsca na półce.</li>
      </ul>`,
    'This is why the men\'s vitality / energy drink corner of the market is an interesting entry category: recognisable hero ingredients, a beverage format that stands out beside capsule walls, and — in UNI MAX\'s case — a finished product with HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP behind it (registered to the producing facility, Orient Biotech Sdn Bhd, Malaysia).':
      'Dlatego zakątek rynku napojów witalnościowych / energetycznych dla mężczyzn jest interesującą kategorią wejściową: rozpoznawalne składniki flagowe, format napoju, który wyróżnia się obok ścian kapsułek, i — w przypadku UNI MAX — produkt gotowy z HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 i HACCP w tle (zarejestrowanymi na zakład produkcyjny, Orient Biotech Sdn Bhd, Malezja).',

    'What a sensible first order looks like': 'Jak wygląda rozsądne pierwsze zamówienie',
    'Bulk ingredient suppliers want pallets. Finished-product brands can start with a shelf trial. As a concrete reference: UNI MAX suggests <strong>12–24 boxes</strong> (30 × 10&nbsp;g ready-to-drink sachets each) for a first stockist order, 50–100 boxes for wholesale partners and 300+ for regional distributors — actual quantities confirmed on enquiry, terms discussed directly over WhatsApp with a same-day reply. A first position costs a trial, not a container.':
      'Dostawcy surowców masowych chcą palet. Marki produktów gotowych mogą zacząć od próby na półce. Jako konkretny punkt odniesienia: UNI MAX sugeruje <strong>12–24 pudełka</strong> (po 30 × 10&nbsp;g saszetek gotowych do picia) na pierwsze zamówienie punktu sprzedaży, 50–100 pudełek dla partnerów hurtowych i 300+ dla dystrybutorów regionalnych — rzeczywiste ilości potwierdzane przy zapytaniu, warunki omawiane bezpośrednio przez WhatsApp z odpowiedzią tego samego dnia. Pierwsza pozycja kosztuje tyle, co próba, a nie kontener.',

    'Resale FAQ': 'FAQ dotyczące odsprzedaży',
    'Questions resellers ask before a first bulk order.': 'Pytania zadawane przez odsprzedawców przed pierwszym dużym zamówieniem.',

    '>Distribute UNI MAX in Europe — for distributors</a>': '>Dystrybuuj UNI MAX w Europie — dla dystrybutorów</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Jak wybrać dostawcę Tongkat Ali</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Założyć firmę suplementową — czy zostać dystrybutorem?</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Napój z Tongkat Ali a kapsułki: jak wybrać właściwy format</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Hurt i dystrybucja UNI MAX</a>',

    'Want a shelf-ready product to resell?': 'Chcesz produkt gotowy do sprzedaży, by go odsprzedawać?',
    'UNI MAX supplies retail-ready boxes to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX dostarcza pudełka gotowe do sprzedaży detalicznej dla punktów sprzedaży, hurtowników i dystrybutorów regionalnych — sugerowany start od 12 pudełek. Podaj nam swój rynek, a potwierdzimy warunki.',
  },
},

nl: {
  meta: {
    title: 'Groothandelssupplementen voor Wederverkoop: de Koopgids | UNI MAX',
    desc: 'Hoe het kopen van groothandelssupplementen voor wederverkoop werkt: typische margebereiken, de drie soorten leveranciers, waar u ze vindt, welke MOQ\'s u kunt verwachten en hoe u kwaliteit verifieert vóór uw eerste bulkbestelling.',
    ogTitle: 'Groothandelssupplementen voor Wederverkoop: de Koopgids — UNI MAX',
    ogDesc: 'Margebereiken, leveranciertypen, waar u groothandelsleveranciers van voedingssupplementen vindt, typische MOQ\'s en hoe u kwaliteit verifieert vóór een eerste bulkbestelling.',
  },
  breadcrumbName: 'Groothandelssupplementen voor Wederverkoop',
  articleHeadline: 'Groothandelssupplementen voor Wederverkoop: de Koopgids',
  articleDescription: 'Hoe het kopen van groothandelssupplementen voor wederverkoop werkt: typische margebereiken, de drie soorten leveranciers, waar u ze vindt, welke MOQ\'s u kunt verwachten en hoe u kwaliteit verifieert vóór uw eerste bulkbestelling.',
  faq: [
    { q: 'Welke marge kan ik verwachten bij het doorverkopen van supplementen?', a: 'Vaak genoemde bereiken in de branche: doorverkoop van gevestigde merken loopt doorgaans op 15–35%, white label rond 40–60%, en private label 60–80% — vóór kanaalkosten, verzending en invoerrechten. Uw werkelijke marge hangt af van de landed cost, dus reken vanaf de groothandelsprijs plus vracht en douane voor uw markt, niet alleen vanaf de catalogusprijs.' },
    { q: 'Waar kan ik groothandelssupplementen kopen voor wederverkoop?', a: 'Vier belangrijke plekken: rechtstreeks bij merken en fabrikanten (meestal het beste prijsniveau), B2B-marktplaatsen, brancheshows en leveranciersgidsen. Waar u ook inkoopt, verifieer voordat u zich vastlegt: vraag welke faciliteit het product produceert, vraag certificeringsdocumenten en monsters aan, en bevestig MOQ, levertijd en verzendvoorwaarden schriftelijk.' },
    { q: 'Wat is een typische minimumbestelling voor groothandelssupplementen?', a: 'Dit varieert per leverancierstype. Leveranciers van bulkgrondstoffen denken in kilogrammen en pallets; merken met kant-en-klare producten kunnen veel kleiner beginnen. Als referentiepunt levert UNI MAX verkoopklare dozen met een voorgestelde eerste bestelling van 12–24 dozen voor een retailer, 50–100 voor groothandelspartners en 300+ voor regionale distributeurs.' },
  ],
  html: {
    "Buyer's Guide": 'Kopersgids',
    "Wholesale supplements for resale: the buyer's guide.": 'Groothandelssupplementen voor wederverkoop: de koopgids.',
    "Buying supplements at wholesale and reselling them at retail is one of the most accessible product businesses there is — if you understand the margins, the supplier types and the checks that separate a good first order from an expensive lesson.":
      'Supplementen groothandelsgewijs inkopen en met winst doorverkopen in de detailhandel is een van de meest toegankelijke productbedrijven die er zijn — als u de marges, leverancierstypen en controles begrijpt die een goede eerste bestelling scheiden van een dure les.',

    'How the model works': 'Hoe het model werkt',
    'Wholesale-for-resale is the oldest model in retail: buy in bulk at a discounted trade price, sell at retail price, keep the spread. In supplements it has one twist that matters — the products go <em>into people</em>, so quality documentation (who manufactured it, in which certified facility, with what testing) is part of the product, not paperwork. Resellers who treat documentation as an afterthought inherit their supplier\'s problems.':
      'Groothandel-voor-wederverkoop is het oudste model in de detailhandel: koop in bulk tegen een gereduceerde handelsprijs, verkoop tegen retailprijs, houd het verschil. Bij supplementen zit er één belangrijke twist in — de producten gaan <em>het lichaam in</em>, dus kwaliteitsdocumentatie (wie het heeft geproduceerd, in welke gecertificeerde faciliteit, met welke tests) maakt deel uit van het product, geen bijzaak. Wederverkopers die documentatie als bijkomstig beschouwen, erven de problemen van hun leverancier.',

    'The margins, honestly': 'De marges, eerlijk gezegd',
    'Commonly quoted ranges in the trade, before channel fees, freight and duties:': 'Vaak genoemde bereiken in de branche, vóór kanaalkosten, vracht en invoerrechten:',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>Typische brutomarge</th><th>Wat u ervoor doet</th></tr>
        </thead>
        <tbody>
          <tr><td>Doorverkoop van een gevestigd merk</td><td>15–35%</td><td>Groothandel kopen, detail verkopen — het merk draagt herkenning en documentatie</td></tr>
          <tr><td>White label</td><td>40–60%</td><td>Verkoop een fabrieksformule onder uw naam — u draagt branding en compliance</td></tr>
          <tr><td>Private label / eigen merk</td><td>60–80%</td><td>Bezit de formule en het merk — u draagt alles, inclusief het risico</td></tr>
        </tbody>
      </table>`,
    'The pattern: <strong>margin is payment for risk carried</strong>. Higher-margin routes hand you the compliance, branding and unsold-inventory risk that the lower-margin routes leave with the brand owner. Neither is wrong — but calculate from your <em>landed cost</em> (wholesale price + freight + duties for your market), not the list price, or the spreadsheet will flatter you.':
      'Het patroon: <strong>marge is betaling voor gedragen risico</strong>. Routes met hogere marge geven u de compliance, branding en het risico op onverkochte voorraad die routes met lagere marge bij de merkeigenaar laten. Geen van beide is verkeerd — maar reken vanaf uw <em>landed cost</em> (groothandelsprijs + vracht + invoerrechten voor uw markt), niet de catalogusprijs, anders vleit het rekenblad u.',

    'The three types of suppliers you will meet': 'De drie soorten leveranciers die u zult tegenkomen',
    [UL_SUPPLIERS_EN]: `      <ul>
        <li><strong>Fabrikanten</strong> — produceren de goederen zelf. Beste prijzen voor bulkgrondstoffen of white-labeldeals; meestal minimums op palletschaal en geen interesse in kleine wederverkopers.</li>
        <li><strong>Distributeurs</strong> — voeren meerdere merken van meerdere fabrieken. Handig assortiment, maar u staat één stap verwijderd van de bron en de documentatie.</li>
        <li><strong>Rechtstreekse groothandel van het merk</strong> — kopen uit de eigen toeleveringsketen van het merk. De prijs ligt tussen de twee in, en u krijgt de verpakking, certificeringen en ondersteuning van het merk rechtstreeks. Zo levert UNI MAX aan zijn partners: een merkeigen product, geproduceerd bij een genoemde gecertificeerde faciliteit, verzonden als verkoopklare dozen.</li>
      </ul>`,

    'Where to find nutrition supplements wholesale suppliers': 'Waar u groothandelsleveranciers van voedingssupplementen vindt',
    'Four places, in rough order of pricing quality:': 'Vier plaatsen, in ruwe volgorde van prijskwaliteit:',
    [OL_WHERE_EN]: `      <ol>
        <li><strong>Rechtstreeks bij merken en fabrikanten</strong> — de beste handelsvoorwaarden komen meestal van de bron. Zoek naar een gepubliceerde groothandelspagina met MOQ's en een genoemd contact.</li>
        <li><strong>B2B-marktplaatsen</strong> — goed om opties te vergelijken en monsters aan te vragen; leverancierskwaliteit varieert sterk, dus verificatie is aan u.</li>
        <li><strong>Vakbeurzen</strong> — duur om bij te wonen, maar de snelste manier om veel leveranciers te ontmoeten en producten fysiek te bekijken.</li>
        <li><strong>Branchegidsen</strong> — halal-gidsen, nationale exportgidsen en categorielijsten; nuttig omdat vermelde leveranciers meestal een vorm van screening hebben doorstaan.</li>
      </ol>`,
    'Wherever you source, the checks are the same: which facility produces the product, what that facility is certified for, samples before bulk, and MOQ, lead time and shipping terms in writing. The full six-point checklist is here: <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a>.':
      'Waar u ook inkoopt, de controles zijn hetzelfde: welke faciliteit het product produceert, waarvoor die faciliteit gecertificeerd is, monsters vóór bulk, en MOQ, levertijd en verzendvoorwaarden schriftelijk. De volledige checklist met zes punten staat hier: <a href="/guides/tongkat-ali-drink-supplier-checklist/">hoe u een leverancier evalueert</a>.',

    'Choosing what to stock: category before product': 'Kiezen wat u op voorraad neemt: categorie vóór product',
    'Most first-time resellers pick a product they like. Experienced buyers pick a <em>category with momentum and a format gap</em>, then find the best product in it. Three questions that do most of the work:':
      'De meeste beginnende wederverkopers kiezen een product dat ze leuk vinden. Ervaren kopers kiezen een <em>categorie met momentum en een formaatgat</em>, en vinden daarin het beste product. Drie vragen die het meeste werk doen:',
    [UL_STOCK_EN]: `      <ul>
        <li><strong>Groeit de vraag of is het overvol?</strong> Capsules van gangbare vitamines zijn een prijzenoorlog. Nieuwere formaten en nieuwere hero-ingrediënten laten ruimte voor marge.</li>
        <li><strong>Onderscheidt het formaat zich op een schap?</strong> Een drinkklaar sachet wordt gepresenteerd als een drankje en verkoopt op gemak; nog een capsuleflesje concurreert met duizend identieke flesjes. (Meer hierover: <a href="/guides/tongkat-ali-drink-vs-capsules/">drank vs capsules</a>.)</li>
        <li><strong>Kunt u de documentatie krijgen die uw kanaal eist?</strong> Halal-retail heeft halal-certificering nodig; algemene voedselretail wil GMP/HACCP achter het product. Geen documentatie, geen schap.</li>
      </ul>`,
    'This is why the men\'s vitality / energy drink corner of the market is an interesting entry category: recognisable hero ingredients, a beverage format that stands out beside capsule walls, and — in UNI MAX\'s case — a finished product with HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP behind it (registered to the producing facility, Orient Biotech Sdn Bhd, Malaysia).':
      'Daarom is de hoek van mannen-vitaliteits-/energiedranken in de markt een interessante instapcategorie: herkenbare hero-ingrediënten, een drankformaat dat opvalt naast capsulewanden, en — in het geval van UNI MAX — een kant-en-klaar product met HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 en HACCP erachter (geregistreerd op de producerende faciliteit, Orient Biotech Sdn Bhd, Maleisië).',

    'What a sensible first order looks like': 'Hoe een verstandige eerste bestelling eruitziet',
    'Bulk ingredient suppliers want pallets. Finished-product brands can start with a shelf trial. As a concrete reference: UNI MAX suggests <strong>12–24 boxes</strong> (30 × 10&nbsp;g ready-to-drink sachets each) for a first stockist order, 50–100 boxes for wholesale partners and 300+ for regional distributors — actual quantities confirmed on enquiry, terms discussed directly over WhatsApp with a same-day reply. A first position costs a trial, not a container.':
      'Leveranciers van bulkgrondstoffen willen pallets. Merken met kant-en-klare producten kunnen beginnen met een schapproef. Als concreet referentiepunt: UNI MAX stelt <strong>12–24 dozen</strong> voor (elk 30 × 10&nbsp;g drinkklare sachets) voor een eerste bestelling van een retailer, 50–100 dozen voor groothandelspartners en 300+ voor regionale distributeurs — werkelijke hoeveelheden bevestigd bij navraag, voorwaarden rechtstreeks besproken via WhatsApp met een reactie dezelfde dag. Een eerste positie kost een proef, geen container.',

    'Resale FAQ': 'Veelgestelde vragen over wederverkoop',
    'Questions resellers ask before a first bulk order.': 'Vragen die wederverkopers stellen vóór een eerste bulkbestelling.',

    '>Distribute UNI MAX in Europe — for distributors</a>': '>UNI MAX distribueren in Europa — voor distributeurs</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Een Tongkat Ali-leverancier kiezen</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Een supplementenbedrijf starten — of distributeur worden?</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Tongkat Ali-drank vs capsules: het juiste formaat kiezen</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX groothandel &amp; distributie</a>',

    'Want a shelf-ready product to resell?': 'Wilt u een verkoopklaar product om door te verkopen?',
    'UNI MAX supplies retail-ready boxes to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX levert verkoopklare dozen aan wederverkopers, groothandels en regionale distributeurs — voorgestelde instap vanaf 12 dozen. Vertel ons uw markt en wij bevestigen de voorwaarden.',
  },
},

de: {
  meta: {
    title: 'Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber | UNI MAX',
    desc: 'Wie der Kauf von Großhandels-Nahrungsergänzungsmitteln zum Wiederverkauf funktioniert: typische Margenbereiche, die drei Arten von Lieferanten, wo man sie findet, welche MOQs zu erwarten sind und wie man die Qualität vor der ersten Großbestellung überprüft.',
    ogTitle: 'Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber — UNI MAX',
    ogDesc: 'Margenbereiche, Lieferantentypen, wo man Großhandelslieferanten für Nahrungsergänzungsmittel findet, typische MOQs und wie man die Qualität vor einer ersten Großbestellung überprüft.',
  },
  breadcrumbName: 'Großhandelspräparate zum Wiederverkauf',
  articleHeadline: 'Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber',
  articleDescription: 'Wie der Kauf von Großhandels-Nahrungsergänzungsmitteln zum Wiederverkauf funktioniert: typische Margenbereiche, die drei Arten von Lieferanten, wo man sie findet, welche MOQs zu erwarten sind und wie man die Qualität vor der ersten Großbestellung überprüft.',
  faq: [
    { q: 'Welche Marge kann ich beim Wiederverkauf von Nahrungsergänzungsmitteln erwarten?', a: 'In der Branche häufig genannte Bereiche: Der Wiederverkauf etablierter Marken liegt typischerweise bei 15–35%, White Label bei etwa 40–60% und Private Label bei 60–80% — vor Kanalgebühren, Versand und Zöllen. Ihre tatsächliche Marge hängt von den Anlandekosten ab, also rechnen Sie ausgehend vom Großhandelspreis plus Fracht und Zoll für Ihren Markt, nicht nur vom Listenpreis.' },
    { q: 'Wo kann ich Großhandels-Nahrungsergänzungsmittel zum Wiederverkauf kaufen?', a: 'Vier Hauptorte: direkt von Marken und Herstellern (meist die beste Preisstufe), B2B-Marktplätze, Branchenmessen und Lieferantenverzeichnisse. Wo auch immer Sie beschaffen, verifizieren Sie, bevor Sie sich verpflichten: Fragen Sie, welche Anlage das Produkt herstellt, fordern Sie Zertifizierungsdokumente und Muster an, und bestätigen Sie MOQ, Vorlaufzeit und Versandbedingungen schriftlich.' },
    { q: 'Was ist eine typische Mindestbestellung für Großhandels-Nahrungsergänzungsmittel?', a: 'Das variiert je nach Lieferantentyp. Lieferanten von Massenrohstoffen denken in Kilogramm und Paletten; Marken mit Fertigprodukten können deutlich kleiner starten. Als Referenzwert liefert UNI MAX verkaufsfertige Boxen mit einer empfohlenen Erstbestellung von 12–24 Boxen für einen Einzelhändler, 50–100 für Großhandelspartner und 300+ für regionale Vertriebspartner.' },
  ],
  html: {
    "Buyer's Guide": 'Einkaufsratgeber',
    "Wholesale supplements for resale: the buyer's guide.": 'Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber.',
    "Buying supplements at wholesale and reselling them at retail is one of the most accessible product businesses there is — if you understand the margins, the supplier types and the checks that separate a good first order from an expensive lesson.":
      'Der Einkauf von Nahrungsergänzungsmitteln im Großhandel und der Wiederverkauf im Einzelhandel ist eines der zugänglichsten Produktgeschäfte überhaupt — vorausgesetzt, Sie verstehen die Margen, die Lieferantentypen und die Prüfungen, die eine gute erste Bestellung von einer teuren Lektion unterscheiden.',

    'How the model works': 'Wie das Modell funktioniert',
    'Wholesale-for-resale is the oldest model in retail: buy in bulk at a discounted trade price, sell at retail price, keep the spread. In supplements it has one twist that matters — the products go <em>into people</em>, so quality documentation (who manufactured it, in which certified facility, with what testing) is part of the product, not paperwork. Resellers who treat documentation as an afterthought inherit their supplier\'s problems.':
      'Großhandel-für-Wiederverkauf ist das älteste Modell im Einzelhandel: in großen Mengen zu einem reduzierten Handelspreis kaufen, zum Einzelhandelspreis verkaufen, die Differenz behalten. Bei Nahrungsergänzungsmitteln gibt es eine wichtige Besonderheit — die Produkte gelangen <em>in Menschen hinein</em>, sodass Qualitätsdokumentation (wer es hergestellt hat, in welcher zertifizierten Anlage, mit welchen Tests) Teil des Produkts ist, nicht Papierkram. Wiederverkäufer, die Dokumentation als Nebensache behandeln, erben die Probleme ihres Lieferanten.',

    'The margins, honestly': 'Die Margen, ehrlich gesagt',
    'Commonly quoted ranges in the trade, before channel fees, freight and duties:': 'In der Branche häufig genannte Bereiche, vor Kanalgebühren, Fracht und Zöllen:',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Weg</th><th>Typische Bruttomarge</th><th>Was Sie dafür tun</th></tr>
        </thead>
        <tbody>
          <tr><td>Wiederverkauf einer etablierten Marke</td><td>15–35%</td><td>Großhandel kaufen, Einzelhandel verkaufen — die Marke trägt Wiedererkennung und Dokumentation</td></tr>
          <tr><td>White Label</td><td>40–60%</td><td>Verkaufen Sie eine Fabrikrezeptur unter Ihrem Namen — Sie tragen Markenbildung und Compliance</td></tr>
          <tr><td>Private Label / eigene Marke</td><td>60–80%</td><td>Besitzen Sie Rezeptur und Marke — Sie tragen alles, einschließlich des Risikos</td></tr>
        </tbody>
      </table>`,
    'The pattern: <strong>margin is payment for risk carried</strong>. Higher-margin routes hand you the compliance, branding and unsold-inventory risk that the lower-margin routes leave with the brand owner. Neither is wrong — but calculate from your <em>landed cost</em> (wholesale price + freight + duties for your market), not the list price, or the spreadsheet will flatter you.':
      'Das Muster: <strong>Marge ist Bezahlung für getragenes Risiko</strong>. Wege mit höherer Marge übertragen Ihnen die Compliance, Markenbildung und das Risiko unverkaufter Bestände, die Wege mit niedrigerer Marge beim Markeninhaber belassen. Keines von beiden ist falsch — aber rechnen Sie von Ihren <em>Anlandekosten</em> (Großhandelspreis + Fracht + Zölle für Ihren Markt), nicht vom Listenpreis, sonst schmeichelt Ihnen die Tabellenkalkulation.',

    'The three types of suppliers you will meet': 'Die drei Arten von Lieferanten, denen Sie begegnen werden',
    [UL_SUPPLIERS_EN]: `      <ul>
        <li><strong>Hersteller</strong> — produzieren die Waren selbst. Beste Preise für Massenrohstoff- oder White-Label-Deals; normalerweise Mindestmengen im Palettenmaßstab und kein Interesse an kleinen Wiederverkäufern.</li>
        <li><strong>Distributoren</strong> — führen mehrere Marken aus mehreren Fabriken. Bequemes Sortiment, aber Sie sind einen Schritt von der Quelle und der Dokumentation entfernt.</li>
        <li><strong>Direkter Großhandel der Marke</strong> — Kauf aus der eigenen Lieferkette der Marke. Die Preise liegen zwischen den beiden, und Sie erhalten die Verpackung, Zertifizierungen und Unterstützung der Marke direkt. So beliefert UNI MAX seine Partner: markeneigenes Produkt, hergestellt in einer namentlich genannten zertifizierten Anlage, versandt als verkaufsfertige Boxen.</li>
      </ul>`,

    'Where to find nutrition supplements wholesale suppliers': 'Wo man Großhandelslieferanten für Nahrungsergänzungsmittel findet',
    'Four places, in rough order of pricing quality:': 'Vier Orte, ungefähr in Reihenfolge der Preisqualität:',
    [OL_WHERE_EN]: `      <ol>
        <li><strong>Direkt von Marken und Herstellern</strong> — die besten Handelsbedingungen kommen meist von der Quelle. Suchen Sie nach einer veröffentlichten Großhandelsseite mit MOQs und einem namentlich genannten Kontakt.</li>
        <li><strong>B2B-Marktplätze</strong> — gut zum Vergleichen von Optionen und Anfordern von Mustern; die Lieferantenqualität variiert stark, daher liegt die Verifizierung bei Ihnen.</li>
        <li><strong>Fachmessen</strong> — teuer im Besuch, aber der schnellste Weg, viele Lieferanten zu treffen und Produkte physisch in die Hand zu nehmen.</li>
        <li><strong>Branchenverzeichnisse</strong> — Halal-Verzeichnisse, nationale Exportverzeichnisse und Kategorielisten; nützlich, weil gelistete Lieferanten normalerweise eine Form der Überprüfung durchlaufen haben.</li>
      </ol>`,
    'Wherever you source, the checks are the same: which facility produces the product, what that facility is certified for, samples before bulk, and MOQ, lead time and shipping terms in writing. The full six-point checklist is here: <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a>.':
      'Woher auch immer Sie beziehen, die Prüfungen sind dieselben: welche Anlage das Produkt herstellt, wofür diese Anlage zertifiziert ist, Muster vor der Großbestellung, sowie MOQ, Vorlaufzeit und Versandbedingungen schriftlich. Die vollständige sechs-Punkte-Checkliste finden Sie hier: <a href="/guides/tongkat-ali-drink-supplier-checklist/">wie man einen Lieferanten bewertet</a>.',

    'Choosing what to stock: category before product': 'Auswahl des Sortiments: Kategorie vor Produkt',
    'Most first-time resellers pick a product they like. Experienced buyers pick a <em>category with momentum and a format gap</em>, then find the best product in it. Three questions that do most of the work:':
      'Die meisten Erstverkäufer wählen ein Produkt, das ihnen gefällt. Erfahrene Käufer wählen eine <em>Kategorie mit Schwung und einer Formatlücke</em> und finden dann darin das beste Produkt. Drei Fragen, die den Großteil der Arbeit erledigen:',
    [UL_STOCK_EN]: `      <ul>
        <li><strong>Wächst die Nachfrage oder ist sie überfüllt?</strong> Kapseln gängiger Vitamine sind ein Preiskampf. Neuere Formate und neuere Hauptinhaltsstoffe lassen Raum für Marge.</li>
        <li><strong>Unterscheidet sich das Format im Regal?</strong> Ein trinkfertiges Sachet wird wie ein Getränk vermarktet und verkauft sich über Bequemlichkeit; eine weitere Kapselflasche konkurriert mit tausend identischen Flaschen. (Mehr dazu: <a href="/guides/tongkat-ali-drink-vs-capsules/">Getränk vs. Kapseln</a>.)</li>
        <li><strong>Können Sie die von Ihrem Kanal geforderte Dokumentation erhalten?</strong> Halal-Einzelhandel benötigt Halal-Zertifizierung; allgemeiner Lebensmitteleinzelhandel möchte GMP/HACCP hinter dem Produkt. Keine Dokumentation, kein Regalplatz.</li>
      </ul>`,
    'This is why the men\'s vitality / energy drink corner of the market is an interesting entry category: recognisable hero ingredients, a beverage format that stands out beside capsule walls, and — in UNI MAX\'s case — a finished product with HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP behind it (registered to the producing facility, Orient Biotech Sdn Bhd, Malaysia).':
      'Deshalb ist die Ecke der Vitalitäts-/Energiegetränke für Männer eine interessante Einstiegskategorie: erkennbare Hauptinhaltsstoffe, ein Getränkeformat, das sich neben Kapselwänden abhebt, und — im Fall von UNI MAX — ein Fertigprodukt mit HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 und HACCP dahinter (registriert auf die Produktionsanlage, Orient Biotech Sdn Bhd, Malaysia).',

    'What a sensible first order looks like': 'Wie eine sinnvolle Erstbestellung aussieht',
    'Bulk ingredient suppliers want pallets. Finished-product brands can start with a shelf trial. As a concrete reference: UNI MAX suggests <strong>12–24 boxes</strong> (30 × 10&nbsp;g ready-to-drink sachets each) for a first stockist order, 50–100 boxes for wholesale partners and 300+ for regional distributors — actual quantities confirmed on enquiry, terms discussed directly over WhatsApp with a same-day reply. A first position costs a trial, not a container.':
      'Lieferanten von Massenrohstoffen wollen Paletten. Marken mit Fertigprodukten können mit einem Regaltest beginnen. Als konkreter Referenzwert: UNI MAX empfiehlt <strong>12–24 Boxen</strong> (je 30 × 10&nbsp;g trinkfertige Sachets) für eine erste Bestellung als Einzelhändler, 50–100 Boxen für Großhandelspartner und 300+ für regionale Vertriebspartner — tatsächliche Mengen bei Anfrage bestätigt, Konditionen direkt über WhatsApp mit Antwort am selben Tag besprochen. Eine erste Position kostet einen Test, keinen Container.',

    'Resale FAQ': 'FAQ zum Wiederverkauf',
    'Questions resellers ask before a first bulk order.': 'Fragen, die Wiederverkäufer vor einer ersten Großbestellung stellen.',

    '>Distribute UNI MAX in Europe — for distributors</a>': '>UNI MAX in Europa vertreiben — für Vertriebspartner</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Einen Tongkat-Ali-Lieferanten wählen</a>',
    '>Start a supplement business — or become a distributor?</a>': '>Nahrungsergänzungsmittel-Firma gründen — oder Vertriebspartner werden?</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Tongkat-Ali-Getränk vs. Kapseln: das richtige Format wählen</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX Großhandel &amp; Vertrieb</a>',

    'Want a shelf-ready product to resell?': 'Möchten Sie ein verkaufsfertiges Produkt zum Wiederverkauf?',
    'UNI MAX supplies retail-ready boxes to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX liefert verkaufsfertige Boxen an Fachhändler, Großhändler und regionale Vertriebspartner — empfohlener Einstieg ab 12 Boxen. Teilen Sie uns Ihren Markt mit, und wir bestätigen die Konditionen.',
  },
},

};
