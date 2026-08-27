/* guides/start-supplement-business-vs-distributor/ 的五语译文(共享头尾见 _shared.js)。
 * key 必须与源页字节完全一致,由 gen-guide-pages.js 断言命中数。
 */

const TABLE_EN = `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>Upfront cost</th><th>Time to first sale</th><th>Margin</th><th>Main risk</th></tr>
        </thead>
        <tbody>
          <tr><td>Own brand</td><td>Highest — formulation, certification, minimum production run</td><td>Months</td><td>Highest</td><td>Capital sunk before demand is proven</td></tr>
          <tr><td>Private label</td><td>High — label run + factory MOQ</td><td>Weeks–months</td><td>High</td><td>Same formula as every competitor's private label</td></tr>
          <tr><td>Distribution</td><td>Low — first stock order</td><td>Days–weeks</td><td>Middle</td><td>You represent a brand you don't own</td></tr>
          <tr><td>Dropship</td><td>Minimal</td><td>Days</td><td>Thinnest</td><td>No control over product or delivery</td></tr>
        </tbody>
      </table>`;

const UL_ROUTES_EN = `      <ul>
        <li><strong>Build a brand</strong> if you have a genuinely differentiated formula, capital you can afford to sink for months, and marketing skills to create demand from zero.</li>
        <li><strong>Private label</strong> if your strength is marketing and you accept selling a shared formula under your own name.</li>
        <li><strong>Distribute</strong> if your strength is sales and channels — you know shops, gyms, clinics or buyers in your market and want a certified product to put in front of them this month, not next year.</li>
        <li><strong>Dropship</strong> if you are testing demand with minimal commitment and accept the trade-offs.</li>
      </ul>`;

module.exports = {

zh: {
  meta: {
    title: '自创补剂品牌，还是做分销商？| UNI MAX',
    desc: '打造一个补剂品牌要花数月和大量资金。分销一个已有认证的成熟品牌，起点可以只是十几盒货。四条进入补剂生意的路径对比——成本、风险，以及各自适合谁。',
    ogTitle: '自创补剂品牌，还是做分销商？— UNI MAX',
    ogDesc: '四条进入补剂生意的路径对比——自创品牌、贴牌代工、分销、代发货——附真实成本与风险。',
  },
  breadcrumbName: '自创补剂品牌，还是做分销商？',
  articleHeadline: '自创补剂品牌——还是做分销商？',
  articleDescription: '四条进入补剂生意的路径对比——自创品牌、贴牌代工、分销、代发货——附真实成本、风险，以及各自适合谁。',
  faq: [
    { q: '我要怎么成为补剂分销商？', a: '最快的路径是分销一个已有认证的成熟品牌，而不是从零开始打造一个。先确认产品的生产认证（HALAL、GMP、HACCP 或目标市场的对应认证），和品牌方谈好起订量，再按你所在地的营业与进口要求把产品报备好。以 UNI MAX 为例，第一步是下一个备货订单，不是生产一批货——合作分级从零售代销商建议 12–24 盒起，询价直接通过 WhatsApp 沟通，当天回复。' },
    { q: '开一家补剂公司要花多少钱？', a: '从零打造品牌通常意味着要付配方研发、安全性与稳定性测试、包装设计、认证、工厂最低生产量的费用——这是个以月为单位、需要在第一笔销售前投入大量资金的项目。分销一个成熟品牌则反过来：主要成本就是你的第一笔备货订单。作为参考，UNI MAX 的合作从零售代销商建议的 12–24 盒起。' },
    { q: '分销一个补剂品牌，我自己需要认证吗？', a: '像 HALAL、GMP 或 HACCP 这类生产认证登记在生产产品的工厂名下，而不是登记在经销商名下——比如 UNI MAX 就在 Orient Biotech Sdn Bhd 这家马来西亚认证工厂生产。作为分销商，你按自己所在地的营业与进口要求运作，这因市场而异，下单前值得先确认清楚你所在国家的要求。' },
    { q: '做分销比自创补剂品牌更好吗？', a: '两者没有哪个绝对更好。自创品牌能拿到完全的掌控权和最大的潜在利润空间，代价是最高的成本与最慢的起步。分销则是用一部分利润空间换取速度和低风险：产品、包装、认证与配方都已经存在，你要做的是销售和渠道建设。代发货的投入承诺更低，但对品质与顾客体验的掌控也最弱。' },
    { q: '做补剂分销赚钱吗？', a: '有可能赚钱，但分销这条路本来设计的就是中等利润——你是在用一部分利润空间，换取更低的前期成本和更快的起步，而不是像自创品牌那样追求最大利润空间。真正决定赚不赚钱的是你自己的销售能力和渠道建设，不是产品本身：同样一批认证货，卖进对的门店、健身房或诊所，和堆在仓库里不动，赚的完全不是一回事。这没有一个放之四海皆准的利润数字，取决于你的定价、渠道和走货量。' },
  ],
  html: {
    'Business Guide': '商业指南',
    'Start a supplement business — or become a distributor?': '自创补剂品牌——还是做分销商？',
    'Most guides on starting a supplement business assume you want to build a brand from scratch. There are actually four routes in — and for many first-time sellers, the cheapest and fastest one is the one nobody writes about: distributing a brand that already exists.':
      '大多数关于"如何开始做补剂生意"的指南，默认你想从零打造一个品牌。实际上有四条路可以进入这门生意——而对很多第一次尝试的卖家来说，最便宜、最快的那条路，恰恰是几乎没人写过的：分销一个已经存在的品牌。',

    'The four routes into the supplement business': '进入补剂生意的四条路径',
    '<p><strong>1. Build your own brand.</strong> You develop or license a formula, contract a factory, design packaging, run the safety and stability work, and pay for the certifications and a minimum production run. Full control, the largest potential margin — and the slowest, most capital-hungry start. This is the route most "how to start a supplement company" guides describe, and it is a genuine product-development project measured in months.</p>':
      '<p><strong>1. 自创品牌。</strong>你要自己研发或授权一套配方，找工厂代工，设计包装，做安全性与稳定性测试，还要为认证和工厂最低生产量买单。这条路能拿到完全的掌控权和最大的潜在利润空间——代价是最慢的起步、最吃资金。大多数"如何开始做补剂公司"的指南讲的就是这条路，它是一个以月为单位的真实产品研发项目。</p>',
    '<p><strong>2. Private label.</strong> A factory\'s existing formula with your label on it. Faster than building from scratch, but you still own packaging, branding, marketing and compliance for a product that is materially identical to everyone else\'s private-label version of the same formula.</p>':
      '<p><strong>2. 贴牌代工。</strong>用工厂已有的配方，贴上你自己的标签。比从零开始更快，但包装、品牌、营销和合规都还得你自己扛——而且产品本质上和其他所有用同一套配方贴牌的竞品没什么两样。</p>',
    '<p><strong>3. Distribute an established brand.</strong> You buy a finished, certified, retail-ready product at wholesale terms and sell it through your channels — shops, gyms, clinics, e-commerce. The brand owner has already done the formulation, certification and packaging. Your job is the part factories cannot do: local sales and channel-building.</p>':
      '<p><strong>3. 分销一个成熟品牌。</strong>你以批发条款买入一款已经做好、有认证、零售就绪的成品，通过你自己的渠道卖出去——门店、健身房、诊所、电商。品牌方已经把配方研发、认证与包装都做完了，你要做的是工厂做不到的那部分：本地销售与渠道建设。</p>',
    '<p><strong>4. Dropship.</strong> You list products you never touch. Lowest commitment, thinnest margins, and the least control over quality, delivery and customer experience.</p>':
      '<p><strong>4. 代发货。</strong>你上架的产品自己从头到尾都碰不到。投入承诺最低，利润空间最薄，对品质、配送与顾客体验的掌控也最弱。</p>',

    'The honest comparison': '一份诚实的对比',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>路径</th><th>前期成本</th><th>到第一笔销售的时间</th><th>利润空间</th><th>主要风险</th></tr>
        </thead>
        <tbody>
          <tr><td>自创品牌</td><td>最高——配方研发、认证、最低生产量</td><td>数月</td><td>最高</td><td>需求还没验证，资金已经砸进去</td></tr>
          <tr><td>贴牌代工</td><td>高——标签制作 + 工厂起订量</td><td>数周至数月</td><td>高</td><td>和所有竞品贴牌用的是同一套配方</td></tr>
          <tr><td>分销</td><td>低——第一笔备货订单</td><td>数天至数周</td><td>中等</td><td>你代理的是别人的品牌</td></tr>
          <tr><td>代发货</td><td>极低</td><td>数天</td><td>最薄</td><td>对产品和配送毫无掌控</td></tr>
        </tbody>
      </table>`,

    'What "how much does it cost" actually depends on': '"到底要花多少钱"实际取决于什么',
    'For the brand-building route, the cost question has no honest single answer — it depends on formula complexity, certifications, packaging and the factory\'s minimum run. What can be said honestly: it is front-loaded. Almost all of it is spent <em>before</em> you learn whether anyone buys.':
      '对自创品牌这条路来说，"要花多少钱"这个问题没有一个诚实的固定答案——取决于配方复杂度、认证、包装和工厂的最低生产量。能诚实说的一点是：钱都花在前面。几乎所有支出都发生在你<em>知道有没有人买单之前</em>。',
    'Distribution inverts the cost curve. The main cost is your first stock order, and it scales with your confidence. As a concrete reference point: UNI MAX — a ready-to-drink botanical vitality drink from Malaysia — suggests <strong>12–24 boxes for a first retail stockist order</strong>, 50–100 for wholesale partners, and 300+ for regional distributors, with actual quantities confirmed on enquiry. A first position in the product costs a shelf trial, not a production run.':
      '分销把这条成本曲线反过来了。主要成本就是你的第一笔备货订单，而且随着你的信心逐步加码。给一个具体参照：UNI MAX——一款来自马来西亚的即饮植物活力饮——零售代销商第一笔订单建议 <strong>12–24 盒</strong>，批发伙伴 50–100 盒，区域分销商 300 盒以上，实际数量以询价确认为准。踏入这个产品的第一步，花的是一次货架试销的成本，不是一整批生产的成本。',

    'Who each route actually suits': '各条路径实际适合谁',
    [UL_ROUTES_EN]: `      <ul>
        <li><strong>自创品牌</strong>——如果你有一套真正有差异化的配方、能承受数月资金沉没的资本，以及能从零创造需求的营销能力。</li>
        <li><strong>贴牌代工</strong>——如果你的强项是营销，并且能接受卖一套和别人共用的配方，只是挂自己的名字。</li>
        <li><strong>分销</strong>——如果你的强项是销售和渠道——你熟悉自己市场里的门店、健身房、诊所或买家，想要一款这个月就能摆到他们面前的认证产品，而不是等到明年。</li>
        <li><strong>代发货</strong>——如果你只是想以最低投入承诺测试一下需求，并且能接受这条路的各种取舍。</li>
      </ul>`,
    'A pattern worth noticing: people researching "how to start a supplement business" usually have a <em>sales</em> skill set, not a product-development one. If that is you, distribution is the route where your actual skill does the work from day one — the product, certifications and packaging already exist. See <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a> before committing to one.':
      '一个值得留意的规律：搜索"如何开始做补剂生意"的人，通常具备的是<em>销售</em>能力，而不是产品研发能力。如果这说的就是你，分销就是那条从第一天起就能让你真正的技能发挥作用的路——产品、认证与包装都已经现成。在敲定供应商之前，可以先看看<a href="/guides/tongkat-ali-drink-supplier-checklist/">如何评估一家供应商</a>。',

    'What distributing an established brand looks like in practice': '分销一个成熟品牌实际上是什么样子',
    'Using UNI MAX as the example we know best: the product arrives as finished retail-ready boxes — 30 × 10&nbsp;g ready-to-drink sachets of a botanical lychee vitality drink with Triple Force Tongkat Ali — produced and filled at a certified Malaysian facility (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP are registered to that facility). Partnership levels run from retail stockist to regional distributor, and enquiries are handled directly over WhatsApp with a same-day reply. No repacking, no reformulation, no certification project — order, receive, sell.':
      '以我们最熟悉的 UNI MAX 为例：产品以零售就绪的成品盒装到货——每盒 30 × 10&nbsp;克即饮植物荔枝活力饮独立包，配方含三重东革阿里——在一家认证的马来西亚工厂（Orient Biotech Sdn Bhd；HALAL（JAKIM）、GMP、MeSTI、ISO&nbsp;9001 与 HACCP 均登记在这家工厂名下）生产灌装。合作分级从零售代销商到区域分销商都有，询价直接通过 WhatsApp 沟通，当天回复。不用重新分装，不用重新配方，不用自己跑认证项目——下单、收货、卖出去。',

    'Getting-started FAQ': '入门常见问题',
    'Questions first-time sellers ask.': '第一次尝试的卖家常问的问题。',

    '>Wholesale supplements for resale: the buyer\'s guide</a>': '>转售用批发补剂：买家指南</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>如何甄选东革阿里供应商</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>东革阿里饮品 vs 胶囊：如何选对形态</a>',
    '>What is a Tongkat Ali sachet drink?</a>': '>什么是东革阿里独立包饮品？</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX 批发与分销</a>',

    'Skip the production run. Start with a shelf trial.': '跳过生产环节，从货架试销开始。',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX 以零售就绪形态供货给零售商、批发商与区域分销商——建议起订量 12 盒起。告诉我们你的市场，我们会为你确认合作条款。',
  },
},

ms: {
  meta: {
    title: 'Mulakan Perniagaan Suplemen atau Jadi Pengedar? | UNI MAX',
    desc: 'Membina jenama suplemen mengambil masa berbulan dan modal besar. Mengedar jenama bertauliah yang sedia ada bermula daripada sedozen kotak. Empat laluan ke perniagaan suplemen dibandingkan — kos, risiko dan siapa yang sesuai untuk setiap satu.',
    ogTitle: 'Mulakan Perniagaan Suplemen atau Jadi Pengedar? — UNI MAX',
    ogDesc: 'Empat laluan ke perniagaan suplemen dibandingkan — membina jenama, label persendirian, pengedaran dan dropship — dengan kos dan risiko sebenar.',
  },
  breadcrumbName: 'Mulakan Perniagaan Suplemen atau Jadi Pengedar?',
  articleHeadline: 'Mulakan Perniagaan Suplemen — atau Jadi Pengedar?',
  articleDescription: 'Empat laluan ke perniagaan suplemen dibandingkan — membina jenama, label persendirian, pengedaran dan dropship — dengan kos, risiko sebenar dan siapa yang sesuai untuk setiap laluan.',
  faq: [
    { q: 'Bagaimana saya boleh menjadi pengedar suplemen?', a: 'Laluan paling pantas ialah mengedar jenama bertauliah yang sedia ada berbanding membina satu dari kosong: sahkan pensijilan pembuatan produk (HALAL, GMP, HACCP atau setara di pasaran sasaran anda), setuju pesanan permulaan dengan pemilik jenama, dan daftarkan produk mengikut keperluan perniagaan tempatan dan import anda sendiri. Dengan UNI MAX, langkah pertama itu ialah pesanan stok berbanding larian pengeluaran — tahap kerjasama bermula daripada 12–24 kotak yang dicadangkan untuk penstok runcit, dan pertanyaan diuruskan terus melalui WhatsApp dengan balasan hari yang sama.' },
    { q: 'Berapa kos untuk memulakan syarikat suplemen?', a: 'Membina jenama dari kosong biasanya bermakna membayar untuk formulasi, kerja keselamatan dan kestabilan, reka bentuk pembungkusan, pensijilan dan larian pengeluaran minimum kilang — projek yang diukur dalam bulan dan modal besar sebelum jualan pertama. Mengedar jenama sedia ada membalikkan itu: kos utama ialah pesanan stok pertama anda. Sebagai titik rujukan, kerjasama UNI MAX bermula pada 12–24 kotak yang dicadangkan untuk penstok runcit.' },
    { q: 'Adakah saya perlukan pensijilan sendiri untuk mengedar jenama suplemen?', a: 'Pensijilan pembuatan seperti HALAL, GMP atau HACCP didaftarkan kepada kemudahan yang menghasilkan produk, bukan kepada penjual semula — UNI MAX, sebagai contoh, dihasilkan di Orient Biotech Sdn Bhd, kemudahan Malaysia yang bertauliah. Sebagai pengedar anda beroperasi di bawah keperluan perniagaan tempatan dan import anda sendiri, yang berbeza mengikut pasaran dan berbaloi disahkan untuk negara anda sebelum membuat pesanan.' },
    { q: 'Adakah mengedar lebih baik daripada membina jenama suplemen sendiri?', a: 'Tiada satu yang secara sejagat lebih baik. Membina jenama menawarkan kawalan penuh dan margin berpotensi terbesar, pada kos tertinggi dan permulaan paling perlahan. Pengedaran menukar sedikit margin untuk kelajuan dan risiko rendah: produk, pembungkusan, pensijilan dan formula sudah wujud, jadi kerja anda ialah jualan dan pembinaan saluran. Dropship kurang komited lagi, tetapi dengan kawalan paling sedikit terhadap kualiti dan pengalaman pelanggan.' },
    { q: 'Adakah menjadi pengedar suplemen menguntungkan?', a: 'Boleh jadi, tetapi pengedaran memang direka sebagai laluan margin pertengahan — anda menukar sebahagian margin untuk kos permulaan yang lebih rendah dan permulaan yang lebih pantas, bukan mensasarkan margin tertinggi seperti membina jenama sendiri. Keuntungan datang daripada usaha jualan dan pembinaan saluran anda sendiri, bukan daripada produk itu sendiri — stok bertauliah yang sama, dijual dengan baik melalui kedai, gim atau klinik yang tepat, memberikan hasil yang sangat berbeza berbanding stok yang tersadai di rak. Tiada satu angka keuntungan yang sah untuk semua pasaran — ia bergantung pada penetapan harga, saluran dan jumlah jualan anda.' },
  ],
  html: {
    'Business Guide': 'Panduan Perniagaan',
    'Start a supplement business — or become a distributor?': 'Mulakan perniagaan suplemen — atau jadi pengedar?',
    'Most guides on starting a supplement business assume you want to build a brand from scratch. There are actually four routes in — and for many first-time sellers, the cheapest and fastest one is the one nobody writes about: distributing a brand that already exists.':
      'Kebanyakan panduan tentang memulakan perniagaan suplemen menganggap anda mahu membina jenama dari kosong. Sebenarnya ada empat laluan masuk — dan bagi ramai penjual kali pertama, yang paling murah dan pantas ialah yang tiada siapa tulis: mengedar jenama yang sudah wujud.',

    'The four routes into the supplement business': 'Empat laluan ke dalam perniagaan suplemen',
    '<p><strong>1. Build your own brand.</strong> You develop or license a formula, contract a factory, design packaging, run the safety and stability work, and pay for the certifications and a minimum production run. Full control, the largest potential margin — and the slowest, most capital-hungry start. This is the route most "how to start a supplement company" guides describe, and it is a genuine product-development project measured in months.</p>':
      '<p><strong>1. Bina jenama anda sendiri.</strong> Anda membangunkan atau melesenkan formula, mengontrak kilang, mereka bentuk pembungkusan, menjalankan kerja keselamatan dan kestabilan, dan membayar untuk pensijilan serta larian pengeluaran minimum. Kawalan penuh, margin berpotensi terbesar — dan permulaan paling perlahan, paling dahagakan modal. Ini laluan yang kebanyakan panduan "cara memulakan syarikat suplemen" gambarkan, dan ia projek pembangunan produk sebenar yang diukur dalam bulan.</p>',
    '<p><strong>2. Private label.</strong> A factory\'s existing formula with your label on it. Faster than building from scratch, but you still own packaging, branding, marketing and compliance for a product that is materially identical to everyone else\'s private-label version of the same formula.</p>':
      '<p><strong>2. Label persendirian.</strong> Formula sedia ada kilang dengan label anda padanya. Lebih pantas daripada membina dari kosong, tetapi anda masih memiliki pembungkusan, penjenamaan, pemasaran dan pematuhan untuk produk yang secara material sama seperti versi label persendirian orang lain bagi formula yang sama.</p>',
    '<p><strong>3. Distribute an established brand.</strong> You buy a finished, certified, retail-ready product at wholesale terms and sell it through your channels — shops, gyms, clinics, e-commerce. The brand owner has already done the formulation, certification and packaging. Your job is the part factories cannot do: local sales and channel-building.</p>':
      '<p><strong>3. Edarkan jenama yang sudah mantap.</strong> Anda membeli produk siap, bertauliah, sedia-runcit pada terma pemborongan dan menjualnya melalui saluran anda — kedai, gim, klinik, e-dagang. Pemilik jenama sudah melakukan formulasi, pensijilan dan pembungkusan. Kerja anda ialah bahagian yang kilang tidak boleh lakukan: jualan tempatan dan pembinaan saluran.</p>',
    '<p><strong>4. Dropship.</strong> You list products you never touch. Lowest commitment, thinnest margins, and the least control over quality, delivery and customer experience.</p>':
      '<p><strong>4. Dropship.</strong> Anda menyenaraikan produk yang tidak pernah anda sentuh. Komitmen paling rendah, margin paling nipis, dan kawalan paling sedikit terhadap kualiti, penghantaran dan pengalaman pelanggan.</p>',

    'The honest comparison': 'Perbandingan jujur',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Laluan</th><th>Kos permulaan</th><th>Masa ke jualan pertama</th><th>Margin</th><th>Risiko utama</th></tr>
        </thead>
        <tbody>
          <tr><td>Jenama sendiri</td><td>Tertinggi — formulasi, pensijilan, larian pengeluaran minimum</td><td>Berbulan</td><td>Tertinggi</td><td>Modal dibelanjakan sebelum permintaan terbukti</td></tr>
          <tr><td>Label persendirian</td><td>Tinggi — larian label + MOQ kilang</td><td>Minggu–bulan</td><td>Tinggi</td><td>Formula sama seperti label persendirian setiap pesaing</td></tr>
          <tr><td>Pengedaran</td><td>Rendah — pesanan stok pertama</td><td>Hari–minggu</td><td>Sederhana</td><td>Anda mewakili jenama yang bukan milik anda</td></tr>
          <tr><td>Dropship</td><td>Minimum</td><td>Hari</td><td>Paling nipis</td><td>Tiada kawalan terhadap produk atau penghantaran</td></tr>
        </tbody>
      </table>`,

    'What "how much does it cost" actually depends on': 'Apa yang sebenarnya menentukan "berapa kosnya"',
    'For the brand-building route, the cost question has no honest single answer — it depends on formula complexity, certifications, packaging and the factory\'s minimum run. What can be said honestly: it is front-loaded. Almost all of it is spent <em>before</em> you learn whether anyone buys.':
      'Bagi laluan membina jenama, soalan kos tiada satu jawapan jujur — bergantung pada kerumitan formula, pensijilan, pembungkusan dan larian minimum kilang. Apa yang boleh dikatakan dengan jujur: ia dibayar di hadapan. Hampir semuanya dibelanjakan <em>sebelum</em> anda tahu sama ada ada orang membeli.',
    'Distribution inverts the cost curve. The main cost is your first stock order, and it scales with your confidence. As a concrete reference point: UNI MAX — a ready-to-drink botanical vitality drink from Malaysia — suggests <strong>12–24 boxes for a first retail stockist order</strong>, 50–100 for wholesale partners, and 300+ for regional distributors, with actual quantities confirmed on enquiry. A first position in the product costs a shelf trial, not a production run.':
      'Pengedaran membalikkan lengkung kos itu. Kos utama ialah pesanan stok pertama anda, dan ia berskala mengikut keyakinan anda. Sebagai titik rujukan konkrit: UNI MAX — minuman vitaliti botani sedia minum dari Malaysia — mencadangkan <strong>12–24 kotak untuk pesanan penstok runcit pertama</strong>, 50–100 untuk rakan pemborongan, dan 300+ untuk pengedar serantau, dengan kuantiti sebenar disahkan semasa pertanyaan. Kedudukan pertama dalam produk ini kosnya setanding percubaan rak, bukan larian pengeluaran.',

    'Who each route actually suits': 'Siapa yang sebenarnya sesuai untuk setiap laluan',
    [UL_ROUTES_EN]: `      <ul>
        <li><strong>Bina jenama</strong> jika anda mempunyai formula yang benar-benar berbeza, modal yang mampu anda belanjakan selama berbulan, dan kemahiran pemasaran untuk mencipta permintaan dari kosong.</li>
        <li><strong>Label persendirian</strong> jika kekuatan anda ialah pemasaran dan anda menerima menjual formula yang dikongsi di bawah nama anda sendiri.</li>
        <li><strong>Edarkan</strong> jika kekuatan anda ialah jualan dan saluran — anda kenal kedai, gim, klinik atau pembeli di pasaran anda dan mahukan produk bertauliah untuk dikemukakan kepada mereka bulan ini, bukan tahun depan.</li>
        <li><strong>Dropship</strong> jika anda menguji permintaan dengan komitmen minimum dan menerima pertukaran yang ada.</li>
      </ul>`,
    'A pattern worth noticing: people researching "how to start a supplement business" usually have a <em>sales</em> skill set, not a product-development one. If that is you, distribution is the route where your actual skill does the work from day one — the product, certifications and packaging already exist. See <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a> before committing to one.':
      'Corak yang berbaloi diperhatikan: orang yang meneliti "cara memulakan perniagaan suplemen" biasanya mempunyai set kemahiran <em>jualan</em>, bukan pembangunan produk. Jika itu anda, pengedaran ialah laluan di mana kemahiran sebenar anda melakukan kerja sejak hari pertama — produk, pensijilan dan pembungkusan sudah wujud. Lihat <a href="/guides/tongkat-ali-drink-supplier-checklist/">cara menilai pembekal</a> sebelum komited kepada satu.',

    'What distributing an established brand looks like in practice': 'Bagaimana rupa mengedar jenama yang sudah mantap dalam praktik',
    'Using UNI MAX as the example we know best: the product arrives as finished retail-ready boxes — 30 × 10&nbsp;g ready-to-drink sachets of a botanical lychee vitality drink with Triple Force Tongkat Ali — produced and filled at a certified Malaysian facility (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP are registered to that facility). Partnership levels run from retail stockist to regional distributor, and enquiries are handled directly over WhatsApp with a same-day reply. No repacking, no reformulation, no certification project — order, receive, sell.':
      'Menggunakan UNI MAX sebagai contoh yang kami kenali paling baik: produk tiba sebagai kotak sedia-runcit siap — 30 × 10&nbsp;g sachet sedia minum minuman vitaliti botani laici dengan Tongkat Ali Tiga Kuasa — dihasilkan dan diisi di kemudahan Malaysia yang bertauliah (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 dan HACCP didaftarkan kepada kemudahan itu). Tahap kerjasama merangkumi daripada penstok runcit hingga pengedar serantau, dan pertanyaan diuruskan terus melalui WhatsApp dengan balasan hari yang sama. Tiada pembungkusan semula, tiada formula semula, tiada projek pensijilan — pesan, terima, jual.',

    'Getting-started FAQ': 'Soalan Lazim Permulaan',
    'Questions first-time sellers ask.': 'Soalan yang ditanya penjual kali pertama.',

    '>Wholesale supplements for resale: the buyer\'s guide</a>': '>Suplemen borong untuk dijual semula: panduan pembeli</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Memilih pembekal Tongkat Ali</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Minuman Tongkat Ali vs kapsul: memilih format yang tepat</a>',
    '>What is a Tongkat Ali sachet drink?</a>': '>Apa itu minuman sachet Tongkat Ali?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Pemborongan &amp; pengedaran UNI MAX</a>',

    'Skip the production run. Start with a shelf trial.': 'Langkau larian pengeluaran. Mulakan dengan percubaan rak.',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX dibekalkan sedia-runcit kepada penstok, pemborong dan pengedar serantau — kemasukan dicadangkan dari 12 kotak. Beritahu kami pasaran anda dan kami akan sahkan terma.',
  },
},

pl: {
  meta: {
    title: 'Założyć Firmę Suplementową czy Zostać Dystrybutorem? | UNI MAX',
    desc: 'Zbudowanie marki suplementów zajmuje miesiące i wymaga poważnego kapitału. Dystrybucja ugruntowanej, certyfikowanej marki zaczyna się od kilkunastu pudełek. Cztery drogi wejścia w biznes suplementów porównane — koszty, ryzyko i dla kogo która pasuje.',
    ogTitle: 'Założyć Firmę Suplementową czy Zostać Dystrybutorem? — UNI MAX',
    ogDesc: 'Cztery drogi wejścia w biznes suplementów porównane — budowa marki, private label, dystrybucja i dropshipping — z uczciwymi kosztami i ryzykiem.',
  },
  breadcrumbName: 'Założyć Firmę Suplementową czy Zostać Dystrybutorem?',
  articleHeadline: 'Założyć Firmę Suplementową — czy Zostać Dystrybutorem?',
  articleDescription: 'Cztery drogi wejścia w biznes suplementów porównane — budowa marki, private label, dystrybucja i dropshipping — z uczciwymi kosztami, ryzykiem i informacją, dla kogo która droga pasuje.',
  faq: [
    { q: 'Jak zostać dystrybutorem suplementów?', a: 'Najszybszą drogą jest dystrybucja ugruntowanej, certyfikowanej marki, a nie budowanie własnej od zera: potwierdź certyfikaty produkcyjne produktu (HALAL, GMP, HACCP lub odpowiednik na docelowym rynku), uzgodnij zamówienie startowe z właścicielem marki i zarejestruj produkt zgodnie z własnymi lokalnymi wymogami działalności i importu. W przypadku UNI MAX pierwszym krokiem jest zamówienie towaru, a nie partia produkcyjna — poziomy współpracy zaczynają się od sugerowanych 12–24 pudełek dla punktu sprzedaży detalicznej, a zapytania obsługiwane są bezpośrednio przez WhatsApp z odpowiedzią tego samego dnia.' },
    { q: 'Ile kosztuje założenie firmy suplementowej?', a: 'Budowa marki od zera zwykle oznacza opłacenie receptury, badań bezpieczeństwa i stabilności, projektu opakowania, certyfikatów i minimalnej partii produkcyjnej w fabryce — projekt liczony w miesiącach i wymagający znacznego kapitału przed pierwszą sprzedażą. Dystrybucja ugruntowanej marki odwraca tę sytuację: głównym kosztem jest pierwsze zamówienie towaru. Jako punkt odniesienia — współpraca z UNI MAX zaczyna się od sugerowanych 12–24 pudełek dla punktu sprzedaży detalicznej.' },
    { q: 'Czy potrzebuję własnych certyfikatów, by dystrybuować markę suplementów?', a: 'Certyfikaty produkcyjne, takie jak HALAL, GMP czy HACCP, są zarejestrowane na zakład produkujący produkt, a nie na resellera — UNI MAX, na przykład, jest produkowany w Orient Biotech Sdn Bhd, certyfikowanym zakładzie w Malezji. Jako dystrybutor działasz zgodnie z własnymi lokalnymi wymogami działalności i importu, które różnią się w zależności od rynku i warto je potwierdzić dla swojego kraju przed złożeniem zamówienia.' },
    { q: 'Czy dystrybucja jest lepsza niż budowanie własnej marki suplementów?', a: 'Żadna z opcji nie jest uniwersalnie lepsza. Budowa marki daje pełną kontrolę i największą potencjalną marżę, przy najwyższym koszcie i najwolniejszym starcie. Dystrybucja zamienia część marży na szybkość i niskie ryzyko: produkt, opakowanie, certyfikaty i receptura już istnieją, więc twoją pracą jest sprzedaż i budowanie kanałów. Dropshipping wymaga jeszcze mniejszego zaangażowania, ale z najmniejszą kontrolą nad jakością i doświadczeniem klienta.' },
    { q: 'Czy zostanie dystrybutorem suplementów jest opłacalne?', a: 'Może być, ale dystrybucja z założenia jest ścieżką o średniej marży — wymieniasz część marży na niższy koszt początkowy i szybszy start, a nie dążysz do najwyższej możliwej marży, jak przy budowaniu własnej marki. Opłacalność zależy od Twojej sprzedaży i budowania kanałów, a nie od samego produktu — ten sam certyfikowany towar sprzedany dobrze przez odpowiednie sklepy, siłownie czy kliniki przynosi zupełnie inne wyniki niż towar leżący na półce. Nie ma jednej liczby zysku obowiązującej dla wszystkich rynków — zależy to od Twojej wyceny, kanału i wolumenu.' },
  ],
  html: {
    'Business Guide': 'Przewodnik biznesowy',
    'Start a supplement business — or become a distributor?': 'Założyć firmę suplementową — czy zostać dystrybutorem?',
    'Most guides on starting a supplement business assume you want to build a brand from scratch. There are actually four routes in — and for many first-time sellers, the cheapest and fastest one is the one nobody writes about: distributing a brand that already exists.':
      'Większość przewodników o zakładaniu firmy suplementowej zakłada, że chcesz zbudować markę od zera. W rzeczywistości istnieją cztery drogi wejścia — a dla wielu sprzedawców rozpoczynających działalność najtańszą i najszybszą jest ta, o której nikt nie pisze: dystrybucja marki, która już istnieje.',

    'The four routes into the supplement business': 'Cztery drogi wejścia w biznes suplementów',
    '<p><strong>1. Build your own brand.</strong> You develop or license a formula, contract a factory, design packaging, run the safety and stability work, and pay for the certifications and a minimum production run. Full control, the largest potential margin — and the slowest, most capital-hungry start. This is the route most "how to start a supplement company" guides describe, and it is a genuine product-development project measured in months.</p>':
      '<p><strong>1. Zbuduj własną markę.</strong> Opracowujesz lub licencjonujesz recepturę, zlecasz produkcję fabryce, projektujesz opakowanie, przeprowadzasz badania bezpieczeństwa i stabilności oraz płacisz za certyfikaty i minimalną partię produkcyjną. Pełna kontrola, największa potencjalna marża — i najwolniejszy, najbardziej kapitałochłonny start. To droga opisywana w większości poradników "jak założyć firmę suplementową", i to prawdziwy projekt rozwoju produktu liczony w miesiącach.</p>',
    '<p><strong>2. Private label.</strong> A factory\'s existing formula with your label on it. Faster than building from scratch, but you still own packaging, branding, marketing and compliance for a product that is materially identical to everyone else\'s private-label version of the same formula.</p>':
      '<p><strong>2. Private label.</strong> Istniejąca receptura fabryki z twoją etykietą. Szybciej niż budowanie od zera, ale nadal odpowiadasz za opakowanie, markę, marketing i zgodność produktu, który jest materialnie identyczny z wersją private label każdego innego sprzedawcy tej samej receptury.</p>',
    '<p><strong>3. Distribute an established brand.</strong> You buy a finished, certified, retail-ready product at wholesale terms and sell it through your channels — shops, gyms, clinics, e-commerce. The brand owner has already done the formulation, certification and packaging. Your job is the part factories cannot do: local sales and channel-building.</p>':
      '<p><strong>3. Dystrybuuj ugruntowaną markę.</strong> Kupujesz gotowy, certyfikowany, gotowy do sprzedaży detalicznej produkt na warunkach hurtowych i sprzedajesz go przez swoje kanały — sklepy, siłownie, kliniki, e-commerce. Właściciel marki już opracował recepturę, certyfikaty i opakowanie. Twoim zadaniem jest to, czego fabryki nie potrafią: lokalna sprzedaż i budowanie kanałów.</p>',
    '<p><strong>4. Dropship.</strong> You list products you never touch. Lowest commitment, thinnest margins, and the least control over quality, delivery and customer experience.</p>':
      '<p><strong>4. Dropshipping.</strong> Wystawiasz produkty, których nigdy nie dotykasz. Najniższe zaangażowanie, najcieńsze marże i najmniejsza kontrola nad jakością, dostawą i doświadczeniem klienta.</p>',

    'The honest comparison': 'Uczciwe porównanie',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Droga</th><th>Koszt początkowy</th><th>Czas do pierwszej sprzedaży</th><th>Marża</th><th>Główne ryzyko</th></tr>
        </thead>
        <tbody>
          <tr><td>Własna marka</td><td>Najwyższy — receptura, certyfikaty, minimalna partia produkcyjna</td><td>Miesiące</td><td>Najwyższa</td><td>Kapitał zainwestowany przed potwierdzeniem popytu</td></tr>
          <tr><td>Private label</td><td>Wysoki — partia etykiet + MOQ fabryki</td><td>Tygodnie–miesiące</td><td>Wysoka</td><td>Ta sama receptura co private label każdego konkurenta</td></tr>
          <tr><td>Dystrybucja</td><td>Niski — pierwsze zamówienie towaru</td><td>Dni–tygodnie</td><td>Średnia</td><td>Reprezentujesz markę, która nie jest twoja</td></tr>
          <tr><td>Dropshipping</td><td>Minimalny</td><td>Dni</td><td>Najcieńsza</td><td>Brak kontroli nad produktem lub dostawą</td></tr>
        </tbody>
      </table>`,

    'What "how much does it cost" actually depends on': 'Od czego naprawdę zależy "ile to kosztuje"',
    'For the brand-building route, the cost question has no honest single answer — it depends on formula complexity, certifications, packaging and the factory\'s minimum run. What can be said honestly: it is front-loaded. Almost all of it is spent <em>before</em> you learn whether anyone buys.':
      'W przypadku budowania marki pytanie o koszt nie ma jednej uczciwej odpowiedzi — zależy od złożoności receptury, certyfikatów, opakowania i minimalnej partii fabryki. Co można powiedzieć uczciwie: koszty są ponoszone z góry. Niemal wszystko wydajesz <em>zanim</em> dowiesz się, czy ktoś kupuje.',
    'Distribution inverts the cost curve. The main cost is your first stock order, and it scales with your confidence. As a concrete reference point: UNI MAX — a ready-to-drink botanical vitality drink from Malaysia — suggests <strong>12–24 boxes for a first retail stockist order</strong>, 50–100 for wholesale partners, and 300+ for regional distributors, with actual quantities confirmed on enquiry. A first position in the product costs a shelf trial, not a production run.':
      'Dystrybucja odwraca tę krzywą kosztów. Głównym kosztem jest pierwsze zamówienie towaru, a jego wielkość rośnie wraz z twoją pewnością. Jako konkretny punkt odniesienia: UNI MAX — gotowy do picia botaniczny napój witalny z Malezji — sugeruje <strong>12–24 pudełka na pierwsze zamówienie punktu sprzedaży detalicznej</strong>, 50–100 dla partnerów hurtowych i 300+ dla dystrybutorów regionalnych, z rzeczywistymi ilościami potwierdzanymi przy zapytaniu. Pierwsza pozycja w produkcie kosztuje tyle, co próba na półce, a nie partia produkcyjna.',

    'Who each route actually suits': 'Dla kogo naprawdę pasuje każda droga',
    [UL_ROUTES_EN]: `      <ul>
        <li><strong>Zbuduj markę</strong>, jeśli masz naprawdę wyróżniającą się recepturę, kapitał, który możesz zainwestować na miesiące, i umiejętności marketingowe, by stworzyć popyt od zera.</li>
        <li><strong>Private label</strong>, jeśli twoją mocną stroną jest marketing i akceptujesz sprzedaż wspólnej receptury pod własną nazwą.</li>
        <li><strong>Dystrybuuj</strong>, jeśli twoją mocną stroną jest sprzedaż i kanały — znasz sklepy, siłownie, kliniki lub nabywców na swoim rynku i chcesz certyfikowany produkt do zaprezentowania im w tym miesiącu, nie w przyszłym roku.</li>
        <li><strong>Dropshipping</strong>, jeśli testujesz popyt przy minimalnym zaangażowaniu i akceptujesz związane z tym kompromisy.</li>
      </ul>`,
    'A pattern worth noticing: people researching "how to start a supplement business" usually have a <em>sales</em> skill set, not a product-development one. If that is you, distribution is the route where your actual skill does the work from day one — the product, certifications and packaging already exist. See <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a> before committing to one.':
      'Warty uwagi wzorzec: osoby szukające informacji o tym, "jak założyć firmę suplementową", zwykle mają umiejętności <em>sprzedażowe</em>, a nie związane z rozwojem produktu. Jeśli to opisuje ciebie, dystrybucja to droga, na której twoje faktyczne umiejętności pracują od pierwszego dnia — produkt, certyfikaty i opakowanie już istnieją. Zobacz, <a href="/guides/tongkat-ali-drink-supplier-checklist/">jak ocenić dostawcę</a>, zanim się na niego zdecydujesz.',

    'What distributing an established brand looks like in practice': 'Jak w praktyce wygląda dystrybucja ugruntowanej marki',
    'Using UNI MAX as the example we know best: the product arrives as finished retail-ready boxes — 30 × 10&nbsp;g ready-to-drink sachets of a botanical lychee vitality drink with Triple Force Tongkat Ali — produced and filled at a certified Malaysian facility (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP are registered to that facility). Partnership levels run from retail stockist to regional distributor, and enquiries are handled directly over WhatsApp with a same-day reply. No repacking, no reformulation, no certification project — order, receive, sell.':
      'Na przykładzie UNI MAX, który znamy najlepiej: produkt dociera jako gotowe, przeznaczone do sprzedaży detalicznej pudełka — 30 × 10&nbsp;g saszetek gotowego do picia botanicznego napoju witalnego liczi z Tongkat Ali Potrójnej Mocy — produkowanego i napełnianego w certyfikowanym zakładzie w Malezji (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 i HACCP są zarejestrowane na ten zakład). Poziomy współpracy obejmują od punktu sprzedaży detalicznej po dystrybutora regionalnego, a zapytania obsługiwane są bezpośrednio przez WhatsApp z odpowiedzią tego samego dnia. Bez przepakowywania, bez zmiany receptury, bez projektu certyfikacji — zamów, odbierz, sprzedaj.',

    'Getting-started FAQ': 'FAQ dla rozpoczynających',
    'Questions first-time sellers ask.': 'Pytania zadawane przez sprzedawców rozpoczynających działalność.',

    '>Wholesale supplements for resale: the buyer\'s guide</a>': '>Suplementy hurtowe do odsprzedaży: przewodnik kupującego</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Jak wybrać dostawcę Tongkat Ali</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Napój z Tongkat Ali a kapsułki: jak wybrać właściwy format</a>',
    '>What is a Tongkat Ali sachet drink?</a>': '>Czym jest napój Tongkat Ali w saszetce?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>Hurt i dystrybucja UNI MAX</a>',

    'Skip the production run. Start with a shelf trial.': 'Pomiń partię produkcyjną. Zacznij od próby na półce.',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX jest dostarczany gotowy do sprzedaży detalicznej dla punktów sprzedaży, hurtowników i dystrybutorów regionalnych — sugerowany start od 12 pudełek. Podaj nam swój rynek, a potwierdzimy warunki.',
  },
},

nl: {
  meta: {
    title: 'Supplementenbedrijf Starten of Distributeur Worden? | UNI MAX',
    desc: 'Het bouwen van een supplementenmerk kost maanden en serieus kapitaal. Het distribueren van een gevestigd, gecertificeerd merk begint bij een handvol dozen. De vier routes naar de supplementenbusiness vergeleken — kosten, risico\'s en wie welke route past.',
    ogTitle: 'Supplementenbedrijf Starten of Distributeur Worden? — UNI MAX',
    ogDesc: 'De vier routes naar de supplementenbusiness vergeleken — merk bouwen, private label, distributie en dropshipping — met eerlijke kosten en risico\'s.',
  },
  breadcrumbName: 'Supplementenbedrijf Starten of Distributeur Worden?',
  articleHeadline: 'Een Supplementenbedrijf Starten — of Distributeur Worden?',
  articleDescription: 'De vier routes naar de supplementenbusiness vergeleken — merk bouwen, private label, distributie en dropshipping — met eerlijke kosten, risico\'s en wie elke route past.',
  faq: [
    { q: 'Hoe word ik een supplementendistributeur?', a: 'De snelste weg is het distribueren van een gevestigd, gecertificeerd merk in plaats van er zelf een op te bouwen: bevestig de productiecertificeringen van het product (HALAL, GMP, HACCP of het equivalent van uw doelmarkt), spreek een startbestelling af met de merkeigenaar, en registreer het product volgens uw eigen lokale bedrijfs- en importvereisten. Bij UNI MAX is die eerste stap een voorraadbestelling in plaats van een productierun — partnerschapsniveaus beginnen bij een voorgestelde 12–24 dozen voor een retailer, en aanvragen worden rechtstreeks via WhatsApp afgehandeld met een reactie dezelfde dag.' },
    { q: 'Hoeveel kost het om een supplementenbedrijf te starten?', a: 'Een merk vanaf nul bouwen betekent doorgaans betalen voor formulering, veiligheids- en stabiliteitswerk, verpakkingsontwerp, certificeringen en een minimale productierun van de fabriek — een project gemeten in maanden en aanzienlijk kapitaal vóór de eerste verkoop. Het distribueren van een gevestigd merk keert dat om: de belangrijkste kost is uw eerste voorraadbestelling. Als referentiepunt: het UNI MAX-partnerschap begint bij een voorgestelde 12–24 dozen voor een retailer.' },
    { q: 'Heb ik eigen certificeringen nodig om een supplementenmerk te distribueren?', a: 'Productiecertificeringen zoals HALAL, GMP of HACCP zijn geregistreerd op de faciliteit die het product produceert, niet op de wederverkoper — UNI MAX wordt bijvoorbeeld geproduceerd bij Orient Biotech Sdn Bhd, een gecertificeerde Maleisische faciliteit. Als distributeur opereert u onder uw eigen lokale bedrijfs- en importvereisten, die per markt verschillen en de moeite waard zijn om te bevestigen voor uw land voordat u bestelt.' },
    { q: 'Is distribueren beter dan mijn eigen supplementenmerk bouwen?', a: 'Geen van beide is universeel beter. Een merk bouwen biedt volledige controle en de grootste potentiële marge, tegen de hoogste kosten en de traagste start. Distributie ruilt wat marge in voor snelheid en laag risico: het product, de verpakking, certificeringen en formule bestaan al, dus uw werk is verkoop en kanaalopbouw. Dropshipping vereist nog minder betrokkenheid, maar met de minste controle over kwaliteit en klantervaring.' },
    { q: 'Is het winstgevend om supplementendistributeur te worden?', a: 'Dat kan, maar distributie is bewust een route met een gemiddelde marge — je ruilt een deel van de marge in voor lagere opstartkosten en een snellere start, niet voor de hoogst mogelijke marge zoals bij het bouwen van een eigen merk. Winstgevendheid komt voort uit je eigen verkoop en kanaalopbouw, niet uit het product zelf — dezelfde gecertificeerde voorraad die goed wordt verkocht via de juiste winkels, sportscholen of klinieken levert heel anders op dan voorraad die op een schap blijft staan. Er is geen vast winstcijfer dat voor alle markten geldt — het hangt af van je prijsstelling, kanaal en volume.' },
  ],
  html: {
    'Business Guide': 'Bedrijfsgids',
    'Start a supplement business — or become a distributor?': 'Een supplementenbedrijf starten — of distributeur worden?',
    'Most guides on starting a supplement business assume you want to build a brand from scratch. There are actually four routes in — and for many first-time sellers, the cheapest and fastest one is the one nobody writes about: distributing a brand that already exists.':
      'De meeste gidsen over het starten van een supplementenbedrijf gaan ervan uit dat u vanaf nul een merk wilt bouwen. Er zijn eigenlijk vier routes naar binnen — en voor veel starters is de goedkoopste en snelste degene waar niemand over schrijft: het distribueren van een merk dat al bestaat.',

    'The four routes into the supplement business': 'De vier routes naar de supplementenbusiness',
    '<p><strong>1. Build your own brand.</strong> You develop or license a formula, contract a factory, design packaging, run the safety and stability work, and pay for the certifications and a minimum production run. Full control, the largest potential margin — and the slowest, most capital-hungry start. This is the route most "how to start a supplement company" guides describe, and it is a genuine product-development project measured in months.</p>':
      '<p><strong>1. Bouw uw eigen merk.</strong> U ontwikkelt of licentieert een formule, contracteert een fabriek, ontwerpt verpakking, voert veiligheids- en stabiliteitswerk uit, en betaalt voor certificeringen en een minimale productierun. Volledige controle, de grootste potentiële marge — en de traagste, meest kapitaalintensieve start. Dit is de route die de meeste gidsen over "hoe start ik een supplementenbedrijf" beschrijven, en het is een echt productontwikkelingsproject dat in maanden wordt gemeten.</p>',
    '<p><strong>2. Private label.</strong> A factory\'s existing formula with your label on it. Faster than building from scratch, but you still own packaging, branding, marketing and compliance for a product that is materially identical to everyone else\'s private-label version of the same formula.</p>':
      '<p><strong>2. Private label.</strong> Een bestaande formule van een fabriek met uw label erop. Sneller dan vanaf nul bouwen, maar u bent nog steeds verantwoordelijk voor verpakking, branding, marketing en compliance voor een product dat materieel identiek is aan ieders private-labelversie van dezelfde formule.</p>',
    '<p><strong>3. Distribute an established brand.</strong> You buy a finished, certified, retail-ready product at wholesale terms and sell it through your channels — shops, gyms, clinics, e-commerce. The brand owner has already done the formulation, certification and packaging. Your job is the part factories cannot do: local sales and channel-building.</p>':
      '<p><strong>3. Distribueer een gevestigd merk.</strong> U koopt een afgewerkt, gecertificeerd, verkoopklaar product tegen groothandelsvoorwaarden en verkoopt het via uw kanalen — winkels, sportscholen, klinieken, e-commerce. De merkeigenaar heeft de formulering, certificering en verpakking al gedaan. Uw taak is het deel dat fabrieken niet kunnen doen: lokale verkoop en kanaalopbouw.</p>',
    '<p><strong>4. Dropship.</strong> You list products you never touch. Lowest commitment, thinnest margins, and the least control over quality, delivery and customer experience.</p>':
      '<p><strong>4. Dropshipping.</strong> U vermeldt producten die u nooit aanraakt. Laagste betrokkenheid, dunste marges, en de minste controle over kwaliteit, levering en klantervaring.</p>',

    'The honest comparison': 'De eerlijke vergelijking',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Route</th><th>Vooraf kosten</th><th>Tijd tot eerste verkoop</th><th>Marge</th><th>Belangrijkste risico</th></tr>
        </thead>
        <tbody>
          <tr><td>Eigen merk</td><td>Hoogst — formulering, certificering, minimale productierun</td><td>Maanden</td><td>Hoogst</td><td>Kapitaal geïnvesteerd voordat vraag is bewezen</td></tr>
          <tr><td>Private label</td><td>Hoog — labelrun + fabrieks-MOQ</td><td>Weken–maanden</td><td>Hoog</td><td>Zelfde formule als ieders private label van elke concurrent</td></tr>
          <tr><td>Distributie</td><td>Laag — eerste voorraadbestelling</td><td>Dagen–weken</td><td>Gemiddeld</td><td>U vertegenwoordigt een merk dat u niet bezit</td></tr>
          <tr><td>Dropshipping</td><td>Minimaal</td><td>Dagen</td><td>Dunst</td><td>Geen controle over product of levering</td></tr>
        </tbody>
      </table>`,

    'What "how much does it cost" actually depends on': 'Waar "hoeveel kost het" eigenlijk van afhangt',
    'For the brand-building route, the cost question has no honest single answer — it depends on formula complexity, certifications, packaging and the factory\'s minimum run. What can be said honestly: it is front-loaded. Almost all of it is spent <em>before</em> you learn whether anyone buys.':
      'Voor de route van merkopbouw heeft de kostenvraag geen eerlijk enkelvoudig antwoord — het hangt af van de complexiteit van de formule, certificeringen, verpakking en de minimale run van de fabriek. Wat eerlijk gezegd kan worden: het wordt vooraf uitgegeven. Bijna alles wordt uitgegeven <em>voordat</em> u weet of iemand koopt.',
    'Distribution inverts the cost curve. The main cost is your first stock order, and it scales with your confidence. As a concrete reference point: UNI MAX — a ready-to-drink botanical vitality drink from Malaysia — suggests <strong>12–24 boxes for a first retail stockist order</strong>, 50–100 for wholesale partners, and 300+ for regional distributors, with actual quantities confirmed on enquiry. A first position in the product costs a shelf trial, not a production run.':
      'Distributie draait de kostencurve om. De belangrijkste kost is uw eerste voorraadbestelling, en die schaalt met uw vertrouwen. Als concreet referentiepunt: UNI MAX — een kant-en-klare botanische vitaliteitsdrank uit Maleisië — stelt <strong>12–24 dozen voor voor een eerste bestelling van een retailer</strong>, 50–100 voor groothandelspartners, en 300+ voor regionale distributeurs, met werkelijke hoeveelheden bevestigd bij navraag. Een eerste positie in het product kost een schapproef, geen productierun.',

    'Who each route actually suits': 'Voor wie elke route eigenlijk geschikt is',
    [UL_ROUTES_EN]: `      <ul>
        <li><strong>Bouw een merk</strong> als u een echt onderscheidende formule heeft, kapitaal dat u zich kunt veroorloven om maanden te investeren, en marketingvaardigheden om vraag vanaf nul te creëren.</li>
        <li><strong>Private label</strong> als uw kracht marketing is en u accepteert een gedeelde formule onder uw eigen naam te verkopen.</li>
        <li><strong>Distribueer</strong> als uw kracht verkoop en kanalen zijn — u kent winkels, sportscholen, klinieken of kopers in uw markt en wilt een gecertificeerd product deze maand aan hen presenteren, niet volgend jaar.</li>
        <li><strong>Dropshipping</strong> als u de vraag test met minimale betrokkenheid en de bijbehorende compromissen accepteert.</li>
      </ul>`,
    'A pattern worth noticing: people researching "how to start a supplement business" usually have a <em>sales</em> skill set, not a product-development one. If that is you, distribution is the route where your actual skill does the work from day one — the product, certifications and packaging already exist. See <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a> before committing to one.':
      'Een patroon dat de moeite waard is om op te merken: mensen die onderzoeken "hoe start ik een supplementenbedrijf" hebben meestal <em>verkoop</em>vaardigheden, geen productontwikkelingsvaardigheden. Als dat u is, is distributie de route waar uw daadwerkelijke vaardigheid vanaf dag één het werk doet — het product, de certificeringen en de verpakking bestaan al. Bekijk <a href="/guides/tongkat-ali-drink-supplier-checklist/">hoe u een leverancier evalueert</a> voordat u zich aan een verbindt.',

    'What distributing an established brand looks like in practice': 'Hoe het distribueren van een gevestigd merk er in de praktijk uitziet',
    'Using UNI MAX as the example we know best: the product arrives as finished retail-ready boxes — 30 × 10&nbsp;g ready-to-drink sachets of a botanical lychee vitality drink with Triple Force Tongkat Ali — produced and filled at a certified Malaysian facility (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP are registered to that facility). Partnership levels run from retail stockist to regional distributor, and enquiries are handled directly over WhatsApp with a same-day reply. No repacking, no reformulation, no certification project — order, receive, sell.':
      'Met UNI MAX als het voorbeeld dat we het beste kennen: het product komt aan als afgewerkte verkoopklare dozen — 30 × 10&nbsp;g drinkklare sachets van een botanische lychee-vitaliteitsdrank met Tongkat Ali met Drievoudige Kracht — geproduceerd en gevuld in een gecertificeerde Maleisische faciliteit (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 en HACCP zijn geregistreerd op die faciliteit). Partnerschapsniveaus lopen van retailer tot regionale distributeur, en aanvragen worden rechtstreeks via WhatsApp afgehandeld met een reactie dezelfde dag. Geen herverpakking, geen herformulering, geen certificeringsproject — bestellen, ontvangen, verkopen.',

    'Getting-started FAQ': 'Veelgestelde vragen voor starters',
    'Questions first-time sellers ask.': 'Vragen die starters stellen.',

    '>Wholesale supplements for resale: the buyer\'s guide</a>': '>Groothandelssupplementen voor wederverkoop: de koopgids</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Een Tongkat Ali-leverancier kiezen</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Tongkat Ali-drank vs capsules: het juiste formaat kiezen</a>',
    '>What is a Tongkat Ali sachet drink?</a>': '>Wat is een Tongkat Ali sachetdrank?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX groothandel &amp; distributie</a>',

    'Skip the production run. Start with a shelf trial.': 'Sla de productierun over. Begin met een schapproef.',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX wordt kant-en-verkoopklaar geleverd aan wederverkopers, groothandels en regionale distributeurs — voorgestelde instap vanaf 12 dozen. Vertel ons uw markt en wij bevestigen de voorwaarden.',
  },
},

de: {
  meta: {
    title: 'Supplement-Firma Gründen oder Vertriebspartner Werden? | UNI MAX',
    desc: 'Der Aufbau einer Nahrungsergänzungsmittelmarke dauert Monate und erfordert erhebliches Kapital. Der Vertrieb einer etablierten, zertifizierten Marke beginnt bei einem Dutzend Boxen. Die vier Wege in das Nahrungsergänzungsmittelgeschäft im Vergleich — Kosten, Risiken und wer zu welchem passt.',
    ogTitle: 'Nahrungsergänzungsmittel-Firma Gründen oder Vertriebspartner Werden? — UNI MAX',
    ogDesc: 'Die vier Wege in das Nahrungsergänzungsmittelgeschäft im Vergleich — eigene Marke, Private Label, Vertrieb und Dropshipping — mit ehrlichen Kosten und Risiken.',
  },
  breadcrumbName: 'Nahrungsergänzungsmittel-Firma Gründen oder Vertriebspartner Werden?',
  articleHeadline: 'Nahrungsergänzungsmittel-Firma Gründen — oder Vertriebspartner Werden?',
  articleDescription: 'Die vier Wege in das Nahrungsergänzungsmittelgeschäft im Vergleich — eigene Marke, Private Label, Vertrieb und Dropshipping — mit ehrlichen Kosten, Risiken und wer zu welchem Weg passt.',
  faq: [
    { q: 'Wie werde ich Vertriebspartner für Nahrungsergänzungsmittel?', a: 'Der schnellste Weg ist der Vertrieb einer etablierten, zertifizierten Marke statt einer eigenen von Grund auf: Bestätigen Sie die Herstellungszertifizierungen des Produkts (HALAL, GMP, HACCP oder das Äquivalent Ihres Zielmarkts), vereinbaren Sie eine Starterbestellung mit dem Markeninhaber und registrieren Sie das Produkt gemäß Ihren eigenen lokalen Geschäfts- und Importanforderungen. Bei UNI MAX ist dieser erste Schritt eine Warenbestellung statt eines Produktionslaufs — Partnerschaftsstufen beginnen bei empfohlenen 12–24 Boxen für einen Einzelhändler, und Anfragen werden direkt über WhatsApp mit Antwort am selben Tag bearbeitet.' },
    { q: 'Wie viel kostet es, ein Nahrungsergänzungsmittelunternehmen zu gründen?', a: 'Eine Marke von Grund auf aufzubauen bedeutet in der Regel, für Rezeptur, Sicherheits- und Stabilitätsarbeit, Verpackungsdesign, Zertifizierungen und einen minimalen Produktionslauf der Fabrik zu zahlen — ein Projekt, das in Monaten gemessen wird, mit erheblichem Kapitaleinsatz vor dem ersten Verkauf. Der Vertrieb einer etablierten Marke kehrt das um: Die Hauptkosten sind Ihre erste Warenbestellung. Als Referenzwert: Die UNI MAX-Partnerschaft beginnt bei empfohlenen 12–24 Boxen für einen Einzelhändler.' },
    { q: 'Benötige ich eigene Zertifizierungen, um eine Nahrungsergänzungsmittelmarke zu vertreiben?', a: 'Herstellungszertifizierungen wie HALAL, GMP oder HACCP sind auf die Anlage registriert, die das Produkt herstellt, nicht auf den Wiederverkäufer — UNI MAX zum Beispiel wird bei Orient Biotech Sdn Bhd hergestellt, einer zertifizierten malaysischen Anlage. Als Vertriebspartner agieren Sie gemäß Ihren eigenen lokalen Geschäfts- und Importanforderungen, die je nach Markt variieren und es wert sind, für Ihr Land vor der Bestellung bestätigt zu werden.' },
    { q: 'Ist Vertrieb besser als der Aufbau meiner eigenen Nahrungsergänzungsmittelmarke?', a: 'Keines von beiden ist universell besser. Der Aufbau einer Marke bietet volle Kontrolle und die größte potenzielle Marge, bei den höchsten Kosten und dem langsamsten Start. Vertrieb tauscht etwas Marge gegen Geschwindigkeit und geringes Risiko: Produkt, Verpackung, Zertifizierungen und Rezeptur existieren bereits, sodass Ihre Arbeit Verkauf und Kanalaufbau ist. Dropshipping erfordert noch weniger Engagement, aber mit der geringsten Kontrolle über Qualität und Kundenerfahrung.' },
    { q: 'Ist es profitabel, Nahrungsergänzungsmittel-Vertriebspartner zu werden?', a: 'Das kann es sein, aber Vertrieb ist bewusst ein Weg mit mittlerer Marge — man tauscht einen Teil der Marge gegen geringere Anfangskosten und einen schnelleren Start, nicht gegen die höchstmögliche Marge wie beim Aufbau einer eigenen Marke. Die Profitabilität hängt von den eigenen Verkaufs- und Kanalaufbau-Fähigkeiten ab, nicht vom Produkt selbst — dieselbe zertifizierte Ware, gut über die richtigen Geschäfte, Fitnessstudios oder Kliniken verkauft, bringt ganz andere Ergebnisse als Ware, die im Regal liegen bleibt. Es gibt keine einzelne Gewinnzahl, die für alle Märkte gilt — das hängt von der eigenen Preisgestaltung, dem Kanal und dem Volumen ab.' },
  ],
  html: {
    'Business Guide': 'Business-Guide',
    'Start a supplement business — or become a distributor?': 'Ein Nahrungsergänzungsmittelunternehmen gründen — oder Vertriebspartner werden?',
    'Most guides on starting a supplement business assume you want to build a brand from scratch. There are actually four routes in — and for many first-time sellers, the cheapest and fastest one is the one nobody writes about: distributing a brand that already exists.':
      'Die meisten Anleitungen zum Start eines Nahrungsergänzungsmittelgeschäfts gehen davon aus, dass Sie eine Marke von Grund auf aufbauen möchten. Tatsächlich gibt es vier Wege — und für viele Erstverkäufer ist der günstigste und schnellste derjenige, über den niemand schreibt: den Vertrieb einer bereits existierenden Marke.',

    'The four routes into the supplement business': 'Die vier Wege in das Nahrungsergänzungsmittelgeschäft',
    '<p><strong>1. Build your own brand.</strong> You develop or license a formula, contract a factory, design packaging, run the safety and stability work, and pay for the certifications and a minimum production run. Full control, the largest potential margin — and the slowest, most capital-hungry start. This is the route most "how to start a supplement company" guides describe, and it is a genuine product-development project measured in months.</p>':
      '<p><strong>1. Bauen Sie Ihre eigene Marke auf.</strong> Sie entwickeln oder lizenzieren eine Rezeptur, beauftragen eine Fabrik, gestalten die Verpackung, führen Sicherheits- und Stabilitätsarbeiten durch und bezahlen für Zertifizierungen und einen minimalen Produktionslauf. Volle Kontrolle, die größte potenzielle Marge — und der langsamste, kapitalintensivste Start. Das ist der Weg, den die meisten Anleitungen zu "wie gründe ich ein Nahrungsergänzungsmittelunternehmen" beschreiben, und es ist ein echtes Produktentwicklungsprojekt, gemessen in Monaten.</p>',
    '<p><strong>2. Private label.</strong> A factory\'s existing formula with your label on it. Faster than building from scratch, but you still own packaging, branding, marketing and compliance for a product that is materially identical to everyone else\'s private-label version of the same formula.</p>':
      '<p><strong>2. Private Label.</strong> Eine bestehende Rezeptur einer Fabrik mit Ihrem Etikett darauf. Schneller als von Grund auf aufzubauen, aber Sie tragen weiterhin Verpackung, Markenbildung, Marketing und Compliance für ein Produkt, das materiell identisch mit der Private-Label-Version aller anderen derselben Rezeptur ist.</p>',
    '<p><strong>3. Distribute an established brand.</strong> You buy a finished, certified, retail-ready product at wholesale terms and sell it through your channels — shops, gyms, clinics, e-commerce. The brand owner has already done the formulation, certification and packaging. Your job is the part factories cannot do: local sales and channel-building.</p>':
      '<p><strong>3. Vertreiben Sie eine etablierte Marke.</strong> Sie kaufen ein fertiges, zertifiziertes, verkaufsfertiges Produkt zu Großhandelskonditionen und verkaufen es über Ihre Kanäle — Geschäfte, Fitnessstudios, Kliniken, E-Commerce. Der Markeninhaber hat Rezeptur, Zertifizierung und Verpackung bereits erledigt. Ihre Aufgabe ist der Teil, den Fabriken nicht leisten können: lokaler Verkauf und Kanalaufbau.</p>',
    '<p><strong>4. Dropship.</strong> You list products you never touch. Lowest commitment, thinnest margins, and the least control over quality, delivery and customer experience.</p>':
      '<p><strong>4. Dropshipping.</strong> Sie listen Produkte, die Sie nie berühren. Geringstes Engagement, dünnste Margen und die geringste Kontrolle über Qualität, Lieferung und Kundenerfahrung.</p>',

    'The honest comparison': 'Der ehrliche Vergleich',
    [TABLE_EN]: `      <table class="gd-table">
        <thead>
          <tr><th>Weg</th><th>Vorabkosten</th><th>Zeit bis zum ersten Verkauf</th><th>Marge</th><th>Hauptrisiko</th></tr>
        </thead>
        <tbody>
          <tr><td>Eigene Marke</td><td>Am höchsten — Rezeptur, Zertifizierung, minimaler Produktionslauf</td><td>Monate</td><td>Am höchsten</td><td>Kapital investiert, bevor Nachfrage nachgewiesen ist</td></tr>
          <tr><td>Private Label</td><td>Hoch — Etikettenlauf + Fabrik-MOQ</td><td>Wochen–Monate</td><td>Hoch</td><td>Gleiche Rezeptur wie das Private Label jedes Wettbewerbers</td></tr>
          <tr><td>Vertrieb</td><td>Niedrig — erste Warenbestellung</td><td>Tage–Wochen</td><td>Mittel</td><td>Sie repräsentieren eine Marke, die Ihnen nicht gehört</td></tr>
          <tr><td>Dropshipping</td><td>Minimal</td><td>Tage</td><td>Am dünnsten</td><td>Keine Kontrolle über Produkt oder Lieferung</td></tr>
        </tbody>
      </table>`,

    'What "how much does it cost" actually depends on': 'Wovon "wie viel kostet es" tatsächlich abhängt',
    'For the brand-building route, the cost question has no honest single answer — it depends on formula complexity, certifications, packaging and the factory\'s minimum run. What can be said honestly: it is front-loaded. Almost all of it is spent <em>before</em> you learn whether anyone buys.':
      'Beim Weg des Markenaufbaus gibt es auf die Kostenfrage keine ehrliche einheitliche Antwort — es hängt von der Komplexität der Rezeptur, den Zertifizierungen, der Verpackung und dem Mindestlauf der Fabrik ab. Was man ehrlich sagen kann: Die Kosten fallen vorab an. Fast alles wird ausgegeben, <em>bevor</em> Sie wissen, ob überhaupt jemand kauft.',
    'Distribution inverts the cost curve. The main cost is your first stock order, and it scales with your confidence. As a concrete reference point: UNI MAX — a ready-to-drink botanical vitality drink from Malaysia — suggests <strong>12–24 boxes for a first retail stockist order</strong>, 50–100 for wholesale partners, and 300+ for regional distributors, with actual quantities confirmed on enquiry. A first position in the product costs a shelf trial, not a production run.':
      'Vertrieb kehrt diese Kostenkurve um. Die Hauptkosten sind Ihre erste Warenbestellung, und diese skaliert mit Ihrem Vertrauen. Als konkreter Referenzwert: UNI MAX — ein trinkfertiges botanisches Vitalitätsgetränk aus Malaysia — empfiehlt <strong>12–24 Boxen für eine erste Bestellung als Einzelhändler</strong>, 50–100 für Großhandelspartner und 300+ für regionale Vertriebspartner, wobei die tatsächlichen Mengen bei Anfrage bestätigt werden. Eine erste Position im Produkt kostet einen Regaltest, keinen Produktionslauf.',

    'Who each route actually suits': 'Für wen welcher Weg tatsächlich passt',
    [UL_ROUTES_EN]: `      <ul>
        <li><strong>Bauen Sie eine Marke auf</strong>, wenn Sie eine wirklich differenzierte Rezeptur haben, Kapital, das Sie sich leisten können, monatelang zu investieren, und Marketingfähigkeiten, um Nachfrage von null aus zu schaffen.</li>
        <li><strong>Private Label</strong>, wenn Ihre Stärke Marketing ist und Sie akzeptieren, eine gemeinsame Rezeptur unter Ihrem eigenen Namen zu verkaufen.</li>
        <li><strong>Vertreiben Sie</strong>, wenn Ihre Stärke Verkauf und Kanäle sind — Sie kennen Geschäfte, Fitnessstudios, Kliniken oder Käufer in Ihrem Markt und möchten ihnen diesen Monat ein zertifiziertes Produkt vorstellen, nicht erst nächstes Jahr.</li>
        <li><strong>Dropshipping</strong>, wenn Sie die Nachfrage mit minimalem Engagement testen und die damit verbundenen Kompromisse akzeptieren.</li>
      </ul>`,
    'A pattern worth noticing: people researching "how to start a supplement business" usually have a <em>sales</em> skill set, not a product-development one. If that is you, distribution is the route where your actual skill does the work from day one — the product, certifications and packaging already exist. See <a href="/guides/tongkat-ali-drink-supplier-checklist/">how to evaluate a supplier</a> before committing to one.':
      'Ein bemerkenswertes Muster: Menschen, die recherchieren, "wie man ein Nahrungsergänzungsmittelgeschäft startet", haben meist <em>Verkaufs</em>fähigkeiten, keine Produktentwicklungsfähigkeiten. Wenn das auf Sie zutrifft, ist Vertrieb der Weg, bei dem Ihre tatsächliche Fähigkeit vom ersten Tag an die Arbeit erledigt — Produkt, Zertifizierungen und Verpackung existieren bereits. Sehen Sie sich an, <a href="/guides/tongkat-ali-drink-supplier-checklist/">wie man einen Lieferanten bewertet</a>, bevor Sie sich für einen entscheiden.',

    'What distributing an established brand looks like in practice': 'Wie der Vertrieb einer etablierten Marke in der Praxis aussieht',
    'Using UNI MAX as the example we know best: the product arrives as finished retail-ready boxes — 30 × 10&nbsp;g ready-to-drink sachets of a botanical lychee vitality drink with Triple Force Tongkat Ali — produced and filled at a certified Malaysian facility (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 and HACCP are registered to that facility). Partnership levels run from retail stockist to regional distributor, and enquiries are handled directly over WhatsApp with a same-day reply. No repacking, no reformulation, no certification project — order, receive, sell.':
      'Am Beispiel von UNI MAX, das wir am besten kennen: Das Produkt kommt als fertige, verkaufsfertige Boxen an — 30 × 10&nbsp;g trinkfertige Sachets eines botanischen Lychee-Vitalitätsgetränks mit Tongkat Ali mit dreifacher Kraft — hergestellt und abgefüllt in einer zertifizierten malaysischen Anlage (Orient Biotech Sdn Bhd; HALAL (JAKIM), GMP, MeSTI, ISO&nbsp;9001 und HACCP sind auf diese Anlage registriert). Partnerschaftsstufen reichen vom Einzelhändler bis zum regionalen Vertriebspartner, und Anfragen werden direkt über WhatsApp mit Antwort am selben Tag bearbeitet. Kein Umpacken, keine Neuformulierung, kein Zertifizierungsprojekt — bestellen, empfangen, verkaufen.',

    'Getting-started FAQ': 'FAQ für den Einstieg',
    'Questions first-time sellers ask.': 'Fragen, die Erstverkäufer stellen.',

    '>Wholesale supplements for resale: the buyer\'s guide</a>': '>Großhandelspräparate zum Wiederverkauf: der Einkaufsratgeber</a>',
    '>How to choose a Tongkat Ali drink supplier</a>': '>Einen Tongkat-Ali-Lieferanten wählen</a>',
    '>Tongkat Ali drink vs capsules: choosing the right format</a>': '>Tongkat-Ali-Getränk vs. Kapseln: das richtige Format wählen</a>',
    '>What is a Tongkat Ali sachet drink?</a>': '>Was ist ein Tongkat-Ali-Sachet-Getränk?</a>',
    '>UNI MAX wholesale &amp; distribution</a>': '>UNI MAX Großhandel &amp; Vertrieb</a>',

    'Skip the production run. Start with a shelf trial.': 'Überspringen Sie den Produktionslauf. Beginnen Sie mit einem Regaltest.',
    'UNI MAX is supplied retail-ready to stockists, wholesalers and regional distributors — suggested entry from 12 boxes. Tell us your market and we will confirm terms.':
      'UNI MAX wird verkaufsfertig an Fachhändler, Großhändler und regionale Vertriebspartner geliefert — empfohlener Einstieg ab 12 Boxen. Teilen Sie uns Ihren Markt mit, und wir bestätigen die Konditionen.',
  },
},

};
