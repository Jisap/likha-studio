"use client";

export default function SpotlightBg() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050506]">
      {/* static ambient glow - walang cursor smoke */}
      <div
        className="absolute right-[-5%] top-1/2 h-200 w-200 -translate-y-1/2 animate-pulse rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(61,90,254,0.35) 0%, rgba(61,90,254,0.1) 45%, transparent 70%)",
          animationDuration: "6s"
        }}
      />
      <div
        className="absolute left-[10%] top-[20%] h-100 w-100 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(120,140,255,0.2) 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[55%] bg-linear-to-r from-black/70 to-transparent" />
    </div>
  );
}