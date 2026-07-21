"use client";

import Image from "next/image";
import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import SectionCta from "../../../components/ui/SectionCta";
import Eyebrow from "../../../components/ui/Eyebrow";

const FEATURES = [
  "Custom machine design tailored to your production needs",
  "Industrial-grade materials for long-lasting durability",
  "Precision engineering with quality control at every stage",
  "Factory delivery, installation, and commissioning support",
  "Machines built to local and international standards",
  "Dedicated after-sale maintenance and technical support",
];

const PROJECTS = [
  { src: "/image/manifa.jpg",        caption: "Custom production machine for local factory" },
  { src: "/image/mman.png",          caption: "Production line equipment — full assembly" },
  { src: "/image/manufacturing.jpg", caption: "Factory machine installation & commissioning" },
  { src: "/image/ppic (1).jpg",      caption: "Fabricated metal product — precision parts" },
  { src: "/image/product1.jpg",      caption: "Custom fabricated industrial component" },
  { src: "/image/execution.jpg",     caption: "Steel structure assembly for manufacturing" },
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

export default function ManufacturingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Fabrication"
        title="Machine Manufacturing"
        subtitle="Custom industrial machines precision-built to your exact specifications — from concept to commissioning."
        bgImage="/image/manufacturing.jpg"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              Built to Work. Built to Last.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              At Imvunwa, we design and manufacture custom industrial machines that meet the unique demands of your production environment. Whether you need a single prototype or full production line equipment, our engineering team delivers machines with the precision and durability your business depends on.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              Every machine is built using high-quality, locally and internationally sourced materials, assembled by skilled technicians, and tested rigorously before delivery.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Request a Custom Machine
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
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[32px]">Sample Manufacturing Projects</h2>
            <p className="mt-3 max-w-[520px] text-[14px] leading-[1.7] text-muted">
              A selection of machines and fabricated equipment we have built for clients across Rwanda.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => <ProjectCard key={i} {...p} />)}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/projects?cat=manufacturing"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal">
              View All Manufacturing Projects →
            </Link>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Need a custom machine built?"
        body="Share your specifications and our engineering team will design the right solution for your production needs."
        href="/contact"
        label="Get a Free Quote"
      />
    </div>
  );
}
