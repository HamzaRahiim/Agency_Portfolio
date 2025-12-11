export interface Testimonial {
  name: string;
  initials: string;
  reviewCount: string;
  location: string;
  rating: number;
  timeAgo: string;
  title: string;
  text: string;
  date: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
}

