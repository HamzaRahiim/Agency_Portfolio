import type { Service } from "@/types/services";

const baseUrl = "https://fastlineagency.com";

/**
 * Generate Organization structured data (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fast Line Agency",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      "Fast Line Agency specializes in Meta Ads management and Shopify store development. We help ecommerce brands scale with expert Facebook & Instagram advertising and high-converting Shopify stores.",
    sameAs: [
      // Add social media links when available
      // "https://www.facebook.com/fastlineagency",
      // "https://www.instagram.com/fastlineagency",
      // "https://twitter.com/fastlineagency",
      // "https://www.linkedin.com/company/fastlineagency",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Meta Ads Management",
      "Facebook Advertising",
      "Instagram Advertising",
      "Shopify Development",
      "Shopify Store Management",
      "Ecommerce Marketing",
      "Social Media Advertising",
    ],
  };
}

/**
 * Generate Service structured data (JSON-LD)
 */
export function getServiceSchema(service: Service) {
  const serviceUrl = `${baseUrl}${service.href}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Fast Line Agency",
      url: baseUrl,
    },
    areaServed: "Worldwide",
    serviceType: service.category,
    url: serviceUrl,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };
}

/**
 * Generate WebSite structured data with search action
 */
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fast Line Agency",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

