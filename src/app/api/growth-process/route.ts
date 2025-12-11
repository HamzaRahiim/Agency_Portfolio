import { NextResponse } from 'next/server';
import { getGrowthProcess } from '@/lib/services/growthProcessService';

export async function GET() {
  try {
    const data = await getGrowthProcess();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching growth process:', error);
    return NextResponse.json(
      { error: 'Failed to fetch growth process' },
      { status: 500 }
    );
  }
}

