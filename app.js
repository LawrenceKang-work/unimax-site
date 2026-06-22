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
    {q:{en:"What is Uni Max?",zh:"Uni Max 是什么？",ms:"Apakah itu Uni Max?",nl:"Wat is Uni Max?",de:"Was ist Uni Max?",pl:"Co to jest Uni Max?"},
     a:{en:"Uni Max is a ready-to-drink botanical lychee vitality drink with Triple Force Tongkat Ali (Yellow, Red & Black), amino acids, adaptogens, antioxidants and essential nutrients — formulated to support everyday energy, stamina, focus, circulation and natural vitality in one convenient sachet.",
        zh:"Uni Max 是一款即饮型植物荔枝活力饮品，含三重东革阿里（黄、红、黑）、氨基酸、适应原、抗氧化成分及多种必需营养素，配方旨在以一小包便捷支持日常能量、耐力、专注力、循环与自然活力。",
        ms:"Uni Max ialah minuman vitaliti botani laici sedia minum dengan Tongkat Ali Tiga Kuasa (Kuning, Merah & Hitam), asid amino, adaptogen, antioksidan dan nutrien penting — diformulasikan untuk menyokong tenaga harian, stamina, fokus, peredaran darah dan vitaliti semula jadi dalam satu sachet.",
        nl:"Uni Max is een gebruiksklare botanische vitaaldrank met lychee-smaak en Triple Force Tongkat Ali (Geel, Rood en Zwart), aminozuren, adaptogenen, antioxidanten en essentiële nutriënten — geformuleerd ter ondersteuning van dagelijkse energie, uithoudingsvermogen, focus, bloedsomloop en natuurlijke vitaliteit in één handig sachet.",
        de:"Uni Max ist ein trinkfertiges botanisches Lychee-Vitalitätsgetränk mit Triple Force Tongkat Ali (Gelb, Rot & Schwarz), Aminosäuren, Adaptogenen, Antioxidantien und essenziellen Nährstoffen — formuliert zur Unterstützung von täglicher Energie, Ausdauer, Fokus, Durchblutung und natürlicher Vitalität in einem praktischen Sachet.",
        pl:"Uni Max to gotowy do picia botaniczny napój witalny o smaku liczi z Triple Force Tongkat Ali (Żółty, Czerwony i Czarny), aminokwasami, adaptogenami, przeciwutleniaczami i niezbędnymi składnikami odżywczymi — opracowany w celu wspierania codziennej energii, wytrzymałości, skupienia, krążenia i naturalnej witalności w jednej wygodnej saszetce."}},
    {q:{en:"Who is Uni Max for?",zh:"谁适合饮用 Uni Max？",ms:"Untuk siapa Uni Max?",nl:"Voor wie is Uni Max bedoeld?",de:"Für wen ist Uni Max geeignet?",pl:"Dla kogo jest Uni Max?"},
     a:{en:"Adults who want more everyday energy and stamina, support for workout performance and recovery, sharper focus and stress resilience, and support for natural male vitality and confidence. Not intended for under-18s.",
        zh:"适合希望拥有更充沛日常能量与耐力、支持运动表现与恢复、提升专注力与抗压能力，以及希望支持自然男性活力与自信的成年人。不适合 18 岁以下人士。",
        ms:"Dewasa yang mahukan lebih tenaga dan stamina harian, sokongan prestasi serta pemulihan senaman, fokus lebih tajam dan ketahanan terhadap tekanan, serta sokongan vitaliti dan keyakinan lelaki secara semula jadi. Tidak sesuai untuk bawah 18 tahun.",
        nl:"Volwassenen die meer dagelijkse energie en uithoudingsvermogen willen, ondersteuning bij sportprestaties en herstel, scherpere focus en stressbestendigheid, en ondersteuning van natuurlijke mannelijke vitaliteit en zelfvertrouwen. Niet bedoeld voor personen onder de 18 jaar.",
        de:"Erwachsene, die mehr tägliche Energie und Ausdauer wünschen, Unterstützung bei sportlicher Leistung und Erholung, schärfere Konzentration und Stressresistenz sowie Unterstützung der natürlichen männlichen Vitalität und Selbstsicherheit. Nicht für Personen unter 18 Jahren.",
        pl:"Dorośli, którzy chcą więcej energii i wytrzymałości na co dzień, wsparcia w treningu i regeneracji, lepszego skupienia i odporności na stres oraz wsparcia naturalnej witalności i pewności siebie mężczyzn. Nie przeznaczony dla osób poniżej 18 roku życia."}},
    {q:{en:"When will I feel the effects?",zh:"多久会感受到效果？",ms:"Bilakah saya akan rasa kesannya?",nl:"Wanneer voel ik het effect?",de:"Wann spüre ich die Wirkung?",pl:"Kiedy poczuję efekty?"},
     a:{en:"Many people notice a lift in energy and focus within about 30 minutes, while others find stamina and vitality build gradually with consistent daily use.",
        zh:"许多人在约 30 分钟内便能感受到能量与专注力的提升；也有人在持续每日饮用下，耐力与活力会逐步增强。",
        ms:"Ramai yang merasai peningkatan tenaga dan fokus dalam kira-kira 30 minit, manakala yang lain mendapati stamina dan vitaliti meningkat secara beransur-ansur dengan penggunaan harian yang konsisten.",
        nl:"Veel mensen merken een verbetering in energie en focus binnen ongeveer 30 minuten, terwijl anderen merken dat uithoudingsvermogen en vitaliteit geleidelijk toenemen bij consistent dagelijks gebruik.",
        de:"Viele bemerken einen Energieschub und gesteigerte Konzentration innerhalb von etwa 30 Minuten, während andere feststellen, dass Ausdauer und Vitalität sich bei konsequenter täglicher Anwendung schrittweise aufbauen.",
        pl:"Wiele osób zauważa poprawę energii i skupienia w ciągu około 30 minut, podczas gdy inni odkrywają, że wytrzymałość i witalność stopniowo rosną przy konsekwentnym codziennym stosowaniu."}},
    {q:{en:"Does Uni Max contain caffeine?",zh:"Uni Max 含咖啡因吗？",ms:"Adakah Uni Max mengandungi kafein?",nl:"Bevat Uni Max cafeïne?",de:"Enthält Uni Max Koffein?",pl:"Czy Uni Max zawiera kofeinę?"},
     a:{en:"Yes. Uni Max contains natural caffeine from guarana extract, which provides a smooth, sustained energy lift.",
        zh:"是的。Uni Max 含有来自瓜拿纳提取物的天然咖啡因，能带来平稳而持久的能量提升。",
        ms:"Ya. Uni Max mengandungi kafein semula jadi daripada ekstrak guarana, yang memberikan peningkatan tenaga yang lancar dan berpanjangan.",
        nl:"Ja. Uni Max bevat natuurlijke cafeïne uit guarana-extract, dat voor een vloeiende, aanhoudende energieboost zorgt.",
        de:"Ja. Uni Max enthält natürliches Koffein aus Guarana-Extrakt, das für einen sanften, anhaltenden Energieschub sorgt.",
        pl:"Tak. Uni Max zawiera naturalną kofeinę z ekstraktu guarany, która zapewnia łagodny i trwały zastrzyk energii."}},
    {q:{en:"Are there any side effects?",zh:"会有副作用吗？",ms:"Adakah terdapat kesan sampingan?",nl:"Zijn er bijwerkingen?",de:"Gibt es Nebenwirkungen?",pl:"Czy są jakieś skutki uboczne?"},
     a:{en:"Uni Max is made from natural ingredients and is generally well tolerated. It is not recommended for children, or for individuals with medical conditions, without first consulting a healthcare professional.",
        zh:"Uni Max 由天然成分制成，一般耐受性良好。不建议儿童或患有疾病者在未咨询医疗专业人员前饮用。",
        ms:"Uni Max diperbuat daripada bahan semula jadi dan secara amnya diterima dengan baik. Ia tidak disyorkan untuk kanak-kanak, atau individu yang mempunyai masalah perubatan, tanpa berunding dengan profesional kesihatan terlebih dahulu.",
        nl:"Uni Max is gemaakt van natuurlijke ingrediënten en wordt over het algemeen goed verdragen. Niet aanbevolen voor kinderen of personen met medische aandoeningen zonder eerst een zorgverlener te raadplegen.",
        de:"Uni Max wird aus natürlichen Inhaltsstoffen hergestellt und in der Regel gut vertragen. Es wird nicht für Kinder oder Personen mit Erkrankungen empfohlen, ohne zuvor einen Arzt zu konsultieren.",
        pl:"Uni Max jest wytwarzany z naturalnych składników i jest zazwyczaj dobrze tolerowany. Nie jest zalecany dla dzieci ani osób z chorobami bez wcześniejszej konsultacji z pracownikiem służby zdrowia."}},
    {q:{en:"How is Uni Max different from a normal energy drink?",zh:"Uni Max 与普通能量饮料有何不同？",ms:"Bagaimana Uni Max berbeza daripada minuman tenaga biasa?",nl:"Hoe verschilt Uni Max van een gewone energiedrank?",de:"Wie unterscheidet sich Uni Max von einem normalen Energydrink?",pl:"Czym Uni Max różni się od zwykłego napoju energetycznego?"},
     a:{en:"Instead of high sugar and synthetic stimulants, Uni Max combines studied botanicals, adaptogens and amino acids that support not just energy but also circulation, resilience and natural hormonal balance.",
        zh:"Uni Max 不依赖高糖与合成刺激物，而是结合经研究的植物成分、适应原与氨基酸，不仅支持能量，也支持循环、抗压能力与自然荷尔蒙平衡。",
        ms:"Daripada gula tinggi dan perangsang sintetik, Uni Max menggabungkan botani yang dikaji, adaptogen dan asid amino yang menyokong bukan sahaja tenaga tetapi juga peredaran darah, ketahanan dan keseimbangan hormon semula jadi.",
        nl:"In plaats van veel suiker en synthetische stimulantia combineert Uni Max onderzochte botanische ingrediënten, adaptogenen en aminozuren die niet alleen energie, maar ook bloedsomloop, veerkracht en natuurlijke hormonale balans ondersteunen.",
        de:"Statt viel Zucker und synthetischer Stimulanzien kombiniert Uni Max erforschte Botanicals, Adaptogene und Aminosäuren, die nicht nur die Energie, sondern auch Durchblutung, Belastbarkeit und den natürlichen Hormonhaushalt unterstützen.",
        pl:"Zamiast dużej ilości cukru i syntetycznych stymulantów, Uni Max łączy przebadane składniki botaniczne, adaptogeny i aminokwasy, które wspierają nie tylko energię, ale też krążenie, odporność i naturalną równowagę hormonalną."}},
    {q:{en:"Can I take it with other supplements?",zh:"可以和其他保健品一起服用吗？",ms:"Bolehkah saya ambil bersama suplemen lain?",nl:"Kan ik het samen met andere supplementen nemen?",de:"Kann ich es zusammen mit anderen Nahrungsergänzungsmitteln einnehmen?",pl:"Czy mogę go łączyć z innymi suplementami?"},
     a:{en:"Uni Max is generally compatible with most everyday supplements. If you take long-term medication, please check with your healthcare provider first.",
        zh:"Uni Max 一般可与大多数日常保健品搭配。如果您正在长期服药，请先咨询医疗专业人员。",
        ms:"Uni Max secara amnya serasi dengan kebanyakan suplemen harian. Jika anda mengambil ubat jangka panjang, sila berunding dengan penyedia penjagaan kesihatan anda terlebih dahulu.",
        nl:"Uni Max is over het algemeen compatibel met de meeste dagelijkse supplementen. Als je langdurig medicijnen gebruikt, overleg dan eerst met je zorgverlener.",
        de:"Uni Max ist in der Regel mit den meisten alltäglichen Nahrungsergänzungsmitteln verträglich. Wenn Sie Dauermedikamente einnehmen, sprechen Sie bitte zuerst mit Ihrem Arzt.",
        pl:"Uni Max jest na ogół zgodny z większością codziennych suplementów. Jeśli przyjmujesz leki na stałe, skonsultuj się najpierw ze swoim lekarzem."}},
    {q:{en:"Is it safe for daily use?",zh:"可以每天饮用吗？",ms:"Adakah ia selamat untuk kegunaan harian?",nl:"Is het veilig voor dagelijks gebruik?",de:"Ist es für den täglichen Gebrauch geeignet?",pl:"Czy jest bezpieczny do codziennego stosowania?"},
     a:{en:"Yes. Uni Max is designed for consistent daily use to support energy, performance and overall wellness.",
        zh:"可以。Uni Max 专为每日持续饮用而设计，以支持能量、表现与整体健康。",
        ms:"Ya. Uni Max direka untuk kegunaan harian yang konsisten bagi menyokong tenaga, prestasi dan kesihatan keseluruhan.",
        nl:"Ja. Uni Max is ontworpen voor consistent dagelijks gebruik ter ondersteuning van energie, prestaties en algeheel welzijn.",
        de:"Ja. Uni Max ist für den konsequenten täglichen Gebrauch zur Unterstützung von Energie, Leistung und allgemeinem Wohlbefinden konzipiert.",
        pl:"Tak. Uni Max jest zaprojektowany do konsekwentnego codziennego stosowania w celu wsparcia energii, wydajności i ogólnego dobrostanu."}},
    {q:{en:"Can people with diabetes take it?",zh:"糖尿病患者可以饮用吗？",ms:"Bolehkah pesakit diabetes mengambilnya?",nl:"Kunnen mensen met diabetes het gebruiken?",de:"Können Diabetiker es einnehmen?",pl:"Czy osoby z cukrzycą mogą go stosować?"},
     a:{en:"Uni Max is low in sugar and mainly sweetened with natural ingredients. Because it contains botanicals such as Tongkat Ali and Maca that may influence energy metabolism, people with diabetes should monitor their blood glucose and consult their doctor before long-term use.",
        zh:"Uni Max 含糖量低，主要以天然成分调味。由于含有东革阿里、玛卡等可能影响能量代谢的植物成分，糖尿病患者应监测血糖，并在长期饮用前咨询医生。",
        ms:"Uni Max rendah gula dan dimaniskan terutamanya dengan bahan semula jadi. Kerana ia mengandungi botani seperti Tongkat Ali dan Maca yang mungkin mempengaruhi metabolisme tenaga, pesakit diabetes perlu memantau glukosa darah dan berunding dengan doktor sebelum penggunaan jangka panjang.",
        nl:"Uni Max is laag in suiker en voornamelijk gezoet met natuurlijke ingrediënten. Omdat het botanische ingrediënten zoals Tongkat Ali en Maca bevat die het energiemetabolisme kunnen beïnvloeden, dienen mensen met diabetes hun bloedglucose te controleren en hun arts te raadplegen voor langdurig gebruik.",
        de:"Uni Max ist zuckerarm und wird hauptsächlich mit natürlichen Inhaltsstoffen gesüßt. Da es Botanicals wie Tongkat Ali und Maca enthält, die den Energiestoffwechsel beeinflussen können, sollten Diabetiker ihren Blutzucker kontrollieren und vor längerer Einnahme einen Arzt konsultieren.",
        pl:"Uni Max jest ubogi w cukier i słodzony głównie naturalnymi składnikami. Ponieważ zawiera składniki botaniczne takie jak Tongkat Ali i Maka, które mogą wpływać na metabolizm energetyczny, osoby z cukrzycą powinny monitorować poziom glukozy we krwi i skonsultować się z lekarzem przed długotrwałym stosowaniem."}},
    {q:{en:"Is it suitable for people with high blood pressure or a heart condition?",zh:"高血压或心脏疾病者适合吗？",ms:"Sesuaikah untuk pesakit darah tinggi atau jantung?",nl:"Is het geschikt voor mensen met hoge bloeddruk of een hartaandoening?",de:"Ist es für Personen mit Bluthochdruck oder Herzerkrankungen geeignet?",pl:"Czy jest odpowiedni dla osób z nadciśnieniem lub chorobą serca?"},
     a:{en:"Uni Max contains L-Arginine and L-Citrulline, which support healthy circulation. If you have a cardiovascular condition or take blood-pressure medication, please consult your doctor before use.",
        zh:"Uni Max 含有支持健康循环的 L-精氨酸与 L-瓜氨酸。如您有心血管疾病或正在服用降压药，请先咨询医生再饮用。",
        ms:"Uni Max mengandungi L-Arginine dan L-Citrulline yang menyokong peredaran darah yang sihat. Jika anda mempunyai masalah kardiovaskular atau mengambil ubat tekanan darah, sila berunding dengan doktor sebelum penggunaan.",
        nl:"Uni Max bevat L-arginine en L-citrulline, die een gezonde bloedsomloop ondersteunen. Als je een hart- of vaataandoening hebt of bloeddrukverlagende medicijnen gebruikt, raadpleeg dan je arts voor gebruik.",
        de:"Uni Max enthält L-Arginin und L-Citrullin, die eine gesunde Durchblutung unterstützen. Bei einer Herz-Kreislauf-Erkrankung oder der Einnahme von Blutdruckmitteln konsultieren Sie bitte vor der Anwendung Ihren Arzt.",
        pl:"Uni Max zawiera L-argininę i L-cytrulinę, które wspierają zdrowe krążenie. W przypadku chorób sercowo-naczyniowych lub przyjmowania leków na ciśnienie krwi prosimy o konsultację z lekarzem przed użyciem."}},
    {q:{en:"Is it safe for liver or kidney patients?",zh:"肝肾疾病者饮用安全吗？",ms:"Selamatkah untuk pesakit hati atau buah pinggang?",nl:"Is het veilig voor lever- of nierpatiënten?",de:"Ist es für Leber- oder Nierenpatienten sicher?",pl:"Czy jest bezpieczny dla pacjentów z chorobami wątroby lub nerek?"},
     a:{en:"The formula contains botanical extracts generally considered safe for healthy adults. If you have a chronic kidney or liver condition, follow the suggested serving and consult your doctor first.",
        zh:"本配方含有一般被认为对健康成人安全的植物提取物。如您患有慢性肾脏或肝脏疾病，请按建议份量饮用，并先咨询医生。",
        ms:"Formula ini mengandungi ekstrak botani yang secara amnya dianggap selamat untuk dewasa yang sihat. Jika anda mempunyai penyakit buah pinggang atau hati kronik, ikuti sajian yang disyorkan dan berunding dengan doktor terlebih dahulu.",
        nl:"De formule bevat botanische extracten die over het algemeen als veilig worden beschouwd voor gezonde volwassenen. Als je een chronische nier- of leveraandoening hebt, volg dan de aanbevolen portie en raadpleeg eerst je arts.",
        de:"Die Formel enthält pflanzliche Extrakte, die für gesunde Erwachsene allgemein als sicher gelten. Bei chronischen Nieren- oder Lebererkrankungen halten Sie sich an die empfohlene Menge und konsultieren Sie zuerst Ihren Arzt.",
        pl:"Formuła zawiera ekstrakty botaniczne ogólnie uznawane za bezpieczne dla zdrowych dorosłych. W przypadku przewlekłej choroby nerek lub wątroby stosuj się do zalecanej porcji i najpierw skonsultuj się z lekarzem."}},
    {q:{en:"Does Uni Max affect hormones?",zh:"Uni Max 会影响荷尔蒙吗？",ms:"Adakah Uni Max menjejaskan hormon?",nl:"Heeft Uni Max invloed op hormonen?",de:"Beeinflusst Uni Max den Hormonhaushalt?",pl:"Czy Uni Max wpływa na hormony?"},
     a:{en:"Botanicals such as Tongkat Ali and Ashwagandha are traditionally used to support the body's natural hormonal balance, which may support everyday energy, strength and vitality. It is not a hormone medication.",
        zh:"东革阿里、南非醉茄等植物成分传统上用于支持身体自然的荷尔蒙平衡，有助于支持日常能量、力量与活力。它并非荷尔蒙药物。",
        ms:"Botani seperti Tongkat Ali dan Ashwagandha secara tradisi digunakan untuk menyokong keseimbangan hormon semula jadi badan, yang boleh menyokong tenaga, kekuatan dan vitaliti harian. Ia bukan ubat hormon.",
        nl:"Botanische ingrediënten zoals Tongkat Ali en ashwagandha worden traditioneel gebruikt ter ondersteuning van de natuurlijke hormonale balans van het lichaam, wat dagelijkse energie, kracht en vitaliteit kan ondersteunen. Het is geen hormoonmedicijn.",
        de:"Botanicals wie Tongkat Ali und Ashwagandha werden traditionell zur Unterstützung des natürlichen Hormongleichgewichts des Körpers eingesetzt, was tägliche Energie, Kraft und Vitalität fördern kann. Es ist kein Hormonpräparat.",
        pl:"Składniki botaniczne takie jak Tongkat Ali i ashwagandha są tradycyjnie stosowane w celu wspierania naturalnej równowagi hormonalnej organizmu, co może wspierać codzienną energię, siłę i witalność. Nie jest to preparat hormonalny."}}
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
      "announce":"首盒免运费 · WhatsApp 当天回复 · 订阅每盒更省 · HALAL 与 GMP 认证 · 马来西亚制造",
      "nav.benefits":"功效","nav.formula":"配方","nav.trust":"认证","nav.research":"研究依据","nav.faq":"常见问题",
      "cta.order":"在 WhatsApp 下单","cta.explore":"了解配方",
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
      "faq.eyebrow":"值得了解","faq.h2":"常见问题","faq.asideT":"还有疑问？","faq.asideP":"在 WhatsApp 上联系我们，团队将协助您选择最合适的方案。","faq.asideCta":"与 Jack 聊聊",
      "cta.h2a":"为你的一天充能 —","cta.h2b":"在 WhatsApp 下单 Uni Max。","cta.p":"无需结账，毫不繁琐。直接讯息我们，即可安排您的首盒与配送。","cta.sub":"+60 10-200 5803 · 联系人：Jack",
      "foot.about":"力量的宇宙，极致释放。一款含三重东革阿里的植物荔枝活力饮品，由 UniPro 出品。",
      "foot.explore":"探索","foot.product":"产品","foot.p1":"10克 × 30 包","foot.p2":"即饮","foot.p3":"植物荔枝","foot.p4":"HALAL 认证","foot.contact":"联系","foot.jack":"请找 Jack",
      "foot.disclaimer":"本产品为膳食补充品，无意诊断、治疗、治愈或预防任何疾病。本网站信息涉及一般保健及各别成分的结构功能，不能替代专业医疗建议。饮用前请咨询医疗专业人员，尤其是孕期、哺乳期、正在服药或有健康状况者。请置于儿童无法触及之处。不建议 18 岁以下人士饮用。",
      "foot.copy":"© 2026 UniPro · UNI MAX。版权所有。","foot.made":"由 Orient Biotech Sdn Bhd 于马来西亚制造。",
      "nav.order":"价格","cta.seeplans":"查看方案与价格",
      "why.eyebrow":"为何换它","why.h2a":"停止追逐那个","why.h2b":"午后崩溃感。",
      "why.oldtag":"常见做法","why.oldt":"咖啡、高糖能量饮料，再加一把保健丸",
      "why.o1":"先飙升、再在午后更猛地崩溃","why.o2":"含有大量糖分与合成刺激物","why.o3":"只追求能量——忽略耐力、专注与循环","why.o4":"每天多瓶饮料、冲泡或吞服多颗药丸",
      "why.newtag":"UNI MAX 的方式","why.newt":"每天一次，一包 10 克植萃饮",
      "why.n1":"瓜拉纳平稳植物能量——平稳持续，不骤升","why.n2":"无额外添加糖，轻盈微甜，真实荔枝风味","why.n3":"支持能量、耐力、专注、循环与抗压力","why.n4":"撕开即饮——数秒完成，无需冲泡",
      "order.eyebrow":"选购你的盒装","order.h2a":"选择方案，","order.h2b":"明天就充满能量",
      "order.sub":"无需繁琐结账。选好方案，发一则 WhatsApp 讯息，我们当天即确认订单与配送。",
      "order.p1name":"单盒装","order.p1tag":"先试用一个月","order.perbox":"/ 盒","order.p1day":"30 包即饮装",
      "order.p1f1":"30 包即饮装","order.p1f2":"WhatsApp 当天客服","order.p1f3":"标准配送","order.p1cta":"购买单盒",
      "order.popular":"最受欢迎 · 最划算","order.p2name":"三盒优惠装","order.p2tag":"三个月的每日活力","order.perbundle":"/ 3 盒",
      "order.p2save":"更超值","order.p2day":"· 三个月份量","order.p2f1":"90 包","order.p2f2":"整组免运费","order.p2f3":"优先 WhatsApp 客服","order.p2cta":"购买优惠装",
      "order.p3name":"订阅省更多","order.p3tag":"每月一盒","order.p3day":"最低价 · 随时取消",
      "order.p3f1":"每月配送 30 包","order.p3f2":"每月免运费","order.p3f3":"可随时暂停或取消","order.p3cta":"开始订阅",
      "order.a1":"首盒免运费","order.a2":"WhatsApp 当天回复","order.a3":"HALAL 与 GMP 认证设施","order.a4":"不适合你？随时讯息我们",
      "sticky.from":"准备好为一天充能了吗？","sticky.sub":"首盒免运费","sticky.cta":"查看方案",
      "order.subtag":"订阅每盒更省","order.howmany":"要几盒？","order.spec1":"包 / 盒","order.spec2":"植物与营养成分","order.spec3":"添加糖","order.spec4":"分钟感受提升",
      "order.p1sub":"30 包 · 先试用一个月","order.p2sub":"90 包 · 最受欢迎，三个月份量","order.p3sub":"每月一盒 · 随时取消","order.best":"最划算","order.freeship":"免运费","order.cta":"在 WhatsApp 下单","order.p3save":"更省","order.poa":"价格待定",
      "sc.cap1.eyebrow":"活跃生活 · 日常表现 · 现代活力","sc.cap1.line1":"充能。","sc.cap1.line2":"专注。全力以赴。",
      "sc.cap2.line1":"每天一包 10g，","sc.cap2.line2":"你所需的全部能量。","sc.cap2.sub":"三重东革阿里 + 草本精华 + 氨基酸——能量、专注与自信，约 30 分钟感受提升。",
      "sc.cap3.eyebrow":"HALAL · GMP · 马来西亚制造","sc.cap3.line1":"准备好感受","sc.cap3.line2":"与众不同了吗？",
      "brand.h2a":"力量的宇宙，","brand.h2b":"极致释放。"
    },
    ms: {
      "announce":"Penghantaran percuma kotak pertama · Balasan WhatsApp hari sama · Langgan & jimat · Disahkan HALAL & GMP · Buatan Malaysia",
      "nav.benefits":"Manfaat","nav.formula":"Formula","nav.trust":"Pensijilan","nav.research":"Penyelidikan","nav.faq":"Soalan Lazim",
      "cta.order":"Pesan di WhatsApp","cta.explore":"Terokai formula",
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
      "faq.eyebrow":"Baik untuk diketahui","faq.h2":"Soalan lazim","faq.asideT":"Masih ada soalan?","faq.asideP":"Mesej kami di WhatsApp dan pasukan kami akan membantu anda memilih yang sesuai.","faq.asideCta":"Berbual dengan Jack",
      "cta.h2a":"Cas tenaga hari anda —","cta.h2b":"pesan Uni Max di WhatsApp.","cta.p":"Tiada pembayaran, tanpa kerumitan. Mesej kami terus dan kami akan uruskan kotak pertama serta penghantaran anda.","cta.sub":"+60 10-200 5803 · Hubungi: Jack",
      "foot.about":"Alam Semesta Kuasa, Impak Maksimum. Minuman vitaliti botani laici dengan Tongkat Ali Tiga Kuasa, oleh UniPro.",
      "foot.explore":"Terokai","foot.product":"Produk","foot.p1":"10g × 30 sachet","foot.p2":"Sedia minum","foot.p3":"Laici botani","foot.p4":"Disahkan HALAL","foot.contact":"Hubungi","foot.jack":"Tanya Jack",
      "foot.disclaimer":"Produk ini ialah suplemen diet dan tidak bertujuan untuk mendiagnos, merawat, menyembuh atau mencegah sebarang penyakit. Maklumat di laman ini berkaitan kesihatan umum dan struktur-fungsi bahan individu, dan bukan pengganti nasihat perubatan profesional. Berunding dengan profesional kesihatan sebelum penggunaan, terutamanya jika anda hamil, menyusu, mengambil ubat atau menguruskan keadaan kesihatan. Jauhkan daripada kanak-kanak. Tidak disyorkan untuk bawah 18 tahun.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Hak cipta terpelihara.","foot.made":"Dikilang di Malaysia oleh Orient Biotech Sdn Bhd.",
      "nav.order":"Harga","cta.seeplans":"Lihat pelan & harga",
      "why.eyebrow":"Kenapa beralih","why.h2a":"Henti Mengejar","why.h2b":"Krisis Petang.",
      "why.oldtag":"Cara biasa","why.oldt":"Kopi, minuman tenaga bergula & segenggam pil",
      "why.o1":"Naik mendadak, kemudian jatuh lebih teruk pada petang","why.o2":"Penuh dengan gula dan perangsang sintetik","why.o3":"Hanya mengejar tenaga — abai stamina, fokus & peredaran","why.o4":"Beberapa minuman, bancuhan, atau pil setiap hari",
      "why.newtag":"Cara UNI MAX","why.newt":"Satu sachet botani 10g, sekali sehari",
      "why.n1":"Tenaga botanik guarana yang lancar — stabil, bukan mendadak","why.n2":"Tanpa gula tambahan, manis ringan, rasa laici sebenar","why.n3":"Menyokong tenaga, stamina, fokus, peredaran & ketahanan","why.n4":"Koyak, minum, pergi — siap dalam saat, tiada bancuhan",
      "order.eyebrow":"Pesan kotak anda","order.h2a":"Pilih pelan anda,","order.h2b":"bertenaga esok hari",
      "order.sub":"Tiada proses pembayaran rumit. Pilih pelan, hantar satu mesej WhatsApp, dan kami sahkan pesanan serta penghantaran pada hari yang sama.",
      "order.p1name":"Kotak Tunggal","order.p1tag":"Cuba untuk sebulan","order.perbox":"/ kotak","order.p1day":"30 sachet sedia minum",
      "order.p1f1":"30 sachet sedia minum","order.p1f2":"Sokongan WhatsApp hari sama","order.p1f3":"Penghantaran standard","order.p1cta":"Pesan kotak tunggal",
      "order.popular":"Paling popular · nilai terbaik","order.p2name":"Pakej 3 Kotak","order.p2tag":"3 bulan vitaliti harian","order.perbundle":"/ 3 kotak",
      "order.p2save":"Lebih jimat","order.p2day":"· bekalan 3 bulan","order.p2f1":"90 sachet","order.p2f2":"Penghantaran percuma seluruh pakej","order.p2f3":"Sokongan WhatsApp keutamaan","order.p2cta":"Pesan pakej",
      "order.p3name":"Langgan & Jimat","order.p3tag":"1 kotak setiap bulan","order.p3day":"Harga terendah · batal bila-bila masa",
      "order.p3f1":"30 sachet dihantar bulanan","order.p3f2":"Penghantaran percuma setiap bulan","order.p3f3":"Jeda atau batal bila-bila masa","order.p3cta":"Mula langganan",
      "order.a1":"Penghantaran percuma kotak pertama","order.a2":"Balasan WhatsApp hari sama","order.a3":"Kemudahan bersijil HALAL & GMP","order.a4":"Tidak sesuai? Mesej kami sahaja",
      "sticky.from":"Bersedia bertenaga hari ini?","sticky.sub":"Penghantaran percuma kotak pertama","sticky.cta":"Lihat pelan",
      "order.subtag":"Langgan & jimat setiap kotak","order.howmany":"Berapa kotak?","order.spec1":"sachet / kotak","order.spec2":"botani & nutrien","order.spec3":"gula tambahan","order.spec4":"minit rasa kesannya",
      "order.p1sub":"30 sachet · cuba sebulan","order.p2sub":"90 sachet · paling popular, bekalan 3 bulan","order.p3sub":"1 kotak sebulan · batal bila-bila","order.best":"NILAI TERBAIK","order.freeship":"PENGHANTARAN PERCUMA","order.cta":"Pesan di WhatsApp","order.p3save":"Lebih jimat","order.poa":"Harga atas permintaan",
      "sc.cap1.eyebrow":"Gaya Hidup Aktif · Prestasi Harian · Vitaliti Moden","sc.cap1.line1":"Isi Semula.","sc.cap1.line2":"Fokus. Berprestasi.",
      "sc.cap2.line1":"Satu sachet 10g.","sc.cap2.line2":"Semua tenaga yang anda perlukan.","sc.cap2.sub":"Tongkat Ali Tiga Kuasa + botani & asid amino — tenaga, fokus & keyakinan dalam ~30 minit.",
      "sc.cap3.eyebrow":"HALAL · GMP · Buatan Malaysia","sc.cap3.line1":"Bersedia rasai","sc.cap3.line2":"perbezaannya?",
      "brand.h2a":"Alam semesta kuasa,","brand.h2b":"impak maksimum."
    },
    pl: {
      "announce":"Bezpłatna dostawa przy pierwszym zamówieniu · Odpowiedź WhatsApp tego samego dnia · Subskrybuj i oszczędzaj · Certyfikat HALAL i GMP · Wyprodukowano w Malezji",
      "nav.benefits":"Korzyści","nav.formula":"Formuła","nav.trust":"Certyfikaty","nav.research":"Badania","nav.faq":"FAQ",
      "cta.order":"Zamów przez WhatsApp","cta.explore":"Odkryj formułę",
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
      "faq.eyebrow":"Warto wiedzieć","faq.h2":"Najczęstsze pytania","faq.asideT":"Masz jeszcze pytania?","faq.asideP":"Skontaktuj się z nami na WhatsApp, a nasz zespół pomoże Ci wybrać najlepsze rozwiązanie.","faq.asideCta":"Porozmawiaj z Jackiem",
      "cta.h2a":"Naładuj swój dzień —","cta.h2b":"zamów Uni Max przez WhatsApp.","cta.p":"Bez skomplikowanego koszyka zakupów. Wyślij nam wiadomość i zorganizujemy Twoje pierwsze opakowanie z dostawą.","cta.sub":"+60 10-200 5803 · Kontakt: Jack",
      "foot.about":"Wszechświat siły, maksymalny efekt. Botaniczny napój witalny liczi z Triple Tongkat Ali, od UniPro.",
      "foot.explore":"Odkryj","foot.product":"Produkt","foot.p1":"10 g × 30 saszetek","foot.p2":"Gotowy do picia","foot.p3":"Botaniczny liczi","foot.p4":"Certyfikat HALAL","foot.contact":"Kontakt","foot.jack":"Zapytaj Jacka",
      "foot.disclaimer":"Ten produkt jest suplementem diety i nie jest przeznaczony do diagnozowania, leczenia, wyleczenia ani zapobiegania jakiejkolwiek chorobie. Informacje na tej stronie dotyczą ogólnego dobrostanu i wsparcia strukturalnego i funkcjonalnego poszczególnych składników i nie zastępują profesjonalnej porady medycznej. Skonsultuj się z pracownikiem służby zdrowia przed użyciem, szczególnie w przypadku ciąży, karmienia piersią, przyjmowania leków lub problemów zdrowotnych. Przechowywać w miejscu niedostępnym dla dzieci. Nie zalecane dla osób poniżej 18 roku życia.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Wszelkie prawa zastrzeżone.","foot.made":"Wyprodukowane przez Orient Biotech Sdn Bhd w Malezji.",
      "nav.order":"Cennik","cta.seeplans":"Zobacz plany i ceny",
      "why.eyebrow":"Dlaczego to wybrać","why.h2a":"Skończyć z","why.h2b":"popołudniowym spadkiem energii.",
      "why.oldtag":"Stare nawyki","why.oldt":"Kawa, napoje energetyczne z dużą ilością cukru i garść suplementów",
      "why.o1":"Gwałtowny wzrost, po którym następuje jeszcze większy popołudniowy spadek","why.o2":"Pełne cukru i syntetycznych stymulantów","why.o3":"Skupia się tylko na energii — ignoruje wytrzymałość, skupienie i krążenie","why.o4":"Wiele butelek, zaparzania lub tabletek każdego dnia",
      "why.newtag":"Metoda UNI MAX","why.newt":"Raz dziennie, saszetka 10 g napoju roślinnego",
      "why.n1":"Guarana — łagodna, trwała energia roślinna","why.n2":"Bez dodanego cukru, lekko słodki, prawdziwy smak liczi","why.n3":"Wspiera energię, wytrzymałość, skupienie, krążenie i odporność na stres","why.n4":"Otwórz i wypij — gotowe w kilka sekund, bez parzenia",
      "order.eyebrow":"Wybierz swoje opakowanie","order.h2a":"Wybierz plan,","order.h2b":"jutro miej pełnię energii",
      "order.sub":"Bez skomplikowanego koszyka. Wybierz plan, wyślij wiadomość WhatsApp, a my potwierdzimy zamówienie i dostawę tego samego dnia.",
      "order.p1name":"Pojedyncze opakowanie","order.p1tag":"Wypróbuj przez miesiąc","order.perbox":"/ opakowanie","order.p1day":"30 saszetek gotowych do picia",
      "order.p1f1":"30 saszetek gotowych do picia","order.p1f2":"Obsługa WhatsApp tego samego dnia","order.p1f3":"Standardowa dostawa","order.p1cta":"Kup pojedyncze opakowanie",
      "order.popular":"Najpopularniejsze · Najlepsza wartość","order.p2name":"Pakiet trzech opakowań","order.p2tag":"Trzymiesięczna codzienna witalność","order.perbundle":"/ 3 opakowania",
      "order.p2save":"Lepsza wartość","order.p2day":"· zapas na trzy miesiące","order.p2f1":"90 saszetek","order.p2f2":"Bezpłatna dostawa całego zestawu","order.p2f3":"Priorytetowa obsługa WhatsApp","order.p2cta":"Kup pakiet",
      "order.p3name":"Subskrypcja z oszczędnościami","order.p3tag":"Jedno opakowanie miesięcznie","order.p3day":"Najniższa cena · Anuluj w dowolnym momencie",
      "order.p3f1":"30 saszetek dostarczanych miesięcznie","order.p3f2":"Bezpłatna dostawa co miesiąc","order.p3f3":"Wstrzymaj lub anuluj w dowolnym momencie","order.p3cta":"Rozpocznij subskrypcję",
      "order.a1":"Bezpłatna dostawa przy pierwszym zamówieniu","order.a2":"Odpowiedź WhatsApp tego samego dnia","order.a3":"Certyfikowany zakład HALAL i GMP","order.a4":"Nie pasuje? Po prostu nam napisz",
      "sticky.from":"Gotowy, aby naładować swój dzień?","sticky.sub":"Bezpłatna dostawa przy pierwszym zamówieniu","sticky.cta":"Zobacz plany",
      "order.subtag":"Subskrybuj i oszczędzaj na opakowanie","order.howmany":"Ile opakowań?","order.spec1":"saszetek / opakowanie","order.spec2":"składniki botaniczne i odżywcze","order.spec3":"dodany cukier","order.spec4":"minut, aby poczuć efekty",
      "order.p1sub":"30 saszetek · wypróbuj przez miesiąc","order.p2sub":"90 saszetek · najpopularniejsze, zapas na 3 miesiące","order.p3sub":"1 opakowanie miesięcznie · anuluj w dowolnym momencie","order.best":"NAJLEPSZA WARTOŚĆ","order.freeship":"BEZPŁATNA DOSTAWA","order.cta":"Zamów przez WhatsApp","order.p3save":"Oszczędzaj więcej","order.poa":"Cena na zapytanie",
      "sc.cap1.eyebrow":"Aktywny styl życia · Codzienna wydajność · Nowoczesna witalność","sc.cap1.line1":"Naładuj się.","sc.cap1.line2":"Skupienie. Działanie.",
      "sc.cap2.line1":"Jedna saszetka 10&nbsp;g.","sc.cap2.line2":"Cała potrzebna&nbsp;moc.","sc.cap2.sub":"Triple Force Tongkat Ali + składniki botaniczne i aminokwasy — energia, skupienie i pewność siebie w ~30 minut.",
      "sc.cap3.eyebrow":"HALAL · GMP · Wyprodukowano w Malezji","sc.cap3.line1":"Gotowy poczuć","sc.cap3.line2":"różnicę?",
      "brand.h2a":"Wszechświat siły,","brand.h2b":"maksymalny efekt."
    },
    nl: {
      "announce":"Gratis verzending bij je eerste doos · WhatsApp-reactie op dezelfde dag · Abonneer en bespaar · HALAL- en GMP-gecertificeerd · Gemaakt in Maleisië",
      "nav.benefits":"Voordelen","nav.formula":"Formule","nav.trust":"Certificaten","nav.research":"Onderzoek","nav.faq":"Veelgestelde vragen",
      "cta.order":"Bestellen via WhatsApp","cta.explore":"Ontdek de formule",
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
      "faq.eyebrow":"Goed om te weten","faq.h2":"Veelgestelde vragen","faq.asideT":"Nog vragen?","faq.asideP":"Stuur ons een bericht op WhatsApp en ons team helpt je het juiste plan te vinden.","faq.asideCta":"Chat met Jack",
      "cta.h2a":"Laad je dag op —","cta.h2b":"bestel Uni Max via WhatsApp.","cta.p":"Geen ingewikkeld afrekenproces. Stuur ons een bericht en we regelen je eerste doos en bezorging.","cta.sub":"+60 10-200 5803 · Contact: Jack",
      "foot.about":"Universum van kracht, maximale impact. Een botanische vitaaldrank met lychee-smaak en Triple Force Tongkat Ali, van UniPro.",
      "foot.explore":"Verkennen","foot.product":"Product","foot.p1":"10 g × 30 sachets","foot.p2":"Gebruiksklaar","foot.p3":"Botanische lychee","foot.p4":"HALAL-gecertificeerd","foot.contact":"Contact","foot.jack":"Vraag het Jack",
      "foot.disclaimer":"Dit product is een voedingssupplement en is niet bedoeld om ziekten te diagnosticeren, behandelen, genezen of voorkomen. De informatie op deze website heeft betrekking op algemene gezondheid en de structurele en functionele eigenschappen van afzonderlijke ingrediënten, en vervangt geen professioneel medisch advies. Raadpleeg een zorgverlener voor gebruik, met name als u zwanger bent, borstvoeding geeft, medicijnen gebruikt of gezondheidsproblemen heeft. Buiten bereik van kinderen bewaren. Niet aanbevolen voor personen onder de 18 jaar.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Alle rechten voorbehouden.","foot.made":"Geproduceerd in Maleisië door Orient Biotech Sdn Bhd.",
      "nav.order":"Prijzen","cta.seeplans":"Bekijk plannen en prijzen",
      "why.eyebrow":"Waarom overstappen","why.h2a":"Stop met achterna lopen van","why.h2b":"die middagdip.",
      "why.oldtag":"De gebruikelijke aanpak","why.oldt":"Koffie, suikerrijke energiedrankjes en een handvol pillen",
      "why.o1":"Eerst een piek, daarna een nog grotere dip in de middag","why.o2":"Vol met suiker en synthetische stimulantia","why.o3":"Alleen op energie gericht — uithoudingsvermogen, focus en bloedsomloop worden genegeerd","why.o4":"Meerdere drankjes, brouwsels of pillen per dag",
      "why.newtag":"De UNI MAX aanpak","why.newt":"Eén sachet 10 g botanisch drankje per dag",
      "why.n1":"Vloeiende plantenenergie van guarana — stabiel, geen pieken","why.n2":"Zonder toegevoegde suiker, licht gezoet, echte lychee-smaak","why.n3":"Ondersteunt energie, uithoudingsvermogen, focus, bloedsomloop en stressbestendigheid","why.n4":"Openscheuren, drinken, gaan — klaar in seconden, geen brouwen",
      "order.eyebrow":"Kies jouw doos","order.h2a":"Kies je plan,","order.h2b":"morgen vol energie",
      "order.sub":"Geen ingewikkeld afrekenproces. Kies een plan, stuur één WhatsApp-bericht en we bevestigen je bestelling en bezorging op dezelfde dag.",
      "order.p1name":"Eén doos","order.p1tag":"Probeer het een maand","order.perbox":"/ doos","order.p1day":"30 gebruiksklare sachets",
      "order.p1f1":"30 gebruiksklare sachets","order.p1f2":"WhatsApp-ondersteuning op dezelfde dag","order.p1f3":"Standaard bezorging","order.p1cta":"Bestel één doos",
      "order.popular":"Meest populair · beste waarde","order.p2name":"3-doospakket","order.p2tag":"3 maanden dagelijkse vitaliteit","order.perbundle":"/ 3 dozen",
      "order.p2save":"Meer besparing","order.p2day":"· voorraad voor 3 maanden","order.p2f1":"90 sachets","order.p2f2":"Gratis verzending voor het hele pakket","order.p2f3":"Prioritaire WhatsApp-ondersteuning","order.p2cta":"Bestel pakket",
      "order.p3name":"Abonneren en besparen","order.p3tag":"1 doos per maand","order.p3day":"Laagste prijs · op elk moment annuleren",
      "order.p3f1":"30 sachets maandelijks bezorgd","order.p3f2":"Gratis verzending elke maand","order.p3f3":"Pauzeer of annuleer op elk moment","order.p3cta":"Abonnement starten",
      "order.a1":"Gratis bezorging eerste doos","order.a2":"WhatsApp-reactie op dezelfde dag","order.a3":"HALAL- en GMP-gecertificeerde faciliteit","order.a4":"Niet tevreden? Stuur ons gewoon een bericht",
      "sticky.from":"Klaar om je dag op te laden?","sticky.sub":"Gratis bezorging eerste doos","sticky.cta":"Bekijk plannen",
      "order.subtag":"Abonneer en bespaar per doos","order.howmany":"Hoeveel dozen?","order.spec1":"sachets / doos","order.spec2":"botanische ingrediënten en nutriënten","order.spec3":"toegevoegde suiker","order.spec4":"minuten om effect te voelen",
      "order.p1sub":"30 sachets · probeer een maand","order.p2sub":"90 sachets · meest populair, voorraad voor 3 maanden","order.p3sub":"1 doos per maand · op elk moment annuleren","order.best":"BESTE WAARDE","order.freeship":"GRATIS VERZENDING","order.cta":"Bestellen via WhatsApp","order.p3save":"Bespaar meer","order.poa":"Prijs op aanvraag",
      "sc.cap1.eyebrow":"Actieve levensstijl · Dagelijkse prestaties · Moderne vitaliteit","sc.cap1.line1":"Opladen.","sc.cap1.line2":"Focus. Presteren.",
      "sc.cap2.line1":"Eén sachet van 10 g.","sc.cap2.line2":"Alle kracht die je nodig hebt.","sc.cap2.sub":"Triple Force Tongkat Ali + botanische ingrediënten en aminozuren — energie, focus en zelfvertrouwen in ~30 minuten.",
      "sc.cap3.eyebrow":"HALAL · GMP · Gemaakt in Maleisië","sc.cap3.line1":"Klaar om het","sc.cap3.line2":"verschil te voelen?",
      "brand.h2a":"Universum van kracht,","brand.h2b":"maximale impact."
    },
    de: {
      "announce":"Kostenloser Versand für Ihre erste Box · WhatsApp-Antwort am selben Tag · Abonnieren & sparen · HALAL & GMP zertifiziert · Hergestellt in Malaysia",
      "nav.benefits":"Vorteile","nav.formula":"Formel","nav.trust":"Zertifikate","nav.research":"Forschung","nav.faq":"Häufige Fragen",
      "cta.order":"Auf WhatsApp bestellen","cta.explore":"Formel entdecken",
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
      "faq.eyebrow":"Gut zu wissen","faq.h2":"Häufig gestellte Fragen","faq.asideT":"Noch Fragen?","faq.asideP":"Schreiben Sie uns auf WhatsApp und unser Team hilft Ihnen, den richtigen Plan zu finden.","faq.asideCta":"Mit Jack chatten",
      "cta.h2a":"Laden Sie Ihren Tag auf —","cta.h2b":"bestellen Sie Uni Max auf WhatsApp.","cta.p":"Kein komplizierter Checkout. Schreiben Sie uns direkt und wir organisieren Ihre erste Box und Lieferung.","cta.sub":"+60 10-200 5803 · Kontakt: Jack",
      "foot.about":"Universum der Kraft, maximale Wirkung. Ein botanisches Lychee-Vitalitätsgetränk mit Triple Force Tongkat Ali von UniPro.",
      "foot.explore":"Entdecken","foot.product":"Produkt","foot.p1":"10 g × 30 Sachets","foot.p2":"Trinkfertig","foot.p3":"Botanisches Lychee","foot.p4":"HALAL-zertifiziert","foot.contact":"Kontakt","foot.jack":"Jack fragen",
      "foot.disclaimer":"Dieses Produkt ist ein Nahrungsergänzungsmittel und ist nicht zur Diagnose, Behandlung, Heilung oder Vorbeugung von Krankheiten bestimmt. Die Informationen auf dieser Website beziehen sich auf die allgemeine Gesundheit und die strukturellen und funktionellen Eigenschaften einzelner Inhaltsstoffe und ersetzen keine professionelle medizinische Beratung. Konsultieren Sie vor der Einnahme einen Arzt, insbesondere wenn Sie schwanger sind, stillen, Medikamente nehmen oder an gesundheitlichen Problemen leiden. Außerhalb der Reichweite von Kindern aufbewahren. Nicht empfohlen für Personen unter 18 Jahren.",
      "foot.copy":"© 2026 UniPro · UNI MAX. Alle Rechte vorbehalten.","foot.made":"Hergestellt in Malaysia von Orient Biotech Sdn Bhd.",
      "nav.order":"Preise","cta.seeplans":"Pläne & Preise ansehen",
      "why.eyebrow":"Warum wechseln","why.h2a":"Hören Sie auf, dem","why.h2b":"Nachmittagstief nachzujagen.",
      "why.oldtag":"Die übliche Methode","why.oldt":"Kaffee, zuckerreiche Energydrinks & eine Handvoll Pillen",
      "why.o1":"Erst ein Hochschnellen, dann ein noch stärkerer Einbruch am Nachmittag","why.o2":"Voller Zucker und synthetischer Stimulanzien","why.o3":"Nur auf Energie ausgerichtet — Ausdauer, Fokus & Kreislauf werden ignoriert","why.o4":"Mehrere Getränke, Brühungen oder Pillen täglich",
      "why.newtag":"Der UNI MAX Ansatz","why.newt":"Ein 10-g-Sachet Pflanzengetränk täglich",
      "why.n1":"Sanfte pflanzliche Energie aus Guarana — stabil, kein Hochschnellen","why.n2":"Ohne zugesetzten Zucker, leicht gesüßt, echter Lychee-Geschmack","why.n3":"Unterstützt Energie, Ausdauer, Fokus, Kreislauf & Stressresistenz","why.n4":"Aufreißen, trinken, los — fertig in Sekunden, kein Brühen",
      "order.eyebrow":"Wählen Sie Ihre Box","order.h2a":"Wählen Sie Ihren Plan,","order.h2b":"morgen voller Energie",
      "order.sub":"Kein komplizierter Checkout. Wählen Sie einen Plan, senden Sie eine WhatsApp-Nachricht und wir bestätigen Ihre Bestellung und Lieferung am selben Tag.",
      "order.p1name":"Eine Box","order.p1tag":"Einen Monat ausprobieren","order.perbox":"/ Box","order.p1day":"30 trinkfertige Sachets",
      "order.p1f1":"30 trinkfertige Sachets","order.p1f2":"WhatsApp-Support am selben Tag","order.p1f3":"Standardversand","order.p1cta":"Eine Box bestellen",
      "order.popular":"Beliebteste · bestes Preis-Leistungs-Verhältnis","order.p2name":"3-Box-Paket","order.p2tag":"3 Monate tägliche Vitalität","order.perbundle":"/ 3 Boxen",
      "order.p2save":"Mehr sparen","order.p2day":"· Vorrat für 3 Monate","order.p2f1":"90 Sachets","order.p2f2":"Kostenloser Versand für das gesamte Paket","order.p2f3":"Priorisierter WhatsApp-Support","order.p2cta":"Paket bestellen",
      "order.p3name":"Abonnieren & sparen","order.p3tag":"1 Box pro Monat","order.p3day":"Günstigster Preis · jederzeit kündbar",
      "order.p3f1":"30 Sachets monatlich geliefert","order.p3f2":"Kostenloser Versand jeden Monat","order.p3f3":"Jederzeit pausieren oder kündigen","order.p3cta":"Abonnement starten",
      "order.a1":"Kostenloser Versand der ersten Box","order.a2":"WhatsApp-Antwort am selben Tag","order.a3":"HALAL- & GMP-zertifizierte Anlage","order.a4":"Nicht zufrieden? Schreiben Sie uns einfach",
      "sticky.from":"Bereit, Ihren Tag aufzuladen?","sticky.sub":"Kostenloser Versand der ersten Box","sticky.cta":"Pläne ansehen",
      "order.subtag":"Abonnieren & pro Box sparen","order.howmany":"Wie viele Boxen?","order.spec1":"Sachets / Box","order.spec2":"botanische Inhaltsstoffe & Nährstoffe","order.spec3":"zugesetzter Zucker","order.spec4":"Minuten bis zur Wirkung",
      "order.p1sub":"30 Sachets · einen Monat ausprobieren","order.p2sub":"90 Sachets · beliebteste, Vorrat für 3 Monate","order.p3sub":"1 Box pro Monat · jederzeit kündbar","order.best":"BESTES PREIS-LEISTUNGS-VERHÄLTNIS","order.freeship":"KOSTENLOSER VERSAND","order.cta":"Auf WhatsApp bestellen","order.p3save":"Mehr sparen","order.poa":"Preis auf Anfrage",
      "sc.cap1.eyebrow":"Aktiver Lebensstil · Tägliche Leistung · Moderne Vitalität","sc.cap1.line1":"Aufladen.","sc.cap1.line2":"Fokus. Leisten.",
      "sc.cap2.line1":"Ein 10-g-Sachet.","sc.cap2.line2":"Alle Kraft, die Sie brauchen.","sc.cap2.sub":"Triple Force Tongkat Ali + botanische Inhaltsstoffe & Aminosäuren — Energie, Fokus & Selbstvertrauen in ~30 Minuten.",
      "sc.cap3.eyebrow":"HALAL · GMP · Hergestellt in Malaysia","sc.cap3.line1":"Bereit, den","sc.cap3.line2":"Unterschied zu spüren?",
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

    /* order pack selector */
    var PACKS = {
      single: { price: "€33",    msg: "1 box of UNI MAX (30 sachets)" },
      bundle: { price: "€84",    msg: "the UNI MAX 3-Box Bundle (90 sachets)" },
      sub:    { price: "€28/mo", msg: "a monthly UNI MAX subscription" }
    };
    var packEls = document.querySelectorAll('#packs input[name="pack"]');
    var orderCta = document.getElementById("orderCta");
    var orderCtaPrice = document.getElementById("orderCtaPrice");
    function syncPacks() {
      packEls.forEach(function (inp) { inp.closest(".pack").classList.toggle("selected", inp.checked); });
      var sel = document.querySelector('#packs input[name="pack"]:checked');
      if (sel && orderCta) {
        var p = PACKS[sel.value];
        if (orderCtaPrice) orderCtaPrice.textContent = p.price;
        orderCta.href = "https://wa.me/60102005803?text=" + encodeURIComponent("Hi Jack, I'd like to order " + p.msg + ".");
      }
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
