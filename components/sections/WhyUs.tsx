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

  // "Sticky Media + Scrolling Text"

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".why-block");  // Convierte una lista de elementos del DOM en un array de JavaScript que GSAP puede entender y manipular. 

      blocks.forEach((block, i) => {
        ScrollTrigger.create({                // Se crean triggers (activadores de animaciones) para cada bloque
          trigger: block,
          start: "top center",                // Cuando el TOP del bloque llega al CENTRO de la ventana
          end: "bottom center",               // Hasta que el BOTTOM del bloque pasa el centro
          onToggle: (self) => {               // Cambia el índice activo. Solo se dispara cuando el bloque entra o sale de esa zona central. Evita actualizaciones innecesarias en cada píxel de scroll.
            if (self.isActive) setActive(i);
          },
        });
      });

      // HIGGSFIELD-style cinematic push: slow zoom-in habang nag-scroll
      gsap.utils.toArray<HTMLElement>(".why-layer").forEach((layer) => {
        gsap.fromTo(
          layer,
          { scale: 1.35, yPercent: -6 },    // ESTADO INICIAL( Zoom de 135% )
          {
            scale: 1.1,                     // ESTADO FINAL( Zoom de 110% )
            yPercent: 6,                    // Movimiento vertical compensatorio para el zoom. La imagen baja 12% de su altura
            ease: "none",                   // Lineal = vinculado 1:1 al scroll. Hace que se sienta mecánicamente vinculado a tu dedo/mouse
            scrollTrigger: {
              trigger: ref.current,         // Toda la sección WhyUs
              start: "top bottom",          // Empieza cuando la sección entra por abajo
              end: "bottom top",            // Termina cuando sale por arriba
              scrub: 1,                     // Suavizado de 1 segundo
            },
          }
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

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* STICKY CINEMATIC MEDIA */}
        {/* 
          Izquierda (Sticky): Un contenedor que se "pega" (sticky top-24) a la pantalla mientras haces scroll.
          Dentro, hay 4 videos apilados uno encima del otro. Solo el video activo tiene opacity: 1, los demás están ocultos. 
         */}
        <div className="hidden md:block">
          <div
            ref={media}
            className="sticky top-24 aspect-4/3 overflow-hidden rounded-3xl bg-white/5"
          >
            {rows.map((r, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-900ms ease-out"
                style={{ opacity: active === i ? 1 : 0 }} // Solo el video activo tiene opacity: 1, los demás están ocultos. 
              >
                {/* cinematic push layer */}
                <div className="why-layer absolute inset-0 will-change-transform">
                  <img
                    src={r.poster}
                    alt={r.title}
                    className="h-full w-full object-cover"
                  />

                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={r.poster}
                  >
                    <source src={r.video} type="video/mp4" />
                  </video>
                </div>
                {/* vignette para cinematic */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20" />
              </div>
            ))}

            <div className="absolute bottom-5 left-6 z-10 font-display text-7xl font-black text-white mix-blend-difference">
              0{active + 1}
            </div>

            <div className="absolute right-6 top-6 z-10 text-xs uppercase tracking-widest text-white/70 mix-blend-difference">
              0{active + 1} / 04
            </div>
          </div>
        </div>

        {/* SCROLLING TEXT */}
        {/* 
          Derecha (Scrollable): Una lista de textos largos. Cada bloque de texto (why-block) actúa como un "trigger".
          Cuando un bloque llega al centro de la pantalla, actualiza el estado active, cambiando el video de la izquierda.
        */}
        <div>
          {rows.map((r, i) => (
            <div key={i} className="why-block flex min-h-[75vh] flex-col justify-center">
              <div className="mb-6 aspect-video overflow-hidden rounded-3xl bg-white/5 md:hidden">
                {/* will-change-transform prepara la cpu para animaciones continuas */}
                <div className="why-layer h-full w-full will-change-transform">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline poster={r.poster}
                  >
                    <source src={r.video} type="video/mp4" />
                  </video>
                </div>
              </div>

              <span className="font-display text-sm font-black text-accent">0{i + 1}</span>

              <h3
                className={`
                  mt-2 font-display text-3xl font-black uppercase leading-tight tracking-tight transition-colors duration-500 md:text-5xl 
                  ${active === i
                    ? "text-white"
                    : "text-white/25"
                  }`
                }
              >
                {r.title}
              </h3>

              <p
                className={`mt-4 max-w-md text-white/70 transition-all duration-500 
                  ${active === i
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-40"
                  }`
                }
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs