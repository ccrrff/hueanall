import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hueanall.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { url: siteUrl, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/directors`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/reviews`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${siteUrl}/consultation`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/faq`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${siteUrl}/contact`, priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  return staticRoutes.map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
