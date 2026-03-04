import Link from 'next/link'
import { Star, ArrowRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'

const placeholderReviews = [
  {
    id: '1',
    name: '김○○',
    rating: 5,
    content: '갑작스러운 부친상에 당황했는데, 담당 지도사님이 처음부터 끝까지 차분하게 안내해 주셨습니다. 후불제라 비용 걱정 없이 장례를 치를 수 있었어요. 진심으로 감사드립니다.',
    date: '2025년 12월',
    director: '김○○ 지도사',
  },
  {
    id: '2',
    name: '이○○',
    rating: 5,
    content: '24시간 언제든지 연락이 되고, 새벽에도 즉시 출동해 주셨습니다. 전문적인 조언 덕분에 고인을 품위 있게 보내드릴 수 있었습니다. 휴앤올을 선택하길 잘했습니다.',
    date: '2026년 1월',
    director: '이○○ 지도사',
  },
  {
    id: '3',
    name: '박○○',
    rating: 5,
    content: '회사에서 단체 상조를 통해 이용했습니다. 체계적이고 친절한 서비스에 임직원 모두가 만족했습니다. 다음에도 꼭 휴앤올을 이용하겠습니다.',
    date: '2026년 2월',
    director: '박○○ 지도사',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'fill-[#FEE500] text-[#FEE500]' : 'text-[#E5E7EB]'}`} />
      ))}
    </div>
  )
}

export default function ReviewsPreview() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2D7B6F] font-semibold text-sm uppercase tracking-widest mb-3">Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">고객님들의 소중한 후기</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto leading-relaxed">
            실제 서비스를 경험하신 고객님들의 이야기입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {placeholderReviews.map((review) => (
            <div key={review.id} className="bg-[#F8F9FA] rounded-2xl p-6 border border-[#E5E7EB] flex flex-col">
              <Quote className="w-8 h-8 text-[#2D7B6F]/30 mb-3 flex-shrink-0" />
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

        <div className="text-center">
          <Button asChild variant="outline" className="border-[#2D7B6F] text-[#2D7B6F] hover:bg-[#F0F9F7] rounded-full px-8">
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
