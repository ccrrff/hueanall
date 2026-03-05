import type { Metadata } from 'next'
import { Quote } from 'lucide-react'
import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewForm from '@/components/reviews/ReviewForm'
import { isSupabaseConfigured } from '@/lib/supabase/config'
import { FALLBACK_REVIEWS } from '@/lib/fallback-data'
import { getLocalReviews } from '@/lib/local-store'

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
    } catch {
      // Supabase 미설정 시 fallback 사용
    }
  }

  if (!reviews || reviews.length === 0) {
    const localApproved = getLocalReviews('approved')
    reviews = [...FALLBACK_REVIEWS, ...localApproved]
  }

  const hasReviews = reviews && reviews.length > 0

  return (
    <>
      {/* Page Header */}
      <section className="py-16 bg-gradient-to-b from-[#F0F9F7] to-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm font-semibold text-[#2D7B6F] tracking-widest uppercase mb-3">
            Reviews
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A]">
            고객 후기
          </h1>
          <p className="mt-3 text-[#666] max-w-md mx-auto">
            휴앤올 장례서비스를 이용해주신 고객님들의 소중한 후기입니다
          </p>
          <a
            href="#write-review"
            className="inline-block mt-6 bg-[#2D7B6F] hover:bg-[#1E5C52] text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            후기 작성하기
          </a>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {hasReviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(reviews ?? []).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Quote className="w-12 h-12 text-[#D1EDE9] mx-auto mb-4" />
            <p className="text-lg font-bold text-[#1A1A1A]">
              아직 등록된 후기가 없습니다
            </p>
            <p className="text-sm text-[#999] mt-2">
              첫 번째 후기를 작성해보세요
            </p>
            <a
              href="#write-review"
              className="inline-block mt-6 bg-[#2D7B6F] hover:bg-[#1E5C52] text-white font-bold px-6 py-3 rounded-full transition-colors"
            >
              후기 작성하기
            </a>
          </div>
        )}
      </section>

      {/* Write Review Section */}
      <section id="write-review" className="py-16 bg-[#F8F9FA]">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black text-[#1A1A1A] text-center">
            후기 작성하기
          </h2>
          <p className="text-[#666] text-center mt-2 mb-2">
            소중한 후기를 남겨주세요
          </p>
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-1.5 bg-[#FEF3C7] text-[#92400E] text-xs font-medium px-3 py-1.5 rounded-full">
              후기는 검토 후 게시됩니다
            </span>
          </div>
          <ReviewForm />
        </div>
      </section>
    </>
  )
}
