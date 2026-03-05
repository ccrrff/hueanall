import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '장례 서비스 | 휴앤올',
  description: '휴앤올의 후불제 장례 서비스를 소개합니다. 전담 장례지도사가 처음부터 끝까지 함께합니다.',
}

const SERVICES = [
  {
    title: '기본 장례',
    badge: '가장 인기',
    desc: '합리적인 비용으로 정성껏 진행하는 기본 장례 패키지입니다.',
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
      <section className="bg-gradient-to-b from-[#F0F9F7] to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D7B6F]">
            Services
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">장례 서비스</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            모든 서비스는 후불제로 진행됩니다. 비용 걱정 없이 연락주세요.
          </p>
        </div>
      </section>

      {/* 서비스 카드 */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className={`rounded-2xl p-8 border ${
                service.highlight
                  ? 'bg-[#2D7B6F] text-white border-[#2D7B6F]'
                  : 'bg-white border-[#E5E7EB] hover:border-[#2D7B6F] hover:shadow-lg'
              } transition-all duration-300`}
            >
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 ${
                  service.highlight
                    ? 'bg-white/20 text-white'
                    : 'bg-[#F0F9F7] text-[#2D7B6F]'
                }`}
              >
                {service.badge}
              </span>
              <h2
                className={`text-xl font-bold mb-3 ${
                  service.highlight ? 'text-white' : 'text-[#1A1A1A]'
                }`}
              >
                {service.title}
              </h2>
              <p
                className={`text-sm leading-relaxed mb-6 ${
                  service.highlight ? 'text-white/80' : 'text-[#666666]'
                }`}
              >
                {service.desc}
              </p>
              <ul className="space-y-2.5">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <CheckCircle2
                      className={`w-4 h-4 flex-shrink-0 ${
                        service.highlight ? 'text-white/80' : 'text-[#2D7B6F]'
                      }`}
                    />
                    <span
                      className={`text-sm ${
                        service.highlight ? 'text-white/90' : 'text-[#444444]'
                      }`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
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
            className="inline-flex items-center gap-2 bg-[#2D7B6F] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#1E5C52] transition-colors shadow-lg"
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </>
  )
}
