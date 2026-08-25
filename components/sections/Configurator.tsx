import Reveal from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
// import MagneticButton from "@/components/ui/MagneticButton";

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
      </div>
    </section>
  )
}

export default Configurator