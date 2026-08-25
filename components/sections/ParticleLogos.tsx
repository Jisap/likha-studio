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
  return (
    <div>ParticleLogos</div>
  )
}

export default ParticleLogos