import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";

const stack = [
    { name: "Next.js", slug: "nextdotjs" },
    { name: "React", slug: "react" },
    { name: "TypeScript", slug: "typescript" },
    { name: "Tailwind CSS", slug: "tailwindcss" },
    { name: "Flutter", slug: "flutter" },
    { name: "GSAP", slug: "greensock" },
];

const Footer = () => {
    return (
        <footer className="flex min-h-screen flex-col justify-between px-6 py-16 md:px-10">
            <div className="flex flex-1 flex-col items-center justify-center text-center">
                <p className="mb-6 text-sm uppercase tracking-widest text-muted">Ready to start?</p>

                <h2 className="font-display text-[13vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[10vw]">
                    Let&apos;s Create
                    <br />
                    <span className="text-accent">Together</span>
                </h2>

                <p className="mt-6 max-w-md text-white/60">
                    No pressure — just a conversation about what&apos;s possible.
                </p>

                <a href="mailto:hello@likha.studio" data-cursor="hover">
                    <MagneticButton className="mt-10 rounded-full bg-accent px-10 py-5 font-display text-lg font-black uppercase tracking-wide text-white">
                        Talk to Us
                    </MagneticButton>
                </a>
            </div>
        </footer>
    )
}

export default Footer