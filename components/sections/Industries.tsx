import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import HyperFrame from "@/components/ui/HyperFrame";

const industries = [
  { img: "/images/ind-1.jpg", tag: "Food & Beverage", name: "Restaurants & Cafés", desc: "Menus, reservations, and ordering that fill tables." },
  { img: "/images/ind-2.jpg", tag: "Health", name: "Clinics & Wellness", desc: "Booking systems and sites patients actually trust." },
  { img: "/images/ind-3.jpg", tag: "Beauty", name: "Salons & Studios", desc: "Online booking and a look that matches your brand." },
  { img: "/images/ind-4.jpg", tag: "Education", name: "Schools & Training", desc: "Enrollment, portals, and learning platforms." },
  { img: "/images/ind-5.jpg", tag: "Retail", name: "E-Commerce", desc: "Storefronts built to sell, fast and secure." },
  { img: "/images/ind-6.jpg", tag: "Property", name: "Real Estate", desc: "Listings and virtual tours that close deals." },
  { img: "/images/ind-7.jpg", tag: "Media", name: "Events & Creators", desc: "Landing pages and content that build a following." },
  { img: "/images/ind-8.jpg", tag: "Trades", name: "Construction", desc: "Portfolios and lead systems that win projects." },
  { img: "/images/ind-9.jpg", tag: "Tech", name: "Startups & SaaS", desc: "Products and platforms ready to scale." },
];

const Industries = () => {
  return <section className="px-6 py-28 md:px-10">
    <div className="mb-14">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">Industries</p>
      </Reveal>

      <AnimatedTitle
        text="Built for Every Business"
        className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
      />
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {industries.map((it, i) => (
        <HyperFrame
          key={it.name}
          delay={(i % 3) * 0.08}
          dir={i % 2 === 0 // Animación alterna de arriba hacia abajo para dar variedad
            ? "up"
            : "down"
          }
          className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-white/5"
        >
          <img
            src={it.img}
            alt={it.name}
            className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:blur-xs group-hover:brightness-[0.5]"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />

          {/* Información inicial - desaparece al hacer hover */}
          <div className="absolute inset-x-0 bottom-0 p-5 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0">
            <p className="text-xs uppercase tracking-widest text-accent">
              {it.tag}
            </p>

            <h3 className="font-display text-lg font-black uppercase text-white md:text-xl">
              {it.name}
            </h3>
          </div>

          {/* Información final - aparece al hacer hover */}
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-center p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
            <p className="text-xs uppercase tracking-widest text-accent">{it.tag}</p>

            <h3 className="mt-1 font-display text-lg font-black uppercase text-white md:text-2xl">{it.name}</h3>

            <p className="mt-2 translate-y-3 text-sm text-white/80 transition-transform duration-500 group-hover:translate-y-0">{it.desc}</p>
          </div>
        </HyperFrame>
      ))}
    </div>
  </section>
}

export default Industries