"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Service, ServicesData } from "@/types/services";

export default function ServicesSection() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch services data from API route
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services data");
        }

        const data: ServicesData = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // NOTE: All GSAP / DOM-manipulating animations were removed to avoid
  // React + Turbopack runtime errors during navigation. The section now
  // renders purely with React and Tailwind (no manual DOM changes).

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Wrapper div with key to fix React removeChild error during navigation */}
      <div key="services-section-content">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/5 to-background" />
          {/* Subtle decorative dots - kept to the sides for both themes */}
          {/* Light mode dots */}
          <div
            className="absolute inset-y-0 -left-20 sm:-left-10 w-56 pointer-events-none dark:hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(30,64,175,0.22) 1.6px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="absolute inset-y-0 -right-20 sm:-right-10 w-56 pointer-events-none dark:hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(251,191,36,0.22) 1.6px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          {/* Dark mode dots */}
          <div
            className="absolute inset-y-0 -left-20 sm:-left-10 w-56 pointer-events-none hidden dark:block"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(96,165,250,0.22) 1.6px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="absolute inset-y-0 -right-20 sm:-right-10 w-56 pointer-events-none hidden dark:block"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(251,191,36,0.24) 1.6px, transparent 0)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pb-16 sm:pb-20 lg:pb-24">
            {/* Left: Title */}
            <div>
              <div className="mb-4">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-primary-foreground bg-gradient-to-r from-primary to-accent px-4 py-2 rounded-full inline-block shadow-sm">
                  Service Ecosystem
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-2 leading-tight">
                <span>The Leaders in Full</span>{" "}
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_100%]">
                  Ecommerce Solutions
                </span>
              </h2>
            </div>

            {/* Right: Description - Aligned horizontally with heading */}
            <div className="flex items-center">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                To thrive in an ever-changing marketplace, you need a team of
                experts and a unified growth strategy. Discover how our services
                can elevate your brand to new heights.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {services.map((service) => (
                <Link
                  key={service.slug || service.href}
                  href={service.href}
                  className="group relative rounded-2xl lg:rounded-3xl border-2 border-border bg-card hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 overflow-hidden h-auto sm:h-[220px] lg:h-[240px]"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                  }}
                  data-card
                >
                  {/* Animated Background Gradient on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  {/* Accent Border on Hover */}
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-transparent group-hover:border-accent/30 transition-all duration-500" />

                  {/* Main Content - Horizontal Layout: Icon Left, Title Right */}
                  <div data-card-content className="relative z-10 h-full flex items-center gap-4 sm:gap-5 p-5 sm:p-6">
                    {/* Left: Icon with Continuous Circular Animation */}
                    <div className="shrink-0">
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20">
                        {/* Icon Background with Gradient */}
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500 blur-sm`} />

                        {/* Icon Container with Circular Animation */}
                        <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-background to-muted/50 border border-border/60 flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl group-hover:border-primary/40 group-hover:shadow-lg transition-all duration-500">
                          {/* Icon with Image */}
                          <div data-icon-container className="h-6 sm:h-8 lg:h-10 w-6 sm:w-8 lg:w-10 flex items-center justify-center">
                            {service.icon && typeof service.icon === 'string' && service.icon.startsWith('/') ? (
                              <Image
                                src={service.icon}
                                alt={service.title}
                                width={40}
                                height={40}
                                className="w-full h-full object-contain"
                                priority={false}
                              />
                            ) : (
                              <span className="text-xl">{service.icon}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Title + mobile description */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground sm:hidden line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Paper Unfold Effect - Slides up from bottom on hover with blur effect */}
                  <div data-card-overlay className="absolute inset-x-0 bottom-0 bg-card/80 backdrop-blur-md border-t-2 border-border/60 rounded-b-2xl lg:rounded-b-3xl transform translate-y-full opacity-0 shadow-2xl z-20 p-5 sm:p-6">
                    {/* Description */}
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Know More Button */}
                    <div className="flex justify-start">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 group-hover:bg-primary/20 border border-primary/20 group-hover:border-primary/40 transition-all duration-300">
                        <span className="text-sm sm:text-base font-semibold text-primary">
                          Know More
                        </span>
                        <svg
                          className="w-4 h-4 sm:w-5 sm:h-5 text-primary transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div data-card-glow className={`absolute -inset-1 bg-gradient-to-br ${service.gradient} opacity-0 rounded-2xl lg:rounded-3xl blur-xl -z-10`} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}