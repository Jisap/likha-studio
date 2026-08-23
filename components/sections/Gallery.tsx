import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Reveal from "@/components/ui/Reveal";

const items = [
  { src: "/images/1.jpg", span: "md:row-span-2", tag: "Website", title: "Clinic Booking Site", desc: "Design + build, 3 weeks." },
  { src: "/images/2.jpg", span: "", tag: "Mobile App", title: "Delivery Tracker", desc: "Flutter, iOS & Android." },
  { src: "/images/3.jpg", span: "", tag: "System", title: "Inventory Dashboard", desc: "Custom admin platform." },
  { src: "/images/4.jpg", span: "md:row-span-2", tag: "Video", title: "Brand Launch Film", desc: "Edit + motion graphics." },
  { src: "/images/5.jpg", span: "", tag: "Website", title: "Restaurant Site", desc: "Menu + reservations." },
  { src: "/images/6.jpg", span: "", tag: "Video", title: "Event Highlights", desc: "Same-day edit." },
];

const Gallery = () => {
  return (
    <section
      id="work"
      className="px-6 py-24 md:px-10"
    >
      <AnimatedTitle
        text="Selected Work"
        className="mb-12 font-display text-4xl font-black uppercase tracking-tight md:text-6xl"
      />

      <div className="grid auto-rows-55 grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal
            key={i}
            delay={(i % 3) * 0.08}
            className={`
              group relative overflow-hidden rounded-2xl bg-white/5 
              ${it.span} 
            `}
          >
            <img
              src={it.src}
              alt={it.title}
              className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:blur-[3px] group-hover:brightness-[0.5]"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

              <div className="relative">
                <p className="translate-y-3 text-xs uppercase tracking-widest text-accent transition-transform duration-500 group-hover:translate-y-0">
                  {it.tag}
                </p>

                <h3 className="translate-y-3 font-display text-xl font-black uppercase text-white transition-transform delay-75 duration-500 group-hover:translate-y-0 md:text-2xl">
                  {it.title}
                </h3>

                <p className="translate-y-3 text-sm text-white/70 transition-transform delay-150 duration-500 group-hover:translate-y-0">
                  {it.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default Gallery