"use client";

import { useState } from "react";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Reveal from "@/components/ui/Reveal";

const services = ["Website", "Mobile App", "System", "Video Editing", "Other"];

const Contact = () => {

  const [service, setService] = useState("Website");

  return (
    <div>Contact</div>
  )
}

export default Contact