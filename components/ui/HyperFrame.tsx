"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Efecto de animación de revelación con GSAP ScrollTrigger.
 * 
 * @param children Elementos a animar.
 * @param delay Retraso en la animación.
 * @param className Clases CSS adicionales.
 * @param dir Dirección de la animación.
 */

export default function HyperFrame({
  children,
  delay = 0,
  className = "",
  dir = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  dir?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);

  const clips: Record<string, string> = {
    up: "inset(100% 0% 0% 0%)",                // El elemento existe en el DOM, pero su área visible tiene altura 0. Oculto desde abajo
    down: "inset(0% 0% 100% 0%)",              // Oculto desde arriba
    left: "inset(0% 100% 0% 0%)",              // Oculto desde la derecha
    right: "inset(0% 0% 0% 100%)",             // Oculto desde la izquierda
  };

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      {
        clipPath:
          clips[dir],                          // Estado inicial: El elemento está "cortado" desde la dirección indicada (arriba, abajo, izquierda o derecha),
        scale: 1.08,                         // Empieza un 8% más grande y se encoge a su tamaño real. 
        y: 40,                               // Comienza 40px por debajo de su posición final.
        rotateX: 6                           // El elemento comienza ligeramente inclinado hacia atrás (6 grados).
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",        // Estado final totalmente visible
        scale: 1,                              // Termina en su tamaño original. 
        y: 0,
        rotateX: 0,                            // Al animarse a rotateX: 0, se "endereza" hacia el espectador mientras se revela. 
        duration: 1.3,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" }, // Se activa cuando el elemento está casi entrando por completo
      },
    );
  }, { scope: ref });

  return (
    // Para que no sea un movimiento plano y aburrido, añade una dimensión física: 
    // perspective: Crea el punto de fuga 3D. Define qué tan "lejos" está la cámara virtual.
    <div style={{ perspective: "1400px" }}>
      <div
        ref={ref}
        className={className}
        style={{
          transformStyle: "preserve-3d",       // preserve-3d 
          willChange: "transform, clip-path"   // Optimización de rendimiento, le dice al navegador que estas propiedades cambiarán pronto.
        }}
      >
        {children}
      </div>
    </div>
  );
}