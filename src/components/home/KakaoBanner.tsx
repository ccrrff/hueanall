import { RiMessage3Line as MessageCircle, RiArrowRightLine as ArrowRight } from '@remixicon/react'
import { SITE_CONFIG } from '@/lib/constants'

export default function KakaoBanner() {
  return (
    <section id="kakao" className="py-20 bg-[#FCDA00]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* 좌측: 텍스트 */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-4">
              <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-sm">
                <MessageCircle className="w-5 h-5 text-[#FCDA00]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#1A1A1A]">언제든 열려있는 카카오톡 상담</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-3 tracking-tight">
              편하게 메시지로 물어보세요
            </h2>
            <p className="text-[#3D3D3D] text-lg font-medium leading-relaxed">
              전화가 부담스러우시다면 카카오톡으로 편하게 문의하세요.<br className="hidden sm:block" />
              전문 장례지도사가 24시간 언제든지 상세하게 답변드립니다.
            </p>
          </div>

          {/* 우측: 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={SITE_CONFIG.kakaoChannelUrl || '/consultation'}
              target={SITE_CONFIG.kakaoChannelUrl ? '_blank' : undefined}
              rel={SITE_CONFIG.kakaoChannelUrl ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-center gap-3 bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#FCDA00] px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_12px_24px_-8px_rgba(26,26,26,0.6)] hover:-translate-y-0.5 active:scale-95 min-w-[240px]"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="tracking-wide">카카오채널 상담하기</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 특징 */}
        <div className="mt-12 pt-10 border-t border-[#1A1A1A]/10 grid grid-cols-3 gap-6 text-center">
          {[
            { value: '무료', label: '상담 비용' },
            { value: '24시간', label: '운영' },
            { value: '즉시', label: '답변' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xl font-black text-[#1A1A1A]">{item.value}</p>
              <p className="text-sm text-[#3D3D3D]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
