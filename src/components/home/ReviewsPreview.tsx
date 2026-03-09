import Link from 'next/link'
import { RiStarFill as Star, RiArrowRightLine as ArrowRight, RiDoubleQuotesL as Quote } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { isSupabaseConfigured } from '@/lib/supabase/config'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#FEE500] text-[#FEE500]' : 'text-[#E5E7EB]'}`} />
      ))}
    </div>
  )
}

export default async function ReviewsPreview() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reviews: any[] = []

  if (isSupabaseConfigured()) {
    try {
      const { createClient } = await import('@/lib/supabase/server')
      const supabase = await createClient()
      const { data } = await supabase
        .from('reviews')
        .select('*, directors(name)')
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(3)
      reviews = data ?? []
    } catch {
      reviews = []
    }
  }

  const displayReviews = reviews.map(r => ({
    id: r.id,
    name: r.customer_name,
    rating: r.rating,
    content: r.content,
    date: new Date(r.created_at).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' }),
    director: r.directors ? `${r.directors.name} 지도사` : '',
  }))

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#1A473F] font-semibold text-sm uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">고객님들의 소중한 후기</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto leading-relaxed">
            실제 서비스를 경험하신 고객님들의 이야기입니다
          </p>
        </div>

        {displayReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {displayReviews.map((review) => (
              <div key={review.id} className="bg-[#F8F9FA] rounded-2xl p-6 border border-[#E5E7EB] flex flex-col">
                <Quote className="w-8 h-8 text-[#1A473F]/30 mb-3 flex-shrink-0" />
                <p className="text-[#444444] leading-relaxed mb-4 flex-1 text-sm">{review.content}</p>
                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#1A1A1A] text-sm">{review.name}</p>
                      <p className="text-xs text-[#999999]">{review.date} · {review.director}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 mb-10">
            <Quote className="w-12 h-12 text-[#E6EFEF] mx-auto mb-4" />
            <p className="text-[#999999]">아직 등록된 후기가 없습니다</p>
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="outline" className="border-[#1A473F] text-[#1A473F] hover:bg-[#F4F8F7] rounded-full px-8">
            <Link href="/reviews" className="flex items-center gap-2">
              후기 더 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
