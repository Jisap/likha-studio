"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const rows = [
  { title: "We Learn Your Business First", desc: "Before we write a line of code, we sit with you. We ask the questions most agencies skip — what actually matters to your operations, not just what looks good on a homepage.", video: "/videos/why-1.mp4", poster: "/images/why-1.jpg" },
  { title: "One Team. One Conversation.", desc: "No account managers relaying messages. No ticket systems. No waiting three days for a reply. You talk directly to the people building your project — every time.", video: "/videos/why-2.mp4", poster: "/images/why-2.jpg" },
  { title: "Honest Scoping. Not Upselling.", desc: "Sometimes the answer is a simple website. Sometimes it's a full system. We'll tell you honestly which one — even when the simple answer means a smaller invoice for us.", video: "/videos/why-3.mp4", poster: "/images/why-3.jpg" },
  { title: "It Works After We Leave", desc: "We don't build things that fall apart when the project ends. You own everything, you understand everything — and if you need us later, we're here.", video: "/videos/why-4.mp4", poster: "/images/why-4.jpg" },
];

import React from 'react'

const WhyUs = () => {

  const ref = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".why-block");
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });

      // HIGGSFIELD-style cinematic push: slow zoom-in habang nag-scroll
      gsap.utils.toArray<HTMLElement>(".why-layer").forEach((layer) => {
        gsap.fromTo(
          layer,
          { scale: 1.35, yPercent: -6 },
          {
            scale: 1.1,
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section id="why" ref={ref} className="px-6 py-28 md:px-10">
      <div className="mb-4">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">The Likha Difference</p>
        <AnimatedTitle
          text="Why It Matters"
          className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
        />
      </div>
    </section>
  )
}

export default WhyUs