// PATCH /api/reviews/:id  → 编辑评论（需 edit_token 或管理员 token）
// DELETE /api/reviews/:id → 删除评论（需 edit_token 或管理员 token）
// ADMIN_KEY 从 Cloudflare Pages Secret 读取，不硬编码

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { headers: CORS });
}

export async function onRequestPatch({ params, request, env }) {
  try {
    const id = params.id;
    const body = await request.json();
    const { edit_token, quote, role, stars } = body;

    if (!edit_token) {
      return Response.json({ success: false, error: 'Token required' }, { status: 401, headers: CORS });
    }
    if (!quote || quote.length > 500) {
      return Response.json({ success: false, error: 'Invalid quote (max 500 chars)' }, { status: 400, headers: CORS });
    }
    if (!stars || stars < 1 || stars > 5) {
      return Response.json({ success: false, error: 'Stars must be 1-5' }, { status: 400, headers: CORS });
    }

    const isAdmin = (env.ADMIN_KEY && edit_token === env.ADMIN_KEY);

    if (!isAdmin) {
      const row = await env.DB.prepare(
        "SELECT id FROM reviews WHERE id = ? AND edit_token = ?"
      ).bind(id, edit_token).first();
      if (!row) {
        return Response.json({ success: false, error: 'Not found or invalid token' }, { status: 403, headers: CORS });
      }
    }

    await env.DB.prepare(
      "UPDATE reviews SET quote = ?, role = ?, stars = ? WHERE id = ?"
    ).bind(
      quote.slice(0, 500),
      (role || '').slice(0, 80),
      Math.round(stars),
      id
    ).run();

    return Response.json({ success: true }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestDelete({ params, request, env }) {
  try {
    const id = params.id;
    const body = await request.json();
    const { edit_token } = body;

    if (!edit_token) {
      return Response.json({ success: false, error: 'Token required' }, { status: 401, headers: CORS });
    }

    const isAdmin = (env.ADMIN_KEY && edit_token === env.ADMIN_KEY);

    if (!isAdmin) {
      const row = await env.DB.prepare(
        "SELECT id FROM reviews WHERE id = ? AND edit_token = ?"
      ).bind(id, edit_token).first();
      if (!row) {
        return Response.json({ success: false, error: 'Not found or invalid token' }, { status: 403, headers: CORS });
      }
    }

    await env.DB.prepare(
      "DELETE FROM reviews WHERE id = ?"
    ).bind(id).run();

    return Response.json({ success: true }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}
