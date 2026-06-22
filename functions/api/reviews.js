// GET  /api/reviews  → 返回已审核的 4-5 星评论
// POST /api/reviews  → 提交新评论，返回 edit_token 供编辑/删除

export async function onRequestGet({ env }) {
  try {
    const { results } = await env.DB.prepare(
      "SELECT id, name, role, quote, stars, media_urls, avatar_url, lang, created_at FROM reviews WHERE status = 'approved' AND stars >= 4 ORDER BY created_at DESC LIMIT 50"
    ).all();

    const reviews = results.map(r => ({
      ...r,
      media_urls: JSON.parse(r.media_urls || '[]'),
    }));

    return Response.json({ success: true, reviews }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}

export async function onRequestPost({ request, env }) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }

  try {
    const body = await request.json();
    const { name, role, quote, stars, media_urls, avatar_url, lang } = body;

    if (!name || !quote || !stars) {
      return Response.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }
    if (quote.length > 500) {
      return Response.json({ success: false, error: 'Quote too long (max 500 chars)' }, { status: 400 });
    }
    if (stars < 1 || stars > 5) {
      return Response.json({ success: false, error: 'Stars must be 1-5' }, { status: 400 });
    }

    const mediaJson = JSON.stringify(Array.isArray(media_urls) ? media_urls.slice(0, 3) : []);
    const edit_token = crypto.randomUUID();

    await env.DB.prepare(
      "INSERT INTO reviews (name, role, quote, stars, media_urls, avatar_url, lang, status, edit_token) VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', ?)"
    ).bind(
      name.slice(0, 80),
      (role || '').slice(0, 80),
      quote,
      Math.round(stars),
      mediaJson,
      (avatar_url || '').slice(0, 500),
      lang || 'en',
      edit_token
    ).run();

    const row = await env.DB.prepare(
      "SELECT id FROM reviews WHERE edit_token = ? LIMIT 1"
    ).bind(edit_token).first();

    return Response.json({ success: true, id: row ? row.id : null, edit_token }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
