'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, Phone, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'
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
      <div className="bg-[#2D7B6F] text-white">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <span className="hidden sm:block opacity-90 text-xs sm:text-sm">
            전문 장례지도사가 처음부터 끝까지 함께합니다
          </span>
          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:flex items-center gap-1.5 opacity-80 text-xs">
              <Phone className="w-3.5 h-3.5" />
              24시간 긴급 상담
            </span>
            <a
              href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
              className="font-bold tracking-wide text-sm hover:opacity-80 transition-opacity"
            >
              {SITE_CONFIG.phone.primary}
            </a>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="relative w-9 h-9 bg-white transition-colors rounded-lg flex items-center justify-center overflow-hidden">
            <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain" />
          </div>
          <div>
            <span className="text-xl font-black text-[#1A1A1A] leading-tight block">
              휴앤올
            </span>
            <span className="text-[10px] text-[#2D7B6F] font-medium leading-tight hidden sm:block tracking-wide">
              후불제 장례서비스
            </span>
          </div>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden lg:flex items-center" aria-label="주 네비게이션">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-3 text-base font-medium transition-colors duration-150',
                  'after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full',
                  'after:transition-all after:duration-200',
                  isActive
                    ? 'text-[#2D7B6F] after:bg-[#2D7B6F]'
                    : 'text-[#1A1A1A] hover:text-[#2D7B6F] after:bg-transparent hover:after:bg-[#3A9B8C]/50'
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
          className="hidden lg:flex bg-[#2D7B6F] hover:bg-[#1E5C52] text-white rounded-full px-5 font-bold shadow-md hover:shadow-lg transition-all"
        >
          <Link href="/consultation">24시간 상담신청</Link>
        </Button>

        {/* 모바일 햄버거 */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="w-11 h-11"
              aria-label="메뉴 열기"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] max-w-[320px] p-0">
            <div className="flex flex-col h-full">
              {/* 모바일 헤더 */}
              <div className="bg-[#2D7B6F] text-white p-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                    <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain" />
                  </div>
                  <div>
                    <p className="font-bold leading-tight">휴앤올</p>
                    <p className="text-[10px] opacity-80">후불제 장례서비스</p>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10 hover:text-white w-10 h-10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </SheetClose>
              </div>

              {/* 전화번호 배너 */}
              <a
                href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                className="flex items-center gap-3 bg-[#F0F9F7] border-b border-[#D1EDE9] px-4 py-3 hover:bg-[#D1EDE9] transition-colors flex-shrink-0"
              >
                <div className="w-9 h-9 bg-[#2D7B6F] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-[#2D7B6F] font-medium">24시간 긴급 상담</p>
                  <p className="font-bold text-[#1A1A1A] text-base leading-tight">
                    {SITE_CONFIG.phone.primary}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="inline-flex items-center gap-1 bg-[#2D7B6F] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    상담중
                  </span>
                </div>
              </a>

              {/* 네비게이션 */}
              <nav className="flex-1 overflow-y-auto py-2" aria-label="모바일 네비게이션">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between px-5 py-4 text-base font-medium',
                          'border-b border-[#F3F4F6] transition-colors min-h-[56px]',
                          isActive
                            ? 'text-[#2D7B6F] bg-[#F0F9F7]'
                            : 'text-[#1A1A1A] hover:text-[#2D7B6F] hover:bg-[#F0F9F7] active:bg-[#D1EDE9]'
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2D7B6F] flex-shrink-0" />
                        )}
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>

              {/* 하단 CTA */}
              <div className="p-4 border-t bg-[#F8F9FA] flex-shrink-0">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-[#2D7B6F] hover:bg-[#1E5C52] text-white h-12 text-base font-bold rounded-lg"
                  >
                    <Link href="/consultation">상담 신청하기</Link>
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
