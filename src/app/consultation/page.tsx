import type { Metadata } from 'next'
import { Phone } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import QuickConsultForm from '@/components/home/QuickConsultForm'

export const metadata: Metadata = {
  title: '상담 신청 | 휴앤올',
  description: '전문 장례지도사와 24시간 무료 상담을 신청하세요. 평균 30분 이내 연락드립니다.',
}

export default function ConsultationPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-gradient-to-b from-[#F0F9F7] to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D7B6F]">
            Consultation
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">상담 신청</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            24시간 무료 상담 · 평균 30분 이내 연락 · 부담 없음
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* 좌측: 안내 */}
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">지금 바로 상담하세요</h2>
            <p className="text-[#666666] leading-relaxed mb-8">
              갑작스러운 상황이나 사전 준비 모두 도와드립니다.
              전문 장례지도사가 직접 연락하여 최적의 서비스를 안내해 드립니다.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                '이름과 연락처만 입력하면 끝',
                '평균 30분 이내 전담 지도사 연락',
                '24시간 365일 운영',
                '무료 상담 · 어떠한 부담도 없음',
                '개인정보 안전하게 보호',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[#444444]">
                  <span className="w-5 h-5 rounded-full bg-[#2D7B6F] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* 전화 직통 */}
            <div className="bg-[#F0F9F7] border border-[#D1EDE9] rounded-2xl p-6">
              <p className="text-sm font-semibold text-[#2D7B6F] mb-1">긴급한 경우 바로 전화주세요</p>
              <a
                href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                className="flex items-center gap-2 text-2xl font-black text-[#1A1A1A] hover:text-[#2D7B6F] transition-colors"
              >
                <Phone className="w-6 h-6 text-[#2D7B6F]" />
                {SITE_CONFIG.phone.primary}
              </a>
              <p className="text-xs text-[#999999] mt-1">24시간 운영 · 즉시 연결</p>
            </div>
          </div>

          {/* 우측: 폼 */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-8">
            <h3 className="text-lg font-bold text-[#1A1A1A] mb-6">30초 간편 상담 신청</h3>
            <QuickConsultForm />
          </div>
        </div>
      </section>
    </>
  )
}
