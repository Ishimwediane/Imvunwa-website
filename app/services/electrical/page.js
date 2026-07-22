"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "New electrical system installation for industrial & commercial spaces",
  "Fault diagnosis and electrical repair services",
  "Distribution boards, wiring, and circuit breaker installation",
  "Industrial machinery electrical connections and controls",
  "Lighting installation — indoor, outdoor, and industrial",
  "Safety inspection and compliance certification support",
];

export default function ElectricalPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Installation"
        title="Electrical Works"
        subtitle="Safe, certified electrical installation, maintenance, and repair for residential, commercial, and industrial properties."
        bgImage="/image/electricity.jpg"
      />

      {/* About */}
      <section className="bg-base px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] sm:text-[34px] lg:text-[40px]">
              Safe Power. Reliable Systems.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-white/65">
              Imvunwa&apos;s electricians install, maintain, and repair electrical systems for factories, commercial buildings, and homes. We work to the highest safety standards, ensuring every connection is correct, every circuit is protected, and every system performs reliably.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-white/65">
              From a full factory wiring fit-out to a single fault repair, our team responds professionally and completes the work with minimal disruption to your operations.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Book Electrical Service
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
      <ServiceProjects serviceId="electrical" />
    </div>
  );
}
