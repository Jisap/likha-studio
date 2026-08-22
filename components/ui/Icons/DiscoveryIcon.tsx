export const DiscoveryIcon = () => (
  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 text-accent">
    {/* Círculo imperfecto + línea diagonal = exploración orgánica */}
    <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8z"
      stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M20 44L44 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);