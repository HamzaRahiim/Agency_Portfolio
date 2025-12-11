import { NextResponse } from 'next/server';
import { getCaseStudies } from '@/lib/services/caseStudiesService';

export async function GET() {
  try {
    const data = await getCaseStudies();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

