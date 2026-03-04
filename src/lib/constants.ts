export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '휴앤올',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://hueanall.com',
  phone: {
    primary: process.env.NEXT_PUBLIC_PHONE_PRIMARY || '1661-XXXX',
    secondary: process.env.NEXT_PUBLIC_PHONE_SECONDARY || '02-XXX-XXXX',
  },
  kakaoChannelUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || '',
  description: '전문 장례지도사가 함께하는 후불제 장례서비스. 24시간 상담 가능.',
  keywords: ['장례지도사', '후불제 상조', '기업상조', '휴앤올', '장례서비스', '24시간 장례상담'],
  address: '서울특별시 (주소 입력 예정)',
  email: 'info@hueanall.com',
  businessName: '주식회사 휴앤올',
  businessNumber: '000-00-00000',
}

export const NAV_ITEMS = [
  { label: '회사소개', href: '/about' },
  { label: '장례 서비스', href: '/services' },
  { label: '장례지도사', href: '/directors' },
  { label: '고객 후기', href: '/reviews' },
  { label: '상담 신청', href: '/consultation' },
  { label: 'FAQ', href: '/faq' },
  { label: '오시는 길', href: '/contact' },
] as const

export const ADMIN_NAV_ITEMS = [
  { label: '대시보드', href: '/admin' },
  { label: '장례지도사 관리', href: '/admin/directors' },
  { label: '상담 관리', href: '/admin/consultations' },
  { label: '후기 관리', href: '/admin/reviews' },
] as const
