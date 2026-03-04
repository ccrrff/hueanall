import { createClient } from '@/lib/supabase/server'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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
