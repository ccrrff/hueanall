import Link from 'next/link'
import Image from 'next/image'
import { RiPhoneLine as Phone, RiMailLine as Mail, RiMapPin2Line as MapPin, RiMessage3Line as MessageCircle } from '@remixicon/react'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* 상단 푸터 */}
      <div className="bg-[#2B2E33] text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* 회사 정보 */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="relative w-9 h-9 bg-[#F4F8F7] rounded-xl flex items-center justify-center overflow-hidden">
                  <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain p-1" />
                </div>
                <span className="text-xl font-black tracking-tight">휴앤올</span>
              </div>
              <p className="text-[13px] text-white/60 leading-relaxed gap-1 tracking-wide uppercase font-bold mb-3">
                Premium Funeral Service
              </p>
              <div className="space-y-1.5 text-sm text-white/50">
                <p className="font-medium text-white/70">{SITE_CONFIG.businessName}</p>
                <p>사업자등록번호: {SITE_CONFIG.businessNumber}</p>
              </div>
            </div>

            {/* 연락처 */}
            <div>
              <h3 className="font-bold text-base mb-5 text-white/90">Customer Center</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#2A635B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-white/40 mb-0.5">대표번호 (24시간 즉시출동)</p>
                    <a
                      href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                      className="text-white font-black text-lg hover:text-[#2A635B] transition-colors tracking-tight"
                    >
                      {SITE_CONFIG.phone.primary}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-[#2A635B]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-wider text-white/40 mb-0.5">사무실</p>
                    <a
                      href={`tel:${SITE_CONFIG.phone.secondary.replace(/-/g, '')}`}
                      className="text-white/80 font-medium hover:text-[#2A635B] transition-colors"
                    >
                      {SITE_CONFIG.phone.secondary}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#2A635B]" />
                  </div>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2A635B]" />
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{SITE_CONFIG.address}</p>
                </div>
              </div>
            </div>

            {/* 바로가기 + 카카오톡 */}
            <div>
              <h3 className="font-bold text-base mb-5 text-white/90">Quick Links</h3>
              <nav className="grid grid-cols-2 gap-y-3 gap-x-2 mb-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[13px] font-medium text-white/50 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {SITE_CONFIG.kakaoChannelUrl && (
                <a
                  href={SITE_CONFIG.kakaoChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#FCDA00]/10 border border-[#FCDA00]/20 text-[#FCDA00] px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#FCDA00] hover:text-[#1A1A1A] transition-all w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  카카오톡 1:1 상담
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div className="bg-[#0F1113] text-white/40">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              개인정보처리방침
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
