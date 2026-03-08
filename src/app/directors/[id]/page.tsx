import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'
import DirectorConsultForm from '@/components/directors/DirectorConsultForm'
import { Star, Award, Phone, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Review } from '@/types/database'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data } = await supabase.from('directors').select('name').eq('id', id).single()
    return { title: data ? `${data.name} 장례지도사 | 휴앤올` : '장례지도사 | 휴앤올' }
  } catch {
    return { title: '장례지도사 | 휴앤올' }
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-[#FEE500] text-[#FEE500]' : 'text-[#E5E7EB]'}`}
        />
      ))}
    </div>
  )
}

export default async function DirectorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let director: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let reviews: any[] | null = null
  try {
    const supabase = await createClient()
    const { data: directorData } = await supabase
      .from('directors')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()
    director = directorData

    if (director) {
      const { data: reviewData } = await supabase
        .from('reviews')
        .select('*')
        .eq('director_id', id)
        .eq('status', 'approved')
        .order('created_at', { ascending: false })
        .limit(6)
      reviews = reviewData
    }
  } catch {
    // Supabase 미설정 시 notFound 처리
  }

  if (!director) notFound()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[#999999]">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-[#2D7B6F] transition-colors">
              홈
            </Link>
          </li>
          <li>&gt;</li>
          <li>
            <Link href="/directors" className="hover:text-[#2D7B6F] transition-colors">
              장례지도사
            </Link>
          </li>
          <li>&gt;</li>
          <li className="text-[#1A1A1A] font-medium">{director.name}</li>
        </ol>
      </nav>

      {/* Profile Card */}
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 mb-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Photo / Avatar */}
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-full">
            {director.photo_url ? (
              <Image
                src={director.photo_url}
                alt={`${director.name} 장례지도사`}
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[#2D7B6F] text-5xl font-black text-white">
                {director.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-3xl font-black text-[#1A1A1A]">{director.name}</h1>
              <BadgeCheck className="w-6 h-6 text-[#2D7B6F]" />
            </div>
            <p className="text-[#666666]">
              {director.title}
              {director.position && ` · ${director.position}`}
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#2D7B6F]">
              <Award className="w-4 h-4" />
              <span>경력 {director.years_experience}년</span>
            </div>

            {director.phone && (
              <div className="mt-3">
                <a
                  href={`tel:${director.phone}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F0F9F7] px-4 py-2 text-sm font-medium text-[#2D7B6F] transition-colors hover:bg-[#2D7B6F] hover:text-white"
                >
                  <Phone className="w-4 h-4" />
                  직통 전화
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Introduction */}
        {director.introduction && (
          <div className="mt-8 border-t border-[#E5E7EB] pt-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">소개</h2>
            <p className="text-[#444444] leading-relaxed whitespace-pre-line">
              {director.introduction}
            </p>
          </div>
        )}

        {/* Specialties */}
        {director.specialties && director.specialties.length > 0 && (
          <div className="mt-6 border-t border-[#E5E7EB] pt-6">
            <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">전문 분야</h2>
            <div className="flex flex-wrap gap-2">
              {director.specialties.map((s: string) => (
                <span
                  key={s}
                  className="rounded-full bg-[#F0F9F7] px-3 py-1.5 text-sm text-[#2D7B6F] font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Reviews Section */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">고객 후기</h2>
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(reviews as Review[]).map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-[#E5E7EB] bg-[#F8F9FA] p-5 flex flex-col"
              >
                <StarRating rating={review.rating} />
                <p className="mt-3 text-sm text-[#444444] leading-relaxed flex-1">
                  {review.content}
                </p>
                <div className="mt-4 border-t border-[#E5E7EB] pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1A1A1A]">{review.customer_name}</span>
                  <span className="text-xs text-[#999999]">
                    {new Date(review.created_at).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#999999] text-center py-8">
            아직 등록된 후기가 없습니다
          </p>
        )}
      </section>

      {/* Consult Form */}
      <section className="max-w-xl mx-auto">
        <DirectorConsultForm directorId={director.id} directorName={director.name} />
      </section>
    </div>
  )
}
