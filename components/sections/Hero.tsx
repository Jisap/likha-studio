import React from 'react'
import SpotlightBg from '../SpotLightBg'
import FloatingPhone from '../scene/FloatingPhone'
import IntroReveal from '../ui/IntroReveal'

const Hero = () => {
  return (
    <section id="hero" className="h-screen w-full p-3 md:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-4xl border border-white/10">
        <SpotlightBg />

        {/* FloatingPhone solo visible en pantallas medianas y grandes para no colisionar con el contenido en móviles */}
        <div className="absolute right-[6%] lg:right-[12%] top-1/2 -translate-y-[48%] z-10 hidden md:flex items-center justify-center pointer-events-auto">
          <IntroReveal delay={0.2}>
            <FloatingPhone />
          </IntroReveal>
        </div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col justify-center pt-16 md:pt-0 md:justify-end p-6 pb-12 sm:p-8 sm:pb-14 md:p-14 md:pb-20">
          <IntroReveal delay={0}>
            <p className="mb-3 md:mb-4 max-w-md text-xs sm:text-sm text-white/60 md:text-base">Websites · Mobile Apps · Systems · Video</p>
          </IntroReveal>

          <IntroReveal delay={0.15}>
            <h1 className="font-display text-[11vw] font-black uppercase leading-[0.82] tracking-tighter md:text-[8vw]">
              We Build
              <br />
              <span className="text-accent">Digital</span>
            </h1>
          </IntroReveal>

          <IntroReveal delay={0.3}>
            <p className="mt-6 max-w-lg text-white/70">A design and engineering studio crafting fast websites, mobile apps, custom systems, and cinematic video — from the Philippines.</p>
          </IntroReveal>

          <IntroReveal delay={0.45} className="pointer-events-auto">
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#services" data-cursor="hover" className="rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-white/85">Our Services</a>
              <a href="#work" data-cursor="hover" className="rounded-full border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white/10">See Our Work</a>
            </div>
          </IntroReveal>
        </div>

        <span className="absolute bottom-6 right-6 z-10 text-[10px] md:text-xs uppercase tracking-widest text-white/50 md:bottom-8 md:right-14">
          <span className="hidden md:inline">Drag phone · </span>Scroll ↓
        </span>
      </div>
    </section>
  );
};

export default Hero