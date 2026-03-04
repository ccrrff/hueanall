import { MessageCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function KakaoBanner() {
  return (
    <section id="kakao" className="py-16 bg-[#FEE500]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* 좌측: 텍스트 */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <MessageCircle className="w-7 h-7 text-[#1A1A1A]" />
              <span className="text-lg font-bold text-[#1A1A1A]">카카오톡 상담</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A1A1A] mb-2">
              편하게 메시지로 물어보세요
            </h2>
            <p className="text-[#3D3D3D] text-base leading-relaxed">
              전화가 어려우시다면 카카오톡으로 편하게 문의하세요.<br className="hidden sm:block" />
              24시간 언제든지 빠르게 답변드립니다.
            </p>
          </div>

          {/* 우측: 버튼 */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto flex-shrink-0">
            <a
              href={SITE_CONFIG.kakaoChannelUrl || '/consultation'}
              target={SITE_CONFIG.kakaoChannelUrl ? '_blank' : undefined}
              rel={SITE_CONFIG.kakaoChannelUrl ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-center gap-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:shadow-lg active:scale-95 min-w-[200px]"
            >
              <MessageCircle className="w-5 h-5" />
              카카오톡으로 상담하기
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 특징 */}
        <div className="mt-8 pt-8 border-t border-[#F5D500] grid grid-cols-3 gap-4 text-center">
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
