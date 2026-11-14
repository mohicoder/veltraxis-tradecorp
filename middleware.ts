import { NextResponse, type NextRequest } from 'next/server';

const PREFIXED = ['ru'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split('/')[1];

  // /en/... is served at the root — redirect to the unprefixed URL
  if (first === 'en') {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(url, 308);
  }
  // Pass the language on as a header (used by the 404 page, which gets no params)
  const headers = new Headers(req.headers);
  if (PREFIXED.includes(first)) {
    headers.set('x-site-lang', first);
    return NextResponse.next({ request: { headers } });
  }

  // Everything else is English: rewrite internally to /en/...
  headers.set('x-site-lang', 'en');
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ['/((?!api|_next|favicon|icon|apple-icon|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)'],
};
