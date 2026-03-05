import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: '오시는 길 | 휴앤올',
  description: '휴앤올 연락처 및 오시는 길 안내입니다.',
}

export default function ContactPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-gradient-to-b from-[#F0F9F7] to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D7B6F]">
            Contact
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">오시는 길</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            24시간 365일 언제든지 연락주세요
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* 연락처 정보 */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A1A]">연락처 정보</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-[#F0F9F7] rounded-2xl border border-[#D1EDE9]">
                <div className="w-10 h-10 bg-[#2D7B6F] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] mb-1">대표번호 (24시간)</p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                    className="text-xl font-black text-[#1A1A1A] hover:text-[#2D7B6F] transition-colors"
                  >
                    {SITE_CONFIG.phone.primary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E5E7EB]">
                <div className="w-10 h-10 bg-[#F0F9F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#2D7B6F]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] mb-1">사무실</p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.secondary.replace(/-/g, '')}`}
                    className="text-lg font-bold text-[#1A1A1A] hover:text-[#2D7B6F] transition-colors"
                  >
                    {SITE_CONFIG.phone.secondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E5E7EB]">
                <div className="w-10 h-10 bg-[#F0F9F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#2D7B6F]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] mb-1">이메일</p>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-base font-semibold text-[#1A1A1A] hover:text-[#2D7B6F] transition-colors"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E5E7EB]">
                <div className="w-10 h-10 bg-[#F0F9F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#2D7B6F]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] mb-1">주소</p>
                  <p className="text-base font-semibold text-[#1A1A1A]">{SITE_CONFIG.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-[#E5E7EB]">
                <div className="w-10 h-10 bg-[#F0F9F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#2D7B6F]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] mb-1">운영시간</p>
                  <p className="text-base font-semibold text-[#1A1A1A]">24시간 365일</p>
                  <p className="text-xs text-[#999999]">연중무휴 운영</p>
                </div>
              </div>
            </div>
          </div>

          {/* 지도 자리 */}
          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-6">찾아오시는 길</h2>
            <div className="w-full h-72 bg-[#F3F4F6] rounded-2xl border border-[#E5E7EB] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-[#2D7B6F] mx-auto mb-2" />
                <p className="text-[#666666] text-sm">지도 준비 중입니다</p>
                <p className="text-[#999999] text-xs mt-1">{SITE_CONFIG.address}</p>
              </div>
            </div>

            <div className="mt-6 p-5 bg-[#F8F9FA] rounded-2xl border border-[#E5E7EB]">
              <h3 className="font-bold text-[#1A1A1A] mb-3 text-sm">교통 안내</h3>
              <div className="space-y-2 text-sm text-[#666666]">
                <p>· 지하철: 추후 안내 예정</p>
                <p>· 버스: 추후 안내 예정</p>
                <p>· 주차: 추후 안내 예정</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
