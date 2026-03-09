import Link from 'next/link'
import { RiPhoneLine as Phone, RiArrowRightLine as ArrowRight } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section id="cta" className="relative py-24 overflow-hidden bg-gradient-to-br from-[#1A473F] via-[#12322C] to-[#0A1A17]">
      {/* 장식용 빛(Glow) 효과 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-[radial-gradient(ellipse_at_top,rgba(42,99,91,0.3),transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 text-center text-white z-10">
        <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-sm font-semibold px-5 py-2.5 rounded-full mb-8 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          지금 바로 상담 가능합니다
        </div>

        <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-[1.15] tracking-tight">
          가장 힘든 순간,<br />혼자 감당하지 마세요
        </h2>
        <p className="text-white/80 text-lg sm:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          전문 장례지도사가 24시간 대기 중입니다.<br />
          후불제이므로 비용 부담 없이 언제든 연락주세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#1A473F] hover:bg-[#F4F8F7] h-14 px-10 text-lg font-bold rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto"
          >
            <a
              href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
              className="flex items-center gap-2.5 tracking-wide"
            >
              <Phone className="w-5 h-5 fill-[#1A473F]" />
              {SITE_CONFIG.phone.primary} 바로 전화
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40 h-14 px-10 text-lg font-bold rounded-2xl w-full sm:w-auto bg-white/5 backdrop-blur-sm transition-all"
          >
            <Link href="/consultation" className="flex items-center gap-2 tracking-wide">
              간편 상담 신청하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-white/60 text-sm">
          대표번호 <span className="text-white font-bold">{SITE_CONFIG.phone.primary}</span> ·{' '}
          사무실 <span className="text-white/80 font-medium">{SITE_CONFIG.phone.secondary}</span>
        </p>
      </div>
    </section>
  )
}
