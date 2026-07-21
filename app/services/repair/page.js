"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import SectionCta from "../../../components/ui/SectionCta";
import Eyebrow from "../../../components/ui/Eyebrow";

const FEATURES = [
  "Complete diagnostics — electrical, mechanical, hydraulic",
  "Component-level repair and precision calibration",
  "Preventive maintenance plans to avoid costly downtime",
  "Genuine and compatible spare parts sourcing",
  "On-site and workshop repair for all machine types",
  "Fast turnaround to minimise production disruption",
];

const PROJECTS = [
  { src: "/image/repaire.jpg",     caption: "Heavy equipment overhaul — full restoration" },
  { src: "/image/repairement.jpg", caption: "Machine component restoration & calibration" },
  { src: "/image/pic1.jpg",        caption: "Precision part repair — industrial equipment" },
  { src: "/image/pic11.jpeg",      caption: "Component calibration — quality control check" },
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

export default function RepairPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Maintenance"
        title="Machine Repair"
        subtitle="Fast, reliable diagnostics and restoration services to keep your equipment running at peak performance."
        bgImage="/image/repairement.jpg"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              Minimise Downtime. Maximise Output.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              Equipment failure costs time and money. Imvunwa&apos;s repair and maintenance team responds quickly, diagnoses accurately, and restores your machines to full working condition — without cutting corners.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              We handle repairs for a wide range of industrial machines across manufacturing, agriculture, construction, and commercial sectors. Our technicians work both on-site and in our fully equipped workshop.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Book a Repair Assessment
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
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[32px]">Sample Repair Projects</h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-muted">
              Equipment we have diagnosed, restored, and returned to service for our clients.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects?cat=repair"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal">
              View All Repair Projects →
            </Link>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Machine breaking down?"
        body="Contact us now and our technicians will assess, diagnose, and restore your equipment as fast as possible."
        href="/contact"
        label="Request Repair Service"
      />
    </div>
  );
}
