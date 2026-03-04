'use client'

import { useState, useEffect } from 'react'
import { Phone, MessageCircle } from 'lucide-react'
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
        'md:hidden fixed bottom-0 left-0 right-0 z-40',
        'grid grid-cols-2',
        'border-t-2 border-[#2D7B6F]',
        'transition-transform duration-500 ease-out',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* 24시간 긴급전화 */}
      <a
        href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
        aria-label={`긴급전화 ${SITE_CONFIG.phone.primary}`}
        className="relative flex items-center justify-center gap-2.5 bg-[#2D7B6F] active:bg-[#1E5C52] text-white py-4 overflow-hidden"
      >
        {/* 펄스 링 애니메이션 */}
        <span className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none">
          <span className="block w-10 h-10 rounded-full bg-white/15 animate-ping" />
        </span>

        <div className="relative z-10 flex items-center gap-2.5">
          <div className="relative flex-shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] leading-none mb-1 opacity-80">24시간 긴급전화</p>
            <p className="text-sm font-bold leading-none tracking-wide">
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
        className="flex items-center justify-center gap-2.5 bg-[#FEE500] active:bg-[#FDD800] text-[#1A1A1A] py-4"
      >
        <MessageCircle className="w-5 h-5 flex-shrink-0" />
        <div className="text-left">
          <p className="text-[11px] leading-none mb-1 opacity-60">
            {SITE_CONFIG.kakaoChannelUrl ? '채팅 상담' : '온라인 상담'}
          </p>
          <p className="text-sm font-bold leading-none">
            {SITE_CONFIG.kakaoChannelUrl ? '카카오 상담' : '상담 신청'}
          </p>
        </div>
      </a>
    </div>
  )
}
