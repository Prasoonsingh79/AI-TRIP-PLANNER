import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // Define public paths that DON'T require a token
  const isPublicPath = pathname === '/' || pathname.startsWith('/auth')

  if (!token && !isPublicPath) {
    // Redirect to login if trying to access a protected route (Planner, Packing, etc.) without a token cookie
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Optional: Redirect logged-in users away from auth pages to the planner
  if (token && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/planner', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
