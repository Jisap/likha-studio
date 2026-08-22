"use client";

import { useRef, useState } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";

const panels = [
  { n: "01", title: "Discovery", desc: "We sit with you and learn your business, goals, and users before anything else." },
  { n: "02", title: "Design", desc: "We craft the look and feel — clean, intentional, and built around your brand." },
  { n: "03", title: "Build", desc: "We engineer it with a modern stack — fast, scalable, and yours to own." },
  { n: "04", title: "Launch", desc: "We ship it, test it, and hand it off. You understand and control everything." },
  { n: "05", title: "Support", desc: "Need us later? We're here — updates, fixes, and growth whenever you need." },
];

const ShowCase = () => {

  const [active, setActive] = useState(0);
  const total = panels.length;

  const go = (dir: number) => {
    setActive((p) => Math.min(Math.max(p + dir, 0), total - 1));
  };

  return (
    <div>ShowCase</div>
  )
}

export default ShowCase