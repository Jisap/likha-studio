export const DesignIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-accent">
        <defs>
            <filter id="grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
            </filter>
        </defs>
        {/* Forma geométrica sólida con textura interna */}
        <rect x="16" y="16" width="32" height="32" rx="4" fill="currentColor" filter="url(#grain)" />
        <circle cx="32" cy="32" r="8" fill="black" /> {/* Contraste negativo */}
    </svg>
);