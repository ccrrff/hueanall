import type { Metadata } from 'next'
import Link from 'next/link'
import DirectorCard from '@/components/directors/DirectorCard'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { FALLBACK_DIRECTORS } from '@/lib/fallback-data'

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
      const { data } = await supabase
        .from('directors')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
      directors = data
    } catch {
      directors = null
    }
  }

  if (!directors || directors.length === 0) {
    directors = FALLBACK_DIRECTORS.filter(d => d.is_active)
  }

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F0F9F7] to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D7B6F]">
            Our Directors
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            전문 장례지도사 소개
          </h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            고인의 마지막 길을 정성껏 함께하는 휴앤올의 전문 장례지도사를
            소개합니다.
          </p>
        </div>
      </section>

      {/* Directors Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        {directors && directors.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directors.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500">
              현재 등록된 장례지도사가 없습니다.
            </p>
            <Link
              href="/consultation"
              className="mt-4 inline-block rounded-lg bg-[#2D7B6F] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1E5C52]"
            >
              상담 신청하기
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
