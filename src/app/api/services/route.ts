import { NextResponse } from 'next/server';
import { getServices } from '@/lib/services/servicesService';

export async function GET() {
  try {
    const data = await getServices();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

