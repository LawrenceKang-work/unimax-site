// POST /api/admin-auth — 验证管理员 PIN，返回 session token
// ADMIN_KEY 仅存在 Cloudflare Pages Secret，不在任何前端代码中

export async function onRequestPost({ request, env }) {
  const CORS = { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' };
  try {
    const { pin } = await request.json();
    if (!pin || !env.ADMIN_KEY || pin !== env.ADMIN_KEY) {
      return Response.json({ success: false, error: 'Invalid PIN' }, { status: 401, headers: CORS });
    }
    return Response.json({ success: true, token: env.ADMIN_KEY }, { headers: CORS });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500, headers: CORS });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
