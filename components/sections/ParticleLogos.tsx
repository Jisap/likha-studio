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

const ParticleLogos = () => {
    return (
        <div>ParticleLogos</div>
    )
}

export default ParticleLogos