import type { Metadata } from 'next'
import { Heart, Shield, Clock, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: '회사소개 | 휴앤올',
  description: '휴앤올은 전문 장례지도사가 처음부터 끝까지 함께하는 후불제 장례서비스를 제공합니다.',
}

const VALUES = [
  {
    icon: Heart,
    title: '진심',
    desc: '고인과 유족을 향한 진심 어린 마음으로 마지막 길을 함께합니다.',
  },
  {
    icon: Shield,
    title: '신뢰',
    desc: '후불제 운영으로 비용 걱정 없이 믿고 맡길 수 있습니다.',
  },
  {
    icon: Clock,
    title: '24시간',
    desc: '365일 24시간 언제든지 즉시 출동하여 곁에 있겠습니다.',
  },
  {
    icon: Users,
    title: '전문성',
    desc: '국가공인 장례지도사 자격을 갖춘 전문가가 전담 배정됩니다.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-gradient-to-b from-[#F0F9F7] to-white py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#2D7B6F]">
            About Us
          </span>
          <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">회사소개</h1>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            힘든 순간, 믿을 수 있는 전문가가 함께합니다
          </p>
        </div>
      </section>

      {/* 소개 본문 */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">휴앤올을 소개합니다</h2>
          <p className="text-[#444444] leading-relaxed mb-6 text-base">
            휴앤올(休&All)은 가장 힘든 순간에 고인의 마지막 길을 정성껏 함께하는 전문 장례서비스 회사입니다.
            &apos;쉬다(休)&apos;와 &apos;전부(All)&apos;를 담아, 고인은 편안히 쉬실 수 있도록,
            유족분들은 모든 것을 맡기고 슬픔에 집중하실 수 있도록 최선을 다합니다.
          </p>
          <p className="text-[#444444] leading-relaxed mb-6 text-base">
            저희는 업계 최초로 <strong>후불제 장례서비스</strong>를 도입하여,
            갑작스러운 상황에서도 비용 걱정 없이 최고의 서비스를 받으실 수 있도록 합니다.
            국가공인 장례지도사 자격을 갖춘 전문가가 1:1로 전담 배정되어
            접수부터 발인까지 한 분의 지도사가 함께합니다.
          </p>
        </div>

        {/* 핵심 가치 */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 text-center">핵심 가치</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-4 p-6 bg-[#F8F9FA] rounded-2xl border border-[#E5E7EB]"
              >
                <div className="w-12 h-12 bg-[#2D7B6F] rounded-xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">{v.title}</h3>
                  <p className="text-[#666666] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 연혁 */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">연혁</h2>
          <div className="space-y-4">
            {[
              { year: '2024', event: '휴앤올 설립 · 후불제 장례서비스 론칭' },
              { year: '2024', event: '전담 장례지도사 1:1 배정 시스템 구축' },
              { year: '2025', event: '24시간 긴급 출동 서비스 시작' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[#2D7B6F] font-bold text-sm w-12 flex-shrink-0 pt-0.5">
                  {item.year}
                </span>
                <p className="text-[#444444] text-sm leading-relaxed border-l-2 border-[#D1EDE9] pl-4">
                  {item.event}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
