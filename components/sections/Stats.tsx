import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";


const stats = [
  { to: 24, suffix: "+", label: "Projects delivered" },
  { to: 12, suffix: "+", label: "Happy clients" },
  { to: 4, suffix: "", label: "Core services" },
  { to: 100, suffix: "%", label: "Built in-house" },
];

const Stats = () => {
  return (
    <section className="border-y border-white/10 px-6 py-24 md:px-10">
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4 place-items-center">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div>
              <p className="font-display text-5xl font-black text-accent  md:text-7xl">
                <Counter to={s.to} suffix={s.suffix} />
              </p>

              <p className="mt-2 text-sm uppercase tracking-wider text-muted">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Stats