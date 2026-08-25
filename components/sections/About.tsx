import React from 'react'
import Reveal from '../ui/Reveal';
import AnimatedTitle from '../ui/AnimatedTitle';

const About = () => {
    return (
        <section id="about" className="grid grid-cols-1 items-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
            <Reveal className="relative aspect-4/5 overflow-hidden rounded-3xl bg-white/5">
                <img
                    src="/images/about.jpg"
                    alt="About Likha"
                    className="h-full w-full object-cover"
                />
            </Reveal>

            <div>
                <p className="mb-3 text-sm uppercase tracking-widest text-accent">About</p>
                <AnimatedTitle
                    text="Crafted With Purpose"
                    className="font-display text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl"
                />
                <Reveal delay={0.15}>
                    <p className="mt-6 max-w-md text-white/70">
                        LIKHA means &quot;to create.&quot; We are a digital studio building
                        websites, mobile apps, custom systems, and video content — combining
                        premium design with solid engineering.
                    </p>
                    <p className="mt-4 max-w-md text-white/70">
                        Every project ships fast, looks intentional, and is built to grow
                        with your business. From the Philippines. 🇵🇭
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

export default About