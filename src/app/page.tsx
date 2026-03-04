import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import DirectorsPreview from '@/components/home/DirectorsPreview'
import ReviewsPreview from '@/components/home/ReviewsPreview'
import QuickConsultForm from '@/components/home/QuickConsultForm'
import KakaoBanner from '@/components/home/KakaoBanner'
import CtaSection from '@/components/home/CtaSection'
import SectionNav from '@/components/layout/SectionNav'

export const metadata: Metadata = {
  title: '휴앤올 | 장례지도사가 함께하는 후불제 장례서비스',
  description:
    '힘든 순간 전문 장례지도사가 처음부터 끝까지 함께합니다. 후불제로 비용 걱정 없이, 24시간 즉시 상담 가능합니다.',
}

const HOME_SECTIONS = [
  { id: 'hero', label: '메인' },
  { id: 'quick-consult', label: '간편 상담' },
  { id: 'services', label: '서비스' },
  { id: 'kakao', label: '카카오 상담' },
  { id: 'directors', label: '장례지도사' },
  { id: 'reviews', label: '고객 후기' },
  { id: 'cta', label: '상담 연결' },
]

export default function HomePage() {
  return (
    <>
      <SectionNav sections={HOME_SECTIONS} />

      <HeroSection />

      {/* 간편 상담 신청 */}
      <section id="quick-consult" className="py-16 bg-[#F8F9FA]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 좌측: 안내 문구 */}
            <div>
              <p className="text-[#2D7B6F] font-semibold text-sm uppercase tracking-widest mb-3">
                Quick Consultation
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4 leading-tight">
                30초 간편 상담 신청
              </h2>
              <p className="text-[#666666] text-lg leading-relaxed mb-6">
                이름과 연락처만 남겨주시면<br />
                전문 장례지도사가 직접 연락드립니다.
              </p>
              <ul className="space-y-3">
                {[
                  '평균 30분 이내 연락',
                  '24시간 365일 운영',
                  '무료 상담 · 부담 없음',
                  '개인정보 안전하게 보호',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[#444444]">
                    <span className="w-5 h-5 rounded-full bg-[#2D7B6F] flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 우측: 폼 */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
              <QuickConsultForm />
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />

      <KakaoBanner />

      <DirectorsPreview />

      <ReviewsPreview />

      <CtaSection />
    </>
  )
}
