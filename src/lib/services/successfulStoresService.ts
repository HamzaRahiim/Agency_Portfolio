import { promises as fs } from 'fs';
import path from 'path';
import type { SuccessfulStoresData } from '@/types/successfulStores';

export const getSuccessfulStores = async (): Promise<SuccessfulStoresData> => {
  const filePath = path.join(process.cwd(), 'content', 'successful-stores.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

