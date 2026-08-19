"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const links = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { name: "Facebook", slug: "facebook", url: "https://facebook.com/yourpage" },
  { name: "Instagram", slug: "instagram", url: "https://instagram.com/yourpage" },
  { name: "GitHub", slug: "github", url: "https://github.com/jeeddev" },
  { name: "Email", slug: "gmail", url: "mailto:hello@likha.studio" },
];

const themes = [
  { name: "NOVA", accent: "#3d5afe", bg: "#050506" },
  { name: "AURO", accent: "#6d5cff", bg: "#05050a" },
  { name: "ROSE", accent: "#f43f5e", bg: "#140a0d" },
  { name: "VERDE", accent: "#10b981", bg: "#0a1410" },
  { name: "SOLAR", accent: "#f59e0b", bg: "#140f0a" },
  { name: "MONO", accent: "#e5e7eb", bg: "#0d0d0f" },
];

const sections = [
  { id: "hero", label: "Home" },
  { id: "services", label: "What We Do" },
  { id: "pricing", label: "Pricing" },
  { id: "work", label: "Selected Work" },
  { id: "about", label: "About" },
  { id: "contact", label: "Get in Touch" },
];




const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [current, setCurrent] = useState("Home");
  const root = useRef<HTMLDivElement>(null);
  const ov = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {                                                                   // Actualiza variables de css cuando cambia active
    document.documentElement.style.setProperty("--accent", themes[active].accent);  // Establece el color de acento 
    document.documentElement.style.setProperty("--bg", themes[active].bg);          // Establece el color de fondo 
  }, [active]);

  useGSAP(() => {                                                                                               // Animación de entrada: al montar
    gsap.from(".nav-bar", { y: -80, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });                 // Hace que la pastilla de navegación caiga desde arriba con un pequeño delay.

    gsap.set(ov.current, { autoAlpha: 0 });                                                                     // Timeline del menú móvil
    tl.current = gsap.timeline({ paused: true })                                                                // Se construye un timeline pausado en tl.current (oculto)
      .to(ov.current, { autoAlpha: 1, duration: 0.5, ease: "power2.out" })                                      // Muestra el overlay
      .from(".menu-link", { yPercent: 120, stagger: 0.07, duration: 0.8, ease: "power4.out" }, "-=0.2")         // Hace stagger de los links entrando desde abajo
      .from(".menu-social", { y: 20, opacity: 0, stagger: 0.06, duration: 0.5, ease: "power3.out" }, "-=0.4");  // Hace stagger de los iconos sociales

    sections.forEach((sec) => {                                                                                 // ScrollSpy: Por cada sección definida en sections se crea un scrolltrigger que la marca como activa cuando entra en la franja top 60, bottom 60 del viewport actualizando current
      const el = document.getElementById(sec.id);                                                               // Obtiene el elemento por id
      if (!el) return;                                                                                          // Si no existe el elemento, no hace nada
      ScrollTrigger.create({                                                                                    // Crea un ScrollTrigger
        trigger: el,                                                                                            // El trigger es "el" elemento
        start: "top 60%",                                                                                       // Cuando el top del elemento llega al 60% de la pantalla
        end: "bottom 60%",                                                                                      // o cuando el bottom del elemento llega al 60% de la pantalla
        onToggle: (self) => self.isActive && setCurrent(sec.label),                                             // si el scrollTrigger está activo entonces  actualiza el current
      });
    });
  }, { scope: root });

  const setMenu = (isOpen: boolean) => {                                                                        // Función que abre y cierra el menú móvil
    if (!tl.current) return;
    setOpen(isOpen);
    if (isOpen) { document.body.classList.add("menu-open"); tl.current.timeScale(1).play(); }                   // Si el menú está abierto, se añade la clase menu-open al body y se reproduce el timeline
    else { document.body.classList.remove("menu-open"); tl.current.timeScale(2).reverse(); }                    // Si el menú está cerrado, se elimina la clase menu-open del body y se reproduce el timeline a la inversa
  };

  return (
    <div ref={root}>
      {/* TOP NAVBAR */}
      <div className="nav-bar fixed left-1/2 top-4 z-80 flex w-[94%] max-w-5xl -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-xl md:top-6 md:px-6">
        <div className="flex items-center gap-3 overflow-hidden">
          <a href="#hero" className="font-display text-base font-black tracking-tight text-white md:text-lg">LIKHA</a>
          <span className="hidden h-4 w-px bg-white/20 lg:block" />
          <span key={current} className="hidden text-xs uppercase tracking-widest text-white/50 lg:inline">{current}</span>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="hover"
              className="text-sm font-medium text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              data-cursor="hover"
              aria-label="Theme"
              className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 px-2.5 transition hover:bg-white/10"
            >
              <span
                className="h-3 w-3 rounded-full ring-1 ring-white/25"
                style={{ backgroundColor: themes[active].accent }}
              />
              <span className="hidden text-[10px] font-black uppercase tracking-wide text-white lg:inline">
                {themes[active].name}
              </span>
            </button>

            <div className={`absolute right-0 mt-2 w-40 origin-top-right rounded-2xl border border-white/10 bg-black/80 p-2 backdrop-blur-xl transition-all duration-300 ${themeOpen ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}>
              {themes.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {        // Al clickar en un tema
                    setActive(i);         // Se establece el tema activo
                    setThemeOpen(false);  // Se cierra el menú de temas
                  }}
                  data-cursor="hover"
                  className={`
                    flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left transition 
                    ${active === i
                      ? "bg-white/10"
                      : "hover:bg-white/5"
                    }`
                  }>
                  <span
                    className="h-4 w-4 rounded-full ring-1 ring-white/20"
                    style={{ backgroundColor: t.accent }}
                  />
                  <span className="text-xs font-black uppercase tracking-wide text-white">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setMenu(!open)}
            data-cursor="hover"
            aria-label="Menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-white/10 transition hover:bg-white/10 md:hidden"
          >
            <span className={`h-0.5 w-4 bg-white transition-all duration-300 ${open ? "translate-y-0.75 rotate-45" : ""}`} />
            <span className={`h-0.5 w-4 bg-white transition-all duration-300 ${open ? "-translate-y-0.75 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* FULLSCREEN MENU (mobile) */}
      <div
        ref={ov}
        className={`
          fixed inset-0 z-70 flex flex-col justify-between bg-black/80 p-8 backdrop-blur-2xl md:p-14 
          ${open // Es redundante por la animación con gsap pero actua como doble seguro.
            ? ""
            : "pointer-events-none"
          }`
        }
      >
        <span className="font-display text-lg font-black text-white">LIKHA</span>
        <nav className="flex flex-col gap-1">
          {links.map((l, i) => (
            <span key={l.href} className="block overflow-hidden">
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                data-cursor="hover"
                className="menu-link group flex items-baseline gap-4 font-display text-4xl font-black uppercase leading-[1.1] tracking-tighter text-white/80 transition-colors duration-300 hover:text-accent md:text-7xl"
              >
                <span className="text-xs font-black text-accent md:text-sm">0{i + 1}</span>
                <span className="inline-block transition-transform duration-500 ease-out group-hover:translate-x-4">{l.label}</span>
              </a>
            </span>
          ))}
        </nav>
        <div className="flex flex-wrap gap-3">
          {socials.map((s) => (
            <a
              key={s.slug}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="menu-social flex h-11 w-11 items-center justify-center rounded-full border border-white/15 opacity-70 transition hover:border-accent hover:opacity-100"
            >
              <img
                src={`https://cdn.simpleicons.org/${s.slug}/ffffff`}
                alt={s.name}
                width={18}
                height={18}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Navbar