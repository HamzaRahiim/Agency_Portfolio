"use client";

import type { Service } from "@/types/services";
import { SectionHeader } from "./SectionHeader";
import {
  Package,
  Sparkles,
  Rocket,
  Gift,
  Layers,
  Code,
  Settings,
  Play,
  CheckCircle2,
  Box,
  Zap
} from "lucide-react";

interface ServiceDeliverablesProps {
  service: Service;
}

// Icon array for deliverables - cycles through different icons
const deliverableIcons = [
  Package,
  Layers,
  Code,
  Settings,
  Rocket,
  Gift,
  Sparkles,
  CheckCircle2,
  Box,
  Zap,
  Play,
];

export function ServiceDeliverables({ service }: ServiceDeliverablesProps) {
  if (!service.deliverables || service.deliverables.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="What you get with this"
          titleHighlight="service"
          description="Clear deliverables so you always know exactly what is included and where we are focusing."
        />

        <div
          className="pt-8 sm:pt-10 lg:pt-12 grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {service.deliverables.map((item, index) => {
            const IconComponent = deliverableIcons[index % deliverableIcons.length];
            const iconColors = [
              "text-blue-500 bg-blue-500/10",
              "text-purple-500 bg-purple-500/10",
              "text-green-500 bg-green-500/10",
              "text-orange-500 bg-orange-500/10",
              "text-pink-500 bg-pink-500/10",
              "text-cyan-500 bg-cyan-500/10",
              "text-yellow-500 bg-yellow-500/10",
              "text-indigo-500 bg-indigo-500/10",
            ];
            const colorClass = iconColors[index % iconColors.length];

            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-border/60 bg-card/80 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:bg-card"
              >
                {/* Icon with background */}
                <div className={`mb-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colorClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {item.description}
                </p>

                {/* Hover effect gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/5 transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


