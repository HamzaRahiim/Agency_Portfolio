"use client";

import type { Service } from "@/types/services";
import { SectionHeader } from "./SectionHeader";
import { AlertTriangle, CheckCircle } from "lucide-react";

interface ServiceProblemSolutionProps {
  service: Service;
}

export function ServiceProblemSolution({ service }: ServiceProblemSolutionProps) {
  if (!service.painPoints && !service.solutions) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Challenges we"
          titleHighlight="solve"
          description="If you're here, you're probably facing at least one of these issues."
        />

        <div className="pt-8 sm:pt-10 lg:pt-12 grid gap-8 lg:gap-16 lg:grid-cols-2 items-start">
          <div className="animate-fade-up" style={{ animationDelay: "40ms" }}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground pb-6">
              Challenges we solve
            </h3>
            {service.painPoints && (
              <ul className="flex flex-col gap-4 sm:gap-5">
                {service.painPoints.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-sm sm:text-base"
                  >
                    <AlertTriangle className="mt-0.5 shrink-0 w-5 h-5 text-yellow-500" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground pb-6">
              How this service helps
            </h3>
            {service.solutions && (
              <ul className="flex flex-col gap-4 sm:gap-5">
                {service.solutions.map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 rounded-2xl border border-primary/40 bg-primary/5 px-4 py-3 text-sm sm:text-base"
                  >
                    <CheckCircle className="mt-0.5 shrink-0 w-5 h-5 text-green-500" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


