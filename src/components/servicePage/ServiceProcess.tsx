"use client";

import type { Service } from "@/types/services";
import { SectionHeader } from "./SectionHeader";
import {
  Search,
  PenTool,
  Code,
  Rocket,
  Settings,
  CheckCircle2,
  FileText,
  Zap,
  Target,
  Play,
  BarChart3,
} from "lucide-react";

interface ServiceProcessProps {
  service: Service;
}

// Icon mapping based on common process step titles
const getProcessIcon = (title: string, index: number) => {
  const titleLower = title.toLowerCase();

  if (titleLower.includes("discovery") || titleLower.includes("planning") || titleLower.includes("audit") || titleLower.includes("strategy")) {
    return Search;
  }
  if (titleLower.includes("design") || titleLower.includes("build") || titleLower.includes("setup")) {
    return index % 2 === 0 ? PenTool : Code;
  }
  if (titleLower.includes("test") || titleLower.includes("launch")) {
    return Rocket;
  }
  if (titleLower.includes("optimize") || titleLower.includes("scale") || titleLower.includes("support")) {
    return Settings;
  }
  if (titleLower.includes("report") || titleLower.includes("iterate") || titleLower.includes("insight")) {
    return BarChart3;
  }

  // Default icons based on index
  const defaultIcons = [Search, PenTool, Rocket, Settings, CheckCircle2, FileText, Zap, Target, Play];
  return defaultIcons[index % defaultIcons.length];
};

export function ServiceProcess({ service }: ServiceProcessProps) {
  if (!service.processSteps || service.processSteps.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How we work"
          titleHighlight="together"
          description="A clear, transparent process from first call to launch and ongoing optimization."
        />

        <ol className="pt-8 sm:pt-10 lg:pt-12 relative grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {service.processSteps?.map((step, index) => {
            const IconComponent = getProcessIcon(step.title, index);
            const isLast = index === (service.processSteps?.length ?? 0) - 1;

            // Gradient colors for each step
            const gradients = [
              "from-blue-500 to-blue-600",
              "from-purple-500 to-purple-600",
              "from-green-500 to-green-600",
              "from-orange-500 to-orange-600",
              "from-pink-500 to-pink-600",
              "from-cyan-500 to-cyan-600",
            ];
            const gradientClass = gradients[index % gradients.length];

            return (
              <li key={index} className="relative group">
                {/* Connecting line (hidden on mobile, visible on larger screens) */}
                {!isLast && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 via-primary/20 to-transparent -translate-x-1/2 z-0"
                    style={{ width: 'calc(100% - 3rem)' }} />
                )}

                {/* Card */}
                <div className="relative h-full rounded-2xl border border-border/60 bg-card/80 p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl hover:bg-card">
                  {/* Number Badge with Icon */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`relative flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={2.5} />
                      {/* Step Number Badge */}
                      <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md border-2 border-background">
                        {index + 1}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Hover effect gradient overlay */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}


