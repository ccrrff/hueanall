import Link from 'next/link'
import Image from 'next/image'
import { RiAddCircleLine as PlusCircle, RiPencilLine as Pencil, RiUserLine as User } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import type { Director } from '@/types/database'
import DeleteDirectorButton from '@/components/admin/DeleteDirectorButton'
import ToggleActiveButton from '@/components/admin/ToggleActiveButton'
import DirectorSortInput from '@/components/admin/DirectorSortInput'

export default async function AdminDirectorsPage() {
  let directors: Director[] = []
  const configured = isSupabaseConfigured()

  if (configured) {
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()
      const { data } = await supabase
        .from('directors')
        .select('*')
        .order('sort_order', { ascending: true })
      directors = data ?? []
    } catch {
      directors = []
    }
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">장례지도사 관리</h1>
          <p className="text-sm text-[#666666] mt-1">총 {directors.length}명</p>
        </div>
        <Button asChild className="bg-[#1A473F] hover:bg-[#12322C] text-white rounded-full gap-2">
          <Link href="/admin/directors/new"><PlusCircle className="w-4 h-4" /> 새 지도사 등록</Link>
        </Button>
      </div>

      {directors.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F3F4F6] flex items-center justify-center">
            <User className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <p className="text-[#666666] font-medium mb-1">등록된 지도사가 없습니다</p>
          <p className="text-sm text-[#9CA3AF] mb-4">새 지도사를 등록해보세요</p>
          <Button asChild className="bg-[#1A473F] hover:bg-[#12322C] text-white rounded-full gap-2">
            <Link href="/admin/directors/new"><PlusCircle className="w-4 h-4" /> 등록하기</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* 데스크톱 테이블 */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">순서</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">지도사</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">직함</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#666666]">경력</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-[#666666]">상태</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[#666666]">관리</th>
                </tr>
              </thead>
              <tbody>
                {directors.map(d => (
                  <tr key={d.id} className="border-b border-[#F0F0F0] hover:bg-[#F8F9FA] transition-colors">
                    <td className="px-4 py-3">
                      {configured ? (
                        <DirectorSortInput id={d.id} defaultOrder={d.sort_order} />
                      ) : (
                        <span className="text-[#999999] tabular-nums">{d.sort_order}</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {d.photo_url ? (
                          <Image
                            src={d.photo_url}
                            alt={d.name}
                            width={48}
                            height={48}
                            className="w-10 h-10 rounded-full object-cover border border-[#E5E7EB] shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                            <User className="w-5 h-5 text-[#9CA3AF]" />
                          </div>
                        )}
                        <div>
                          <span className="font-medium text-[#1A1A1A]">{d.name}</span>
                          {d.phone && <p className="text-xs text-[#999999]">{d.phone}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#666666]">{d.title}</td>
                    <td className="px-4 py-3 text-[#666666]">{d.years_experience}년</td>
                    <td className="px-4 py-3 text-center">
                      {configured ? (
                        <ToggleActiveButton id={d.id} isActive={d.is_active} />
                      ) : (
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {d.is_active ? '활성' : '비활성'}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8 gap-1 text-xs rounded-lg">
                          <Link href={`/admin/directors/${d.id}/edit`}>
                            <Pencil className="w-3 h-3" /> 수정
                          </Link>
                        </Button>
                        {configured && <DeleteDirectorButton id={d.id} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드 */}
          <div className="md:hidden space-y-3">
            {directors.map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-[#E5E7EB] p-4">
                <div className="flex items-center gap-3 mb-3">
                  {d.photo_url ? (
                    <Image
                      src={d.photo_url}
                      alt={d.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border border-[#E5E7EB] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-[#9CA3AF]" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-[#1A1A1A]">{d.name}</div>
                    <div className="text-xs text-[#666666]">{d.title} · {d.years_experience}년</div>
                  </div>
                  {configured ? (
                    <ToggleActiveButton id={d.id} isActive={d.is_active} />
                  ) : (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${d.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {d.is_active ? '활성' : '비활성'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-[#F0F0F0]">
                  <div className="flex items-center gap-1 text-xs text-[#999999]">
                    순서:
                    {configured ? (
                      <DirectorSortInput id={d.id} defaultOrder={d.sort_order} />
                    ) : (
                      <span>{d.sort_order}</span>
                    )}
                  </div>
                  <div className="flex-1" />
                  <Button asChild variant="outline" size="sm" className="h-7 gap-1 text-xs rounded-lg">
                    <Link href={`/admin/directors/${d.id}/edit`}>
                      <Pencil className="w-3 h-3" /> 수정
                    </Link>
                  </Button>
                  {configured && <DeleteDirectorButton id={d.id} />}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!configured && (
        <p className="text-xs text-[#999999] mt-4 text-center">
          * Supabase 연결 후 장례지도사 추가/수정/삭제가 가능합니다
        </p>
      )}
    </div>
  )
}
