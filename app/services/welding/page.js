"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Structural steel welding for buildings and industrial frameworks",
  "MIG, TIG, and ARC welding across all metal types",
  "Custom gates, doors, fences, and security barriers",
  "Roof trusses and roofing frame fabrication",
  "Field and on-site welding for urgent repairs",
  "Quality welds inspected for strength and safety",
];

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

      {/* Projects & Categories */}
      <ServiceProjects serviceId="welding" />
    </div>
  );
}
