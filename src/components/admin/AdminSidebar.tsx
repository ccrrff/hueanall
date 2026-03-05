'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, MessageSquare, Star, LogOut } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const NAV = [
  { label: '대시보드', href: '/admin', icon: LayoutDashboard },
  { label: '장례지도사', href: '/admin/directors', icon: Users },
  { label: '상담 관리', href: '/admin/consultations', icon: MessageSquare },
  { label: '후기 관리', href: '/admin/reviews', icon: Star },
]

interface AdminSidebarProps { email: string | undefined }

export default function AdminSidebar({ email }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    // Local session logout
    await fetch('/api/admin/logout', { method: 'POST' })
    // Supabase session logout (if configured)
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
    } catch {
      // Supabase not configured - ignore
    }
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-60 flex-shrink-0 bg-[#1A1A1A] text-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <p className="text-xs text-white/50 uppercase tracking-widest mb-1">관리자</p>
        <p className="text-lg font-black text-[#2D7B6F]">휴앤올</p>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive ? 'bg-[#2D7B6F] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>
      {/* Footer: email + logout */}
      <div className="px-4 py-4 border-t border-white/10">
        <p className="text-xs text-white/40 truncate mb-3">{email}</p>
        <button onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors w-full"
        >
          <LogOut className="w-4 h-4" /> 로그아웃
        </button>
      </div>
    </aside>
  )
}
