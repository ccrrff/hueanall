import { getAdminSession } from '@/lib/auth'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // 1. Local cookie-based auth (primary - works without Supabase)
  const session = await getAdminSession()
  if (session.authenticated) {
    return (
      <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
        <AdminSidebar email={session.adminId} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    )
  }

  // 2. Supabase auth fallback (when configured)
  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        return (
          <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
            <AdminSidebar email={data.user.email} />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        )
      }
    } catch {
      // Supabase auth failed
    }
  }

  // 3. Not authenticated - render children (shows login page)
  return <>{children}</>
}
