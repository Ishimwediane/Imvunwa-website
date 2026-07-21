"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";

/* ── Data ────────────────────────────────────────────────────── */
const SERVICES = [
  { title: "Machine Manufacturing", text: "Custom machines engineered for industrial use, built with durable materials, practical controls, and dependable performance.",              image: "/image/manufacturing.jpg", tag: "Fabrication" },
  { title: "Machine Repair",        text: "Diagnostics, restoration, and maintenance services that reduce downtime and return equipment to working condition.",                      image: "/image/repairement.jpg",   tag: "Maintenance" },
  { title: "Welding Services",      text: "Structural and custom welding for fabrication, repair, installation, and field service projects.",                                       image: "/image/welding1.png",      tag: "Metalwork" },
  { title: "Painting Services",     text: "Professional residential, commercial, interior, and exterior painting services delivering a fresh look and surface protection.",         image: "/image/paint.jpg",         tag: "Finishing" },
  { title: "Electrical Works",      text: "Safe electrical installation, repair, and maintenance for residential, commercial, and industrial spaces.",                              image: "/image/electricity.jpg",   tag: "Installation" },
  { title: "Plumbing Services",     text: "Water system installation, repair, and maintenance of water systems for homes, businesses, and project sites.",                         image: "/image/plumb.jpg",         tag: "Utilities" },
  { title: "Product Design",        text: "Practical product concepts, prototypes, and build-ready design support for teams turning ideas into products.",                          image: "/image/product1.jpg",      tag: "Design" },
];

/* ── Image-based service card (services page layout) ─────────── */
function ServiceArticle({ title, text, image, tag }) {
  return (
    <article className="group flex min-h-[440px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card">
      <div className="relative h-[210px] w-full overflow-hidden shrink-0">
        <Image
          className="h-full w-full object-cover contrast-105 saturate-[.86] transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={title}
          width={400}
          height={210}
          quality={75}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-signal/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[16px] font-black text-ink">Read more</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex text-[10px] font-black uppercase text-signal-dark">{tag}</span>
        <h2 className="my-3 text-[19px] font-extrabold text-ink">{title}</h2>
        <p className="mb-6 flex-1 text-[13px] leading-[1.65] text-muted">{text}</p>
        <Link
          href="/contact"
          className="mt-auto inline-flex h-11 w-max items-center justify-center rounded-md bg-signal px-6 text-[12px] font-bold text-white transition-colors hover:bg-signal-hover"
        >
          More details
        </Link>
      </div>
    </article>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Capabilities"
        title="Our Services"
        subtitle="We deliver reliable, high-quality engineering and trade services across Rwanda — from fabrication to finishing."
      />

      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceArticle key={s.title} {...s} />
            ))}
          </div>
        </Container>
      </section>

      <SectionCta
        dark
        heading="Need a custom solution?"
        body="Tell us about your project and we'll tailor the right service for you."
        href="/contact"
        label="Get in Touch"
      />
    </div>
  );
}
