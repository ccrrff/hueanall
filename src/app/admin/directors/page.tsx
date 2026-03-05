import Link from 'next/link'
import { deleteDirector } from './actions'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { FALLBACK_DIRECTORS } from '@/lib/fallback-data'
import type { Director } from '@/types/database'

export default async function AdminDirectorsPage() {
  let directors: Director[] = []

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('directors')
        .select('*')
        .order('sort_order', { ascending: true })
      directors = data ?? []
    } catch {
      directors = FALLBACK_DIRECTORS
    }
  } else {
    directors = FALLBACK_DIRECTORS
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">장례지도사 관리</h1>
          <p className="text-sm text-[#666666] mt-1">총 {directors.length}명</p>
        </div>
        <Button asChild className="bg-[#2D7B6F] hover:bg-[#1E5C52] text-white rounded-full gap-2">
          <Link href="/admin/directors/new"><PlusCircle className="w-4 h-4" /> 새 지도사 등록</Link>
        </Button>
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">순서</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">이름</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">직함</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">경력</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">상태</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">관리</th>
            </tr>
          </thead>
          <tbody>
            {directors.map(d => (
              <tr key={d.id} className="border-b border-[#F0F0F0] hover:bg-[#F8F9FA]">
                <td className="px-4 py-3 text-[#999999]">{d.sort_order}</td>
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3 text-[#666666]">{d.title}</td>
                <td className="px-4 py-3 text-[#666666]">{d.years_experience}년</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {d.is_active ? '활성' : '비활성'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/directors/${d.id}/edit`}
                      className="flex items-center gap-1 text-xs text-[#2D7B6F] hover:underline">
                      <Pencil className="w-3 h-3" /> 수정
                    </Link>
                    {isSupabaseConfigured() && (
                      <form action={deleteDirector.bind(null, d.id)}>
                        <button type="submit" className="flex items-center gap-1 text-xs text-red-500 hover:underline"
                          onClick={e => { if (!confirm('삭제하시겠습니까?')) e.preventDefault() }}>
                          <Trash2 className="w-3 h-3" /> 삭제
                        </button>
                      </form>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!directors.length && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-[#999999]">등록된 지도사가 없습니다</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {!isSupabaseConfigured() && (
        <p className="text-xs text-[#999999] mt-4 text-center">
          * Supabase 연결 후 장례지도사 추가/수정/삭제가 가능합니다
        </p>
      )}
    </div>
  )
}
