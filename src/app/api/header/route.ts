import { NextResponse } from 'next/server';
import { getHeaderData } from '@/lib/services/headerService';

export async function GET() {
  try {
    const data = await getHeaderData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching header data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch header data' },
      { status: 500 }
    );
  }
}

