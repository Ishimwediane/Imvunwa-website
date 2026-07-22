"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Industrial anti-corrosion and protective coatings",
  "Interior and exterior painting for homes and businesses",
  "Surface preparation, priming, and finishing",
  "High-durability paints suited for Rwanda's climate",
  "Commercial and large-scale facility painting",
  "Clean, professional finish with minimal disruption",
];

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
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              A Fresh Finish. Long-Lasting Protection.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-muted">
              Imvunwa&apos;s painting team delivers clean, durable finishes for surfaces of all types — from industrial steel structures requiring anti-corrosion coatings to residential interiors needing a premium decorative touch.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted">
              We use high-quality, climate-appropriate paints and follow a thorough process of surface preparation, priming, and finishing to ensure results that look great and protect your property for years to come.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Request a Painting Quote
            </Link>
          </div>
          <div className="grid gap-3">
            {FEATURES.map((f, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-line bg-panel px-4 py-3.5 shadow-sm">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                <span className="text-[13px] leading-[1.6] text-ink/80">{f}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects & Categories */}
      <ServiceProjects serviceId="painting" />
    </div>
  );
}
