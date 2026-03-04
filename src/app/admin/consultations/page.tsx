import { createClient } from '@/lib/supabase/server'
import ConsultationStatusButton from '@/components/admin/ConsultationStatusButton'
import Link from 'next/link'

const STATUS_TABS = [
  { value: '', label: '전체' },
  { value: 'pending', label: '대기중' },
  { value: 'contacted', label: '연락완료' },
  { value: 'completed', label: '완료' },
  { value: 'cancelled', label: '취소' },
]

const TYPE_LABELS: Record<string, string> = {
  general: '일반',
  director_specific: '지도사 지정',
  quick: '퀵 상담',
  kakao: '카카오',
}

export default async function AdminConsultationsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from('consultations')
    .select('*, directors(name)')
    .order('created_at', { ascending: false })

  if (status) query = query.eq('status', status as 'pending' | 'contacted' | 'completed' | 'cancelled')

  const { data: consultations } = await query

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1A1A1A]">상담 신청 관리</h1>
        <p className="text-sm text-[#666666] mt-1">총 {consultations?.length ?? 0}건</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-[#E5E7EB] p-1 rounded-xl w-fit">
        {STATUS_TABS.map(tab => (
          <Link key={tab.value}
            href={tab.value ? `/admin/consultations?status=${tab.value}` : '/admin/consultations'}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (status ?? '') === tab.value
                ? 'bg-[#2D7B6F] text-white'
                : 'text-[#666666] hover:bg-[#F8F9FA]'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">고객명</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">연락처</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">유형</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">담당 지도사</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">메시지</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">상태</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">접수일시</th>
              </tr>
            </thead>
            <tbody>
              {consultations?.map(c => (
                <tr key={c.id} className="border-b border-[#F0F0F0] hover:bg-[#F8F9FA]">
                  <td className="px-4 py-3 font-medium">{c.customer_name}</td>
                  <td className="px-4 py-3">
                    <a href={`tel:${c.customer_phone}`} className="text-[#2D7B6F] hover:underline">
                      {c.customer_phone}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-[#F0F9F7] text-[#2D7B6F] px-2 py-0.5 rounded-full font-medium">
                      {TYPE_LABELS[c.consultation_type] ?? c.consultation_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#666666]">
                    {(c.directors as { name?: string } | null)?.name ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-[#666666] max-w-[200px]">
                    <p className="truncate text-xs">{c.message ?? '-'}</p>
                  </td>
                  <td className="px-4 py-3">
                    <ConsultationStatusButton id={c.id} currentStatus={c.status} />
                  </td>
                  <td className="px-4 py-3 text-[#999999] text-xs whitespace-nowrap">
                    {new Date(c.created_at).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
              {!consultations?.length && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-[#999999]">상담 신청이 없습니다</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
