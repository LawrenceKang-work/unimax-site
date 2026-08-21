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

  /* ---------- DATA: FAQ (compliant, structure-function) ---------- */
  var FAQ = [
    {q:{en:"What is the minimum order quantity?",zh:"最低起订量是多少？",ms:"Apakah kuantiti pesanan minimum?",nl:"Wat is de minimale afnamehoeveelheid?",de:"Wie hoch ist die Mindestbestellmenge?",pl:"Jaka jest minimalna wielkość zamówienia?"},
     a:{en:"Suggested starting points are 12–24 boxes for a Retail Stockist, 50–100 boxes for a Wholesale Partner and 300+ boxes for a Regional Distributor. These are suggested MOQs — the actual quantity is confirmed on enquiry.",
        zh:"建议起点为：零售代销商 12–24 盒，批发合作伙伴 50–100 盒，区域总代理 300 盒以上。这些是建议起订量 —— 实际数量以洽询确认为准。",
        ms:"Titik permulaan yang dicadangkan ialah 12–24 kotak untuk Penjual Runcit, 50–100 kotak untuk Rakan Borong dan 300+ kotak untuk Pengedar Serantau. Ini ialah MOQ cadangan — kuantiti sebenar disahkan semasa pertanyaan.",
        nl:"Richtwaarden zijn 12–24 dozen voor een Retail Stockist, 50–100 dozen voor een Wholesale Partner en 300+ dozen voor een Regional Distributor. Dit zijn geadviseerde MOQ's — de werkelijke hoeveelheid wordt bij aanvraag bevestigd.",
        de:"Empfohlene Einstiegsmengen sind 12–24 Kartons für einen Retail Stockist, 50–100 Kartons für einen Wholesale Partner und 300+ Kartons für einen Regional Distributor. Das sind Richtwerte — die tatsächliche Menge wird bei Anfrage bestätigt.",
        pl:"Sugerowane progi to 12–24 opakowań dla Retail Stockist, 50–100 dla Wholesale Partner i 300+ dla Regional Distributor. To sugerowane MOQ — rzeczywista ilość jest potwierdzana przy zapytaniu."}},

    {q:{en:"How do I become a distributor?",zh:"如何成为分销商？",ms:"Bagaimana untuk menjadi pengedar?",nl:"Hoe word ik distributeur?",de:"Wie werde ich Vertriebspartner?",pl:"Jak zostać dystrybutorem?"},
     a:{en:"Send an enquiry over WhatsApp with your market, your channel and the volume you have in mind. We reply the same day, match you to a partnership level, then confirm quantity and terms directly.",
        zh:"通过 WhatsApp 发起询价，说明你的市场、渠道与预计采购量。我们当天回复，为你匹配合作分级，再直接确认数量与条款。",
        ms:"Hantar pertanyaan melalui WhatsApp dengan pasaran, saluran dan jumlah yang anda fikirkan. Kami membalas pada hari yang sama, memadankan anda dengan tahap kerjasama, kemudian mengesahkan kuantiti dan terma secara terus.",
        nl:"Stuur een aanvraag via WhatsApp met je markt, je kanaal en de beoogde hoeveelheid. We reageren dezelfde dag, koppelen je aan een partnerniveau en bevestigen daarna rechtstreeks hoeveelheid en voorwaarden.",
        de:"Senden Sie eine Anfrage über WhatsApp mit Ihrem Markt, Ihrem Kanal und der angedachten Menge. Wir antworten am selben Tag, ordnen Sie einer Partnerstufe zu und bestätigen anschließend Menge und Konditionen direkt.",
        pl:"Wyślij zapytanie przez WhatsApp, podając swój rynek, kanał sprzedaży i planowaną ilość. Odpowiadamy tego samego dnia, dopasowujemy poziom współpracy, a następnie bezpośrednio potwierdzamy ilość i warunki."}},

    {q:{en:"Do you offer exclusive territories?",zh:"是否提供独家代理区域？",ms:"Adakah anda menawarkan wilayah eksklusif?",nl:"Bieden jullie exclusieve territoria aan?",de:"Bieten Sie exklusive Gebiete an?",pl:"Czy oferujecie wyłączność terytorialną?"},
     a:{en:"Territory arrangements are discussed case by case at Regional Distributor level. Send an enquiry with your market and intended volume and we will confirm what is available.",
        zh:"区域安排在区域总代理层级逐案商谈。请在询价时说明你的市场与预计采购量，我们会确认当前可洽谈的区域。",
        ms:"Pengaturan wilayah dibincangkan kes demi kes pada peringkat Pengedar Serantau. Hantar pertanyaan dengan pasaran dan jumlah yang dihasratkan, dan kami akan sahkan apa yang tersedia.",
        nl:"Territoriumafspraken worden per geval besproken op Regional Distributor-niveau. Stuur een aanvraag met je markt en beoogde volume, dan bevestigen we wat beschikbaar is.",
        de:"Gebietsvereinbarungen werden auf Ebene des Regional Distributors im Einzelfall besprochen. Senden Sie eine Anfrage mit Ihrem Markt und der angedachten Menge, und wir bestätigen, was verfügbar ist.",
        pl:"Ustalenia terytorialne omawiamy indywidualnie na poziomie Regional Distributor. Wyślij zapytanie z rynkiem i planowaną ilością, a potwierdzimy dostępne opcje."}},

    {q:{en:"Can I request product samples?",zh:"可以索取产品样品吗？",ms:"Bolehkah saya meminta sampel produk?",nl:"Kan ik productmonsters aanvragen?",de:"Kann ich Produktmuster anfordern?",pl:"Czy mogę poprosić o próbki produktu?"},
     a:{en:"Sample requests are handled on enquiry. Message us with your business details and intended volume and we will confirm what can be arranged for your market.",
        zh:"样品需求以洽询方式处理。请告知你的公司信息与预计采购量，我们会确认可为你所在市场安排的方案。",
        ms:"Permintaan sampel diuruskan semasa pertanyaan. Mesej kami dengan butiran perniagaan dan jumlah yang dihasratkan, dan kami akan sahkan apa yang boleh diaturkan untuk pasaran anda.",
        nl:"Monsteraanvragen worden per aanvraag behandeld. Stuur ons je bedrijfsgegevens en beoogde volume, dan bevestigen we wat we voor jouw markt kunnen regelen.",
        de:"Musteranfragen werden im Rahmen der Anfrage bearbeitet. Senden Sie uns Ihre Firmendaten und die angedachte Menge, und wir bestätigen, was sich für Ihren Markt arrangieren lässt.",
        pl:"Prośby o próbki rozpatrujemy indywidualnie. Prześlij dane firmy i planowaną ilość, a potwierdzimy, co możemy zorganizować dla Twojego rynku."}},

    {q:{en:"Who manages European enquiries?",zh:"谁负责欧洲地区的洽询？",ms:"Siapa yang menguruskan pertanyaan Eropah?",nl:"Wie behandelt Europese aanvragen?",de:"Wer betreut europäische Anfragen?",pl:"Kto obsługuje zapytania z Europy?"},
     a:{en:"All European wholesale and distributor enquiries are managed by our authorised EU Distribution Lead based in the Netherlands, which means faster communication and regional support during onboarding.",
        zh:"所有欧洲批发与分销洽询，均由我们常驻荷兰的授权欧盟分销负责人统一处理，因此沟通更快，接入过程中也有本地化支持。",
        ms:"Semua pertanyaan borong dan pengedar Eropah diuruskan oleh Ketua Pengedaran EU kami yang diberi kuasa dan berpangkalan di Belanda, bermakna komunikasi lebih pantas dan sokongan serantau semasa proses penerimaan.",
        nl:"Alle Europese groothandel- en distributieaanvragen worden behandeld door onze geautoriseerde EU Distribution Lead in Nederland, wat zorgt voor snellere communicatie en regionale ondersteuning tijdens de onboarding.",
        de:"Alle europäischen Großhandels- und Vertriebsanfragen betreut unser autorisierter EU Distribution Lead mit Sitz in den Niederlanden — das bedeutet schnellere Kommunikation und regionale Unterstützung beim Onboarding.",
        pl:"Wszystkie europejskie zapytania hurtowe i dystrybucyjne obsługuje nasz autoryzowany Dyrektor ds. Dystrybucji UE z siedzibą w Holandii, co oznacza szybszą komunikację i wsparcie regionalne przy wdrożeniu."}},

    {q:{en:"Do you provide marketing materials?",zh:"你们提供营销物料吗？",ms:"Adakah anda menyediakan bahan pemasaran?",nl:"Leveren jullie marketingmateriaal?",de:"Stellen Sie Marketingmaterialien bereit?",pl:"Czy zapewniacie materiały marketingowe?"},
     a:{en:"Yes. Partners receive professional product and lifestyle photography, promotional assets and product information to use across their own channels.",
        zh:"提供。合作伙伴可获得专业的产品与场景摄影、推广素材以及产品资料，用于自有渠道。",
        ms:"Ya. Rakan kongsi menerima fotografi produk dan gaya hidup profesional, aset promosi serta maklumat produk untuk digunakan di saluran mereka sendiri.",
        nl:"Ja. Partners ontvangen professionele product- en lifestylefotografie, promotiemateriaal en productinformatie voor gebruik in hun eigen kanalen.",
        de:"Ja. Partner erhalten professionelle Produkt- und Lifestyle-Fotografie, Werbemittel und Produktinformationen für ihre eigenen Kanäle.",
        pl:"Tak. Partnerzy otrzymują profesjonalne zdjęcia produktowe i lifestyle’owe, materiały promocyjne oraz informacje o produkcie do wykorzystania we własnych kanałach."}},

    {q:{en:"What certifications does UNI MAX have?",zh:"UNI MAX 持有哪些认证？",ms:"Apakah pensijilan yang dimiliki UNI MAX?",nl:"Welke certificeringen heeft UNI MAX?",de:"Welche Zertifizierungen hat UNI MAX?",pl:"Jakie certyfikaty posiada UNI MAX?"},
     a:{en:"UNI MAX is manufactured in Malaysia in facilities certified for HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 and HACCP — the documentation set halal-import buyers and retail chains typically ask for.",
        zh:"UNI MAX 在马来西亚生产，工厂持有 HALAL（JAKIM）、GMP、MeSTI、ISO 9001:2015 与 HACCP 认证 —— 正是清真进口买家与零售连锁通常会索取的那套文件。",
        ms:"UNI MAX dihasilkan di Malaysia di kemudahan yang disahkan untuk HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 dan HACCP — set dokumentasi yang lazimnya diminta oleh pembeli import halal dan rangkaian peruncit.",
        nl:"UNI MAX wordt geproduceerd in Maleisië in faciliteiten met certificering voor HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 en HACCP — precies de documentatie waar halal-importeurs en retailketens doorgaans om vragen.",
        de:"UNI MAX wird in Malaysia in Anlagen hergestellt, die für HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 und HACCP zertifiziert sind — genau die Unterlagen, die Halal-Importeure und Handelsketten üblicherweise verlangen.",
        pl:"UNI MAX jest produkowany w Malezji w zakładach z certyfikatami HALAL (JAKIM), GMP, MeSTI, ISO 9001:2015 i HACCP — czyli dokładnie tym zestawem dokumentów, o który zwykle proszą importerzy halal i sieci handlowe."}},
  ];
  /* ---------- DATA: Reviews (sample placeholders) ---------- */
  var REVIEWS = [
    {n:"Arif R.",r:{en:"Marketing Manager, 38",zh:"市场经理，38岁",ms:"Pengurus Pemasaran, 38",nl:"Marketingmanager, 38",de:"Marketing-Manager, 38",pl:"Menedżer marketingu, 38 lat"},i:"AR",photo:"/assets/who-performers.webp",q:{en:"I usually take one sachet after lunch. It fits easily into my routine and helps me feel ready for evening training.",zh:"我通常在午餐后喝一包。它很容易融入我的日常，让我感觉晚间训练更有准备。",ms:"Saya biasanya ambil satu sachet selepas makan tengah hari. Ia mudah masuk dalam rutin saya dan membantu saya berasa lebih bersedia untuk latihan malam.",nl:"Ik neem meestal één sachet na de lunch. Het past gemakkelijk in mijn routine en helpt me klaar te voelen voor de avondtraining.",de:"Ich nehme normalerweise ein Sachet nach dem Mittagessen. Es fügt sich gut in meinen Alltag und hilft mir, mich fürs Abendtraining bereit zu fühlen.",pl:"Zwykle piję jedną saszetkę po lunchu. Łatwo wpasowuje się w moją rutynę i pomaga mi czuć się gotowym na wieczorny trening."}},
    {n:"Wei Ling",r:{en:"Café Owner, 34",zh:"咖啡馆店主，34岁",ms:"Pemilik Kafe, 34",nl:"Café-eigenaar, 34",de:"Café-Besitzerin, 34",pl:"Właścicielka kawiarni, 34 lata"},i:"WL",photo:"/assets/who-stressed.webp",q:{en:"I like that it's convenient, easy to carry, and not overly sweet. It works well for my busy days.",zh:"我喜欢它方便、易于携带，而且不会过甜。非常适合我繁忙的工作日。",ms:"Saya suka ia mudah, senang dibawa, dan tidak terlalu manis. Sangat sesuai untuk hari-hari sibuk saya.",nl:"Ik vind het fijn dat het handig is, makkelijk mee te nemen en niet te zoet. Werkt goed voor mijn drukke dagen.",de:"Ich mag, dass es praktisch, leicht mitzunehmen und nicht zu süß ist. Passt gut zu meinen geschäftigen Tagen.",pl:"Lubię, że jest wygodny, łatwy do noszenia i nie za słodki. Świetnie sprawdza się w moich pracowitych dniach."}},
    {n:"Daniel T.",r:{en:"Amateur Footballer, 29",zh:"业余足球员，29岁",ms:"Pemain Bola Amatur, 29",nl:"Amateursvoetballer, 29",de:"Amateurfußballer, 29",pl:"Amatorski piłkarz, 29 lat"},i:"DT",photo:"/assets/who-sports.webp",q:{en:"I use it on training days when I want something quick and refreshing. The lychee taste is genuinely good.",zh:"训练日我会喝一包，方便快捷又清爽。荔枝的味道真的很好。",ms:"Saya gunakannya pada hari latihan apabila saya mahu sesuatu yang cepat dan menyegarkan. Rasa laici memang sedap.",nl:"Ik gebruik het op trainingsdagen wanneer ik iets snels en verfrissends wil. De lychee-smaak is echt lekker.",de:"Ich nutze es an Trainingstagen, wenn ich etwas Schnelles und Erfrischendes möchte. Der Lychee-Geschmack ist wirklich gut.",pl:"Używam go w dni treningowe, gdy chcę czegoś szybkiego i orzeźwiającego. Smak liczi jest naprawdę dobry."}},
    {n:"Hafiz M.",r:{en:"Delivery Rider, 41",zh:"外卖骑手，41岁",ms:"Penghantar, 41",nl:"Bezorger, 41",de:"Kurier, 41",pl:"Kurier, 41 lat"},i:"HM",photo:"/assets/who-work.webp",q:{en:"Steady energy without the jittery crash I used to get from energy drinks.",zh:"能量平稳，不会再有以前能量饮料那种心慌后又疲惫的感觉。",ms:"Tenaga stabil tanpa rasa gementar dan jatuh seperti minuman tenaga lain.",nl:"Stabiele energie zonder de nervositeit en dip die ik vroeger van energiedrankjes kreeg.",de:"Gleichmäßige Energie ohne das nervöse Einbruch-Gefühl, das ich früher von Energydrinks kannte.",pl:"Stabilna energia bez nerwowości i spadku, który dostawałem od napojów energetycznych."}},
    {n:"Suresh K.",r:{en:"Engineer, 45",zh:"工程师，45岁",ms:"Jurutera, 45",nl:"Ingenieur, 45",de:"Ingenieur, 45",pl:"Inżynier, 45 lat"},i:"SK",photo:"/assets/who-men.webp",q:{en:"Convenient for travel — tear, drink, done. Focus at work has been noticeably sharper.",zh:"出差很方便——撕开就喝。工作时的专注力明显提升了。",ms:"Mudah untuk perjalanan — koyak, minum, siap. Fokus kerja jelas lebih tajam.",nl:"Handig voor reizen — openscheuren, drinken, klaar. De focus op het werk is merkbaar scherper geworden.",de:"Praktisch auf Reisen — aufreißen, trinken, fertig. Die Konzentration bei der Arbeit ist merklich schärfer geworden.",pl:"Wygodny w podróży — otwórz, wypij, gotowe. Skupienie w pracy jest wyraźnie lepsze."}},
    {n:"Mei Chen",r:{en:"Yoga Instructor, 36",zh:"瑜伽教练，36岁",ms:"Pengajar Yoga, 36",nl:"Yoga-instructeur, 36",de:"Yoga-Lehrerin, 36",pl:"Instruktorka jogi, 36 lat"},i:"MC",photo:"/assets/who-performers.webp",q:{en:"A calm, sustained kind of energy. It fits naturally into my morning routine.",zh:"一种平静而持久的能量，很自然地融入我的晨间习惯。",ms:"Tenaga yang tenang dan berpanjangan. Ia sesuai dengan rutin pagi saya.",nl:"Een rustige, aanhoudende energie. Het past van nature in mijn ochtendroutine.",de:"Eine ruhige, anhaltende Energie. Sie fügt sich ganz natürlich in meine Morgenroutine ein.",pl:"Spokojny, trwały rodzaj energii. Naturalnie wpisuje się w moją poranną rutynę."}}
  ];

  /* ---------- i18n dictionary (static data-i18n keys) ---------- */
    /* I18N 字典已移至 scripts/i18n-dict.js —— 语言按 URL 拆分后,页面文案在生成时烧录,
     运行时不再需要字典(applyLang 在有 __PAGE_LANG__ 时不执行)。此处保留空对象,
     使 applyLang 及其引用在任何意外调用下也不会抛错(会回退到 data-en 的英文原文)。
     改译文请改 scripts/i18n-dict.js 后重跑生成器。 */
  var I18N = {};

  var LANG_LABEL = {en:"EN", zh:"中文", ms:"BM", nl:"NL", de:"DE", pl:"PL"};
  var LANG_FULL = {en:"English", zh:"中文", ms:"Bahasa Melayu", nl:"Nederlands", de:"Deutsch", pl:"Polski"};
  var docLang = {en:"en", zh:"zh-Hans", ms:"ms", nl:"nl", de:"de", pl:"pl"};
  var LANG_HOME = {en:"/", zh:"/zh/", ms:"/ms/", nl:"/nl/", de:"/de/", pl:"/pl/"};
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
    document.getElementById("lbImg").src = "/assets/cert-" + cert + ".webp";
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
    /* 语言已按 URL 拆分后:页面文案在生成时就烧录好了,再跑 applyLang 会把它刷掉
       (非英文页会被字典覆盖,英文页会被 data-en 整页刷回)。此处只设定当前语言,
       并渲染那些由 JS 驱动、不在 HTML 里的区块(FAQ / 评论)。
       localStorage 的语言偏好在这套架构下不再决定显示什么 —— URL 才是权威。 */
    if (window.__PAGE_LANG__) {
      currentLang = window.__PAGE_LANG__;
      renderFAQ(); renderReviews(); startRevTimer();
    }
    else if (saved && I18N[saved] !== undefined || saved === "en") applyLang(saved);
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
      var order = ["en", "zh", "ms", "nl", "de", "pl"];
      var next = order[(order.indexOf(currentLang) + 1) % 6];
      /* 语言按 URL 拆分后,切换 = 跳转到该语言的页面,而不是就地改文案 */
      if (window.__PAGE_LANG__) { location.href = LANG_HOME[next] || "/"; return; }
      applyLang(next);
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

    /* Wholesale partnership enquiry — prefilled WhatsApp message (per client brief) */
    var TIER_LABELS = { retail: "Retail Stockist", wholesale: "Wholesale Partner", distributor: "Regional Distributor" };
    function b2bMessage(tier, loc) {
      var interested = tier
        ? "Interested in: " + TIER_LABELS[tier]
        : "Interested in: Retail Stockist / Wholesale Partner / Regional Distributor";
      var msg = "Hi, I'm interested in a UNI MAX wholesale partnership in Europe."
        + "\n\nCountry:\nBusiness type:\nEstimated order quantity:\n" + interested
        + "\n\nPlease share more information about wholesale pricing, MOQ, and partnership opportunities.";
      /* 归因(2026-08-21 补,seo-geo-standards 铁律「归因先于一切」):不同入口的开场白必须能分辨,
         不许全站共用一句——否则 Jack 从消息内容本身分不出顾客是从哪个入口点进来的。零删除,纯增补。 */
      if (loc) msg += "\n\n(Sent from: " + loc + ")";
      return msg;
    }
    function waUrl(tier, loc) { return "https://wa.me/491736986625?text=" + encodeURIComponent(b2bMessage(tier, loc)); }

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

    /* certificates lightbox —— 证书图缺失时优雅降级。
       文案承诺「Tap any seal to view the certificate」,但 /assets/cert-*.webp 若不存在,
       点开就是破图(B2B 买家恰恰最想看认证文件)。这里先预检图片是否可加载:
       能加载才绑点击;不能则打上 .no-cert,由 CSS 隐去「查看证书」提示并去掉可点击态。
       客户日后补上证书图即自动恢复,无需再改代码。 */
    document.querySelectorAll(".badge").forEach(function (b) {
      var cert = b.getAttribute("data-cert");
      if (!cert) return;
      var probe = new Image();
      probe.onload = function () {
        b.classList.add("has-cert");
        b.addEventListener("click", function () { openLightbox(cert, b.getAttribute("data-name")); });
      };
      probe.onerror = function () { b.classList.add("no-cert"); };
      probe.src = "/assets/cert-" + cert + ".webp";
    });
    document.getElementById("lbClose").addEventListener("click", closeLightbox);
    document.getElementById("lightbox").addEventListener("click", function (e) { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });

    /* 带 hash 进来时(典型来源就是切换语言带过来的 /zh/#faq),等首屏资源就位后
       再校准一次位置。浏览器在解析到 hash 的那一刻,图片与字体往往还没定高,
       那一下定位会偏 —— 位置本来就对的话,这次校准是无害的原地不动。 */
    (function realignOnHashLanding() {
      if (location.hash.length <= 1) return;
      var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (!target) return;
      window.addEventListener("load", function () {
        setTimeout(function () { target.scrollIntoView({ behavior: "auto" }); }, 80);
      }, { once: true });
    })();

    /* 切换语言时保住阅读位置。
       语言链接指向的是 /zh/ 这类裸地址,滚到半途切语言会被扔回首屏 —— 明明看的是
       同一份内容的另一种语言,位置却丢了。这里在点击真正发生之前,把「当前所在区块」
       的锚点补到 href 上,于是 /zh/ 变成 /zh/#faq。
       各语言页的 section id 完全相同(生成器只换文案不动 id),所以锚点跨语言通用。
       不绑 scroll:只在指针按下/键盘激活的那一刻算一次,零滚动开销。
       用捕获阶段监听,保证在链接默认跳转前就改好 href。 */
    (function keepPlaceOnLangSwitch() {
      var langLinks = document.querySelectorAll("a[hreflang]");
      if (!langLinks.length) return;
      function currentSectionId() {
        /* 还在首屏就不必带锚点 —— 否则会生成 /zh/#scroll-cinema 这种多余的地址,
           而那本来就是目标页的默认落点。 */
        if (window.scrollY < 200) return "";
        var secs = document.querySelectorAll("section[id]");
        var best = "", bestTop = -Infinity;
        for (var i = 0; i < secs.length; i++) {
          var t = secs[i].getBoundingClientRect().top;
          /* 取「已滚过 header、且最接近视口顶部」的那个区块 */
          if (t <= 140 && t > bestTop) { bestTop = t; best = secs[i].id; }
        }
        return best;
      }
      function sync() {
        var id = currentSectionId();
        for (var i = 0; i < langLinks.length; i++) {
          var base = langLinks[i].getAttribute("href").split("#")[0];
          langLinks[i].setAttribute("href", id ? base + "#" + id : base);
        }
      }
      document.addEventListener("pointerdown", sync, true);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") sync();
      }, true);
    })();

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
    /* 人话化 ctaLoc 的代码,塞进 WhatsApp 开场白给 Jack 看(归因,不是给 GA4 用的那份 —— 那份已经有 link_location)。
       未知/未来新增的 section id 走通用兜底,不用每加一个区块就回来改这张表。 */
    var LOC_LABELS = {
      sticky: "Sticky bar", nav: "Header menu", drawer: "Mobile menu", footer: "Footer", other: "Page",
      overview: "Overview section", "why-partner": "Why partner section", "partner-benefits": "Partner benefits section",
      "marketing-support": "Marketing support section", "eu-desk": "EU desk section", company: "Company section",
      order: "Order section", faq: "FAQ section",
    };
    function locLabel(code) {
      if (LOC_LABELS[code]) return LOC_LABELS[code];
      return code.charAt(0).toUpperCase() + code.slice(1).replace(/-/g, " ") + " section";
    }
    document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
      /* prefill the wholesale enquiry on every WhatsApp CTA (orderCta sets its own tier-specific text);
         each entry point now gets a distinct "(Sent from: ...)" line so Jack can tell them apart. */
      if (a.id !== "orderCta" && a.href.indexOf("text=") === -1) a.href = waUrl(null, locLabel(ctaLoc(a)));
      a.addEventListener("click", function () {
        /* link_location/link_text 是跨站统一的标准字段(2026-08-21 定,和 INFIBOOTH/Leekko 同款)——
           cta_location 是这个站原有的字段名,保留不删,两个一起发,不影响历史数据连续性。 */
        track("whatsapp_click", {
          cta_location: ctaLoc(a),
          link_url: a.href,
          link_location: ctaLoc(a),
          link_text: (a.innerText || a.textContent || "").trim().slice(0, 60),
        });
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

      /* 视频加载时机 —— 曾是 LCP 11.5s 的主因,两个问题:
         ① 这里原本直接 vid.load(),而 HTML 里是 preload="auto",浏览器已在下载 ——
            load() 会重置媒体元素并**重新下载一遍**,实测同一个 1.8MB 文件下了两次(共 3.6MB)。
         ② 视频与首屏的 CSS/字体/图片抢带宽,首屏迟迟画不出来。
         现在 HTML 改为 preload="none" + poster,由这里择机拉取:
         首屏 load 完成后拉,或用户一开始下滚就立刻拉(取先到者)。 */
      var warmed = false, userScrolled = false;
      function warmVideo() {
        if (warmed) return;
        warmed = true;
        vid.preload = "auto";
        vid.load();
      }
      /* 视频只在「用户已开始滚动」且「数据已就绪」后才显示(CSS 里默认 opacity:0)。
         video 占满首屏、是页面最大的内容元素,它的第一帧渲染会替换 poster 成为新的 LCP,
         把 LCP 拖到视频下载完的时刻(实测 13.6s)。而 LCP 在用户首次交互后停止更新,
         scroll-cinema 本就要滚动才有意义 —— 滚动后再显示,LCP 就定格在 poster 上。
         poster 与视频首帧是同一画面,切换视觉无缝。 */
      function revealVideo() {
        if (userScrolled && vid.readyState >= 2) vid.classList.add("sc-ready");
      }
      vid.addEventListener("loadeddata", revealVideo);
      vid.addEventListener("canplay", revealVideo);

      if (document.readyState === "complete") setTimeout(warmVideo, 200);
      else window.addEventListener("load", function () { setTimeout(warmVideo, 200); }, { once: true });
      /* 用户比首屏加载更快开始滚动时,不等 load 事件 */
      window.addEventListener("scroll", function onFirstScroll() {
        if (window.scrollY > 40) {
          userScrolled = true; warmVideo(); revealVideo();
          window.removeEventListener("scroll", onFirstScroll);
        }
      }, { passive: true });

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
