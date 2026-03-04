import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/constants'

export default function CtaSection() {
  return (
    <section id="cta" className="py-20 bg-[#2D7B6F]">
      <div className="max-w-4xl mx-auto px-4 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          지금 바로 상담 가능합니다
        </div>

        <h2 className="text-3xl sm:text-4xl font-black mb-4 leading-tight">
          지금 이 순간,<br />혼자 감당하지 마세요
        </h2>
        <p className="text-white/80 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          전문 장례지도사가 24시간 대기 중입니다.<br />
          후불제이기 때문에 비용 걱정 없이 연락주세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-white text-[#2D7B6F] hover:bg-[#F0F9F7] h-14 px-8 text-base font-bold rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            <a
              href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
              className="flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {SITE_CONFIG.phone.primary} 바로 전화
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white/50 text-white hover:bg-white/10 h-14 px-8 text-base font-bold rounded-full w-full sm:w-auto bg-transparent"
          >
            <Link href="/consultation" className="flex items-center gap-2">
              상담 신청서 작성
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
