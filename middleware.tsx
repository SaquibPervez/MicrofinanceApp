import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('Admin-token')?.value;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname.startsWith('/admin') && pathname !== '/admin/Login') {
    return NextResponse.redirect(new URL('/admin/Login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
