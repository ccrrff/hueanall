import type { Metadata } from 'next'
import { RiPhoneLine as Phone, RiMailLine as Mail, RiMapPin2Line as MapPin, RiTimeLine as Clock } from '@remixicon/react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: '오시는 길 | 휴앤올',
  description: '휴앤올 연락처 및 오시는 길 안내입니다.',
}

export default function ContactPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            Contact
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">오시는 길</h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            24시간 365일 언제든지 편안하게 연락주세요
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 연락처 정보 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-[#1A1A1A] tracking-tight">연락처 정보</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#1A473F] to-[#12322C] rounded-2xl border border-[#12322C] shadow-sm group hover:shadow-[0_10px_30px_-10px_rgba(26,71,63,0.3)] transition-all">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#E6EFEF] mb-1.5 uppercase">대표번호 (24H)</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                      className="text-2xl font-black text-white hover:text-white/80 transition-colors tracking-tight"
                    >
                      {SITE_CONFIG.phone.primary}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E6EFEF] shadow-sm hover:border-[#1A473F]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F4F8F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#1A473F]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999999] mb-1.5 uppercase">사무실</p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.secondary.replace(/-/g, '')}`}
                    className="text-xl font-bold text-[#1A1A1A] hover:text-[#1A473F] transition-colors"
                  >
                    {SITE_CONFIG.phone.secondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E6EFEF] shadow-sm hover:border-[#1A473F]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F4F8F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#1A473F]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999999] mb-1.5 uppercase">이메일</p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-lg font-bold text-[#1A1A1A] hover:text-[#1A473F] transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E6EFEF] shadow-sm hover:border-[#1A473F]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F4F8F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#1A473F]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999999] mb-1.5 uppercase">주소</p>
                  <p className="text-[15px] font-semibold text-[#1A1A1A] leading-relaxed">{SITE_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-[#E6EFEF] shadow-sm hover:border-[#1A473F]/30 transition-colors">
                <div className="w-12 h-12 bg-[#F4F8F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#1A473F]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-[#999999] mb-1.5 uppercase">운영시간</p>
                  <p className="text-lg font-bold text-[#1A1A1A]">24시간 365일</p>
                  <p className="text-sm font-medium text-[#666666] mt-0.5">상황실 연중무휴 정상 운영</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 자리 */}
          <div>
            <h2 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tight">찾아오시는 길</h2>
            <div className="w-full h-80 bg-[#FAFAFA] rounded-[2rem] border border-[#E6EFEF] flex items-center justify-center relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F4F8F7] to-transparent rounded-bl-full opacity-50" />
              <div className="text-center relative z-10">
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm border border-[#E6EFEF]">
                  <MapPin className="w-8 h-8 text-[#1A473F]/50" />
                </div>
                <p className="text-[#1A1A1A] font-bold mb-1">지도 서비스 준비 중입니다</p>
                <p className="text-[#666666] text-sm font-medium">{SITE_CONFIG.address}</p>
              </div>
            </div>

            <div className="mt-8 p-7 bg-[#F4F8F7] rounded-[2rem] border border-[#E6EFEF]">
              <h3 className="font-black text-[#1A1A1A] mb-4 text-[15px] tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A473F]" />
                교통 안내
              </h3>
              <div className="space-y-3 text-[15px] text-[#444444] font-medium leading-relaxed">
                <p className="flex items-center gap-3"><span className="text-[#1A473F] font-black text-xs px-2 py-0.5 rounded-full bg-white border border-[#E6EFEF]">지하철</span> 추후 업데이트 예정</p>
                <p className="flex items-center gap-3"><span className="text-[#1A473F] font-black text-xs px-2 py-0.5 rounded-full bg-white border border-[#E6EFEF]">버 스</span> 추후 업데이트 예정</p>
                <p className="flex items-center gap-3"><span className="text-[#1A473F] font-black text-xs px-2 py-0.5 rounded-full bg-white border border-[#E6EFEF]">주 차</span> 추후 업데이트 예정</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
