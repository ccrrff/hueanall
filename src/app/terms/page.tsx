import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: '이용약관 | 휴앤올',
  description: '휴앤올 서비스 이용약관',
}

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">이용약관</h1>
      <p className="text-sm text-[#999999] mb-10">최종 업데이트: 2025년 1월 1일</p>

      <div className="space-y-8 text-[#444444] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제1조 (목적)</h2>
          <p>
            이 약관은 {SITE_CONFIG.businessName}(이하 &quot;회사&quot;)이 제공하는 장례서비스 및 관련 서비스의
            이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제2조 (정의)</h2>
          <ul className="space-y-2">
            <li>① &quot;서비스&quot;란 회사가 제공하는 장례 관련 상담, 장례 진행, 사후 처리 등 모든 서비스를 말합니다.</li>
            <li>② &quot;이용자&quot;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
            <li>③ &quot;후불제&quot;란 서비스 완료 후 비용을 정산하는 방식을 말합니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제3조 (약관의 효력 및 변경)</h2>
          <ul className="space-y-2">
            <li>① 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</li>
            <li>② 회사는 합리적인 사유가 발생할 경우 이 약관을 변경할 수 있으며, 변경된 약관은 공지사항을 통해 고지합니다.</li>
            <li>③ 이용자가 변경된 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 계약을 해지할 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제4조 (서비스의 제공)</h2>
          <ul className="space-y-2">
            <li>① 회사는 24시간 365일 장례서비스 상담을 제공합니다.</li>
            <li>② 회사는 후불제 방식으로 서비스를 제공하며, 서비스 완료 후 비용을 청구합니다.</li>
            <li>③ 서비스 범위 및 비용은 상담을 통해 사전에 고지됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제5조 (이용자의 의무)</h2>
          <ul className="space-y-2">
            <li>① 이용자는 서비스 신청 시 정확한 정보를 제공해야 합니다.</li>
            <li>② 이용자는 서비스 완료 후 약정된 비용을 지급해야 합니다.</li>
            <li>③ 이용자는 회사의 직원 및 장례지도사에게 폭언, 욕설, 성희롱 등의 행위를 해서는 안 됩니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제6조 (책임 제한)</h2>
          <ul className="space-y-2">
            <li>① 회사는 천재지변, 전쟁, 기간통신사업자의 서비스 중단 등 불가항력적 사유로 인한 서비스 제공 불가 시 책임이 면제됩니다.</li>
            <li>② 이용자의 귀책사유로 인한 서비스 이용 장애에 대해서는 회사가 책임을 지지 않습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">제7조 (분쟁 해결)</h2>
          <p>
            이 약관과 관련하여 분쟁이 발생한 경우, 회사와 이용자는 분쟁 해결을 위해 성실히 협의합니다.
            협의가 이루어지지 않을 경우, 관련 법령에 따라 해결합니다.
          </p>
        </section>

        <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
          <p className="text-xs text-[#666666]">
            문의사항: {SITE_CONFIG.email} / {SITE_CONFIG.phone.primary}
          </p>
        </div>
      </div>
    </section>
  )
}
