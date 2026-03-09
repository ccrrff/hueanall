import Link from 'next/link'
import Image from 'next/image'
import { RiPhoneLine as Phone, RiArrowDownSLine as ChevronDown } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAFAFA]"
    >
      {/* 프리미엄 배경 빛 번짐 효과 (Glow overlay) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(42,99,91,0.08),transparent_50%),radial-gradient(circle_at_80%_100%,rgba(26,71,63,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {/* 배지 */}
            <div className="inline-flex items-center gap-2.5 bg-white/60 backdrop-blur-md border border-[#1A473F]/10 text-[#1A473F] text-sm font-semibold px-5 py-2 rounded-full mb-8 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1A473F] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1A473F]"></span>
              </span>
              24시간 전문 장례지도사 대기 중
            </div>

            {/* 메인 헤드라인 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[1.15] mb-7 tracking-tight">
              가장 힘든 순간,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1A473F] to-[#2A635B]">믿을 수 있는 전문가</span>가<br />
              지켜드립니다
            </h1>

            {/* 서브 헤드라인 */}
            <p className="text-lg sm:text-xl text-[#444444] font-medium leading-relaxed mb-4 max-w-2xl mx-auto lg:mx-0">
              후불제 장례서비스 · 전담 장례지도사 1:1 배정 · 24시간 즉시 출동
            </p>
            <p className="text-base text-[#666666] mb-12">
              비용 부담감 없이, 처음부터 끝까지 한 분의 지도사가 동행합니다.
            </p>

            {/* CTA 버튼 */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start items-center mb-14">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-br from-[#1A473F] to-[#12322C] hover:from-[#12322C] hover:to-[#0A1A17] text-white h-14 px-8 text-base font-bold rounded-full shadow-[0_8px_20px_-6px_rgba(26,71,63,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(26,71,63,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto border border-white/10"
              >
                <a href="#quick-consult" className="flex items-center gap-2">
                  간편 상담 신청
                  <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm font-semibold tracking-wider">30초</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 text-base font-bold rounded-full border-2 border-[#E6EFEF] bg-white/50 backdrop-blur-md text-[#1A473F] hover:bg-white hover:border-[#1A473F] hover:shadow-lg transition-all w-full sm:w-auto"
              >
                <a href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F4F8F7] flex items-center justify-center">
                    <Phone className="w-4 h-4 fill-[#1A473F] text-[#1A473F]" />
                  </div>
                  <span className="tracking-wide">{SITE_CONFIG.phone.primary}</span>
                </a>
              </Button>
            </div>

            {/* 신뢰 지표 */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 sm:gap-12 text-center lg:text-left border-t border-[#E5E7EB]/60 pt-8">
              {[
                { value: '24h', label: '즉시 출동' },
                { value: '0원', label: '가입비/월납입' },
                { value: '1:1', label: '전담 지도사' },
                { value: '100%', label: '고객 만족도' },
              ].map((item) => (
                <div key={item.label} className="group">
                  <p className="text-2xl sm:text-3xl font-black tracking-tight text-[#1A473F] leading-none mb-1.5 group-hover:scale-105 transition-transform origin-left">
                    {item.value}
                  </p>
                  <p className="text-[13px] font-medium text-[#666666] tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/5">
            <Image src="/images/hero.png" alt="평온하고 따뜻한 위로" fill className="object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000 ease-out" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A473F]/20 to-transparent mix-blend-multiply" />
          </div>
        </div>
      </div>

      {/* 아래 스크롤 화살표 */}
      <a
        href="#quick-consult"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#999999] hover:text-[#1A473F] transition-colors group"
        aria-label="아래로 스크롤"
      >
        <span className="text-[11px] font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">내려보기</span>
        <ChevronDown className="w-5 h-5 animate-bounce opacity-70 group-hover:opacity-100" />
      </a>
    </section>
  )
}
