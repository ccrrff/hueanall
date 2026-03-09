import type { Metadata } from 'next'
import { RiHeartLine as Heart, RiShieldCheckLine as Shield, RiTimeLine as Clock, RiTeamLine as Users } from '@remixicon/react'

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
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            About Us
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">회사소개</h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            가장 힘든 순간, 믿을 수 있는 전문가가 곁을 지킵니다
          </p>
        </div>
      </section>

      {/* 소개 본문 */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-6 tracking-tight">휴앤올을 소개합니다</h2>
          <p className="text-[#444444] leading-relaxed mb-6 text-base font-medium">
            휴앤올(休&All)은 고인의 마지막 길을 정성껏 함께하는 전문 장례서비스 회사입니다.
            &apos;편안히 쉬다(休)&apos;와 &apos;모든 것(All)&apos;을 책임진다는 의미를 담아, 고인께서는 평안히 쉬실 수 있도록 진심을 다하며,
            유족분들께서는 모든 절차를 온전히 맡기고 슬픔에만 집중하실 수 있도록 돕습니다.
          </p>
          <p className="text-[#444444] leading-relaxed mb-6 text-base font-medium">
            저희는 투명한 <strong>후불제 장례서비스</strong>를 원칙으로 하여,
            갑작스러운 이별 앞에서도 상조 거품과 비용 걱정 없이 최고의 대우를 받으실 수 있도록 안내합니다.
            국가공인 자격을 갖춘 장례지도사가 1:1 전담으로 배정되어 임종부터 발인, 장지 동행까지 한결같은 정성으로 가족처럼 함께합니다.
          </p>
        </div>

        {/* 핵심 가치 */}
        <div className="mt-16">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-8 text-center tracking-tight">핵심 가치</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex gap-5 p-7 bg-white rounded-2xl border border-[#E6EFEF] shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(26,71,63,0.1)] transition-shadow"
              >
                <div className="w-12 h-12 bg-[#F4F8F7] rounded-xl flex items-center justify-center flex-shrink-0">
                  <v.icon className="w-6 h-6 text-[#1A473F]" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#1A1A1A] mb-1.5">{v.title}</h3>
                  <p className="text-[#666666] text-[15px] font-medium leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 연혁 */}
        <div className="mt-20 mb-10">
          <h2 className="text-2xl font-black text-[#1A1A1A] mb-8 tracking-tight">연혁</h2>
          <div className="space-y-6">
            {[
              { year: '2024', event: '휴앤올 설립 · 프리미엄 후불제 장례서비스 론칭' },
              { year: '2024', event: '전담 장례지도사 1:1 배정 안심 시스템 구축' },
              { year: '2025', event: '24시간 365일 긴급 출동 상황실 오픈' },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-[#1A473F] font-black text-lg w-14 flex-shrink-0">
                  {item.year}
                </span>
                <p className="text-[#1A1A1A] text-[15px] font-semibold leading-relaxed border-l-2 border-[#E6EFEF] pl-5 pb-2">
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
