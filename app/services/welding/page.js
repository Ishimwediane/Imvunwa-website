"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import SectionCta from "../../../components/ui/SectionCta";
import Eyebrow from "../../../components/ui/Eyebrow";

const FEATURES = [
  "Structural steel welding for buildings and industrial frameworks",
  "MIG, TIG, and ARC welding across all metal types",
  "Custom gates, doors, fences, and security barriers",
  "Roof trusses and roofing frame fabrication",
  "Field and on-site welding for urgent repairs",
  "Quality welds inspected for strength and safety",
];

const PROJECTS = [
  { src: "/image/project1.jpg",   caption: "Steel security door — custom fabrication" },
  { src: "/image/project2.jpg",   caption: "Ornamental gate — decorative metalwork" },
  { src: "/image/project4.jpg",   caption: "Sliding compound gate — commercial property" },
  { src: "/image/project5.jpg",   caption: "Steel roof truss — industrial building" },
  { src: "/image/welding1.png",   caption: "Industrial roofing frame — structural welding" },
  { src: "/image/execution.jpg",  caption: "Building steel frame — structural assembly" },
];

function ProjectCard({ src, caption }) {
  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer">
      <Image src={src} alt={caption} fill quality={80}
        className="object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-4 py-3 text-[12px] font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </p>
    </div>
  );
}

export default function WeldingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Metalwork"
        title="Welding Services"
        subtitle="Structural, decorative, and custom welding for industrial, commercial, and residential projects across Rwanda."
        bgImage="/image/welding1.png"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              Precision Welds. Lasting Structures.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              Imvunwa delivers expert welding services for structural frameworks, custom metalwork, gates, roofing frames, and industrial fabrication. Our certified welders bring accuracy, cleanliness, and strength to every join.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              From a single gate to an entire building frame, we provide both workshop fabrication and on-site field welding — meeting your project timelines with reliable quality control throughout.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Request a Welding Quote
            </Link>
          </div>
          <div className="grid gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-white/8 bg-white/5 px-4 py-3.5">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                <span className="text-[13px] leading-[1.6] text-white/80">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Sample Projects */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <Container>
          <div className="mb-10">
            <Eyebrow>Our Work</Eyebrow>
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[32px]">Sample Welding Projects</h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-muted">
              Gates, doors, frames, and structural metal work delivered for clients across Rwanda.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects?cat=welding"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal">
              View All Welding Projects →
            </Link>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Have a welding or fabrication project?"
        body="From a single gate to a full structural framework — tell us what you need and we will deliver it with precision."
        href="/contact"
        label="Get a Welding Quote"
      />
    </div>
  );
}
