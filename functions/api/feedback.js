// 客改层（Client Revision Layer）云端存储
// GET  /api/feedback?client=unimax          → 返回该客户全部已提交轮次（公开只读）
// POST /api/feedback {token, round_no, note, records, edits} → 提交一轮（需编辑密钥）
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
}

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestGet({ request, env }) {
  try {
    await ensureTable(env);
    const client = new URL(request.url).searchParams.get('client') || CLIENT;
    const { results } = await env.DB.prepare(
      "SELECT round_no, note, payload, created_at FROM feedback_rounds WHERE client = ? ORDER BY round_no ASC"
    ).bind(client).all();
    const rounds = results.map(r => {
      let p = {};
      try { p = JSON.parse(r.payload || '{}'); } catch (e) { }
      return { round_no: r.round_no, note: r.note || '', created_at: r.created_at, records: p.records || [], edits: p.edits || {} };
    });
    return Response.json({ success: true, max_rounds: MAX_ROUNDS, used: rounds.length, rounds }, { headers: CORS });
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
    const { results } = await env.DB.prepare(
      "SELECT COUNT(*) AS n FROM feedback_rounds WHERE client = ?"
    ).bind(CLIENT).all();
    const used = (results[0] && results[0].n) || 0;
    if (used >= MAX_ROUNDS) {
      return Response.json({ success: false, error: 'rounds_exhausted', used, max_rounds: MAX_ROUNDS }, { status: 409, headers: CORS });
    }
    // 拒收内嵌大图（截图必须先走 /api/upload → R2 → URL）
    const strip = (o) => {
      if (o == null) return o;
      if (typeof o === 'string') return o.indexOf('data:') === 0 && o.length > 2000 ? '(local image, see JSON export)' : o;
      if (Array.isArray(o)) return o.map(strip);
      if (typeof o === 'object') { const r = {}; Object.keys(o).forEach(k => { r[k] = strip(o[k]); }); return r; }
      return o;
    };
    const payload = JSON.stringify({ records: strip(body.records || []), edits: strip(body.edits || {}) });
    if (payload.length > 900000) {
      return Response.json({ success: false, error: 'payload_too_large' }, { status: 413, headers: CORS });
    }
    const roundNo = used + 1;
    await env.DB.prepare(
      "INSERT INTO feedback_rounds (client, round_no, note, payload) VALUES (?, ?, ?, ?)"
    ).bind(CLIENT, roundNo, String(body.note || '').slice(0, 2000), payload).run();
    return Response.json({ success: true, round_no: roundNo, used: roundNo, max_rounds: MAX_ROUNDS, over_limit: roundNo > MAX_ROUNDS }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}
