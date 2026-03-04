import Image from 'next/image'
import { Star } from 'lucide-react'

interface ReviewCardProps {
  review: {
    id: string
    customer_name: string
    rating: number
    content: string
    image_urls: unknown
    created_at: string
    directors?: { name: string } | null
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating}점`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-[#FEE500] text-[#FEE500]' : 'text-[#E5E7EB]'}`}
        />
      ))}
    </div>
  )
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const images = Array.isArray(review.image_urls)
    ? (review.image_urls as string[])
    : []
  const date = new Date(review.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const maxThumbnails = 3

  return (
    <article className="bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-3 hover:shadow-md transition-shadow duration-200">
      {/* Rating + Date */}
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <time className="text-xs text-[#999]" dateTime={review.created_at}>
          {date}
        </time>
      </div>

      {/* Content */}
      <p className="text-sm text-[#444] leading-relaxed line-clamp-5">
        {review.content}
      </p>

      {/* Images */}
      {images.length > 0 && (
        <div className="flex gap-2">
          {images.slice(0, maxThumbnails).map((url, i) => {
            const isLast = i === maxThumbnails - 1 && images.length > maxThumbnails
            return (
              <div
                key={i}
                className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
              >
                <Image
                  src={url}
                  alt={`후기 이미지 ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
                {isLast && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      +{images.length - maxThumbnails}
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Author */}
      <div className="border-t border-[#E5E7EB] pt-3 mt-auto">
        <p className="font-bold text-sm text-[#1A1A1A]">
          {review.customer_name}
        </p>
        {review.directors?.name && (
          <p className="text-xs text-[#2D7B6F] mt-0.5">
            담당 지도사: {review.directors.name}
          </p>
        )}
      </div>
    </article>
  )
}
