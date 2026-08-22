export const SupportIcon = () => (
    <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-accent">
        {/* Forma principal: arco protector */}
        <path d="M16 32C16 23.2 23.2 16 32 16C40.8 16 48 23.2 48 32"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Forma secundaria: punto de contacto interno */}
        <path d="M24 32C24 27.6 27.6 24 32 24C36.4 24 40 27.6 40 32"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        {/* Línea de conexión vertical */}
        <path d="M32 40V48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);