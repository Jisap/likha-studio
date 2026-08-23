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
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
  };

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { clipPath: clips[dir], scale: 1.08, y: 40, rotateX: 6 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        y: 0,
        rotateX: 0,
        duration: 1.3,
        delay,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%" }, // Se activa cuando el elemento está casi entrando por completo
      },
    );
  }, { scope: ref });

  return (
    <div style={{ perspective: "1400px" }}>
      <div ref={ref} className={className} style={{ transformStyle: "preserve-3d", willChange: "transform, clip-path" }}>
        {children}
      </div>
    </div>
  );
}