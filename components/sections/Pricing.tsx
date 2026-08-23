import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import HyperFrame from "@/components/ui/HyperFrame";

const tiers = [
  { name: "Website — Landing Page", price: "From ₱15,000", popular: false },
  { name: "Website — Multipage", price: "From ₱30,000", popular: false },
  { name: "Mobile App", price: "From ₱80,000", popular: true },
  { name: "Custom System", price: "From ₱50,000", popular: false },
  { name: "Video Package", price: "From ₱5,000", popular: false },
];

const Pricing = () => {
  return (
    <section id="pricing" className="px-6 py-28 md:px-10">
      <div className="mb-14">
        <Reveal>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">
            Pricing
          </p>
        </Reveal>

        <AnimatedTitle text="Build and Operate" className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl" />

        <Reveal
          delay={0.1}
        >
          <p className="mt-4 max-w-xl text-white/70">
            Pick a build tier — or let us run it for you after launch. You own everything we build.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-4 text-xs uppercase tracking-widest text-muted">Build</p>

          <div className="flex flex-col gap-3">
            {tiers.map((t, i) => (
              <HyperFrame
                key={t.name}
                delay={i * 0.06} // Cada tarjeta tiene un retraso incremental de 60ms respecto a la anterior.
                dir="left"
              >
                <div
                  data-cursor="hover"
                  className={`
                    group flex items-center justify-between rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_40px_rgba(61,90,254,0.25)] 
                    ${t.popular
                      ? "border-accent bg-accent/5"
                      : "border-white/10 bg-white/3"
                    }`
                  }
                >
                  <div className="flex items-center gap-4">
                    <h3 className="font-display text-lg font-black uppercase md:text-xl">{t.name}</h3>
                    {t.popular && <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Most Popular</span>}
                  </div>
                  <span className="text-sm font-medium text-white/70 md:text-base">{t.price}</span>
                </div>
              </HyperFrame>
            ))}
          </div>

          <Reveal delay={0.3}>
            <p className="mt-4 text-sm text-muted">
              Every build includes full source-code ownership, deployment, and launch support.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Pricing