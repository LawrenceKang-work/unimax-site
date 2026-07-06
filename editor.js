/* =============================================================
   UNI MAX · 客改层 (Client Revision Layer) v7 · 双语
   -------------------------------------------------------------
   ✏️ 编辑模式：直接改（文字/图/视频/板块背景）→ 💾 发布我的改动（不限次数）
   💬 留言模式：整页/板块/元素 逐处评审（满意·要改·不要 + 说明 + 截图）
               → 加入本轮草稿箱 → 🚀 提交本轮（V1–V6，共 6 轮）
   语言：UI 跟随站点 <html lang> 自动中↔英切换（切语言重建挂件）。
   授权：?edit=<密钥> 打开一次 → 本机记住；无密钥者零影响。
   数据：本机 localStorage + 客户自有 Cloudflare（D1 轮次 / R2 截图）。
   规范：控制中心 agent-docs/design/client-revision-layer.md
   ============================================================= */
(function () {
  "use strict";

  /* ---------- 0. 密钥门禁 ---------- */
  var EDIT_KEY = "unimax-2026";
  var TKEY = "fbedit_unimax";
  var urlKey = new URLSearchParams(location.search).get("edit") || location.hash.replace(/^#/, "");
  if (urlKey === EDIT_KEY) { try { localStorage.setItem(TKEY, urlKey); } catch (e) { } }
  var stored = ""; try { stored = localStorage.getItem(TKEY) || ""; } catch (e) { }
  if (urlKey !== EDIT_KEY && stored !== EDIT_KEY) return;

  /* ---------- 双语字典 ---------- */
  var UILANG = {
    zh: {
      hint_edit: '✏️ 编辑模式 —— 点<b>文字</b>直接改、点<b>图片 / 视频 / 板块背景</b>替换。改完点右下 <b>「💾 发布我的改动」</b> —— 编辑<b>不限次数</b>，随便改随便发。',
      hint_fb: '💬 留言模式 —— 推荐<b>点板块空白处</b>对整块留言（也可单个元素、或右下「📄 整页留言」），每处可附<b>截图</b>。「加入草稿」<b>不耗轮次</b>；攒齐后在左下草稿箱点 <b>「🚀 提交本轮」</b> —— 留言反馈共 {m} 轮，请集中提交。',
      hint_ok: '知道了',
      btn_edit: '✏️&nbsp; 编辑', btn_edit_exit: '✕&nbsp; 退出编辑',
      btn_fb: '💬&nbsp; 留言', btn_fb_exit: '✕&nbsp; 退出留言',
      btn_publish: '💾&nbsp; 发布我的改动', btn_publish_n: '💾&nbsp; 发布我的改动（{n} 处）', btn_publishing: '发布中…',
      btn_reset: '↺&nbsp; 复位', btn_page: '📄&nbsp; 整页留言',
      chip: '修改轮次：已用 <b>{u}</b> / {m}{extra}', chip_full: ' · 已达约定', chip_over: ' · ⚠已超约定 {n} 轮', chip_last: ' · ⚠最后一轮',
      draft_head: '📋 本轮留言草稿 · <b>{n}</b> 处', draft_sub: '未提交 —— 攒齐所有想改的地方再一起提交（留言共 {m} 轮）',
      draft_submit: '🚀 提交本轮留言（第 {v} / {m} 轮）', draft_submit_over: '🚀 提交第 {v} 轮（已超约定 {m} 轮）', draft_del: '从草稿移除',
      fb_title: '留言反馈', fb_notfilled: '还没填过', fb_cur: '当前：',
      st_done: '已定稿', st_removed: '标记为不要', st_todo: '待改',
      scope_page: '整个页面', scope_block: '整个板块', scope_el: '元素 · {t} · 属于「{b}」',
      type_text: '文字', type_image: '图片', type_video: '视频', type_button: '按钮',
      st_sat: '✓ 满意<br>定稿', st_chg: '✎ 要<br>修改', st_rmv: '🗑 不要<br>这块',
      sec_text_label: '改成这样（直接写新文案）', sec_text_ph: '把这里的文字改成…',
      sec_image_label: '换成这张图', or_img_link: '— 或贴图片链接 —',
      types_label: '要改什么（可多选）',
      tp_copy: '文案', tp_image: '图片', tp_color: '颜色', tp_layout: '排版', tp_style: '整体风格', tp_other: '其他',
      comment_label: '补充说明（可选）', comment_label_rm: '为什么不要这块？（可选）', comment_label_sat: '想补一句？（可选）', comment_ph: '写下你的想法…',
      shot_label: '补充截图（可选）—— 可自己截图圈出要改的位置再传上来', shot_up: '📷 上传截图', shot_remove: '✕ 移除',
      shot_uploading: '上传中…', shot_ok: '已上传 ✓', shot_local: '已保存在本机（导出时随文件一起发）', shot_fail: '上传失败，请重试',
      fbp_tip: '「加入草稿」不消耗轮次；留言反馈共 {m} 轮，全部标完后在左下草稿箱点「🚀 提交本轮」一次性提交。',
      btn_cancel: '取消', btn_add_draft: '＋ 加入本轮草稿',
      media_image: '换图片', media_video: '换视频', media_bg: '换背景图',
      media_note_img: '从设备选图（≤1.5MB），或粘贴图片链接。', media_note_vid: '请粘贴视频链接（mp4/webm）。视频文件较大，也可以直接把文件发给我们。',
      media_or: '— 或粘贴链接 —', media_ok: '换上',
      round_title: '提交本轮留言（V{v}）',
      round_sum: '本轮将一次性提交 <b>{n}</b> 条留言反馈，整批作为一个版本处理。<br><span class="ce-dim">（你在编辑模式直接改的内容不占轮次，用「发布我的改动」单独提交）</span>',
      round_note_label: '本轮总体说明（可选）', round_note_ph: '例：这一轮主要想把首屏和配色调得更年轻…',
      round_warn: '⚠️ 提交将消耗 {m} 次修改轮次中的 <b>1 次</b>，请确认本轮所有想改的地方都已标注完。提交后我们会把整批改动汇总为一个版本处理。', round_warn_over: '⚠️ 这是<b>超出约定 {m} 轮</b>的第 {v} 轮。你仍可提交、我们照常收到并记录，超出部分可能需另行沟通。',
      round_chk: '我确认本轮已全部标注完毕', round_cancel: '再想想', round_go: '确认提交', round_submitting: '提交中…',
      ts_added: '已加入本轮草稿 · 继续标其它，或点草稿箱底部「提交本轮」一次性交',
      ts_media: '已替换 · 点「💾 发布我的改动」提交（编辑不限次数）',
      ts_removed: '已从本轮草稿移除', ts_reset: '已恢复原样',
      ts_pub_ok: '✅ 已发布你的改动 —— 编辑不限次数，我们会应用到网站', ts_pub_fail: '云端暂不可达，已下载改动文件，请发给我们', ts_pub_none: '还没有任何编辑改动',
      ts_round_ok: '✅ 本轮留言已提交为 V{v}，我们会汇总处理', ts_round_local: '✅ 已记为 V{v}（云端暂不可达，已下载文件请发我们）',
      ts_exhausted: '{m} 轮留言已用完，如需再改请联系我们', ts_no_fb: '本轮还没有任何留言', ts_el_hidden: '该元素在当前语言下不可见',
      ts_pick_first: '先选图或贴链接', ts_pick_status: '先选 满意 / 要修改 / 不要这块', ts_storage: '存储空间不足：上传图片太大，请改用图片链接',
      cf_reset: '清空「直接编辑」的所有改动、恢复原样？（留言记录保留）'
    },
    en: {
      hint_edit: '✏️ Edit mode — click <b>text</b> to retype, click <b>images / video / section background</b> to replace. When done, hit <b>“💾 Publish my changes”</b> bottom-right — edits are <b>unlimited</b>.',
      hint_fb: '💬 Feedback mode — best to click a <b>section’s blank area</b> for whole-block feedback (or a single element, or “📄 Whole page” bottom-right). Each note can attach a <b>screenshot</b>. “Add to draft” <b>uses no round</b>; once everything is marked, hit <b>“🚀 Submit this round”</b> in the draft box (bottom-left) — feedback is limited to {m} rounds, please batch.',
      hint_ok: 'Got it',
      btn_edit: '✏️&nbsp; Edit', btn_edit_exit: '✕&nbsp; Exit',
      btn_fb: '💬&nbsp; Feedback', btn_fb_exit: '✕&nbsp; Exit',
      btn_publish: '💾&nbsp; Publish my changes', btn_publish_n: '💾&nbsp; Publish my changes ({n})', btn_publishing: 'Publishing…',
      btn_reset: '↺&nbsp; Reset', btn_page: '📄&nbsp; Whole page',
      chip: 'Revision rounds: <b>{u}</b> / {m} used{extra}', chip_full: ' · agreed limit reached', chip_over: ' · ⚠{n} over the agreed limit', chip_last: ' · ⚠last round',
      draft_head: '📋 This round’s draft · <b>{n}</b>', draft_sub: 'Not submitted — collect every change first, then submit together ({m} rounds total)',
      draft_submit: '🚀 Submit this round ({v} / {m})', draft_submit_over: '🚀 Submit round {v} (past the agreed {m})', draft_del: 'Remove from draft',
      fb_title: 'Feedback', fb_notfilled: 'Not filled yet', fb_cur: 'Current: ',
      st_done: 'Approved', st_removed: 'Marked to remove', st_todo: 'To change',
      scope_page: 'Whole page', scope_block: 'Whole section', scope_el: 'Element · {t} · in “{b}”',
      type_text: 'Text', type_image: 'Image', type_video: 'Video', type_button: 'Button',
      st_sat: '✓ Keep<br>as is', st_chg: '✎ Needs<br>change', st_rmv: '🗑 Remove<br>this',
      sec_text_label: 'Change to (write the new text)', sec_text_ph: 'Rewrite this text as…',
      sec_image_label: 'Replace with this image', or_img_link: '— or paste an image link —',
      types_label: 'What to change (multi-select)',
      tp_copy: 'Copy', tp_image: 'Image', tp_color: 'Color', tp_layout: 'Layout', tp_style: 'Overall style', tp_other: 'Other',
      comment_label: 'Notes (optional)', comment_label_rm: 'Why remove this? (optional)', comment_label_sat: 'Anything to add? (optional)', comment_ph: 'Write your thoughts…',
      shot_label: 'Screenshot (optional) — mark up where to change, then upload', shot_up: '📷 Upload screenshot', shot_remove: '✕ Remove',
      shot_uploading: 'Uploading…', shot_ok: 'Uploaded ✓', shot_local: 'Saved on this device (sent with the export file)', shot_fail: 'Upload failed, please retry',
      fbp_tip: '“Add to draft” uses no round. Feedback is limited to {m} rounds — once everything is marked, hit “🚀 Submit this round” in the draft box (bottom-left).',
      btn_cancel: 'Cancel', btn_add_draft: '＋ Add to this round',
      media_image: 'Replace image', media_video: 'Replace video', media_bg: 'Replace background',
      media_note_img: 'Pick an image (≤1.5MB) or paste an image link.', media_note_vid: 'Paste a video link (mp4/webm). Videos are large — you can also send us the file directly.',
      media_or: '— or paste a link —', media_ok: 'Apply',
      round_title: 'Submit this round (V{v})',
      round_sum: 'This submits <b>{n}</b> feedback notes at once, handled as one version.<br><span class="ce-dim">(Direct edits don’t count toward rounds — publish those separately with “Publish my changes”.)</span>',
      round_note_label: 'Overall note for this round (optional)', round_note_ph: 'e.g. This round is mainly a younger hero and color scheme…',
      round_warn: '⚠️ This uses <b>1</b> of your {m} revision rounds. Please make sure everything for this round is marked — we’ll handle the whole batch as one version.', round_warn_over: '⚠️ This is round {v}, <b>past the agreed {m} rounds</b>. You can still submit — we’ll receive and log it; the extra rounds may need a separate chat.',
      round_chk: 'I confirm everything for this round is marked', round_cancel: 'Not yet', round_go: 'Confirm & submit', round_submitting: 'Submitting…',
      ts_added: 'Added to this round · keep marking, or hit “Submit this round” in the draft box',
      ts_media: 'Replaced · hit “💾 Publish my changes” (edits are unlimited)',
      ts_removed: 'Removed from this round’s draft', ts_reset: 'Restored to original',
      ts_pub_ok: '✅ Your changes are published — edits are unlimited, we’ll apply them', ts_pub_fail: 'Cloud unreachable — a file was downloaded, please send it to us', ts_pub_none: 'No edits yet',
      ts_round_ok: '✅ This round submitted as V{v} — we’ll consolidate it', ts_round_local: '✅ Saved as V{v} (cloud unreachable — file downloaded, please send it)',
      ts_exhausted: 'All {m} feedback rounds used — please contact us if you need more', ts_no_fb: 'No feedback in this round yet', ts_el_hidden: 'That element isn’t visible in the current language',
      ts_pick_first: 'Pick an image or paste a link first', ts_pick_status: 'Pick Keep / Change / Remove first', ts_storage: 'Storage full: image too large — please use an image link',
      cf_reset: 'Clear all direct edits and restore original? (feedback notes are kept)'
    }
  };
  function uiLang() {
    var l = "";
    try { l = localStorage.getItem("unimax_lang") || ""; } catch (e) { }   // app.js 存的权威当前语言，最可靠
    if (!l) l = document.documentElement.getAttribute("lang") || "en";       // 兜底：<html lang>
    l = l.toLowerCase();
    return l.indexOf("zh") === 0 ? "zh" : "en";   // 中文→中文，其余一律→英文
  }
  function t(k, a) { var s = (UILANG[uiLang()] || UILANG.en)[k]; if (s == null) s = UILANG.en[k] || k; if (a) Object.keys(a).forEach(function (x) { s = s.split("{" + x + "}").join(a[x]); }); return s; }

  /* ---------- 状态 ---------- */
  var LS_ED = "unimax_edits_v2", LS_FB = "unimax_feedback_v1", LS_ROUNDS = "unimax_rounds_v1";
  var API_BASE = "https://unimax-demo.pages.dev", MAX_ROUNDS = 6;
  var mode = null, fbTarget = null, mediaTarget = null, applying = false;
  var edits = loadEdits(), feedback = loadFb(), rounds = loadRounds();
  var cloudUsed = -1, curShot = "";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  if (document.readyState !== "loading") setTimeout(init, 0);
  else document.addEventListener("DOMContentLoaded", init);

  function init() {
    annotate(); baseline(); injectStyles(); buildUI(); bindEvents();
    applyEdits(); applyFbPreviews(); watchLang(); fetchCloudRounds();
  }

  /* ---------- 1. 自动标注 ---------- */
  function annotate() {
    $$("header.header, main section, footer.footer").forEach(function (sec, i) {
      if (!sec.hasAttribute("data-fb-block")) {
        sec.setAttribute("data-fb-block", sec.id || ("sec" + i));
        var l = sec.querySelector(".eyebrow, h1, h2, h5");
        sec.setAttribute("data-fb-label", ((l ? l.textContent.trim().replace(/\s+/g, " ") : "").slice(0, 22)) || sec.id || ("#" + (i + 1)));
      }
    });
    $$("[data-i18n]").forEach(function (el) {
      if (el.hasAttribute("data-fb-el")) return;
      el.setAttribute("data-fb-el", "text");
      el.setAttribute("data-fb-key", el.getAttribute("data-i18n"));
      el.setAttribute("data-fb-ellabel", (el.textContent.trim().replace(/\s+/g, " ").slice(0, 20)) || el.getAttribute("data-i18n"));
    });
    $$("img").forEach(function (img) {
      if (!editableImg(img) || img.hasAttribute("data-fb-el")) return;
      var base = baseName(img.getAttribute("src") || ""); if (!base) return;
      img.setAttribute("data-fb-el", "image");
      img.setAttribute("data-fb-key", base);
      img.setAttribute("data-fb-ellabel", (img.getAttribute("alt") || base).slice(0, 22));
      var p = img.parentElement; if (p && !p.hasAttribute("data-fb-imgparent")) p.setAttribute("data-fb-imgparent", base);
    });
    $$("video").forEach(function (v) {
      if (v.hasAttribute("data-fb-el")) return;
      var src = v.getAttribute("src") || (v.querySelector("source") ? v.querySelector("source").getAttribute("src") : ""); if (!src) return;
      v.setAttribute("data-fb-el", "video");
      v.setAttribute("data-fb-key", baseName(src));
      v.setAttribute("data-fb-ellabel", baseName(src));
    });
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
  function baseline() { $$("[data-fb-el]").forEach(function (el) { el._orig = (el.dataset.fbEl === "image" || el.dataset.fbEl === "video") ? el.getAttribute("src") : el.textContent; }); }

  /* ---------- 2. 存取 ---------- */
  function loadEdits() { try { var o = JSON.parse(localStorage.getItem(LS_ED) || "{}"); return { text: o.text || {}, images: o.images || {}, videos: o.videos || {}, bgs: o.bgs || {} }; } catch (e) { return { text: {}, images: {}, videos: {}, bgs: {} }; } }
  function saveEdits() { try { localStorage.setItem(LS_ED, JSON.stringify(edits)); } catch (e) { toast(t("ts_storage")); } }
  function loadFb() { try { return JSON.parse(localStorage.getItem(LS_FB) || "[]"); } catch (e) { return []; } }
  function saveFb() { try { localStorage.setItem(LS_FB, JSON.stringify(feedback)); } catch (e) { } }
  function fbRecKey(x) { return x.target === "element" ? "el:" + x.key : x.target === "page" ? "page" : "block:" + x.block_id; }
  function loadRounds() { try { return JSON.parse(localStorage.getItem(LS_ROUNDS) || "[]"); } catch (e) { return []; } }
  function saveRounds() { try { localStorage.setItem(LS_ROUNDS, JSON.stringify(rounds)); } catch (e) { } }
  function usedRounds() { return Math.max(cloudUsed < 0 ? 0 : cloudUsed, rounds.length); }
  function fetchCloudRounds(cb) {
    try {
      fetch(API_BASE + "/api/feedback?client=unimax").then(function (r) { return r.json(); }).then(function (j) {
        if (j && j.success) { cloudUsed = j.used || 0; if ((j.rounds || []).length >= rounds.length) { rounds = j.rounds.map(function (r2) { return { v: r2.round_no, at: r2.created_at, note: r2.note, records: r2.records, synced: true }; }); saveRounds(); } }
        updateRoundChip(); if (cb) cb();
      }).catch(function () { updateRoundChip(); if (cb) cb(); });
    } catch (e) { updateRoundChip(); if (cb) cb(); }
  }
  function uploadShot(file, done) {
    var img = new Image();
    img.onload = function () {
      var scale = Math.min(1, 1600 / img.width);
      var cv = document.createElement("canvas");
      cv.width = Math.round(img.width * scale); cv.height = Math.round(img.height * scale);
      cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
      cv.toBlob(function (blob) {
        if (!blob) { done(null); return; }
        var fd = new FormData(); fd.append("file", new File([blob], "shot.jpg", { type: "image/jpeg" }));
        fetch(API_BASE + "/api/upload", { method: "POST", body: fd }).then(function (r) { return r.json(); }).then(function (j) {
          if (j && j.success && j.url) done(API_BASE + j.url); else done(cv.toDataURL("image/jpeg", 0.6));
        }).catch(function () { done(cv.toDataURL("image/jpeg", 0.6)); });
      }, "image/jpeg", 0.85);
    };
    img.onerror = function () { done(null); };
    img.src = URL.createObjectURL(file);
  }

  /* ---------- 3. 应用改动 ---------- */
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
    applyBgs(); applying = false;
  }
  function applyFbPreviews() {
    applying = true;
    feedback.filter(function (d) { return d.target === "element" && d.status === "change"; }).forEach(function (d) {
      if (edits.text[d.key] != null || edits.images[d.key] != null) return;
      if (d.el_type === "text" && d.new_text) setText(d.key, d.new_text);
      else if (d.el_type === "image" && d.new_image_url) setImg(d.key, d.new_image_url);
    });
    applying = false;
  }
  function watchLang() {
    if (!("MutationObserver" in window)) return;
    // ① 监听 <html lang> 变化（app.js 初始 applyLang + 用户切换都会改它）→ 挂件重建为对应语言
    var lastUi = uiLang();
    new MutationObserver(function () {
      var now = uiLang();
      if (now !== lastUi) { lastUi = now; applyEdits(); applyFbPreviews(); rebuildUI(); }
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    // ② 语言切换也点了按钮时兜底一次（防某些浏览器属性变化不触发）
    $$("#langBtn, #langMenu button, [data-drawer-lang], #footLangBtn, #footLangMenu button").forEach(function (b) {
      b.addEventListener("click", function () { setTimeout(function () { var now = uiLang(); if (now !== lastUi) { lastUi = now; applyEdits(); applyFbPreviews(); rebuildUI(); } }, 120); });
    });
    // ③ 文字被 applyLang 改回时重套编辑/留言预览
    new MutationObserver(function () {
      if (applying || mode === "edit") return;
      var dirty = Object.keys(edits.text).some(function (k) { var el = $('[data-fb-key="' + cssEsc(k) + '"]'); return el && el.textContent !== edits.text[k]; });
      if (dirty) { applyEdits(); applyFbPreviews(); }
    }).observe(document.body, { subtree: true, childList: true, characterData: true });
  }

  /* ---------- 4. 模式切换（互斥） ---------- */
  function setMode(m) {
    if (mode === m) m = null;
    document.body.classList.remove("ce-edit", "fb-on");
    $$('[data-fb-el="text"]').forEach(function (el) { el.removeAttribute("contenteditable"); });
    $("#fbPanel").classList.remove("on"); $("#ceModal").classList.remove("on"); $("#ceRoundModal").classList.remove("on");
    mode = m;
    if (mode === "edit") { document.body.classList.add("ce-edit"); $$('[data-fb-el="text"]').forEach(function (el) { el.setAttribute("contenteditable", "true"); }); }
    else if (mode === "fb") { document.body.classList.add("fb-on"); }
    $("#ceEditBtn").innerHTML = mode === "edit" ? t("btn_edit_exit") : t("btn_edit");
    $("#ceFbBtn").innerHTML = mode === "fb" ? t("btn_fb_exit") : t("btn_fb");
    $("#ceEditBtn").classList.toggle("on", mode === "edit");
    $("#ceFbBtn").classList.toggle("on", mode === "fb");
    $("#ceEditOps").style.display = mode === "edit" ? "flex" : "none";
    $("#ceFbOps").style.display = mode === "fb" ? "flex" : "none";
    $("#ceRoundChip").style.display = mode === "fb" ? "block" : "none";
    updateRoundChip(); updatePublishBtn();
    $("#ceHintEdit").style.display = (mode === "edit" && !sessionStorage.getItem("ceHintEditX")) ? "block" : "none";
    $("#ceHintFb").style.display = (mode === "fb" && !sessionStorage.getItem("ceHintFbX")) ? "block" : "none";
    document.body.classList.toggle("ce-pad", !!mode && ((mode === "edit" && !sessionStorage.getItem("ceHintEditX")) || (mode === "fb" && !sessionStorage.getItem("ceHintFbX"))));
    fbRenderMarks(); fbRenderList();
  }
  function rebuildUI() {
    var m = mode;
    document.body.classList.remove("ce-edit", "fb-on");
    $$('[data-fb-el="text"]').forEach(function (el) { el.removeAttribute("contenteditable"); });
    var ui = $(".ce-ui"); if (ui) ui.remove();
    mode = null;
    buildUI(); bindEvents();
    if (m) setMode(m); else { updateRoundChip(); updatePublishBtn(); fbRenderMarks(); fbRenderList(); }
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
    saveEdits(); updatePublishBtn();
  });
  document.addEventListener("keydown", function (e) {
    if (mode !== "edit" || e.key !== "Enter") return;
    var el = e.target.closest && e.target.closest('[data-fb-el="text"]');
    if (el && !el.matches("p,li")) { e.preventDefault(); el.blur(); }
  });

  /* ---------- 6. 统一点击委派（capture） ---------- */
  var UI_SEL = ".ce-ui";
  function hitMedia(x, y) {
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
    if (e.target.closest(UI_SEL)) return;
    if (mode === "edit") {
      var media = hitMedia(e.clientX, e.clientY);
      if (media) { e.preventDefault(); e.stopPropagation(); openMediaModal(media.dataset.fbEl, media.dataset.fbKey, media.dataset.fbEllabel); return; }
      var txt = e.target.closest('[data-fb-el="text"]');
      if (txt) { if (txt.closest("a[href]")) e.preventDefault(); e.stopPropagation(); return; }
      var bgSec = e.target.closest("[data-fb-bg]");
      if (bgSec) { e.preventDefault(); e.stopPropagation(); openMediaModal("bg", bgSec.getAttribute("data-fb-bgsel"), bgSec.getAttribute("data-fb-bg")); return; }
      if (e.target.closest("a[href]")) e.preventDefault();
      e.stopPropagation();
    } else if (mode === "fb") {
      var el2 = e.target.closest("[data-fb-el]");
      if (!el2) { var ip = e.target.closest("[data-fb-imgparent]"); if (ip) el2 = ip.querySelector('img[data-fb-el="image"]'); }
      if (!el2) el2 = hitMedia(e.clientX, e.clientY);
      var block = e.target.closest("[data-fb-block]");
      if (el2 && block) { e.preventDefault(); e.stopPropagation(); fbOpen("element", el2, block); }
      else if (block) { e.preventDefault(); e.stopPropagation(); fbOpen("block", null, block); }
    }
  }, true);

  /* ---------- 7. 换媒体弹窗 ---------- */
  function openMediaModal(type, key, label) {
    mediaTarget = { type: type, key: key };
    $("#ceMTitle").textContent = t("media_" + type);
    $("#ceMLabel").textContent = label || key;
    $("#ceMNote").textContent = type === "video" ? t("media_note_vid") : t("media_note_img");
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
    if (!url) { toast(t("ts_pick_first")); return; }
    if (mediaTarget.type === "image") { edits.images[mediaTarget.key] = url; setImg(mediaTarget.key, url); }
    else if (mediaTarget.type === "video") { edits.videos[mediaTarget.key] = url; setVid(mediaTarget.key, url); }
    else if (mediaTarget.type === "bg") { edits.bgs[mediaTarget.key] = url; applyBgs(); }
    saveEdits(); updatePublishBtn();
    $("#ceModal").classList.remove("on");
    toast(t("ts_media"));
  }

  /* ---------- 8. 留言模式 ---------- */
  function fbOpen(target, el, block) {
    fbTarget = target === "page"
      ? { target: "page", block_id: "__page", block_label: t("scope_page"), key: null, el_type: null, el_label: null, _el: null }
      : { target: target, block_id: block.dataset.fbBlock, block_label: block.dataset.fbLabel, key: el ? el.dataset.fbKey : null, el_type: el ? el.dataset.fbEl : null, el_label: el ? el.dataset.fbEllabel : null, _el: el };
    $("#fbpBlk").textContent = target === "element" ? (fbTarget.el_label || fbTarget.key) : fbTarget.block_label;
    $("#fbpScope").textContent = target === "element" ? t("scope_el", { t: t("type_" + fbTarget.el_type), b: fbTarget.block_label }) : target === "page" ? t("scope_page") : t("scope_block");
    $("#fbpScope").className = "scope " + (target === "element" ? "el" : "block");
    $$("input[name=fbStatus]").forEach(function (i) { i.checked = false; });
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    $("#fbNewText").value = ""; $("#fbComment").value = ""; $("#fbImgUrl").value = ""; $("#fbImgFile").value = "";
    $("#fbImgPreview").style.display = "none";
    $$(".fb-types input").forEach(function (i) { i.checked = false; });
    curShot = ""; renderShot(); $("#fbShotFile").value = "";
    var rec = feedback.find(function (d) { return fbRecKey(d) === fbRecKey(fbTarget); });
    if (rec) {
      $("#fbpCur").textContent = t("fb_cur") + (rec.status === "satisfied" ? t("st_done") : rec.status === "remove" ? t("st_removed") : t("st_todo"));
      var r = $('input[name=fbStatus][value="' + rec.status + '"]'); if (r) r.checked = true;
      fbApplyStatus(rec.status);
      if (rec.new_text) $("#fbNewText").value = rec.new_text;
      if (rec.comment) $("#fbComment").value = rec.comment;
      if (rec.new_image_url) $("#fbImgUrl").value = rec.new_image_url;
      if (rec.screenshot) { curShot = rec.screenshot; renderShot(); }
      (rec.change_types || []).forEach(function (ct) { var i = $$(".fb-types input").find(function (x) { return x.value === ct; }); if (i) i.checked = true; });
    } else $("#fbpCur").textContent = t("fb_notfilled");
    $("#fbPanel").classList.add("on");
  }
  function fbApplyStatus(status) {
    $$(".fb-section").forEach(function (s) { s.classList.remove("on"); });
    $("#fbSecComment").classList.add("on");
    $("#fbSecShot").classList.add("on");
    $("#fbCommentLabel").textContent = status === "remove" ? t("comment_label_rm") : status === "satisfied" ? t("comment_label_sat") : t("comment_label");
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
    if (!status) { alert(t("ts_pick_status")); return; }
    var rec = { target: fbTarget.target, block_id: fbTarget.block_id, block_label: fbTarget.block_label, key: fbTarget.key, el_type: fbTarget.el_type, el_label: fbTarget.el_label, status: status, page: "home", ts: new Date().toISOString(), comment: $("#fbComment").value.trim() };
    if (curShot) rec.screenshot = curShot;
    if (status === "change") {
      if (fbTarget.target === "element") {
        if (fbTarget.el_type === "text") rec.new_text = $("#fbNewText").value.trim();
        else if (fbTarget.el_type === "image") rec.new_image_url = $("#fbImgUrl").value.trim() || ($("#fbImgPreview").src.indexOf("data:") === 0 ? $("#fbImgPreview").src : "");
      } else rec.change_types = $$(".fb-types input:checked").map(function (i) { return i.value; });
    }
    feedback = feedback.filter(function (d) { return fbRecKey(d) !== fbRecKey(fbTarget); });
    feedback.push(rec); saveFb();
    $("#fbPanel").classList.remove("on"); fbTarget = null;
    applyFbPreviews(); fbRenderMarks(); fbRenderList();
    toast(t("ts_added"));
  }
  function renderShot() {
    var box = $("#fbShotPrevBox"); if (!box) return;
    if (curShot) { $("#fbShotPrev").src = curShot; box.style.display = "block"; }
    else { box.style.display = "none"; $("#fbShotPrev").removeAttribute("src"); }
  }

  /* ---------- 9. 草稿箱 ---------- */
  function fbRenderList() {
    var el = $("#fbList");
    if (mode !== "fb" || !feedback.length) { el.classList.remove("on"); return; }
    el.classList.add("on");
    var u = usedRounds();
    var items = feedback.map(function (d) {
      var name = d.target === "element" ? (d.block_label + " › " + (d.el_label || d.key)) : d.target === "page" ? t("scope_page") : d.block_label;
      var ic = d.status === "satisfied" ? "✓" : d.status === "remove" ? "🗑" : "✎";
      var detail = "";
      if (d.new_text) detail = "「" + d.new_text.slice(0, 12) + "」";
      else if (d.new_image_url) detail = "🖼";
      else if (d.change_types && d.change_types.length) detail = d.change_types.map(function (c) { return t("tp_" + ({ 文案: "copy", 图片: "image", 颜色: "color", 排版: "layout", 整体风格: "style", 其他: "other" }[c] || "other")); }).join("/");
      if (d.comment) detail += (detail ? " · " : "") + "「" + d.comment.slice(0, 10) + "」";
      if (d.screenshot) detail += " 📷";
      var rk = fbRecKey(d);
      return '<div class="fbl-item" data-rk="' + esc(rk) + '"><span class="fbl-ic ' + d.status + '">' + ic + '</span><span class="fbl-t">' + esc(name) + (detail ? '<i class="fbl-d">' + esc(detail) + '</i>' : '') + '</span><button class="fbl-del" data-rk="' + esc(rk) + '" title="' + esc(t("draft_del")) + '">✕</button></div>';
    }).join("");
    var foot = u >= MAX_ROUNDS ? '<div class="fbl-exhaust">' + esc(t("draft_exhaust", { m: MAX_ROUNDS })) + '</div>'
      : '<button class="fbl-submit" id="fblSubmit">' + t("draft_submit", { v: u + 1, m: MAX_ROUNDS }) + '</button>';
    el.innerHTML =
      '<div class="fbl-head">' + t("draft_head", { n: feedback.length }) + '<span class="fbl-sub">' + esc(t("draft_sub", { m: MAX_ROUNDS })) + '</span></div>' +
      '<div class="fbl-body">' + items + '</div>' + foot;
  }
  function deleteDraft(rk) { feedback = feedback.filter(function (d) { return fbRecKey(d) !== rk; }); saveFb(); applyFbPreviews(); fbRenderMarks(); fbRenderList(); toast(t("ts_removed")); }
  function editDraft(rk) {
    var d = feedback.find(function (x) { return fbRecKey(x) === rk; }); if (!d) return;
    if (d.target === "page") { fbOpen("page", null, null); return; }
    var block = $('[data-fb-block="' + cssEsc(d.block_id) + '"]');
    if (d.target === "block") { if (block) fbOpen("block", null, block); return; }
    var elx = $('[data-fb-key="' + cssEsc(d.key) + '"]');
    if (elx && block) { elx.scrollIntoView({ block: "center", behavior: "smooth" }); fbOpen("element", elx, block); }
    else toast(t("ts_el_hidden"));
  }

  /* ---------- 10. 徽章 / 圆点 ---------- */
  function fbRenderMarks() {
    $$(".fb-badge,.fb-eldot").forEach(function (b) { b.remove(); });
    if (mode !== "fb") return;
    feedback.forEach(function (rec) {
      if (rec.target === "block") {
        var sec = $('[data-fb-block="' + cssEsc(rec.block_id) + '"]'); if (!sec) return;
        var r = sec.getBoundingClientRect();
        var b = document.createElement("div");
        b.className = "fb-badge " + (rec.status === "satisfied" ? "done" : rec.status === "remove" ? "remove" : "todo");
        b.textContent = rec.status === "satisfied" ? "✓" : rec.status === "remove" ? "🗑" : "●";
        b.style.left = Math.max(8, r.right + window.scrollX - 34) + "px";
        b.style.top = (r.top + window.scrollY + 10) + "px";
        document.body.appendChild(b);
      } else if (rec.target === "element") {
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

  /* ---------- 11. 导出（兜底，无按钮） ---------- */
  function downloadJSON() {
    var blob = new Blob([JSON.stringify({ site: "unimax", url: location.href, savedAt: new Date().toISOString(), rounds_used: usedRounds(), max_rounds: MAX_ROUNDS, rounds: rounds, draft: { edits: edits, feedback: feedback } }, null, 2)], { type: "application/json" });
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "unimax-changes.json";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  function resetEdits() {
    if (!confirm(t("cf_reset"))) return;
    edits = { text: {}, images: {}, videos: {}, bgs: {} }; saveEdits();
    $$("[data-fb-el]").forEach(function (el) {
      if (el._orig == null) return;
      if (el.dataset.fbEl === "image") el.setAttribute("src", el._orig);
      else if (el.dataset.fbEl === "video") setVid(el.dataset.fbKey, el._orig);
      else { el.textContent = el._orig; el.setAttribute("data-en", el._orig); }
      el.classList.remove("ce-dirty");
    });
    applyBgs(); updatePublishBtn(); toast(t("ts_reset"));
  }

  /* ---------- 12. 编辑发布（不限次数） ---------- */
  function draftEditCount() { return Object.keys(edits.text).length + Object.keys(edits.images).length + Object.keys(edits.videos).length + Object.keys(edits.bgs).length; }
  function updatePublishBtn() {
    var b = $("#cePublishBtn"); if (!b) return;
    var n = draftEditCount();
    b.disabled = !n;
    b.innerHTML = n ? t("btn_publish_n", { n: n }) : t("btn_publish");
  }
  function publishEdits() {
    var n = draftEditCount(); if (!n) { toast(t("ts_pub_none")); return; }
    var b = $("#cePublishBtn"); b.disabled = true; b.innerHTML = t("btn_publishing");
    fetch(API_BASE + "/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: EDIT_KEY, client: "unimax", kind: "edit", edits: JSON.parse(JSON.stringify(edits)) }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (j && j.success) toast(t("ts_pub_ok")); else { downloadJSON(); toast(t("ts_pub_fail")); } updatePublishBtn(); })
      .catch(function () { downloadJSON(); toast(t("ts_pub_fail")); updatePublishBtn(); });
  }

  /* ---------- 13. 轮次制（V1–V6，只管留言） ---------- */
  function updateRoundChip() {
    var u = usedRounds(), chip = $("#ceRoundChip");
    if (!chip) return;
    var extra = u >= MAX_ROUNDS ? t("chip_out") : u === MAX_ROUNDS - 1 ? t("chip_last") : "";
    chip.innerHTML = t("chip", { u: u, m: MAX_ROUNDS, extra: extra });
    chip.classList.toggle("warn", u >= MAX_ROUNDS - 1);
  }
  function openRoundModal() {
    if (!feedback.length) { toast(t("ts_no_fb")); return; }
    if (usedRounds() >= MAX_ROUNDS) { toast(t("ts_exhausted", { m: MAX_ROUNDS })); return; }
    $("#ceRoundTitle").textContent = t("round_title", { v: usedRounds() + 1 });
    $("#ceRoundSum").innerHTML = t("round_sum", { n: feedback.length });
    $("#ceRoundNote").value = ""; $("#ceRoundChk").checked = false;
    $("#ceRoundGo").disabled = true; $("#ceRoundGo").textContent = t("round_go");
    $("#ceRoundModal").classList.add("on");
  }
  function closeRoundModal() { $("#ceRoundModal").classList.remove("on"); }
  function submitRound() {
    var recs = feedback.slice(), note = $("#ceRoundNote").value.trim(), vGuess = usedRounds() + 1;
    $("#ceRoundGo").disabled = true; $("#ceRoundGo").textContent = t("round_submitting");
    fetch(API_BASE + "/api/feedback", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: EDIT_KEY, client: "unimax", note: note, records: recs }) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (j && j.success) { cloudUsed = j.used; finishRound(j.round_no, note, recs, true); }
        else if (j && j.error === "rounds_exhausted") { cloudUsed = j.used; updateRoundChip(); closeRoundModal(); toast(t("ts_exhausted", { m: MAX_ROUNDS })); }
        else finishRound(vGuess, note, recs, false);
      })
      .catch(function () { finishRound(vGuess, note, recs, false); });
  }
  function finishRound(v, note, recs, synced) {
    rounds.push({ v: v, at: new Date().toISOString(), note: note, records: recs, synced: synced });
    saveRounds(); feedback = []; saveFb();
    fbRenderMarks(); fbRenderList(); updateRoundChip(); closeRoundModal();
    toast(synced ? t("ts_round_ok", { v: v }) : t("ts_round_local", { v: v }));
    if (!synced) downloadJSON();
  }

  /* ---------- 14. UI ---------- */
  function buildUI() {
    var w = document.createElement("div");
    w.className = "ce-ui";
    w.innerHTML =
      '<div id="ceHintEdit" class="ce-hint ce-hint-edit">' + t("hint_edit") + '<span class="ce-hintx" data-x="ceHintEditX">' + t("hint_ok") + '</span></div>' +
      '<div id="ceHintFb" class="ce-hint ce-hint-fb">' + t("hint_fb", { m: MAX_ROUNDS }) + '<span class="ce-hintx" data-x="ceHintFbX">' + t("hint_ok") + '</span></div>' +
      '<div class="ce-dock">' +
      '  <div id="ceRoundChip" class="ce-chip" style="display:none"></div>' +
      '  <div id="ceEditOps" class="ce-ops" style="display:none">' +
      '    <button id="cePublishBtn" class="ce-btn ce-btn-publish"></button>' +
      '    <button id="ceResetBtn" class="ce-btn ce-btn-mini">' + t("btn_reset") + '</button>' +
      '  </div>' +
      '  <div id="ceFbOps" class="ce-ops" style="display:none">' +
      '    <button id="cePageBtn" class="ce-btn ce-btn-page">' + t("btn_page") + '</button>' +
      '  </div>' +
      '  <div class="ce-modes">' +
      '    <button id="ceFbBtn" class="ce-btn ce-btn-fb">' + t("btn_fb") + '</button>' +
      '    <button id="ceEditBtn" class="ce-btn ce-btn-edit">' + t("btn_edit") + '</button>' +
      '  </div>' +
      '</div>' +
      '<div id="fbList" class="fb-list"></div>' +
      '<div id="fbPanel" class="fb-panel">' +
      '  <div class="fbp-head"><div class="lbl">' + t("fb_title") + '</div><div class="blk" id="fbpBlk">—</div><div class="cur" id="fbpCur"></div><span class="scope" id="fbpScope"></span></div>' +
      '  <div class="fbp-body">' +
      '    <div class="fb-choice">' +
      '      <input type="radio" name="fbStatus" id="fbSat" value="satisfied"><label class="sat" for="fbSat">' + t("st_sat") + '</label>' +
      '      <input type="radio" name="fbStatus" id="fbChg" value="change"><label class="chg" for="fbChg">' + t("st_chg") + '</label>' +
      '      <input type="radio" name="fbStatus" id="fbRmv" value="remove"><label class="rmv" for="fbRmv">' + t("st_rmv") + '</label>' +
      '    </div>' +
      '    <div class="fb-section" id="fbSecText"><div class="fb-fieldlabel">' + t("sec_text_label") + '</div><textarea class="fb-textarea" id="fbNewText" placeholder="' + esc(t("sec_text_ph")) + '"></textarea></div>' +
      '    <div class="fb-section" id="fbSecImage"><div class="fb-fieldlabel">' + t("sec_image_label") + '</div><div class="fb-imgbox"><img id="fbImgPreview"><input type="file" id="fbImgFile" accept="image/*"><div class="or">' + t("or_img_link") + '</div><input class="fb-input" id="fbImgUrl" placeholder="https://…"></div></div>' +
      '    <div class="fb-section" id="fbSecBlock"><div class="fb-fieldlabel">' + t("types_label") + '</div><div class="fb-types">' +
      '      <input type="checkbox" id="ft1" value="文案"><label for="ft1">' + t("tp_copy") + '</label>' +
      '      <input type="checkbox" id="ft2" value="图片"><label for="ft2">' + t("tp_image") + '</label>' +
      '      <input type="checkbox" id="ft3" value="颜色"><label for="ft3">' + t("tp_color") + '</label>' +
      '      <input type="checkbox" id="ft4" value="排版"><label for="ft4">' + t("tp_layout") + '</label>' +
      '      <input type="checkbox" id="ft5" value="整体风格"><label for="ft5">' + t("tp_style") + '</label>' +
      '      <input type="checkbox" id="ft6" value="其他"><label for="ft6">' + t("tp_other") + '</label>' +
      '    </div></div>' +
      '    <div class="fb-section" id="fbSecComment"><div class="fb-fieldlabel" id="fbCommentLabel">' + t("comment_label") + '</div><textarea class="fb-textarea" id="fbComment" placeholder="' + esc(t("comment_ph")) + '"></textarea></div>' +
      '    <div class="fb-section" id="fbSecShot"><div class="fb-fieldlabel">' + t("shot_label") + '</div>' +
      '      <div id="fbShotPrevBox" class="fb-shotbox" style="display:none"><img id="fbShotPrev" alt="screenshot"><button type="button" id="fbShotRemove" class="fb-shotx">' + t("shot_remove") + '</button></div>' +
      '      <label class="fb-shotup"><input type="file" id="fbShotFile" accept="image/*">' + t("shot_up") + '</label><span class="fb-shothint" id="fbShotHint"></span></div>' +
      '  </div>' +
      '  <div class="fbp-tip">' + t("fbp_tip", { m: MAX_ROUNDS }) + '</div>' +
      '  <div class="fbp-foot"><button class="fb-cancel" id="fbCancel">' + t("btn_cancel") + '</button><button class="fb-submit" id="fbSubmit">' + t("btn_add_draft") + '</button></div>' +
      '</div>' +
      '<div id="ceModal" class="ce-modal"><div class="ce-mbox">' +
      '  <h4 id="ceMTitle"></h4><div class="ce-mlabel" id="ceMLabel"></div>' +
      '  <img id="ceMImgPrev" class="ce-mprev"><video id="ceMVidPrev" class="ce-mprev" controls muted playsinline></video>' +
      '  <p class="ce-mnote" id="ceMNote"></p>' +
      '  <input type="file" id="ceMFile" accept="image/*">' +
      '  <div class="ce-or">' + t("media_or") + '</div>' +
      '  <input type="text" id="ceMUrl" class="fb-input" placeholder="https://…">' +
      '  <div class="ce-mfoot"><button class="fb-cancel" id="ceMCancel">' + t("btn_cancel") + '</button><button class="fb-submit" id="ceMOk">' + t("media_ok") + '</button></div>' +
      '</div></div>' +
      '<div id="ceRoundModal" class="ce-modal"><div class="ce-mbox">' +
      '  <h4 id="ceRoundTitle"></h4>' +
      '  <div id="ceRoundSum" class="ce-roundsum"></div>' +
      '  <div class="fb-fieldlabel">' + t("round_note_label") + '</div>' +
      '  <textarea id="ceRoundNote" class="fb-textarea" placeholder="' + esc(t("round_note_ph")) + '"></textarea>' +
      '  <p class="ce-roundwarn">' + t("round_warn", { m: MAX_ROUNDS }) + '</p>' +
      '  <label class="ce-roundchk"><input type="checkbox" id="ceRoundChk"> ' + t("round_chk") + '</label>' +
      '  <div class="ce-mfoot"><button id="ceRoundCancel" class="fb-cancel">' + t("round_cancel") + '</button><button id="ceRoundGo" class="fb-submit" disabled>' + t("round_go") + '</button></div>' +
      '</div></div>' +
      '<div id="ceToast" class="ce-toast"></div>';
    document.body.appendChild(w);
  }

  function bindEvents() {
    $("#ceEditBtn").addEventListener("click", function () { setMode("edit"); });
    $("#ceFbBtn").addEventListener("click", function () { setMode("fb"); });
    $("#cePublishBtn").addEventListener("click", publishEdits);
    $("#ceResetBtn").addEventListener("click", resetEdits);
    $("#cePageBtn").addEventListener("click", function () { fbOpen("page", null, null); });
    $$(".ce-hintx").forEach(function (x) { x.addEventListener("click", function () { sessionStorage.setItem(x.getAttribute("data-x"), "1"); x.parentElement.style.display = "none"; document.body.classList.remove("ce-pad"); }); });
    $("#fbList").addEventListener("click", function (e) {
      var del = e.target.closest(".fbl-del");
      if (del) { e.stopPropagation(); deleteDraft(del.getAttribute("data-rk")); return; }
      if (e.target.closest("#fblSubmit")) { openRoundModal(); return; }
      var item = e.target.closest(".fbl-item[data-rk]"); if (item) editDraft(item.getAttribute("data-rk"));
    });
    $("#fbSat").addEventListener("change", function () { fbApplyStatus("satisfied"); });
    $("#fbChg").addEventListener("change", function () { fbApplyStatus("change"); });
    $("#fbRmv").addEventListener("change", function () { fbApplyStatus("remove"); });
    $("#fbCancel").addEventListener("click", function () { $("#fbPanel").classList.remove("on"); fbTarget = null; });
    $("#fbSubmit").addEventListener("click", fbSubmit);
    $("#fbImgFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      var rd = new FileReader(); rd.onload = function (ev) { $("#fbImgPreview").src = ev.target.result; $("#fbImgPreview").style.display = "block"; $("#fbImgUrl").value = ""; }; rd.readAsDataURL(f);
    });
    $("#fbImgUrl").addEventListener("input", function (e) { var u = e.target.value.trim(); if (u) { $("#fbImgPreview").src = u; $("#fbImgPreview").style.display = "block"; } });
    $("#fbShotFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      $("#fbShotHint").textContent = t("shot_uploading");
      uploadShot(f, function (url) {
        if (!url) { $("#fbShotHint").textContent = t("shot_fail"); return; }
        curShot = url; renderShot();
        $("#fbShotHint").textContent = url.indexOf("data:") === 0 ? t("shot_local") : t("shot_ok");
      });
    });
    $("#fbShotRemove").addEventListener("click", function () { curShot = ""; renderShot(); $("#fbShotFile").value = ""; $("#fbShotHint").textContent = ""; });
    $("#ceMFile").addEventListener("change", function (e) {
      var f = e.target.files[0]; if (!f) return;
      if (f.size > 1.5 * 1024 * 1024) { toast(t("ts_storage")); e.target.value = ""; return; }
      var rd = new FileReader(); rd.onload = function (ev) { showMPrev(ev.target.result); $("#ceMUrl").value = ""; }; rd.readAsDataURL(f);
    });
    $("#ceMUrl").addEventListener("input", function (e) { var u = e.target.value.trim(); if (u) showMPrev(u); });
    $("#ceMCancel").addEventListener("click", function () { $("#ceModal").classList.remove("on"); });
    $("#ceMOk").addEventListener("click", applyMedia);
    $("#ceRoundChk").addEventListener("change", function (e) { $("#ceRoundGo").disabled = !e.target.checked; });
    $("#ceRoundGo").addEventListener("click", submitRound);
    $("#ceRoundCancel").addEventListener("click", closeRoundModal);
  }

  function toast(msg) { var el = $("#ceToast"); if (!el) return; el.textContent = msg; el.classList.add("on"); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove("on"); }, 2800); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function cssEsc(s) { return String(s).replace(/["\\]/g, "\\$&"); }

  /* ---------- 15. 样式 ---------- */
  function injectStyles() {
    if ($("#ce-styles")) return;
    var css =
      // 直接引用官网 :root 设计 token（配色/字体/圆角/阴影），带 fallback
      ".ce-ui,.ce-hint,.fb-panel,.ce-modal,.fb-list,.ce-toast{" +
      "--ce-edit:var(--blue,#3f7fe0);--ce-edit-d:var(--blue-ink,#2f66c4);" +
      "--ce-fb:var(--navy,#33518c);--ce-fb-d:var(--navy-700,#2a4372);" +
      "--ce-gold:var(--gold,#c79a45);--ce-gold-d:#9a7526;" +
      "--ce-dark:var(--band-dark,#211f3d);--ce-ink:var(--ink,#20263f);--ce-muted:var(--ink-muted,#5a6377);--ce-line:var(--line,#e7e9ef);" +
      "--ce-red:#9a2b2b;--ce-fd:var(--font-display,'Sora',system-ui,sans-serif);--ce-fb-font:var(--font-body,'Inter',system-ui,sans-serif);" +
      "--ce-rp:var(--r-pill,999px);--ce-rl:var(--r-lg,20px);--ce-rm:var(--r-md,14px);--ce-rs:var(--r-sm,10px);" +
      "--ce-sh-md:var(--shadow-md,0 10px 30px -8px rgba(20,30,60,.16));--ce-sh-lg:var(--shadow-lg,0 30px 60px -18px rgba(15,25,55,.30));}" +
      "body.ce-pad{padding-top:46px!important;}" +
      ".ce-ui *{box-sizing:border-box;}" +
      ".ce-dim{color:var(--ce-muted);font-size:.82rem;}" +
      ".ce-hint{position:fixed;top:0;left:0;right:0;z-index:99000;color:#fff;text-align:center;padding:12px 46px;font:600 .86rem/1.45 var(--ce-fb-font);display:none;}" +
      ".ce-hint-edit{background:var(--ce-edit);}.ce-hint-fb{background:var(--ce-fb);}.ce-hint b{color:var(--ce-gold);}" +
      ".ce-hintx{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.24);padding:3px 12px;border-radius:var(--ce-rp);cursor:pointer;font-size:.78rem;white-space:nowrap;}" +
      ".ce-dock{position:fixed;right:18px;bottom:18px;z-index:99000;display:flex;flex-direction:column;gap:10px;align-items:flex-end;}" +
      ".ce-modes{display:flex;gap:10px;}" +
      ".ce-ops{display:none;flex-direction:column;gap:8px;align-items:flex-end;}" +
      ".ce-btn{font:700 .9rem/1 var(--ce-fd);letter-spacing:.01em;border:none;border-radius:var(--ce-rp);padding:13px 22px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:var(--ce-sh-md);transition:transform .14s,box-shadow .14s,background .14s;white-space:nowrap;}" +
      ".ce-btn:hover{transform:translateY(-2px);}" +
      ".ce-btn-edit{background:var(--ce-edit);color:#fff;}.ce-btn-edit.on{background:var(--ce-edit-d);}" +
      ".ce-btn-fb{background:var(--ce-fb);color:#fff;}.ce-btn-fb.on{background:var(--ce-fb-d);}" +
      ".ce-btn-publish{background:var(--ce-edit);color:#fff;}" +
      ".ce-btn-publish:disabled{background:#aebfdc;cursor:default;transform:none!important;box-shadow:var(--ce-sh-md);}" +
      ".ce-btn-mini{background:#fff;color:var(--ce-muted);border:1.5px solid var(--ce-line);box-shadow:var(--ce-sh-md);padding:9px 16px;font-size:.82rem;}" +
      ".ce-btn-page{background:var(--ce-fb-d);color:#fff;}" +
      ".ce-chip{background:var(--ce-dark);color:#fff;font:700 .78rem/1 var(--ce-fb-font);padding:8px 15px;border-radius:var(--ce-rp);box-shadow:var(--ce-sh-md);}" +
      ".ce-chip b{color:var(--ce-gold);}.ce-chip.warn{background:#5a2f2a;}" +
      "body.ce-edit [data-fb-el='text']{outline:1.5px dashed rgba(63,127,224,.5);outline-offset:3px;border-radius:3px;cursor:text;}" +
      "body.ce-edit [data-fb-el='text']:hover,body.ce-edit [data-fb-el='text']:focus{outline:2.5px solid var(--ce-edit);background:rgba(63,127,224,.08);}" +
      "body.ce-edit img[data-fb-el],body.ce-edit video[data-fb-el]{outline:2px dashed rgba(199,154,69,.8)!important;outline-offset:3px;cursor:pointer!important;}" +
      "body.ce-edit img[data-fb-el]:hover,body.ce-edit video[data-fb-el]:hover{outline:3px solid var(--ce-gold)!important;}" +
      "body.ce-edit [data-fb-bg]{position:relative;}" +
      "body.ce-edit [data-fb-bg]::after{content:'🖼';position:absolute;top:12px;right:12px;z-index:60;background:var(--ce-gold);color:#fff;font-size:1rem;padding:6px 10px;border-radius:var(--ce-rs);pointer-events:none;box-shadow:var(--ce-sh-md);}" +
      ".ce-dirty{outline:2px solid var(--ce-gold)!important;}" +
      "body.fb-on [data-fb-block]:hover{outline:3px dashed rgba(51,81,140,.6);outline-offset:-3px;cursor:pointer;}" +
      "body.fb-on [data-fb-el]{transition:outline .1s;border-radius:4px;}" +
      "body.fb-on [data-fb-el]:hover{outline:2.5px solid var(--ce-gold);outline-offset:3px;cursor:pointer;}" +
      "body.fb-on .ing-overlay,body.fb-on .ing-num{pointer-events:none;}" +
      ".fb-badge{position:absolute;z-index:98000;width:24px;height:24px;border-radius:50%;font-size:.8rem;display:flex;align-items:center;justify-content:center;font-weight:700;pointer-events:none;box-shadow:var(--ce-sh-md);}" +
      ".fb-badge.done{background:var(--ce-fb);color:#fff;}.fb-badge.todo{background:var(--ce-gold);color:var(--ce-ink);}.fb-badge.remove{background:var(--ce-red);color:#fff;}" +
      ".fb-eldot{position:absolute;z-index:98050;width:18px;height:18px;border-radius:50%;font-size:.6rem;font-weight:800;display:flex;align-items:center;justify-content:center;color:#fff;pointer-events:none;transform:translate(-50%,-50%);box-shadow:0 1px 5px rgba(0,0,0,.35);}" +
      ".fb-eldot.done{background:var(--ce-fb);}.fb-eldot.todo{background:var(--ce-gold);color:var(--ce-ink);}.fb-eldot.remove{background:var(--ce-red);}" +
      ".fb-panel{position:fixed;top:0;right:-460px;width:432px;max-width:92vw;height:100%;background:#fff;color:var(--ce-ink);z-index:99500;box-shadow:var(--ce-sh-lg);transition:right .3s var(--ease,cubic-bezier(.22,.61,.36,1));display:flex;flex-direction:column;font:400 .92rem/1.5 var(--ce-fb-font);}" +
      ".fb-panel.on{right:0;}" +
      ".fbp-head{padding:22px 24px 18px;border-bottom:1px solid var(--ce-line);}" +
      ".fbp-head .lbl{font-size:.7rem;color:var(--ce-gold);letter-spacing:.14em;text-transform:uppercase;font-weight:700;}" +
      ".fbp-head .blk{font-family:var(--ce-fd);font-size:1.28rem;font-weight:700;letter-spacing:-.01em;margin-top:6px;line-height:1.25;}" +
      ".fbp-head .cur{font-size:.82rem;color:var(--ce-muted);margin-top:6px;}" +
      ".fbp-head .scope{display:inline-block;margin-top:10px;font-size:.72rem;font-weight:700;padding:4px 11px;border-radius:var(--ce-rp);}" +
      ".fbp-head .scope.el{background:rgba(63,127,224,.12);color:var(--ce-edit-d);}.fbp-head .scope.block{background:rgba(51,81,140,.1);color:var(--ce-fb);}" +
      ".fbp-body{padding:18px 24px;overflow-y:auto;flex:1;}" +
      ".fb-choice{display:flex;gap:8px;margin-bottom:6px;}" +
      ".fb-choice label{flex:1;border:1.5px solid var(--ce-line);border-radius:var(--ce-rm);padding:13px 6px;text-align:center;cursor:pointer;font-weight:600;font-size:.82rem;line-height:1.3;transition:.12s;}" +
      ".fb-choice label:hover{border-color:#c9ccd6;}" +
      ".fb-choice input{display:none;}" +
      ".fb-choice input:checked+label.sat{background:rgba(51,81,140,.08);border-color:var(--ce-fb);color:var(--ce-fb);}" +
      ".fb-choice input:checked+label.chg{background:rgba(199,154,69,.14);border-color:var(--ce-gold);color:var(--ce-gold-d);}" +
      ".fb-choice input:checked+label.rmv{background:rgba(154,43,43,.08);border-color:var(--ce-red);color:var(--ce-red);}" +
      ".fb-section{display:none;}.fb-section.on{display:block;}" +
      ".fb-fieldlabel{font-size:.78rem;color:var(--ce-muted);margin:16px 0 7px;font-weight:600;}" +
      ".fb-types{display:flex;flex-wrap:wrap;gap:8px;}" +
      ".fb-types label{font-size:.82rem;padding:7px 14px;border:1.5px solid var(--ce-line);border-radius:var(--ce-rp);cursor:pointer;transition:.12s;}" +
      ".fb-types input{display:none;}.fb-types input:checked+label{background:var(--ce-fb);color:#fff;border-color:var(--ce-fb);}" +
      ".fb-input,.fb-textarea{width:100%;border:1.5px solid var(--ce-line);border-radius:var(--ce-rm);padding:11px 12px;font-size:.92rem;font-family:var(--ce-fb-font);color:var(--ce-ink);}" +
      ".fb-input:focus,.fb-textarea:focus{outline:none;border-color:var(--ce-fb);box-shadow:0 0 0 3px rgba(51,81,140,.12);}" +
      ".fb-textarea{min-height:76px;resize:vertical;}" +
      ".fb-imgbox{border:1.5px dashed var(--ce-line);border-radius:var(--ce-rm);padding:14px;text-align:center;}" +
      ".fb-imgbox img{max-width:100%;max-height:130px;border-radius:var(--ce-rs);margin-bottom:10px;display:none;}" +
      ".fb-imgbox .or{font-size:.78rem;color:#aaa;margin:8px 0;}" +
      ".fb-shotbox{position:relative;margin-bottom:8px;}" +
      ".fb-shotbox img{max-width:100%;max-height:150px;border-radius:var(--ce-rs);border:1px solid var(--ce-line);display:block;}" +
      ".fb-shotx{position:absolute;top:6px;right:6px;background:rgba(0,0,0,.65);color:#fff;border:none;border-radius:var(--ce-rp);padding:4px 10px;font-size:.72rem;cursor:pointer;}" +
      ".fb-shotup{display:inline-block;border:1.5px dashed #cfd3dc;border-radius:var(--ce-rm);padding:10px 16px;font-size:.84rem;cursor:pointer;transition:.12s;}" +
      ".fb-shotup:hover{border-color:var(--ce-fb);color:var(--ce-fb);}.fb-shotup input{display:none;}" +
      ".fb-shothint{font-size:.76rem;color:var(--ce-fb);margin-left:8px;}" +
      ".fbp-tip{padding:12px 24px 0;font-size:.76rem;color:#9aa0ad;line-height:1.5;}" +
      ".fbp-foot{padding:14px 24px;border-top:1px solid var(--ce-line);display:flex;gap:10px;}" +
      ".fbp-foot button,.ce-mfoot button{flex:1;padding:13px;border-radius:var(--ce-rp);font-weight:700;font-size:.9rem;font-family:var(--ce-fd);border:none;cursor:pointer;transition:.12s;}" +
      ".fb-submit{background:var(--ce-fb);color:#fff;}.fb-submit:hover{background:var(--ce-fb-d);}.fb-cancel{background:#eef0f4;color:var(--ce-muted);}.fb-cancel:hover{background:#e3e6ec;}" +
      ".fb-list{position:fixed;left:20px;bottom:20px;z-index:99000;background:#fff;color:var(--ce-ink);border-radius:var(--ce-rl);width:316px;max-width:86vw;box-shadow:var(--ce-sh-lg);display:none;font-family:var(--ce-fb-font);overflow:hidden;}" +
      ".fb-list.on{display:block;}" +
      ".fbl-head{background:var(--ce-dark);color:#fff;padding:13px 15px;font-size:.84rem;font-weight:700;font-family:var(--ce-fd);}" +
      ".fbl-head b{color:var(--ce-gold);font-size:1.05rem;}" +
      ".fbl-sub{display:block;font-size:.7rem;font-weight:400;color:#b9bccb;margin-top:4px;line-height:1.4;font-family:var(--ce-fb-font);}" +
      ".fbl-body{max-height:34vh;overflow-y:auto;}" +
      ".fbl-item{display:flex;align-items:center;gap:9px;padding:10px 13px;border-bottom:1px solid #f1f2f5;font-size:.8rem;cursor:pointer;}" +
      ".fbl-item:hover{background:#f6f8fb;}" +
      ".fbl-ic{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.66rem;font-weight:800;color:var(--ce-ink);flex-shrink:0;background:var(--ce-gold);}" +
      ".fbl-ic.satisfied{background:var(--ce-fb);color:#fff;}.fbl-ic.remove{background:var(--ce-red);color:#fff;}" +
      ".fbl-t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}" +
      ".fbl-d{display:block;font-style:normal;color:#9aa0ad;font-size:.72rem;overflow:hidden;text-overflow:ellipsis;}" +
      ".fbl-del{background:none;border:none;color:var(--ce-red);font-size:.82rem;cursor:pointer;padding:4px 7px;flex-shrink:0;border-radius:6px;opacity:.5;}" +
      ".fbl-del:hover{background:rgba(154,43,43,.1);opacity:1;}" +
      ".fbl-submit{display:block;width:100%;background:var(--ce-gold);color:var(--ce-ink);border:none;padding:15px;font:700 .92rem/1 var(--ce-fd);letter-spacing:.01em;cursor:pointer;transition:.12s;}" +
      ".fbl-submit:hover{background:#b78a30;}" +
      ".fbl-submit.over{background:#9a6a1e;}.fbl-submit.over:hover{background:#875c19;}" +
      ".fbl-exhaust{padding:14px;text-align:center;color:var(--ce-muted);font-size:.8rem;background:#f4f5f8;}" +
      ".ce-modal{position:fixed;inset:0;background:rgba(15,20,40,.55);z-index:99600;display:none;align-items:center;justify-content:center;padding:16px;}" +
      ".ce-modal.on{display:flex;}" +
      ".ce-mbox{background:#fff;color:var(--ce-ink);border-radius:var(--ce-rl);padding:26px;width:404px;max-width:94vw;font:400 .92rem/1.5 var(--ce-fb-font);box-shadow:var(--ce-sh-lg);}" +
      ".ce-mbox h4{font-family:var(--ce-fd);font-size:1.15rem;margin:0 0 6px;font-weight:700;letter-spacing:-.01em;}" +
      ".ce-mlabel{font:600 .78rem/1.3 ui-monospace,Menlo,Consolas,monospace;color:var(--ce-fb);margin-bottom:12px;word-break:break-all;}" +
      ".ce-mprev{width:100%;max-height:160px;object-fit:contain;background:#f2f4f7;border-radius:var(--ce-rm);margin-bottom:10px;display:none;}" +
      ".ce-mnote{font-size:.8rem;color:var(--ce-muted);margin:0 0 8px;line-height:1.45;}" +
      ".ce-or{font-size:.76rem;color:#aaa;text-align:center;margin:8px 0;}" +
      ".ce-mfoot{display:flex;gap:10px;margin-top:18px;}" +
      ".ce-roundsum{background:#f6f8fb;border:1px solid var(--ce-line);border-radius:var(--ce-rm);padding:14px;font-size:.9rem;margin-bottom:6px;line-height:1.5;}" +
      ".ce-roundsum b{color:var(--ce-fb);}" +
      ".ce-roundwarn{font-size:.8rem;color:var(--ce-gold-d);background:rgba(199,154,69,.12);border-radius:var(--ce-rs);padding:12px;margin:12px 0 6px;line-height:1.55;}.ce-roundwarn b{color:var(--ce-red);}" +
      ".ce-roundchk{display:flex;align-items:center;gap:8px;font-size:.86rem;font-weight:600;margin:10px 0 2px;cursor:pointer;}" +
      ".ce-toast{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);background:var(--ce-dark);color:#fff;padding:14px 24px;border-radius:var(--ce-rm);font:600 .88rem/1.4 var(--ce-fb-font);z-index:99800;opacity:0;pointer-events:none;transition:opacity .25s;box-shadow:var(--ce-sh-lg);max-width:86vw;text-align:center;}" +
      ".ce-toast.on{opacity:1;}" +
      "@media(max-width:600px){.fb-panel{width:100vw;}.ce-btn{padding:11px 16px;font-size:.82rem;}}";
    var st = document.createElement("style"); st.id = "ce-styles"; st.textContent = css; document.head.appendChild(st);
  }
})();
