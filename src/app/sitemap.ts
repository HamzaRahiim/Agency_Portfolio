import { MetadataRoute } from 'next'
import { getServices } from '@/lib/services/LandingPage/servicesService'

const baseUrl = 'https://fastlineagency.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch services dynamically
  const servicesData = await getServices()
  
  // Generate service routes from services data
  const serviceRoutes = servicesData.services.map((service) => ({
    url: `${baseUrl}${service.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // Static pages
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/plans`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]

  return [...staticRoutes, ...serviceRoutes]
}

