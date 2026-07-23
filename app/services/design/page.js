"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Product concept development and engineering sketches",
  "3D prototype design and build-ready technical drawings",
  "Material selection and cost-optimised design",
  "Prototype fabrication and iterative testing",
  "Design-to-production handover with full documentation",
  "Custom product design for industrial and commercial use",
];

export default function DesignPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Design"
        title="Product Design"
        subtitle="From concept sketch to production-ready prototype — practical engineering design for industrial and commercial products."
        bgImage="/image/design.jpg"
      />

      {/* About */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Ideas Engineered Into Reality.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-muted">
              Imvunwa works with businesses and individuals to transform product ideas into functional, manufacturable designs. Our engineering team combines creative thinking with practical knowledge of materials, manufacturing processes, and cost constraints.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted">
              Whether you have a rough concept or detailed requirements, we will guide you through the design, prototype, and production preparation stages — making sure the final product works exactly as intended.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Start a Design Project
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
      <ServiceProjects serviceId="design" />
    </div>
  );
}
