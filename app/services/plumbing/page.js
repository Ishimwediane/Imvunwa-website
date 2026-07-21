"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import SectionCta from "../../../components/ui/SectionCta";
import Eyebrow from "../../../components/ui/Eyebrow";

const FEATURES = [
  "Heavy-duty industrial pipe installation for factories",
  "Water system installation for commercial buildings",
  "Leak detection, diagnosis, and emergency repairs",
  "Sewage and drainage system installation",
  "Hot and cold water system setup and maintenance",
  "Custom plumbing layouts for large construction projects",
];

const PROJECTS = [
  { src: "/image/plumb.jpg",     caption: "Commercial plumbing network — full installation" },
  { src: "/image/plumbling.jpg", caption: "Industrial piping system — factory infrastructure" },
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

export default function PlumbingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Utilities"
        title="Plumbing Services"
        subtitle="Industrial and commercial plumbing — from full system installation to leak repairs and routine maintenance."
        bgImage="/image/plumb.jpg"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              Reliable Flow. Zero Leaks.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              Imvunwa delivers heavy-duty plumbing solutions for factories, commercial buildings, and construction sites. We install, maintain, and repair water systems that need to perform reliably under industrial demand.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              Our plumbers are experienced with complex pipe routing, high-pressure systems, and large infrastructure layouts — delivering clean, leak-free installations on time.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Book a Plumber
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
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[32px]">Sample Plumbing Projects</h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-muted">
              Pipe networks and water systems we have installed for industrial and commercial clients.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects?cat=plumbing"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal">
              View All Plumbing Projects →
            </Link>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Need reliable plumbing installed?"
        body="Tell us about your project site and requirements and our team will design and install the right system for you."
        href="/contact"
        label="Get a Plumbing Quote"
      />
    </div>
  );
}
