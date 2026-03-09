'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { RiMenuLine as Menu, RiPhoneLine as Phone, RiCloseLine as X } from '@remixicon/react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { NAV_ITEMS, SITE_CONFIG } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white transition-all duration-300',
        scrolled ? 'shadow-lg' : 'shadow-sm'
      )}
    >
      {/* 상단 공지 바 */}
      <div className="bg-[#1A473F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between text-[13px] font-medium">
          <span className="opacity-95 truncate">
            <span className="hidden sm:inline tracking-wide">전문 장례지도사가 처음부터 끝까지 함께합니다</span>
            <span className="sm:hidden font-semibold">24시간 장례 상담 대기중</span>
          </span>
          <a
            href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
            className="flex items-center gap-1.5 font-bold tracking-wider hover:opacity-80 transition-opacity flex-shrink-0 ml-3"
          >
            <Phone className="w-3.5 h-3.5" />
            {SITE_CONFIG.phone.primary}
          </a>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative w-10 h-10 bg-[#F4F8F7] transition-colors rounded-xl flex items-center justify-center overflow-hidden">
            <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain p-1" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#1A1A1A] leading-tight block">
              휴앤올
            </span>
            <span className="text-[11px] text-[#1A473F] font-bold leading-tight hidden sm:block tracking-widest uppercase">
              Premium Funeral
            </span>
          </div>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="주 네비게이션">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-5 py-3 text-[15px] font-bold transition-colors duration-200 rounded-full',
                  isActive
                    ? 'text-[#1A473F] bg-[#F4F8F7]'
                    : 'text-[#444444] hover:text-[#1A473F] hover:bg-[#F4F8F7]/50'
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 데스크톱 CTA */}
        <Button
          asChild
          className="hidden lg:flex bg-[#1A473F] hover:bg-[#12322C] text-white rounded-full px-6 h-11 text-[15px] font-bold shadow-[0_4px_10px_-2px_rgba(26,71,63,0.3)] hover:shadow-[0_6px_14px_-4px_rgba(26,71,63,0.4)] transition-all"
        >
          <Link href="/consultation">24시간 상담접수</Link>
        </Button>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11 text-[#1A1A1A]"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-[85vw] max-w-[340px] p-0 gap-0 bg-white rounded-l-3xl overflow-hidden shadow-2xl border-0">
            <SheetTitle className="sr-only">메뉴</SheetTitle>
            <div className="flex flex-col h-full">
              {/* 모바일 헤더 */}
              <div className="bg-[#1A473F] text-white p-5 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain p-1" />
                  </div>
                  <div>
                    <p className="font-black text-lg leading-tight tracking-tight">휴앤올</p>
                    <p className="text-[11px] font-bold text-white/80 tracking-widest uppercase mt-0.5">Premium Funeral</p>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 hover:text-white w-10 h-10 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* 전화번호 배너 */}
              <a
                href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                className="flex items-center gap-3 bg-[#F4F8F7] border-b border-[#E6EFEF] px-5 py-4 hover:bg-[#E6EFEF] transition-colors flex-shrink-0"
              >
                <div className="w-10 h-10 bg-[#1A473F] rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-[11px] text-[#1A473F] font-bold mb-0.5 tracking-wide">24시간 긴급 상담</p>
                  <p className="font-black tracking-tight text-[#1A1A1A] text-lg leading-tight">
                    {SITE_CONFIG.phone.primary}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1.5 bg-[#1A473F] text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3A9B8C] animate-pulse" />
                    상담중
                  </span>
                </div>
              </a>

              {/* 네비게이션 */}
              <nav className="flex-1 overflow-y-auto py-3 px-2" aria-label="모바일 네비게이션">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between px-4 py-4 my-1 text-[15px] font-bold rounded-xl transition-all',
                          isActive
                            ? 'text-[#1A473F] bg-[#F4F8F7]'
                            : 'text-[#444444] hover:text-[#1A473F] hover:bg-[#F4F8F7]'
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1A473F] flex-shrink-0" />
                        )}
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>

              {/* 하단 CTA */}
              <div className="p-5 border-t border-[#E5E7EB] bg-[#FAFAFA] flex-shrink-0">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-[#1A473F] hover:bg-[#12322C] text-white h-14 text-[15px] font-bold rounded-xl shadow-[0_4px_10px_-2px_rgba(26,71,63,0.3)] transition-all"
                  >
                    <Link href="/consultation">온라인 24시간 상담신청</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
