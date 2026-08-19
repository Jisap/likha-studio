"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

/**
 * 
 * Componente que muestra una pantalla de carga a pantalla completa con un 
 * contador de 0 a 100, una barra de progreso y que luego se desliza hacia arriba
 * para revelar el contenido de la página.
 * 
 */

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline();                                // Todo pasa en un timeline de 5 pasos encadenados

    tl.to(counter, {                                           // 1º contador de 0 a 100 en 2 segundos
      val: 100,                                                // counter no es un elemento del DOM, es un objeto js. GSAP puede animar cualquier prop numérica de cualquier objeto
      duration: 2,                                             // Aquí se anima el counter.val de 0 a 100 en 2 segundos
      ease: "power2.inOut",                                    // y en cada frame (onUpdate) se actualiza el estado del count con un valor redondeado -> re-renderizado del div con el nuevo número
      onUpdate: () => setCount(Math.round(counter.val)),
    })
      .to(".loader-bar", { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0)                               // 2º barra de progreso (en paralelo): el div con "loader-bar" crecera de x-0 a x-100 en 2 sec, el tercer argumento "0" significa que empieze en el segundo 0 del timeline
      .to(".loader-num, .loader-label", { y: -40, opacity: 0, duration: 0.6, ease: "power3.in" }, "+=0.2")  // 3º El número y la etiqueta desaparecen
      .to(root.current, {                                                                                   // 4º Toda la pantalla se desliza hacia arriba
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      }, "-=0.2") // Empieza 0,2 sec antes de que termine el paso anterior
      .set(root.current, { display: "none" });                                                              // 5º Limpieza final
  });

  return (
    <div ref={root} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#050506]">
      <div className="loader-label mb-6 text-sm uppercase tracking-[0.3em] text-white/50">
        LIKHA Studio
      </div>
      <div className="loader-num font-display text-[22vw] font-black leading-none text-white md:text-[16vw]">
        {count}
      </div>
      <div className="mt-8 h-[2px] w-56 overflow-hidden bg-white/10">
        <div className="loader-bar h-full w-full origin-left scale-x-0 bg-accent" />
      </div>
    </div>
  );
}