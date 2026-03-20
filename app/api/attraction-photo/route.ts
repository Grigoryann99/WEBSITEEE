import { NextRequest, NextResponse } from 'next/server';
import { getAttractionPhoto } from '@/lib/unsplash';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'No query' }, { status: 400 });
  }
  
  const photoData = await getAttractionPhoto(query);
  return NextResponse.json(photoData);
}
