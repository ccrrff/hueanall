import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

const placeholderDirectors = [
  { id: '1', name: '김○○', title: '수석 장례지도사', years: 15, specialties: ['임종케어', '화장절차', '가족상담'], imgUrl: '/images/director_1.png' },
  { id: '2', name: '이○○', title: '장례지도사', years: 10, specialties: ['종교의례', '납골안치', '유족지원'], imgUrl: '/images/director_2.png' },
  { id: '3', name: '박○○', title: '장례지도사', years: 8, specialties: ['기업장례', '해외교포', '긴급출동'], imgUrl: '/images/director_3.png' },
]

export default function DirectorsPreview() {
  return (
    <section id="directors" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#2D7B6F] font-semibold text-sm uppercase tracking-widest mb-3">Our Directors</p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-4">전문 장례지도사 소개</h2>
          <p className="text-[#666666] text-lg max-w-xl mx-auto leading-relaxed">
            풍부한 경험과 따뜻한 마음으로 함께하는 전문가들입니다
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {placeholderDirectors.map((director) => (
            <div
              key={director.id}
              className="bg-white rounded-2xl p-6 border border-[#E5E7EB] hover:border-[#2D7B6F] hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 bg-[#2D7B6F] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden relative">
                <Image src={director.imgUrl} alt={director.name} fill className="object-cover object-top" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-1">{director.name}</h3>
              <p className="text-[#2D7B6F] font-medium text-sm mb-3">{director.title}</p>
              <div className="flex items-center justify-center gap-1.5 text-[#666666] text-sm mb-4">
                <Award className="w-4 h-4 text-[#2D7B6F]" />
                경력 {director.years}년
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {director.specialties.map((s) => (
                  <span key={s} className="bg-[#F0F9F7] text-[#2D7B6F] text-xs px-2.5 py-1 rounded-full font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-[#2D7B6F] text-[#2D7B6F] hover:bg-[#F0F9F7] rounded-full px-8">
            <Link href="/directors" className="flex items-center gap-2">
              전체 장례지도사 보기
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
