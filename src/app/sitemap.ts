import { MetadataRoute } from 'next'

const baseUrl = 'https://fastlineagency.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const routes = [
    '',
    '/plans',
    '/services/meta-ads-management',
    '/services/shopify-development',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.startsWith('/services') ? 0.9 : 0.8,
  }))

  return routes
}

