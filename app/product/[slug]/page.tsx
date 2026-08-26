import Link from "next/link";

const services: Record<string, { name: string; tag: string; color: string; desc: string; items: string[] }> = {
  "website-development": {
    name: "Website Development",
    tag: "Web",
    color: "#3d5afe",
    desc: "Fast, sharp websites built to convert. From landing pages to full multipage sites — modern stack, smooth animations, and performance that ranks.",
    items: ["Landing pages", "Company websites", "E-commerce", "3D & motion experiences"],
  },
  "mobile-app-development": {
    name: "Mobile App Development",
    tag: "iOS & Android",
    color: "#d8613c",
    desc: "Mobile apps that feel right and work right for real users on real devices. Cross-platform builds that ship fast without cutting corners.",
    items: ["Flutter apps", "iOS & Android", "App UI/UX design", "App Store deployment"],
  },
  "system-development": {
    name: "System Development",
    tag: "Platforms",
    color: "#c7c7bf",
    desc: "Custom portals, dashboards, and internal tools built around how your team actually works. Own your workflow instead of renting it.",
    items: ["Admin dashboards", "Booking & inventory systems", "Client portals", "Automation & integrations"],
  },
  "video-editing": {
    name: "Video Editing",
    tag: "Content",
    color: "#17171a",
    desc: "Cinematic edits, motion graphics, and short-form content that stops the scroll. Built for brands that want to stand out on every feed.",
    items: ["Brand films", "Social media edits", "Motion graphics", "Event highlights"],
  },
};

import React from 'react'

const ProductPage = () => {
  return (
    <div>page</div>
  )
}

export default ProductPage