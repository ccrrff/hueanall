import { RiTeamLine as Users, RiStarFill as Star } from '@remixicon/react'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export default async function AdminDashboardPage() {
  let directorsCount = 0
  let pendingReviews = 0

  if (isSupabaseConfigured()) {
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()
      const [
        { count: dc },
        { count: pr },
      ] = await Promise.all([
        supabase.from('directors').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      ])
      directorsCount = dc ?? 0
      pendingReviews = pr ?? 0
    } catch {
      // Fall through
    }
  }

  const stats = [
    { label: '활동 중인 지도사', value: directorsCount, icon: Users, color: 'bg-[#1A473F]' },
    { label: '승인 대기 후기', value: pendingReviews, icon: Star, color: 'bg-purple-500' },
  ]

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1A1A1A]">대시보드</h1>
        <p className="text-sm text-[#666666] mt-1">휴앤올 관리자 현황</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-[#E5E7EB] p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
              <s.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-3xl font-black text-[#1A1A1A]">{s.value}</p>
              <p className="text-xs text-[#666666]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
