import { promises as fs } from 'fs';
import path from 'path';
import type { TestimonialsData } from '@/types/testimonials';

export const getTestimonials = async (): Promise<TestimonialsData> => {
  const filePath = path.join(process.cwd(), 'content', 'landingPage', 'testimonials.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

