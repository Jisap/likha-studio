"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const MagneticButton = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {

  const ref = useRef<HTMLButtonElement>(null); // Referencia al botón para poder manipularlo con GSAP.

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Funciones quickTo:
      //  - Crean funciones optimizadas para animar las propiedades x e y
      //  - Son más eficientes que crear nuevas animaciones cada vez
      //  - Duración de 0.6 segundos con suavizado power3
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

      // Funciones move y reset:
      const move = (e: MouseEvent) => {
        const { left, top, width, height } = el.getBoundingClientRect(); // Obtiene las dimensiones y la posición del botón
        xTo((e.clientX - (left + width / 2)) * 0.4);                     // Calcula la posición horizontal y verticaldel mouse relativa al centro del botón y aplica una traslación
        yTo((e.clientY - (top + height / 2)) * 0.4);                     // Se multiplica por 0.4 para que el movimiento sea parcial. (no sigue exactamente al cursor)
      };
      const reset = () => {
        xTo(0);                                                          // Cuando el cursor sale del botón, vuelve suavemente a su posición original (0, 0).
        yTo(0);
      };

      el.addEventListener("mousemove", move);                            // Listeners para que el botón se mueva con el cursor.
      el.addEventListener("mouseleave", reset);                          // Listeners para que el botón vuelva a su posición original
      return () => {
        el.removeEventListener("mousemove", move);                       // Limpia los listeners cuando el componente se desmonta
        el.removeEventListener("mouseleave", reset);
      };
    },
    { scope: ref },                                                      // Scope para que GSAP sepa dónde buscar los elementos
  );

  return (
    <button ref={ref} className={className} data-cursor="hover">
      {children}
    </button>
  )
}

export default MagneticButton