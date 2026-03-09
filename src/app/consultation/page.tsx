import type { Metadata } from 'next'
import { RiPhoneLine as Phone } from '@remixicon/react'
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
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            Consultation
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">상담 신청</h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            24시간 무료 상담 · 30분 이내 즉시 연락 · 거품 없는 후불제
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* 좌측: 안내 */}
          <div>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-5 tracking-tight">지금 바로 든든한 조력을 받으세요</h2>
            <p className="text-[#444444] text-[15px] font-medium leading-relaxed mb-10">
              사전 준비부터 갑작스러운 임종 순간까지 곁에서 도와드립니다.
              국가공인 장례지도사가 신속하게 연락드려 상속 절차와 최적의 서비스를 무료로 안내해 드립니다.
            </p>

            <ul className="space-y-5 mb-12 bg-white rounded-2xl border border-[#E6EFEF] p-6 shadow-sm">
              {[
                '이름, 연락처 기재만으로 간편한 접수',
                '접수 후 평균 30분 이내 전담 지도사 즉시 연락',
                '새벽에도 당황하지 마세요, 24시간 365일 상황실 가동',
                '모든 상담은 100% 무료 진행 (상품 가입 강요 없음)',
                '최고의 보안 환경에서 개인정보 안전 보호',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3.5 text-[#1A1A1A] font-semibold text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-[#1A473F]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="12" height="10" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#1A473F"
                        strokeWidth="2"
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
            <div className="bg-[#1A473F] border border-[#12322C] rounded-2xl p-7 text-white shadow-[0_10px_30px_-10px_rgba(26,71,63,0.3)]">
              <p className="text-sm font-bold text-white/80 mb-2 uppercase tracking-wide">긴급한 경우 바로 전화주세요</p>
              <a
                href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                className="inline-flex items-center gap-2.5 text-3xl font-black text-white hover:text-[#E6EFEF] transition-colors tracking-tight"
              >
                <Phone className="w-7 h-7" />
                {SITE_CONFIG.phone.primary}
              </a>
              <div className="flex items-center gap-2 mt-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3A9B8C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#3A9B8C]"></span>
                </span>
                <p className="text-sm font-semibold text-white/90">24시간 즉시 출동 대기중</p>
              </div>
            </div>
          </div>

          {/* 우측: 폼 */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-[#E6EFEF] p-8 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F4F8F7] to-transparent rounded-bl-full -z-10" />
            <h3 className="text-xl font-black text-[#1A1A1A] mb-7 tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1A473F]" />
              30초 간편 온라인 상담신청
            </h3>
            <QuickConsultForm />
          </div>
        </div>
      </section>
    </>
  )
}
