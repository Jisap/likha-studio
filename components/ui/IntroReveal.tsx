"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function IntroReveal({
    children,
    delay = 0,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.from(ref.current, {
                y: 60,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1.3,
                delay: 0.3 + delay,
                ease: "power3.out",
            });
        },
        { scope: ref },
    );

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}