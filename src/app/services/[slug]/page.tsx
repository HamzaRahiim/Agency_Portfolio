import ServicePageClient from "@/components/servicePage/ServicePageClient";

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ServicePage({ params }: ServicePageProps) {
    // Next.js 16 passes params as a Promise in the App Router.
    // We need to unwrap it before using its properties.
    const { slug } = await params;

    return (
        <main className="min-h-screen bg-background">
            <ServicePageClient slug={slug} />
        </main>
    );
}

