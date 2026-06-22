// POST /api/upload  → 上传图片到 R2，返回公开 CDN URL

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
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return Response.json({ success: false, error: 'Only JPG, PNG, WebP, GIF allowed' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return Response.json({ success: false, error: 'File too large (max 5MB)' }, { status: 400 });
    }

    const ext = file.type.split('/')[1].replace('jpeg', 'jpg');
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 8);
    const key = `reviews/${timestamp}-${random}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    await env.MEDIA_BUCKET.put(key, arrayBuffer, {
      httpMetadata: { contentType: file.type }
    });

    const publicUrl = `/media/${key}`;

    return Response.json({ success: true, url: publicUrl }, {
      headers: { 'Access-Control-Allow-Origin': '*' }
    });
  } catch (e) {
    return Response.json({ success: false, error: e.message }, { status: 500 });
  }
}
