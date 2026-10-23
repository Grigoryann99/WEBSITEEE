import { NextRequest } from 'next/server';
export function sameOrigin(request: NextRequest) {
    return request.headers.get('origin') === request.nextUrl.origin;
}
export async function boundedJson(request: Request, maxBytes = 16000, timeoutMs = 5000): Promise<unknown> {
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') throw new Error('JSON required');
    const declaredLength = Number(request.headers.get('content-length'));
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) throw new Error('Request too large');
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Missing body');
    const chunks: Uint8Array[] = []; let length = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_resolve, reject) => { timer = setTimeout(() => { reject(new Error('Request timed out')); void reader.cancel().catch(() => {}); }, timeoutMs); });
    try { while (true) {
        const { value, done } = await Promise.race([reader.read(), deadline]);
        if (done) break;
        length += value.byteLength;
        if (length > maxBytes) { await reader.cancel(); throw new Error('Request too large'); }
        chunks.push(value);
    } } finally { clearTimeout(timer); reader.releaseLock(); }
    const bytes = new Uint8Array(length); let offset = 0;
    chunks.forEach(chunk => { bytes.set(chunk, offset); offset += chunk.length; });
    return JSON.parse(new TextDecoder().decode(bytes));
}
