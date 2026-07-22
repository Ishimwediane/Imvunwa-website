"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Heavy-duty industrial pipe installation for factories",
  "Water system installation for commercial buildings",
  "Leak detection, diagnosis, and emergency repairs",
  "Sewage and drainage system installation",
  "Hot and cold water system setup and maintenance",
  "Custom plumbing layouts for large construction projects",
];

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
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Reliable Flow. Zero Leaks.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-muted">
              Imvunwa delivers heavy-duty plumbing solutions for factories, commercial buildings, and construction sites. We install, maintain, and repair water systems that need to perform reliably under industrial demand.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted">
              Our plumbers are experienced with complex pipe routing, high-pressure systems, and large infrastructure layouts — delivering clean, leak-free installations on time.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Book a Plumber
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
      <ServiceProjects serviceId="plumbing" />
    </div>
  );
}
