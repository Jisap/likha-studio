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
        { clipPath: "inset(100% 0% 0% 0%)" },                               // Estado inicial: totalmente oculto
        {
          clipPath: "inset(0% 0% 0% 0%)",                                   // Estado final: totalmente visible
          duration: 1.2,                                                    // Duración de la animación
          ease: "power4.out",                                               // Curva de aceleración (suave)
          scrollTrigger: { trigger: ref.current, start: "top 80%" },        // Se activa cuando el elemento entra en el viewport
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default CurtainSection