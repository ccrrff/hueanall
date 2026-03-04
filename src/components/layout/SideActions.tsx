'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export default function SideActions() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 200)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <div className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col gap-3">
      {/* 전화 버튼 */}
      <div className="group relative flex items-center justify-end">
        {/* 툴팁 */}
        <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
          <div className="bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            24시간 전화상담
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#1A1A1A]" />
        </div>
        <a
          href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
          className="w-12 h-12 rounded-full bg-[#2D7B6F] hover:bg-[#1E5C52] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label={`전화 상담 ${SITE_CONFIG.phone.primary}`}
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* 카카오 버튼 */}
      <div className="group relative flex items-center justify-end">
        <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
          <div className="bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            카카오톡 상담
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#1A1A1A]" />
        </div>
        <a
          href={SITE_CONFIG.kakaoChannelUrl || '/consultation'}
          target={SITE_CONFIG.kakaoChannelUrl ? '_blank' : undefined}
          rel={SITE_CONFIG.kakaoChannelUrl ? 'noopener noreferrer' : undefined}
          className="w-12 h-12 rounded-full bg-[#FEE500] hover:bg-[#FDD800] text-[#1A1A1A] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="카카오톡 상담"
        >
          <MessageCircle className="w-5 h-5" />
        </a>
      </div>

      {/* 상단으로 버튼 */}
      <div
        className={cn(
          'group relative flex items-center justify-end transition-all duration-300',
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        )}
      >
        <div className="absolute right-14 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none translate-x-1 group-hover:translate-x-0">
          <div className="bg-[#1A1A1A] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
            맨 위로
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[-5px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[5px] border-l-[#1A1A1A]" />
        </div>
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-white hover:bg-[#F0F9F7] border-2 border-[#E5E7EB] hover:border-[#2D7B6F] text-[#666666] hover:text-[#2D7B6F] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="페이지 맨 위로 이동"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
