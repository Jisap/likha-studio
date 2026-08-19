"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);


/**
 * 
 * Es un componente de React que crea una animación de "revelado" cuando el elemento entra en la vista del usuario al hacer scroll.
 * 
 */

export default function Reveal({
  children,       // Contenido a revelar
  delay = 0,      // Demora antes de la animación
  className = ""  // Clases adicionales de Tailwind
}: {
  children: ReactNode;
  delay?: number;
  className?: string
}) {

  const ref = useRef<HTMLDivElement>(null); // Referencia al elemento a revelar

  useGSAP(() => {
    gsap.from(ref.current, {
      y: 50,              // Comienza 50px abajo
      opacity: 0,         // Totalmente transparente
      filter: "blur(12px)", // Con desenfoque de 12px
      rotateX: 8,         // Rotación en eje X de 8 grados
      duration: 1.2,      // Duración de 1.2 segundos
      delay,              // Retraso personalizado
      ease: "power4.out", // Curva de aceleración suave
      scrollTrigger: {
        trigger: ref.current,        // Elemento que dispara la animación
        start: "top 90%",            // Cuando el top del elemento está al 90% de la ventana
        toggleActions: "restart none none reverse" // Comportamiento del trigger
      },
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {children}
    </div>);
}