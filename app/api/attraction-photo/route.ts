import { NextRequest, NextResponse } from 'next/server';
import { getAttractionPhoto } from '@/lib/attraction-photos';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim();
  
  if (!query || query.length < 2 || query.length > 120) {
    return NextResponse.json({ error: 'Enter a catalog place name of 2–120 characters.' }, { status: 400 });
  }
  
  const photoData = getAttractionPhoto(query);
  if (!photoData) return NextResponse.json({ error: 'No catalog photo found.' }, { status: 404 });
  return NextResponse.json(photoData, { headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' } });
}
