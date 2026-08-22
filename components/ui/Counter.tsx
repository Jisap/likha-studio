"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Counter = ({
  to,           // Valor final al que debe llegar
  suffix = "",  // Texto adicional (ej: "+", "%", "k")
  duration = 2, // Duración de la animación en segundos
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) => {

  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // GSAP no puede animar directamente el texto de un elemento DOM. En su lugar:
      // - Crea un objeto JavaScript con una propiedad val
      // - Anima esa propiedad numérica
      // - Actualiza manualmente el DOM en cada frame
      const obj = { val: 0 };

      gsap.to(obj, {
        val: to,                // Anima desde 0 hasta el valor 'to'
        duration,               // Duración configurable
        ease: "power2.out",     // Empieza rápido, termina lento
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",     // Se activa cuando el top llega al 85% de la ventana
        },
        onUpdate: () => {
          // Callback en CADA frame de la animación
          // - Lee el valor actual de obj.val (que GSAP está animando)
          // - Lo redondea hacia abajo con Math.floor() (para evitar decimales)
          // - Lo convierte a string y añade el sufijo
          // - Actualiza el contenido del <span>
          if (ref.current) {
            ref.current.textContent = Math.floor(obj.val).toString() + suffix;
          }
        },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref}>
      0{suffix}
    </span>
  )
}

export default Counter