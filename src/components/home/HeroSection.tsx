import Link from 'next/link'
import Image from 'next/image'
import { Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#F0F9F7] via-white to-[#F0F9F7]"
    >
      {/* 배경 장식 원 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D7B6F]/5 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2D7B6F]/5 rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2 bg-[#2D7B6F]/10 text-[#2D7B6F] text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#2D7B6F] animate-pulse" />
              24시간 전문 장례지도사 상담 중
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-tight mb-6">
              힘든 순간,<br />
              <span className="text-[#2D7B6F]">믿을 수 있는 전문가</span>가<br />
              함께합니다
            </h1>

            {/* 서브 헤드라인 */}
            <p className="text-lg sm:text-xl text-[#666666] leading-relaxed mb-4 max-w-2xl mx-auto lg:mx-0">
              후불제 장례서비스 · 전담 장례지도사 배정 · 24시간 즉시 출동
            </p>
            <p className="text-base text-[#999999] mb-10">
              비용 걱정 없이, 처음부터 끝까지 한 분의 지도사가 함께합니다
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-[#2D7B6F] hover:bg-[#1E5C52] text-white h-14 px-8 text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                <a href="#quick-consult" className="flex items-center gap-2">
                  간편 상담 신청
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">30초</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-bold rounded-full border-2 border-[#2D7B6F] text-[#2D7B6F] hover:bg-[#F0F9F7] w-full sm:w-auto"
              >
                <a href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`} className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  {SITE_CONFIG.phone.primary}
                </a>
              </Button>
            </div>

            {/* 신뢰 지표 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 text-center lg:text-left">
              {[
                { value: '24시간', label: '즉시 상담' },
                { value: '후불제', label: '비용 부담 없음' },
                { value: '전담', label: '1:1 장례지도사' },
                { value: '100%', label: '고객 만족' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl sm:text-3xl font-black text-[#2D7B6F] leading-none mb-1">
                    {item.value}
                  </p>
                  <p className="text-sm text-[#666666]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/images/hero.png" alt="평온하고 따뜻한 위로" fill className="object-cover object-center" priority />
          </div>
        </div>
      </div>

      {/* 아래 스크롤 화살표 */}
      <a
        href="#quick-consult"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#999999] hover:text-[#2D7B6F] transition-colors"
        aria-label="아래로 스크롤"
      >
        <span className="text-xs">상담 신청</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  )
}
