import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingCta from '@/components/layout/FloatingCta'
import SideActions from '@/components/layout/SideActions'
import { Toaster } from '@/components/ui/sonner'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
  preload: false,
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hueanall.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '휴앤올 | 장례지도사가 함께하는 후불제 장례서비스',
    template: '%s | 휴앤올',
  },
  description:
    '전문 장례지도사가 함께하는 후불제 장례서비스. 24시간 상담 가능. 직접 운영 장례지도사가 처음부터 끝까지 함께합니다.',
  keywords: [
    '장례지도사',
    '후불제 상조',
    '기업상조',
    '휴앤올',
    '장례서비스',
    '24시간 장례상담',
    '장례식',
    '상조서비스',
  ],
  authors: [{ name: '휴앤올' }],
  creator: '휴앤올',
  publisher: '휴앤올',
  openGraph: {
    locale: 'ko_KR',
    type: 'website',
    siteName: '휴앤올',
    url: siteUrl,
    title: '휴앤올 | 장례지도사가 함께하는 후불제 장례서비스',
    description: '전문 장례지도사가 함께하는 후불제 장례서비스. 24시간 상담 가능.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '휴앤올 - 장례지도사가 함께하는 후불제 장례서비스',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '휴앤올 | 장례지도사가 함께하는 후불제 장례서비스',
    description: '전문 장례지도사가 함께하는 후불제 장례서비스. 24시간 상담 가능.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      'naver-site-verification': [process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || ''],
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FuneralHome',
  name: '휴앤올',
  alternateName: 'Hueanall',
  url: siteUrl,
  telephone: process.env.NEXT_PUBLIC_PHONE_PRIMARY || '1661-XXXX',
  description: '전문 장례지도사가 함께하는 후불제 장례서비스. 24시간 상담 가능.',
  openingHours: 'Mo-Su 00:00-24:00',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
  priceRange: '$$',
  areaServed: {
    '@type': 'Country',
    name: '대한민국',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={notoSansKR.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SideActions />
        <FloatingCta />
        <Toaster />
      </body>
    </html>
  )
}
