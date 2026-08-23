import Reveal from "@/components/ui/Reveal";

export default function Film() {
  return (
    <section className="px-6 py-24 md:px-10">
      <Reveal>
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-white/5">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/film-poster.jpg"
          >
            <source src="/videos/film.mp4" type="video/mp4" />
          </video>

          <div className="pointer-events-none absolute bottom-6 left-6 mix-blend-difference">
            <p className="text-xs uppercase tracking-widest text-white/80">Showreel</p>

            <h3 className="font-display text-3xl font-black uppercase text-white md:text-5xl">
              Made by Likha
            </h3>
          </div>
        </div>
      </Reveal>
    </section>
  );
}