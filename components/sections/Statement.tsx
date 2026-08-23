"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Declaración visual de marca con parallax multicapa divergente.
//
// Al hacer scroll a través de la sección, se ejecuta una coreografía sincronizada de tres capas:
// Fondo: La imagen de fondo se desplaza verticalmente hacia arriba (yPercent: -12).
// Línea 1 ("Stand Out"): Se desplaza sutilmente hacia la izquierda (xPercent: -3).
// Línea 2 ("Not Blend In"): Se desplaza sutilmente hacia la derecha (xPercent: +3).

const Statement = () => {

  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(".stmt-bg", {
        yPercent: -12,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
      gsap.to(".stmt-1", {
        xPercent: -3,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
      gsap.to(".stmt-2", {
        xPercent: 3,
        scrollTrigger: {
          trigger: ref.current,
          scrub: 0.5,
          start: "top bottom",
          end: "bottom top",
        },
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70vh] items-center overflow-hidden py-32"
    >
      {/* Z-0 (Base): Imagen .stmt-bg con h-[130%]. El 30% extra de altura es obligatorio para compensar 
      el desplazamiento yPercent: -12 sin mostrar bordes vacíos. 
      */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/statement.jpg"
          alt=""
          className="stmt-bg h-[130%] w-full object-cover"
        />

        {/* Z-1 (Overlay Base): bg-black/65. Oscurecimiento uniforme para garantizar contraste WCAG AA sobre cualquier imagen. */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Z-2 (Vignette): Gradiente linear vertical from-black/40 via-transparent to-black/40. Protege la legibilidad en los extremos superior e inferior donde el texto gigante (9vw) toca los bordes. */}
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/40" />
      </div>

      {/* Z-10 (Texto): Contenido tipográfico con drop-shadow para separación adicional del fondo. */}
      <h2 className="relative z-10 w-full px-6 font-display text-[9vw] font-black uppercase leading-[0.9] tracking-tighter text-white md:px-10 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
        <span className="stmt-1 block">Stand Out</span>
        <span className="stmt-2 block text-right text-accent drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">Not Blend In</span>
      </h2>
    </section>
  )
}

export default Statement