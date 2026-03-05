import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: '개인정보처리방침 | 휴앤올',
  description: '휴앤올 개인정보처리방침',
}

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">개인정보처리방침</h1>
      <p className="text-sm text-[#999999] mb-10">최종 업데이트: 2025년 1월 1일</p>

      <div className="prose prose-gray max-w-none space-y-8 text-[#444444] text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">1. 개인정보 수집 및 이용 목적</h2>
          <p>
            {SITE_CONFIG.businessName}(이하 &quot;회사&quot;)는 다음의 목적을 위하여 개인정보를 처리합니다.
            처리된 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경되는 경우에는
            별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>장례서비스 상담 신청 접수 및 처리</li>
            <li>담당 장례지도사 배정 및 연락</li>
            <li>서비스 이용에 따른 본인확인</li>
            <li>민원사무 처리</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">2. 수집하는 개인정보 항목</h2>
          <p>회사는 다음의 개인정보 항목을 수집합니다.</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li><strong>필수항목:</strong> 성명, 연락처(전화번호)</li>
            <li><strong>선택항목:</strong> 상담 내용, 서비스 이용 내역</li>
            <li><strong>자동 수집:</strong> 접속 IP, 쿠키, 서비스 이용 기록</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">3. 개인정보의 보유 및 이용 기간</h2>
          <p>
            회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
            동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>상담 신청 정보: 상담 완료 후 3년</li>
            <li>계약 또는 청약 철회 기록: 5년 (전자상거래법)</li>
            <li>소비자 불만 또는 분쟁 처리 기록: 3년 (전자상거래법)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">4. 개인정보의 제3자 제공</h2>
          <p>
            회사는 정보주체의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 아래의 경우에는 예외로 합니다.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>정보주체가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">5. 정보주체의 권리</h2>
          <p>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리 정지 요구</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">6. 개인정보 보호책임자</h2>
          <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
            <p><strong>업체명:</strong> {SITE_CONFIG.businessName}</p>
            <p className="mt-1"><strong>이메일:</strong> {SITE_CONFIG.email}</p>
            <p className="mt-1"><strong>전화:</strong> {SITE_CONFIG.phone.primary}</p>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#1A1A1A] mb-3">7. 개인정보처리방침 변경</h2>
          <p>
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경 내용의 추가, 삭제 및
            정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>
      </div>
    </section>
  )
}
