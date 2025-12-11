import { promises as fs } from 'fs';
import path from 'path';
import type { GrowthProcessData } from '@/types/growthProcess';

export const getGrowthProcess = async (): Promise<GrowthProcessData> => {
  const filePath = path.join(process.cwd(), 'content', 'growth-process.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

