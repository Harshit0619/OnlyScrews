// middleware.ts - Production caching & request handling for Next.js App Router
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  
  // Normalize URLs with spaces or encoded spaces to proper hyphens
  if (pathname.includes('/self-tapping -screws') || 
      pathname.includes('/self-tapping%20-screws')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname
      .replace('/self-tapping -screws', '/self-tapping-screws')
      .replace('/self-tapping%20-screws', '/self-tapping-screws')
    return NextResponse.redirect(url, 301) // Permanent redirect
  }

  // Add cache headers for SEO-critical pages
  // Homepage gets short TTL to stay fresh
  if (pathname === '/') {
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300, stale-if-error=86400')
  }
  
  // Blog posts - longer cache, allow stale content
  if (pathname.startsWith('/blog')) {
    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400, stale-if-error=604800')
  }
  
  // Product pages - balance between freshness and caching
  if (pathname.startsWith('/products') || pathname.startsWith('/category')) {
    response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400, stale-if-error=604800')
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
