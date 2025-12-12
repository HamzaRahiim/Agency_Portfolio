import { promises as fs } from 'fs';
import path from 'path';
import type { TrustBadgesData } from '@/types/trustBadges';

export const getTrustBadges = async (): Promise<TrustBadgesData> => {
  const filePath = path.join(process.cwd(), 'content', 'landingPage', 'trust-badges.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

