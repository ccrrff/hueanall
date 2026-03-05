import { Users, MessageSquare, Star, Clock } from 'lucide-react'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { FALLBACK_DIRECTORS } from '@/lib/fallback-data'
import { getLocalReviewCounts } from '@/lib/local-store'

export default async function AdminDashboardPage() {
  let directorsCount = 0
  let pendingConsultations = 0
  let pendingReviews = 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let recentConsultations: any[] = []

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const [
        { count: dc },
        { count: pc },
        { count: pr },
        { data: rc },
      ] = await Promise.all([
        supabase.from('directors').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('consultations').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('consultations').select('*, directors(name)').order('created_at', { ascending: false }).limit(10),
      ])
      directorsCount = dc ?? 0
      pendingConsultations = pc ?? 0
      pendingReviews = pr ?? 0
      recentConsultations = rc ?? []
    } catch {
      // Fall through to fallback
    }
  }

  if (!isSupabaseConfigured()) {
    const counts = getLocalReviewCounts()
    directorsCount = FALLBACK_DIRECTORS.filter(d => d.is_active).length
    pendingConsultations = 0
    pendingReviews = counts.pending
    recentConsultations = []
  }

  const stats = [
    { label: '활동 중인 지도사', value: directorsCount, icon: Users, color: 'bg-[#2D7B6F]' },
    { label: '대기 중인 상담', value: pendingConsultations, icon: MessageSquare, color: 'bg-orange-500' },
    { label: '승인 대기 후기', value: pendingReviews, icon: Star, color: 'bg-purple-500' },
  ]

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1A1A1A]">대시보드</h1>
        <p className="text-sm text-[#666666] mt-1">휴앤올 관리자 현황</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      {/* Recent Consultations Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#2D7B6F]" />
          <h2 className="font-bold text-[#1A1A1A]">최근 상담 신청</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">고객명</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">연락처</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">유형</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">지도사</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">상태</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">접수일시</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations.map((c: {
                id: string; customer_name: string; customer_phone: string;
                consultation_type: string; directors: { name?: string } | null;
                status: string; created_at: string;
              }) => (
                <tr key={c.id} className="border-b border-[#F0F0F0] hover:bg-[#F8F9FA]">
                  <td className="px-4 py-3 font-medium">{c.customer_name}</td>
                  <td className="px-4 py-3 text-[#666666]">{c.customer_phone}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-[#F0F9F7] text-[#2D7B6F] px-2 py-0.5 rounded-full font-medium">{c.consultation_type}</span>
                  </td>
                  <td className="px-4 py-3 text-[#666666]">{c.directors?.name ?? '-'}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3 text-[#999999] text-xs">
                    {new Date(c.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
              {!recentConsultations.length && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[#999999]">상담 신청이 없습니다</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: '대기중', className: 'bg-yellow-100 text-yellow-700' },
    contacted: { label: '연락완료', className: 'bg-blue-100 text-blue-700' },
    completed: { label: '완료', className: 'bg-green-100 text-green-700' },
    cancelled: { label: '취소', className: 'bg-gray-100 text-gray-500' },
  }
  const s = map[status] ?? { label: status, className: 'bg-gray-100 text-gray-500' }
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.className}`}>{s.label}</span>
}
