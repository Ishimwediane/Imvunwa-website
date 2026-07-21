"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";

/* ── Portfolio data ───────────────────────────────────────────── */
const PORTFOLIO = [
  {
    id: "welding", label: "Welding", icon: "🔥",
    desc: "Precision welding for structural, decorative, and industrial applications.",
    subs: [
      { name: "Doors & Gates",      images: [{ src: "/image/project1.jpg", caption: "Steel security door" }, { src: "/image/project2.jpg", caption: "Ornamental gate" }, { src: "/image/project4.jpg", caption: "Sliding compound gate" }] },
      { name: "Roofing Frames",     images: [{ src: "/image/project5.jpg", caption: "Steel roof truss" }, { src: "/image/welding1.png", caption: "Industrial roofing frame" }, { src: "/image/project6.jpg", caption: "Commercial roof structure" }] },
      { name: "Structural Frames",  images: [{ src: "/image/execution.jpg", caption: "Building steel frame" }, { src: "/image/manufacturing.jpg", caption: "Steel structure assembly" }] },
    ],
  },
  {
    id: "manufacturing", label: "Manufacturing", icon: "⚙️",
    desc: "Custom industrial machines precision-built to your exact specifications.",
    subs: [
      { name: "Industrial Machines",  images: [{ src: "/image/manifa.jpg", caption: "Custom production machine" }, { src: "/image/mman.png", caption: "Production line equipment" }, { src: "/image/manufacturing.jpg", caption: "Factory machine installation" }] },
      { name: "Product Fabrication",  images: [{ src: "/image/ppic (1).jpg", caption: "Fabricated metal product" }, { src: "/image/product1.jpg", caption: "Custom fabricated part" }] },
    ],
  },
  {
    id: "repair", label: "Machine Repair", icon: "🔧",
    desc: "Diagnostics and restoration to keep your equipment at peak performance.",
    subs: [
      { name: "Heavy Equipment",  images: [{ src: "/image/repaire.jpg", caption: "Heavy equipment overhaul" }, { src: "/image/repairement.jpg", caption: "Machine component restoration" }] },
      { name: "Precision Repair", images: [{ src: "/image/pic1.jpg", caption: "Precision part repair" }, { src: "/image/pic11.jpeg", caption: "Component calibration" }] },
    ],
  },
  {
    id: "painting", label: "Painting", icon: "🎨",
    desc: "Industrial-grade coatings and finishes for long-lasting protection.",
    subs: [
      { name: "Anti-Corrosion Coating", images: [{ src: "/image/painting.jpg", caption: "Anti-corrosion surface coat" }, { src: "/image/paint.jpg", caption: "Industrial paint application" }] },
      { name: "Decorative Finishes",    images: [{ src: "/image/abou.jpg", caption: "Decorative interior finish" }] },
    ],
  },
  {
    id: "electrical", label: "Electrical", icon: "⚡",
    desc: "Complete electrical installations for industrial and commercial buildings.",
    subs: [
      { name: "Industrial Wiring", images: [{ src: "/image/electricity.jpg", caption: "Industrial electrical system" }, { src: "/image/light bulb.jpeg", caption: "Lighting installation" }] },
    ],
  },
  {
    id: "plumbing", label: "Plumbing", icon: "🔩",
    desc: "Heavy-duty piping and plumbing for factories and commercial buildings.",
    subs: [
      { name: "Industrial Piping", images: [{ src: "/image/plumb.jpg", caption: "Commercial plumbing network" }, { src: "/image/plumbling.jpg", caption: "Industrial piping system" }] },
    ],
  },
  {
    id: "design", label: "Product Design", icon: "✏️",
    desc: "Engineering design and prototyping for custom industrial products.",
    subs: [
      { name: "Design & Prototyping", images: [{ src: "/image/design.jpg", caption: "Product engineering design" }, { src: "/image/product.jpg", caption: "Prototype fabrication" }, { src: "/image/product2.jpeg", caption: "Custom product design" }] },
    ],
  },
];

/* ── Sub-components ──────────────────────────────────────────── */
function ImgCard({ src, caption }) {
  return (
    <div className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl">
      <Image
        src={src}
        alt={caption}
        width={400}
        height={300}
        quality={75}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-4 py-3 text-[11px] font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </p>
    </div>
  );
}

function SubCategory({ name, images }) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-3">
        <div className="h-[3px] w-6 rounded-full bg-signal" />
        <h3 className="text-[13px] font-black uppercase tracking-widest text-signal">{name}</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((img, i) => <ImgCard key={i} {...img} />)}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [active, setActive] = useState("welding");
  const current = PORTFOLIO.find((c) => c.id === active);

  return (
    <div className="overflow-hidden bg-base">
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects & Work"
        subtitle="Browse our completed projects by service category. Each category shows the specific types of work we deliver."
      />

      <section className="px-4 pb-24 sm:px-6">
        <Container className="pt-0">

          {/* Category tabs */}
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PORTFOLIO.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  active === cat.id
                    ? "bg-signal text-white shadow-lg shadow-signal/30"
                    : "border border-white/15 text-white/60 hover:border-signal/50 hover:text-white"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Active category header */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-[22px] font-black text-white sm:text-[28px]">
                {current.icon} {current.label}
              </h2>
              <p className="mt-2 max-w-[520px] text-[13px] leading-[1.7] text-white/50">{current.desc}</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-signal px-7 text-[12px] font-black text-white transition-colors hover:bg-signal-hover"
            >
              Request This Service
            </Link>
          </div>

          {/* Sub-categories */}
          {current.subs.map((sub, i) => (
            <SubCategory key={i} name={sub.name} images={sub.images} />
          ))}

        </Container>
      </section>

      <SectionCta
        heading="Have a project in mind?"
        body="Share your idea with us and we'll bring it to life with precision and quality."
        href="/contact"
        label="Start a Project"
      />
    </div>
  );
}
