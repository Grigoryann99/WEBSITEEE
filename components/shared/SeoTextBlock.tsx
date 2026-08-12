import React from 'react';

interface SeoTextBlockProps {
    title: string;
    content: string[];
}

export default function SeoTextBlock({ title, content }: SeoTextBlockProps) {
    return (
        <section className="bg-[#FAF9F6] border-t border-black/5 py-16 md:py-24 px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl text-[#0F172A] mb-8 font-semibold tracking-tight">
                    {title}
                </h2>
                <div className="space-y-6">
                    {content.map((paragraph, index) => (
                        <p key={index} className="font-sans text-[#1E293B] text-base leading-relaxed font-medium">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
