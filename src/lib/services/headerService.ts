import { promises as fs } from 'fs';
import path from 'path';
import type { HeaderData } from '@/types/header';

export const getHeaderData = async (): Promise<HeaderData> => {
  const filePath = path.join(process.cwd(), 'content', 'header.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

