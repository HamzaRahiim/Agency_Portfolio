import { promises as fs } from 'fs';
import path from 'path';
import type { CaseStudiesData } from '@/types/caseStudies';

export const getCaseStudies = async (): Promise<CaseStudiesData> => {
  const filePath = path.join(process.cwd(), 'content', 'landingPage', 'case-studies.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
};

