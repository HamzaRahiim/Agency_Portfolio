"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { StoreManagementService, StoreManagementData } from "@/types/storeManagement";

export default function StoreManagementSection() {
  const [services, setServices] = useState<StoreManagementService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch store management data from API route
  useEffect(() => {
    const fetchStoreManagement = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
        const response = await fetch(`${baseUrl}/api/store-management`);

        if (!response.ok) {
          throw new Error("Failed to fetch store management data");
        }

        const data: StoreManagementData = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching store management:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreManagement();
  }, []);
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/5" />
        {/* Subtle side dots for both themes */}
        {/* Light mode */}
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
        {/* Dark mode */}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
        {/* Header */}
        <div className="flex flex-col items-center justify-center pb-16 sm:pb-20 lg:pb-24">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight max-w-5xl text-center w-full">
            Your One-Stop Solution for Full-Scale Store Management.{" "}
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Done-For-You
            </span>
          </h2>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-12 sm:pb-16 lg:pb-20 px-2 sm:px-0">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative rounded-2xl lg:rounded-3xl border border-border/60 bg-muted/30 backdrop-blur-sm p-4 sm:p-6 lg:p-8 cursor-pointer"
              >
                {/* Left Side Hover Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1/2 group-active:w-1/2 bg-gradient-to-r from-primary to-primary/80 transition-all duration-700 ease-out rounded-l-2xl lg:rounded-l-3xl z-0 overflow-hidden" />

                {/* Right Side Hover Effect */}
                <div className="absolute right-0 top-0 bottom-0 w-0 group-hover:w-1/2 group-active:w-1/2 bg-gradient-to-l from-accent to-accent/80 transition-all duration-700 ease-out rounded-r-2xl lg:rounded-r-3xl z-0 overflow-hidden" />

                {/* Center Merge Effect - Appears when both sides meet */}
                <div className="absolute left-1/2 top-0 bottom-0 w-0 group-hover:w-full group-active:w-full -translate-x-1/2 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500 delay-300 z-0 rounded-2xl lg:rounded-3xl overflow-hidden" />

                {/* Number Circle - Positioned on left border (half outside, half inside) */}
                <div className="absolute -left-6 sm:-left-7 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl group-hover:bg-accent group-active:bg-accent group-hover:text-accent-foreground group-active:text-accent-foreground transition-all duration-500 shadow-lg z-20 border-2 border-border">
                  {service.number}
                </div>

                {/* Content */}
                <div className="relative z-10 pl-12 sm:pl-14">
                  {/* Title */}
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-white group-active:text-white transition-colors duration-500 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-3 rounded-full px-8 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-bold text-primary-foreground shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ring"
            style={{
              background: 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, var(--primary-hover), var(--accent-hover), var(--primary-hover))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, var(--primary), var(--accent), var(--primary))';
            }}
          >
            Get Started
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-1"
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
          </Link>
        </div>
      </div>
    </section>
  );
}

