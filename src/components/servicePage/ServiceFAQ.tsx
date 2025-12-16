"use client";

import type { Service } from "@/types/services";
import { SectionHeader } from "./SectionHeader";
import { HelpCircle, ChevronDown } from "lucide-react";

interface ServiceFAQProps {
  service: Service;
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  if (!service.faqs || service.faqs.length === 0) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Frequently asked"
          titleHighlight="questions"
          description="If you still have questions after reading this, we're happy to walk you through everything on a call."
        />

        <div className="pt-8 sm:pt-10 lg:pt-12 flex justify-center w-full">
          <div className="w-full max-w-3xl flex flex-col gap-5 sm:gap-6">
            {service.faqs.map((item, index) => (
              <details
                key={index}
                className="group relative rounded-2xl border border-border/60 bg-card/80 p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:bg-card"
              >
                <summary className="flex cursor-pointer items-start gap-4 text-sm sm:text-base font-semibold text-foreground list-none">
                  {/* Question Icon */}
                  <div className="shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2.5} />
                  </div>

                  {/* Question Text */}
                  <span className="flex-1 pt-0.5 group-hover:text-primary transition-colors duration-300">
                    {item.question}
                  </span>

                  {/* Chevron Icon */}
                  <div className="shrink-0 mt-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-all duration-300 group-open:rotate-180">
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={2.5} />
                  </div>
                </summary>

                {/* Answer */}
                <div className="mt-4 ml-10 sm:ml-11 pl-4 border-l-2 border-primary/20">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>

                {/* Hover effect gradient overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-primary/5 group-hover:to-primary/5 transition-all duration-300 pointer-events-none" />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


