import type { Metadata } from 'next'
import Link from 'next/link'
import DirectorCard from '@/components/directors/DirectorCard'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '장례지도사 소개 | 휴앤올',
  description:
    '휴앤올의 전문 장례지도사를 소개합니다. 풍부한 경험과 진심을 담은 장례 서비스를 제공합니다.',
}

export default async function DirectorsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let directors: any[] | null = null

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('directors')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      if (error) {
        console.error('[directors page] Supabase error:', error.message)
      }
      console.log('[directors page] fetched:', data?.length, 'directors')
      directors = data
    } catch (err) {
      console.error('[directors page] catch error:', err)
      directors = null
    }
  }

  if (!directors) {
    directors = []
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            Our Directors
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">
            전문 장례지도사 소개
          </h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            고인의 마지막 길을 정성껏 함께하는 휴앤올의 국가공인 장례지도사들을 소개합니다.
          </p>
        </div>
      </section>

      {/* Directors Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        {directors && directors.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center bg-[#F4F8F7] rounded-[2rem] border border-[#E6EFEF]">
            <p className="text-[#666666] font-medium mb-2">
              현재 등록된 장례지도사가 없습니다.
            </p>
            <p className="text-sm text-[#999999] mb-6">시스템 점검 중이거나 업데이트가 진행 중입니다.</p>
            <Link
              href="/consultation"
              className="mt-2 inline-block rounded-full bg-[#1A473F] px-8 py-3.5 text-[15px] font-bold text-white transition-all shadow-[0_4px_10px_-2px_rgba(26,71,63,0.3)] hover:shadow-[0_6px_14px_-4px_rgba(26,71,63,0.4)] hover:bg-[#12322C]"
            >
              1:1 상담 신청하기
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
