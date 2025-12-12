import { promises as fs } from 'fs';
import path from 'path';
import type { ServicesData } from '@/types/services';

export const getServices = async (): Promise<ServicesData> => {
  const filePath = path.join(process.cwd(), 'content', 'landingPage', 'services.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

