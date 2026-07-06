/* =============================================================
   UNI MAX · 顾客自助编辑层 (editor.js)
   -------------------------------------------------------------
   目的：让客户在网页上直接改文案、换图片，导出「修改清单」给我们安排上线。
   激活方式：网址加 ?edit=1  （例：https://unimaxofficial.com/?edit=1）
   对普通访客：脚本一进来就 return，官网零影响、看不到任何编辑入口。
   数据：改动只存在客户自己的浏览器 localStorage，不写服务器、不动线上内容。
   复用现有结构：文字用 [data-i18n] 作 key，图片按文件名归组联动。
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 0. 闸门：需正确密钥才启用（防止任何人随便进入编辑模式）----------
     改下面这行的密钥即可更换口令。只有带此密钥的网址才是「编辑链接」，
     普通访客（含随手加 ?edit=1 的人）一律进不来、看不到任何编辑入口。      */
  var EDIT_KEY = "unimax-2026";
  var qs = new URLSearchParams(location.search);
  var _k = qs.get("edit");
  if (_k !== EDIT_KEY && location.hash.replace(/^#/, "") !== EDIT_KEY) return;

  var LS_KEY = "unimax_editor_overrides_v1";
  var overrides = load();               // { text:{key:val}, images:{base:src} }
  var origText = {};                    // key -> 初始文案（判断是否改动 / 复位）
  var origImg = {};                     // base -> 初始图片 src
  var editing = false;
  var applyingOverride = false;         // 防止 reapply 与 observer 互相触发
  var imgTarget = null;                 // 当前换图针对的 base
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // DOM 就绪即初始化（不等图片/视频/字体），编辑入口第一时间出现
  if (document.readyState !== "loading") setTimeout(init, 0);
  else document.addEventListener("DOMContentLoaded", init);

  function init() {
    markEditable();
    applyStored();        // 客户回访时，把上次改动重新套回页面
    injectStyles();
    buildUI();
    watchLangSwitch();    // 切语言后重新套用文字改动
    observeLang();        // 兜底：任何把文案改回原文的操作都重新覆盖
  }

  /* ---------- 1. 标记可编辑元素 ---------- */
  function markEditable() {
    // 文字：所有 data-i18n 元素
    $$("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!k) return;
      el.setAttribute("data-ed-text", k);
      if (origText[k] == null) origText[k] = el.textContent;
    });
    // 图片：内容图（排除品牌 logo / WhatsApp 图标 / 证书查看器）
    $$("img").forEach(function (img) {
      if (!isEditableImg(img)) return;
      var base = baseName(img.getAttribute("src") || "");
      if (!base) return;
      img.setAttribute("data-ed-imgbase", base);
      if (origImg[base] == null) origImg[base] = img.getAttribute("src");
    });
  }

  function isEditableImg(img) {
    var src = img.getAttribute("src") || "";
    if (/logo-wa|logo-dark/.test(src)) return false;   // WhatsApp 图标 + 顶部/页脚字标 logo
    if (img.classList.contains("wa")) return false;
    if (img.classList.contains("logo-img")) return false;
    if (img.id === "lbImg" || img.closest("#lightbox")) return false; // 证书大图查看器
    return true;
  }

  function baseName(src) {
    var f = src.split("?")[0].split("/").pop() || "";
    return f.replace(/\.[a-z0-9]+$/i, "");
  }

  /* ---------- 2. 套用已存改动 ---------- */
  function applyStored() { applyText(); applyImages(); }

  function applyText() {
    applyingOverride = true;
    Object.keys(overrides.text || {}).forEach(function (k) {
      $$('[data-ed-text="' + cssEsc(k) + '"]').forEach(function (el) {
        if (el.textContent !== overrides.text[k]) el.textContent = overrides.text[k];
        el.setAttribute("data-en", overrides.text[k]); // 让 EN 模式也保持客户文案
        el.classList.add("ued-dirty");
      });
    });
    applyingOverride = false;
  }

  function applyImages() {
    Object.keys(overrides.images || {}).forEach(function (base) {
      $$('[data-ed-imgbase="' + cssEsc(base) + '"]').forEach(function (img) {
        if (img.getAttribute("src") !== overrides.images[base]) img.setAttribute("src", overrides.images[base]);
        img.classList.add("ued-dirty");
      });
    });
  }

  /* ---------- 3. 编辑开关 ---------- */
  function toggleEdit() {
    editing = !editing;
    document.body.classList.toggle("ued-on", editing);
    $$("[data-ed-text]").forEach(function (el) { el.setAttribute("contenteditable", editing ? "true" : "false"); });
    $("#uedFab").innerHTML = editing ? "✕&nbsp; 退出编辑" : "✏️&nbsp; 开始编辑";
    $("#uedSave").style.display = editing ? "inline-flex" : "none";
    $("#uedReset").style.display = editing ? "inline-flex" : "none";
    if (!editing) closeAll();
    refreshCount();
  }

  /* ---------- 4. 文字编辑 ---------- */
  document.addEventListener("input", function (e) {
    if (!editing) return;
    var el = e.target.closest && e.target.closest("[data-ed-text]");
    if (!el) return;
    var k = el.getAttribute("data-ed-text");
    var v = el.textContent;
    if (v === origText[k]) { delete overrides.text[k]; el.classList.remove("ued-dirty"); }
    else { overrides.text[k] = v; el.classList.add("ued-dirty"); }
    // 同 key 的其它元素（例如公告条 / 走马灯的复制件）联动
    $$('[data-ed-text="' + cssEsc(k) + '"]').forEach(function (o) {
      if (o !== el && o.textContent !== v) o.textContent = v;
      o.setAttribute("data-en", v);
    });
    save(); refreshCount();
  });

  // 标题类单行元素：回车不换行，直接失焦
  document.addEventListener("keydown", function (e) {
    if (!editing || e.key !== "Enter") return;
    var el = e.target.closest && e.target.closest("[data-ed-text]");
    if (el && !el.matches("p,li,textarea")) { e.preventDefault(); el.blur(); }
  });

  /* ---------- 5. 点击委派：图片换图 / 拦住链接跳转 ---------- */
  document.addEventListener("click", function (e) {
    if (!editing) return;
    if (e.target.closest(".ued-tool")) return;          // 工具本身不拦
    var img = e.target.closest("[data-ed-imgbase]");
    if (img) { e.preventDefault(); e.stopPropagation(); openImgModal(img); return; }
    // 正在编辑文字时，阻止其外层 <a>/<button> 触发跳转或弹窗
    if (e.target.closest('[contenteditable="true"]')) {
      var act = e.target.closest("a,button");
      if (act && !act.closest(".ued-tool")) e.preventDefault();
    }
  }, true);

  function openImgModal(img) {
    imgTarget = img.getAttribute("data-ed-imgbase");
    $("#uedImgLabel").textContent = imgTarget;
    $("#uedImgPrev").style.display = "none";
    $("#uedImgPrev").src = "";
    $("#uedImgUrl").value = "";
    $("#uedImgFile").value = "";
    $("#uedImgModal").classList.add("on");
  }

  function applyImgChange(src) {
    if (!imgTarget || !src) return;
    overrides.images[imgTarget] = src;
    $$('[data-ed-imgbase="' + cssEsc(imgTarget) + '"]').forEach(function (im) {
      im.setAttribute("src", src);
      im.classList.add("ued-dirty");
    });
    save(); refreshCount();
    $("#uedImgModal").classList.remove("on");
    toast("图片已更换");
  }

  /* ---------- 6. 语言切换后重新套用文字改动 ---------- */
  function watchLangSwitch() {
    var sel = "#langBtn, #langMenu button, [data-drawer-lang], #footLangBtn, #footLangMenu button";
    $$(sel).forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(applyText, 60); });
    });
  }

  function observeLang() {
    if (!("MutationObserver" in window)) return;
    var mo = new MutationObserver(function (muts) {
      if (editing || applyingOverride) return;
      var need = false;
      for (var i = 0; i < muts.length; i++) {
        var t = muts[i].target;
        var el = t.nodeType === 3 ? t.parentElement : t;
        var host = el && el.closest ? el.closest("[data-ed-text]") : null;
        if (host) {
          var k = host.getAttribute("data-ed-text");
          if (overrides.text[k] != null && host.textContent !== overrides.text[k]) { need = true; break; }
        }
      }
      if (need) applyText();
    });
    mo.observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  /* ---------- 7. 修改清单（复制 / 下载） ---------- */
  function buildSummary() {
    var t = Object.keys(overrides.text || {});
    var im = Object.keys(overrides.images || {});
    var box = $("#uedSumBody");
    if (!t.length && !im.length) {
      box.innerHTML = '<p class="ued-empty">还没有任何修改。<br>点「开始编辑」后，直接点文字改字、点图片换图。</p>';
    } else {
      var html = "";
      if (t.length) {
        html += '<div class="ued-sum-h">文字修改 · ' + t.length + " 处</div>";
        t.forEach(function (k, i) {
          html += '<div class="ued-sum-item"><span class="ued-k">' + (i + 1) + ". " + esc(k) + "</span>" +
            '<div class="ued-old">原：' + esc(origText[k] || "") + "</div>" +
            '<div class="ued-new">改：' + esc(overrides.text[k]) + "</div></div>";
        });
      }
      if (im.length) {
        html += '<div class="ued-sum-h">图片更换 · ' + im.length + " 处</div>";
        im.forEach(function (b, i) {
          var v = overrides.images[b];
          var note = v.indexOf("data:") === 0 ? "已上传本地图片（见下载文件）" : v;
          html += '<div class="ued-sum-item"><span class="ued-k">' + (i + 1) + ". " + esc(b) + "</span>" +
            '<div class="ued-new">换成：' + esc(note.slice(0, 90)) + "</div></div>";
        });
      }
      box.innerHTML = html;
    }
    var mb = $("#uedMsg"); if (mb) mb.value = overrides.message || "";
    $("#uedSumModal").classList.add("on");
  }

  function summaryText() {
    var lines = ["UNI MAX 网站 · 修改清单", "页面：" + location.origin + location.pathname, ""];
    if (overrides.message && overrides.message.trim()) { lines.push("【留言】" + overrides.message.trim(), ""); }
    var t = Object.keys(overrides.text || {});
    if (t.length) {
      lines.push("—— 文字（" + t.length + " 处）——");
      t.forEach(function (k, i) { lines.push((i + 1) + ". [" + k + "]\n   原：" + (origText[k] || "") + "\n   改：" + overrides.text[k]); });
      lines.push("");
    }
    var im = Object.keys(overrides.images || {});
    if (im.length) {
      lines.push("—— 图片（" + im.length + " 处）——");
      im.forEach(function (b, i) {
        var v = overrides.images[b];
        lines.push((i + 1) + ". [" + b + "] → " + (v.indexOf("data:") === 0 ? "已上传本地图片（见随附 JSON 文件）" : v));
      });
      lines.push("");
    }
    lines.push("（共 " + (t.length + im.length) + " 处修改，由客户在预览页自助标注）");
    return lines.join("\n");
  }

  function copyText() {
    var txt = summaryText();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast("已复制，可直接粘贴发我们"); }, fallbackCopy.bind(null, txt));
    } else fallbackCopy(txt);
  }
  function fallbackCopy(txt) {
    var ta = document.createElement("textarea");
    ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("已复制，可直接粘贴发我们"); } catch (e) { toast("复制失败，请手动选择"); }
    document.body.removeChild(ta);
  }

  function downloadJSON() {
    var data = { site: "unimax", url: location.href, savedAt: new Date().toISOString(), origText: origText, overrides: overrides };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "unimax-edits.json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
    toast("已下载修改文件");
  }

  function resetAll() {
    if (!confirm("确定要清空所有修改、恢复到原始网页吗？")) return;
    overrides = { text: {}, images: {}, message: "" };
    save();
    $$("[data-ed-text]").forEach(function (el) {
      var k = el.getAttribute("data-ed-text");
      el.textContent = origText[k]; el.setAttribute("data-en", origText[k]); el.classList.remove("ued-dirty");
    });
    Object.keys(origImg).forEach(function (base) {
      $$('[data-ed-imgbase="' + cssEsc(base) + '"]').forEach(function (im) { im.setAttribute("src", origImg[base]); im.classList.remove("ued-dirty"); });
    });
    refreshCount(); toast("已恢复原始网页");
  }

  function refreshCount() {
    var n = Object.keys(overrides.text || {}).length + Object.keys(overrides.images || {}).length;
    var b = $("#uedCount");
    if (b) { b.textContent = n; b.style.display = n ? "inline-flex" : "none"; }
  }

  /* ---------- 8. UI 构建 ---------- */
  function buildUI() {
    var bar = document.createElement("div");
    bar.className = "ued-tool";
    bar.innerHTML =
      '<div id="uedHint" class="ued-hint">✏️ 编辑模式 —— 点任意<b>文字</b>直接改、点<b>图片</b>换图。改完点右下「保存 / 生成清单」。<span class="ued-hint-x" id="uedHintX">知道了</span></div>' +
      '<div id="uedDock" class="ued-dock">' +
      '  <button id="uedFab" class="ued-btn ued-btn-main">✏️&nbsp; 开始编辑</button>' +
      '  <button id="uedSave" class="ued-btn ued-btn-save">💾&nbsp; 保存 / 生成清单 <span id="uedCount" class="ued-count"></span></button>' +
      '  <button id="uedReset" class="ued-btn ued-btn-ghost">↺ 复位</button>' +
      "</div>" +
      // 换图弹窗
      '<div id="uedImgModal" class="ued-modal"><div class="ued-mbox">' +
      '  <h4>更换图片 · <span id="uedImgLabel" class="ued-mono"></span></h4>' +
      '  <img id="uedImgPrev" class="ued-imgprev" alt="预览">' +
      '  <label class="ued-file"><input type="file" id="uedImgFile" accept="image/*"> 从设备选一张图</label>' +
      '  <div class="ued-or">— 或 粘贴图片链接 —</div>' +
      '  <input type="text" id="uedImgUrl" class="ued-input" placeholder="https://…（图片直链）">' +
      '  <div class="ued-mfoot"><button id="uedImgCancel" class="ued-btn ued-btn-ghost">取消</button><button id="uedImgOk" class="ued-btn ued-btn-main">换上</button></div>' +
      "</div></div>" +
      // 清单弹窗
      '<div id="uedSumModal" class="ued-modal"><div class="ued-mbox ued-mbox-lg">' +
      '  <h4>你的修改清单</h4>' +
      '  <div id="uedSumBody" class="ued-sumbody"></div>' +
      '  <div class="ued-msgwrap"><label class="ued-msglabel">✍️ 给我们留言（可选）</label><textarea id="uedMsg" class="ued-input ued-msgbox" placeholder="整体意见、特别要求、想加或想删的内容…"></textarea></div>' +
      '  <p class="ued-tip">改动只存在你的浏览器。点「复制清单」把内容（含留言）发给我们，即可安排上线。含上传图片时请一并「下载文件」发来。</p>' +
      '  <div class="ued-mfoot ued-mfoot-wrap"><button id="uedCopy" class="ued-btn ued-btn-main">📋 复制清单</button><button id="uedDownload" class="ued-btn ued-btn-save">⬇ 下载文件(JSON)</button><button id="uedSumClose" class="ued-btn ued-btn-ghost">关闭</button></div>' +
      "</div></div>" +
      '<div id="uedToast" class="ued-toast"></div>';
    document.body.appendChild(bar);

    $("#uedFab").addEventListener("click", toggleEdit);
    $("#uedSave").addEventListener("click", buildSummary);
    $("#uedReset").addEventListener("click", resetAll);
    $("#uedHintX").addEventListener("click", function () { $("#uedHint").style.display = "none"; });
    // 换图
    $("#uedImgFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function (ev) { $("#uedImgPrev").src = ev.target.result; $("#uedImgPrev").style.display = "block"; $("#uedImgUrl").value = ""; };
      rd.readAsDataURL(f);
    });
    $("#uedImgUrl").addEventListener("input", function (e) {
      var u = e.target.value.trim();
      if (u) { $("#uedImgPrev").src = u; $("#uedImgPrev").style.display = "block"; }
    });
    $("#uedImgCancel").addEventListener("click", function () { $("#uedImgModal").classList.remove("on"); });
    $("#uedImgOk").addEventListener("click", function () {
      var src = $("#uedImgPrev").src;
      if (!src) { toast("先选一张图或贴链接"); return; }
      applyImgChange(src);
    });
    // 清单
    $("#uedCopy").addEventListener("click", copyText);
    $("#uedDownload").addEventListener("click", downloadJSON);
    $("#uedSumClose").addEventListener("click", function () { $("#uedSumModal").classList.remove("on"); });
    $("#uedMsg").addEventListener("input", function (e) { overrides.message = e.target.value; save(); });

    refreshCount();
  }

  function closeAll() { $("#uedImgModal").classList.remove("on"); $("#uedSumModal").classList.remove("on"); }

  function toast(msg) {
    var t = $("#uedToast"); if (!t) return;
    t.textContent = msg; t.classList.add("on");
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("on"); }, 2400);
  }

  /* ---------- 9. 存取 / 工具 ---------- */
  function load() {
    try { var o = JSON.parse(localStorage.getItem(LS_KEY) || "{}"); return { text: o.text || {}, images: o.images || {}, message: o.message || "" }; }
    catch (e) { return { text: {}, images: {} }; }
  }
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(overrides)); } catch (e) { } }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function cssEsc(s) { return String(s).replace(/["\\]/g, "\\$&"); }

  /* ---------- 10. 样式（内联注入，不动 styles.css） ---------- */
  function injectStyles() {
    var css =
      "body.ued-on{padding-top:44px!important;}" +
      ".ued-hint{position:fixed;top:0;left:0;right:0;z-index:99000;background:#166a3a;color:#fff;text-align:center;padding:11px 40px;font:600 .86rem/1.4 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;display:none;}" +
      "body.ued-on .ued-hint{display:block;}" +
      ".ued-hint b{color:#ffe08a;}" +
      ".ued-hint-x{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.2);padding:3px 10px;border-radius:20px;cursor:pointer;font-size:.78rem;}" +
      ".ued-dock{position:fixed;right:18px;bottom:18px;z-index:99000;display:flex;flex-direction:column;gap:10px;align-items:flex-end;}" +
      ".ued-btn{font:700 .9rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;border:none;border-radius:40px;padding:13px 20px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 8px 26px rgba(0,0,0,.28);transition:transform .14s;}" +
      ".ued-btn:hover{transform:translateY(-2px);}" +
      ".ued-btn-main{background:#166a3a;color:#fff;}" +
      ".ued-btn-save{background:#c98a26;color:#fff;display:none;}" +
      ".ued-btn-ghost{background:#fff;color:#333;border:1.5px solid #d8d8d8;box-shadow:0 4px 14px rgba(0,0,0,.14);display:none;padding:10px 16px;font-size:.82rem;}" +
      ".ued-count{background:rgba(255,255,255,.28);border-radius:20px;padding:1px 8px;font-size:.78rem;display:none;}" +
      // 可编辑高亮
      "body.ued-on [data-ed-text]{outline:1.5px dashed rgba(22,106,58,.5);outline-offset:3px;border-radius:3px;cursor:text;transition:outline .12s,background .12s;}" +
      "body.ued-on [data-ed-text]:hover{outline:2px solid #1f9152;background:rgba(31,145,82,.08);}" +
      "body.ued-on [data-ed-text]:focus{outline:2.5px solid #1f9152;background:rgba(31,145,82,.1);}" +
      "body.ued-on [data-ed-imgbase]{outline:2px dashed rgba(201,138,38,.7);outline-offset:3px;cursor:pointer;transition:outline .12s;}" +
      "body.ued-on [data-ed-imgbase]:hover{outline:3px solid #c98a26;}" +
      "[data-ed-text].ued-dirty{outline:2px solid #c98a26!important;}" +
      "[data-ed-imgbase].ued-dirty{outline:3px solid #c98a26!important;}" +
      // 弹窗
      ".ued-modal{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:99500;display:none;align-items:center;justify-content:center;padding:16px;}" +
      ".ued-modal.on{display:flex;}" +
      ".ued-mbox{background:#fff;color:#1d1a16;border-radius:16px;padding:24px;width:400px;max-width:94vw;font:400 .92rem/1.5 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;box-shadow:0 24px 70px rgba(0,0,0,.4);}" +
      ".ued-mbox-lg{width:540px;}" +
      ".ued-mbox h4{font-size:1.12rem;margin:0 0 16px;font-weight:800;}" +
      ".ued-mono{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.82rem;color:#166a3a;}" +
      ".ued-imgprev{width:100%;height:150px;object-fit:contain;background:#f3f3f3;border-radius:10px;margin-bottom:12px;display:none;}" +
      ".ued-file{display:block;padding:11px;border:1.5px dashed #cfcfcf;border-radius:10px;font-size:.86rem;cursor:pointer;margin-bottom:10px;}" +
      ".ued-or{font-size:.76rem;color:#aaa;text-align:center;margin:8px 0;}" +
      ".ued-input{width:100%;border:1.5px solid #ddd;border-radius:10px;padding:11px;font-size:.9rem;font-family:inherit;}" +
      ".ued-mfoot{display:flex;gap:10px;margin-top:18px;}" +
      ".ued-mfoot .ued-btn{flex:1;justify-content:center;box-shadow:none;display:inline-flex;}" +
      ".ued-mfoot-wrap{flex-wrap:wrap;}" +
      ".ued-sumbody{max-height:46vh;overflow-y:auto;border:1px solid #eee;border-radius:12px;padding:6px 14px;}" +
      ".ued-sum-h{font-weight:800;color:#166a3a;font-size:.82rem;text-transform:uppercase;letter-spacing:.04em;margin:14px 0 8px;}" +
      ".ued-sum-item{padding:9px 0;border-bottom:1px solid #f2f2f2;}" +
      ".ued-k{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.78rem;color:#888;}" +
      ".ued-old{color:#b23;text-decoration:line-through;opacity:.7;font-size:.86rem;margin-top:3px;}" +
      ".ued-new{color:#166a3a;font-weight:600;font-size:.9rem;margin-top:2px;}" +
      ".ued-empty{text-align:center;color:#999;padding:30px 10px;}" +
      ".ued-tip{font-size:.8rem;color:#888;margin:14px 0 0;line-height:1.5;}" +
      ".ued-msgwrap{margin-top:14px;}" +
      ".ued-msglabel{display:block;font-size:.82rem;font-weight:700;color:#166a3a;margin-bottom:6px;}" +
      ".ued-msgbox{min-height:64px;resize:vertical;font-family:inherit;}" +
      ".ued-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:#1d1a16;color:#fff;padding:13px 22px;border-radius:12px;font:600 .88rem/1 -apple-system,'Segoe UI','Microsoft YaHei',sans-serif;z-index:99800;opacity:0;pointer-events:none;transition:opacity .25s;box-shadow:0 8px 30px rgba(0,0,0,.4);}" +
      ".ued-toast.on{opacity:1;}" +
      "@media(max-width:600px){.ued-mbox-lg{width:94vw;}.ued-btn{padding:11px 15px;font-size:.82rem;}}";
    var st = document.createElement("style");
    st.id = "ued-styles";
    st.textContent = css;
    document.head.appendChild(st);
  }
})();
