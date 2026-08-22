"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EditorialBreak = () => {

  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".edb-bg", {
        yPercent: -14,  // Mueve la imagen 14% hacia arriba
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,   // Suavizado de 0.5s
          start: "top bottom",    // Empieza cuando el top de la sección llega al bottom de la ventana
          end: "bottom top",      // Termina cuando el bottom de la sección llega al top de la ventana
        },
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-[60vh] items-center overflow-hidden py-28">
      <div className="absolute inset-0 -z-10">
        {/* Capa 1: Imagen de fondo */}
        <img src="/images/editorial.png" alt="" className="edb-bg h-[130%] w-full object-cover" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Capa 2: Texto */}
      <h2 className="relative z-10 w-full px-6 text-center font-display text-3xl font-black uppercase leading-tight tracking-tight text-white md:px-10 md:text-6xl drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        Every Likha build is
        <br />
        <span className="text-accent">documented, polished,</span>
        <br />
        and handed off — yours to keep.
      </h2>
    </section>
  )
}

export default EditorialBreak