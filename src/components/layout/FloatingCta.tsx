'use client'

import { useState, useEffect } from 'react'
import { RiPhoneLine as Phone, RiMessage3Line as MessageCircle } from '@remixicon/react'
import { cn } from '@/lib/utils'
import { SITE_CONFIG } from '@/lib/constants'

export default function FloatingCta() {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) return null

  return (
    <div
      role="complementary"
      aria-label="긴급 상담 버튼"
      className={cn(
        'md:hidden fixed bottom-5 left-4 right-4 z-40',
        'grid grid-cols-2',
        'rounded-2xl overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.25)] border border-[#1A473F]/20 backdrop-blur-md',
        'transition-transform duration-500 ease-out',
        visible ? 'translate-y-0 scale-100' : 'translate-y-full scale-95 opacity-0'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* 24시간 긴급전화 */}
      <a
        href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
        aria-label={`긴급전화 ${SITE_CONFIG.phone.primary}`}
        className="relative flex items-center justify-center gap-2.5 bg-[#1A473F] active:bg-[#12322C] text-white py-4.5 overflow-hidden transition-colors"
      >
        {/* 펄스 링 애니메이션 */}
        <span className="absolute left-[20%] top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
          <span className="block w-12 h-12 rounded-full bg-white/20 animate-ping" />
        </span>

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <Phone className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-widest leading-none mb-1 opacity-80 font-bold">24H Emergency</p>
            <p className="text-[15px] font-black leading-none tracking-tight">
              {SITE_CONFIG.phone.primary}
            </p>
          </div>
        </div>
      </a>

      {/* 카카오 상담 / 온라인 상담 */}
      <a
        href={SITE_CONFIG.kakaoChannelUrl || '/consultation'}
        target={SITE_CONFIG.kakaoChannelUrl ? '_blank' : undefined}
        rel={SITE_CONFIG.kakaoChannelUrl ? 'noopener noreferrer' : undefined}
        aria-label={SITE_CONFIG.kakaoChannelUrl ? '카카오톡 상담 신청' : '온라인 상담 신청'}
        className="flex items-center justify-center gap-3 bg-[#FCDA00] hover:bg-[#F5D500] active:bg-[#EBCB00] text-[#1A1A1A] py-4.5 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] font-bold tracking-wide leading-none mb-1 opacity-70">
            {SITE_CONFIG.kakaoChannelUrl ? '채팅 상담' : '온라인 상담'}
          </p>
          <p className="text-[15px] font-black leading-none tracking-tight">
            {SITE_CONFIG.kakaoChannelUrl ? '카카오 상담' : '상담 접수'}
          </p>
        </div>
      </a>
    </div>
  )
}
