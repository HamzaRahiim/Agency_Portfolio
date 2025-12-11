import { NextResponse } from 'next/server';
import { getTrustBadges } from '@/lib/services/trustBadgesService';

export async function GET() {
  try {
    const data = await getTrustBadges();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching trust badges:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trust badges' },
      { status: 500 }
    );
  }
}

