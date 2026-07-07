// 客改层（Client Revision Layer）云端存储
// GET  /api/feedback?client=unimax → 返回全部已提交轮次 + 乙方签收状态 resolutions + 最新直接编辑 latest_edit（公开只读）
// POST /api/feedback（需编辑密钥 token）：
//   {note, records}                                → 顾客提交一轮留言（软约束：超 6 轮也存，返回 over_limit）
//   {kind:'edit', edits}                           → 顾客发布直接编辑，round_no=0 覆盖式，不占轮次
//   {kind:'resolve', round_no, rec_key, resolved}  → 乙方签收（红点↔绿点），写 resolutions，不占轮次
// 表按需自建；截图应先经 /api/upload 传 R2 再以 URL 引用，payload 里不收 dataURL 大字段。

const EDIT_KEY = 'unimax-2026';           // 与 editor.js 的密钥一致，换口令两处同改
const CLIENT = 'unimax';
const MAX_ROUNDS = 6;
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function ensureTable(env) {
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS feedback_rounds (id INTEGER PRIMARY KEY AUTOINCREMENT, client TEXT NOT NULL, round_no INTEGER NOT NULL, note TEXT, payload TEXT, created_at TEXT DEFAULT (datetime('now')))"
  ).run();
  await env.DB.prepare(
    "CREATE TABLE IF NOT EXISTS resolutions (client TEXT NOT NULL, round_no INTEGER NOT NULL, rec_key TEXT NOT NULL, resolved INTEGER DEFAULT 1, resolved_at TEXT DEFAULT (datetime('now')), PRIMARY KEY (client, round_no, rec_key))"
  ).run();
}

function mkStrip() {
  return function strip(o) {
    if (o == null) return o;
    if (typeof o === 'string') return o.indexOf('data:') === 0 && o.length > 2000 ? '(local image, see JSON export)' : o;
    if (Array.isArray(o)) return o.map(strip);
    if (typeof o === 'object') { const r = {}; Object.keys(o).forEach(k => { r[k] = strip(o[k]); }); return r; }
    return o;
  };
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestGet({ request, env }) {
  try {
    await ensureTable(env);
    const client = new URL(request.url).searchParams.get('client') || CLIENT;
    const { results } = await env.DB.prepare(
      "SELECT round_no, note, payload, created_at FROM feedback_rounds WHERE client = ? AND round_no >= 1 ORDER BY round_no ASC"
    ).bind(client).all();
    const rounds = results.map(r => {
      let p = {};
      try { p = JSON.parse(r.payload || '{}'); } catch (e) { }
      return { round_no: r.round_no, note: r.note || '', created_at: r.created_at, records: p.records || [] };
    });
    // 乙方签收状态（红点↔绿点）
    const rz = await env.DB.prepare(
      "SELECT round_no, rec_key, resolved, resolved_at FROM resolutions WHERE client = ?"
    ).bind(client).all();
    const resolutions = (rz.results || []).map(x => ({ round_no: x.round_no, rec_key: x.rec_key, resolved: !!x.resolved, resolved_at: x.resolved_at }));
    // 顾客最新直接编辑（round_no=0 覆盖槽）
    const edRow = await env.DB.prepare(
      "SELECT payload FROM feedback_rounds WHERE client = ? AND round_no = 0"
    ).bind(client).first();
    let latest_edit = {};
    if (edRow) { try { latest_edit = (JSON.parse(edRow.payload || '{}')).edits || {}; } catch (e) { } }
    return Response.json({ success: true, max_rounds: MAX_ROUNDS, used: rounds.length, rounds, resolutions, latest_edit }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    if (!body.token || body.token !== EDIT_KEY) {
      return Response.json({ success: false, error: 'unauthorized' }, { status: 403, headers: CORS });
    }
    await ensureTable(env);
    const client = body.client || CLIENT;
    const strip = mkStrip();

    // —— 乙方签收：写 resolutions，不占轮次 ——
    if (body.kind === 'resolve') {
      await env.DB.prepare(
        "INSERT INTO resolutions (client, round_no, rec_key, resolved, resolved_at) VALUES (?, ?, ?, ?, ?) " +
        "ON CONFLICT(client, round_no, rec_key) DO UPDATE SET resolved = excluded.resolved, resolved_at = excluded.resolved_at"
      ).bind(client, body.round_no | 0, String(body.rec_key || '').slice(0, 300), body.resolved ? 1 : 0, new Date().toISOString()).run();
      return Response.json({ success: true, kind: 'resolve' }, { headers: CORS });
    }

    // —— 顾客发布直接编辑：round_no=0 覆盖式，不占轮次 ——
    if (body.kind === 'edit') {
      const payload = JSON.stringify({ edits: strip(body.edits || {}) });
      if (payload.length > 900000) {
        return Response.json({ success: false, error: 'payload_too_large' }, { status: 413, headers: CORS });
      }
      await env.DB.prepare("DELETE FROM feedback_rounds WHERE client = ? AND round_no = 0").bind(client).run();
      await env.DB.prepare(
        "INSERT INTO feedback_rounds (client, round_no, note, payload) VALUES (?, 0, '', ?)"
      ).bind(client, payload).run();
      return Response.json({ success: true, kind: 'edit' }, { headers: CORS });
    }

    // —— 顾客提交一轮留言（软约束：超 6 轮也存）——
    const { results } = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM feedback_rounds WHERE client = ? AND round_no >= 1"
    ).bind(client).all();
    const used = (results[0] && results[0].n) || 0;
    const payload = JSON.stringify({ records: strip(body.records || []) });
    if (payload.length > 900000) {
      return Response.json({ success: false, error: 'payload_too_large' }, { status: 413, headers: CORS });
    }
    const roundNo = used + 1;
    await env.DB.prepare(
      "INSERT INTO feedback_rounds (client, round_no, note, payload) VALUES (?, ?, ?, ?)"
    ).bind(client, roundNo, String(body.note || '').slice(0, 2000), payload).run();
    return Response.json({ success: true, round_no: roundNo, used: roundNo, max_rounds: MAX_ROUNDS, over_limit: roundNo > MAX_ROUNDS }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}
