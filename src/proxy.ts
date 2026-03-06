import { NextResponse, type NextRequest } from 'next/server'
import { verifySessionToken } from '@/lib/auth'

export async function proxy(request: NextRequest) {
  const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPath = request.nextUrl.pathname === '/admin/login'

  if (isAdminPath && !isLoginPath) {
    // 커스텀 HMAC 쿠키 인증 확인
    const adminSession = request.cookies.get('admin_session')?.value
    if (adminSession && verifySessionToken(adminSession)) {
      return NextResponse.next({ request })
    }

    // Supabase 인증 폴백
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      try {
        const { createServerClient } = await import('@supabase/ssr')
        const supabase = createServerClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
            cookies: {
              getAll() { return request.cookies.getAll() },
              setAll() {},
            },
          }
        )
        const { data: { user } } = await supabase.auth.getUser()
        if (user) return NextResponse.next({ request })
      } catch {
        // 인증 실패 시 로그인으로
      }
    }

    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/admin/login'
    redirectUrl.searchParams.set('redirected', 'true')
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next({ request })
}

export const config = {
  matcher: ['/admin/:path*'],
}
