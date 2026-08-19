"use client";

import { useRouter } from "next/navigation";
import { gsap } from "gsap";

/**
 * Crea una transición de página con un efecto de "círculo expansivo" (circle reveal).
 */

export default function TransitionLink({
  href,
  color = "#3d5afe",
  children,
  className = "",
}: {
  href: string;               // URL de destino (requerido)
  color?: string;             // Color del círculo (default: "#3d5afe" - azul)
  children: React.ReactNode;  // Contenido del botón/enlace
  className?: string;         // Clases CSS opcionales
}) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();    // Evita la navegación normal del enlace
    e.stopPropagation();   // Evita que el evento burbujee

    const size = Math.max(window.innerWidth, window.innerHeight) * 2.2; // Calcula el tamaño del círculo

    const circle = document.createElement("div");                       // Crea el elemento del círculo
    Object.assign(circle.style, {                                        // Asigna estilos al círculo
      position: "fixed",                                                   // Posición fija respecto al viewport
      left: `${e.clientX - size / 2}px`,                                   // Centrado en X del click
      top: `${e.clientY - size / 2}px`,                                    // Centrado en Y del click
      width: `${size}px`,                                                  // Tamaño calculado
      height: `${size}px`,                                                 // Tamaño calculado
      borderRadius: "50%",                                                 // ¡Lo hace circular!
      background: color,                                                   // Color personalizado
      zIndex: "9999",                                                      // Por encima de todo
      transform: "scale(0)",                                               // Comienza invisible (escala 0)
      pointerEvents: "none",                                               // No interfiere con clicks
      willChange: "transform",                                             // Optimización de performance
    });
    document.body.appendChild(circle);                                     // Añade el círculo al DOM

    gsap.to(circle, {
      scale: 1,                                                            // De 0 a 1 (tamaño completo)
      duration: 1.2,                                                       // 1.2 segundos
      ease: "power2.inOut",                                                // Aceleración suave al inicio y final
      onComplete: () => {                                                  // Cuando termina la expansión...
        router.push(href);                                                 // Navega a la nueva página

        gsap.to(circle, {                                                  // Segunda animación: desvanecer
          opacity: 0,                                                      // Se vuelve transparente
          duration: 0.9,                                                   // 0.9 segundos
          delay: 0.5,                                                      // Espera 0.5s después de navegar
          ease: "power2.out",
          onComplete: () => circle.remove(),                               // Elimina el elemento del DOM
        });
      }
    })
  };

  return (
    <button
      onClick={onClick}
      className={className}
      data-cursor="hover"  // Atributo personalizado para cursor personalizado
    >
      {children}
    </button>
  );
}