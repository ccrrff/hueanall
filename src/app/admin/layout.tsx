import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let user = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch {
    // Supabase 미설정 시 미인증 처리
  }

  if (!user) return <>{children}</>

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      <AdminSidebar email={user.email} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
