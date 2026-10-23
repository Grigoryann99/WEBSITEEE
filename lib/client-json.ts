/** A bounded wait for interactive requests, including reading the response body. */
export async function clientJson<T>(url: string, init: RequestInit, options: { signal?: AbortSignal; timeoutMs?: number } = {}): Promise<{ response: Response; data: T }> {
    const controller = new AbortController();
    let timedOut = false;
    const cancel = () => controller.abort();
    if (options.signal?.aborted) cancel();
    else options.signal?.addEventListener('abort', cancel, { once: true });
    const timer = setTimeout(() => { timedOut = true; controller.abort(); }, options.timeoutMs ?? 45000);
    try {
        const response = await fetch(url, { ...init, signal: controller.signal });
        let data: T;
        try { data = await response.json() as T; }
        catch (error) {
            if (controller.signal.aborted) throw error;
            throw new Error('The service returned an unexpected response. Please try again.');
        }
        return { response, data };
    } catch (error) {
        if (timedOut) throw new Error('The connection timed out. Please try again.');
        throw error;
    } finally {
        clearTimeout(timer);
        options.signal?.removeEventListener('abort', cancel);
    }
}
