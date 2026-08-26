"use client";

import { useState } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Reveal from "@/components/ui/Reveal";

const services = ["Website", "Mobile App", "System", "Video Editing", "Other"];

const Contact = () => {

  const [service, setService] = useState("Website");

  return (
    <section id="contact" className="px-6 py-28 md:px-10">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-3 text-sm uppercase tracking-widest text-accent">Contact</p>

          <AnimatedTitle
            text="Let's Talk"
            className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter md:text-7xl"
          />

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-white/70">Tell us about your project. We reply within 24 hours — no pressure, just a conversation about what&apos;s possible.</p>

            <div className="mt-10 flex flex-col gap-4 text-sm">
              <a
                href="mailto:hello@likha.studio"
                data-cursor="hover"
                className="flex items-center gap-3 text-white/80 transition hover:text-white"
              >
                <span className="text-accent">✉</span>
                hello@likha.studio
              </a>

              <a
                href="tel:+639000000000"
                data-cursor="hover"
                className="flex items-center gap-3 text-white/80 transition hover:text-white"
              >
                <span className="text-accent">☎</span>
                +63 900 000 0000
              </a>
              <span className="flex items-center gap-3 text-white/80"><span className="text-accent">◎</span> Philippines 🇵🇭</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact