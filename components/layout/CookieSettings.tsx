'use client';
export default function CookieSettings() { return <button className="text-xs underline underline-offset-4" onClick={() => window.dispatchEvent(new Event('velora:cookie-settings'))}>Cookie preferences</button>; }
