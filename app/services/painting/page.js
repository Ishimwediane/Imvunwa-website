"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import SectionCta from "../../../components/ui/SectionCta";
import Eyebrow from "../../../components/ui/Eyebrow";

const FEATURES = [
  "Industrial anti-corrosion and protective coatings",
  "Interior and exterior painting for homes and businesses",
  "Surface preparation, priming, and finishing",
  "High-durability paints suited for Rwanda's climate",
  "Commercial and large-scale facility painting",
  "Clean, professional finish with minimal disruption",
];

const PROJECTS = [
  { src: "/image/painting.jpg", caption: "Anti-corrosion surface coat — industrial facility" },
  { src: "/image/paint.jpg",    caption: "Industrial paint application — protective finish" },
  { src: "/image/abou.jpg",     caption: "Decorative interior finish — commercial space" },
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

export default function PaintingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Finishing"
        title="Painting Services"
        subtitle="Professional painting and protective coating services for industrial, commercial, and residential properties."
        bgImage="/image/painting.jpg"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              A Fresh Finish. Long-Lasting Protection.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              Imvunwa&apos;s painting team delivers clean, durable finishes for surfaces of all types — from industrial steel structures requiring anti-corrosion coatings to residential interiors needing a premium decorative touch.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              We use high-quality, climate-appropriate paints and follow a thorough process of surface preparation, priming, and finishing to ensure results that look great and protect your property for years to come.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Request a Painting Quote
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
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[32px]">Sample Painting Projects</h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-muted">
              Coating and painting work we have completed for clients across residential, commercial, and industrial sites.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects?cat=painting"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal">
              View All Painting Projects →
            </Link>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Ready for a fresh coat?"
        body="Whether it is anti-corrosion industrial coating or a full interior repaint, we will deliver a clean, lasting finish."
        href="/contact"
        label="Get a Painting Quote"
      />
    </div>
  );
}
