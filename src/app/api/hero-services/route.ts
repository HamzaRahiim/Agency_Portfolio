import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "content/landingPage/services.json");
    const fileContents = readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContents);

    // Map services to hero-friendly format
    const heroServices = data.services.map((service: any) => ({
      title: service.title,
      subtitle: service.heroSubtitle,
      cta: service.primaryCtaLabel,
      href: service.href,
      slug: service.slug,
      icon: service.icon,
      gradient: service.gradient,
    }));

    return Response.json({ services: heroServices });
  } catch (error) {
    console.error("Error reading services:", error);
    return Response.json({ error: "Failed to load services" }, { status: 500 });
  }
}
