export interface ServiceMetric {
  label: string;
  value: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceCaseStudy {
  title: string;
  result: string;
  description: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface Service {
  // Card / listing fields (used on the landing page)
  title: string;
  description: string;
  icon: string;
  href: string;
  gradient: string;

  // Dynamic route & detail page fields
  slug: string;
  category: string;

  heroTitle?: string;
  heroSubtitle?: string;
  heroBadge?: string;
  heroImage?: string;
  metrics?: ServiceMetric[];

  painPoints?: string[];
  solutions?: string[];
  deliverables?: ServiceDeliverable[];
  processSteps?: ServiceProcessStep[];
  caseStudies?: ServiceCaseStudy[];
  faqs?: ServiceFAQItem[];

  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
}

export interface ServicesData {
  services: Service[];
}


