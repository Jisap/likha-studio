"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const MagneticButton = ({
    children,
    className = "",
}: {
    children: ReactNode;
    className?: string;
}) => {

    const ref = useRef<HTMLButtonElement>(null);

    return (
        <div>MagneticButton</div>
    )
}

export default MagneticButton