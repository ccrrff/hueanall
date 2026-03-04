import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Supabase 환경변수 미설정 시 그냥 통과 (배포 초기 crash 방지)
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isAdminPath = request.nextUrl.pathname.startsWith('/admin')
    const isLoginPath = request.nextUrl.pathname === '/admin/login'

    if (isAdminPath && !isLoginPath && !user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin/login'
      redirectUrl.searchParams.set('redirected', 'true')
      return NextResponse.redirect(redirectUrl)
    }

    if (isLoginPath && user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/admin'
      return NextResponse.redirect(redirectUrl)
    }
  } catch {
    // 인증 실패 시 그냥 통과
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*'],
}
