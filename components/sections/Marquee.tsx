const row1 = ["NEXT.JS", "REACT", "TYPESCRIPT", "FLUTTER", "TAILWIND", "GSAP"];
const row2 = ["THREE.JS", "PREMIERE", "NODE.JS", "SUPABASE", "VERCEL", "FIGMA"];

import React from 'react'

const Marquee = () => {
    const a = [...row1, ...row1];
    const b = [...row2, ...row2];

    return (
        <section id="tech" className="overflow-hidden border-y border-white/10 py-8">
            <div className="marquee flex w-max gap-8 whitespace-nowrap">
                {a.map((t, i) => (
                    <span key={i} className="font-display text-4xl font-black uppercase tracking-tight text-white/25 md:text-6xl">
                        {t} <span className="text-accent">✦</span>
                    </span>
                ))}
            </div>

            <div className="marquee-reverse mt-4 flex w-max gap-8 whitespace-nowrap">
                {b.map((t, i) => (
                    <span key={i} className="font-display text-4xl font-black uppercase tracking-tight text-white/15 md:text-6xl">
                        {t} <span className="text-accent/60">✦</span>
                    </span>
                ))}
            </div>
        </section>
    );
}

export default Marquee