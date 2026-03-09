import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ | 휴앤올',
  description: '휴앤올 장례서비스에 대해 자주 묻는 질문과 답변입니다.',
}

const FAQS = [
  {
    q: '후불제란 무엇인가요?',
    a: '장례 서비스를 먼저 진행한 후 발인 완료 시점에 비용을 정산하는 방식입니다. 갑작스러운 상황에서 미리 비용을 준비하지 않아도 최고의 서비스를 받으실 수 있습니다.',
  },
  {
    q: '24시간 언제든지 연락할 수 있나요?',
    a: '네, 365일 24시간 연락 가능합니다. 야간, 공휴일에도 동일한 서비스를 제공합니다. 긴급한 경우 전화로 연락주시면 즉시 연결됩니다.',
  },
  {
    q: '전담 장례지도사는 어떻게 배정되나요?',
    a: '상담 접수 후 담당 장례지도사가 배정됩니다. 한 분의 지도사가 접수부터 발인까지 전 과정을 동행합니다. 중간에 담당자가 바뀌는 일이 없습니다.',
  },
  {
    q: '비용은 어떻게 책정되나요?',
    a: '서비스 내용과 규모에 따라 달라집니다. 상담 시 상황을 설명해 주시면 맞춤형 견적을 안내해 드립니다. 숨겨진 추가 비용은 없으며, 사전에 모든 비용을 안내해 드립니다.',
  },
  {
    q: '어느 지역까지 서비스가 가능한가요?',
    a: '서울 및 수도권 전 지역에서 서비스가 가능합니다. 기타 지역도 상담 후 진행할 수 있으니 먼저 연락주시기 바랍니다.',
  },
  {
    q: '종교의례는 어떻게 진행되나요?',
    a: '기독교, 불교, 천주교 등 고인의 종교에 맞는 전담 지도사가 배정됩니다. 종교 단체와 협력 네트워크를 통해 의례를 진행합니다.',
  },
  {
    q: '화장장 예약은 대행해 주시나요?',
    a: '네, 화장장 예약부터 납골당·수목장 안치까지 모든 행정 절차를 대행해 드립니다. 유족분들이 행정 업무에 신경 쓰지 않도록 도와드립니다.',
  },
  {
    q: '상담 신청 후 얼마나 걸리나요?',
    a: '평균 30분 이내에 전담 장례지도사가 직접 연락드립니다. 긴급한 상황의 경우 즉시 출동도 가능합니다.',
  },
]

export default function FaqPage() {
  return (
    <>
      {/* 헤더 */}
      <section className="bg-gradient-to-b from-[#F4F8F7] to-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1A473F] bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm border border-[#1A473F]/10">
            FAQ
          </span>
          <h1 className="mt-2 text-3xl font-black text-[#1A1A1A] sm:text-4xl tracking-tight">자주 묻는 질문</h1>
          <p className="mt-4 text-base text-[#444444] font-medium sm:text-lg">
            서비스 이용에 관련해 궁금하셨던 점을 확인해 보세요
          </p>
        </div>
      </section>

      {/* FAQ 목록 */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="space-y-5">
          {FAQS.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-[#E6EFEF] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <summary className="flex items-center justify-between p-7 cursor-pointer list-none hover:bg-[#F4F8F7]/50 transition-colors">
                <span className="font-bold text-[#1A1A1A] pr-4 text-[15px] tracking-tight">
                  <span className="text-[#1A473F] font-black mr-2.5">Q.</span>
                  {faq.q}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAFAFA] border border-[#E6EFEF] flex items-center justify-center flex-shrink-0 group-open:bg-[#1A473F] group-open:border-[#1A473F] group-open:rotate-180 transition-all duration-300">
                  <span className="w-3 h-0.5 bg-[#444444] group-open:bg-white relative">
                    <span className="absolute w-3 h-0.5 bg-[#444444] group-open:bg-white inset-0 rotate-90 group-open:rotate-0 transition-transform duration-300"></span>
                  </span>
                </div>
              </summary>
              <div className="px-7 pb-7">
                <p className="text-[#444444] leading-relaxed text-[15px] font-medium border-t border-[#E6EFEF] pt-6 flex items-start">
                  <span className="text-[#1A473F] font-black mr-3 flex-shrink-0">A.</span>
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="mt-16 text-center bg-[#F4F8F7] rounded-[2rem] p-10 border border-[#E6EFEF] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/60 to-transparent rounded-bl-full -z-10" />
          <h2 className="text-xl font-black text-[#1A1A1A] mb-3 tracking-tight">원하는 답변을 찾지 못하셨나요?</h2>
          <p className="text-[#666666] text-[15px] font-medium mb-8">
            전문 장례지도사가 신속하고 정확하게 직접 답변해 드립니다.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-[#1A473F] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#12322C] transition-all shadow-[0_4px_10px_-2px_rgba(26,71,63,0.3)] hover:shadow-[0_6px_14px_-4px_rgba(26,71,63,0.4)]"
          >
            1:1 무료 상담 신청
          </Link>
        </div>
      </section>
    </>
  )
}
