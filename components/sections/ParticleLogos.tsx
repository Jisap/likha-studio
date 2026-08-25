"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";

// Lista de redes sociales con sus identificadores y URLs
const socials = [
  { name: "GitHub", slug: "github", url: "https://github.com/yourusername" },
  { name: "Facebook", slug: "facebook", url: "https://facebook.com/yourpage" },
  { name: "Instagram", slug: "instagram", url: "https://instagram.com/yourpage" },
  { name: "TikTok", slug: "tiktok", url: "https://tiktok.com/@yourpage" },
];

// Número total de partículas en el sistema
const COUNT = 7000;

/**
 * Convierte una imagen (logo) en un array de coordenadas 3D que representan partículas posicionadas 
 * donde hay píxeles visibles en la imagen.
 */
const useLogoTargets = (url: string) => {
  const [targets, setTargets] = useState<Float32Array | null>(null); // Almacena las posiciones finales de las partículas

  useEffect(() => {
    let cancelled = false;
    const img = new Image();                                             // Crea una nueva instancia de Image para cargar la imagen.
    img.crossOrigin = "anonymous";                                       // Permite cargar imágenes desde un dominio diferente al de la aplicación
    img.src = url;                                                       // Establece la URL de la imagen
    img.onload = () => {                                                 // Cuando la imagen se carga correctamente
      const size = 120;                                                  // Define el tamaño de la imagen que se va a procesar (optimización: resolución baja)
      const cv = document.createElement("canvas");                       // Crea un nuevo canvas para procesar la imagen
      cv.width = size;                                                   // Establece el ancho del canvas
      cv.height = size;                                                  // Establece el alto del canvas
      const ctx = cv.getContext("2d")!;                                  // Obtiene el contexto 2D del canvas
      ctx.drawImage(img, 0, 0, size, size);                              // Dibuja la imagen en el canvas escalada al tamaño definido
      const data = ctx.getImageData(0, 0, size, size).data;              // Obtiene los datos de píxeles (array RGBA plano)

      const valid: number[] = [];                                        // Array para almacenar las coordenadas válidas (píxeles visibles)
      for (let y = 0; y < size; y++) {                                   // Itera sobre las filas del canvas
        for (let x = 0; x < size; x++) {                                 // Itera sobre las columnas del canvas
          // Verifica el canal alpha (índice +3): si > 128, el píxel es más del 50% opaco
          if (data[(y * size + x) * 4 + 3] > 128) {
            // Convierte coordenadas 2D a espacio 3D normalizado [-2.25, 2.25]
            // El signo negativo en Y invierte el eje porque canvas tiene Y hacia abajo
            valid.push((x / size - 0.5) * 4.5, -(y / size - 0.5) * 4.5);
          }
        }
      }

      // Crea un array tipado para almacenar las posiciones 3D de todas las partículas (x, y, z por partícula)
      const arr = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i++) {                                  // Itera sobre el número de partículas
        // Selecciona aleatoriamente una posición válida del logo
        // valid.length / 2 porque cada posición tiene 2 valores (x, y)
        const idx = Math.floor(Math.random() * (valid.length / 2)) * 2;

        // Asigna coordenada X con pequeño ruido aleatorio (±0.03) para dispersión natural
        arr[i * 3] = valid[idx] + (Math.random() - 0.5) * 0.06;
        // Asigna coordenada Y con pequeño ruido aleatorio (±0.03)
        arr[i * 3 + 1] = valid[idx + 1] + (Math.random() - 0.5) * 0.06;
        // Asigna coordenada Z aleatoria (±0.25) para efecto de profundidad 3D
        arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      }

      // Solo actualiza el estado si el componente aún está montado
      if (!cancelled) setTargets(arr);
    };

    // Cleanup: evita actualizar estado si el componente se desmonta antes de cargar la imagen
    return () => {
      cancelled = true;
    };
  }, [url]);

  return targets                                                         // Retorna las coordenadas de las partículas (null hasta que se cargue)
}


/**
 * Crea un sistema de partículas 3D usando Three.js que se mueven desde una posición inicial 
 * aleatoria hacia la forma del logo, con efectos de humo/swirl.
 */
const SmokeLogo = ({ url, morphKey }: { url: string; morphKey: number }) => {
  const targets = useLogoTargets(url);                    // Posiciones objetivo (forma del logo)
  const ref = useRef<THREE.Points>(null);                 // Referencia al objeto Points de Three.js
  const current = useRef<Float32Array>(new Float32Array(COUNT * 3)); // Posiciones actuales interpoladas de cada partícula
  const seed = useRef<Float32Array>(new Float32Array(COUNT));        // Valores aleatorios únicos por partícula para animación orgánica
  const dispersion = useRef(1);                           // Controla la intensidad del efecto swirl/dispersión (decae de 1 a 0)

  // Crea partículas distribuidas en un círculo/radio aleatorio (posición inicial dispersa)
  // Cada partícula tiene un seed único para crear movimientos orgánicos diferentes
  // Las posiciones iniciales están lejos del centro para el efecto de "ensamblaje"
  const geo = useMemo(() => {                             // Memoriza la geometría para evitar recrearla en cada render
    const g = new THREE.BufferGeometry();                   // Crea una nueva geometría buffer
    const start = new Float32Array(COUNT * 3);              // Array para almacenar las posiciones iniciales

    for (let i = 0; i < COUNT; i++) {                       // Itera sobre el número de partículas
      const a = Math.random() * Math.PI * 2;                // Ángulo aleatorio [0, 2π]
      const r = 2 + Math.random() * 2.5;                    // Radio aleatorio entre 2 y 4.5 unidades

      // Posición inicial en coordenadas polares convertidas a cartesianas
      start[i * 3] = Math.cos(a) * r;                       // X
      start[i * 3 + 1] = Math.sin(a) * r;                   // Y
      start[i * 3 + 2] = (Math.random() - 0.5) * 2;         // Z aleatorio entre -1 y 1

      // Seed único para cada partícula (usado para crear fases de animación diferentes)
      seed.current[i] = Math.random() * 100;
    }

    current.current.set(start);                             // Copia posiciones iniciales al array de posiciones actuales
    // Añade las posiciones como atributo de la geometría
    g.setAttribute("position", new THREE.BufferAttribute(start.slice(), 3));
    return g;                                               // Retorna la geometría
  }, []);

  // Cuando cambia el morphKey (nueva imagen), reinicia la dispersión a 1 para reiniciar la animación
  useEffect(() => {
    dispersion.current = 1;
  }, [morphKey]);

  // En cada frame (~60fps), actualiza la posición de las partículas hacia el objetivo
  useFrame((state) => {
    if (!ref.current || !targets) return;                                       // Si no hay referencia o objetivos aún, no hacer nada

    const pos = ref.current.geometry.attributes.position.array as Float32Array; // Obtiene el array de posiciones actuales de la geometría
    const time = state.clock.elapsedTime;                                       // Obtiene el tiempo transcurrido desde el inicio

    // Reduce gradualmente la dispersión de 1 hacia 0 (efecto de estabilización)
    // Factor 0.03 crea una transición suave de ~2 segundos
    dispersion.current += (0 - dispersion.current) * 0.03;
    const d = dispersion.current;                                               // Guarda el valor actual de dispersión

    for (let i = 0; i < COUNT; i++) {                                           // Itera sobre cada partícula
      const ix = i * 3;                                                         // Índice base para esta partícula (x, y, z)
      const s = seed.current[i];                                                // Obtiene el seed único de esta partícula

      // Calcula la fuerza de atracción hacia el objetivo
      // Cuando d=1 (inicio): pull = 0.0075 (muy lento)
      // Cuando d=0 (final): pull = 0.05 (más rápido)
      // Esto crea efecto de "desaceleración inicial, aceleración final"
      const pull = 0.05 * (1 - d * 0.85);

      // Interpolación lineal progresiva hacia las posiciones objetivo
      // Mueve la posición actual un porcentaje (pull) hacia el target
      current.current[ix] += (targets[ix] - current.current[ix]) * pull;        // X
      current.current[ix + 1] += (targets[ix + 1] - current.current[ix + 1]) * pull; // Y
      current.current[ix + 2] += (targets[ix + 2] - current.current[ix + 2]) * pull; // Z

      // Calcula la intensidad del efecto swirl/humo
      // Cuando d=1: swirl = 2.2 (muy fuerte)
      // Cuando d=0: swirl = 0.7 (sutil)
      const swirl = 0.7 + d * 1.5;

      // Calcula el ángulo de oscilación basado en tiempo y seed único
      // Esto asegura que cada partícula tenga un movimiento diferente
      const ang = time * 0.5 + s;

      // Aplica oscilaciones senoidales sobre las posiciones interpoladas
      // Eje X: combinación de dos ondas con frecuencias diferentes
      pos[ix] = current.current[ix]
        + Math.sin(ang) * 0.16 * swirl           // Oscilación principal en X
        + Math.cos(time * 0.35 + s) * d * 0.6;   // Movimiento secundario que decae con la dispersión

      // Eje Y: frecuencias ligeramente diferentes para crear movimiento orgánico
      pos[ix + 1] = current.current[ix + 1]
        + Math.cos(ang * 1.1) * 0.16 * swirl     // Oscilación principal en Y (frecuencia 10% mayor)
        + Math.sin(time * 0.35 + s) * d * 0.6;   // Movimiento secundario en Y

      // Eje Z: oscilación vertical para efecto 3D
      pos[ix + 2] = current.current[ix + 2]
        + Math.sin(time * 0.9 + s) * 0.22 * swirl; // Oscilación en Z
    }

    // Notifica a Three.js que las posiciones han cambiado y debe re-renderizar
    ref.current.geometry.attributes.position.needsUpdate = true;
    // Rota todo el sistema de partículas suavemente en el eje Y (±7°)
    ref.current.rotation.y = Math.sin(time * 0.2) * 0.12;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        size={0.07}                        // Tamaño base de cada partícula
        color="#9db0ff"                    // Color azul claro lavanda
        sizeAttenuation                    // Las partículas se hacen más pequeñas con la distancia (perspectiva)
        transparent                        // Habilita transparencia
        opacity={0.55}                     // Opacidad del 55%
        depthWrite={false}                 // No escribe en el depth buffer (permite ver partículas detrás)
        blending={THREE.AdditiveBlending}  // Suma los colores de partículas superpuestas (efecto neón/brillante)
      />
    </points>
  );
}

/**
 * Componente wrapper que permite rotar el grupo de partículas arrastrando con el mouse/touch
 */
function DragGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const { gl } = useThree();                                                     // Obtiene el renderer de Three.js

  // Estado del arrastre: activo/inactivo, última posición X, rotación acumulada
  const drag = useRef({ active: false, x: 0, rot: 0 });

  useEffect(() => {
    const el = gl.domElement;                                                    // Elemento DOM del canvas

    // Inicia el arrastre cuando se presiona el botón
    const down = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.x = e.clientX;
    };

    // Actualiza la rotación mientras se arrastra
    const move = (e: PointerEvent) => {
      if (!drag.current.active) return;                                          // Solo si está arrastrando
      // Calcula delta X y lo convierte en rotación (factor 0.005 = sensibilidad)
      drag.current.rot += (e.clientX - drag.current.x) * 0.005;
      drag.current.x = e.clientX;                                                // Actualiza última posición
    };

    // Termina el arrastre al soltar
    const up = () => (drag.current.active = false);

    // Registra event listeners
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);                                // En window para capturar incluso si sale del canvas
    window.addEventListener("pointerup", up);

    // Cleanup: elimina listeners al desmontar
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  // En cada frame, interpola suavemente la rotación actual hacia la rotación deseada
  useFrame(() => {
    if (ref.current) {
      // Factor 0.1 crea una interpolación suave con efecto de inercia
      ref.current.rotation.y += (drag.current.rot - ref.current.rotation.y) * 0.1;
    }
  });

  return <group ref={ref}>{children}</group>;                                    // Wrapper group que contiene las partículas
}

/**
 * Componente principal que muestra la sección de redes sociales con logos de partículas animadas
 */
const ParticleLogos = () => {
  const [active, setActive] = useState(0);                                       // Índice de la red social activa
  const total = socials.length;                                                  // Total de redes sociales disponibles

  // Función para navegar entre redes (dir: -1 = anterior, +1 = siguiente)
  // El operador % crea un ciclo infinito (wrap-around)
  const go = (dir: number) => setActive((p) => (p + dir + total) % total);

  return (
    <section id="socials" className="px-6 py-28 md:px-10">
      {/* Encabezado de la sección */}
      <div className="mb-4 text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">Connect</p>
        <h2 className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl">Follow The Studio</h2>
      </div>

      {/* Contenedor del Canvas 3D */}
      <div className="relative mx-auto h-[440px] w-full max-w-3xl" data-cursor="hover">
        <Canvas camera={{ position: [0, 0, 6], fov: 42 }}>                       {/* Cámara posicionada en Z=6 con FOV 42° */}
          <DragGroup>                                                            {/* Wrapper que permite rotación manual */}
            {/* Logo de partículas: URL del icono desde CDN Simple Icons (blanco) */}
            <SmokeLogo
              url={`https://cdn.simpleicons.org/${socials[active].slug}/ffffff`}
              morphKey={active}                                                  // Cambia para reiniciar animación
            />
          </DragGroup>
        </Canvas>

        {/* Indicador visual de red social activa (glassmorphism) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-4 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-6 py-2 backdrop-blur-sm">
            <span className="text-xs uppercase tracking-[0.3em] text-white/50">0{active + 1}</span>
            <span className="font-display text-lg font-black uppercase tracking-wide text-white">{socials[active].name}</span>
          </div>
        </div>
      </div>

      {/* Controles de navegación */}
      <div className="mt-8 flex items-center justify-center gap-6">
        {/* Botón anterior */}
        <button
          onClick={() => go(-1)}
          data-cursor="hover"
          aria-label="Previous"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Indicadores de puntos (dots) */}
        <div className="flex gap-2">
          {socials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              data-cursor="hover"
              aria-label={`Logo ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-accent" : "w-2 bg-white/25"
                }`}
            />
          ))}
        </div>

        {/* Botón siguiente */}
        <button
          onClick={() => go(1)}
          data-cursor="hover"
          aria-label="Next"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-accent hover:bg-white/5"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Enlace externo a la red social activa */}
      <a
        href={socials[active].url}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        className="mx-auto mt-8 block w-fit rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-white/85"
      >
        Visit {socials[active].name}
      </a>
    </section>
  );
}

export default ParticleLogos;