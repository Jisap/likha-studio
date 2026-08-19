"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function FloatingPhone() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);

  // Animación suave de levitación continua
  useGSAP(
    () => {
      if (!floatRef.current) return;
      gsap.to(floatRef.current, {
        y: -20,
        rotationZ: 1,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  // Efecto 3D interactivo / Tilt con el mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(phoneRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  };

  const handleMouseLeave = () => {
    if (!phoneRef.current) return;
    gsap.to(phoneRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "1200px" }}
    >
      <div ref={floatRef} className="relative will-change-transform">
        {/* Chasis exterior del teléfono (Phone Frame) */}
        <div
          ref={phoneRef}
          className="relative w-[260px] md:w-[290px] lg:w-[320px] h-[520px] md:h-[580px] lg:h-[640px] rounded-[46px] md:rounded-[50px] p-[9px] md:p-[10px] bg-[#1c1c1e] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.3)] transition-shadow duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Botones físicos laterales */}
          <div className="absolute -left-[3px] top-[120px] w-[3px] h-[28px] bg-white/20 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[160px] w-[3px] h-[48px] bg-white/20 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[215px] w-[3px] h-[48px] bg-white/20 rounded-l-sm" />
          <div className="absolute -right-[3px] top-[165px] w-[3px] h-[65px] bg-white/20 rounded-r-sm" />

          {/* Pantalla OLED */}
          <div className="relative h-full w-full rounded-[38px] md:rounded-[42px] bg-gradient-to-b from-[#111113] via-[#0d0d0f] to-[#08080a] overflow-hidden flex flex-col justify-between p-5 md:p-6 border border-white/5 shadow-inner">
            {/* Top Island & Status */}
            <div className="relative w-full flex justify-between items-center z-20">
              <span className="text-[11px] text-white/40 font-medium tracking-tight">9:41</span>

              {/* Dynamic Island */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 h-[22px] w-[80px] md:w-[92px] bg-black rounded-full border border-white/10 flex items-center justify-between px-2.5">
                <div className="h-2 w-2 rounded-full bg-[#111] border border-white/10" />
                <div className="h-2 w-2 rounded-full bg-black flex items-center justify-center">
                  <div className="h-1 w-1 rounded-full bg-blue-500/80" />
                </div>
              </div>

              {/* Indicadores de estado derecha */}
              <div className="flex items-center gap-1 opacity-40 text-white">
                <div className="flex gap-0.5 items-end h-2">
                  <div className="w-[2.5px] h-1 bg-current rounded-xs" />
                  <div className="w-[2.5px] h-1.5 bg-current rounded-xs" />
                  <div className="w-[2.5px] h-2 bg-current rounded-xs" />
                </div>
                <div className="w-3.5 h-2 border border-current rounded-xs p-[1px] ml-1">
                  <div className="h-full w-2 bg-current rounded-xs" />
                </div>
              </div>
            </div>

            {/* Contenido Central: Radial Concentric Rings con Glowing Dot */}
            <div className="relative my-auto flex flex-col items-center justify-center py-4">
              {/* Círculos concéntricos del diseño del instructor */}
              <div className="relative flex items-center justify-center w-40 h-40 md:w-48 md:h-48 mb-4">
                {/* Anillo exterior */}
                <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
                {/* Anillo medio */}
                <div className="absolute inset-6 md:inset-7 rounded-full border border-white/[0.12]" />
                {/* Anillo interior */}
                <div className="absolute inset-12 md:inset-14 rounded-full border border-white/[0.18]" />
                
                {/* Punto blanco brillante central con glow */}
                <div className="relative z-10 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.9),0_0_40px_rgba(255,255,255,0.4)]" />
              </div>

              {/* Título y subtítulo central */}
              <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight text-center">
                Creative
              </h3>
              <p className="mt-1.5 text-xs text-white/50 text-center max-w-[180px] leading-relaxed">
                Design experiences that feel alive.
              </p>
            </div>

            {/* Botones inferiores: Motion / Digital */}
            <div className="grid grid-cols-2 gap-2.5 z-20 pb-0.5">
              <div className="py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-center backdrop-blur-md">
                <span className="text-xs font-medium text-white/80">Motion</span>
              </div>
              <div className="py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/10 text-center backdrop-blur-md">
                <span className="text-xs font-medium text-white/80">Digital</span>
              </div>
            </div>

            {/* Reflejo de cristal */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.07]" />
          </div>
        </div>
      </div>
    </div>
  );
}
