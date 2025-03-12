const ALLOWED_ORIGINS = ['https://hallin.media', 'http://localhost:4321'];

export function validateOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

export function corsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get('origin');

  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin || '')
      ? origin!
      : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
