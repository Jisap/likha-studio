"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * 
 *  Este componente implementa Scroll Suave usando Lenis,
 *  integrado con el sistema de renderizado de GSAP (Ticker) y ScrollTrigger,
 *  y gestiona los eventos de scroll de anclas.
 *  
 *  Este componente sincroniza tres sistemas:
 *  - Lenis intercepta el scroll nativo y lo suaviza con interpolación lerp.
 *  - gsap.ticker es el reloj interno de GSAP.
 *  - ScrollTrigger necesita saber cuando hay scroll para recalcular que animaciones disparar
 * 
 */

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const content = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //2º GSAP se convierte en el reloj maestro de Lenis
    function update(time: number) {                              // update recibe time que lo proporciona GSAP (paso 1)
      lenisRef.current?.lenis?.raf(time * 1000);                 // recibe el tiempo en ms y se lo pasa a Lenis
    }

    gsap.ticker.add(update);                                    // Al agregar update al ticker de GSAP, Lenis se ejecuta en cada frame de GSAP
    gsap.ticker.lagSmoothing(0);                                // Desactivamos el suavizado de GSAP para que Lenis maneje el suavizado

    const lenis = lenisRef.current?.lenis;
    lenis?.on("scroll", ScrollTrigger.update);                  // 3º Cada vez que Lenis actualiza la posición del scroll, debe notificar a ScrollTrigger para que recalcule las posiciones de los triggers


    const skewTo = gsap.quickTo(content.current, "skewY", { duration: 0.5, ease: "power3.out" });  // 4º Función que aplica un skewY al contenido
    lenis?.on("scroll", (e: { velocity: number }) => {                                             // Cada vez que Lenis actualiza la posición del scroll
      const v = gsap.utils.clamp(-4, 4, e.velocity * 0.25);                                        // Calcula la velocidad del scroll y la limita a un rango entre -4 y 4
      skewTo(v);                                                                                   // Aplica el skewY al contenido
    });

    const onClick = (ev: MouseEvent) => {                                                          // 5º Scroll suave a anclas <a href="#section">
      const target = ev.target as HTMLElement;
      const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;                     // Intercepta clicks en enlaces con href="#..."
      if (!link) return;
      const id = link.getAttribute("href");                                                        // Obtiene el href del enlace
      if (!id || id === "#") return;
      const el = document.querySelector(id);                                                       // Busca el elemento con el id
      if (!el) return;
      ev.preventDefault();
      lenisRef.current?.lenis?.scrollTo(el as HTMLElement, {                                       // Scroll suave al elemento encontrado usando lenis                                                
        offset: -40,
        duration: 1.6,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,   // 1º Lenis deja de manejar su propio raf (requesAnimationFrame), lo hace gsap
        lerp: 0.1,        // factor de interpolación lineal, cuanto más bajo más retraso suave tiene el scroll
        smoothWheel: true // Le dice a Lenis que controle el scroll de toda la ventana no de un contenedor interno
      }}
      ref={lenisRef}
    >
      <div ref={content} className="will-change-transform">
        {children}
      </div>
    </ReactLenis>
  );
}