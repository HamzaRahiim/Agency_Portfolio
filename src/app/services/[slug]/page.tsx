import ServicePageClient from "@/components/servicePage/ServicePageClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceSchema, getBreadcrumbSchema } from "@/lib/seo";
import { getServices } from "@/lib/services/LandingPage/servicesService";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate metadata for service pages
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
    const { slug } = await params;
    const servicesData = await getServices();
    const service = servicesData.services.find((s) => s.slug === slug);

    if (!service) {
        return {
            title: "Service Not Found",
            description: "The requested service could not be found.",
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const baseUrl = "https://fastlineagency.com";
    const serviceUrl = `${baseUrl}${service.href}`;

    // Generate service-specific, keyword-rich metadata
    const isMetaAds = service.title.toLowerCase().includes("meta") || service.title.toLowerCase().includes("ads");

    const serviceTitle = isMetaAds
        ? `Meta Ads Management Services | Facebook & Instagram Advertising Agency`
        : `Shopify Development Services | Custom Store Setup & Optimization Agency`;

    const serviceDescription = isMetaAds
        ? `Professional Meta Ads management services for Facebook and Instagram. Expert campaign setup, creative strategy, A/B testing, retargeting, and performance optimization. Scale your ad spend with proven Meta advertising strategies.`
        : `Complete Shopify development services including custom theme development, store setup, app integration, payment configuration, and optimization. Launch a high-converting Shopify store tailored to your brand.`;

    const serviceKeywords = isMetaAds
        ? [
            "Meta Ads Management",
            "Facebook Ads Management",
            "Instagram Ads Management",
            "Meta Advertising Services",
            "Facebook Advertising Agency",
            "Instagram Advertising Agency",
            "Social Media Advertising",
            "Meta Ads Campaign Management",
            "Facebook Ads Optimization",
            "Instagram Ads Optimization",
            "Meta Business Manager Setup",
            "Facebook Pixel Setup",
            "Meta Ads Agency",
            "Fast Line Agency",
        ]
        : [
            "Shopify Development",
            "Shopify Store Development",
            "Shopify Store Setup",
            "Shopify Theme Development",
            "Custom Shopify Store",
            "Shopify Store Optimization",
            "Shopify Ecommerce Development",
            "Shopify Store Design",
            "Shopify App Integration",
            "Shopify Payment Setup",
            "Shopify Store Management",
            "Shopify Development Agency",
            "Fast Line Agency",
        ];

    return {
        metadataBase: new URL(baseUrl),
        title: `${serviceTitle} | Fast Line Agency`,
        description: serviceDescription,
        keywords: serviceKeywords,
        openGraph: {
            title: `${serviceTitle} | Fast Line Agency`,
            description: serviceDescription,
            url: serviceUrl,
            siteName: "Fast Line Agency",
            images: [
                {
                    url: `${baseUrl}${service.heroImage || "/og-image.jpg"}`,
                    width: 1200,
                    height: 630,
                    alt: `${serviceTitle} | Fast Line Agency`,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${serviceTitle} | Fast Line Agency`,
            description: serviceDescription,
            images: [`${baseUrl}${service.heroImage || "/twitter-image.jpg"}`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        alternates: {
            canonical: serviceUrl,
        },
    };
}

export default async function ServicePage({ params }: ServicePageProps) {
    // Next.js 16 passes params as a Promise in the App Router.
    // We need to unwrap it before using its properties.
    const { slug } = await params;

    // Fetch service data for structured data
    const servicesData = await getServices();
    const service = servicesData.services.find((s) => s.slug === slug);

    // Return 404 if service not found
    if (!service) {
        notFound();
    }

    const serviceSchema = getServiceSchema(service);

    // Generate breadcrumb structured data
    const baseUrl = "https://fastlineagency.com";
    const serviceUrl = `${baseUrl}${service.href}`;
    const breadcrumbSchema = getBreadcrumbSchema([
        { name: "Home", url: baseUrl },
        { name: "Services", url: `${baseUrl}/services` },
        { name: service.title, url: serviceUrl },
    ]);

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <ServicePageClient slug={slug} />
        </main>
    );
}

