"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUOTE = "They didn't just build a website. They built how our business runs online. Every detail matched the vision.";

const Testimonial = () => {

  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const words = gsap.utils.toArray<HTMLElement>(".tst-word");

    gsap.from(words, {
      opacity: 0.1,        // Estado inicial: casi invisible 
      y: 10,               // Estado inicial: 10px abajo
      stagger: 0.04,       // Retraso entre cada palabra 
      ease: "none",        // Sin aceleración/desaceleración
      scrollTrigger: {
        trigger: ref.current,     // Elemento que activa la animación
        start: "top 75%",         // Cuando el top del elemento llega al 75% de la ventana
        end: "bottom 65%",        // Hasta que el bottom llega al 65%
        scrub: true,              // Sincroniza con el scroll
      },
    });
  }, { scope: ref });

  // El método .from() anima DESDE un valor inicial HASTA el valor actual del elemento.
  //
  // rango_total = valor_final - valor_inicial
  // rango_total = 1.0 - 0.1
  // rango_total = 0.9  ← ¡Aquí está!
  // 
  // opacidad_actual = valor_inicial + (progreso × rango_total)
  // opacidad_actual = 0.1 + (progreso × 0.9)

  // La opacidad esta ligada al scroll y variara de 0.1 a 1
  // según el progreso que tenga el scroll
  // y el stagger hara que cada palabra se anime de manera individual
  // con un pequeño retraso entre cada palabra

  return (
    <section ref={ref} className="px-6 py-28 md:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <span className="font-display text-7xl font-black text-accent">&ldquo;</span>

        <p className="font-display text-2xl font-black uppercase leading-snug tracking-tight md:text-4xl">
          {/* Cada palabra es un elemento independiente que puede ser animado por separado. */}
          {QUOTE.split(" ").map((w, i) => (
            <span key={i} className="tst-word mr-[0.25em] inline-block">
              {w}
            </span>
          ))}
        </p>

        <p className="mt-8 text-sm uppercase tracking-widest text-muted">
          Client Testimonial · 2026
        </p>
      </div>
    </section>
  )
}

export default Testimonial