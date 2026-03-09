import type { Metadata } from 'next'
import { RiDoubleQuotesL as Quote } from '@remixicon/react'
import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewForm from '@/components/reviews/ReviewForm'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '고객 후기 | 휴앤올',
  description: '휴앤올 실제 이용 고객님들의 소중한 후기입니다.',
}

export default async function ReviewsPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reviews: any[] | null = null

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('reviews')
        .select('*, directors(name)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
      reviews = data
      console.log('[reviews page] fetched:', data?.length, 'reviews, image_urls:', data?.map(r => r.image_urls))
    } catch {
      // Supabase 미설정 시 fallback 사용
    }
  }

  if (!reviews) {
    reviews = []
  }

  const hasReviews = reviews && reviews.length > 0

  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            Reviews
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">
            고객 후기
          </h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            휴앤올 장례서비스를 이용하신 고객님들이 남겨주신 소중하고 진솔한 이야기입니다.
          </p>
          <a
            href="#write-review"
            className="inline-block mt-8 bg-[#1A473F] hover:bg-[#12322C] text-white font-bold px-7 py-3 rounded-full transition-all shadow-[0_4px_10px_-2px_rgba(26,71,63,0.3)] hover:shadow-[0_6px_14px_-4px_rgba(26,71,63,0.4)]"
          >
            나의 후기 작성하기
          </a>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {hasReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(reviews ?? []).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#F4F8F7] rounded-[2rem] border border-[#E6EFEF]">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Quote className="w-8 h-8 text-[#1A473F]/30" />
            </div>
            <p className="text-xl font-black tracking-tight text-[#1A1A1A] mb-2">
              아직 등록된 후기가 없습니다
            </p>
            <p className="text-[15px] font-medium text-[#666666] mb-8">
              투명하고 정직한 서비스로 첫 번째 감동을 선물하고 싶습니다.
            </p>
            <a
              href="#write-review"
              className="inline-block bg-white border border-[#E6EFEF] hover:border-[#1A473F] text-[#1A473F] font-bold px-8 py-3.5 rounded-full transition-all shadow-sm focus:ring-2 focus:ring-[#1A473F]/20"
            >
              후기 작성 등록
            </a>
          </div>
        )}
      </section>

      {/* Write Review Section */}
      <section id="write-review" className="py-20 bg-[#FAFAFA] border-t border-[#E6EFEF]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight mb-3">
              따뜻한 한 마디를 남겨주세요
            </h2>
            <p className="text-[#666666] font-medium mb-6">
              고객님의 소중한 후기가 다른 분들께 큰 위로와 힘이 됩니다.
            </p>
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 bg-[#F4F8F7] text-[#1A473F] text-xs font-bold px-4 py-1.5 rounded-full border border-[#E6EFEF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3A9B8C]"></span>
                작성된 후기는 담당자 검토 후 정식 게시됩니다
              </span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-black/[0.03] border border-[#E6EFEF]">
            <ReviewForm />
          </div>
        </div>
      </section>
    </>
  )
}
