import ServicePageClient from "@/components/servicePage/ServicePageClient";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceSchema } from "@/lib/seo";
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

    return {
        metadataBase: new URL(baseUrl),
        title: `${service.title} - Fast Line Agency`,
        description: service.description,
        keywords: [
            service.title,
            service.category,
            "Fast Line Agency",
            ...(service.title.toLowerCase().includes("meta") || service.title.toLowerCase().includes("ads")
                ? ["Meta Ads", "Facebook Ads", "Instagram Ads", "Meta Advertising", "Social Media Advertising"]
                : ["Shopify", "Shopify Development", "Shopify Store", "Ecommerce Development"]),
        ],
        openGraph: {
            title: `${service.title} - Fast Line Agency`,
            description: service.description,
            url: serviceUrl,
            siteName: "Fast Line Agency",
            images: [
                {
                    url: `${baseUrl}${service.heroImage || "/og-image.jpg"}`,
                    width: 1200,
                    height: 630,
                    alt: `${service.title} - Fast Line Agency`,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${service.title} - Fast Line Agency`,
            description: service.description,
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

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <ServicePageClient slug={slug} />
        </main>
    );
}

