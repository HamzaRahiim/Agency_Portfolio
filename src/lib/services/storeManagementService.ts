import { promises as fs } from 'fs';
import path from 'path';
import type { StoreManagementData } from '@/types/storeManagement';

export const getStoreManagement = async (): Promise<StoreManagementData> => {
  const filePath = path.join(process.cwd(), 'content', 'store-management.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

