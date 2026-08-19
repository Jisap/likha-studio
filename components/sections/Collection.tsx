import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import TransitionLink from "@/components/ui/TransitionLink";

const services = [
  { n: "01", slug: "website-development", name: "Website Development", tag: "Web", price: "From ₱15,000", color: "#3d5afe", img: "/images/service-1.jpg", desc: "Fast, sharp sites built to convert visitors into customers." },
  { n: "02", slug: "mobile-app-development", name: "Mobile App Development", tag: "iOS & Android", price: "From ₱80,000", color: "#d8613c", img: "/images/service-2.jpg", desc: "Apps that feel right and work right on real devices." },
  { n: "03", slug: "system-development", name: "System Development", tag: "Platforms", price: "From ₱50,000", color: "#c7c7bf", img: "/images/service-3.jpg", desc: "Portals, dashboards, and workflows built around your team." },
  { n: "04", slug: "video-editing", name: "Video Editing", tag: "Content", price: "From ₱5,000", color: "#17171a", img: "/images/service-4.jpg", desc: "Cinematic edits and motion content for your brand." },
];

const Collection = () => {
  return (
    <section id="services" className="px-6 py-28 md:px-10">
      <div className="mb-14">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">What We Offer</p>
        <AnimatedTitle text="What We Do" className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.08}>
            <article
              data-cursor="hover"
              className="group relative aspect-3/4 overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-2"
              style={{ backgroundColor: p.color }}
            >
              <img
                src={p.img}
                alt={p.name}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />

              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-black text-white">{p.n} / 04</span>
                  <span className="rounded-full border border-white/25 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {p.price}
                  </span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-white/80">{p.tag}</p>
                  <h3 className="font-display text-2xl font-black uppercase leading-tight text-white">{p.name}</h3>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/85 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="translate-y-4 text-sm text-white/80 transition-all duration-500 ease-out group-hover:translate-y-0">
                  {p.desc}
                </p>

                <div className="mt-4 translate-y-4 transition-all delay-100 duration-500 ease-out group-hover:translate-y-0">
                  <TransitionLink
                    href={`/product/${p.slug}`}
                    color={p.color}
                    className="rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white/85"
                  >
                    Learn More
                  </TransitionLink>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Collection