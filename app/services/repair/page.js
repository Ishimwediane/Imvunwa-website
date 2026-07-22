"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Complete diagnostics — electrical, mechanical, hydraulic",
  "Component-level repair and precision calibration",
  "Preventive maintenance plans to avoid costly downtime",
  "Genuine and compatible spare parts sourcing",
  "On-site and workshop repair for all machine types",
  "Fast turnaround to minimise production disruption",
];

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

      {/* Projects & Categories */}
      <ServiceProjects serviceId="repair" />
    </div>
  );
}
