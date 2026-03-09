import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { RiCheckboxCircleLine as CheckCircle2 } from '@remixicon/react'

export const metadata: Metadata = {
  title: '장례 서비스 | 휴앤올',
  description: '휴앤올의 후불제 장례 서비스를 소개합니다. 전담 장례지도사가 처음부터 끝까지 함께합니다.',
}

const SERVICES: {
  title: string
  badge: string
  desc: string
  image: string
  features: string[]
  highlight: boolean
}[] = [
    {
      title: '기본 장례',
      badge: '가장 인기',
      desc: '합리적인 비용으로 정성껏 진행하는 기본 장례 패키지입니다.',
      image: '/images/services/photo_service_basic.png',
      features: [
        '전담 장례지도사 1:1 배정',
        '염습 · 입관 전 과정 진행',
        '빈소 설치 및 운영',
        '발인 · 운구 서비스',
        '화장장 예약 대행',
      ],
      highlight: true,
    },
    {
      title: '종교의례 장례',
      badge: '기독교 · 불교 · 천주교',
      desc: '고인의 종교에 맞게 예를 갖춘 의례로 진행합니다.',
      image: '/images/services/photo_service_religion.png',
      features: [
        '종교별 의전 전문 지도사',
        '기독교 / 불교 / 천주교 맞춤 의례',
        '종교 단체 협력 네트워크',
        '납골당 · 수목장 안내',
        '유족 심리 상담 연계',
      ],
      highlight: false,
    },
    {
      title: '긴급 출동 서비스',
      badge: '24시간',
      desc: '갑작스러운 상황에 24시간 365일 즉시 출동합니다.',
      image: '/images/services/photo_service_emergency.png',
      features: [
        '접수 후 1시간 내 현장 도착',
        '병원 · 자택 어디서든 가능',
        '야간 · 공휴일 동일 서비스',
        '임시 안치실 연계',
        '행정 서류 대행',
      ],
      highlight: false,
    },
    {
      title: '기업 · 단체 장례',
      badge: '법인 계약 가능',
      desc: '기업 임직원 및 단체를 위한 맞춤 장례 서비스입니다.',
      image: '/images/services/photo_service_corporate.png',
      features: [
        '법인 후불제 계약',
        '임직원 복지 연계 가능',
        '대형 빈소 운영',
        '전용 장례지도사 배정',
        '사후 처리 행정 대행',
      ],
      highlight: false,
    },
  ]

export default function ServicesPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="relative py-28 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services/service_page_hero.png"
            alt="장례 서비스 배경"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white/90 backdrop-blur-[1px]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-5 py-2 rounded-full inline-block mb-6 shadow-sm border border-[#1A473F]/10">
            Premium Services
          </span>
          <h1 className="text-4xl font-black text-[#1A1A1A] sm:text-5xl tracking-tight mb-6">장례 서비스</h1>
          <p className="text-lg text-[#444444] sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            모든 서비스는 투명한 후불제로 진행됩니다.<br className="hidden sm:block" /> 비용 걱정 없이 오직 고인과의 이별에만 집중하세요.
          </p>
        </div>
      </section>

      {/* 서비스 카드 */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`flex flex-col rounded-[2rem] overflow-hidden border shadow-sm ${service.highlight
                ? 'bg-gradient-to-br from-[#1A473F] to-[#12322C] text-white border-[#12322C]'
                : 'bg-white border-[#E6EFEF] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]'
                } transition-all duration-500 group`}
            >
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-black">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className={`absolute inset-0 ${service.highlight ? 'bg-gradient-to-t from-[#1A473F]/60 to-transparent' : 'bg-gradient-to-t from-black/40 to-transparent'} opacity-60 group-hover:opacity-40 transition-opacity duration-500`} />
              </div>
              <div className="p-8 sm:p-10 flex-1 flex flex-col">
                <div>
                  <span
                    className={`text-[12px] font-bold px-3.5 py-1.5 rounded-full inline-block mb-5 shadow-sm tracking-wide ${service.highlight
                      ? 'bg-white/20 text-white backdrop-blur-md border border-white/10'
                      : 'bg-[#F4F8F7] text-[#1A473F] border border-[#E6EFEF]'
                      }`}
                  >
                    {service.badge}
                  </span>
                  <h2
                    className={`text-2xl sm:text-3xl font-black mb-4 tracking-tight ${service.highlight ? 'text-white' : 'text-[#1A1A1A]'
                      }`}
                  >
                    {service.title}
                  </h2>
                  <p
                    className={`text-base leading-relaxed mb-10 font-medium ${service.highlight ? 'text-white/80' : 'text-[#666666]'
                      }`}
                  >
                    {service.desc}
                  </p>
                </div>
                <ul className="space-y-4 mt-auto bg-black/5 rounded-2xl p-5 border border-black/5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3.5">
                      <CheckCircle2
                        className={`w-5 h-5 flex-shrink-0 ${service.highlight ? 'text-[#3A9B8C]' : 'text-[#1A473F]'
                          }`}
                      />
                      <span
                        className={`text-[15px] font-semibold tracking-wide ${service.highlight ? 'text-white/90' : 'text-[#444444]'
                          }`}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-14 text-center bg-[#F8F9FA] rounded-2xl p-10 border border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-3">어떤 서비스가 필요하신지 모르겠다면</h2>
          <p className="text-[#666666] mb-6">
            전문 장례지도사가 상황에 맞는 서비스를 안내해 드립니다. 24시간 무료 상담 가능합니다.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-[#1A473F] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#12322C] transition-colors shadow-lg"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </>
  )
}
