"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedTitle({
  text,
  className = "",
}: {
  text: string;      // El texto a animar (requerido)
  className?: string // Clases CSS opcionales
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.from(".at-char", {  // Selecciona TODOS los elementos con clase .at-char
        yPercent: 120,         // Comienzan 120% abajo de su posición
        rotateZ: 8,            // Rotación de 8 grados en eje Z
        opacity: 0,            // Totalmente transparentes
        stagger: {
          each: 0.02,          // 0.02s de retraso entre cada carácter
          from: "random"       // ¡Orden aleatorio! No secuencial
        },
        duration: 0.9,         // Duración más rápida (0.9s)
        ease: "power4.out",    // Aceleración suave
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",    // Se activa un poco antes (88%)
          toggleActions: "restart none none reverse",
        },
      });
    },
    { scope: ref },  // Limita la búsqueda de ".at-char" solo dentro de ref
  );

  return (
    <h2 ref={ref} className={className}>
      {text.split(" ").map((word, wi) => (
        <span
          key={wi}
          className="mr-[0.25em] inline-block"
        >
          {word.split("").map((ch, ci) => (
            <span key={ci} className="inline-block overflow-hidden align-top">
              <span className="at-char inline-block will-change-transform">
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </h2>
  );
}