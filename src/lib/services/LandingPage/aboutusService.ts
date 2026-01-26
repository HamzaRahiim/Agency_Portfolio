import { promises as fs } from 'fs';
import path from 'path';
import type { AboutUsData } from '@/types/aboutus';

export const getAboutUs = async (): Promise<AboutUsData> => {
  const filePath = path.join(process.cwd(), 'content', 'aboutus', 'aboutus.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};
