"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CurtainSection = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        {
          clipPath: "inset(15% 4% 0% 4% round 24px)",                        // Estado inicial: recortado por los bordes con esquinas redondeadas
          scale: 0.94,                                                      // Empieza un 6% más pequeño para generar sensación de profundidad
          opacity: 0.6,                                                     // Opacidad parcial de entrada
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",                         // Estado final: desplegado a ancho completo sin recorte
          scale: 1,                                                         // Vuelve a su tamaño normal (100%)
          opacity: 1,                                                       // Totalmente visible
          ease: "none",                                                     // Lineal, ya que el scrub controla la suavidad del avance
          scrollTrigger: {
            trigger: ref.current,                                           // Elemento que activa la animación
            start: "top 90%",                                               // Comienza cuando el inicio de la sección alcanza el 90% del viewport
            end: "top 25%",                                                 // Finaliza cuando el inicio de la sección llega al 25% del viewport
            scrub: 1.2,                                                     // Sincroniza la animación con el scroll añadiendo 1.2s de inercia/suavizado
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default CurtainSection;