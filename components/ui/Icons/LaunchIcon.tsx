export const LaunchIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-accent">
        {/* Líneas de propulsión diagonales */}
        <path d="M18 46L32 18L46 46" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Punto focal / chispa inicial */}
        <circle cx="32" cy="24" r="3" fill="currentColor" />
        {/* Base horizontal sutil */}
        <path d="M24 50H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
    </svg>
);