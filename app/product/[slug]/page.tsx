import Link from "next/link";
import { notFound } from "next/navigation";

const services: Record<
  string,
  { name: string; tag: string; color: string; desc: string; items: string[] }
> = {
  "website-development": {
    name: "Website Development",
    tag: "Web",
    color: "#3d5afe",
    desc: "Fast, sharp websites built to convert. From landing pages to full multipage sites — modern stack, smooth animations, and performance that ranks.",
    items: [
      "Landing pages",
      "Company websites",
      "E-commerce",
      "3D & motion experiences",
    ],
  },
  "mobile-app-development": {
    name: "Mobile App Development",
    tag: "iOS & Android",
    color: "#d8613c",
    desc: "Mobile apps that feel right and work right for real users on real devices. Cross-platform builds that ship fast without cutting corners.",
    items: [
      "Flutter apps",
      "iOS & Android",
      "App UI/UX design",
      "App Store deployment",
    ],
  },
  "system-development": {
    name: "System Development",
    tag: "Platforms",
    color: "#c7c7bf",
    desc: "Custom portals, dashboards, and internal tools built around how your team actually works. Own your workflow instead of renting it.",
    items: [
      "Admin dashboards",
      "Booking & inventory systems",
      "Client portals",
      "Automation & integrations",
    ],
  },
  "video-editing": {
    name: "Video Editing",
    tag: "Content",
    color: "#17171a",
    desc: "Cinematic edits, motion graphics, and short-form content that stops the scroll. Built for brands that want to stand out on every feed.",
    items: [
      "Brand films",
      "Social media edits",
      "Motion graphics",
      "Event highlights",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg px-6 pt-36 pb-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/#services"
          data-cursor="hover"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-muted transition hover:text-white"
        >
          ← Back to Services
        </Link>

        <div className="mt-10">
          <span
            className="inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
            style={{ backgroundColor: service.color }}
          >
            {service.tag}
          </span>

          <h1 className="mt-4 font-display text-5xl font-black uppercase tracking-tight text-white md:text-7xl">
            {service.name}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/70">
            {service.desc}
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <h2 className="font-display text-2xl font-black uppercase text-white">
            What&apos;s Included
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {service.items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 text-white/80"
              >
                <span className="text-accent">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href={`mailto:hello@likha.studio?subject=Inquiry: ${service.name}`}
            data-cursor="hover"
            className="rounded-full bg-accent px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-white transition hover:opacity-90"
          >
            Inquire About This Service
          </a>
          <Link
            href="/#pricing"
            data-cursor="hover"
            className="rounded-full border border-white/15 px-8 py-4 text-center font-display text-sm font-bold uppercase tracking-wide text-white/80 transition hover:border-white/40 hover:text-white"
          >
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}