import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import MagneticButton from "@/components/ui/MagneticButton";

const steps = [
  { n: "01", title: "Tell us your idea", desc: "Message us what you need — website, app, system, or video." },
  { n: "02", title: "Get a plan & quote", desc: "We scope it honestly. No upselling, no surprises." },
  { n: "03", title: "We build & launch", desc: "You get updates every step, and you own everything we ship." },
];

const Configurator = () => {
  return (
    <section id="contact" className="px-6 py-28 md:px-10">
      <div className="rounded-4xl border border-white/10 bg-white/3 p-8 md:p-14">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">Start a Project</p>

        <AnimatedTitle
          text="Let's Build Yours"
          className="font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.1}
            >
              <div className="rounded-2xl border border-white/10 p-6">
                <span className="font-display text-sm font-black text-accent">{s.n}</span>

                <h3 className="mt-3 font-display text-xl font-black uppercase text-white">{s.title}</h3>

                <p className="mt-2 text-sm text-white/60">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center gap-6">
            <a href="mailto:hello@likha.studio" data-cursor="hover">
              <MagneticButton className="rounded-full bg-accent px-10 py-5 font-display text-lg font-black uppercase tracking-wide text-white">
                Get a Free Quote
              </MagneticButton>
            </a>
            <p className="text-sm text-muted">hello@likha.studio · Replies within 24 hours</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Configurator