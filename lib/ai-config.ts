/** Keep provider settings consistent across chat and itinerary generation. */
export function groqModelOptions() {
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';
    return { model, ...(/^openai\/gpt-oss-(20b|120b)$/.test(model) ? { reasoning_effort: 'low' as const } : {}) };
}
