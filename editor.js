/* =============================================================
   UNI MAX · 顾客反馈 & 自助编辑层 (editor.js)
   -------------------------------------------------------------
   直接复用 TableSites 规范 feedback-tool-demo.html 的全套交互：
   每个文字 / 图片 / 按钮 / 板块都能标「✓满意 · ✎要改 · 🗑不要」，
   要改就当场写新文案 / 换图 / 改按钮，并可留言（comment）。
   适配 UniMax：① 自动标注（复用 data-i18n + 扫 <img>，免手工标）
               ② 图片遮罩层点击穿透（成分卡等背景图可换）
               ③ i18n 兼容（切语言不丢改动）
               ④ 密钥门禁（?edit=KEY 才进，别人进不来）
               ⑤ 导出清单（一键复制 / 下载，兜底回收）
   数据存客户浏览器 localStorage，不动线上真实内容。
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 0. 密钥门禁：只有带正确密钥的网址能进 ---------- */
  var EDIT_KEY = "unimax-2026";                 // ← 改这里换口令
  var qs = new URLSearchParams(location.search);
  if (qs.get("edit") !== EDIT_KEY && location.hash.replace(/^#/, "") !== EDIT_KEY) return;

  var FB_LS = "unimax_feedback_v1";
  var FB_API = "https://tablesites-feedback-api.pages.dev/api/feedback";
  var FB_CLIENT = "unimax";
  var fbMode = false, fbTarget = null, applyingOverride = false;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if (document.readyState !== "loading") setTimeout(init, 0);
  else document.addEventListener("DOMContentLoaded", init);

  function init() {
    autoAnnotate();
    $$("[data-fb-el]").forEach(function (el) { el._fbOrig = el.dataset.fbEl === "image" ? el.getAttribute("src") : el.textContent; });
    injectStyles();
    buildUI();
    bindEvents();
    fbApplyPreviews();     // 客户回访：把上次改动重新套回页面
    watchLangSwitch();     // 切语言后重新套用
    observeLang();
  }

  /* ---------- 1. 自动标注（替代手工 data-fb-*）---------- */
  function autoAnnotate() {
    // 板块
    $$("header.header, main section, footer.footer").forEach(function (sec, i) {
      if (sec.hasAttribute("data-fb-block")) return;
      sec.setAttribute("data-fb-block", sec.id || ("sec" + i));
      var l = sec.querySelector(".eyebrow, h1, h2, h5");
      var lbl = l ? l.textContent.trim().replace(/\s+/g, " ") : "";
      sec.setAttribute("data-fb-label", (lbl.slice(0, 22) || sec.id || "板块" + (i + 1)));
    });
    // 文字：所有 data-i18n
    $$("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-fb-el")) return;
      el.setAttribute("data-fb-el", "text");
      el.setAttribute("data-fb-key", el.getAttribute("data-i18n"));
      var t = el.textContent.trim().replace(/\s+/g, " ");
      el.setAttribute("data-fb-ellabel", t.slice(0, 20) || el.getAttribute("data-i18n"));
    });
    // 图片：内容图
    $$("img").forEach(function (img) {
      if (!isEditableImg(img) || img.hasAttribute("data-fb-el")) return;
      var base = baseName(img.getAttribute("src") || "");
      if (!base) return;
      img.setAttribute("data-fb-el", "image");
      img.setAttribute("data-fb-key", base);
      img.setAttribute("data-fb-ellabel", (img.getAttribute("alt") || base).slice(0, 22));
      // 父容器兜底：成分卡等图片上盖了遮罩层，点击落在遮罩上也能找到图
      var p = img.parentElement;
      if (p && !p.hasAttribute("data-fb-imgparent")) p.setAttribute("data-fb-imgparent", base);
    });
  }
  function isEditableImg(img) {
    var src = img.getAttribute("src") || "";
    if (/logo-wa|logo-dark/.test(src)) return false;
    if (img.classList.contains("wa") || img.classList.contains("logo-img")) return false;
    if (img.id === "lbImg" || img.closest("#lightbox")) return false;
    return true;
  }
  function baseName(src) { var f = src.split("?")[0].split("/").pop() || ""; return f.replace(/\.[a-z0-9]+$/i, ""); }

  /* ---------- 2. 存取 ---------- */
  function fbLoad() { try { return JSON.parse(localStorage.getItem(FB_LS) || "[]"); } catch (e) { return []; } }
  function fbSave(a) { try { localStorage.setItem(FB_LS, JSON.stringify(a)); } catch (e) { } }
  function fbRecKey(t) { return t.target === "element" ? "el:" + t.key : "block:" + t.block_id; }

  function fbPost(rec) {
    var payload = { client_id: FB_CLIENT, page: rec.page, target: rec.target, block_id: rec.block_id, block_label: rec.block_label, el_key: rec.key, el_type: rec.el_type, el_label: rec.el_label, status: rec.status, change_types: rec.change_types, comment: rec.comment, new_text: rec.new_text, new_image_url: (rec.new_image_url && rec.new_image_url.indexOf("data:") === 0) ? "(uploaded image, pending storage)" : rec.new_image_url, new_btn_text: rec.new_btn_text, new_btn_url: rec.new_btn_url };
    try { fetch(FB_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).then(function (r) { return r.json(); }).then(function (j) { console.log("fb synced", j); }).catch(function (e) { console.warn("fb sync failed (本地已存)", e); }); } catch (e) { }
  }

  /* ---------- 3. 应用/联动 已提交的改动（i18n 兼容）---------- */
  function setText(key, val) { $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { if (el.dataset.fbEl === "text") { el.textContent = val; el.setAttribute("data-en", val); } }); }
  function setImg(key, val) { $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { if (el.dataset.fbEl === "image") el.setAttribute("src", val); }); }
  function setBtn(key, txt) { if (txt) $$('[data-fb-key="' + cssEsc(key) + '"]').forEach(function (el) { el.textContent = txt; el.setAttribute("data-en", txt); }); }

  function fbApplyPreviews() {
    applyingOverride = true;
    fbLoad().filter(function (d) { return d.target === "element" && d.status === "change"; }).forEach(function (d) {
      if (d.el_type === "image" && d.new_image_url) setImg(d.key, d.new_image_url);
      else if (d.el_type === "text" && d.new_text) setText(d.key, d.new_text);
      else if (d.el_type === "button") setBtn(d.key, d.new_btn_text);
    });
    applyingOverride = false;
  }

  /* ---------- 4. 模式开关 / 标记 / 列表 ---------- */
  function fbToggleMode() {
    fbMode = !fbMode;
    document.body.classList.toggle("fb-on", fbMode);
    $("#fbFab").innerHTML = fbMode ? "✕&nbsp; 退出" : "💬&nbsp; 编辑 & 留言";
    $("#fbExportBtn").style.display = fbMode ? "inline-flex" : "none";
    if (!fbMode) { $("#fbPanel").classList.remove("on"); $("#fbExportModal").classList.remove("on"); }
    fbRenderMarks(); fbRenderList();
  }

  function fbRenderMarks() {
    $$(".fb-badge,.fb-eldot").forEach(function (b) { b.remove(); });
    if (!fbMode) return;
    var data = fbLoad();
    $$("[data-fb-block]").forEach(function (sec) {
      var rec = data.find(function (d) { return d.target === "block" && d.block_id === sec.dataset.fbBlock; });
      if (!rec) return;
      var r = sec.getBoundingClientRect();
      var b = document.createElement("div");
      b.className = "fb-badge " + (rec.status === "satisfied" ? "done" : rec.status === "remove" ? "remove" : "todo");
      b.textContent = rec.status === "satisfied" ? "✓ 已定稿" : rec.status === "remove" ? "🗑 不要" : "● 待改";
      b.style.left = (r.right + window.scrollX - 96) + "px";
      b.style.top = (r.top + window.scrollY + 10) + "px";
      document.body.appendChild(b);
    });
    $$("[data-fb-el]").forEach(function (el) {
      var rec = data.find(function (d) { return d.target === "element" && d.key === el.dataset.fbKey; });
      if (!rec) return;
      var r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return;
      var dot = document.createElement("div");
      dot.className = "fb-eldot " + (rec.status === "satisfied" ? "done" : rec.status === "remove" ? "remove" : "todo");
      dot.textContent = rec.status === "satisfied" ? "✓" : rec.status === "remove" ? "✕" : "!";
      dot.style.left = (r.left + window.scrollX) + "px";
      dot.style.top = (r.top + window.scrollY) + "px";
      document.body.appendChild(dot);
    });
  }
  window.addEventListener("scroll", function () { if (fbMode) fbRenderMarks(); });
  window.addEventListener("resize", function () { if (fbMode) fbRenderMarks(); });

  function fbRenderList() {
    var el = $("#fbList"), data = fbLoad();
    if (!fbMode || !data.length) { el.classList.remove("on"); return; }
    el.classList.add("on");
    var sat = data.filter(function (d) { return d.status === "satisfied"; }).length;
    var chg = data.filter(function (d) { return d.status === "change"; }).length;
    var rmv = data.filter(function (d) { return d.status === "remove"; }).length;
    el.innerHTML = "<b>已提交 " + data.length + " 条</b>（定稿 " + sat + " · 改 " + chg + " · 删 " + rmv + "）" +
      data.map(function (d) {
        var name = d.target === "element" ? (d.block_label + " › " + (d.el_label || d.key)) : d.block_label;
        var ic = d.status === "satisfied" ? "✓" : d.status === "remove" ? "🗑" : "●";
        var detail = "";
        if (d.status === "change") {
          if (d.new_text) detail = "：改文案「" + d.new_text.slice(0, 18) + "」";
          else if (d.new_image_url) detail = "：换图";
          else if (d.new_btn_text) detail = "：按钮→" + d.new_btn_text;
          else if (d.change_types && d.change_types.length) detail = "：" + d.change_types.join("/");
          if (d.comment) detail += " 「" + d.comment.slice(0, 16) + "」";
        } else if (d.comment) detail = " 「" + d.comment.slice(0, 16) + "」";
        return '<div class="item">' + ic + " " + esc(name) + esc(detail) + "</div>";
      }).join("");
  }

  /* ---------- 5. 点击委派：元素优先（图片遮罩兜底），否则板块 ---------- */
  function onDocClick(e) {
    if (!fbMode) return;
    if (e.target.closest("#fbPanel") || e.target.closest("#fbFab") || e.target.closest("#fbList") || e.target.closest(".fb-tool")) return;
    var el = e.target.closest("[data-fb-el]");
    if (!el) { var ip = e.target.closest("[data-fb-imgparent]"); if (ip) el = ip.querySelector('img[data-fb-el="image"]'); }
    var block = e.target.closest("[data-fb-block]");
    if (el) { e.preventDefault(); e.stopPropagation(); fbOpen("element", el, block); }
    else if (block) { e.preventDefault(); e.stopPropagation(); fbOpen("block", null, block); }
  }

  function fbOpen(target, el, block) {
    fbTarget = {
      target: target, block_id: block.dataset.fbBlock, block_label: block.dataset.fbLabel,
      key: el ? el.dataset.fbKey : null, el_type: el ? el.dataset.fbEl : null,
      el_label: el ? el.dataset.fbEllabel : null, _el: el
    };
    $("#fbpBlk").textContent = target === "element" ? (fbTarget.el_label || fbTarget.key) : fbTarget.block_label;
    $("#fbpScope").textContent = target === "element" ? ("元素 · " + ({ text: "文字", image: "图片", button: "按钮" }[fbTarget.el_type] || fbTarget.el_type) + " · 属于「" + fbTarget.block_label + "」") : "整个板块";
    $("#fbpScope").className = "scope " + (target === "element" ? "el" : "block");

    $$("input[name=fbStatus]").forEach(function (i) { i.checked = false; });
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    $("#fbNewText").value = ""; $("#fbComment").value = ""; $("#fbImgUrl").value = "";
    $("#fbBtnText").value = ""; $("#fbBtnUrl").value = ""; $("#fbImgFile").value = "";
    $("#fbImgPreview").style.display = "none";
    $$(".fb-types input").forEach(function (i) { i.checked = false; });

    var rec = fbLoad().find(function (d) { return fbRecKey(d) === fbRecKey(fbTarget); });
    if (rec) {
      $("#fbpCur").textContent = "当前：" + (rec.status === "satisfied" ? "已定稿" : rec.status === "remove" ? "标记为不要" : "待改");
      var r = $('input[name=fbStatus][value="' + rec.status + '"]'); if (r) r.checked = true;
      fbApplyStatus(rec.status);
      if (rec.new_text) $("#fbNewText").value = rec.new_text;
      if (rec.comment) $("#fbComment").value = rec.comment;
      if (rec.new_image_url) $("#fbImgUrl").value = rec.new_image_url;
      if (rec.new_btn_text) $("#fbBtnText").value = rec.new_btn_text;
      if (rec.new_btn_url) $("#fbBtnUrl").value = rec.new_btn_url;
      (rec.change_types || []).forEach(function (t) { var i = $$(".fb-types input").find(function (x) { return x.value === t; }); if (i) i.checked = true; });
    } else { $("#fbpCur").textContent = "还没填过"; }
    $("#fbPanel").classList.add("on");
  }

  function fbApplyStatus(status) {
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    if (status === "change") {
      $("#fbSecComment").classList.add("on");
      $("#fbCommentLabel").textContent = "补充说明 / 留言（可选）";
      if (fbTarget.target === "element") {
        if (fbTarget.el_type === "text") $("#fbSecText").classList.add("on");
        else if (fbTarget.el_type === "image") $("#fbSecImage").classList.add("on");
        else if (fbTarget.el_type === "button") $("#fbSecBtn").classList.add("on");
      } else $("#fbSecBlock").classList.add("on");
    } else if (status === "remove") {
      $("#fbSecComment").classList.add("on");
      $("#fbCommentLabel").textContent = "为什么不要这块？/ 留言（可选）";
    } else if (status === "satisfied") {
      $("#fbSecComment").classList.add("on");
      $("#fbCommentLabel").textContent = "想补一句？/ 留言（可选）";
    }
  }

  /* ---------- 6. 事件绑定 ---------- */
  function bindEvents() {
    document.addEventListener("click", onDocClick, true);
    $("#fbFab").addEventListener("click", fbToggleMode);
    $("#fbSat").addEventListener("change", function () { fbApplyStatus("satisfied"); });
    $("#fbChg").addEventListener("change", function () { fbApplyStatus("change"); });
    $("#fbRmv").addEventListener("change", function () { fbApplyStatus("remove"); });

    $("#fbImgFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function (ev) { $("#fbImgPreview").src = ev.target.result; $("#fbImgPreview").style.display = "block"; if (fbTarget && fbTarget.key && fbTarget.el_type === "image") setImg(fbTarget.key, ev.target.result); $("#fbImgUrl").value = ""; };
      rd.readAsDataURL(f);
    });
    $("#fbImgUrl").addEventListener("input", function (e) {
      var u = e.target.value.trim();
      if (u) { $("#fbImgPreview").src = u; $("#fbImgPreview").style.display = "block"; if (fbTarget && fbTarget.key && fbTarget.el_type === "image") setImg(fbTarget.key, u); }
    });
    $("#fbNewText").addEventListener("input", function (e) {
      if (fbTarget && fbTarget.key && fbTarget.el_type === "text") { var v = e.target.value; if (v.trim()) setText(fbTarget.key, v); else setText(fbTarget.key, fbTarget._el._fbOrig); }
    });
    $("#fbBtnText").addEventListener("input", function (e) {
      if (fbTarget && fbTarget.key && fbTarget.el_type === "button") { var v = e.target.value; setBtn(fbTarget.key, v.trim() ? v : fbTarget._el._fbOrig); }
    });

    $("#fbCancel").addEventListener("click", fbCancel);
    $("#fbSubmit").addEventListener("click", fbSubmit);
    // 导出
    $("#fbExportBtn").addEventListener("click", fbShowExport);
    $("#fbCopy").addEventListener("click", fbCopy);
    $("#fbDownload").addEventListener("click", fbDownload);
    $("#fbExportClose").addEventListener("click", function () { $("#fbExportModal").classList.remove("on"); });
    $("#fbReset").addEventListener("click", fbReset);
  }

  function fbCancel() {
    $("#fbPanel").classList.remove("on");
    // 恢复当前元素的临时预览（未提交则回原值，已提交则回已提交值）
    if (fbTarget && fbTarget.key && fbTarget._el) {
      var rec = fbLoad().find(function (d) { return d.target === "element" && d.key === fbTarget.key; });
      if (rec && rec.status === "change") {
        if (fbTarget.el_type === "image" && rec.new_image_url) setImg(fbTarget.key, rec.new_image_url);
        else if (fbTarget.el_type === "text" && rec.new_text) setText(fbTarget.key, rec.new_text);
        else if (fbTarget.el_type === "button") setBtn(fbTarget.key, rec.new_btn_text);
      } else {
        if (fbTarget.el_type === "image") setImg(fbTarget.key, fbTarget._el._fbOrig);
        else setText(fbTarget.key, fbTarget._el._fbOrig);
      }
    }
    fbTarget = null;
  }

  function fbSubmit() {
    if (!fbTarget) return;
    var status = ($("input[name=fbStatus]:checked") || {}).value;
    if (!status) { alert("先选 满意 / 要修改 / 不要这块"); return; }
    var rec = { target: fbTarget.target, block_id: fbTarget.block_id, block_label: fbTarget.block_label, key: fbTarget.key, el_type: fbTarget.el_type, el_label: fbTarget.el_label, status: status, page: "home", ts: new Date().toISOString() };
    if (status === "change") {
      rec.comment = $("#fbComment").value.trim();
      if (fbTarget.target === "element") {
        if (fbTarget.el_type === "text") rec.new_text = $("#fbNewText").value.trim();
        else if (fbTarget.el_type === "image") rec.new_image_url = $("#fbImgUrl").value.trim() || ($("#fbImgPreview").src.indexOf("data:") === 0 ? $("#fbImgPreview").src : "");
        else if (fbTarget.el_type === "button") { rec.new_btn_text = $("#fbBtnText").value.trim(); rec.new_btn_url = $("#fbBtnUrl").value.trim(); }
      } else rec.change_types = $$(".fb-types input:checked").map(function (i) { return i.value; });
    } else rec.comment = $("#fbComment").value.trim();

    var data = fbLoad().filter(function (d) { return fbRecKey(d) !== fbRecKey(fbTarget); });
    data.push(rec); fbSave(data); fbPost(rec);
    $("#fbPanel").classList.remove("on");
    fbTarget = null;
    fbApplyPreviews(); fbRenderMarks(); fbRenderList();
    toast("已记录，可继续标其它地方");
  }

  /* ---------- 7. 导出清单 ---------- */
  function fbSummaryText() {
    var data = fbLoad();
    var lines = ["UNI MAX 网站 · 反馈 / 修改清单", "页面：" + location.origin + location.pathname, "共 " + data.length + " 条", ""];
    var order = { change: 0, remove: 1, satisfied: 2 };
    data.slice().sort(function (a, b) { return (order[a.status] || 0) - (order[b.status] || 0); }).forEach(function (d, i) {
      var where = d.target === "element" ? (d.block_label + " › " + (d.el_label || d.key)) : ("整块：" + d.block_label);
      var tag = d.status === "satisfied" ? "✓满意定稿" : d.status === "remove" ? "🗑不要这块" : "✎要修改";
      var s = (i + 1) + ". [" + tag + "] " + where;
      if (d.new_text) s += "\n   新文案：" + d.new_text;
      if (d.new_image_url) s += "\n   换图：" + (d.new_image_url.indexOf("data:") === 0 ? "已上传本地图片（见随附 JSON）" : d.new_image_url);
      if (d.new_btn_text) s += "\n   新按钮：" + d.new_btn_text + (d.new_btn_url ? " → " + d.new_btn_url : "");
      if (d.change_types && d.change_types.length) s += "\n   要改：" + d.change_types.join("、");
      if (d.comment) s += "\n   留言：" + d.comment;
      lines.push(s);
    });
    return lines.join("\n");
  }
  function fbShowExport() {
    var data = fbLoad();
    var box = $("#fbExportBody");
    if (!data.length) box.innerHTML = '<p class="fb-empty">还没有任何反馈。<br>点文字 / 图片 / 板块，选「满意 / 要改 / 不要」并可留言。</p>';
    else box.textContent = fbSummaryText();
    $("#fbExportModal").classList.add("on");
  }
  function fbCopy() {
    var txt = fbSummaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { toast("已复制，粘贴发我们即可"); }, function () { fbFallbackCopy(txt); });
    else fbFallbackCopy(txt);
  }
  function fbFallbackCopy(txt) { var ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); toast("已复制"); } catch (e) { toast("复制失败，请手动选择"); } document.body.removeChild(ta); }
  function fbDownload() {
    var blob = new Blob([JSON.stringify({ site: "unimax", url: location.href, savedAt: new Date().toISOString(), records: fbLoad() }, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "unimax-feedback.json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("已下载反馈文件");
  }
  function fbReset() {
    if (!confirm("确定清空所有反馈、恢复原始网页吗？")) return;
    localStorage.removeItem(FB_LS);
    $$("[data-fb-el]").forEach(function (el) { if (el._fbOrig != null) { if (el.dataset.fbEl === "image") el.setAttribute("src", el._fbOrig); else { el.textContent = el._fbOrig; el.setAttribute("data-en", el._fbOrig); } } });
    fbRenderMarks(); fbRenderList(); $("#fbExportModal").classList.remove("on"); toast("已恢复原始网页");
  }

  /* ---------- 8. 语言切换兼容 ---------- */
  function watchLangSwitch() {
    $$("#langBtn, #langMenu button, [data-drawer-lang], #footLangBtn, #footLangMenu button").forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(fbApplyPreviews, 60); });
    });
  }
  function observeLang() {
    if (!("MutationObserver" in window)) return;
    new MutationObserver(function (muts) {
      if (applyingOverride) return;
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target, el = t.nodeType === 3 ? t.parentElement : t;
        var host = el && el.closest ? el.closest('[data-fb-el="text"]') : null;
        if (host) { var rec = fbLoad().find(function (d) { return d.target === "element" && d.key === host.dataset.fbKey && d.status === "change"; }); if (rec && host.textContent !== rec.new_text) { fbApplyPreviews(); break; } }
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  /* ---------- 9. UI ---------- */
  function buildUI() {
    var wrap = document.createElement("div");
    wrap.className = "fb-tool";
    wrap.innerHTML =
      '<div id="fbHint" class="fb-hint">📍 编辑 &amp; 留言模式 —— 移到<b>文字 / 图片 / 按钮</b>会高亮，点它：满意打勾、要改直接写新内容或换图、或留言；点<b>板块空白</b>给整块留言。<span id="fbHintX" class="fb-hintx">知道了</span></div>' +
      '<button id="fbFab" class="fb-fab">💬&nbsp; 编辑 & 留言</button>' +
      '<button id="fbExportBtn" class="fb-export-btn">📋 导出清单</button>' +
      '<div id="fbList" class="fb-list"></div>' +
      // 反馈面板
      '<div id="fbPanel" class="fb-panel">' +
      '  <div class="fbp-head"><div class="lbl">反馈 / 编辑</div><div class="blk" id="fbpBlk">—</div><div class="cur" id="fbpCur"></div><span class="scope" id="fbpScope"></span></div>' +
      '  <div class="fbp-body">' +
      '    <div class="fb-choice">' +
      '      <input type="radio" name="fbStatus" id="fbSat" value="satisfied"><label class="sat" for="fbSat">✓ 满意<br>定稿</label>' +
      '      <input type="radio" name="fbStatus" id="fbChg" value="change"><label class="chg" for="fbChg">✎ 要<br>修改</label>' +
      '      <input type="radio" name="fbStatus" id="fbRmv" value="remove"><label class="rmv" for="fbRmv">🗑 不要<br>这块</label>' +
      '    </div>' +
      '    <div class="fb-section" id="fbSecText"><div class="fb-fieldlabel">改成这样（直接写新文案）</div><textarea class="fb-textarea" id="fbNewText" placeholder="把这里的文字改成…"></textarea></div>' +
      '    <div class="fb-section" id="fbSecImage"><div class="fb-fieldlabel">换成这张图</div><div class="fb-imgbox"><img id="fbImgPreview"><input type="file" id="fbImgFile" accept="image/*"><div class="or">— 或贴图片链接 —</div><input class="fb-input" id="fbImgUrl" placeholder="https://…"></div></div>' +
      '    <div class="fb-section" id="fbSecBtn"><div class="fb-fieldlabel">新按钮文字</div><input class="fb-input" id="fbBtnText" placeholder="例：立即咨询"><div class="fb-fieldlabel">按钮链接（可选）</div><input class="fb-input" id="fbBtnUrl" placeholder="https://… 或 #section"></div>' +
      '    <div class="fb-section" id="fbSecBlock"><div class="fb-fieldlabel">这块要改什么（可多选）</div><div class="fb-types"><input type="checkbox" id="ft1" value="文案"><label for="ft1">文案</label><input type="checkbox" id="ft2" value="图片"><label for="ft2">图片</label><input type="checkbox" id="ft3" value="颜色"><label for="ft3">颜色</label><input type="checkbox" id="ft4" value="排版"><label for="ft4">排版</label><input type="checkbox" id="ft5" value="其他"><label for="ft5">其他</label></div></div>' +
      '    <div class="fb-section" id="fbSecComment"><div class="fb-fieldlabel" id="fbCommentLabel">补充说明 / 留言（可选）</div><textarea class="fb-textarea" id="fbComment" placeholder="再补一句你的想法…"></textarea></div>' +
      '  </div>' +
      '  <div class="fbp-foot"><button class="fb-cancel" id="fbCancel">取消</button><button class="fb-submit" id="fbSubmit">提交</button></div>' +
      '</div>' +
      // 导出弹窗
      '<div id="fbExportModal" class="fb-modal"><div class="fb-mbox">' +
      '  <h4>反馈 / 修改清单</h4>' +
      '  <pre id="fbExportBody" class="fb-exportbody"></pre>' +
      '  <p class="fb-tip">改动只存在你的浏览器。点「复制清单」发给我们即可安排上线；含上传图片时请一并「下载文件」发来。</p>' +
      '  <div class="fb-mfoot"><button id="fbCopy" class="fb-submit">📋 复制清单</button><button id="fbDownload" class="fb-dl">⬇ 下载文件</button><button id="fbReset" class="fb-cancel">↺ 清空</button><button id="fbExportClose" class="fb-cancel">关闭</button></div>' +
      '</div></div>' +
      '<div id="fbToast" class="fb-toast"></div>';
    document.body.appendChild(wrap);
    $("#fbHintX").addEventListener("click", function () { $("#fbHint").style.display = "none"; });
  }

  function toast(msg) { var t = $("#fbToast"); if (!t) return; t.textContent = msg; t.classList.add("on"); clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 2400); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function cssEsc(s) { return String(s).replace(/["\\]/g, "\\$&"); }

  /* ---------- 10. 样式 ---------- */
  function injectStyles() {
    var css =
      "body.fb-on{padding-top:44px!important;}" +
      ".fb-hint{position:fixed;top:0;left:0;right:0;z-index:99000;background:#c4632a;color:#fff;text-align:center;padding:11px 40px;font:600 .86rem/1.4 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;display:none;}" +
      "body.fb-on .fb-hint{display:block;}.fb-hint b{color:#ffe0b0;}" +
      ".fb-hintx{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.22);padding:3px 10px;border-radius:20px;cursor:pointer;font-size:.78rem;}" +
      ".fb-fab{position:fixed;right:20px;bottom:20px;z-index:99000;background:#c4632a;color:#fff;border:none;border-radius:44px;padding:14px 22px;font:700 .92rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;cursor:pointer;box-shadow:0 8px 30px rgba(196,99,42,.45);display:inline-flex;align-items:center;transition:transform .15s;}" +
      ".fb-fab:hover{transform:translateY(-2px);}" +
      ".fb-export-btn{position:fixed;right:20px;bottom:74px;z-index:99000;background:#166a3a;color:#fff;border:none;border-radius:44px;padding:11px 18px;font:700 .84rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;cursor:pointer;box-shadow:0 8px 26px rgba(22,106,58,.4);display:none;align-items:center;}" +
      // 高亮
      "body.fb-on [data-fb-el]{transition:outline .1s,box-shadow .1s;border-radius:4px;}" +
      "body.fb-on [data-fb-el]:hover{outline:2.5px solid #e6913f;outline-offset:3px;cursor:pointer;}" +
      "body.fb-on [data-fb-block]:hover{outline:2px dashed rgba(230,145,63,.4);outline-offset:-2px;}" +
      "body.fb-on .ing-overlay,body.fb-on .ing-num,body.fb-on .gcap svg{pointer-events:none;}" +
      // 徽章 / 圆点
      ".fb-badge{position:absolute;z-index:98000;font-size:.72rem;font-weight:700;padding:4px 10px;border-radius:20px;pointer-events:none;}" +
      ".fb-badge.done{background:#1f5c34;color:#aef0c4;}.fb-badge.todo{background:#7a3d1a;color:#ffcfa3;}.fb-badge.remove{background:#6b2020;color:#ffb3b3;}" +
      ".fb-eldot{position:absolute;z-index:98050;width:18px;height:18px;border-radius:50%;font-size:.6rem;font-weight:800;display:flex;align-items:center;justify-content:center;color:#fff;pointer-events:none;transform:translate(-50%,-50%);}" +
      ".fb-eldot.done{background:#2d7a47;}.fb-eldot.todo{background:#c4632a;}.fb-eldot.remove{background:#b03030;}" +
      // 面板
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
      ".fb-input,.fb-textarea{width:100%;border:1.5px solid #ddd;border-radius:10px;padding:11px;font-size:.92rem;font-family:inherit;}" +
      ".fb-textarea{min-height:70px;resize:vertical;}" +
      ".fb-imgbox{border:1.5px dashed #ddd;border-radius:10px;padding:14px;text-align:center;}" +
      ".fb-imgbox img{max-width:100%;max-height:130px;border-radius:8px;margin-bottom:10px;display:none;}" +
      ".fb-imgbox .or{font-size:.78rem;color:#aaa;margin:8px 0;}" +
      ".fbp-foot{padding:14px 22px;border-top:1px solid #eee;display:flex;gap:10px;}" +
      ".fbp-foot button,.fb-mfoot button{flex:1;padding:13px;border-radius:10px;font-weight:700;font-size:.9rem;border:none;cursor:pointer;}" +
      ".fb-submit{background:#c4632a;color:#fff;}.fb-cancel{background:#f0f0f0;color:#666;}.fb-dl{background:#166a3a;color:#fff;}" +
      ".fb-list{position:fixed;left:20px;bottom:20px;z-index:99000;background:#fff;color:#1d1a16;border-radius:12px;padding:14px 18px;font-size:.85rem;box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:330px;max-height:46vh;overflow-y:auto;display:none;}" +
      ".fb-list.on{display:block;}.fb-list b{color:#c4632a;}.fb-list .item{padding:6px 0;border-bottom:1px solid #f0f0f0;font-size:.8rem;}" +
      // 导出弹窗
      ".fb-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99600;display:none;align-items:center;justify-content:center;padding:16px;}" +
      ".fb-modal.on{display:flex;}" +
      ".fb-mbox{background:#fff;color:#1d1a16;border-radius:16px;padding:24px;width:560px;max-width:94vw;font:400 .92rem/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;box-shadow:0 24px 70px rgba(0,0,0,.4);}" +
      ".fb-mbox h4{font-size:1.12rem;margin:0 0 14px;font-weight:800;}" +
      ".fb-exportbody{max-height:44vh;overflow:auto;background:#faf8f5;border:1px solid #eee;border-radius:12px;padding:14px;font:400 .82rem/1.55 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;}" +
      ".fb-empty{text-align:center;color:#999;padding:26px 10px;}" +
      ".fb-tip{font-size:.8rem;color:#888;margin:12px 0 0;line-height:1.5;}" +
      ".fb-mfoot{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap;}" +
      ".fb-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#1d1a16;color:#fff;padding:13px 22px;border-radius:12px;font:600 .88rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;z-index:99800;opacity:0;pointer-events:none;transition:opacity .25s;box-shadow:0 8px 30px rgba(0,0,0,.4);}" +
      ".fb-toast.on{opacity:1;}" +
      "@media(max-width:600px){.fb-panel{width:100vw;}.fb-mbox{width:94vw;}}";
    var st = document.createElement("style"); st.id = "fb-styles"; st.textContent = css; document.head.appendChild(st);
  }
})();
