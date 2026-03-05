import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer>
      {/* 상단 푸터 */}
      <div style={{ backgroundColor: '#53555A' }} className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 회사 정보 */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                  <Image src="/images/logo.png" alt="휴앤올 로고" fill className="object-contain" />
                </div>
                <span className="text-lg font-bold">휴앤올</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed mb-4">
                전문 장례지도사가 함께하는<br />
                후불제 장례서비스
              </p>
              <p className="text-sm text-white/70">{SITE_CONFIG.businessName}</p>
              <p className="text-sm text-white/70">사업자등록번호: {SITE_CONFIG.businessNumber}</p>
            </div>

            {/* 연락처 */}
            <div>
              <h3 className="font-bold text-base mb-4">연락처</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-[#3A9B8C] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/60">대표번호 (24시간)</p>
                    <a
                      href={`tel:${SITE_CONFIG.phone.primary.replace(/-/g, '')}`}
                      className="text-white font-bold hover:text-[#3A9B8C] transition-colors"
                    >
                      {SITE_CONFIG.phone.primary}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 mt-0.5 text-[#3A9B8C] flex-shrink-0" />
                  <div>
                    <p className="text-xs text-white/60">사무실</p>
                    <a
                      href={`tel:${SITE_CONFIG.phone.secondary.replace(/-/g, '')}`}
                      className="text-white hover:text-[#3A9B8C] transition-colors"
                    >
                      {SITE_CONFIG.phone.secondary}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 mt-0.5 text-[#3A9B8C] flex-shrink-0" />
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#3A9B8C] flex-shrink-0" />
                  <p className="text-white/80 text-sm">{SITE_CONFIG.address}</p>
                </div>
              </div>
            </div>

            {/* 바로가기 + 카카오톡 */}
            <div>
              <h3 className="font-bold text-base mb-4">바로가기</h3>
              <nav className="grid grid-cols-2 gap-1 mb-6">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white transition-colors py-1"
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
                  className="inline-flex items-center gap-2 bg-[#FEE500] text-[#1A1A1A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#FDD800] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  카카오톡 상담
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 바 */}
      <div style={{ backgroundColor: '#141414' }} className="text-white/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white transition-colors">
              개인정보처리방침
            </Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              이용약관
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
