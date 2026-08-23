"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Statement = () => {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div>Statement</div>
  )
}

export default Statement