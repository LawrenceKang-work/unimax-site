/* =============================================================
   UNI MAX · 客改层 (Client Revision Layer) v3
   -------------------------------------------------------------
   两个独立入口（两种模式，互斥）：
   ✏️ 编辑模式 —— 客户直接改：点文字打字、点图/视频/背景图替换，
                  改动自动存本机，导出清单发我们。
   💬 留言模式 —— 客户逐处评审（以板块为主）：整页 / 板块 / 单元素
                  三级选择，每处标 ✓满意 · ✎要改 · 🗑不要 + 留言。
   融合来源：UniMax v2（满意/要改/不要、板块反馈、提示条、导出）
           + Infibooth live-edit（双按钮互斥、elementsFromPoint 穿透
             遮罩点中媒体、编辑时拦截站点跳转、密钥记住设备）。
   授权：?edit=<密钥> 打开一次 → 本机记住；无密钥者看不到任何入口。
   数据：只存客户浏览器 localStorage，不改线上真实内容。
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 0. 密钥门禁（打开过一次后本机记住） ---------- */
  var EDIT_KEY = "unimax-2026";               // ← 换口令改这里
  var TKEY = "fbedit_unimax";
  var urlKey = new URLSearchParams(location.search).get("edit") || location.hash.replace(/^#/, "");
  if (urlKey === EDIT_KEY) { try { localStorage.setItem(TKEY, urlKey); } catch (e) { } }
  var stored = ""; try { stored = localStorage.getItem(TKEY) || ""; } catch (e) { }
  if (urlKey !== EDIT_KEY && stored !== EDIT_KEY) return;

  /* ---------- 状态 ---------- */
  var LS_ED = "unimax_edits_v2";      // 编辑模式改动 {text:{},images:{},videos:{},bgs:{}}
  var LS_FB = "unimax_feedback_v1";   // 留言模式记录 [ {target,status,comment,...} ]
  var FB_API = "https://tablesites-feedback-api.pages.dev/api/feedback";
  var FB_CLIENT = "unimax";
  var mode = null;                    // null | 'edit' | 'fb'
  var fbTarget = null, mediaTarget = null, applying = false;
  var edits = loadEdits(), feedback = loadFb();
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if (document.readyState !== "loading") setTimeout(init, 0);
  else document.addEventListener("DOMContentLoaded", init);

  function init() {
    annotate();
    baseline();
    injectStyles();
    buildUI();
    bindEvents();
    applyEdits();
    applyFbPreviews();
    watchLang();
  }

  /* ---------- 1. 自动标注（板块 / 文字 / 图 / 视频 / CSS背景图） ---------- */
  function annotate() {
    // 板块
    $$("header.header, main section, footer.footer").forEach(function (sec, i) {
      if (!sec.hasAttribute("data-fb-block")) {
        sec.setAttribute("data-fb-block", sec.id || ("sec" + i));
        var l = sec.querySelector(".eyebrow, h1, h2, h5");
        sec.setAttribute("data-fb-label", ((l ? l.textContent.trim().replace(/\s+/g, " ") : "").slice(0, 22)) || sec.id || ("板块" + (i + 1)));
      }
    });
    // 文字（复用 data-i18n 作 key）
    $$("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-fb-el")) return;
      el.setAttribute("data-fb-el", "text");
      el.setAttribute("data-fb-key", el.getAttribute("data-i18n"));
      el.setAttribute("data-fb-ellabel", (el.textContent.trim().replace(/\s+/g, " ").slice(0, 20)) || el.getAttribute("data-i18n"));
    });
    // 内容图片
    $$("img").forEach(function (img) {
      if (!editableImg(img) || img.hasAttribute("data-fb-el")) return;
      var base = baseName(img.getAttribute("src") || ""); if (!base) return;
      img.setAttribute("data-fb-el", "image");
      img.setAttribute("data-fb-key", base);
      img.setAttribute("data-fb-ellabel", (img.getAttribute("alt") || base).slice(0, 22));
      var p = img.parentElement; if (p && !p.hasAttribute("data-fb-imgparent")) p.setAttribute("data-fb-imgparent", base);
    });
    // 视频（如首屏背景视频）
    $$("video").forEach(function (v) {
      if (v.hasAttribute("data-fb-el")) return;
      var src = v.getAttribute("src") || (v.querySelector("source") ? v.querySelector("source").getAttribute("src") : "");
      var base = baseName(src || "") || ("video" + Math.floor(Math.random() * 0)); if (!src) return;
      v.setAttribute("data-fb-el", "video");
      v.setAttribute("data-fb-key", base);
      v.setAttribute("data-fb-ellabel", "背景视频 " + base);
    });
    // CSS 背景图板块（::before / 自身 background-image 用了 assets 图的）
    $$("main section").forEach(function (sec) {
      if (sec.hasAttribute("data-fb-bg")) return;
      ["::before", ""].forEach(function (pseudo) {
        if (sec.hasAttribute("data-fb-bg")) return;
        var bg = getComputedStyle(sec, pseudo || null).backgroundImage || "";
        var m = bg.match(/url\(["']?([^"')]+)["']?\)/);
        if (m && m[1].indexOf("data:") !== 0 && /assets\//.test(m[1])) {
          sec.setAttribute("data-fb-bg", baseName(m[1]));
          sec.setAttribute("data-fb-bgsel", "#" + sec.id + (pseudo || ""));
          sec.setAttribute("data-fb-bgurl", m[1]);
        }
      });
    });
  }
  function editableImg(img) {
    var src = img.getAttribute("src") || "";
    if (/logo-wa|logo-dark/.test(src)) return false;
    if (img.classList.contains("wa") || img.classList.contains("logo-img")) return false;
    if (img.id === "lbImg" || img.closest("#lightbox")) return false;
    return true;
  }
  function baseName(src) { var f = (src || "").split("?")[0].split("/").pop() || ""; return f.replace(/\.[a-z0-9]+$/i, ""); }
  function baseline() {
    $$("[data-fb-el]").forEach(function (el) {
      el._orig = (el.dataset.fbEl === "image" || el.dataset.fbEl === "video") ? el.getAttribute("src") : el.textContent;
    });
  }

  /* ---------- 2. 存取 ---------- */
  function loadEdits() { try { var o = JSON.parse(localStorage.getItem(LS_ED) || "{}"); return { text: o.text || {}, images: o.images || {}, videos: o.videos || {}, bgs: o.bgs || {} }; } catch (e) { return { text: {}, images: {}, videos: {}, bgs: {} }; } }
  function saveEdits() { try { localStorage.setItem(LS_ED, JSON.stringify(edits)); } catch (e) { toast("存储空间不足：上传图片太大，请改用图片链接"); } }
  function loadFb() { try { return JSON.parse(localStorage.getItem(LS_FB) || "[]"); } catch (e) { return []; } }
  function saveFb() { try { localStorage.setItem(LS_FB, JSON.stringify(feedback)); } catch (e) { } }
  function fbRecKey(t) { return t.target === "element" ? "el:" + t.key : t.target === "page" ? "page" : "block:" + t.block_id; }
  function fbPost(rec) {
    var payload = { client_id: FB_CLIENT, token: EDIT_KEY, page: rec.page, target: rec.target, block_id: rec.block_id, block_label: rec.block_label, el_key: rec.key, el_type: rec.el_type, el_label: rec.el_label, status: rec.status, change_types: rec.change_types, comment: rec.comment, new_text: rec.new_text, new_image_url: (rec.new_image_url && rec.new_image_url.indexOf("data:") === 0) ? "(uploaded image, pending storage)" : rec.new_image_url, new_btn_text: rec.new_btn_text, new_btn_url: rec.new_btn_url };
    try { fetch(FB_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(function () { }); } catch (e) { }
  }

  /* ---------- 3. 应用改动（含 i18n 兼容联动） ---------- */
  function setText(key, val) { $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { if (el.dataset.fbEl === "text") { if (el.textContent !== val) el.textContent = val; el.setAttribute("data-en", val); } }); }
  function setImg(key, val) { $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { if (el.dataset.fbEl === "image") el.setAttribute("src", val); }); }
  function setVid(key, val) { $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { if (el.dataset.fbEl === "video") { el.setAttribute("src", val); try { el.load(); if (el.autoplay) el.play().catch(function () { }); } catch (e) { } } }); }
  function applyBgs() {
    var css = "";
    Object.keys(edits.bgs).forEach(function (sel) { css += sel + '{background-image:url("' + edits.bgs[sel] + '")!important}'; });
    var st = $("#ce-bg-overrides");
    if (!st) { st = document.createElement("style"); st.id = "ce-bg-overrides"; document.head.appendChild(st); }
    st.textContent = css;
  }
  function applyEdits() {
    applying = true;
    Object.keys(edits.text).forEach(function (k) { setText(k, edits.text[k]); });
    Object.keys(edits.images).forEach(function (k) { setImg(k, edits.images[k]); });
    Object.keys(edits.videos).forEach(function (k) { setVid(k, edits.videos[k]); });
    applyBgs();
    applying = false;
  }
  function applyFbPreviews() {
    applying = true;
    feedback.filter(function (d) { return d.target === "element" && d.status === "change"; }).forEach(function (d) {
      if (edits.text[d.key] != null || edits.images[d.key] != null) return; // 编辑模式的改动优先
      if (d.el_type === "text" && d.new_text) setText(d.key, d.new_text);
      else if (d.el_type === "image" && d.new_image_url) setImg(d.key, d.new_image_url);
      else if (d.el_type === "button" && d.new_btn_text) setText(d.key, d.new_btn_text);
    });
    applying = false;
  }
  function watchLang() {
    $$("#langBtn, #langMenu button, [data-drawer-lang], #footLangBtn, #footLangMenu button").forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(function () { applyEdits(); applyFbPreviews(); }, 60); });
    });
    if ("MutationObserver" in window) {
      new MutationObserver(function () {
        if (applying || mode === "edit") return;
        var dirty = Object.keys(edits.text).some(function (k) { var el = $('[data-fb-key="' + cssEsc(k) + '"]'); return el && el.textContent !== edits.text[k]; });
        if (dirty) { applyEdits(); applyFbPreviews(); }
      }).observe(document.body, { subtree: true, childList: true, characterData: true });
    }
  }

  /* ---------- 4. 模式切换（互斥） ---------- */
  function setMode(m) {
    if (mode === m) m = null;
    // 清理旧模式
    document.body.classList.remove("ce-edit", "fb-on");
    $$('[data-fb-el="text"]').forEach(function (el) { el.removeAttribute("contenteditable"); });
    $("#fbPanel").classList.remove("on"); $("#ceModal").classList.remove("on"); $("#ceExportModal").classList.remove("on");
    mode = m;
    if (mode === "edit") {
      document.body.classList.add("ce-edit");
      $$('[data-fb-el="text"]').forEach(function (el) { el.setAttribute("contenteditable", "true"); });
    } else if (mode === "fb") {
      document.body.classList.add("fb-on");
    }
    $("#ceEditBtn").innerHTML = mode === "edit" ? "✕&nbsp; 退出编辑" : "✏️&nbsp; 编辑";
    $("#ceFbBtn").innerHTML = mode === "fb" ? "✕&nbsp; 退出留言" : "💬&nbsp; 留言";
    $("#ceEditBtn").classList.toggle("on", mode === "edit");
    $("#ceFbBtn").classList.toggle("on", mode === "fb");
    $("#ceExportBtn").style.display = mode ? "inline-flex" : "none";
    $("#ceResetBtn").style.display = mode === "edit" ? "inline-flex" : "none";
    $("#cePageBtn").style.display = mode === "fb" ? "inline-flex" : "none";
    $("#ceHintEdit").style.display = (mode === "edit" && !sessionStorage.getItem("ceHintEditX")) ? "block" : "none";
    $("#ceHintFb").style.display = (mode === "fb" && !sessionStorage.getItem("ceHintFbX")) ? "block" : "none";
    document.body.classList.toggle("ce-pad", !!mode && !!((mode === "edit" && !sessionStorage.getItem("ceHintEditX")) || (mode === "fb" && !sessionStorage.getItem("ceHintFbX"))));
    fbRenderMarks(); fbRenderList();
  }

  /* ---------- 5. 编辑模式：文字直改 ---------- */
  document.addEventListener("input", function (e) {
    if (mode !== "edit") return;
    var el = e.target.closest && e.target.closest('[data-fb-el="text"]');
    if (!el) return;
    var k = el.getAttribute("data-fb-key"), v = el.textContent;
    if (v === el._orig) delete edits.text[k]; else edits.text[k] = v;
    el.classList.toggle("ce-dirty", v !== el._orig);
    applying = true;
    $$('[data-fb-key="' + cssEsc(k) + '"]').forEach(function (o) { if (o !== el && o.textContent !== v) o.textContent = v; o.setAttribute("data-en", v); });
    applying = false;
    saveEdits();
  });
  document.addEventListener("keydown", function (e) {
    if (mode !== "edit" || e.key !== "Enter") return;
    var el = e.target.closest && e.target.closest('[data-fb-el="text"]');
    if (el && !el.matches("p,li")) { e.preventDefault(); el.blur(); }
  });

  /* ---------- 6. 统一点击委派（capture） ---------- */
  var UI_SEL = ".ce-ui";
  function hitMedia(x, y) {
    // elementsFromPoint 穿透遮罩；再补找 pointer-events:none 的媒体（背景视频/装饰图）
    var stack = document.elementsFromPoint(x, y);
    var inBox = function (m) { var b = m.getBoundingClientRect(); return b.width > 4 && b.height > 4 && x >= b.left && x <= b.right && y >= b.top && y <= b.bottom; };
    for (var i = 0; i < stack.length; i++) {
      var el = stack[i];
      if (el === document.body || el === document.documentElement) break;
      if (el.matches && el.matches('[data-fb-el="image"],[data-fb-el="video"]')) return el;
      if (el.querySelectorAll) {
        var ghost = $$('img[data-fb-el],video[data-fb-el]', el).filter(function (m) { return inBox(m) && getComputedStyle(m).pointerEvents === "none"; })[0];
        if (ghost) return ghost;
      }
    }
    return null;
  }
  document.addEventListener("click", function (e) {
    if (!mode) return;
    if (e.target.closest(UI_SEL)) return;              // 挂件自身 UI 放行
    if (mode === "edit") {
      var media = hitMedia(e.clientX, e.clientY);
      if (media) { e.preventDefault(); e.stopPropagation(); openMediaModal(media.dataset.fbEl, media.dataset.fbKey, media.dataset.fbEllabel); return; }
      var txt = e.target.closest('[data-fb-el="text"]');
      if (txt) { if (txt.closest("a[href]")) e.preventDefault(); e.stopPropagation(); return; }  // 保留光标，掐掉跳转
      var bgSec = e.target.closest("[data-fb-bg]");
      if (bgSec) { e.preventDefault(); e.stopPropagation(); openMediaModal("bg", bgSec.getAttribute("data-fb-bgsel"), "背景图 " + bgSec.getAttribute("data-fb-bg")); return; }
      if (e.target.closest("a[href]")) e.preventDefault();
      e.stopPropagation();                              // 编辑时暂停站点自身跳转/弹窗
    } else if (mode === "fb") {
      var el2 = e.target.closest("[data-fb-el]");
      if (!el2) { var ip = e.target.closest("[data-fb-imgparent]"); if (ip) el2 = ip.querySelector('img[data-fb-el="image"]'); }
      if (!el2) el2 = hitMedia(e.clientX, e.clientY);
      var block = e.target.closest("[data-fb-block]");
      if (el2 && block) { e.preventDefault(); e.stopPropagation(); fbOpen("element", el2, block); }
      else if (block) { e.preventDefault(); e.stopPropagation(); fbOpen("block", null, block); }
    }
  }, true);

  /* ---------- 7. 换媒体弹窗（图 / 视频 / 背景图共用） ---------- */
  function openMediaModal(type, key, label) {
    mediaTarget = { type: type, key: key };
    $("#ceMTitle").textContent = type === "video" ? "换视频" : type === "bg" ? "换背景图" : "换图片";
    $("#ceMLabel").textContent = label || key;
    $("#ceMNote").textContent = type === "video" ? "请粘贴视频链接（mp4/webm）。视频文件较大，也可以直接把文件发给我们。" : "从设备选图（≤1.5MB），或粘贴图片链接。";
    $("#ceMFile").style.display = type === "video" ? "none" : "block";
    $("#ceMImgPrev").style.display = "none"; $("#ceMVidPrev").style.display = "none";
    $("#ceMUrl").value = ""; $("#ceMFile").value = "";
    $("#ceModal").classList.add("on");
  }
  function showMPrev(url) {
    if (mediaTarget && mediaTarget.type === "video") { var v = $("#ceMVidPrev"); v.src = url; v.style.display = "block"; $("#ceMImgPrev").style.display = "none"; }
    else { var i = $("#ceMImgPrev"); i.src = url; i.style.display = "block"; $("#ceMVidPrev").style.display = "none"; }
  }
  function applyMedia() {
    if (!mediaTarget) return;
    var url = $("#ceMUrl").value.trim() || (($("#ceMImgPrev").src || "").indexOf("data:") === 0 ? $("#ceMImgPrev").src : "");
    if (!url) { toast("先选图或贴链接"); return; }
    if (mediaTarget.type === "image") { edits.images[mediaTarget.key] = url; setImg(mediaTarget.key, url); }
    else if (mediaTarget.type === "video") { edits.videos[mediaTarget.key] = url; setVid(mediaTarget.key, url); }
    else if (mediaTarget.type === "bg") { edits.bgs[mediaTarget.key] = url; applyBgs(); }
    saveEdits();
    $("#ceModal").classList.remove("on");
    toast("已替换（只在你这台设备预览）");
  }

  /* ---------- 8. 留言模式（整页 / 板块 / 元素） ---------- */
  function fbOpen(target, el, block) {
    fbTarget = target === "page"
      ? { target: "page", block_id: "__page", block_label: "整个页面", key: null, el_type: null, el_label: null, _el: null }
      : { target: target, block_id: block.dataset.fbBlock, block_label: block.dataset.fbLabel, key: el ? el.dataset.fbKey : null, el_type: el ? el.dataset.fbEl : null, el_label: el ? el.dataset.fbEllabel : null, _el: el };
    $("#fbpBlk").textContent = target === "element" ? (fbTarget.el_label || fbTarget.key) : fbTarget.block_label;
    $("#fbpScope").textContent = target === "element" ? ("元素 · " + ({ text: "文字", image: "图片", video: "视频", button: "按钮" }[fbTarget.el_type] || fbTarget.el_type) + " · 属于「" + fbTarget.block_label + "」") : target === "page" ? "整个页面" : "整个板块";
    $("#fbpScope").className = "scope " + (target === "element" ? "el" : "block");

    $$("input[name=fbStatus]").forEach(function (i) { i.checked = false; });
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    $("#fbNewText").value = ""; $("#fbComment").value = ""; $("#fbImgUrl").value = ""; $("#fbImgFile").value = "";
    $("#fbImgPreview").style.display = "none";
    $$(".fb-types input").forEach(function (i) { i.checked = false; });

    var rec = feedback.find(function (d) { return fbRecKey(d) === fbRecKey(fbTarget); });
    if (rec) {
      $("#fbpCur").textContent = "当前：" + (rec.status === "satisfied" ? "已定稿" : rec.status === "remove" ? "标记为不要" : "待改");
      var r = $('input[name=fbStatus][value="' + rec.status + '"]'); if (r) r.checked = true;
      fbApplyStatus(rec.status);
      if (rec.new_text) $("#fbNewText").value = rec.new_text;
      if (rec.comment) $("#fbComment").value = rec.comment;
      if (rec.new_image_url) $("#fbImgUrl").value = rec.new_image_url;
      (rec.change_types || []).forEach(function (t) { var i = $$(".fb-types input").find(function (x) { return x.value === t; }); if (i) i.checked = true; });
    } else $("#fbpCur").textContent = "还没填过";
    $("#fbPanel").classList.add("on");
  }
  function fbApplyStatus(status) {
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    $("#fbSecComment").classList.add("on");
    $("#fbCommentLabel").textContent = status === "remove" ? "为什么不要这块？（可选）" : status === "satisfied" ? "想补一句？（可选）" : "补充说明（可选）";
    if (status === "change") {
      if (fbTarget.target === "element") {
        if (fbTarget.el_type === "text") $("#fbSecText").classList.add("on");
        else if (fbTarget.el_type === "image") $("#fbSecImage").classList.add("on");
      } else $("#fbSecBlock").classList.add("on");
    }
  }
  function fbSubmit() {
    if (!fbTarget) return;
    var status = ($("input[name=fbStatus]:checked") || {}).value;
    if (!status) { alert("先选 满意 / 要修改 / 不要这块"); return; }
    var rec = { target: fbTarget.target, block_id: fbTarget.block_id, block_label: fbTarget.block_label, key: fbTarget.key, el_type: fbTarget.el_type, el_label: fbTarget.el_label, status: status, page: "home", ts: new Date().toISOString(), comment: $("#fbComment").value.trim() };
    if (status === "change") {
      if (fbTarget.target === "element") {
        if (fbTarget.el_type === "text") rec.new_text = $("#fbNewText").value.trim();
        else if (fbTarget.el_type === "image") rec.new_image_url = $("#fbImgUrl").value.trim() || ($("#fbImgPreview").src.indexOf("data:") === 0 ? $("#fbImgPreview").src : "");
      } else rec.change_types = $$(".fb-types input:checked").map(function (i) { return i.value; });
    }
    feedback = feedback.filter(function (d) { return fbRecKey(d) !== fbRecKey(fbTarget); });
    feedback.push(rec); saveFb(); fbPost(rec);
    $("#fbPanel").classList.remove("on"); fbTarget = null;
    applyFbPreviews(); fbRenderMarks(); fbRenderList();
    toast("已记录，可继续标其它地方");
  }

  /* ---------- 9. 徽章 / 圆点 / 列表 ---------- */
  function fbRenderMarks() {
    $$(".fb-badge,.fb-eldot").forEach(function (b) { b.remove(); });
    if (mode !== "fb") return;
    feedback.forEach(function (rec) {
      if (rec.target === "block" || rec.target === "page") {
        var sec = rec.target === "page" ? null : $('[data-fb-block="' + cssEsc(rec.block_id) + '"]');
        if (rec.target === "page") return;
        if (!sec) return;
        var r = sec.getBoundingClientRect();
        var b = document.createElement("div");
        b.className = "fb-badge " + (rec.status === "satisfied" ? "done" : rec.status === "remove" ? "remove" : "todo");
        b.textContent = rec.status === "satisfied" ? "✓ 已定稿" : rec.status === "remove" ? "🗑 不要" : "● 待改";
        b.style.left = Math.max(8, r.right + window.scrollX - 96) + "px";
        b.style.top = (r.top + window.scrollY + 10) + "px";
        document.body.appendChild(b);
      } else {
        var el = $('[data-fb-key="' + cssEsc(rec.key) + '"]'); if (!el) return;
        var r2 = el.getBoundingClientRect(); if (!r2.width && !r2.height) return;
        var dot = document.createElement("div");
        dot.className = "fb-eldot " + (rec.status === "satisfied" ? "done" : rec.status === "remove" ? "remove" : "todo");
        dot.textContent = rec.status === "satisfied" ? "✓" : rec.status === "remove" ? "✕" : "!";
        dot.style.left = (r2.left + window.scrollX) + "px";
        dot.style.top = (r2.top + window.scrollY) + "px";
        document.body.appendChild(dot);
      }
    });
  }
  window.addEventListener("scroll", function () { if (mode === "fb") fbRenderMarks(); });
  window.addEventListener("resize", function () { if (mode === "fb") fbRenderMarks(); });

  function fbRenderList() {
    var el = $("#fbList");
    if (mode !== "fb" || !feedback.length) { el.classList.remove("on"); return; }
    el.classList.add("on");
    var sat = feedback.filter(function (d) { return d.status === "satisfied"; }).length;
    var chg = feedback.filter(function (d) { return d.status === "change"; }).length;
    var rmv = feedback.filter(function (d) { return d.status === "remove"; }).length;
    el.innerHTML = "<b>已提交 " + feedback.length + " 条</b>（定稿 " + sat + " · 改 " + chg + " · 删 " + rmv + "）" +
      feedback.map(function (d) {
        var name = d.target === "element" ? (d.block_label + " › " + (d.el_label || d.key)) : d.block_label;
        var ic = d.status === "satisfied" ? "✓" : d.status === "remove" ? "🗑" : "●";
        var detail = "";
        if (d.new_text) detail = "：改文案「" + d.new_text.slice(0, 16) + "」";
        else if (d.new_image_url) detail = "：换图";
        else if (d.change_types && d.change_types.length) detail = "：" + d.change_types.join("/");
        if (d.comment) detail += " 「" + d.comment.slice(0, 14) + "」";
        return '<div class="item">' + ic + " " + esc(name) + esc(detail) + "</div>";
      }).join("");
  }

  /* ---------- 10. 导出清单（编辑改动 + 留言合并） ---------- */
  function summaryText() {
    var lines = ["UNI MAX 网站 · 客户改动清单", "页面：" + location.origin + location.pathname, ""];
    var tKeys = Object.keys(edits.text), iKeys = Object.keys(edits.images), vKeys = Object.keys(edits.videos), bKeys = Object.keys(edits.bgs);
    if (tKeys.length + iKeys.length + vKeys.length + bKeys.length) {
      lines.push("═══ 直接编辑（所见即所得） ═══");
      tKeys.forEach(function (k, n) { var el = $('[data-fb-key="' + cssEsc(k) + '"]'); lines.push((n + 1) + ". [文字 " + k + "]\n   原：" + (el && el._orig || "") + "\n   改：" + edits.text[k]); });
      iKeys.forEach(function (k) { lines.push("· [图 " + k + "] → " + (edits.images[k].indexOf("data:") === 0 ? "已上传本地图片（见随附 JSON）" : edits.images[k])); });
      vKeys.forEach(function (k) { lines.push("· [视频 " + k + "] → " + edits.videos[k]); });
      bKeys.forEach(function (k) { lines.push("· [背景图 " + k + "] → " + (edits.bgs[k].indexOf("data:") === 0 ? "已上传本地图片（见随附 JSON）" : edits.bgs[k])); });
      lines.push("");
    }
    if (feedback.length) {
      lines.push("═══ 留言反馈（逐处评审） ═══");
      var order = { change: 0, remove: 1, satisfied: 2 };
      feedback.slice().sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0); }).forEach(function (d, i) {
        var where = d.target === "element" ? (d.block_label + " › " + (d.el_label || d.key)) : d.target === "page" ? "整个页面" : "整块：" + d.block_label;
        var tag = d.status === "satisfied" ? "✓满意" : d.status === "remove" ? "🗑不要" : "✎要改";
        var s = (i + 1) + ". [" + tag + "] " + where;
        if (d.new_text) s += "\n   新文案：" + d.new_text;
        if (d.new_image_url) s += "\n   换图：" + (d.new_image_url.indexOf("data:") === 0 ? "已上传（见 JSON）" : d.new_image_url);
        if (d.change_types && d.change_types.length) s += "\n   要改：" + d.change_types.join("、");
        if (d.comment) s += "\n   留言：" + d.comment;
        lines.push(s);
      });
    }
    if (lines.length === 3) lines.push("（还没有任何改动或留言）");
    return lines.join("\n");
  }
  function showExport() { $("#ceExportBody").textContent = summaryText(); $("#ceExportModal").classList.add("on"); }
  function copyList() {
    var txt = summaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast("已复制，粘贴发我们即可"); }, function () { fallbackCopy(txt); });
    else fallbackCopy(txt);
  }
  function fallbackCopy(txt) { var ta = document.createElement("textarea"); ta.value = txt; ta.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("已复制"); } catch (e) { toast("复制失败"); } document.body.removeChild(ta); }
  function downloadJSON() {
    var blob = new Blob([JSON.stringify({ site: "unimax", url: location.href, savedAt: new Date().toISOString(), edits: edits, feedback: feedback }, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "unimax-changes.json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("已下载改动文件");
  }
  function resetEdits() {
    if (!confirm("清空「直接编辑」的所有改动、恢复原样？（留言记录保留）")) return;
    edits = { text: {}, images: {}, videos: {}, bgs: {} }; saveEdits();
    $$("[data-fb-el]").forEach(function (el) {
      if (el._orig == null) return;
      if (el.dataset.fbEl === "image") el.setAttribute("src", el._orig);
      else if (el.dataset.fbEl === "video") setVid(el.dataset.fbKey, el._orig);
      else { el.textContent = el._orig; el.setAttribute("data-en", el._orig); }
      el.classList.remove("ce-dirty");
    });
    applyBgs(); toast("已恢复原样");
  }
  function resetAll() {
    if (!confirm("清空全部（编辑改动 + 留言记录）？")) return;
    feedback = []; saveFb(); resetEditsSilent(); fbRenderMarks(); fbRenderList();
    $("#ceExportModal").classList.remove("on"); toast("已全部清空");
  }
  function resetEditsSilent() {
    edits = { text: {}, images: {}, videos: {}, bgs: {} }; saveEdits();
    $$("[data-fb-el]").forEach(function (el) {
      if (el._orig == null) return;
      if (el.dataset.fbEl === "image") el.setAttribute("src", el._orig);
      else if (el.dataset.fbEl === "video") setVid(el.dataset.fbKey, el._orig);
      else { el.textContent = el._orig; el.setAttribute("data-en", el._orig); }
      el.classList.remove("ce-dirty");
    });
    applyBgs();
  }

  /* ---------- 11. UI ---------- */
  function buildUI() {
    var w = document.createElement("div");
    w.className = "ce-ui";
    w.innerHTML =
      '<div id="ceHintEdit" class="ce-hint ce-hint-edit">✏️ 编辑模式 —— 点<b>文字</b>直接改、点<b>图片 / 视频 / 板块背景</b>替换。改动自动保存在你这台设备，改完点「📋 导出清单」发给我们。<span class="ce-hintx" data-x="ceHintEditX">知道了</span></div>' +
      '<div id="ceHintFb" class="ce-hint ce-hint-fb">💬 留言模式 —— 推荐<b>点板块空白处</b>对整块留言；也可点单个文字/图片。每处选 ✓满意 / ✎要改 / 🗑不要，可留言。整页意见点右下「📄 整页留言」。<span class="ce-hintx" data-x="ceHintFbX">知道了</span></div>' +
      '<div class="ce-dock">' +
      '  <button id="cePageBtn" class="ce-btn ce-btn-page">📄&nbsp; 整页留言</button>' +
      '  <button id="ceResetBtn" class="ce-btn ce-btn-ghost">↺ 复位</button>' +
      '  <button id="ceExportBtn" class="ce-btn ce-btn-export">📋&nbsp; 导出清单</button>' +
      '  <button id="ceFbBtn" class="ce-btn ce-btn-fb">💬&nbsp; 留言</button>' +
      '  <button id="ceEditBtn" class="ce-btn ce-btn-edit">✏️&nbsp; 编辑</button>' +
      '</div>' +
      '<div id="fbList" class="fb-list"></div>' +
      // 留言面板
      '<div id="fbPanel" class="fb-panel">' +
      '  <div class="fbp-head"><div class="lbl">留言反馈</div><div class="blk" id="fbpBlk">—</div><div class="cur" id="fbpCur"></div><span class="scope" id="fbpScope"></span></div>' +
      '  <div class="fbp-body">' +
      '    <div class="fb-choice">' +
      '      <input type="radio" name="fbStatus" id="fbSat" value="satisfied"><label class="sat" for="fbSat">✓ 满意<br>定稿</label>' +
      '      <input type="radio" name="fbStatus" id="fbChg" value="change"><label class="chg" for="fbChg">✎ 要<br>修改</label>' +
      '      <input type="radio" name="fbStatus" id="fbRmv" value="remove"><label class="rmv" for="fbRmv">🗑 不要<br>这块</label>' +
      '    </div>' +
      '    <div class="fb-section" id="fbSecText"><div class="fb-fieldlabel">改成这样（直接写新文案）</div><textarea class="fb-textarea" id="fbNewText" placeholder="把这里的文字改成…"></textarea></div>' +
      '    <div class="fb-section" id="fbSecImage"><div class="fb-fieldlabel">换成这张图</div><div class="fb-imgbox"><img id="fbImgPreview"><input type="file" id="fbImgFile" accept="image/*"><div class="or">— 或贴图片链接 —</div><input class="fb-input" id="fbImgUrl" placeholder="https://…"></div></div>' +
      '    <div class="fb-section" id="fbSecBlock"><div class="fb-fieldlabel">要改什么（可多选）</div><div class="fb-types"><input type="checkbox" id="ft1" value="文案"><label for="ft1">文案</label><input type="checkbox" id="ft2" value="图片"><label for="ft2">图片</label><input type="checkbox" id="ft3" value="颜色"><label for="ft3">颜色</label><input type="checkbox" id="ft4" value="排版"><label for="ft4">排版</label><input type="checkbox" id="ft5" value="风格"><label for="ft5">整体风格</label><input type="checkbox" id="ft6" value="其他"><label for="ft6">其他</label></div></div>' +
      '    <div class="fb-section" id="fbSecComment"><div class="fb-fieldlabel" id="fbCommentLabel">补充说明（可选）</div><textarea class="fb-textarea" id="fbComment" placeholder="写下你的想法…"></textarea></div>' +
      '  </div>' +
      '  <div class="fbp-foot"><button class="fb-cancel" id="fbCancel">取消</button><button class="fb-submit" id="fbSubmit">提交</button></div>' +
      '</div>' +
      // 换媒体弹窗
      '<div id="ceModal" class="ce-modal"><div class="ce-mbox">' +
      '  <h4 id="ceMTitle">换图片</h4><div class="ce-mlabel" id="ceMLabel"></div>' +
      '  <img id="ceMImgPrev" class="ce-mprev"><video id="ceMVidPrev" class="ce-mprev" controls muted playsinline></video>' +
      '  <p class="ce-mnote" id="ceMNote"></p>' +
      '  <input type="file" id="ceMFile" accept="image/*">' +
      '  <div class="ce-or">— 或粘贴链接 —</div>' +
      '  <input type="text" id="ceMUrl" class="fb-input" placeholder="https://…">' +
      '  <div class="ce-mfoot"><button class="fb-cancel" id="ceMCancel">取消</button><button class="fb-submit" id="ceMOk">换上</button></div>' +
      '</div></div>' +
      // 导出弹窗
      '<div id="ceExportModal" class="ce-modal"><div class="ce-mbox ce-mbox-lg">' +
      '  <h4>客户改动清单</h4>' +
      '  <pre id="ceExportBody" class="ce-exportbody"></pre>' +
      '  <p class="ce-tip">改动只存在你的浏览器。点「复制清单」发给我们即可安排上线；含上传图片时请一并「下载文件」发来。</p>' +
      '  <div class="ce-mfoot ce-wrap"><button id="ceCopy" class="fb-submit">📋 复制清单</button><button id="ceDownload" class="ce-btn-dl">⬇ 下载文件</button><button id="ceClearAll" class="fb-cancel">↺ 清空全部</button><button id="ceExportClose" class="fb-cancel">关闭</button></div>' +
      '</div></div>' +
      '<div id="ceToast" class="ce-toast"></div>';
    document.body.appendChild(w);
  }

  function bindEvents() {
    $("#ceEditBtn").addEventListener("click", function () { setMode("edit"); });
    $("#ceFbBtn").addEventListener("click", function () { setMode("fb"); });
    $("#ceExportBtn").addEventListener("click", showExport);
    $("#ceResetBtn").addEventListener("click", resetEdits);
    $("#cePageBtn").addEventListener("click", function () { fbOpen("page", null, null); });
    $$(".ce-hintx").forEach(function (x) { x.addEventListener("click", function () { sessionStorage.setItem(x.getAttribute("data-x"), "1"); x.parentElement.style.display = "none"; document.body.classList.remove("ce-pad"); }); });
    // 留言面板
    $("#fbSat").addEventListener("change", function () { fbApplyStatus("satisfied"); });
    $("#fbChg").addEventListener("change", function () { fbApplyStatus("change"); });
    $("#fbRmv").addEventListener("change", function () { fbApplyStatus("remove"); });
    $("#fbCancel").addEventListener("click", function () { $("#fbPanel").classList.remove("on"); fbTarget = null; });
    $("#fbSubmit").addEventListener("click", fbSubmit);
    $("#fbImgFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function (ev) { $("#fbImgPreview").src = ev.target.result; $("#fbImgPreview").style.display = "block"; $("#fbImgUrl").value = ""; };
      rd.readAsDataURL(f);
    });
    $("#fbImgUrl").addEventListener("input", function (e) { var u = e.target.value.trim(); if (u) { $("#fbImgPreview").src = u; $("#fbImgPreview").style.display = "block"; } });
    // 换媒体弹窗
    $("#ceMFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      if (f.size > 1.5 * 1024 * 1024) { toast("图片超过 1.5MB，请压缩或改贴链接"); e.target.value = ""; return; }
      var rd = new FileReader();
      rd.onload = function (ev) { showMPrev(ev.target.result); $("#ceMUrl").value = ""; };
      rd.readAsDataURL(f);
    });
    $("#ceMUrl").addEventListener("input", function (e) { var u = e.target.value.trim(); if (u) showMPrev(u); });
    $("#ceMCancel").addEventListener("click", function () { $("#ceModal").classList.remove("on"); });
    $("#ceMOk").addEventListener("click", applyMedia);
    // 导出
    $("#ceCopy").addEventListener("click", copyList);
    $("#ceDownload").addEventListener("click", downloadJSON);
    $("#ceClearAll").addEventListener("click", resetAll);
    $("#ceExportClose").addEventListener("click", function () { $("#ceExportModal").classList.remove("on"); });
  }

  function toast(msg) { var t = $("#ceToast"); if (!t) return; t.textContent = msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 2600); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function cssEsc(s) { return String(s).replace(/["\\]/g, "\\$&"); }

  /* ---------- 12. 样式 ---------- */
  function injectStyles() {
    var css =
      "body.ce-pad{padding-top:46px!important;}" +
      ".ce-hint{position:fixed;top:0;left:0;right:0;z-index:99000;color:#fff;text-align:center;padding:12px 46px;font:600 .86rem/1.4 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;display:none;}" +
      ".ce-hint-edit{background:#166a3a;}.ce-hint-fb{background:#c4632a;}.ce-hint b{color:#ffe08a;}" +
      ".ce-hintx{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.22);padding:3px 10px;border-radius:20px;cursor:pointer;font-size:.78rem;}" +
      ".ce-dock{position:fixed;right:18px;bottom:18px;z-index:99000;display:flex;flex-direction:column;gap:9px;align-items:flex-end;}" +
      ".ce-btn{font:700 .9rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;border:none;border-radius:40px;padding:13px 20px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 8px 26px rgba(0,0,0,.28);transition:transform .14s;}" +
      ".ce-btn:hover{transform:translateY(-2px);}" +
      ".ce-btn-edit{background:#166a3a;color:#fff;}.ce-btn-edit.on{background:#0d4023;}" +
      ".ce-btn-fb{background:#c4632a;color:#fff;}.ce-btn-fb.on{background:#8f4218;}" +
      ".ce-btn-export{background:#1d6fd4;color:#fff;display:none;}" +
      ".ce-btn-page{background:#7c4dff;color:#fff;display:none;}" +
      ".ce-btn-ghost{background:#fff;color:#333;border:1.5px solid #d8d8d8;box-shadow:0 4px 14px rgba(0,0,0,.14);display:none;padding:10px 16px;font-size:.82rem;}" +
      ".ce-btn-dl{background:#166a3a;color:#fff;border:none;border-radius:10px;font-weight:700;cursor:pointer;}" +
      // 编辑模式高亮
      "body.ce-edit [data-fb-el='text']{outline:1.5px dashed rgba(22,106,58,.5);outline-offset:3px;border-radius:3px;cursor:text;}" +
      "body.ce-edit [data-fb-el='text']:hover,body.ce-edit [data-fb-el='text']:focus{outline:2.5px solid #1f9152;background:rgba(31,145,82,.08);}" +
      "body.ce-edit img[data-fb-el],body.ce-edit video[data-fb-el]{outline:2px dashed rgba(201,138,38,.75)!important;outline-offset:3px;cursor:pointer!important;}" +
      "body.ce-edit img[data-fb-el]:hover,body.ce-edit video[data-fb-el]:hover{outline:3px solid #c98a26!important;}" +
      "body.ce-edit [data-fb-bg]{position:relative;}" +
      "body.ce-edit [data-fb-bg]::after{content:'🖼 点此换背景';position:absolute;top:12px;right:12px;z-index:60;background:rgba(201,138,38,.95);color:#fff;font:700 .78rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;padding:7px 12px;border-radius:20px;pointer-events:none;}" +
      ".ce-dirty{outline:2px solid #c98a26!important;}" +
      // 留言模式高亮（板块为主：粗虚线 + 元素细高亮）
      "body.fb-on [data-fb-block]:hover{outline:3px dashed rgba(230,145,63,.65);outline-offset:-3px;cursor:pointer;}" +
      "body.fb-on [data-fb-el]{transition:outline .1s;border-radius:4px;}" +
      "body.fb-on [data-fb-el]:hover{outline:2.5px solid #e6913f;outline-offset:3px;cursor:pointer;}" +
      "body.fb-on .ing-overlay,body.fb-on .ing-num{pointer-events:none;}" +
      // 徽章 / 圆点
      ".fb-badge{position:absolute;z-index:98000;font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:20px;pointer-events:none;font-family:-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;}" +
      ".fb-badge.done{background:#1f5c34;color:#aef0c4;}.fb-badge.todo{background:#7a3d1a;color:#ffcfa3;}.fb-badge.remove{background:#6b2020;color:#ffb3b3;}" +
      ".fb-eldot{position:absolute;z-index:98050;width:18px;height:18px;border-radius:50%;font-size:.6rem;font-weight:800;display:flex;align-items:center;justify-content:center;color:#fff;pointer-events:none;transform:translate(-50%,-50%);}" +
      ".fb-eldot.done{background:#2d7a47;}.fb-eldot.todo{background:#c4632a;}.fb-eldot.remove{background:#b03030;}" +
      // 留言面板
      ".fb-panel{position:fixed;top:0;right:-460px;width:430px;max-width:92vw;height:100%;background:#fff;color:#1d1a16;z-index:99500;box-shadow:-10px 0 50px rgba(0,0,0,.4);transition:right .28s cubic-bezier(.4,0,.2,1);display:flex;flex-direction:column;font:400 .92rem/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;}" +
      ".fb-panel.on{right:0;}" +
      ".fbp-head{padding:20px 22px;border-bottom:1px solid #eee;}" +
      ".fbp-head .lbl{font-size:.72rem;color:#b8915e;letter-spacing:.1em;text-transform:uppercase;}" +
      ".fbp-head .blk{font-size:1.2rem;font-weight:750;margin-top:4px;}" +
      ".fbp-head .cur{font-size:.82rem;color:#888;margin-top:6px;}" +
      ".fbp-head .scope{display:inline-block;margin-top:8px;font-size:.72rem;font-weight:700;padding:3px 9px;border-radius:6px;}" +
      ".fbp-head .scope.el{background:#fbeee5;color:#c4632a;}.fbp-head .scope.block{background:#eef1f4;color:#5a6b80;}" +
      ".fbp-body{padding:18px 22px;overflow-y:auto;flex:1;}" +
      ".fb-choice{display:flex;gap:8px;margin-bottom:18px;}" +
      ".fb-choice label{flex:1;border:1.5px solid #ddd;border-radius:10px;padding:11px 6px;text-align:center;cursor:pointer;font-weight:600;font-size:.82rem;}" +
      ".fb-choice input{display:none;}" +
      ".fb-choice input:checked+label.sat{background:#e8f3ec;border-color:#2d7a47;color:#2d7a47;}" +
      ".fb-choice input:checked+label.chg{background:#fbeee5;border-color:#c4632a;color:#c4632a;}" +
      ".fb-choice input:checked+label.rmv{background:#fbe9e7;border-color:#c0392b;color:#c0392b;}" +
      ".fb-section{display:none;}.fb-section.on{display:block;}" +
      ".fb-fieldlabel{font-size:.78rem;color:#888;margin:14px 0 7px;font-weight:600;}" +
      ".fb-types{display:flex;flex-wrap:wrap;gap:8px;}" +
      ".fb-types label{font-size:.82rem;padding:7px 13px;border:1.5px solid #ddd;border-radius:20px;cursor:pointer;}" +
      ".fb-types input{display:none;}.fb-types input:checked+label{background:#1d1a16;color:#fff;border-color:#1d1a16;}" +
      ".fb-input,.fb-textarea{width:100%;border:1.5px solid #ddd;border-radius:10px;padding:11px;font-size:.92rem;font-family:inherit;box-sizing:border-box;}" +
      ".fb-textarea{min-height:70px;resize:vertical;}" +
      ".fb-imgbox{border:1.5px dashed #ddd;border-radius:10px;padding:14px;text-align:center;}" +
      ".fb-imgbox img{max-width:100%;max-height:130px;border-radius:8px;margin-bottom:10px;display:none;}" +
      ".fb-imgbox .or{font-size:.78rem;color:#aaa;margin:8px 0;}" +
      ".fbp-foot{padding:14px 22px;border-top:1px solid #eee;display:flex;gap:10px;}" +
      ".fbp-foot button,.ce-mfoot button{flex:1;padding:13px;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;}" +
      ".fb-submit{background:#c4632a;color:#fff;}.fb-cancel{background:#f0f0f0;color:#666;}" +
      ".fb-list{position:fixed;left:20px;bottom:20px;z-index:99000;background:#fff;color:#1d1a16;border-radius:12px;padding:14px 18px;font-size:.85rem;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:330px;max-height:44vh;overflow-y:auto;display:none;font-family:-apple-system,'Segoe UI','Microsoft YaHei',sans-serif;}" +
      ".fb-list.on{display:block;}.fb-list b{color:#c4632a;}.fb-list .item{padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:.8rem;}" +
      // 弹窗
      ".ce-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99600;display:none;align-items:center;justify-content:center;padding:16px;}" +
      ".ce-modal.on{display:flex;}" +
      ".ce-mbox{background:#fff;color:#1d1a16;border-radius:16px;padding:24px;width:400px;max-width:94vw;font:400 .92rem/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;box-shadow:0 24px 70px rgba(0,0,0,.4);}" +
      ".ce-mbox-lg{width:560px;}" +
      ".ce-mbox h4{font-size:1.12rem;margin:0 0 6px;font-weight:800;}" +
      ".ce-mlabel{font:600 .78rem/1 ui-monospace,Menlo,Consolas,monospace;color:#166a3a;margin-bottom:12px;}" +
      ".ce-mprev{width:100%;max-height:160px;object-fit:contain;background:#f3f3f3;border-radius:10px;margin-bottom:10px;display:none;}" +
      ".ce-mnote{font-size:.8rem;color:#888;margin:0 0 8px;}" +
      ".ce-or{font-size:.76rem;color:#aaa;text-align:center;margin:8px 0;}" +
      ".ce-mfoot{display:flex;gap:10px;margin-top:16px;}" +
      ".ce-wrap{flex-wrap:wrap;}" +
      ".ce-exportbody{max-height:44vh;overflow:auto;background:#faf8f5;border:1px solid #eee;border-radius:12px;padding:14px;font:400 .82rem/1.55 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;}" +
      ".ce-tip{font-size:.8rem;color:#888;margin:12px 0 0;line-height:1.5;}" +
      ".ce-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#1d1a16;color:#fff;padding:13px 22px;border-radius:12px;font:600 .88rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;z-index:99800;opacity:0;pointer-events:none;transition:opacity .25s;box-shadow:0 8px 30px rgba(0,0,0,.4);}" +
      ".ce-toast.on{opacity:1;}" +
      "@media(max-width:600px){.fb-panel{width:100vw;}.ce-mbox-lg{width:94vw;}.ce-btn{padding:11px 15px;font-size:.82rem;}}";
    var st = document.createElement("style"); st.id = "ce-styles"; st.textContent = css; document.head.appendChild(st);
  }
})();
