import Link from 'next/link'
import Image from 'next/image'
import { RiArrowRightLine as ArrowRight, RiAwardLine as Award, RiUserLine as User } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export default async function DirectorsPreview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let directors: any[] = []

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('directors')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .limit(3)
      directors = data ?? []
    } catch {
      directors = []
    }
  }

  return (
    <section id="directors" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#1A473F] font-semibold text-sm uppercase tracking-widest mb-3">Our Directors</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">전문 장례지도사 소개</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto leading-relaxed">
            풍부한 경험과 따뜻한 마음으로 함께하는 전문가들입니다
          </p>
        </div>

        {directors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {directors.map((director) => (
              <div
                key={director.id}
                className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#1A473F] hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-20 h-20 bg-[#1A473F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden relative">
                  {director.photo_url ? (
                    <Image src={director.photo_url} alt={director.name} fill className="object-cover object-top" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{director.name}</h3>
                <p className="text-[#1A473F] font-medium text-sm mb-3">{director.title}</p>
                <div className="flex items-center justify-center gap-1.5 text-[#666666] text-sm mb-4">
                  <Award className="w-4 h-4 text-[#1A473F]" />
                  경력 {director.years_experience}년
                </div>
                {Array.isArray(director.specialties) && director.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {director.specialties.map((s: string) => (
                      <span key={s} className="bg-[#F4F8F7] text-[#1A473F] text-xs px-2.5 py-1 rounded-full font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 mb-10">
            <User className="w-12 h-12 text-[#E6EFEF] mx-auto mb-4" />
            <p className="text-[#999999]">현재 등록된 장례지도사가 없습니다</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline" className="border-[#1A473F] text-[#1A473F] hover:bg-[#F4F8F7] rounded-full px-8">
            <Link href="/directors" className="flex items-center gap-2">
              전체 장례지도사 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
