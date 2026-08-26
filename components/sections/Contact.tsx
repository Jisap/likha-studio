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

        <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
          <div className="flex flex-col gap-6">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-accent"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs uppercase tracking-widest text-muted">What do you need?</label>
              <div className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setService(s)}
                    data-cursor="hover"
                    className={`
                      rounded-full border px-4 py-2 text-sm transition 
                      ${service === s
                        ? "border-accent bg-accent/10 text-white"
                        : "border-white/15 text-white/60 hover:border-white/40"
                      }`
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-widest text-muted">Message</label>
              <textarea rows={4} placeholder="Tell us about your project..." className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition focus:border-accent" />
            </div>

            <a href={`mailto:hello@likha.studio?subject=Project Inquiry: ${service}`} data-cursor="hover" className="rounded-full bg-accent px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-85">Send Message</a>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

export default Contact