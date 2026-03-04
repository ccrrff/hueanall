/**
 * 알림 서비스 (SMS / 카카오 알림톡)
 *
 * 현재 상태: Placeholder — 실제 SDK 미연동
 *
 * 권장 연동 옵션:
 *   - SMS:      CoolSMS (coolsms.co.kr) / 알리고 (aligo.in)
 *   - 알림톡:   카카오 비즈메시지 (i.kakao.com/bizMessage)
 *               또는 솔루션 업체 (NHN Cloud, 갤럭시아SMS 등)
 *
 * 연동 방법:
 *   1. 해당 SDK npm install
 *   2. .env.local에 API Key 추가
 *   3. 아래 Placeholder 함수 내부를 실제 SDK 호출로 교체
 */

export interface ConsultationNotificationPayload {
  consultationId: string
  directorId: string | null
  directorName: string | null
  directorPhone: string | null
  customerName: string
  customerPhone: string
  consultationType: string
  message: string | null
  receivedAt: string
}

/**
 * SMS 단문 발송 (Placeholder)
 * @param to   수신 전화번호 (예: '01012345678')
 * @param body 메시지 본문 (90byte 이내 단문)
 */
export async function sendSmsNotification(to: string, body: string): Promise<void> {
  // TODO: CoolSMS / Aligo SDK 연동
  // 예시: await coolsms.messages.sendOne({ to, from: process.env.SMS_SENDER!, text: body })
  console.log('[SMS Placeholder]', { to, body })
}

/**
 * 카카오 알림톡 발송 (Placeholder)
 * @param to           수신 전화번호
 * @param templateCode 카카오 비즈 템플릿 코드
 * @param variables    템플릿 변수
 */
export async function sendAlimtalkNotification(
  to: string,
  templateCode: string,
  variables: Record<string, string>
): Promise<void> {
  // TODO: 카카오 비즈메시지 SDK 연동
  // 예시: await kakaoClient.sendAlimtalk({ to, templateCode, variables })
  console.log('[Alimtalk Placeholder]', { to, templateCode, variables })
}

/**
 * 지정 상담 접수 시 해당 장례지도사에게 알림 발송
 * SMS + 알림톡 동시 발송 시도 (어느 하나 실패해도 계속 진행)
 */
export async function notifyDirectorConsultation(
  payload: ConsultationNotificationPayload
): Promise<void> {
  if (!payload.directorPhone) return

  const receivedAt = new Date(payload.receivedAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const smsBody = [
    '[휴앤올] 지정 상담 접수',
    `고객명: ${payload.customerName}`,
    `연락처: ${payload.customerPhone}`,
    `접수시각: ${receivedAt}`,
    payload.message ? `메시지: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  await Promise.allSettled([
    sendSmsNotification(payload.directorPhone, smsBody),
    sendAlimtalkNotification(payload.directorPhone, 'CONSULT_ASSIGNED', {
      director_name: payload.directorName ?? '',
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone,
      received_at: receivedAt,
      message: payload.message ?? '없음',
    }),
  ])
}
