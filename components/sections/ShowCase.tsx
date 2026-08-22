"use client";

import { useRef, useState } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const panels = [
  { n: "01", title: "Discovery", desc: "We sit with you and learn your business, goals, and users before anything else." },
  { n: "02", title: "Design", desc: "We craft the look and feel — clean, intentional, and built around your brand." },
  { n: "03", title: "Build", desc: "We engineer it with a modern stack — fast, scalable, and yours to own." },
  { n: "04", title: "Launch", desc: "We ship it, test it, and hand it off. You understand and control everything." },
  { n: "05", title: "Support", desc: "Need us later? We're here — updates, fixes, and growth whenever you need." },
];

const ShowCase = () => {

  const [active, setActive] = useState(0);
  const total = panels.length;

  // Math.max(p + dir, 0): Evita que baje de 0 (primer panel).
  // Math.min(..., total - 1): Evita que suba más allá del último índice.
  // Resultado: Navegación segura sin errores de índice fuera de rango.
  const go = (dir: number) => { // -1 o +1
    setActive((p) => Math.min(Math.max(p + dir, 0), total - 1));
  };

  return (
    <section id="process" className="overflow-hidden py-28">
      <div className="mb-10 flex items-end justify-between px-6 md:px-10">
        <div>
          <p className="mb-3 text-sm uppercase tracking-widest text-accent">How We Work</p>
          <AnimatedTitle
            text="Our Process"
            className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
          />
        </div>

        <div className="hidden gap-3 md:flex">
          <button
            onClick={() => go(-1)}
            disabled={active === 0}
            data-cursor="hover"
            aria-label="Previous"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5 disabled:opacity-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <button
            onClick={() => go(1)}
            disabled={active === total - 1}
            data-cursor="hover"
            aria-label="Next"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5 disabled:opacity-30"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      {/* sliding track */}
      <div className="px-6 md:px-10">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {panels.map((p) => (
              <div key={p.n} className="w-full shrink-0 px-2">
                <div className="rounded-3xl border border-white/10 bg-white/4 p-10 md:p-20">
                  <span className="font-display text-7xl font-black text-white/15 md:text-[10rem] md:leading-none">{p.n}</span>
                  <h3 className="mt-4 font-display text-4xl font-black uppercase tracking-tight md:text-7xl">{p.title}</h3>
                  <p className="mt-5 max-w-lg text-lg text-white/70 md:text-xl">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* dots + mobile arrows */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          data-cursor="hover"
          aria-label="Previous"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent disabled:opacity-30 md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className="flex gap-2">
          {panels.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Step ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-accent" : "w-2 bg-white/25"}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={active === total - 1}
          data-cursor="hover"
          aria-label="Next"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent disabled:opacity-30 md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  )
}

export default ShowCase