"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const socials = [
  { name: "GitHub", slug: "github", url: "https://github.com/yourusername" },
  { name: "Facebook", slug: "facebook", url: "https://facebook.com/yourpage" },
  { name: "Instagram", slug: "instagram", url: "https://instagram.com/yourpage" },
  { name: "TikTok", slug: "tiktok", url: "https://tiktok.com/@yourpage" },
];

const COUNT = 7000;

// Convierte una imagen (logo) en un array de coordenadas 3D que representan partículas posicionadas 
// donde hay píxeles visibles en la imagen.
const useLogoTargets = (url: string) => {
  const [targets, setTargets] = useState<Float32Array | null>(null); // Almacena las posiciones finales de las partículas

  useEffect(() => {
    let cancelled = false;
    const img = new Image();                                             // Crea una nueva instancia de Image para cargar la imagen.
    img.crossOrigin = "anonymous";                                       // Permite cargar imágenes desde un dominio diferente al de la aplicación
    img.src = url;                                                       // Establece la URL de la imagen
    img.onload = () => {                                                 // Cuando la imagen se carga correctamente
      const size = 120;                                                  // Define el tamaño de la imagen que se va a procesar
      const cv = document.createElement("canvas");                       // Crea un nuevo canvas para procesar la imagen
      cv.width = size;                                                   // Establece el ancho del canvas
      cv.height = size;                                                  // Establece el alto del canvas
      const ctx = cv.getContext("2d")!;                                  // Obtiene el contexto 2D del canvas
      ctx.drawImage(img, 0, 0, size, size);                              // Dibuja la imagen en el canvas
      const data = ctx.getImageData(0, 0, size, size).data;              // Obtiene los datos de la imagen

      const valid: number[] = [];                                        // Array para almacenar las coordenadas de las partículas
      for (let y = 0; y < size; y++) {                                   // Itera sobre las filas del canvas
        for (let x = 0; x < size; x++) {                                 // Itera sobre las columnas del canvas
          if (data[(y * size + x) * 4 + 3] > 128) {                      // Si el píxel es visible
            valid.push((x / size - 0.5) * 4.5, -(y / size - 0.5) * 4.5); // Añade las coordenadas del píxel al array
          }
        }
      }

      const arr = new Float32Array(COUNT * 3);                           // Crea un array de floats para almacenar las coordenadas de las partículas
      for (let i = 0; i < COUNT; i++) {                                  // Itera sobre el número de partículas
        const idx = Math.floor(Math.random() * (valid.length / 2)) * 2;  // Obtiene un índice aleatorio para el array valid
        arr[i * 3] = valid[idx] + (Math.random() - 0.5) * 0.06;          // Añade la coordenada x del píxel al array
        arr[i * 3 + 1] = valid[idx + 1] + (Math.random() - 0.5) * 0.06;  // Añade la coordenada y del píxel al array
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;                    // Añade la coordenada z del píxel al array
      }
      if (!cancelled) setTargets(arr);                                   // Almacena las coordenadas de las partículas
    };
    return () => {
      cancelled = true;
    };
  }, [url]);

  return targets                                                         // Retorna las coordenadas de las partículas
}


/**
 *  Crea un sistema de partículas 3D usando Three.js que se mueven desde una posición inicial 
 * aleatoria hacia la forma del logo, con efectos de humo/swirl.
 * 
 */
const SmokeLogo = ({ url, morphKey }: { url: string; morphKey: number }) => {
  const targets = useLogoTargets(url);                    // Posiciones objetivo (forma del logo)
  const ref = useRef<THREE.Points>(null);                 // Referencia al objeto Points
  const current = useRef<Float32Array>(...);              // Posiciones actuales interpoladas
  const seed = useRef<Float32Array>(...);                 // Valores aleatorios únicos por partícula
  const dispersion = useRef(1);                           // Controla la dispersión inicial

  // Crea partículas distribuidas en un círculo/radio aleatorio (posición inicial dispersa)
  // Cada partícula tiene un seed único para crear movimientos orgánicos diferentes
  // Las posiciones iniciales están lejos del centro para el efecto de "ensamblaje"

  const geo = useMemo(() => {                             // Memoriza la geometría para evitar recrearla en cada render
    const g = new THREE.BufferGeometry();                   // Crea una nueva geometría
    const start = new Float32Array(COUNT * 3);              // Array para almacenar las posiciones iniciales
    for (let i = 0; i < COUNT; i++) {                       // Itera sobre el número de partículas
      const a = Math.random() * Math.PI * 2;                // Ángulo aleatorio
      const r = 2 + Math.random() * 2.5;                    // Radio entre 2 y 4.5
      start[i * 3] = Math.cos(a) * r;                       // X
      start[i * 3 + 1] = Math.sin(a) * r;                   // Y
      start[i * 3 + 2] = (Math.random() - 0.5) * 2;         // Z
      seed.current[i] = Math.random() * 100;                // Seed único para animación
    }
    current.current.set(start);                             // Copia posiciones iniciales
    g.setAttribute("position", new THREE.BufferAttribute(start.slice(), 3));  // Añade las posiciones al atributo de posición de la geometría
    return g;                                               // Retorna la geometría
  }, []);

  // Cuando cambia el morphKey (nueva imagen), reinicia la dispersión a 1
  useEffect(() => {
    dispersion.current = 1;
  }, [morphKey]);

  // En cada frame, actualiza la posición de las partículas hacia el objetivo
  useFrame((state) => {
    if (!ref.current || !targets) return;                                       // Si no hay referencia o objetivos, no hacer nada
    const pos = ref.current.geometry.attributes.position.array as Float32Array; // Obtiene las posiciones actuales
    const time = state.clock.elapsedTime;                                       // Obtiene el tiempo transcurrido

    dispersion.current += (0 - dispersion.current) * 0.03;                      // Reduce la dispersión gradualmente
    const d = dispersion.current;                                               // Guarda la dispersión actual

    for (let i = 0; i < COUNT; i++) {                                           // Itera sobre el número de partículas
      const ix = i * 3;
      const s = seed.current[i];

      const pull = 0.05 * (1 - d * 0.85);
      current.current[ix] += (targets[ix] - current.current[ix]) * pull;        // Interpolación lineal hacia el objetivo
      current.current[ix + 1] += (targets[ix + 1] - current.current[ix + 1]) * pull;
      current.current[ix + 2] += (targets[ix + 2] - current.current[ix + 2]) * pull;

      const swirl = 0.7 + d * 1.5;  // Más fuerte cuando d es alto
      const ang = time * 0.5 + s;   // Ángulo basado en tiempo + seed

      pos[ix] = current.current[ix]
        + Math.sin(ang) * 0.16 * swirl           // Oscilación X
        + Math.cos(time * 0.35 + s) * d * 0.6;   // Movimiento adicional que decae

      pos[ix + 1] = current.current[ix + 1]
        + Math.cos(ang * 1.1) * 0.16 * swirl     // Oscilación Y (frecuencia diferente)
        + Math.sin(time * 0.35 + s) * d * 0.6;   // Movimiento adicional

      pos[ix + 2] = current.current[ix + 2]
        + Math.sin(time * 0.9 + s) * 0.22 * swirl; // Oscilación Z
    }
    ref.current.geometry.attributes.position.needsUpdate = true;                 // Actualiza la geometría
    ref.current.rotation.y = Math.sin(time * 0.2) * 0.12;                        // Rotación
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.07}
        color="#9db0ff"                   // Azul claro
        sizeAttenuation                   // Tamaño disminuye con distancia
        transparent
        opacity={0.55}
        depthWrite={false}                // No escribe en depth buffer (efecto translúcido)
        blending={THREE.AdditiveBlending} // Suma colores (efecto brillante/neón)
      />
    </points>
  );
}

function DragGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const drag = useRef({ active: false, x: 0, rot: 0 });

  useEffect(() => {
    const el = gl.domElement;
    const down = (e: PointerEvent) => { drag.current.active = true; drag.current.x = e.clientX; };
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.rot += (e.clientX - drag.current.x) * 0.005;
      drag.current.x = e.clientX;
    };
    const up = () => (drag.current.active = false);
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += (drag.current.rot - ref.current.rotation.y) * 0.1;
  });

  return <group ref={ref}>{children}</group>;
}

const ParticleLogos = () => {

  const [active, setActive] = useState(0);
  const total = socials.length;
  const go = (dir: number) => setActive((p) => (p + dir + total) % total);

  return (
    <section id="socials" className="px-6 py-28 md:px-10">
      <div className="mb-4 text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">Connect</p>
        <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl">Follow The Studio</h2>
      </div>

      <div className="relative mx-auto h-[440px] w-full max-w-3xl" data-cursor="hover">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>
          <DragGroup>
            <SmokeLogo url={`https://cdn.simpleicons.org/${socials[active].slug}/ffffff`} morphKey={active} />
          </DragGroup>
        </Canvas>

        <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-6 py-2 backdrop-blur-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">0{active + 1}</span>
            <span className="font-display text-lg font-black uppercase tracking-wide text-white">{socials[active].name}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button onClick={() => go(-1)} data-cursor="hover" aria-label="Previous" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <div className="flex gap-2">
          {socials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} data-cursor="hover" aria-label={`Logo ${i + 1}`} className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-accent" : "w-2 bg-white/25"}`} />
          ))}
        </div>
        <button onClick={() => go(1)} data-cursor="hover" aria-label="Next" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <a href={socials[active].url} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="mx-auto mt-8 block w-fit rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white/85">
        Visit {socials[active].name}
      </a>
    </section>
  );
}

export default ParticleLogos