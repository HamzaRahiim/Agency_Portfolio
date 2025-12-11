import { promises as fs } from 'fs';
import path from 'path';
import type { FooterData } from '@/types/footer';

export const getFooterData = async (): Promise<FooterData> => {
  const filePath = path.join(process.cwd(), 'content', 'footer.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

