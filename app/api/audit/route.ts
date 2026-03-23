import { NextResponse } from 'next/server';
import { runAudit, AuditReport } from '@/lib/auditEngine';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Try to ensure protocol
    const targetUrl = url.startsWith('http') ? url : `https://${url}`;

    // Fetch HTML
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch URL. Status: ${response.status}` },
        { status: 400 }
      );
    }

    const html = await response.text();
    const report: AuditReport = await runAudit(targetUrl, html);

    return NextResponse.json(report);
  } catch (error: any) {
    console.error('Audit Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
