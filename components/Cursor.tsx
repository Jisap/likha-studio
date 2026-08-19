"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/**
 * 
 * Este componente reemplaza el cursor del sistema por un div que sigue el ratón,
 * y cambia de icono según sobre que elemento pasa por encima.
 * Oculta el cursor nativo solo en dispositivos con puntero preciso (mouse), no en táctiles.
 * 
 */

export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);                                     // Referencia al contenedor del cursor
  const [pointing, setPointing] = useState(false);                               // Estado que indica si el cursor está sobre un elemento interactivo

  useGSAP(() => {
    const el = wrap.current;                                                   // Obtiene el elemento del cursor
    if (!el) return;
    // En lugar de usar gsap.to(el, {x: e.clientX}) 
    // en cada evento de mouse (carisimo)
    // quiclTo crea una función reutilizable optimizada 
    // para actualizaciones de alta frecuencia
    const xTo = gsap.quickTo(el, "x", { duration: 0.18, ease: "power3.out" }); // Función que mueve el cursor a la posición x
    const yTo = gsap.quickTo(el, "y", { duration: 0.18, ease: "power3.out" }); // Función que mueve el cursor a la posición y

    const move = (e: MouseEvent) => {                                          // Cada vez que el mouse se mueve se ejecuta esta función
      xTo(e.clientX);                                                          // Mueve el cursor a la posición x
      yTo(e.clientY);                                                          // Mueve el cursor a la posición y
    };
    const over = (e: MouseEvent) => {                                          // Detección del hover interactivo
      const t = e.target as HTMLElement;                                       // Obtiene el elemento sobre el que se encuentra el cursor
      setPointing(!!t.closest("[data-cursor='hover'], a, button"));            // Si el elemento está dentro de alguno de los selectores entonces se cambia el estado a true -> se rerenderiza el svg (flecha -> mano)
    };
    const down = () => gsap.to(el, { scale: 0.8, duration: 0.12 });            // Cuando el mouse se presiona reduce el tamaño del cursor
    const up = () => gsap.to(el, { scale: 1, duration: 0.2 });                 // Cuando el mouse se suelta aumenta el tamaño del cursor

    // Se añaden los event listeners
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  });

  return (
    <div
      ref={wrap}
      className="pointer-events-none fixed left-0 top-0 z-100 max-md:hidden"
      style={{ willChange: "transform" }}
    >
      {pointing  // Si poiting es true renderiza el svg de la mano, si es false renderiza el svg de la flecha
        ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ transform: "translate(-6px, -2px)" }}>
            <path d="M9 11V5.5a1.5 1.5 0 013 0V11m0-1.5v-1a1.5 1.5 0 013 0V11m0-.5a1.5 1.5 0 013 0V15a5 5 0 01-5 5h-1.5a5 5 0 01-4.3-2.5l-1.6-2.8a1.4 1.4 0 012.2-1.7l1 1V7a1.5 1.5 0 013 0v4" fill="#ffffff" stroke="#3d5afe" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ transform: "translate(-2px, -2px)" }}>
            <path d="M5 3l14 8-6 1.5L9.5 18 5 3z" fill="#ffffff" stroke="#3d5afe" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        )}
    </div>
  );
}