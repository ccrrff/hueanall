import Link from 'next/link'
import { Heart, Building2, Clock, Shield } from 'lucide-react'

const services = [
  {
    icon: Heart,
    title: '후불제 장례서비스',
    description: '장례 완료 후 비용 정산. 급한 상황에서도 비용 걱정 없이 최고의 서비스를 받으실 수 있습니다.',
    href: '/services',
  },
  {
    icon: Building2,
    title: '기업/단체 상조',
    description: '기업 임직원 및 단체 회원을 위한 맞춤형 상조 서비스. 합리적인 비용으로 품격 있는 장례를.',
    href: '/services',
  },
  {
    icon: Clock,
    title: '24시간 즉시 출동',
    description: '365일 24시간 언제라도 전문 장례지도사가 현장으로 달려갑니다. 혼자 감당하지 않으셔도 됩니다.',
    href: '/services',
  },
  {
    icon: Shield,
    title: '전담 지도사 배정',
    description: '한 분의 전담 장례지도사가 입관부터 발인까지 처음부터 끝까지 책임지고 함께합니다.',
    href: '/services',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2D7B6F] font-semibold text-sm uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">휴앤올의 장례서비스</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto leading-relaxed">
            어렵고 낯선 상황에서 모든 것을 도와드립니다
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group flex flex-col p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#2D7B6F] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#F0F9F7] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#2D7B6F]" />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 leading-tight">{service.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed flex-1">{service.description}</p>
                <div className="mt-4 text-[#2D7B6F] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  자세히 보기 →
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
