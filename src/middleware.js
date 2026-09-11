import { NextResponse } from 'next/server';

/**
 * The site used to serve /en and /es. It is English-only now, so anything that
 * still points at a language prefix is redirected permanently to the clean URL.
 */
export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const match = pathname.match(/^\/(en|es)(\/.*)?$/);
  if (!match) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = match[2] || '/';
  url.search = search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/en', '/en/:path*', '/es', '/es/:path*'],
};
