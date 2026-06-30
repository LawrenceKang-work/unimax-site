/* ============================================================
   UNI MAX — interactions + i18n
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Admin mode activation ----------
     访问 /?rev-mgr=<PIN> 后，向后端验证 PIN，
     后端返回 session token 存入 sessionStorage（前端不含任何密钥）
  ---------------------------------------------------------- */
  (function () {
    try {
      var params = new URLSearchParams(window.location.search);
      var pin = params.get("rev-mgr");
      if (!pin) return;
      /* 立即清除 URL 中的参数 */
      var clean = new URL(window.location.href);
      clean.searchParams.delete("rev-mgr");
      window.history.replaceState({}, "", clean.toString());
      /* 向后端验证 PIN */
      fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin })
      }).then(function(r){ return r.json(); }).then(function(res){
        if (res.success && res.token) {
          sessionStorage.setItem("unimax_rev_admin", res.token);
          /* 重新渲染评论以显示管理按钮 */
          renderReviews();
        }
      }).catch(function(){});
    } catch (e) {}
  })();

  /* ---------- DATA: References (ingredient-level literature) ---------- */
  var REFERENCES = [
    {t:"Barak V, Halperin T, Kalickman I. The effect of Sambucol, a black elderberry-based natural product, on the production of human cytokines. Eur Cytokine Netw. 2001;12(2):290–6.", u:"https://pubmed.ncbi.nlm.nih.gov/11399518/"},
    {t:"Bonilla DA, et al. Effects of Ashwagandha (Withania somnifera) on physical performance: systematic review and Bayesian meta-analysis. J Funct Morphol Kinesiol. 2021;6(1):20.", u:"https://doi.org/10.3390/jfmk6010020"},
    {t:"Chauhan S, Srivastava MK, Pathak AK. Standardized root extract of ashwagandha on well-being and sexual performance in adult males: a randomized controlled trial. Health Sci Rep. 2022;5(4).", u:"https://doi.org/10.1002/hsr2.741"},
    {t:"Choi S, Baek S, Choi S. Endurance training and thiamine supplementation on anti-fatigue during exercise. Phys Act Nutr. 2013;17(4):189–198.", u:"https://doi.org/10.5717/jenb.2013.17.4.189"},
    {t:"De Oliveira Campos MP, et al. Guarana (Paullinia cupana) improves fatigue in breast cancer patients undergoing chemotherapy. J Altern Complement Med. 2011;17(6):505–512.", u:"https://doi.org/10.1089/acm.2010.0571"},
    {t:"Dorneles IMP, et al. Guarana presents a safe and effective anti-fatigue profile in patients with chronic kidney disease: RCT. J Funct Foods. 2018;51:1–7.", u:"https://doi.org/10.1016/j.jff.2018.10.004"},
    {t:"Figueroa A, et al. L-Citrulline supports vascular and muscular benefits of exercise training in older adults. Exerc Sport Sci Rev. 2020;48(3):133–139.", u:"https://doi.org/10.1249/jes.0000000000000223"},
    {t:"Gonzales GF, et al. Effect of Lepidium meyenii (Maca) on sexual desire in adult healthy men. Andrologia. 2002;34(6):367–372.", u:"https://doi.org/10.1046/j.1439-0272.2002.00519.x"},
    {t:"Harnett J, et al. The effects of Sambucus nigra berry on acute respiratory viral infections: a rapid review. Adv Integr Med. 2020;7(4):240–246.", u:"https://doi.org/10.1016/j.aimed.2020.08.001"},
    {t:"Hawkins J, et al. Black elderberry (Sambucus nigra) supplementation for upper respiratory symptoms: meta-analysis of RCTs. Complement Ther Med. 2018;42:361–365.", u:"https://doi.org/10.1016/j.ctim.2018.12.004"},
    {t:"Hirsch KR, et al. Cordyceps militaris improves tolerance to high-intensity exercise after supplementation. J Diet Suppl. 2016;14(1):42–53.", u:"https://doi.org/10.1080/19390211.2016.1203386"},
    {t:"Hughes C, et al. B-vitamin intake and biomarker status in relation to cognitive decline in healthy older adults: 4-year follow-up. Nutrients. 2017;9(1):53.", u:"https://doi.org/10.3390/nu9010053"},
    {t:"Jafari A, et al. Zinc supplementation and immune factors in adults: systematic review and meta-analysis of RCTs. Crit Rev Food Sci Nutr. 2022;62(11):3023–3041.", u:"https://doi.org/10.1080/10408398.2020.1862048"},
    {t:"Lee E, et al. Effect of black maca supplementation on inflammatory markers and physical fitness in male elite athletes. Nutrients. 2023;15(7):1618.", u:"https://doi.org/10.3390/nu15071618"},
    {t:"Lopresti AL, Drummond PD, Smith SJ. Hormonal and vitality effects of Ashwagandha in aging, overweight males: RCT. Am J Mens Health. 2019;13(2).", u:"https://doi.org/10.1177/1557988319835985"},
    {t:"Kang S, et al. Effects of black maca on isokinetic muscular performance of elite women's handball players: crossover study. Food Nutr Res. 2023;67.", u:"https://doi.org/10.29219/fnr.v67.10250"},
    {t:"Kennedy D, et al. Improved cognitive performance and mental fatigue following a multivitamin and mineral supplement with guaraná. Appetite. 2008;50(2–3):506–513.", u:"https://doi.org/10.1016/j.appet.2007.10.007"},
    {t:"Langade D, Choudhary B, Shetty A. Efficacy of Ashwagandha in improving cardiorespiratory endurance in healthy athletic adults. AYU. 2015;36(1):63.", u:"https://doi.org/10.4103/0974-8520.169002"},
    {t:"Mohammadi H, et al. Effects of zinc supplementation on inflammatory biomarkers and oxidative stress in adults: meta-analysis of RCTs. J Trace Elem Med Biol. 2021;68:126857.", u:"https://doi.org/10.1016/j.jtemb.2021.126857"},
    {t:"Nakamura A, et al. Cordyceps militaris mycelium extract on blood markers for anemia in long-distance runners. Nutrients. 2024;16(12):1835.", u:"https://doi.org/10.3390/nu16121835"},
    {t:"Pahlavani N, et al. L-arginine supplementation on body composition and performance in male athletes: double-blind RCT. Eur J Clin Nutr. 2017;71(4):544–548.", u:"https://doi.org/10.1038/ejcn.2016.266"},
    {t:"Prasad AS, et al. Zinc status and serum testosterone levels of healthy adults. Nutrition. 1996;12(5):344–348.", u:"https://doi.org/10.1016/s0899-9007(96)80058-x"},
    {t:"Raut A, et al. Withania somnifera on physical performance, inflammation and muscle status in healthy volunteers: RCT. Cureus. 2024.", u:"https://doi.org/10.7759/cureus.68940"},
    {t:"Rezaei S, et al. Effect of L-arginine supplementation on maximal oxygen uptake: systematic review and meta-analysis. Physiol Rep. 2021;9(3).", u:"https://doi.org/10.14814/phy2.14739"},
    {t:"Science M, et al. Zinc for the treatment of the common cold: systematic review and meta-analysis of RCTs. CMAJ. 2012;184(10):E551–E561.", u:"https://doi.org/10.1503/cmaj.111990"},
    {t:"Smeets ETHC, Mensink RP, Joris PJ. L-citrulline supplementation and watermelon consumption on vascular function and cardiometabolic markers: meta-analysis. Br J Nutr. 2021;128(9):1758–1770.", u:"https://doi.org/10.1017/s0007114521004803"},
    {t:"Shin D, et al. Efficacy and safety of Maca in patients with symptoms of late-onset hypogonadism: RCT. World J Mens Health. 2023;41(3):692.", u:"https://doi.org/10.5534/wjmh.220112"},
    {t:"Stone M, et al. A pilot investigation into the effect of maca supplementation on physical activity and sexual desire in sportsmen. J Ethnopharmacol. 2009;126(3):574–576.", u:"https://doi.org/10.1016/j.jep.2009.09.012"},
    {t:"Suzuki T, et al. Oral L-citrulline supplementation enhances cycling time-trial performance in trained men: RCT crossover. J Int Soc Sports Nutr. 2016;13(1).", u:"https://doi.org/10.1186/s12970-016-0117-z"},
    {t:"Szymańska A, et al. Effect of ginseng supplementation on exercise endurance: systematic review and meta-analysis. Antioxidants. 2024;14(1):32.", u:"https://doi.org/10.3390/antiox14010032"},
    {t:"Tardy A, et al. Vitamins and minerals for energy, fatigue and cognition: narrative review of clinical evidence. Nutrients. 2020;12(1):228.", u:"https://doi.org/10.3390/nu12010228"},
    {t:"Todorovic N, et al. Escalating doses of citrulline nitrate on resting and post-exercise blood pressure in healthy men: RCT. Toxicol Res Appl. 2021;5.", u:"https://doi.org/10.1177/23978473211038632"},
    {t:"Vejayan J, et al. Tongkat Ali (Eurycoma longifolia) and Stema tuberosa stimulate sexual arousal in domestic cocks. Malays J Sci. 2020;39(1):1–14.", u:"https://doi.org/10.22452/mjs.vol39no1.1"},
    {t:"Viribay A, et al. Effects of arginine supplementation on athletic performance based on energy metabolism: systematic review and meta-analysis. Nutrients. 2020;12(5):1300.", u:"https://doi.org/10.3390/nu12051300"},
    {t:"Wankhede S, et al. Examining the effect of Withania somnifera on muscle strength and recovery: RCT. J Int Soc Sports Nutr. 2015;12(1).", u:"https://doi.org/10.1186/s12970-015-0104-9"},
    {t:"Xu Y. Effect of polysaccharide from Cordyceps militaris on physical fatigue induced by forced swimming. Int J Med Mushrooms. 2016;18(12):1083–1092.", u:"https://doi.org/10.1615/intjmedmushrooms.v18.i12.30"},
    {t:"Zakay-Rones Z, et al. Efficacy and safety of oral elderberry extract in the treatment of influenza A and B: randomized study. J Int Med Res. 2004;32(2):132–140.", u:"https://doi.org/10.1177/147323000403200205"},
    {t:"Zhu J, et al. Efficacy of ginseng supplements on disease-related fatigue: systematic review and meta-analysis. Medicine. 2022;101(26):e29767.", u:"https://doi.org/10.1097/md.0000000000029767"},
    {t:"Ziegenfuss TN, et al. Aqueous extract of Withania somnifera on strength training adaptations and recovery: the STAR trial. Nutrients. 2018;10(11):1807.", u:"https://doi.org/10.3390/nu10111807"}
  ];

  /* ---------- DATA: FAQ (B2B — wholesale & distribution) ---------- */
  var FAQ = [
    {q:{en:"What is the minimum order quantity (MOQ)?",zh:"最低起订量（MOQ）是多少？",ms:"Berapakah kuantiti pesanan minimum (MOQ)?",nl:"Wat is de minimale bestelhoeveelheid (MOQ)?",de:"Wie hoch ist die Mindestbestellmenge (MOQ)?",pl:"Jaka jest minimalna wielkość zamówienia (MOQ)?"},
     a:{en:"MOQ depends on your partnership level — lower for Retail Stockists and scaling up for Wholesale Partners and Regional Distributors. Tell us your market and target volume on WhatsApp and we'll confirm the exact MOQ.",
        zh:"MOQ 视合作级别而定——零售代销商较低，批发合作伙伴与区域总代理则相应提高。在 WhatsApp 告诉我们你的市场与目标采购量，我们将为你确认具体 MOQ。",
        ms:"MOQ bergantung pada tahap kerjasama anda — lebih rendah untuk Penjual Runcit dan meningkat untuk Rakan Borong serta Pengedar Serantau. Beritahu kami pasaran dan jumlah sasaran anda di WhatsApp dan kami akan sahkan MOQ yang tepat.",
        nl:"De MOQ hangt af van je samenwerkingsniveau — lager voor retailverkooppunten en oplopend voor groothandelspartners en regionale distributeurs. Vertel ons via WhatsApp je markt en gewenste volume en we bevestigen de exacte MOQ.",
        de:"Die MOQ hängt von Ihrer Partnerstufe ab — niedriger für Einzelhandelspartner und höher für Großhandelspartner und Regionaldistributoren. Nennen Sie uns per WhatsApp Ihren Markt und Ihr Zielvolumen, und wir bestätigen die genaue MOQ.",
        pl:"MOQ zależy od poziomu współpracy — niższy dla punktów detalicznych i wyższy dla partnerów hurtowych oraz dystrybutorów regionalnych. Napisz nam na WhatsApp, jaki masz rynek i docelowy wolumen, a potwierdzimy dokładny MOQ."}},
    {q:{en:"How is wholesale pricing structured?",zh:"批发价格如何制定？",ms:"Bagaimanakah harga borong distrukturkan?",nl:"Hoe is de groothandelsprijs opgebouwd?",de:"Wie ist die Großhandelspreisgestaltung aufgebaut?",pl:"Jak skonstruowane są ceny hurtowe?"},
     a:{en:"Pricing is tiered by volume — the more you order, the better your unit price. We share a full price list and payment terms once we know your partnership level and target quantities.",
        zh:"价格按采购量分级——订量越大，单价越优。在确认你的合作级别与目标数量后，我们将提供完整价目表与付款条款。",
        ms:"Harga berperingkat mengikut jumlah — lebih banyak anda pesan, lebih baik harga seunit. Kami akan kongsi senarai harga penuh dan terma pembayaran setelah mengetahui tahap kerjasama dan kuantiti sasaran anda.",
        nl:"De prijs is gestaffeld naar volume — hoe meer je bestelt, hoe beter je stuksprijs. We delen een volledige prijslijst en betalingsvoorwaarden zodra we je samenwerkingsniveau en gewenste hoeveelheden kennen.",
        de:"Die Preise sind nach Volumen gestaffelt — je mehr Sie bestellen, desto besser Ihr Stückpreis. Wir senden eine vollständige Preisliste und Zahlungsbedingungen, sobald wir Ihre Partnerstufe und Zielmengen kennen.",
        pl:"Ceny są progowe według wolumenu — im więcej zamawiasz, tym lepsza cena jednostkowa. Pełny cennik i warunki płatności przekazujemy po poznaniu Twojego poziomu współpracy i docelowych ilości."}},
    {q:{en:"Do you offer private label or OEM?",zh:"你们提供贴牌（私标）或 OEM 代工吗？",ms:"Adakah anda menawarkan label sendiri atau OEM?",nl:"Bieden jullie private label of OEM aan?",de:"Bieten Sie Eigenmarken (Private Label) oder OEM an?",pl:"Czy oferujecie markę własną lub OEM?"},
     a:{en:"Yes — we manufacture in Malaysia and can discuss private label, custom packaging and OEM formulations for qualified partners. Send us your requirements and order volume to start.",
        zh:"可以——我们在马来西亚生产，可为符合条件的合作伙伴洽谈贴牌、定制包装与 OEM 配方。把你的需求与采购量发给我们即可开始。",
        ms:"Ya — kami mengeluarkan produk di Malaysia dan boleh berbincang tentang label sendiri, pembungkusan tersuai dan formulasi OEM untuk rakan kongsi yang layak. Hantar keperluan dan jumlah pesanan anda untuk bermula.",
        nl:"Ja — we produceren in Maleisië en kunnen private label, aangepaste verpakkingen en OEM-formuleringen bespreken voor gekwalificeerde partners. Stuur ons je wensen en bestelvolume om te beginnen.",
        de:"Ja — wir produzieren in Malaysia und können Eigenmarken, individuelle Verpackungen und OEM-Rezepturen für qualifizierte Partner besprechen. Senden Sie uns Ihre Anforderungen und Ihr Bestellvolumen, um zu starten.",
        pl:"Tak — produkujemy w Malezji i możemy omówić markę własną, niestandardowe opakowania oraz formulacje OEM dla kwalifikujących się partnerów. Wyślij nam swoje wymagania i wielkość zamówienia, aby zacząć."}},
    {q:{en:"What certifications and documents do you provide?",zh:"你们提供哪些认证与文件？",ms:"Apakah pensijilan dan dokumen yang anda sediakan?",nl:"Welke certificeringen en documenten leveren jullie?",de:"Welche Zertifizierungen und Dokumente stellen Sie bereit?",pl:"Jakie certyfikaty i dokumenty zapewniacie?"},
     a:{en:"The product is HALAL, GMP, MeSTI, ISO 9001 and HACCP certified. We provide certificates, specification sheets, certificates of analysis and the export documentation your business needs to register and sell in your market.",
        zh:"产品具备 HALAL、GMP、MeSTI、ISO 9001 与 HACCP 认证。我们提供证书、规格表、分析证书（COA）以及你在当地市场注册与销售所需的出口文件。",
        ms:"Produk ini bersijil HALAL, GMP, MeSTI, ISO 9001 dan HACCP. Kami menyediakan sijil, lembaran spesifikasi, sijil analisis (COA) dan dokumentasi eksport yang diperlukan untuk mendaftar dan menjual di pasaran anda.",
        nl:"Het product is HALAL-, GMP-, MeSTI-, ISO 9001- en HACCP-gecertificeerd. We leveren certificaten, specificatiebladen, analysecertificaten (COA) en de exportdocumentatie die je nodig hebt om in jouw markt te registreren en te verkopen.",
        de:"Das Produkt ist HALAL-, GMP-, MeSTI-, ISO-9001- und HACCP-zertifiziert. Wir stellen Zertifikate, Spezifikationsblätter, Analysezertifikate (COA) und die Exportdokumentation bereit, die Sie für Registrierung und Verkauf in Ihrem Markt benötigen.",
        pl:"Produkt posiada certyfikaty HALAL, GMP, MeSTI, ISO 9001 i HACCP. Zapewniamy certyfikaty, karty specyfikacji, świadectwa analizy (COA) oraz dokumentację eksportową potrzebną do rejestracji i sprzedaży na Twoim rynku."}},
    {q:{en:"Can you ship to Europe and other markets?",zh:"可以发货到欧洲及其他市场吗？",ms:"Bolehkah anda menghantar ke Eropah dan pasaran lain?",nl:"Kunnen jullie naar Europa en andere markten verzenden?",de:"Können Sie nach Europa und in andere Märkte liefern?",pl:"Czy wysyłacie do Europy i innych rynków?"},
     a:{en:"Yes — UNI MAX is export-ready and we ship internationally. Freight method, Incoterms and delivery timelines are confirmed per order based on your destination and volume.",
        zh:"可以——UNI MAX 已具备出口条件，支持国际发货。运输方式、贸易术语（Incoterms）与交付时间将按目的地与订量逐单确认。",
        ms:"Ya — UNI MAX sedia eksport dan kami menghantar ke seluruh dunia. Kaedah penghantaran, Incoterms dan tempoh penghantaran disahkan mengikut pesanan berdasarkan destinasi dan jumlah anda.",
        nl:"Ja — UNI MAX is exportklaar en we verzenden internationaal. Vrachtmethode, Incoterms en levertijden worden per order bevestigd op basis van je bestemming en volume.",
        de:"Ja — UNI MAX ist exportfertig und wir liefern international. Versandart, Incoterms und Lieferzeiten werden pro Auftrag basierend auf Ihrem Bestimmungsort und Volumen bestätigt.",
        pl:"Tak — UNI MAX jest gotowy do eksportu i wysyłamy na cały świat. Metoda transportu, Incoterms i terminy dostaw są potwierdzane dla każdego zamówienia na podstawie miejsca docelowego i wolumenu."}},
    {q:{en:"What are the typical lead times?",zh:"通常的交货周期是多久？",ms:"Berapakah tempoh masa penghantaran biasa?",nl:"Wat zijn de gebruikelijke levertijden?",de:"Wie lang sind die üblichen Lieferzeiten?",pl:"Jakie są typowe czasy realizacji?"},
     a:{en:"Lead time depends on order size and whether custom packaging is involved. We confirm a clear production and delivery schedule together with your quotation.",
        zh:"交货周期取决于订单规模以及是否涉及定制包装。我们将在报价时一并确认明确的生产与交付时间表。",
        ms:"Tempoh penghantaran bergantung pada saiz pesanan dan sama ada pembungkusan tersuai terlibat. Kami akan sahkan jadual pengeluaran dan penghantaran yang jelas bersama sebut harga anda.",
        nl:"De levertijd hangt af van de ordergrootte en of er aangepaste verpakkingen bij betrokken zijn. We bevestigen een duidelijk productie- en leverschema samen met je offerte.",
        de:"Die Lieferzeit hängt von der Bestellmenge und davon ab, ob individuelle Verpackungen erforderlich sind. Wir bestätigen einen klaren Produktions- und Lieferplan zusammen mit Ihrem Angebot.",
        pl:"Czas realizacji zależy od wielkości zamówienia i tego, czy potrzebne jest niestandardowe opakowanie. Jasny harmonogram produkcji i dostawy potwierdzamy wraz z ofertą."}},
    {q:{en:"Can I request samples before placing a bulk order?",zh:"在批量下单前可以索取样品吗？",ms:"Bolehkah saya minta sampel sebelum membuat pesanan pukal?",nl:"Kan ik monsters aanvragen voordat ik een bulkorder plaats?",de:"Kann ich vor einer Großbestellung Muster anfordern?",pl:"Czy mogę poprosić o próbki przed złożeniem zamówienia hurtowego?"},
     a:{en:"Yes — sample arrangements are available for serious partners. Message us with your business details and the market you're selling into, and we'll arrange it.",
        zh:"可以——我们为有意向的合作伙伴提供样品安排。把你的公司资料与目标销售市场发给我们，我们会安排。",
        ms:"Ya — pengaturan sampel tersedia untuk rakan kongsi yang serius. Mesej kami dengan butiran perniagaan anda dan pasaran yang anda sasarkan, dan kami akan uruskannya.",
        nl:"Ja — monsters zijn beschikbaar voor serieuze partners. Stuur ons je bedrijfsgegevens en de markt waarin je verkoopt, dan regelen we het.",
        de:"Ja — für ernsthafte Partner sind Muster verfügbar. Schreiben Sie uns Ihre Firmendaten und den Markt, in dem Sie verkaufen, und wir organisieren es.",
        pl:"Tak — próbki są dostępne dla poważnych partnerów. Napisz do nas z danymi firmy i rynkiem, na którym sprzedajesz, a my to zorganizujemy."}},
    {q:{en:"Do you offer territory exclusivity and marketing support?",zh:"你们提供区域独家代理与市场支持吗？",ms:"Adakah anda menawarkan hak eksklusif wilayah dan sokongan pemasaran?",nl:"Bieden jullie territoriumexclusiviteit en marketingondersteuning?",de:"Bieten Sie Gebietsexklusivität und Marketingunterstützung?",pl:"Czy oferujecie wyłączność terytorialną i wsparcie marketingowe?"},
     a:{en:"Regional Distributors can discuss exclusive territory rights by market, along with marketing assets and priority supply. Let's align on your region and volume commitment on WhatsApp.",
        zh:"区域总代理可按市场洽谈独家区域代理权，并获得营销素材与优先供货。在 WhatsApp 与我们对齐你的区域与采购承诺即可。",
        ms:"Pengedar Serantau boleh berbincang tentang hak wilayah eksklusif mengikut pasaran, bersama aset pemasaran dan keutamaan bekalan. Mari selaraskan wilayah dan komitmen jumlah anda di WhatsApp.",
        nl:"Regionale distributeurs kunnen exclusieve territoriumrechten per markt bespreken, samen met marketingmateriaal en voorrang bij levering. Laten we je regio en volumetoezegging op WhatsApp afstemmen.",
        de:"Regionaldistributoren können exklusive Gebietsrechte je Markt besprechen, zusammen mit Marketingmaterialien und bevorzugter Belieferung. Lassen Sie uns Ihre Region und Mengenzusage per WhatsApp abstimmen.",
        pl:"Dystrybutorzy regionalni mogą omówić wyłączne prawa terytorialne dla danego rynku, wraz z materiałami marketingowymi i priorytetową dostawą. Ustalmy Twój region i zobowiązanie wolumenowe na WhatsApp."}}
  ];

  /* ---------- DATA: Reviews (sample placeholders) ---------- */
  var REVIEWS = [
    {n:"Arif R.",r:{en:"Marketing Manager, 38",zh:"市场经理，38岁",ms:"Pengurus Pemasaran, 38",nl:"Marketingmanager, 38",de:"Marketing-Manager, 38",pl:"Menedżer marketingu, 38 lat"},i:"AR",photo:"assets/who-performers.webp",q:{en:"I usually take one sachet after lunch. It fits easily into my routine and helps me feel ready for evening training.",zh:"我通常在午餐后喝一包。它很容易融入我的日常，让我感觉晚间训练更有准备。",ms:"Saya biasanya ambil satu sachet selepas makan tengah hari. Ia mudah masuk dalam rutin saya dan membantu saya berasa lebih bersedia untuk latihan malam.",nl:"Ik neem meestal één sachet na de lunch. Het past gemakkelijk in mijn routine en helpt me klaar te voelen voor de avondtraining.",de:"Ich nehme normalerweise ein Sachet nach dem Mittagessen. Es fügt sich gut in meinen Alltag und hilft mir, mich fürs Abendtraining bereit zu fühlen.",pl:"Zwykle piję jedną saszetkę po lunchu. Łatwo wpasowuje się w moją rutynę i pomaga mi czuć się gotowym na wieczorny trening."}},
    {n:"Wei Ling",r:{en:"Café Owner, 34",zh:"咖啡馆店主，34岁",ms:"Pemilik Kafe, 34",nl:"Café-eigenaar, 34",de:"Café-Besitzerin, 34",pl:"Właścicielka kawiarni, 34 lata"},i:"WL",photo:"assets/who-stressed.webp",q:{en:"I like that it's convenient, easy to carry, and not overly sweet. It works well for my busy days.",zh:"我喜欢它方便、易于携带，而且不会过甜。非常适合我繁忙的工作日。",ms:"Saya suka ia mudah, senang dibawa, dan tidak terlalu manis. Sangat sesuai untuk hari-hari sibuk saya.",nl:"Ik vind het fijn dat het handig is, makkelijk mee te nemen en niet te zoet. Werkt goed voor mijn drukke dagen.",de:"Ich mag, dass es praktisch, leicht mitzunehmen und nicht zu süß ist. Passt gut zu meinen geschäftigen Tagen.",pl:"Lubię, że jest wygodny, łatwy do noszenia i nie za słodki. Świetnie sprawdza się w moich pracowitych dniach."}},
    {n:"Daniel T.",r:{en:"Amateur Footballer, 29",zh:"业余足球员，29岁",ms:"Pemain Bola Amatur, 29",nl:"Amateursvoetballer, 29",de:"Amateurfußballer, 29",pl:"Amatorski piłkarz, 29 lat"},i:"DT",photo:"assets/who-sports.webp",q:{en:"I use it on training days when I want something quick and refreshing. The lychee taste is genuinely good.",zh:"训练日我会喝一包，方便快捷又清爽。荔枝的味道真的很好。",ms:"Saya gunakannya pada hari latihan apabila saya mahu sesuatu yang cepat dan menyegarkan. Rasa laici memang sedap.",nl:"Ik gebruik het op trainingsdagen wanneer ik iets snels en verfrissends wil. De lychee-smaak is echt lekker.",de:"Ich nutze es an Trainingstagen, wenn ich etwas Schnelles und Erfrischendes möchte. Der Lychee-Geschmack ist wirklich gut.",pl:"Używam go w dni treningowe, gdy chcę czegoś szybkiego i orzeźwiającego. Smak liczi jest naprawdę dobry."}},
    {n:"Hafiz M.",r:{en:"Delivery Rider, 41",zh:"外卖骑手，41岁",ms:"Penghantar, 41",nl:"Bezorger, 41",de:"Kurier, 41",pl:"Kurier, 41 lat"},i:"HM",photo:"assets/who-work.webp",q:{en:"Steady energy without the jittery crash I used to get from energy drinks.",zh:"能量平稳，不会再有以前能量饮料那种心慌后又疲惫的感觉。",ms:"Tenaga stabil tanpa rasa gementar dan jatuh seperti minuman tenaga lain.",nl:"Stabiele energie zonder de nervositeit en dip die ik vroeger van energiedrankjes kreeg.",de:"Gleichmäßige Energie ohne das nervöse Einbruch-Gefühl, das ich früher von Energydrinks kannte.",pl:"Stabilna energia bez nerwowości i spadku, który dostawałem od napojów energetycznych."}},
    {n:"Suresh K.",r:{en:"Engineer, 45",zh:"工程师，45岁",ms:"Jurutera, 45",nl:"Ingenieur, 45",de:"Ingenieur, 45",pl:"Inżynier, 45 lat"},i:"SK",photo:"assets/who-men.webp",q:{en:"Convenient for travel — tear, drink, done. Focus at work has been noticeably sharper.",zh:"出差很方便——撕开就喝。工作时的专注力明显提升了。",ms:"Mudah untuk perjalanan — koyak, minum, siap. Fokus kerja jelas lebih tajam.",nl:"Handig voor reizen — openscheuren, drinken, klaar. De focus op het werk is merkbaar scherper geworden.",de:"Praktisch auf Reisen — aufreißen, trinken, fertig. Die Konzentration bei der Arbeit ist merklich schärfer geworden.",pl:"Wygodny w podróży — otwórz, wypij, gotowe. Skupienie w pracy jest wyraźnie lepsze."}},
    {n:"Mei Chen",r:{en:"Yoga Instructor, 36",zh:"瑜伽教练，36岁",ms:"Pengajar Yoga, 36",nl:"Yoga-instructeur, 36",de:"Yoga-Lehrerin, 36",pl:"Instruktorka jogi, 36 lat"},i:"MC",photo:"assets/who-performers.webp",q:{en:"A calm, sustained kind of energy. It fits naturally into my morning routine.",zh:"一种平静而持久的能量，很自然地融入我的晨间习惯。",ms:"Tenaga yang tenang dan berpanjangan. Ia sesuai dengan rutin pagi saya.",nl:"Een rustige, aanhoudende energie. Het past van nature in mijn ochtendroutine.",de:"Eine ruhige, anhaltende Energie. Sie fügt sich ganz natürlich in meine Morgenroutine ein.",pl:"Spokojny, trwały rodzaj energii. Naturalnie wpisuje się w moją poranną rutynę."}}
  ];

  /* ---------- i18n dictionary (static data-i18n keys) ---------- */
  var I18N = {
    zh: {
      "announce":"提供 B2B 批发 · 欢迎欧洲分销商洽询 · HALAL 与 GMP 认证 · 马来西亚制造",
      "nav.benefits":"功效","nav.formula":"配方","nav.trust":"认证","nav.research":"研究依据","nav.faq":"常见问题",
      "cta.order":"索取批发条款","cta.explore":"了解配方",
      "hero.eyebrow":"30+ 男士 · 高压上班族 · 运动爱好者","hero.h1a":"总在下午就","hero.h1pk":"没电？","hero.h1b":"","hero.h1c":"每天","hero.h1bk":"一包，","hero.h1cp":"","hero.h1d":"撑满你的一整天。",
      "hero.sub":"三重东革阿里 + 12 种草本配方，支持充沛能量、持久耐力与专注恢复。即饮荔枝口味，约 30 分钟感受提升。",
      "hero.cta":"在 WhatsApp 下单 · 30 包/盒","hero.proof":"★ 真实好评 · HALAL / GMP 认证 · 马来西亚制造",
      "hero.m1":"HALAL 与 GMP 认证","hero.m2":"12 种植物与营养成分","hero.m3":"马来西亚制造",
      "hero.badge1":"每盒装","hero.badge2":"每包 10 克即饮","hero.float":"一则讯息即可下单","hero.trustlabel":"于认证设施中生产",
      "hero.chip2a":"HALAL · GMP","hero.chip2b":"认证工厂",
      "feat.1t":"东革阿里萃取","feat.1s":"三重力量配方","feat.2t":"天然植物成分","feat.2s":"植物活性来源","feat.3t":"清甜荔枝口味","feat.3s":"即开即饮","feat.4t":"无额外添加糖","feat.4s":"轻盈微甜",
      "about.imtag":"高级植物仪式","about.popb":"添加糖","about.popk":"仅轻微调味",
      "gal.eyebrow":"日常仪式","gal.h2a":"为现代","gal.h2b":"日常仪式而生","gal.c1":"随身随饮","gal.c2":"三力配方","gal.c3":"即开即饮","gal.c4":"10 克随身包",
      "about.eyebrow":"关于 Uni Max","about.lead1":"充能。","about.lead2":"专注。全力以赴。",
      "about.s1":"植物与营养成分","about.s2":"每包即饮份量","about.s3":"包独立小袋每盒",
      "about.b1":"一款顶级荔枝活力饮品，含三重东革阿里、草本精华及氨基酸——专为追求能量、专注与自信、每天都能全力发挥的活力男士打造。",
      "about.b2":"南非醉茄、人参与冬虫夏草等适应原，帮助您从容应对压力与疲劳；而 L-精氨酸与 L-瓜氨酸组成的「生物循环」助力，支持健康的血液流动。",
      "about.b3":"快速吸收、方便随行——这是您支持日常能量、专注与活力的全方位一击，无需冲泡，毫不费力。",
      "ben.eyebrow":"为日常表现而生","ben.h2a":"日常表现所需的一切，","ben.h2b":"尽在","ben.h2c":"每日一击。",
      "ben.1t":"精力与耐力","ben.1d":"瓜拉纳提供平稳、持续的植物能量，全天活力不中断——无骤升、无崩溃。",
      "ben.2t":"专注与清晰","ben.2d":"适应原草本帮助支持精神清晰与平静专注，压力下依然敏锐。",
      "ben.3t":"韧性与恢复","ben.3d":"适应原与抗氧化植物成分复合配方，支持身体从日常身心压力中恢复。",
      "ben.4t":"循环支持","ben.4d":"精氨酸与瓜氨酸支持健康血液循环，促进工作肌肉的氧气输送。",
      "ben.5t":"男性活力","ben.5d":"三重东革阿里与锌帮助支持日常力量、动力与自然活力。",
      "ing.eyebrow":"配方解析","ing.h2a":"五重力量，","ing.h2b":"一杯植萃。",
      "ing.sub":"每一包都层层叠加经研究的植物成分、适应原、氨基酸与必需营养素——它们协同运作，而不只是让你清醒。",
      "ing.note":"仅作结构功能性支持。无意诊断、治疗、治愈或预防任何疾病。",
      "ing.1t":"三重东革阿里","ing.1r":"耐力与活力","ing.1d":"源自马来西亚的传统植物，数百年来用于支持活力。黄、红、黑三重配方有助支持耐力、力量与自然活力。",
      "ing.tag.yellow":"黄","ing.tag.red":"红","ing.tag.black":"黑",
      "ing.2t":"马卡 + 瓜拉纳","ing.2r":"能量与代谢","ing.2d":"瓜拿纳带来平稳缓释的天然咖啡因，玛卡、锌与 B 族维生素则支持代谢、能量释放与自然荷尔蒙平衡。",
      "ing.3t":"适应原复合配方","ing.3r":"压力与抗压","ing.3d":"适应原帮助身体适应身心压力——支持平静专注、稳定能量与恢复。",
      "ing.4t":"氨基酸支持","ing.4r":"健康血流","ing.4d":"L-精氨酸与 L-瓜氨酸是支持一氧化氮生成的氨基酸，有助维持健康循环与肌肉的氧气输送。",
      "ing.5t":"接骨木莓抗氧化","ing.5r":"防护与恢复","ing.5d":"富含花青素的黑接骨木莓，有助支持免疫防护并保护细胞免受日常氧化压力。",
      "sip.eyebrow":"一口入，全能量","sip.h2a":"五大标志性","sip.h2b":"力量系统",
      "sip.1t":"三重力量","sip.1d":"东革阿里带来进阶活力","sip.2t":"生物循环","sip.2d":"强力支持健康血流",
      "sip.3t":"适应原力量","sip.3d":"保持精力与韧性","sip.4t":"抗氧化防护","sip.4d":"抵御疲劳与自由基","sip.5t":"核心充能","sip.5d":"保持敏锐与专注",
      "who.eyebrow":"适合人群","who.h2a":"为不停步的人","who.h2b":"而打造",
      "who.1t":"活跃男性","who.1d":"支持荷尔蒙平衡、循环与韧性。","who.2t":"忙碌专业人士","who.2d":"支持抗压与恢复。",
      "who.3t":"运动与健身爱好者","who.3d":"支持专注、清晰与持久能量，不再崩溃。","who.4t":"长时间工作者","who.4d":"支持循环、氧气输送与肌肉表现。",
      "who.5t":"追求日常活力的男性","who.5d":"为面对身心疲劳的繁忙职涯而设。",
      "who.6t":"领导者与高成就者","who.6d":"为追求顶峰表现与清晰决策力的领导型人士而设。",
      "trust.eyebrow":"值得信赖的品质","trust.h2":"于认证设施中生产","trust.sub":"由 Orient Biotech Sdn Bhd 依据国际公认的食品安全与品质标准制造。点击任一标章查看证书。","trust.view":"查看证书 →",
      "res.eyebrow":"以科学为配方依据","res.h2a":"以研究成分","res.h2b":"精心配方",
      "res.p":"UNI MAX 中的每种成分均经同行评审研究支持——针对其在能量、耐力、循环与韧性方面的作用进行了验证。",
      "res.pill1":"随机对照试验","res.pill2":"系统综述与荟萃分析","res.s1":"篇同行评审文献","res.s2":"种经研究成分","res.toggle":"查看完整参考文献",
      "res.note":"参考文献针对各别成分，仅供一般科普之用，并非针对产品的功效声明，亦不表示 Uni Max 可诊断、治疗、治愈或预防任何疾病。",
      "use.eyebrow":"饮用方法","use.h2a":"饮用简单，","use.h2b":"轻松坚持",
      "use.1t":"每日 1–2 包","use.1d":"每日饮用 1 至 2 包即饮装，于餐后饮用。","use.2t":"晨间或日间","use.2d":"最佳于晨间或日间饮用，支持全天活力。","use.3t":"持之以恒","use.3d":"为获得持久效果，请将 Uni Max 融入日常，持续饮用。",
      "use.note":"无需冲泡——撕开、饮用、出发。请勿超过建议每日份量。",
      "rev.eyebrow":"每日用户的真实选择","rev.h2a":"真实日常，","rev.h2b":"真实动力","rev.sample":"看看活跃人士如何将 UNI MAX 融入日常——从繁忙工作日到训练时间，随行不间断。",
      "faq.eyebrow":"值得了解","faq.h2":"常见问题","faq.asideT":"还有疑问？","faq.asideP":"在 WhatsApp 上联系我们的 B2B 团队，获取批发价格、起订量与合作详情。","faq.asideCta":"联系 B2B 团队",
      "cta.h2a":"把 UNI MAX 纳入你的产品线 —","cta.h2b":"立即索取批发条款。","cta.p":"告诉我们你的市场与目标采购量，我们的团队通常当天即回复价格、起订量与合作条款。","cta.sub":"+60 10-200 5803 · 联系人：Jack",
      "foot.about":"力量的宇宙，极致释放。一款含三重东革阿里的植物荔枝活力饮品，由 UniPro 出品。",
      "foot.explore":"探索","foot.product":"产品","foot.p1":"10克 × 30 包","foot.p2":"即饮","foot.p3":"植物荔枝","foot.p4":"HALAL 认证","foot.contact":"联系","foot.jack":"请找 Jack",
      "foot.disclaimer":"本产品为膳食补充品，无意诊断、治疗、治愈或预防任何疾病。本网站信息涉及一般保健及各别成分的结构功能，不能替代专业医疗建议。饮用前请咨询医疗专业人员，尤其是孕期、哺乳期、正在服药或有健康状况者。请置于儿童无法触及之处。不建议 18 岁以下人士饮用。",
      "foot.copy":"© 2026 UniPro · UNI MAX。版权所有。","foot.made":"由 Orient Biotech Sdn Bhd 于马来西亚制造。",
      "nav.order":"成为合作伙伴","cta.seeplans":"查看方案与价格",
      "why.eyebrow":"为何换它","why.h2a":"停止追逐那个","why.h2b":"午后崩溃感。",
      "why.oldtag":"常见做法","why.oldt":"咖啡、高糖能量饮料，再加一把保健丸",
      "why.o1":"先飙升、再在午后更猛地崩溃","why.o2":"含有大量糖分与合成刺激物","why.o3":"只追求能量——忽略耐力、专注与循环","why.o4":"每天多瓶饮料、冲泡或吞服多颗药丸",
      "why.newtag":"UNI MAX 的方式","why.newt":"每天一次，一包 10 克植萃饮",
      "why.n1":"瓜拉纳平稳植物能量——平稳持续，不骤升","why.n2":"无额外添加糖，轻盈微甜，真实荔枝风味","why.n3":"支持能量、耐力、专注、循环与抗压力","why.n4":"撕开即饮——数秒完成，无需冲泡",
      "order.eyebrow":"成为合作伙伴","order.h2a":"选择你的合作级别，","order.h2b":"与我们共同成长",
      "order.sub":"在 WhatsApp 告诉我们你的市场与目标采购量——我们当天即发送批发价格、起订量与合作条款。",
      "order.p1name":"零售代销商","order.p1tag":"先试用一个月","order.perbox":"/ 盒","order.p1day":"30 包即饮装",
      "order.p1f1":"30 包即饮装","order.p1f2":"WhatsApp 当天客服","order.p1f3":"标准配送","order.p1cta":"购买单盒",
      "order.popular":"最受欢迎 · 最划算","order.p2name":"批发合作伙伴","order.p2tag":"三个月的每日活力","order.perbundle":"/ 3 盒",
      "order.p2save":"更超值","order.p2day":"· 三个月份量","order.p2f1":"90 包","order.p2f2":"整组免运费","order.p2f3":"优先 WhatsApp 客服","order.p2cta":"购买优惠装",
      "order.p3name":"区域总代理","order.p3tag":"每月一盒","order.p3day":"最低价 · 随时取消",
      "order.p3f1":"每月配送 30 包","order.p3f2":"每月免运费","order.p3f3":"可随时暂停或取消","order.p3cta":"开始订阅",
      "order.a1":"可提供出口文件","order.a2":"WhatsApp 当天回复","order.a3":"HALAL 与 GMP 认证设施","order.a4":"不适合你？随时讯息我们",
      "sticky.from":"准备好为一天充能了吗？","sticky.sub":"首盒免运费","sticky.cta":"查看方案",
      "order.subtag":"批量定价 · 起订量洽询确认","order.howmany":"选择你的合作级别","order.spec1":"包 / 盒","order.spec2":"植物与营养成分","order.spec3":"添加糖","order.spec4":"分钟感受提升",
      "order.p1sub":"适合商店、药房与健身房试销","order.p2sub":"适合按箱采购的分销商与进口商","order.p3sub":"独家区域代理权与市场支持","order.best":"最受欢迎","order.freeship":"免运费","order.cta":"索取批发条款","order.p3save":"更省","order.poa":"价格待定","order.p1price":"低起订量","order.p2price":"最优单价","order.p3price":"区域代理权",
      "sc.cap1.eyebrow":"批发 · 分销 · 代工贴牌","sc.cap1.line1":"上架一个","sc.cap1.line2":"天生好卖的品牌。",
      "sc.cap2.line1":"一款经验证的产品。","sc.cap2.line2":"你会满意的利润空间。","sc.cap2.sub":"一款通过认证、可出口的东革阿里活力饮品——三重配方、完整文件、稳定的规模化供货。",
      "sc.cap3.eyebrow":"HALAL · GMP · 马来西亚制造","sc.cap3.line1":"准备好扩展","sc.cap3.line2":"你的产品组合了吗？",
      "brand.h2a":"力量的宇宙，","brand.h2b":"极致释放。"
    },
    ms: {
      "announce":"Borong B2B tersedia · Pertanyaan pengedar Eropah dialu-alukan · Disahkan HALAL & GMP · Buatan Malaysia",
      "nav.benefits":"Manfaat","nav.formula":"Formula","nav.trust":"Pensijilan","nav.research":"Penyelidikan","nav.faq":"Soalan Lazim",
      "cta.order":"Minta Terma Borong","cta.explore":"Terokai formula",
      "hero.eyebrow":"Lelaki 30+ · Profesional tekanan tinggi · Gaya hidup aktif","hero.h1a":"","hero.h1pk":"Lesu","hero.h1b":" menjelang petang?","hero.h1c":"Satu ","hero.h1bk":"sachet","hero.h1cp":" sehari,","hero.h1d":"bertenaga sepanjang hari.",
      "hero.sub":"Tongkat Ali Tiga Kuasa + 12 botani — menyokong tenaga, stamina & fokus. Minuman laici sedia minum, rasa perbezaannya dalam ~30 minit.",
      "hero.cta":"Pesan di WhatsApp · 30 sachet/kotak","hero.proof":"★ Ulasan nyata · Pensijilan HALAL / GMP · Buatan Malaysia",
      "hero.m1":"Disahkan HALAL & GMP","hero.m2":"12 botani & nutrien","hero.m3":"Buatan Malaysia",
      "hero.badge1":"sachet sekotak","hero.badge2":"10g sedia minum setiap satu","hero.float":"Pesan dalam 1 mesej","hero.trustlabel":"Dihasilkan di kemudahan bersijil",
      "hero.chip2a":"HALAL · GMP","hero.chip2b":"Kemudahan bersijil",
      "feat.1t":"Ekstrak Tongkat Ali","feat.1s":"Adunan Tiga Kuasa","feat.2t":"Botani semula jadi","feat.2s":"Aktif berasaskan tumbuhan","feat.3t":"Perisa laici lazat","feat.3s":"Sedia minum","feat.4t":"Tanpa gula tambahan","feat.4s":"Manis ringan",
      "about.imtag":"Ritual botani premium","about.popb":"Gula tambahan","about.popk":"Manis ringan",
      "gal.eyebrow":"Rutin","gal.h2a":"Dicipta untuk","gal.h2b":"rutin harian moden","gal.c1":"Ritual mudah alih","gal.c2":"Formula Tiga Kuasa","gal.c3":"Sedia diminum","gal.c4":"Sachet 10g",
      "about.eyebrow":"Apa itu Uni Max","about.lead1":"Isi Semula.","about.lead2":"Fokus. Berprestasi.",
      "about.s1":"botani & nutrien","about.s2":"setiap sachet sedia minum","about.s3":"sachet setiap kotak",
      "about.b1":"Minuman vitaliti laici premium dengan Tongkat Ali Tiga Kuasa, botani, dan asid amino — direka untuk lelaki aktif yang mahukan tenaga, fokus, dan keyakinan sepanjang hari.",
      "about.b2":"Adaptogen — Ashwagandha, Ginseng dan Cordyceps — membantu anda kekal tahan terhadap tekanan dan keletihan, manakala penggalak Bio-Peredaran L-Arginine dan L-Citrulline menyokong aliran darah yang sihat.",
      "about.b3":"Cepat diserap dan mudah dibawa, ia adalah teguk serba lengkap anda untuk tenaga, fokus dan vitaliti harian — tanpa bancuhan, tanpa kerumitan.",
      "ben.eyebrow":"Dibina untuk Prestasi Harian","ben.h2a":"Semua yang anda perlukan untuk","ben.h2b":"beraksi","ben.h2c":", dalam satu teguk harian.",
      "ben.1t":"Tenaga & Stamina","ben.1d":"Guarana memberikan tenaga botanik yang lancar dan berterusan — tiada lonjakan, tiada crash.",
      "ben.2t":"Fokus & Kejernihan","ben.2d":"Adaptogen menyokong kejelasan mental dan fokus tajam di bawah tekanan.",
      "ben.3t":"Ketahanan & Pemulihan","ben.3d":"Gabungan adaptogen dan antioksidan menyokong pemulihan daripada tekanan fizikal dan mental harian.",
      "ben.4t":"Sokongan Peredaran Darah","ben.4d":"L-Arginine dan L-Citrulline menyokong peredaran yang sihat dan penghantaran oksigen ke otot.",
      "ben.5t":"Vitaliti Lelaki","ben.5d":"Triple Force Tongkat Ali dan zink membantu menyokong kekuatan, semangat dan vitaliti semula jadi harian.",
      "ing.eyebrow":"Formula","ing.h2a":"Lima kuasa,","ing.h2b":"satu teguk botani.",
      "ing.sub":"Setiap sachet menggabungkan botani yang dikaji, adaptogen, asid amino dan nutrien penting — direka untuk bekerjasama, bukan sekadar menyegarkan anda.",
      "ing.note":"Sokongan struktur-fungsi sahaja. Tidak bertujuan untuk mendiagnos, merawat, menyembuh atau mencegah sebarang penyakit.",
      "ing.1t":"Tongkat Ali Tiga Kuasa","ing.1r":"Stamina & vitaliti","ing.1d":"Botani tradisional Malaysia, digunakan berabad-abad untuk menyokong vitaliti. Adunan Kuning, Merah dan Hitam kami membantu menyokong stamina, kekuatan dan vitaliti semula jadi.",
      "ing.tag.yellow":"Kuning","ing.tag.red":"Merah","ing.tag.black":"Hitam",
      "ing.2t":"Maca + Guarana","ing.2r":"Tenaga & metabolisme","ing.2d":"Guarana memberikan kafein semula jadi pelepasan perlahan, manakala Maca, Zink dan vitamin B menyokong metabolisme, pelepasan tenaga dan keseimbangan hormon semula jadi.",
      "ing.3t":"Campuran Adaptogen","ing.3r":"Tekanan & ketahanan","ing.3d":"Adaptogen membantu badan menyesuaikan diri dengan tekanan fizikal dan mental — menyokong fokus tenang, tenaga stabil dan pemulihan.",
      "ing.4t":"Sokongan Asid Amino","ing.4r":"Aliran darah sihat","ing.4d":"L-Arginine dan L-Citrulline ialah asid amino yang menyokong pengeluaran nitrik oksida, membantu mengekalkan peredaran darah yang sihat dan penghantaran oksigen ke otot.",
      "ing.5t":"Antioksidan Elderberry","ing.5r":"Pertahanan & pemulihan","ing.5d":"Beri Elderberry Hitam yang kaya antosianin membantu menyokong pertahanan imun dan melindungi sel daripada tekanan oksidatif harian.",
      "sip.eyebrow":"Satu teguk, semua kuasa","sip.h2a":"Lima sistem kuasa","sip.h2b":"tersohor",
      "sip.1t":"Tiga Kuasa","sip.1d":"Tongkat Ali untuk vitaliti","sip.2t":"Bio-Peredaran","sip.2d":"Aliran darah sihat dipergiat",
      "sip.3t":"Kuasa Adaptogen","sip.3d":"Kekal bertenaga & tahan lasak","sip.4t":"Perisai Antioksidan","sip.4d":"Pertahanan daripada keletihan & radikal bebas","sip.5t":"Core Charger","sip.5d":"Kekal tajam & fokus",
      "who.eyebrow":"Untuk siapa","who.h2a":"Dibina untuk mereka yang","who.h2b":"tidak berhenti",
      "who.1t":"Lelaki Aktif","who.1d":"Menyokong keseimbangan hormon, peredaran dan ketahanan.","who.2t":"Profesional Sibuk","who.2d":"Menyokong ketahanan tekanan dan pemulihan.",
      "who.3t":"Peminat Sukan & Kecergasan","who.3d":"Menyokong fokus, kejelasan dan tenaga berterusan tanpa keletihan.","who.4t":"Pekerja Jangka Panjang","who.4d":"Menyokong peredaran, aliran oksigen dan prestasi otot.",
      "who.5t":"Lelaki Mencari Vitaliti Harian","who.5d":"Untuk kerjaya mencabar yang membawa keletihan mental dan fizikal.",
      "who.6t":"Pemimpin & Pencapai Tinggi","who.6d":"Untuk mereka yang memimpin dan mengejar prestasi puncak dengan kejelasan minda.",
      "trust.eyebrow":"Kualiti dipercayai","trust.h2":"Dihasilkan di kemudahan bersijil","trust.sub":"Dikilang oleh Orient Biotech Sdn Bhd di bawah standard keselamatan makanan dan kualiti yang diiktiraf antarabangsa. Ketik mana-mana sijil untuk melihat.","trust.view":"Lihat sijil →",
      "res.eyebrow":"Diformulasikan dengan Sains","res.h2a":"Diformulasikan dengan","res.h2b":"Bahan Bertauliah",
      "res.p":"Setiap bahan dalam UNI MAX disokong oleh penyelidikan yang dikaji semula — dikaji untuk peranannya dalam tenaga, stamina, peredaran, dan ketahanan.",
      "res.pill1":"Ujian terkawal rawak","res.pill2":"Kajian sistematik & meta-analisis","res.s1":"rujukan disemak rakan","res.s2":"bahan dikaji","res.toggle":"Lihat senarai rujukan penuh",
      "res.note":"Rujukan berkaitan bahan individu dan disediakan untuk pendidikan umum. Ia bukan tuntutan khusus produk dan tidak membayangkan Uni Max mendiagnos, merawat, menyembuh atau mencegah sebarang penyakit.",
      "use.eyebrow":"Cara penggunaan","use.h2a":"Mudah diambil,","use.h2b":"mudah diteruskan",
      "use.1t":"1–2 sachet sehari","use.1d":"Minum 1 hingga 2 sachet sedia minum sehari, terus selepas makan.","use.2t":"Pagi atau siang","use.2d":"Paling baik diambil pada waktu pagi atau siang untuk vitaliti sepanjang hari.","use.3t":"Kekal konsisten","use.3d":"Untuk hasil berterusan, nikmati Uni Max secara konsisten dalam rutin harian anda.",
      "use.note":"Tiada bancuhan diperlukan — koyak, minum, pergi. Jangan melebihi sajian harian yang disyorkan.",
      "rev.eyebrow":"Dipercayai Pengguna Harian","rev.h2a":"Rutin sebenar,","rev.h2b":"momentum sebenar","rev.sample":"Lihat bagaimana individu aktif menjadikan UNI MAX sebahagian daripada rutin harian mereka — dari hari kerja sibuk hingga sesi latihan dan waktu panjang dalam perjalanan.",
      "faq.eyebrow":"Baik untuk diketahui","faq.h2":"Soalan lazim","faq.asideT":"Masih ada soalan?","faq.asideP":"Mesej pasukan B2B kami di WhatsApp untuk harga borong, MOQ dan butiran kerjasama.","faq.asideCta":"Hubungi pasukan B2B",
      "cta.h2a":"Tambah UNI MAX ke dalam rangkaian anda —","cta.h2b":"minta terma borong hari ini.","cta.p":"Beritahu kami pasaran dan jumlah sasaran anda, dan pasukan kami akan hantar harga, MOQ serta terma kerjasama — biasanya pada hari sama.","cta.sub":"+60 10-200 5803 · Hubungi: Jack",
      "foot.about":"Alam Semesta Kuasa, Impak Maksimum. Minuman vitaliti botani laici dengan Tongkat Ali Tiga Kuasa, oleh UniPro.",
      "foot.explore":"Terokai","foot.product":"Produk","foot.p1":"10g × 30 sachet","foot.p2":"Sedia minum","foot.p3":"Laici botani","foot.p4":"Disahkan HALAL","foot.contact":"Hubungi","foot.jack":"Tanya Jack",
      "foot.disclaimer":"Produk ini ialah suplemen diet dan tidak bertujuan untuk mendiagnos, merawat, menyembuh atau mencegah sebarang penyakit. Maklumat di laman ini berkaitan kesihatan umum dan struktur-fungsi bahan individu, dan bukan pengganti nasihat perubatan profesional. Berunding dengan profesional kesihatan sebelum penggunaan, terutamanya jika anda hamil, menyusu, mengambil ubat atau menguruskan keadaan kesihatan. Jauhkan daripada kanak-kanak. Tidak disyorkan untuk bawah 18 tahun.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Hak cipta terpelihara.","foot.made":"Dikilang di Malaysia oleh Orient Biotech Sdn Bhd.",
      "nav.order":"Jadi Rakan Kongsi","cta.seeplans":"Lihat pelan & harga",
      "why.eyebrow":"Kenapa beralih","why.h2a":"Henti Mengejar","why.h2b":"Krisis Petang.",
      "why.oldtag":"Cara biasa","why.oldt":"Kopi, minuman tenaga bergula & segenggam pil",
      "why.o1":"Naik mendadak, kemudian jatuh lebih teruk pada petang","why.o2":"Penuh dengan gula dan perangsang sintetik","why.o3":"Hanya mengejar tenaga — abai stamina, fokus & peredaran","why.o4":"Beberapa minuman, bancuhan, atau pil setiap hari",
      "why.newtag":"Cara UNI MAX","why.newt":"Satu sachet botani 10g, sekali sehari",
      "why.n1":"Tenaga botanik guarana yang lancar — stabil, bukan mendadak","why.n2":"Tanpa gula tambahan, manis ringan, rasa laici sebenar","why.n3":"Menyokong tenaga, stamina, fokus, peredaran & ketahanan","why.n4":"Koyak, minum, pergi — siap dalam saat, tiada bancuhan",
      "order.eyebrow":"Jadi rakan kongsi","order.h2a":"Pilih tahap kerjasama anda,","order.h2b":"berkembang bersama kami",
      "order.sub":"Beritahu kami pasaran dan jumlah sasaran anda di WhatsApp — kami hantar harga borong, MOQ dan terma kerjasama pada hari yang sama.",
      "order.p1name":"Penjual Runcit","order.p1tag":"Cuba untuk sebulan","order.perbox":"/ kotak","order.p1day":"30 sachet sedia minum",
      "order.p1f1":"30 sachet sedia minum","order.p1f2":"Sokongan WhatsApp hari sama","order.p1f3":"Penghantaran standard","order.p1cta":"Pesan kotak tunggal",
      "order.popular":"Paling popular · nilai terbaik","order.p2name":"Rakan Borong","order.p2tag":"3 bulan vitaliti harian","order.perbundle":"/ 3 kotak",
      "order.p2save":"Lebih jimat","order.p2day":"· bekalan 3 bulan","order.p2f1":"90 sachet","order.p2f2":"Penghantaran percuma seluruh pakej","order.p2f3":"Sokongan WhatsApp keutamaan","order.p2cta":"Pesan pakej",
      "order.p3name":"Pengedar Serantau","order.p3tag":"1 kotak setiap bulan","order.p3day":"Harga terendah · batal bila-bila masa",
      "order.p3f1":"30 sachet dihantar bulanan","order.p3f2":"Penghantaran percuma setiap bulan","order.p3f3":"Jeda atau batal bila-bila masa","order.p3cta":"Mula langganan",
      "order.a1":"Dokumen sedia eksport","order.a2":"Balasan WhatsApp hari sama","order.a3":"Kemudahan bersijil HALAL & GMP","order.a4":"Tidak sesuai? Mesej kami sahaja",
      "sticky.from":"Bersedia bertenaga hari ini?","sticky.sub":"Penghantaran percuma kotak pertama","sticky.cta":"Lihat pelan",
      "order.subtag":"Harga mengikut jumlah · MOQ disahkan atas pertanyaan","order.howmany":"Pilih tahap kerjasama anda","order.spec1":"sachet / kotak","order.spec2":"botani & nutrien","order.spec3":"gula tambahan","order.spec4":"minit rasa kesannya",
      "order.p1sub":"Untuk kedai, farmasi & gim menguji jualan","order.p2sub":"Untuk penjual semula & pengimport beli mengikut karton","order.p3sub":"Hak wilayah eksklusif & sokongan pemasaran","order.best":"PALING POPULAR","order.freeship":"PENGHANTARAN PERCUMA","order.cta":"Minta Terma Borong","order.p3save":"Lebih jimat","order.poa":"Harga atas permintaan","order.p1price":"MOQ rendah","order.p2price":"Harga unit terbaik","order.p3price":"Hak wilayah",
      "sc.cap1.eyebrow":"Borong · Pengedaran · Label Sendiri","sc.cap1.line1":"Stok jenama","sc.cap1.line2":"yang memang laku.",
      "sc.cap2.line1":"Satu produk terbukti.","sc.cap2.line2":"Margin yang menguntungkan perniagaan anda.","sc.cap2.sub":"Minuman vitaliti Tongkat Ali bersijil & sedia eksport — formula Tiga Kuasa, dokumentasi penuh, bekalan stabil berskala.",
      "sc.cap3.eyebrow":"HALAL · GMP · Buatan Malaysia","sc.cap3.line1":"Bersedia kembangkan","sc.cap3.line2":"portfolio anda?",
      "brand.h2a":"Alam semesta kuasa,","brand.h2b":"impak maksimum."
    },
    pl: {
      "announce":"Dostępna sprzedaż hurtowa B2B · Zapraszamy dystrybutorów z UE · Certyfikat HALAL i GMP · Wyprodukowano w Malezji",
      "nav.benefits":"Korzyści","nav.formula":"Formuła","nav.trust":"Certyfikaty","nav.research":"Badania","nav.faq":"FAQ",
      "cta.order":"Poproś o warunki hurtowe","cta.explore":"Odkryj formułę",
      "hero.eyebrow":"Mężczyźni 30+ · Zapracowani profesjonaliści · Aktywny styl życia","hero.h1a":"Brak energii","hero.h1pk":"po południu?","hero.h1b":"","hero.h1c":"Jedno","hero.h1bk":"sachet dziennie —","hero.h1cp":"","hero.h1d":"energia na cały dzień.",
      "hero.sub":"Triple Force Tongkat Ali + 12 składników botanicznych — wspierają energię, wytrzymałość i skupienie. Gotowy do picia napój liczi, poczuj różnicę w ~30 minut.",
      "hero.cta":"Zamów przez WhatsApp · 30 saszetek/opakowanie","hero.proof":"★ Prawdziwe opinie · Certyfikat HALAL / GMP · Wyprodukowano w Malezji",
      "hero.m1":"Certyfikat HALAL i GMP","hero.m2":"12 składników botanicznych i odżywczych","hero.m3":"Wyprodukowano w Malezji",
      "hero.badge1":"saszetek w opakowaniu","hero.badge2":"10 g gotowe do picia każda","hero.float":"Zamów w 1 wiadomości","hero.trustlabel":"Wyprodukowano w certyfikowanym zakładzie",
      "hero.chip2a":"HALAL · GMP","hero.chip2b":"Certyfikowany zakład",
      "feat.1t":"Ekstrakt Tongkat Ali","feat.1s":"Mieszanka Triple Force","feat.2t":"Naturalne składniki botaniczne","feat.2s":"Aktywne składniki roślinne","feat.3t":"Pyszny smak liczi","feat.3s":"Gotowy do picia","feat.4t":"Bez dodanego cukru","feat.4s":"Lekko słodki",
      "about.imtag":"Premierowy rytuał botaniczny","about.popb":"Dodany cukier","about.popk":"Lekko słodzony",
      "gal.eyebrow":"Codzienny rytuał","gal.h2a":"Stworzony dla","gal.h2b":"nowoczesnego codziennego rytuału","gal.c1":"Rytuał w podróży","gal.c2":"Formuła Triple Force","gal.c3":"Gotowy do picia","gal.c4":"Saszetka 10 g",
      "about.eyebrow":"Co to jest Uni Max","about.lead1":"Naładuj się.","about.lead2":"Skupienie. Działanie.",
      "about.s1":"składniki botaniczne i odżywcze","about.s2":"gotowe do picia na saszetkę","about.s3":"saszetek w opakowaniu",
      "about.b1":"Wyjątkowy napój witalny liczi na bazie Triple Force Tongkat Ali, składników botanicznych i aminokwasów — stworzony dla aktywnych mężczyzn, którzy chcą przez cały dzień mieć energię, skupienie i pewność siebie.",
      "about.b2":"Adaptogeny — ashwagandha, żeń-szeń i cordyceps — pomagają stawiać czoła stresowi i zmęczeniu, a L-arginina i L-cytrulina wspierają Bio-Krążenie dla zdrowego przepływu krwi.",
      "about.b3":"Szybko wchłaniany i wygodny w podróży — to wszechstronny łyk wspierający codzienną energię, skupienie i witalność, bez parzenia i bez wysiłku.",
      "ben.eyebrow":"Zaprojektowany dla codziennej wydajności","ben.h2a":"Wszystko, czego potrzebujesz do","ben.h2b":"codziennej","ben.h2c":"wydajności, w jednym codziennym łyku.",
      "ben.1t":"Energia i wytrzymałość","ben.1d":"Guarana zapewnia łagodną, trwałą energię roślinną — bez nagłych skoków i spadków.",
      "ben.2t":"Skupienie i jasność myślenia","ben.2d":"Zioła adaptogenne pomagają utrzymać jasność umysłu i spokojne skupienie nawet w stresie.",
      "ben.3t":"Odporność i regeneracja","ben.3d":"Połączenie adaptogenów i przeciwutleniaczy roślinnych wspiera regenerację organizmu po codziennym stresie fizycznym i psychicznym.",
      "ben.4t":"Wsparcie krążenia","ben.4d":"Arginina i cytrulina wspomagają zdrowe krążenie krwi i transport tlenu do pracujących mięśni.",
      "ben.5t":"Witalność męska","ben.5d":"Triple Tongkat Ali i cynk pomagają wspierać codzienną siłę, popęd i naturalną witalność.",
      "ing.eyebrow":"Analiza formuły","ing.h2a":"Pięć filarów siły,","ing.h2b":"jeden roślinny łyk.",
      "ing.sub":"Każda saszetka łączy przebadane składniki botaniczne, adaptogeny, aminokwasy i niezbędne składniki odżywcze — działają razem, a nie tylko pobudzają.",
      "ing.note":"Wyłącznie wsparcie strukturalne i funkcjonalne. Nie jest przeznaczony do diagnozowania, leczenia, wyleczenia ani zapobiegania jakiejkolwiek chorobie.",
      "ing.1t":"Triple Tongkat Ali","ing.1r":"Wytrzymałość i witalność","ing.1d":"Tradycyjna roślina z Malezji, stosowana od stuleci w celu wsparcia witalności. Formuła żółty, czerwony i czarny pomaga wspierać wytrzymałość, siłę i naturalną witalność.",
      "ing.tag.yellow":"Żółty","ing.tag.red":"Czerwony","ing.tag.black":"Czarny",
      "ing.2t":"Maka + Guarana","ing.2r":"Energia i metabolizm","ing.2d":"Guarana zapewnia łagodnie uwalniane naturalne kofeiny, a Maka, cynk i witaminy z grupy B wspierają metabolizm, uwalnianie energii i naturalną równowagę hormonalną.",
      "ing.3t":"Kompleks adaptogenów","ing.3r":"Stres i wytrzymałość","ing.3d":"Adaptogeny pomagają organizmowi adaptować się do stresu fizycznego i psychicznego — wspierają spokojne skupienie, stabilną energię i regenerację.",
      "ing.4t":"Wsparcie aminokwasów","ing.4r":"Zdrowy przepływ krwi","ing.4d":"L-arginina i L-cytrulina to aminokwasy wspierające produkcję tlenku azotu, pomagające utrzymać zdrowe krążenie i transport tlenu do mięśni.",
      "ing.5t":"Przeciwutleniacze z czarnego bzu","ing.5r":"Ochrona i regeneracja","ing.5d":"Bogaty w antocyjany czarny bez europejski pomaga wspierać odporność immunologiczną i chronić komórki przed codziennym stresem oksydacyjnym.",
      "sip.eyebrow":"Jeden łyk, pełna moc","sip.h2a":"Pięć charakterystycznych","sip.h2b":"systemów siły",
      "sip.1t":"Triple Force","sip.1d":"Tongkat Ali dla zaawansowanej witalności","sip.2t":"Bio-Krążenie","sip.2d":"Mocne wsparcie zdrowego przepływu krwi",
      "sip.3t":"Moc adaptogenów","sip.3d":"Utrzymuje energię i odporność","sip.4t":"Ochrona antyoksydacyjna","sip.4d":"Walczy ze zmęczeniem i wolnymi rodnikami","sip.5t":"Podstawowe doładowanie","sip.5d":"Zachowaj ostrość i skupienie",
      "who.eyebrow":"Dla kogo","who.h2a":"Stworzony dla tych,","who.h2b":"którzy nie zatrzymują się",
      "who.1t":"Aktywni mężczyźni","who.1d":"Wspiera równowagę hormonalną, krążenie i odporność.","who.2t":"Zapracowani profesjonaliści","who.2d":"Wspiera radzenie sobie ze stresem i regenerację.",
      "who.3t":"Sportowcy i miłośnicy fitnessu","who.3d":"Wspiera skupienie, jasność umysłu i trwałą energię bez spadków.","who.4t":"Osoby pracujące długo","who.4d":"Wspiera krążenie, transport tlenu i wydajność mięśni.",
      "who.5t":"Mężczyźni dążący do codziennej witalności","who.5d":"Dla zapracowanych karier zmagających się ze zmęczeniem fizycznym i psychicznym.",
      "who.6t":"Liderzy i osoby osiągające więcej","who.6d":"Dla tych, którzy prowadzą innych i dążą do maksymalnej efektywności z jasnym umysłem.",
      "trust.eyebrow":"Zaufana jakość","trust.h2":"Wyprodukowane w certyfikowanym zakładzie","trust.sub":"Wyprodukowane przez Orient Biotech Sdn Bhd zgodnie z uznanymi na całym świecie standardami bezpieczeństwa żywności i jakości. Kliknij dowolną odznakę, aby zobaczyć certyfikat.","trust.view":"Zobacz certyfikat →",
      "res.eyebrow":"Nauka jako podstawa formuły","res.h2a":"Formuła oparta","res.h2b":"na badaniach",
      "res.p":"Każdy składnik UNI MAX jest poparty recenzowanymi badaniami — zweryfikowanymi pod kątem roli w zakresie energii, wytrzymałości, krążenia i odporności.",
      "res.pill1":"Randomizowane badania kontrolowane","res.pill2":"Przeglądy systematyczne i metaanalizy","res.s1":"recenzowanych publikacji","res.s2":"przebadanych składników","res.toggle":"Zobacz pełne referencje",
      "res.note":"Referencje dotyczą poszczególnych składników i służą wyłącznie celom edukacyjnym, a nie twierdzeniom o skuteczności produktu, ani nie oznaczają, że Uni Max diagnozuje, leczy, wyleczy lub zapobiega jakiejkolwiek chorobie.",
      "use.eyebrow":"Jak stosować","use.h2a":"Proste w użyciu,","use.h2b":"łatwe do utrzymania",
      "use.1t":"1–2 saszetki dziennie","use.1d":"Pij 1–2 saszetki dziennie, gotowe do picia, najlepiej po posiłku.","use.2t":"Rano lub w ciągu dnia","use.2d":"Najlepiej spożywać rano lub w ciągu dnia, aby wspierać energię przez cały dzień.","use.3t":"Bądź konsekwentny","use.3d":"Aby uzyskać długotrwałe efekty, włącz Uni Max do swojej codziennej rutyny.",
      "use.note":"Bez parzenia — otwórz, wypij, idź. Nie przekraczaj zalecanej dziennej dawki.",
      "rev.eyebrow":"Prawdziwy wybór codziennych użytkowników","rev.h2a":"Prawdziwa codzienność,","rev.h2b":"prawdziwa motywacja","rev.sample":"Sprawdź, jak aktywne osoby włączają UNI MAX do swojej codzienności — od zabieganych dni roboczych po treningi, zawsze pod ręką.",
      "faq.eyebrow":"Warto wiedzieć","faq.h2":"Najczęstsze pytania","faq.asideT":"Masz jeszcze pytania?","faq.asideP":"Napisz do naszego zespołu B2B na WhatsApp po ceny hurtowe, MOQ i szczegóły współpracy.","faq.asideCta":"Skontaktuj się z zespołem B2B",
      "cta.h2a":"Dodaj UNI MAX do swojej oferty —","cta.h2b":"poproś dziś o warunki hurtowe.","cta.p":"Napisz nam, jaki masz rynek i docelowy wolumen, a nasz zespół prześle ceny, MOQ i warunki współpracy — zwykle tego samego dnia.","cta.sub":"+60 10-200 5803 · Kontakt: Jack",
      "foot.about":"Wszechświat siły, maksymalny efekt. Botaniczny napój witalny liczi z Triple Tongkat Ali, od UniPro.",
      "foot.explore":"Odkryj","foot.product":"Produkt","foot.p1":"10 g × 30 saszetek","foot.p2":"Gotowy do picia","foot.p3":"Botaniczny liczi","foot.p4":"Certyfikat HALAL","foot.contact":"Kontakt","foot.jack":"Zapytaj Jacka",
      "foot.disclaimer":"Ten produkt jest suplementem diety i nie jest przeznaczony do diagnozowania, leczenia, wyleczenia ani zapobiegania jakiejkolwiek chorobie. Informacje na tej stronie dotyczą ogólnego dobrostanu i wsparcia strukturalnego i funkcjonalnego poszczególnych składników i nie zastępują profesjonalnej porady medycznej. Skonsultuj się z pracownikiem służby zdrowia przed użyciem, szczególnie w przypadku ciąży, karmienia piersią, przyjmowania leków lub problemów zdrowotnych. Przechowywać w miejscu niedostępnym dla dzieci. Nie zalecane dla osób poniżej 18 roku życia.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Wszelkie prawa zastrzeżone.","foot.made":"Wyprodukowane przez Orient Biotech Sdn Bhd w Malezji.",
      "nav.order":"Zostań partnerem","cta.seeplans":"Zobacz plany i ceny",
      "why.eyebrow":"Dlaczego to wybrać","why.h2a":"Skończyć z","why.h2b":"popołudniowym spadkiem energii.",
      "why.oldtag":"Stare nawyki","why.oldt":"Kawa, napoje energetyczne z dużą ilością cukru i garść suplementów",
      "why.o1":"Gwałtowny wzrost, po którym następuje jeszcze większy popołudniowy spadek","why.o2":"Pełne cukru i syntetycznych stymulantów","why.o3":"Skupia się tylko na energii — ignoruje wytrzymałość, skupienie i krążenie","why.o4":"Wiele butelek, zaparzania lub tabletek każdego dnia",
      "why.newtag":"Metoda UNI MAX","why.newt":"Raz dziennie, saszetka 10 g napoju roślinnego",
      "why.n1":"Guarana — łagodna, trwała energia roślinna","why.n2":"Bez dodanego cukru, lekko słodki, prawdziwy smak liczi","why.n3":"Wspiera energię, wytrzymałość, skupienie, krążenie i odporność na stres","why.n4":"Otwórz i wypij — gotowe w kilka sekund, bez parzenia",
      "order.eyebrow":"Zostań partnerem","order.h2a":"Wybierz poziom współpracy,","order.h2b":"rozwijaj się z nami",
      "order.sub":"Napisz nam na WhatsApp, jaki masz rynek i docelowy wolumen — tego samego dnia prześlemy ceny hurtowe, MOQ i warunki współpracy.",
      "order.p1name":"Punkt sprzedaży detalicznej","order.p1tag":"Wypróbuj przez miesiąc","order.perbox":"/ opakowanie","order.p1day":"30 saszetek gotowych do picia",
      "order.p1f1":"30 saszetek gotowych do picia","order.p1f2":"Obsługa WhatsApp tego samego dnia","order.p1f3":"Standardowa dostawa","order.p1cta":"Kup pojedyncze opakowanie",
      "order.popular":"Najpopularniejsze · Najlepsza wartość","order.p2name":"Partner hurtowy","order.p2tag":"Trzymiesięczna codzienna witalność","order.perbundle":"/ 3 opakowania",
      "order.p2save":"Lepsza wartość","order.p2day":"· zapas na trzy miesiące","order.p2f1":"90 saszetek","order.p2f2":"Bezpłatna dostawa całego zestawu","order.p2f3":"Priorytetowa obsługa WhatsApp","order.p2cta":"Kup pakiet",
      "order.p3name":"Dystrybutor regionalny","order.p3tag":"Jedno opakowanie miesięcznie","order.p3day":"Najniższa cena · Anuluj w dowolnym momencie",
      "order.p3f1":"30 saszetek dostarczanych miesięcznie","order.p3f2":"Bezpłatna dostawa co miesiąc","order.p3f3":"Wstrzymaj lub anuluj w dowolnym momencie","order.p3cta":"Rozpocznij subskrypcję",
      "order.a1":"Dokumentacja gotowa do eksportu","order.a2":"Odpowiedź WhatsApp tego samego dnia","order.a3":"Certyfikowany zakład HALAL i GMP","order.a4":"Nie pasuje? Po prostu nam napisz",
      "sticky.from":"Gotowy, aby naładować swój dzień?","sticky.sub":"Bezpłatna dostawa przy pierwszym zamówieniu","sticky.cta":"Zobacz plany",
      "order.subtag":"Ceny zależne od wolumenu · MOQ potwierdzane na zapytanie","order.howmany":"Wybierz poziom współpracy","order.spec1":"saszetek / opakowanie","order.spec2":"składniki botaniczne i odżywcze","order.spec3":"dodany cukier","order.spec4":"minut, aby poczuć efekty",
      "order.p1sub":"Dla sklepów, aptek i siłowni testujących sprzedaż","order.p2sub":"Dla odsprzedawców i importerów kupujących na kartony","order.p3sub":"Wyłączne prawa do terytorium i wsparcie marketingowe","order.best":"NAJPOPULARNIEJSZE","order.freeship":"BEZPŁATNA DOSTAWA","order.cta":"Poproś o warunki hurtowe","order.p3save":"Oszczędzaj więcej","order.poa":"Cena na zapytanie","order.p1price":"Niski MOQ","order.p2price":"Najlepsza cena jednostkowa","order.p3price":"Prawa do terytorium",
      "sc.cap1.eyebrow":"Hurt · Dystrybucja · Marka własna","sc.cap1.line1":"Wprowadź markę,","sc.cap1.line2":"która się sprzedaje.",
      "sc.cap2.line1":"Jeden sprawdzony produkt.","sc.cap2.line2":"Marża, którą pokocha Twój biznes.","sc.cap2.sub":"Certyfikowany, gotowy do eksportu napój witalny z Tongkat Ali — formuła Triple Force, pełna dokumentacja, stabilne dostawy na dużą skalę.",
      "sc.cap3.eyebrow":"HALAL · GMP · Wyprodukowano w Malezji","sc.cap3.line1":"Gotowy rozwinąć","sc.cap3.line2":"swoje portfolio?",
      "brand.h2a":"Wszechświat siły,","brand.h2b":"maksymalny efekt."
    },
    nl: {
      "announce":"B2B-groothandel beschikbaar · Distributeurs uit de EU welkom · HALAL- en GMP-gecertificeerd · Gemaakt in Maleisië",
      "nav.benefits":"Voordelen","nav.formula":"Formule","nav.trust":"Certificaten","nav.research":"Onderzoek","nav.faq":"Veelgestelde vragen",
      "cta.order":"Vraag groothandelsvoorwaarden aan","cta.explore":"Ontdek de formule",
      "hero.eyebrow":"Mannen 30+ · Drukke professionals · Actieve levensstijl","hero.h1a":"Energieloos","hero.h1pk":"in de middag?","hero.h1b":"","hero.h1c":"Eén","hero.h1bk":"sachet per dag —","hero.h1cp":"","hero.h1d":"energie voor de hele dag.",
      "hero.sub":"Triple Force Tongkat Ali + 12 botanische ingrediënten — ter ondersteuning van energie, uithoudingsvermogen en focus. Drankje met lychee-smaak, klaar voor gebruik. Voel het verschil in ~30 minuten.",
      "hero.cta":"Bestellen via WhatsApp · 30 sachets/doos","hero.proof":"★ Echte reviews · HALAL / GMP-gecertificeerd · Gemaakt in Maleisië",
      "hero.m1":"HALAL- en GMP-gecertificeerd","hero.m2":"12 botanische ingrediënten en nutriënten","hero.m3":"Gemaakt in Maleisië",
      "hero.badge1":"sachets per doos","hero.badge2":"10 g gebruiksklaar per sachet","hero.float":"Bestel in 1 bericht","hero.trustlabel":"Geproduceerd in gecertificeerde faciliteit",
      "hero.chip2a":"HALAL · GMP","hero.chip2b":"Gecertificeerde fabriek",
      "feat.1t":"Tongkat Ali-extract","feat.1s":"Triple Force-blend","feat.2t":"Natuurlijke botanische ingrediënten","feat.2s":"Plantengebaseerde werkzame stoffen","feat.3t":"Heerlijke lychee-smaak","feat.3s":"Gebruiksklaar","feat.4t":"Zonder toegevoegde suiker","feat.4s":"Licht gezoet",
      "about.imtag":"Premium botanisch ritueel","about.popb":"Toegevoegde suiker","about.popk":"Licht gezoet",
      "gal.eyebrow":"Dagelijks ritueel","gal.h2a":"Gemaakt voor een","gal.h2b":"modern dagelijks ritueel","gal.c1":"Ritueel voor onderweg","gal.c2":"Triple Force-formule","gal.c3":"Gebruiksklaar","gal.c4":"10 g sachet",
      "about.eyebrow":"Wat is Uni Max","about.lead1":"Opladen.","about.lead2":"Focus. Presteren.",
      "about.s1":"botanische ingrediënten en nutriënten","about.s2":"gebruiksklaar per sachet","about.s3":"sachets per doos",
      "about.b1":"Een premium vitaaldrank met lychee-smaak op basis van Triple Force Tongkat Ali, botanische ingrediënten en aminozuren — gemaakt voor actieve mannen die energie, focus en zelfvertrouwen willen gedurende de hele dag.",
      "about.b2":"Adaptogenen — ashwagandha, ginseng en cordyceps — helpen je bestand te zijn tegen stress en vermoeidheid, terwijl L-arginine en L-citrulline de Bio-Circulatie ondersteunen voor een gezonde bloedstroom.",
      "about.b3":"Snel opgenomen en gemakkelijk mee te nemen — dit is jouw allesomvattende slok voor dagelijkse energie, focus en vitaliteit, zonder brouwen of gedoe.",
      "ben.eyebrow":"Gebouwd voor dagelijkse prestaties","ben.h2a":"Alles wat je nodig hebt voor","ben.h2b":"dagelijkse","ben.h2c":"prestaties, in één dagelijkse slok.",
      "ben.1t":"Energie en uithoudingsvermogen","ben.1d":"Guarana levert vloeiende, aanhoudende plantenenergie — geen pieken, geen dip.",
      "ben.2t":"Focus en helderheid","ben.2d":"Adaptogenen ondersteunen mentale helderheid en rustige focus, ook onder druk.",
      "ben.3t":"Veerkracht en herstel","ben.3d":"Een combinatie van adaptogenen en antioxidanten ondersteunt herstel van dagelijkse fysieke en mentale belasting.",
      "ben.4t":"Ondersteuning van de bloedsomloop","ben.4d":"L-arginine en L-citrulline ondersteunen een gezonde bloedsomloop en zuurstoftoevoer naar de werkende spieren.",
      "ben.5t":"Mannelijke vitaliteit","ben.5d":"Triple Force Tongkat Ali en zink helpen dagelijkse kracht, motivatie en natuurlijke vitaliteit te ondersteunen.",
      "ing.eyebrow":"Formule","ing.h2a":"Vijf krachten,","ing.h2b":"één botanische slok.",
      "ing.sub":"Elk sachet combineert onderzochte botanische ingrediënten, adaptogenen, aminozuren en essentiële nutriënten — ontworpen om samen te werken, niet alleen om je wakker te houden.",
      "ing.note":"Alleen structurele en functionele ondersteuning. Niet bedoeld om ziekten te diagnosticeren, behandelen, genezen of voorkomen.",
      "ing.1t":"Triple Force Tongkat Ali","ing.1r":"Uithoudingsvermogen en vitaliteit","ing.1d":"Traditioneel Maleisisch botanisch ingredient, eeuwenlang gebruikt ter ondersteuning van vitaliteit. Onze blend van Geel, Rood en Zwart helpt uithoudingsvermogen, kracht en natuurlijke vitaliteit te ondersteunen.",
      "ing.tag.yellow":"Geel","ing.tag.red":"Rood","ing.tag.black":"Zwart",
      "ing.2t":"Maca + Guarana","ing.2r":"Energie en metabolisme","ing.2d":"Guarana levert langzaam vrijkomende natuurlijke cafeïne, terwijl Maca, Zink en B-vitaminen het metabolisme, de energieafgifte en de natuurlijke hormonale balans ondersteunen.",
      "ing.3t":"Adaptogenenmix","ing.3r":"Stress en veerkracht","ing.3d":"Adaptogenen helpen het lichaam aan te passen aan fysieke en mentale stress — ter ondersteuning van rustige focus, stabiele energie en herstel.",
      "ing.4t":"Ondersteuning door aminozuren","ing.4r":"Gezonde bloedstroom","ing.4d":"L-arginine en L-citrulline zijn aminozuren die de productie van stikstofoxide ondersteunen, wat helpt een gezonde bloedsomloop en zuurstoftoevoer naar de spieren te behouden.",
      "ing.5t":"Antioxidanten van vlierbes","ing.5r":"Bescherming en herstel","ing.5d":"Zwarte vlierbes, rijk aan anthocyaninen, helpt de immuunafweer te ondersteunen en cellen te beschermen tegen dagelijkse oxidatieve stress.",
      "sip.eyebrow":"Eén slok, alle kracht","sip.h2a":"Vijf kenmerkende","sip.h2b":"krachtssystemen",
      "sip.1t":"Triple Force","sip.1d":"Tongkat Ali voor verbeterde vitaliteit","sip.2t":"Bio-Circulatie","sip.2d":"Krachtige ondersteuning van gezonde bloedstroom",
      "sip.3t":"Adaptogenenkracht","sip.3d":"Blijf energiek en veerkrachtig","sip.4t":"Antioxidantschild","sip.4d":"Bescherming tegen vermoeidheid en vrije radicalen","sip.5t":"Core Charger","sip.5d":"Blijf scherp en gefocust",
      "who.eyebrow":"Voor wie","who.h2a":"Gebouwd voor degenen die","who.h2b":"niet stoppen",
      "who.1t":"Actieve mannen","who.1d":"Ondersteunt hormonale balans, bloedsomloop en veerkracht.","who.2t":"Drukke professionals","who.2d":"Ondersteunt stressbestendigheid en herstel.",
      "who.3t":"Sport- en fitnessliefhebbers","who.3d":"Ondersteunt focus, helderheid en aanhoudende energie zonder dip.","who.4t":"Langdurige werkers","who.4d":"Ondersteunt bloedsomloop, zuurstoftoevoer en spierprestaties.",
      "who.5t":"Mannen die dagelijkse vitaliteit zoeken","who.5d":"Voor een veeleisende carrière die mentale en fysieke vermoeidheid met zich meebrengt.",
      "who.6t":"Leiders & Hoogpresteerders","who.6d":"Voor degenen die leiden en streven naar topprestaties met mentale helderheid.",
      "trust.eyebrow":"Vertrouwde kwaliteit","trust.h2":"Geproduceerd in gecertificeerde faciliteit","trust.sub":"Gefabriceerd door Orient Biotech Sdn Bhd onder internationaal erkende normen voor voedselveiligheid en kwaliteit. Klik op een certificaat om het te bekijken.","trust.view":"Bekijk certificaat →",
      "res.eyebrow":"Geformuleerd met wetenschap","res.h2a":"Geformuleerd met","res.h2b":"onderzochte ingrediënten",
      "res.p":"Elk ingrediënt in UNI MAX wordt ondersteund door peer-reviewed onderzoek — bestudeerd op zijn rol in energie, uithoudingsvermogen, bloedsomloop en veerkracht.",
      "res.pill1":"Gerandomiseerde gecontroleerde onderzoeken","res.pill2":"Systematische reviews en meta-analyses","res.s1":"peer-reviewed bronnen","res.s2":"onderzochte ingrediënten","res.toggle":"Volledige referentielijst bekijken",
      "res.note":"Referenties hebben betrekking op afzonderlijke ingrediënten en zijn uitsluitend voor algemene educatie. Dit zijn geen productspecifieke claims en impliceert niet dat Uni Max ziekten diagnosticeert, behandelt, geneest of voorkomt.",
      "use.eyebrow":"Gebruiksaanwijzing","use.h2a":"Makkelijk te nemen,","use.h2b":"makkelijk vol te houden",
      "use.1t":"1–2 sachets per dag","use.1d":"Drink 1 tot 2 gebruiksklare sachets per dag, direct na de maaltijd.","use.2t":"'s Ochtends of overdag","use.2d":"Het beste 's ochtends of overdag ingenomen voor energie gedurende de hele dag.","use.3t":"Blijf consistent","use.3d":"Voor blijvende resultaten: geniet dagelijks van Uni Max als onderdeel van je routine.",
      "use.note":"Geen brouwen nodig — scheur open, drink op, ga. Overschrijd de aanbevolen dagelijkse dosis niet.",
      "rev.eyebrow":"De keuze van dagelijkse gebruikers","rev.h2a":"Echte routines,","rev.h2b":"echte energie","rev.sample":"Bekijk hoe actieve mensen UNI MAX opnemen in hun dagelijkse routine — van drukke werkdagen tot trainingen en lange reizen.",
      "faq.eyebrow":"Goed om te weten","faq.h2":"Veelgestelde vragen","faq.asideT":"Nog vragen?","faq.asideP":"Stuur ons B2B-team een bericht op WhatsApp voor groothandelsprijzen, MOQ en samenwerkingsdetails.","faq.asideCta":"Praat met ons B2B-team",
      "cta.h2a":"Voeg UNI MAX toe aan je assortiment —","cta.h2b":"vraag vandaag groothandelsvoorwaarden aan.","cta.p":"Vertel ons je markt en gewenste volume, en ons team stuurt prijzen, MOQ en samenwerkingsvoorwaarden — meestal dezelfde dag.","cta.sub":"+60 10-200 5803 · Contact: Jack",
      "foot.about":"Universum van kracht, maximale impact. Een botanische vitaaldrank met lychee-smaak en Triple Force Tongkat Ali, van UniPro.",
      "foot.explore":"Verkennen","foot.product":"Product","foot.p1":"10 g × 30 sachets","foot.p2":"Gebruiksklaar","foot.p3":"Botanische lychee","foot.p4":"HALAL-gecertificeerd","foot.contact":"Contact","foot.jack":"Vraag het Jack",
      "foot.disclaimer":"Dit product is een voedingssupplement en is niet bedoeld om ziekten te diagnosticeren, behandelen, genezen of voorkomen. De informatie op deze website heeft betrekking op algemene gezondheid en de structurele en functionele eigenschappen van afzonderlijke ingrediënten, en vervangt geen professioneel medisch advies. Raadpleeg een zorgverlener voor gebruik, met name als u zwanger bent, borstvoeding geeft, medicijnen gebruikt of gezondheidsproblemen heeft. Buiten bereik van kinderen bewaren. Niet aanbevolen voor personen onder de 18 jaar.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Alle rechten voorbehouden.","foot.made":"Geproduceerd in Maleisië door Orient Biotech Sdn Bhd.",
      "nav.order":"Word partner","cta.seeplans":"Bekijk plannen en prijzen",
      "why.eyebrow":"Waarom overstappen","why.h2a":"Stop met achterna lopen van","why.h2b":"die middagdip.",
      "why.oldtag":"De gebruikelijke aanpak","why.oldt":"Koffie, suikerrijke energiedrankjes en een handvol pillen",
      "why.o1":"Eerst een piek, daarna een nog grotere dip in de middag","why.o2":"Vol met suiker en synthetische stimulantia","why.o3":"Alleen op energie gericht — uithoudingsvermogen, focus en bloedsomloop worden genegeerd","why.o4":"Meerdere drankjes, brouwsels of pillen per dag",
      "why.newtag":"De UNI MAX aanpak","why.newt":"Eén sachet 10 g botanisch drankje per dag",
      "why.n1":"Vloeiende plantenenergie van guarana — stabiel, geen pieken","why.n2":"Zonder toegevoegde suiker, licht gezoet, echte lychee-smaak","why.n3":"Ondersteunt energie, uithoudingsvermogen, focus, bloedsomloop en stressbestendigheid","why.n4":"Openscheuren, drinken, gaan — klaar in seconden, geen brouwen",
      "order.eyebrow":"Word partner","order.h2a":"Kies je samenwerkingsniveau,","order.h2b":"groei met ons mee",
      "order.sub":"Vertel ons via WhatsApp je markt en gewenste volume — we sturen dezelfde dag groothandelsprijzen, MOQ en samenwerkingsvoorwaarden.",
      "order.p1name":"Retailverkooppunt","order.p1tag":"Probeer het een maand","order.perbox":"/ doos","order.p1day":"30 gebruiksklare sachets",
      "order.p1f1":"30 gebruiksklare sachets","order.p1f2":"WhatsApp-ondersteuning op dezelfde dag","order.p1f3":"Standaard bezorging","order.p1cta":"Bestel één doos",
      "order.popular":"Meest populair · beste waarde","order.p2name":"Groothandelspartner","order.p2tag":"3 maanden dagelijkse vitaliteit","order.perbundle":"/ 3 dozen",
      "order.p2save":"Meer besparing","order.p2day":"· voorraad voor 3 maanden","order.p2f1":"90 sachets","order.p2f2":"Gratis verzending voor het hele pakket","order.p2f3":"Prioritaire WhatsApp-ondersteuning","order.p2cta":"Bestel pakket",
      "order.p3name":"Regionale distributeur","order.p3tag":"1 doos per maand","order.p3day":"Laagste prijs · op elk moment annuleren",
      "order.p3f1":"30 sachets maandelijks bezorgd","order.p3f2":"Gratis verzending elke maand","order.p3f3":"Pauzeer of annuleer op elk moment","order.p3cta":"Abonnement starten",
      "order.a1":"Exportklare documentatie","order.a2":"WhatsApp-reactie op dezelfde dag","order.a3":"HALAL- en GMP-gecertificeerde faciliteit","order.a4":"Niet tevreden? Stuur ons gewoon een bericht",
      "sticky.from":"Klaar om je dag op te laden?","sticky.sub":"Gratis bezorging eerste doos","sticky.cta":"Bekijk plannen",
      "order.subtag":"Volumeprijzen · MOQ bevestigd op aanvraag","order.howmany":"Kies je samenwerkingsniveau","order.spec1":"sachets / doos","order.spec2":"botanische ingrediënten en nutriënten","order.spec3":"toegevoegde suiker","order.spec4":"minuten om effect te voelen",
      "order.p1sub":"Voor winkels, apotheken en sportscholen die verkoop testen","order.p2sub":"Voor wederverkopers en importeurs die per doos kopen","order.p3sub":"Exclusieve territoriumrechten en marketingondersteuning","order.best":"MEEST POPULAIR","order.freeship":"GRATIS VERZENDING","order.cta":"Vraag groothandelsvoorwaarden aan","order.p3save":"Bespaar meer","order.poa":"Prijs op aanvraag","order.p1price":"Lage MOQ","order.p2price":"Beste stuksprijs","order.p3price":"Territoriumrechten",
      "sc.cap1.eyebrow":"Groothandel · Distributie · Private label","sc.cap1.line1":"Voer het merk","sc.cap1.line2":"dat verkoopt.",
      "sc.cap2.line1":"Eén bewezen product.","sc.cap2.line2":"Marges waar je bedrijf van houdt.","sc.cap2.sub":"Een gecertificeerde, exportklare Tongkat Ali-vitaaldrank — Triple Force-formule, volledige documentatie, betrouwbare levering op schaal.",
      "sc.cap3.eyebrow":"HALAL · GMP · Gemaakt in Maleisië","sc.cap3.line1":"Klaar om je","sc.cap3.line2":"assortiment te laten groeien?",
      "brand.h2a":"Universum van kracht,","brand.h2b":"maximale impact."
    },
    de: {
      "announce":"B2B-Großhandel verfügbar · Vertriebspartner aus der EU willkommen · HALAL & GMP zertifiziert · Hergestellt in Malaysia",
      "nav.benefits":"Vorteile","nav.formula":"Formel","nav.trust":"Zertifikate","nav.research":"Forschung","nav.faq":"Häufige Fragen",
      "cta.order":"Großhandelskonditionen anfragen","cta.explore":"Formel entdecken",
      "hero.eyebrow":"Männer 30+ · Vielbeschäftigte Profis · Aktiver Lebensstil","hero.h1a":"Energielos","hero.h1pk":"am Nachmittag?","hero.h1b":"","hero.h1c":"Ein","hero.h1bk":"Sachet pro Tag —","hero.h1cp":"","hero.h1d":"Energie für den ganzen Tag.",
      "hero.sub":"Triple Force Tongkat Ali + 12 botanische Inhaltsstoffe — zur Unterstützung von Energie, Ausdauer und Fokus. Trinkfertiges Lychee-Getränk, spüren Sie den Unterschied in ~30 Minuten.",
      "hero.cta":"Auf WhatsApp bestellen · 30 Sachets/Box","hero.proof":"★ Echte Bewertungen · HALAL / GMP zertifiziert · Hergestellt in Malaysia",
      "hero.m1":"HALAL & GMP zertifiziert","hero.m2":"12 botanische Inhaltsstoffe & Nährstoffe","hero.m3":"Hergestellt in Malaysia",
      "hero.badge1":"Sachets pro Box","hero.badge2":"10 g trinkfertig pro Sachet","hero.float":"In 1 Nachricht bestellen","hero.trustlabel":"Hergestellt in zertifizierter Anlage",
      "hero.chip2a":"HALAL · GMP","hero.chip2b":"Zertifiziertes Werk",
      "feat.1t":"Tongkat Ali-Extrakt","feat.1s":"Triple Force-Blend","feat.2t":"Natürliche botanische Inhaltsstoffe","feat.2s":"Pflanzliche Wirkstoffe","feat.3t":"Köstlicher Lychee-Geschmack","feat.3s":"Trinkfertig","feat.4t":"Ohne zugesetzten Zucker","feat.4s":"Leicht gesüßt",
      "about.imtag":"Premium botanisches Ritual","about.popb":"Zugesetzter Zucker","about.popk":"Leicht gesüßt",
      "gal.eyebrow":"Tägliches Ritual","gal.h2a":"Geschaffen für ein","gal.h2b":"modernes tägliches Ritual","gal.c1":"Ritual für unterwegs","gal.c2":"Triple Force-Formel","gal.c3":"Trinkfertig","gal.c4":"10-g-Sachet",
      "about.eyebrow":"Was ist Uni Max","about.lead1":"Aufladen.","about.lead2":"Fokus. Leisten.",
      "about.s1":"botanische Inhaltsstoffe & Nährstoffe","about.s2":"trinkfertig pro Sachet","about.s3":"Sachets pro Box",
      "about.b1":"Ein hochwertiges Lychee-Vitalitätsgetränk auf Basis von Triple Force Tongkat Ali, botanischen Inhaltsstoffen und Aminosäuren — entwickelt für aktive Männer, die den ganzen Tag über Energie, Fokus und Selbstvertrauen wollen.",
      "about.b2":"Adaptogene — Ashwagandha, Ginseng und Cordyceps — helfen Ihnen, Stress und Müdigkeit standzuhalten, während L-Arginin und L-Citrullin den Bio-Kreislauf für einen gesunden Blutfluss unterstützen.",
      "about.b3":"Schnell absorbiert und leicht mitzunehmen — das ist Ihr umfassender Schluck für tägliche Energie, Fokus und Vitalität, ohne Brühen oder Aufwand.",
      "ben.eyebrow":"Entwickelt für tägliche Leistung","ben.h2a":"Alles was Sie brauchen für","ben.h2b":"tägliche","ben.h2c":"Leistung, in einem täglichen Schluck.",
      "ben.1t":"Energie & Ausdauer","ben.1d":"Guarana liefert sanfte, anhaltende pflanzliche Energie — kein Hochschnellen, kein Einbruch.",
      "ben.2t":"Fokus & Klarheit","ben.2d":"Adaptogene unterstützen geistige Klarheit und ruhige Konzentration, auch unter Druck.",
      "ben.3t":"Belastbarkeit & Erholung","ben.3d":"Eine Kombination aus Adaptogenen und Antioxidantien unterstützt die Erholung von täglichen körperlichen und mentalen Belastungen.",
      "ben.4t":"Kreislaufunterstützung","ben.4d":"L-Arginin und L-Citrullin unterstützen einen gesunden Kreislauf und die Sauerstoffversorgung der arbeitenden Muskeln.",
      "ben.5t":"Männliche Vitalität","ben.5d":"Triple Force Tongkat Ali und Zink helfen dabei, tägliche Kraft, Antrieb und natürliche Vitalität zu unterstützen.",
      "ing.eyebrow":"Formel","ing.h2a":"Fünf Kräfte,","ing.h2b":"ein botanischer Schluck.",
      "ing.sub":"Jedes Sachet kombiniert erforschte botanische Inhaltsstoffe, Adaptogene, Aminosäuren und essentielle Nährstoffe — entwickelt, um zusammenzuwirken, nicht nur um Sie wach zu halten.",
      "ing.note":"Nur strukturelle und funktionelle Unterstützung. Nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten bestimmt.",
      "ing.1t":"Triple Force Tongkat Ali","ing.1r":"Ausdauer & Vitalität","ing.1d":"Traditionelle malaysische Pflanze, seit Jahrhunderten zur Unterstützung der Vitalität verwendet. Unsere Mischung aus Gelb, Rot und Schwarz hilft dabei, Ausdauer, Kraft und natürliche Vitalität zu unterstützen.",
      "ing.tag.yellow":"Gelb","ing.tag.red":"Rot","ing.tag.black":"Schwarz",
      "ing.2t":"Maca + Guarana","ing.2r":"Energie & Stoffwechsel","ing.2d":"Guarana liefert langsam freigesetztes natürliches Koffein, während Maca, Zink und B-Vitamine den Stoffwechsel, die Energiefreisetzung und das natürliche Hormongleichgewicht unterstützen.",
      "ing.3t":"Adaptogen-Mischung","ing.3r":"Stress & Belastbarkeit","ing.3d":"Adaptogene helfen dem Körper, sich an körperlichen und mentalen Stress anzupassen — zur Unterstützung von ruhiger Konzentration, stabiler Energie und Erholung.",
      "ing.4t":"Aminosäuren-Unterstützung","ing.4r":"Gesunder Blutfluss","ing.4d":"L-Arginin und L-Citrullin sind Aminosäuren, die die Produktion von Stickstoffmonoxid unterstützen, was dazu beiträgt, einen gesunden Kreislauf und die Sauerstoffversorgung der Muskeln aufrechtzuerhalten.",
      "ing.5t":"Holunderbeeren-Antioxidantien","ing.5r":"Schutz & Erholung","ing.5d":"Schwarzer Holunder, reich an Anthocyanen, hilft dabei, die Immunabwehr zu unterstützen und Zellen vor täglichem oxidativem Stress zu schützen.",
      "sip.eyebrow":"Ein Schluck, alle Kraft","sip.h2a":"Fünf markante","sip.h2b":"Kraftsysteme",
      "sip.1t":"Triple Force","sip.1d":"Tongkat Ali für verbesserte Vitalität","sip.2t":"Bio-Kreislauf","sip.2d":"Starke Unterstützung des gesunden Blutflusses",
      "sip.3t":"Adaptogen-Kraft","sip.3d":"Energisch & belastbar bleiben","sip.4t":"Antioxidantien-Schild","sip.4d":"Schutz vor Müdigkeit & freien Radikalen","sip.5t":"Core Charger","sip.5d":"Scharf & fokussiert bleiben",
      "who.eyebrow":"Für wen","who.h2a":"Entwickelt für diejenigen,","who.h2b":"die nicht aufhören",
      "who.1t":"Aktive Männer","who.1d":"Unterstützt Hormonbalance, Kreislauf und Belastbarkeit.","who.2t":"Vielbeschäftigte Profis","who.2d":"Unterstützt Stressresistenz und Erholung.",
      "who.3t":"Sport- & Fitnessbegeisterte","who.3d":"Unterstützt Fokus, Klarheit und anhaltende Energie ohne Einbruch.","who.4t":"Langstunden-Arbeiter","who.4d":"Unterstützt Kreislauf, Sauerstoffversorgung und Muskelleistung.",
      "who.5t":"Männer, die tägliche Vitalität suchen","who.5d":"Für eine anspruchsvolle Karriere, die geistige und körperliche Erschöpfung mit sich bringt.",
      "who.6t":"Führungskräfte & Leistungsträger","who.6d":"Für alle, die führen und Spitzenleistung mit klarem Kopf anstreben.",
      "trust.eyebrow":"Vertrauenswürdige Qualität","trust.h2":"Hergestellt in zertifizierter Anlage","trust.sub":"Hergestellt von Orient Biotech Sdn Bhd nach international anerkannten Standards für Lebensmittelsicherheit und Qualität. Klicken Sie auf ein Zertifikat, um es anzuzeigen.","trust.view":"Zertifikat ansehen →",
      "res.eyebrow":"Mit Wissenschaft formuliert","res.h2a":"Formuliert mit","res.h2b":"erforschten Inhaltsstoffen",
      "res.p":"Jeder Inhaltsstoff in UNI MAX wird durch peer-reviewed Forschung unterstützt — untersucht auf seine Rolle in Energie, Ausdauer, Kreislauf und Belastbarkeit.",
      "res.pill1":"Randomisierte kontrollierte Studien","res.pill2":"Systematische Übersichten & Meta-Analysen","res.s1":"peer-reviewed Quellen","res.s2":"erforschte Inhaltsstoffe","res.toggle":"Vollständige Referenzliste anzeigen",
      "res.note":"Referenzen beziehen sich auf einzelne Inhaltsstoffe und dienen nur der allgemeinen Bildung. Es handelt sich nicht um produktspezifische Aussagen und impliziert nicht, dass Uni Max Krankheiten diagnostiziert, behandelt, heilt oder verhindert.",
      "use.eyebrow":"Anwendungshinweise","use.h2a":"Einfach einzunehmen,","use.h2b":"einfach beizubehalten",
      "use.1t":"1–2 Sachets täglich","use.1d":"Täglich 1 bis 2 trinkfertige Sachets einnehmen, direkt nach der Mahlzeit.","use.2t":"Morgens oder tagsüber","use.2d":"Am besten morgens oder tagsüber eingenommen für Energie den ganzen Tag.","use.3t":"Konsequent bleiben","use.3d":"Für dauerhafte Ergebnisse genießen Sie Uni Max täglich als Teil Ihrer Routine.",
      "use.note":"Kein Brühen erforderlich — aufreißen, trinken, los. Empfohlene Tagesdosis nicht überschreiten.",
      "rev.eyebrow":"Die Wahl täglicher Anwender","rev.h2a":"Echte Routinen,","rev.h2b":"echte Energie","rev.sample":"Sehen Sie, wie aktive Menschen UNI MAX in ihre tägliche Routine integrieren — von arbeitsreichen Tagen bis hin zu Trainingseinheiten und langen Reisen.",
      "faq.eyebrow":"Gut zu wissen","faq.h2":"Häufig gestellte Fragen","faq.asideT":"Noch Fragen?","faq.asideP":"Schreiben Sie unserem B2B-Team auf WhatsApp für Großhandelspreise, MOQ und Partnerschaftsdetails.","faq.asideCta":"B2B-Team kontaktieren",
      "cta.h2a":"Nehmen Sie UNI MAX in Ihr Sortiment auf —","cta.h2b":"fragen Sie noch heute Großhandelskonditionen an.","cta.p":"Nennen Sie uns Ihren Markt und Ihr Zielvolumen, und unser Team sendet Preise, MOQ und Partnerschaftskonditionen — meist noch am selben Tag.","cta.sub":"+60 10-200 5803 · Kontakt: Jack",
      "foot.about":"Universum der Kraft, maximale Wirkung. Ein botanisches Lychee-Vitalitätsgetränk mit Triple Force Tongkat Ali von UniPro.",
      "foot.explore":"Entdecken","foot.product":"Produkt","foot.p1":"10 g × 30 Sachets","foot.p2":"Trinkfertig","foot.p3":"Botanisches Lychee","foot.p4":"HALAL-zertifiziert","foot.contact":"Kontakt","foot.jack":"Jack fragen",
      "foot.disclaimer":"Dieses Produkt ist ein Nahrungsergänzungsmittel und ist nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten bestimmt. Die Informationen auf dieser Website beziehen sich auf die allgemeine Gesundheit und die strukturellen und funktionellen Eigenschaften einzelner Inhaltsstoffe und ersetzen keine professionelle medizinische Beratung. Konsultieren Sie vor der Einnahme einen Arzt, insbesondere wenn Sie schwanger sind, stillen, Medikamente nehmen oder an gesundheitlichen Problemen leiden. Außerhalb der Reichweite von Kindern aufbewahren. Nicht empfohlen für Personen unter 18 Jahren.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Alle Rechte vorbehalten.","foot.made":"Hergestellt in Malaysia von Orient Biotech Sdn Bhd.",
      "nav.order":"Partner werden","cta.seeplans":"Pläne & Preise ansehen",
      "why.eyebrow":"Warum wechseln","why.h2a":"Hören Sie auf, dem","why.h2b":"Nachmittagstief nachzujagen.",
      "why.oldtag":"Die übliche Methode","why.oldt":"Kaffee, zuckerreiche Energydrinks & eine Handvoll Pillen",
      "why.o1":"Erst ein Hochschnellen, dann ein noch stärkerer Einbruch am Nachmittag","why.o2":"Voller Zucker und synthetischer Stimulanzien","why.o3":"Nur auf Energie ausgerichtet — Ausdauer, Fokus & Kreislauf werden ignoriert","why.o4":"Mehrere Getränke, Brühungen oder Pillen täglich",
      "why.newtag":"Der UNI MAX Ansatz","why.newt":"Ein 10-g-Sachet Pflanzengetränk täglich",
      "why.n1":"Sanfte pflanzliche Energie aus Guarana — stabil, kein Hochschnellen","why.n2":"Ohne zugesetzten Zucker, leicht gesüßt, echter Lychee-Geschmack","why.n3":"Unterstützt Energie, Ausdauer, Fokus, Kreislauf & Stressresistenz","why.n4":"Aufreißen, trinken, los — fertig in Sekunden, kein Brühen",
      "order.eyebrow":"Partner werden","order.h2a":"Wählen Sie Ihre Partnerstufe,","order.h2b":"wachsen Sie mit uns",
      "order.sub":"Nennen Sie uns per WhatsApp Ihren Markt und Ihr Zielvolumen — wir senden noch am selben Tag Großhandelspreise, MOQ und Partnerschaftskonditionen.",
      "order.p1name":"Einzelhandelspartner","order.p1tag":"Einen Monat ausprobieren","order.perbox":"/ Box","order.p1day":"30 trinkfertige Sachets",
      "order.p1f1":"30 trinkfertige Sachets","order.p1f2":"WhatsApp-Support am selben Tag","order.p1f3":"Standardversand","order.p1cta":"Eine Box bestellen",
      "order.popular":"Beliebteste · bestes Preis-Leistungs-Verhältnis","order.p2name":"Großhandelspartner","order.p2tag":"3 Monate tägliche Vitalität","order.perbundle":"/ 3 Boxen",
      "order.p2save":"Mehr sparen","order.p2day":"· Vorrat für 3 Monate","order.p2f1":"90 Sachets","order.p2f2":"Kostenloser Versand für das gesamte Paket","order.p2f3":"Priorisierter WhatsApp-Support","order.p2cta":"Paket bestellen",
      "order.p3name":"Regionaldistributor","order.p3tag":"1 Box pro Monat","order.p3day":"Günstigster Preis · jederzeit kündbar",
      "order.p3f1":"30 Sachets monatlich geliefert","order.p3f2":"Kostenloser Versand jeden Monat","order.p3f3":"Jederzeit pausieren oder kündigen","order.p3cta":"Abonnement starten",
      "order.a1":"Exportfertige Dokumentation","order.a2":"WhatsApp-Antwort am selben Tag","order.a3":"HALAL- & GMP-zertifizierte Anlage","order.a4":"Nicht zufrieden? Schreiben Sie uns einfach",
      "sticky.from":"Bereit, Ihren Tag aufzuladen?","sticky.sub":"Kostenloser Versand der ersten Box","sticky.cta":"Pläne ansehen",
      "order.subtag":"Mengenpreise · MOQ auf Anfrage bestätigt","order.howmany":"Wählen Sie Ihre Partnerstufe","order.spec1":"Sachets / Box","order.spec2":"botanische Inhaltsstoffe & Nährstoffe","order.spec3":"zugesetzter Zucker","order.spec4":"Minuten bis zur Wirkung",
      "order.p1sub":"Für Geschäfte, Apotheken & Fitnessstudios zum Testen des Abverkaufs","order.p2sub":"Für Wiederverkäufer & Importeure, die kartonweise kaufen","order.p3sub":"Exklusive Gebietsrechte & Marketingunterstützung","order.best":"BELIEBTESTE","order.freeship":"KOSTENLOSER VERSAND","order.cta":"Großhandelskonditionen anfragen","order.p3save":"Mehr sparen","order.poa":"Preis auf Anfrage","order.p1price":"Niedrige MOQ","order.p2price":"Bester Stückpreis","order.p3price":"Gebietsrechte",
      "sc.cap1.eyebrow":"Großhandel · Vertrieb · Eigenmarke","sc.cap1.line1":"Führen Sie die Marke,","sc.cap1.line2":"die sich verkauft.",
      "sc.cap2.line1":"Ein bewährtes Produkt.","sc.cap2.line2":"Margen, die Ihr Geschäft lieben wird.","sc.cap2.sub":"Ein zertifiziertes, exportfertiges Tongkat-Ali-Vitalitätsgetränk — Triple-Force-Formel, vollständige Dokumentation, zuverlässige Lieferung im großen Maßstab.",
      "sc.cap3.eyebrow":"HALAL · GMP · Hergestellt in Malaysia","sc.cap3.line1":"Bereit, Ihr","sc.cap3.line2":"Sortiment auszubauen?",
      "brand.h2a":"Universum der Kraft,","brand.h2b":"maximale Wirkung."
    }
  };

  var LANG_LABEL = {en:"EN", zh:"中文", ms:"BM", nl:"NL", de:"DE", pl:"PL"};
  var LANG_FULL = {en:"English", zh:"中文", ms:"Bahasa Melayu", nl:"Nederlands", de:"Deutsch", pl:"Polski"};
  var docLang = {en:"en", zh:"zh-Hans", ms:"ms", nl:"nl", de:"de", pl:"pl"};
  var currentLang = "en";

  /* store original english text on first run */
  function cacheOriginals() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.setAttribute("data-en", el.innerHTML);
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    var dict = I18N[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (lang === "en") { el.innerHTML = el.getAttribute("data-en"); }
      else if (dict[key] != null) { el.textContent = dict[key]; }
      else { el.innerHTML = el.getAttribute("data-en"); } /* fallback */
    });
    document.documentElement.setAttribute("lang", docLang[lang]);
    var ll = document.getElementById("langLabel"); if (ll) ll.textContent = LANG_LABEL[lang];
    var fl = document.getElementById("footLangLabel"); if (fl) fl.textContent = LANG_FULL[lang];
    document.querySelectorAll("#langMenu button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });
    renderFAQ(); renderReviews(); startRevTimer();
    try { localStorage.setItem("unimax_lang", lang); } catch (e) {}
  }

  /* ---------- Render references ---------- */
  function renderRefs() {
    var ol = document.getElementById("refList");
    if (!ol) return;
    ol.innerHTML = REFERENCES.map(function (r) {
      return '<li>' + r.t + ' <a href="' + r.u + '" target="_blank" rel="noopener nofollow">Link</a></li>';
    }).join("");
  }

  /* ---------- Render FAQ ---------- */
  var faqOpen = -1;
  function renderFAQ() {
    var list = document.getElementById("faqList");
    if (!list) return;
    list.innerHTML = FAQ.map(function (f, i) {
      var q = f.q[currentLang] || f.q.en;
      var a = f.a[currentLang] || f.a.en;
      return '<div class="fitem">' +
        '<button class="fq" aria-expanded="' + (faqOpen === i ? 'true' : 'false') + '" data-faq="' + i + '">' +
          '<span class="qt">' + q + '</span>' +
          '<span class="pm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg></span>' +
        '</button>' +
        '<div class="fa"><div class="fa-inner">' + a + '</div></div>' +
      '</div>';
    }).join("");
    list.querySelectorAll(".fq").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var i = +btn.getAttribute("data-faq");
        faqOpen = (faqOpen === i) ? -1 : i;
        list.querySelectorAll(".fitem").forEach(function (item, idx) {
          var b = item.querySelector(".fq");
          var panel = item.querySelector(".fa");
          var open = idx === faqOpen;
          b.setAttribute("aria-expanded", open ? "true" : "false");
          panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
        });
      });
    });
  }

  /* ---------- Render reviews (supports legacy + DB format) ---------- */
  function renderReviews(data) {
    if (data) REVIEWS = data;
    var track = document.getElementById("revTrack");
    if (!track) return;

    /* only show 4-5 star reviews */
    displayedReviews = REVIEWS.filter(function(rv) {
      return (rv.stars !== undefined ? rv.stars : 5) >= 4;
    });

    var myReviews = {};
    try { myReviews = JSON.parse(localStorage.getItem("unimax_my_reviews") || "{}"); } catch(e) {}
    var adminToken = null;
    try { adminToken = sessionStorage.getItem("unimax_rev_admin"); } catch(e) {}

    track.innerHTML = displayedReviews.map(function (rv) {
      /* normalise: legacy {n,r,q,photo,i} vs DB {name,role,quote,avatar_url,media_urls} */
      var isDB = rv.name !== undefined;
      var name  = isDB ? rv.name  : rv.n;
      var role  = isDB ? (rv.role || "") : (rv.r[currentLang] || rv.r.en);
      var quote = isDB ? rv.quote : (rv.q[currentLang] || rv.q.en);
      var photo = isDB ? rv.avatar_url : rv.photo;
      var init  = isDB ? (name.split(" ").map(function(p){return p[0];}).join("").slice(0,2).toUpperCase()) : rv.i;
      var media = isDB ? (rv.media_urls || []) : [];
      var rvId  = isDB ? rv.id : null;
      /* 优先使用用户自己的 token，管理员模式下对所有 DB 评论生效 */
      var token = (rvId && myReviews[rvId]) ? myReviews[rvId] : (adminToken && rvId ? adminToken : null);

      /* media gallery */
      var mediaHtml = "";
      if (media.length > 0) {
        var cls = "review-media review-media--" + Math.min(media.length, 3);
        mediaHtml = '<div class="' + cls + '" data-media>' +
          media.slice(0, 3).map(function(url, idx) {
            return '<img class="rm-img" src="' + url + '" alt="Review photo ' + (idx+1) + '" loading="lazy" />';
          }).join("") +
        '</div>';
      }

      /* star count */
      var starCount = isDB ? (rv.stars || 5) : 5;
      var starsHtml = "";
      for (var i = 0; i < 5; i++) {
        starsHtml += '<svg viewBox="0 0 24 24" fill="' + (i < starCount ? "currentColor" : "none") + '" stroke="currentColor" stroke-width="1.5"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.8 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg>';
      }

      var avInner = photo ? '<img src="' + photo + '" alt="' + name + '" />' : init;
      var avClass = photo ? "av av-photo" : "av";

      /* owner action buttons — always-visible ⋯ toggle + click-open dropdown */
      var ownerHtml = token ? (
        '<div class="rev-owner-wrap" data-id="' + rvId + '" data-tok="' + token + '">' +
          '<button type="button" class="rev-owner-toggle" aria-label="Review options">⋯</button>' +
          '<div class="rev-actions">' +
            '<button type="button" class="rev-act-btn rev-act-edit">Edit</button>' +
            '<button type="button" class="rev-act-btn rev-act-delete">Delete</button>' +
          '</div>' +
        '</div>'
      ) : '';

      return '<article class="review" data-rv-id="' + (rvId || '') + '">' +
        ownerHtml +
        mediaHtml +
        '<div class="stars">' + starsHtml + '</div>' +
        '<blockquote>"' + quote + '"</blockquote>' +
        '<div class="who">' +
          '<span class="' + avClass + '">' + avInner + '</span>' +
          '<span class="who-text"><span class="nm">' + name + '</span><span class="rl">' + role + '</span></span>' +
        '</div>' +
      '</article>';
    }).join("");

    /* lightbox for media images */
    track.querySelectorAll("[data-media] .rm-img").forEach(function(img) {
      img.addEventListener("click", function() {
        var lb = document.getElementById("lightbox");
        document.getElementById("lbImg").src = img.src;
        document.getElementById("lbImg").alt = img.alt;
        document.getElementById("lbCap").textContent = "";
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
      });
    });

    revIndex = 0; updateRev(); buildRevDots();
  }

  /* ---------- Reviews carousel ---------- */
  var revIndex = 0;
  var displayedReviews = [];
  function perView() { return window.innerWidth <= 760 ? 1 : (window.innerWidth <= 1024 ? 2 : 3); }
  function maxIndex() { return Math.max(0, displayedReviews.length - perView()); }
  function updateRev() {
    var track = document.getElementById("revTrack");
    if (!track) return;
    if (revIndex > maxIndex()) revIndex = maxIndex();
    var card = track.querySelector(".review");
    var gap = 18;
    var w = card ? card.getBoundingClientRect().width + gap : 0;
    track.style.transform = "translateX(" + (-revIndex * w) + "px)";
    var prev = document.getElementById("revPrev"), next = document.getElementById("revNext");
    if (prev) prev.disabled = revIndex <= 0;
    if (next) next.disabled = revIndex >= maxIndex();
    updateRevDots();
  }

  /* ---------- Reviews timer + dots ---------- */
  var revTimer = null;
  function revAutoAdvance() {
    revIndex = revIndex >= maxIndex() ? 0 : revIndex + 1;
    updateRev();
  }
  function startRevTimer() {
    clearInterval(revTimer);
    revTimer = setInterval(revAutoAdvance, 3000);
  }
  function resetRevTimer() { startRevTimer(); }
  function updateRevDots() {
    document.querySelectorAll("[data-rev-dot]").forEach(function (d) {
      var shouldBeActive = +d.getAttribute("data-rev-dot") === revIndex;
      if (shouldBeActive) {
        if (d.classList.contains("active")) {
          d.classList.remove("active");
          void d.getBoundingClientRect();
        }
        d.classList.add("active");
      } else {
        d.classList.remove("active");
      }
    });
  }
  function buildRevDots() {
    var container = document.getElementById("revDots");
    if (!container) return;
    var pages = maxIndex() + 1;
    container.innerHTML = "";
    for (var i = 0; i < pages; i++) {
      var d = document.createElement("button");
      d.className = "rev-dot" + (i === revIndex ? " active" : "");
      d.setAttribute("aria-label", "Reviews page " + (i + 1));
      d.setAttribute("data-rev-dot", String(i));
      container.appendChild(d);
    }
    container.querySelectorAll("[data-rev-dot]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        revIndex = +btn.getAttribute("data-rev-dot");
        updateRev();
        resetRevTimer();
      });
    });
  }

  /* ---------- Lightbox ---------- */
  function openLightbox(cert, name) {
    var lb = document.getElementById("lightbox");
    document.getElementById("lbImg").src = "assets/cert-" + cert + ".webp";
    document.getElementById("lbImg").alt = name + " certificate";
    document.getElementById("lbCap").textContent = name;
    lb.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    document.getElementById("lightbox").classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- Fetch approved reviews from Cloudflare D1 ---------- */
  function fetchApprovedReviews() {
    fetch("/api/reviews")
      .then(function(r){ return r.json(); })
      .then(function(data){
        if (data.success && data.reviews && data.reviews.length > 0) {
          renderReviews(data.reviews);
        }
      })
      .catch(function(){
        /* silently keep hardcoded reviews on fetch failure */
      });
  }

  /* ---------- Review Modal ---------- */
  var selectedStars = 0;
  var mediaFiles = [];
  var avatarFile = null;
  var editingId = null;
  var editingToken = null;

  function openReviewModal() {
    var modal = document.getElementById("reviewModal");
    if (!modal) return;
    editingId = null; editingToken = null;
    var h3 = modal.querySelector(".rm-header h3");
    if (h3) h3.textContent = "Share Your Experience";
    var submitTxt = document.getElementById("rmSubmitText");
    if (submitTxt) submitTxt.textContent = "Submit Review";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    resetForm();
  }

  function openEditModal(id, token, rv) {
    var modal = document.getElementById("reviewModal");
    if (!modal) return;
    editingId = id; editingToken = token;
    var h3 = modal.querySelector(".rm-header h3");
    if (h3) h3.textContent = "Edit Your Review";
    var submitTxt = document.getElementById("rmSubmitText");
    if (submitTxt) submitTxt.textContent = "Save Changes";
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    resetForm();
    /* pre-fill fields */
    var starCount = rv.stars || 5;
    selectedStars = starCount;
    document.querySelectorAll(".star-picker button").forEach(function(b) {
      b.classList.toggle("active", +b.getAttribute("data-star") <= starCount);
    });
    var nameEl = document.getElementById("reviewName");
    var roleEl = document.getElementById("reviewRole");
    var quoteEl = document.getElementById("reviewQuote");
    if (nameEl) nameEl.value = rv.name || "";
    if (roleEl) roleEl.value = rv.role || "";
    if (quoteEl) {
      quoteEl.value = rv.quote || "";
      var qCount = document.getElementById("quoteCount");
      if (qCount) qCount.textContent = quoteEl.value.length;
    }
  }

  function closeReviewModal() {
    var modal = document.getElementById("reviewModal");
    if (!modal) return;
    editingId = null; editingToken = null;
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function showDeleteConfirm(id, token, card) {
    var existing = card.querySelector(".rev-delete-confirm");
    if (existing) { existing.remove(); return; }
    var overlay = document.createElement("div");
    overlay.className = "rev-delete-confirm";
    overlay.innerHTML =
      '<p class="rdc-msg">Delete this review?</p>' +
      '<div class="rdc-btns">' +
        '<button type="button" class="rdc-cancel">Cancel</button>' +
        '<button type="button" class="rdc-confirm">Delete</button>' +
      '</div>';
    overlay.querySelector(".rdc-cancel").addEventListener("click", function() { overlay.remove(); });
    overlay.querySelector(".rdc-confirm").addEventListener("click", function() {
      overlay.innerHTML = '<p class="rdc-msg" style="color:var(--ink-muted)">Deleting…</p>';
      fetch("/api/reviews/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edit_token: token })
      })
      .then(function(r){ return r.json(); })
      .then(function(res){
        if (res.success) {
          /* remove from localStorage */
          var myReviews = {};
          try { myReviews = JSON.parse(localStorage.getItem("unimax_my_reviews") || "{}"); } catch(e) {}
          delete myReviews[id];
          try { localStorage.setItem("unimax_my_reviews", JSON.stringify(myReviews)); } catch(e) {}
          /* remove from REVIEWS and re-render */
          REVIEWS = REVIEWS.filter(function(rv){ return rv.id !== id; });
          renderReviews();
          startRevTimer();
        } else {
          overlay.innerHTML = '<p class="rdc-msg" style="color:#e53e3e">Failed: ' + (res.error || 'error') + '</p>';
          setTimeout(function(){ overlay.remove(); }, 2500);
        }
      })
      .catch(function(){ overlay.remove(); });
    });
    card.appendChild(overlay);
  }
  function resetForm() {
    selectedStars = 0; mediaFiles = []; avatarFile = null;
    var form = document.getElementById("reviewForm");
    var success = document.getElementById("rmSuccess");
    if (form) { form.reset(); form.style.display = ""; }
    if (success) success.style.display = "none";
    document.querySelectorAll(".star-picker button").forEach(function(b){ b.classList.remove("active"); });
    var preview = document.getElementById("uploadPreview");
    if (preview) preview.innerHTML = "";
    var avPrev = document.getElementById("avatarPreview");
    if (avPrev) avPrev.innerHTML = "";
    var qCount = document.getElementById("quoteCount");
    if (qCount) qCount.textContent = "0";
    var err = document.getElementById("rmError");
    if (err) err.textContent = "";
  }

  async function uploadFile(file) {
    var fd = new FormData();
    fd.append("file", file);
    var r = await fetch("/api/upload", { method: "POST", body: fd });
    var data = await r.json();
    if (!data.success) throw new Error(data.error || "Upload failed");
    return data.url;
  }

  async function submitReview(e) {
    e.preventDefault();
    var name  = (document.getElementById("reviewName").value || "").trim();
    var role  = (document.getElementById("reviewRole").value || "").trim();
    var quote = (document.getElementById("reviewQuote").value || "").trim();
    var err   = document.getElementById("rmError");

    err.textContent = "";
    if (!selectedStars) { err.textContent = "Please select a star rating."; return; }
    if (!name)          { err.textContent = "Please enter your name."; return; }
    if (!quote)         { err.textContent = "Please write your review."; return; }

    var btn = document.getElementById("rmSubmit");
    var txt = document.getElementById("rmSubmitText");
    var spin = document.getElementById("rmSubmitSpinner");
    btn.disabled = true;
    if (txt) txt.style.display = "none";
    if (spin) spin.style.display = "";

    try {
      /* upload media images */
      var mediaUrls = [];
      for (var i = 0; i < mediaFiles.length; i++) {
        var url = await uploadFile(mediaFiles[i]);
        mediaUrls.push(url);
      }
      /* upload avatar */
      var avatarUrl = "";
      if (avatarFile) avatarUrl = await uploadFile(avatarFile);

      /* submit or update review */
      var resp;
      if (editingId && editingToken) {
        resp = await fetch("/api/reviews/" + editingId, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            edit_token: editingToken,
            quote: quote, role: role, stars: selectedStars
          })
        });
      } else {
        resp = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name, role: role, quote: quote,
            stars: selectedStars, media_urls: mediaUrls,
            avatar_url: avatarUrl, lang: currentLang
          })
        });
      }
      var result = await resp.json();
      if (!result.success) throw new Error(result.error || "Submission failed");

      /* store edit token in localStorage */
      if (result.id && result.edit_token) {
        var myReviews = {};
        try { myReviews = JSON.parse(localStorage.getItem("unimax_my_reviews") || "{}"); } catch(e) {}
        myReviews[result.id] = result.edit_token;
        try { localStorage.setItem("unimax_my_reviews", JSON.stringify(myReviews)); } catch(e) {}
      }

      /* show success */
      var form = document.getElementById("reviewForm");
      var success = document.getElementById("rmSuccess");
      if (form) form.style.display = "none";
      if (success) success.style.display = "";
      setTimeout(function() { closeReviewModal(); fetchApprovedReviews(); }, 3500);
    } catch(ex) {
      err.textContent = ex.message || "Something went wrong. Please try again.";
    } finally {
      btn.disabled = false;
      if (txt) txt.style.display = "";
      if (spin) spin.style.display = "none";
    }
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    cacheOriginals();
    renderRefs();
    renderFAQ();
    renderReviews();
    fetchApprovedReviews();

    /* -- Review track: owner action delegation -- */
    var revTrack = document.getElementById("revTrack");
    if (revTrack) {
      revTrack.addEventListener("click", function(e) {
        /* toggle ⋯ dropdown */
        var toggleBtn = e.target.closest(".rev-owner-toggle");
        if (toggleBtn) {
          e.stopPropagation();
          var wrap = toggleBtn.closest(".rev-owner-wrap");
          var actions = wrap ? wrap.querySelector(".rev-actions") : null;
          if (!actions) return;
          var isOpen = actions.classList.contains("open");
          /* close all open dropdowns first */
          document.querySelectorAll(".rev-actions.open").forEach(function(a) { a.classList.remove("open"); });
          if (!isOpen) actions.classList.add("open");
          return;
        }

        /* edit / delete buttons */
        var editBtn = e.target.closest(".rev-act-edit");
        var delBtn  = e.target.closest(".rev-act-delete");
        if (!editBtn && !delBtn) return;
        var wrap = (editBtn || delBtn).closest(".rev-owner-wrap");
        var card = wrap ? wrap.closest(".review") : null;
        if (!wrap || !card) return;
        var id    = wrap.getAttribute("data-id");
        var token = wrap.getAttribute("data-tok");
        /* close dropdown */
        var actions = wrap.querySelector(".rev-actions");
        if (actions) actions.classList.remove("open");
        if (editBtn) {
          var rv = displayedReviews.find(function(r){ return r.id === id; });
          if (rv) openEditModal(id, token, rv);
        } else {
          showDeleteConfirm(id, token, card);
        }
      });
    }

    /* close dropdowns when clicking outside the track */
    document.addEventListener("click", function(e) {
      if (!e.target.closest(".rev-owner-wrap")) {
        document.querySelectorAll(".rev-actions.open").forEach(function(a) { a.classList.remove("open"); });
      }
    });

    /* -- Review modal wiring -- */
    var writeBtn = document.getElementById("revWriteBtn");
    if (writeBtn) writeBtn.addEventListener("click", openReviewModal);

    var rmClose = document.getElementById("rmClose");
    if (rmClose) rmClose.addEventListener("click", closeReviewModal);

    var reviewModal = document.getElementById("reviewModal");
    if (reviewModal) {
      reviewModal.addEventListener("click", function(e) {
        if (e.target === reviewModal) closeReviewModal();
      });
    }

    /* star picker */
    document.querySelectorAll(".star-picker button").forEach(function(btn) {
      btn.addEventListener("click", function() {
        selectedStars = +btn.getAttribute("data-star");
        document.querySelectorAll(".star-picker button").forEach(function(b) {
          b.classList.toggle("active", +b.getAttribute("data-star") <= selectedStars);
        });
      });
    });

    /* char counter */
    var quoteArea = document.getElementById("reviewQuote");
    if (quoteArea) {
      quoteArea.addEventListener("input", function() {
        var el = document.getElementById("quoteCount");
        if (el) el.textContent = quoteArea.value.length;
      });
    }

    /* media file input */
    var mediaInput = document.getElementById("reviewMedia");
    if (mediaInput) {
      mediaInput.addEventListener("change", function() {
        mediaFiles = [];
        var preview = document.getElementById("uploadPreview");
        if (preview) preview.innerHTML = "";
        var files = Array.from(mediaInput.files).slice(0, 3);
        files.forEach(function(f) {
          if (f.size > 5 * 1024 * 1024) { alert("File too large: " + f.name + " (max 5MB)"); return; }
          mediaFiles.push(f);
          var reader = new FileReader();
          reader.onload = function(ev) {
            var wrap = document.createElement("div");
            wrap.className = "preview-item";
            var img = document.createElement("img");
            img.src = ev.target.result;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "preview-remove";
            btn.innerHTML = "×";
            btn.setAttribute("aria-label", "Remove photo");
            btn.addEventListener("click", function() {
              var i = mediaFiles.indexOf(f);
              if (i > -1) mediaFiles.splice(i, 1);
              wrap.remove();
            });
            wrap.appendChild(img);
            wrap.appendChild(btn);
            if (preview) preview.appendChild(wrap);
          };
          reader.readAsDataURL(f);
        });
      });
    }

    /* avatar file input */
    var avatarInput = document.getElementById("reviewAvatar");
    if (avatarInput) {
      avatarInput.addEventListener("change", function() {
        var f = avatarInput.files[0];
        if (!f) return;
        if (f.size > 5 * 1024 * 1024) { alert("File too large (max 5MB)"); return; }
        avatarFile = f;
        var reader = new FileReader();
        reader.onload = function(ev) {
          var avPrev = document.getElementById("avatarPreview");
          if (avPrev) {
            avPrev.innerHTML = "";
            var img = document.createElement("img");
            img.src = ev.target.result;
            var btn = document.createElement("button");
            btn.type = "button";
            btn.className = "preview-remove";
            btn.innerHTML = "×";
            btn.setAttribute("aria-label", "Remove profile photo");
            btn.addEventListener("click", function() {
              avatarFile = null;
              avPrev.innerHTML = "";
              avatarInput.value = "";
            });
            avPrev.appendChild(img);
            avPrev.appendChild(btn);
          }
        };
        reader.readAsDataURL(f);
      });
    }

    /* form submit */
    var form = document.getElementById("reviewForm");
    if (form) form.addEventListener("submit", submitReview);

    var saved = null;
    try { saved = localStorage.getItem("unimax_lang"); } catch (e) {}
    if (saved && I18N[saved] !== undefined || saved === "en") applyLang(saved);
    else applyLang("en");

    /* header scrolled + sticky mobile CTA */
    var header = document.getElementById("header");
    var stickyCta = document.getElementById("stickyCta");
    function onScroll() {
      var y = window.scrollY;
      header.classList.toggle("scrolled", y > 8);
      if (stickyCta) {
        var triggerEl = document.querySelector(".scroll-cinema") || document.querySelector(".hero");
        var pastHero = triggerEl ? triggerEl.getBoundingClientRect().bottom < 80 : y > 500;
        var orderEl = document.getElementById("order");
        var nearOrder = false;
        if (orderEl) { var r = orderEl.getBoundingClientRect(); nearOrder = r.top < window.innerHeight * 0.9 && r.bottom > 0; }
        stickyCta.classList.toggle("show", pastHero && !nearOrder);
      }
    }
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    /* language menu */
    var langBtn = document.getElementById("langBtn"), langMenu = document.getElementById("langMenu");
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = langMenu.classList.toggle("open");
      langBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function () { langMenu.classList.remove("open"); langBtn.setAttribute("aria-expanded", "false"); });
    langMenu.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); langMenu.classList.remove("open"); });
    });
    /* footer lang cycles */
    var footBtn = document.getElementById("footLangBtn");
    if (footBtn) footBtn.addEventListener("click", function () {
      var order = ["en", "zh", "ms", "nl", "de", "pl"]; applyLang(order[(order.indexOf(currentLang) + 1) % 6]);
    });
    document.querySelectorAll("[data-drawer-lang]").forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-drawer-lang")); });
    });

    /* mobile drawer */
    var drawer = document.getElementById("drawer"), navToggle = document.getElementById("navToggle");
    navToggle.addEventListener("click", function () { drawer.classList.add("open"); document.body.style.overflow = "hidden"; });
    drawer.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", function () { drawer.classList.remove("open"); document.body.style.overflow = ""; });
    });

    /* references toggle */
    var refToggle = document.getElementById("refToggle"), refPanel = document.getElementById("refPanel");
    refToggle.addEventListener("click", function () {
      var open = refToggle.getAttribute("aria-expanded") === "true";
      refToggle.setAttribute("aria-expanded", open ? "false" : "true");
      refPanel.classList.toggle("open", !open);
    });

    /* reviews controls */
    var rp = document.getElementById("revPrev"), rn = document.getElementById("revNext");

    if (rp) rp.addEventListener("click", function () { revIndex = Math.max(0, revIndex - 1); updateRev(); resetRevTimer(); });
    if (rn) rn.addEventListener("click", function () { revIndex = Math.min(maxIndex(), revIndex + 1); updateRev(); resetRevTimer(); });
    window.addEventListener("resize", function () { updateRev(); buildRevDots(); });

    /* pause on hover */
    var revWrap = document.querySelector(".rev-track-wrap");
    if (revWrap) {
      revWrap.addEventListener("mouseenter", function () { clearInterval(revTimer); });
      revWrap.addEventListener("mouseleave", function () { startRevTimer(); });
    }

    startRevTimer();

    /* B2B partnership enquiry — prefilled WhatsApp message (per client brief) */
    var TIER_LABELS = { retail: "Retail Stockist", wholesale: "Wholesale Partner", distributor: "Regional Distributor" };
    function b2bMessage(tier) {
      var interested = tier
        ? "Interested in: " + TIER_LABELS[tier]
        : "Interested in: Retail Stockist / Wholesale Partner / Regional Distributor";
      return "Hi, I'm interested in UNI MAX B2B partnership in Europe."
        + "\n\nCountry:\nBusiness type:\nEstimated order quantity:\n" + interested
        + "\n\nPlease share more information about wholesale pricing, MOQ, and partnership opportunities.";
    }
    function waUrl(tier) { return "https://wa.me/60102005803?text=" + encodeURIComponent(b2bMessage(tier)); }

    /* partnership level selector */
    var packEls = document.querySelectorAll('#packs input[name="pack"]');
    var orderCta = document.getElementById("orderCta");
    function syncPacks() {
      packEls.forEach(function (inp) { inp.closest(".pack").classList.toggle("selected", inp.checked); });
      var sel = document.querySelector('#packs input[name="pack"]:checked');
      if (sel && orderCta) orderCta.href = waUrl(sel.value);
    }
    packEls.forEach(function (inp) { inp.addEventListener("change", syncPacks); });
    syncPacks();

    /* order product gallery — swipe + thumbnails */
    var gallery = document.getElementById("orderGallery");
    var thumbsWrap = document.getElementById("orderThumbs");
    if (gallery && thumbsWrap) {
      var gimgs = gallery.querySelectorAll("img");
      gimgs.forEach(function (im, i) {
        var b = document.createElement("button");
        b.className = "order-thumb" + (i === 0 ? " active" : "");
        b.setAttribute("aria-label", "View product image " + (i + 1));
        var t = document.createElement("img");
        t.src = im.getAttribute("src"); t.alt = ""; t.loading = "lazy";
        b.appendChild(t);
        b.addEventListener("click", function () {
          gallery.scrollTo({ left: gallery.clientWidth * i, behavior: "smooth" });
        });
        thumbsWrap.appendChild(b);
      });
      var tbtns = thumbsWrap.querySelectorAll(".order-thumb");
      var gtick = false;
      gallery.addEventListener("scroll", function () {
        if (gtick) return;
        gtick = true;
        requestAnimationFrame(function () {
          gtick = false;
          var idx = Math.round(gallery.scrollLeft / gallery.clientWidth);
          tbtns.forEach(function (d, i) { d.classList.toggle("active", i === idx); });
        });
      }, { passive: true });
    }

    /* certificates lightbox */
    document.querySelectorAll(".badge").forEach(function (b) {
      b.addEventListener("click", function () { openLightbox(b.getAttribute("data-cert"), b.getAttribute("data-name")); });
    });
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lightbox").addEventListener("click", function (e) { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

    /* scroll reveal */
    var reveals = document.querySelectorAll(".reveal:not(.in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }

    /* count-up stats */
    function countUp(el) {
      var target = +el.getAttribute("data-count");
      var suffix = el.getAttribute("data-suffix") || "";
      if (!target) return;
      var dur = 1100, start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(eased * target);
        if (p >= 1 && suffix) {
          el.innerHTML = val + '<span class="u">' + suffix + '</span>';
        } else {
          el.textContent = val;
        }
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
    var counted = false;
    var countEls = document.querySelectorAll("[data-count]");
    if (countEls.length && "IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !counted) {
            counted = true;
            countEls.forEach(countUp);
          }
        });
      }, { threshold: 0.5 });
      cio.observe(countEls[0]);
    }

    /* ingredient scroll-active highlight — lights the card nearest the viewport centre,
       only once a card is actually near the middle (never pre-lit at the screen edge) */
    var ings = [].slice.call(document.querySelectorAll("#ingList .ing"));
    if (ings.length) {
      var reduceIng = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceIng) { ings.forEach(function (i) { i.classList.add("active"); }); }
      else {
        var ticking = false;
        function updateIng() {
          ticking = false;
          var vh = window.innerHeight, center = vh / 2;
          var best = -1, bestDist = Infinity;
          for (var k = 0; k < ings.length; k++) {
            var r = ings[k].getBoundingClientRect();
            if (r.bottom > 0 && r.top < vh) {
              var c = (r.top + r.bottom) / 2;
              var d = Math.abs(c - center);
              if (d < bestDist) { bestDist = d; best = k; }
            }
          }
          /* only switch the highlight on once the nearest card is within 32% of the centre */
          if (best >= 0 && bestDist < vh * 0.32) {
            for (var j = 0; j < ings.length; j++) ings[j].classList.toggle("active", j === best);
          }
        }
        function onScrollIng() { if (!ticking) { ticking = true; requestAnimationFrame(updateIng); } }
        window.addEventListener("scroll", onScrollIng, { passive: true });
        window.addEventListener("resize", onScrollIng);
        updateIng();
      }
    }

    /* hero subtle parallax on pointer (desktop only) */
    var stage = document.querySelector(".hero-stage");
    if (stage && window.matchMedia("(min-width:1025px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.transition = "transform .25s ease-out";
      stage.addEventListener("pointermove", function (e) {
        var r = stage.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) / r.width;
        var dy = (e.clientY - r.top - r.height / 2) / r.height;
        stage.style.transform = "translate(" + (dx * 12) + "px," + (dy * 12) + "px)";
      });
      stage.addEventListener("pointerleave", function () { stage.style.transform = ""; });
    }

    /* smooth-scroll offset for sticky header on anchor click handled by CSS scroll-margin */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length > 1) {
          var t = document.querySelector(id);
          if (t) { e.preventDefault(); var y = t.getBoundingClientRect().top + window.scrollY - 76; window.scrollTo({ top: y, behavior: "smooth" }); }
        }
      });
    });

    /* ---- conversion event hooks → dataLayer (GTM maps these to GA4 events at 2C) ---- */
    window.dataLayer = window.dataLayer || [];
    function track(event, params) { try { window.dataLayer.push(Object.assign({ event: event }, params || {})); } catch (e) {} }
    function ctaLoc(el) {
      if (el.closest(".sticky-cta")) return "sticky";
      if (el.closest(".header")) return "nav";
      if (el.closest(".drawer")) return "drawer";
      if (el.closest(".footer")) return "footer";
      var s = el.closest("section"); return (s && s.id) ? s.id : "other";
    }
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
      /* prefill the B2B enquiry on every WhatsApp CTA (orderCta sets its own tier-specific text) */
      if (a.id !== "orderCta" && a.href.indexOf("text=") === -1) a.href = waUrl(null);
      a.addEventListener("click", function () {
        track("whatsapp_click", { cta_location: ctaLoc(a), link_url: a.href });
      });
    });
    document.querySelectorAll('#packs input[name="pack"]').forEach(function (inp) {
      inp.addEventListener("change", function () { if (inp.checked) track("select_pack", { pack: inp.value }); });
    });

    /* ---- Scroll Cinema: scrub video currentTime to scroll position ---- */
    (function () {
      var cinema = document.getElementById("scroll-cinema");
      var vid    = document.getElementById("scVideo");
      var bar    = document.getElementById("scBar");
      var hint   = document.getElementById("scHint");
      if (!cinema || !vid) return;

      var caps    = [].slice.call(cinema.querySelectorAll(".sc-caption"));
      var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        vid.autoplay = true; vid.loop = true;
        caps[0] && caps[0].classList.add("sc-active");
        return;
      }

      vid.load();

      /* non-uniform caption thresholds — longer dwell per scene */
      var LO = [0,    0.26, 0.62];
      var HI = [0.26, 0.62, 1.01];

      /* lerp scrub state — smooths seeking jank */
      var LERP    = 0.30;
      var targetP = 0;
      var drawP   = 0;
      var rafId   = null;

      function calcP() {
        var rect  = cinema.getBoundingClientRect();
        var viewH = window.innerHeight;
        var total = cinema.offsetHeight - viewH;
        var gone  = -rect.top;
        if (gone < -viewH || gone > total + viewH) return -1;
        return Math.max(0, Math.min(1, gone / total));
      }

      function applyFrame(p) {
        if (vid.readyState >= 1 && isFinite(vid.duration) && vid.duration > 0) {
          vid.currentTime = p * vid.duration;
        }
        if (bar) bar.style.width = (p * 100) + "%";
        if (hint) hint.classList.toggle("sc-hidden", p > 0.04);
        caps.forEach(function (cap, i) {
          cap.classList.toggle("sc-active", p >= LO[i] && p < HI[i]);
        });
      }

      function scrubFrame() {
        var diff = targetP - drawP;
        if (Math.abs(diff) < 0.0003) {
          drawP = targetP; applyFrame(drawP); rafId = null; return;
        }
        drawP += diff * LERP;
        applyFrame(drawP);
        rafId = requestAnimationFrame(scrubFrame);
      }

      function scheduleRaf() {
        if (!rafId) rafId = requestAnimationFrame(scrubFrame);
      }

      window.addEventListener("scroll", function () {
        var p = calcP();
        if (p < 0) return;
        targetP = p; scheduleRaf();
      }, { passive: true });

      window.addEventListener("resize", function () {
        var p = calcP();
        if (p >= 0) { targetP = p; drawP = p; applyFrame(p); }
      });

      /* initial render */
      (function () {
        var p = calcP();
        if (p >= 0) { targetP = p; drawP = p; applyFrame(p); }
        else { applyFrame(0); }
      })();
    })();

  });
})();
