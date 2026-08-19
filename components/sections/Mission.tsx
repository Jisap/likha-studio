
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Reveal from "../ui/Reveal";

export default function Mission() {
    return (
        <section className="px-6 py-28 md:px-10">
            <div className="mx-auto max-w-4xl text-center">
                <Reveal>
                    <p className="mb-4 text-sm uppercase tracking-widest text-accent">The Studio</p>
                </Reveal>
                <AnimatedTitle
                    text="Built by Craft, Driven by Code"
                    className="font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl"
                />
                <Reveal delay={0.15}>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        As a digital studio, we bridge premium visual design and solid
                        engineering — so your product looks stunning, loads fast, and
                        performs flawlessly on every device.
                    </p>
                </Reveal>
            </div>
        </section>
    );
}