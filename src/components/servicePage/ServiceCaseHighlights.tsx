"use client";

import type { Service } from "@/types/services";
import { SectionHeader } from "./SectionHeader";
import {
  Trophy,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Award,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

interface ServiceCaseHighlightsProps {
  service: Service;
}

// Icon array for case studies
const caseStudyIcons = [
  Trophy,
  TrendingUp,
  BarChart3,
  Target,
  Zap,
  Award,
  Sparkles,
  ArrowUpRight,
];

export function ServiceCaseHighlights({ service }: ServiceCaseHighlightsProps) {
  if (!service.caseStudies || service.caseStudies.length === 0) return null;

  return (
    <section id="service-case-studies" className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="A quick look at"
          titleHighlight="results"
          description="Real examples of how this service has helped brands unlock more revenue."
        />

        <div className="pt-8 sm:pt-10 lg:pt-12 grid gap-6 sm:gap-8 md:grid-cols-2">
          {service.caseStudies.map((item, index) => {
            const IconComponent = caseStudyIcons[index % caseStudyIcons.length];
            const gradientColors = [
              "from-blue-500 to-blue-600",
              "from-purple-500 to-purple-600",
              "from-green-500 to-green-600",
              "from-orange-500 to-orange-600",
              "from-pink-500 to-pink-600",
              "from-cyan-500 to-cyan-600",
            ];
            const gradientClass = gradientColors[index % gradientColors.length];

            return (
              <article
                key={index}
                className="group relative rounded-2xl border border-border/60 bg-card/80 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:bg-card"
              >
                {/* Icon with gradient background */}
                <div className={`mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={2.5} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Result Badge - More prominent */}
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 border border-primary/20">
                  <TrendingUp className="w-4 h-4 text-primary" strokeWidth={2.5} />
                  <span className="text-sm sm:text-base font-bold text-primary">
                    {item.result}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Hover effect gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


