"use client";

import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/types/services";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/10 to-background" />
      <div className="pointer-events-none absolute -inset-32 -z-10 bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(245,158,11,0.14),transparent_55%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          {/* Left: Copy */}
          <div>
            {service.heroBadge && (
              <div className="pb-4 sm:pb-6 animate-fade-up" style={{ animationDelay: "40ms" }}>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
                  {service.heroBadge}
                </span>
              </div>
            )}

            <div className="pb-6 sm:pb-8 animate-fade-up" style={{ animationDelay: "80ms" }}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight pb-4 sm:pb-6">
                {service.heroTitle || service.title}
              </h1>
              {service.heroSubtitle && (
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl">
                  {service.heroSubtitle}
                </p>
              )}
            </div>

            {service.metrics && service.metrics.length > 0 && (
              <div
                className="pb-8 sm:pb-10 grid gap-4 sm:grid-cols-3 max-w-2xl animate-fade-up"
                style={{ animationDelay: "140ms" }}
              >
                {service.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 sm:px-5 sm:py-4 shadow-sm backdrop-blur-sm"
                  >
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {metric.label}
                    </div>
                    <div className="pt-1 text-lg sm:text-xl font-semibold text-foreground">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <a
                href="#service-contact"
                className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm sm:text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:shadow-primary/50 hover:brightness-110"
              >
                {service.primaryCtaLabel || "Book a Strategy Call"}
              </a>
              {service.secondaryCtaLabel && (
                <a
                  href="#service-case-studies"
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-6 py-2.5 text-sm sm:text-base font-semibold text-foreground shadow-sm transition hover:border-primary/40 hover:bg-muted/60"
                >
                  {service.secondaryCtaLabel}
                </a>
              )}
              <Link
                href="/plans"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/5 px-6 py-2.5 text-sm sm:text-base font-semibold text-primary shadow-sm transition hover:border-primary/60 hover:bg-primary/10"
              >
                View Plans & Pricing
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div
            className="relative animate-fade-in-scale"
            style={{ animationDelay: "120ms" }}
          >
            <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-3xl" />

            <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-2xl shadow-black/20">
              {service.heroImage && (
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  width={960}
                  height={640}
                  priority
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

