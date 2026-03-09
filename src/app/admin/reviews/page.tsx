import Image from 'next/image'
import Link from 'next/link'
import { RiStarFill as Star } from '@remixicon/react'
import ReviewActionButtons from '@/components/admin/ReviewActionButtons'
import { isSupabaseConfigured } from '@/lib/supabase/config'

const STATUS_TABS = [
  { value: '', label: '전체' },
  { value: 'pending', label: '대기중' },
  { value: 'approved', label: '승인됨' },
  { value: 'rejected', label: '거절됨' },
]

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reviews: any[] = []

  if (isSupabaseConfigured()) {
    try {
      const { createAdminClient } = await import('@/lib/supabase/admin')
      const supabase = createAdminClient()
      let query = supabase
        .from('reviews')
        .select('*, directors(name)')
        .order('created_at', { ascending: false })
      if (status) query = query.eq('status', status as 'pending' | 'approved' | 'rejected')
      const { data } = await query
      reviews = data ?? []
    } catch {
      // Fall through to fallback
    }
  }


  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#1A1A1A]">후기 관리</h1>
        <p className="text-sm text-[#666666] mt-1">총 {reviews.length}건</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-[#E5E7EB] p-1 rounded-xl w-fit">
        {STATUS_TABS.map(tab => (
          <Link key={tab.value}
            href={tab.value ? `/admin/reviews?status=${tab.value}` : '/admin/reviews'}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              (status ?? '') === tab.value
                ? 'bg-[#1A473F] text-white'
                : 'text-[#666666] hover:bg-[#F8F9FA]'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="space-y-3">
        {reviews.map(review => {
          const images = Array.isArray(review.image_urls) ? (review.image_urls as string[]) : []
          return (
            <div key={review.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-[#FEE500] text-[#FEE500]' : 'text-[#E5E7EB]'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-[#999999]">
                      {new Date(review.created_at).toLocaleString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-[#444444] leading-relaxed mb-2 line-clamp-3">{review.content}</p>
                  <div className="flex items-center gap-2 text-xs text-[#666666]">
                    <span className="font-medium">{review.customer_name}</span>
                    {(review.directors as { name?: string } | null)?.name && (
                      <span className="text-[#1A473F]">· {(review.directors as { name?: string }).name} 지도사</span>
                    )}
                  </div>
                  {images.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {images.slice(0, 4).map((url: string, i: number) => (
                        <div key={i} className="w-16 h-16 relative rounded-lg overflow-hidden border border-[#E5E7EB] flex-shrink-0">
                          <Image src={url} alt={`후기 이미지 ${i+1}`} fill className="object-cover" />
                        </div>
                      ))}
                      {images.length > 4 && (
                        <div className="w-16 h-16 bg-[#F8F9FA] rounded-lg flex items-center justify-center text-xs text-[#999999] font-medium border border-[#E5E7EB] flex-shrink-0">
                          +{images.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Actions */}
                <div className="flex-shrink-0">
                  <ReviewActionButtons id={review.id} currentStatus={review.status} />
                </div>
              </div>
            </div>
          )
        })}
        {!reviews.length && (
          <div className="bg-white rounded-2xl border border-[#E5E7EB] py-12 text-center text-[#999999]">
            후기가 없습니다
          </div>
        )}
      </div>
    </div>
  )
}
