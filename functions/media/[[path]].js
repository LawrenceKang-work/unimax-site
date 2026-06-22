// Proxy R2 objects so uploaded review images are accessible at /media/<key>
// This avoids requiring R2 public r2.dev access to be manually enabled

export async function onRequestGet({ params, env }) {
  try {
    const key = Array.isArray(params.path) ? params.path.join('/') : params.path;
    if (!key) return new Response('Not found', { status: 404 });

    const object = await env.MEDIA_BUCKET.get(key);
    if (!object) return new Response('Not found', { status: 404 });

    return new Response(object.body, {
      headers: {
        'Content-Type': object.httpMetadata?.contentType || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (e) {
    return new Response('Error: ' + e.message, { status: 500 });
  }
}
