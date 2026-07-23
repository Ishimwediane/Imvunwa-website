"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";
import Eyebrow from "../../components/ui/Eyebrow";
import ArrowIcon from "../../components/ui/ArrowIcon";

/* ── Stats ───────────────────────────────────────────────────── */
const STATS = [
  { value: "10+",  label: "Years of Experience" },
  { value: "200+", label: "Projects Delivered" },
  { value: "7",    label: "Core Services" },
  { value: "100%", label: "Client Satisfaction" },
];

/* ── Why choose us ───────────────────────────────────────────── */
const REASONS = [
  {
    title: "One Stop Shop",
    text: "From fabrication to finishing, every industrial and household need is handled under one roof.",
  },
  {
    title: "Custom Solutions",
    text: "Machines and products designed and tailored to meet your specific industrial needs.",
  },
  {
    title: "Quality Craftsmanship",
    text: "Top-tier workmanship delivered with state-of-the-art equipment and quality materials.",
  },
  {
    title: "Multi-Service Expertise",
    text: "Seven core services spanning manufacturing, welding, painting, electrical, plumbing, repair, and design.",
  },
  {
    title: "Precision Engineering",
    text: "Accurate, durable results with careful quality control at every stage of the work.",
  },
  {
    title: "Dedicated Support",
    text: "Prompt diagnosis, reliable delivery, and after-sale support you can count on.",
  },
];

/* ── Team ────────────────────────────────────────────────────── */
const TEAM = [
  { name: "NIYONZIMA Pascal",       role: "Co-Founder & CEO",                             initials: "NP" },
  { name: "IRADUKUNDA Jean Michel", role: "Co-Founder & Advertisement and Stock Manager", initials: "IJ", image: "/image/IRADUKUNDA.jpg" },
  { name: "Muhire Gaspard",         role: "Co-Founder & Production Manager",               initials: "MG" },
  { name: "Claudine IMANIZABAYO",   role: "Co-Founder & Accountant",                      initials: "CI" },
];

/* ── Services summary ────────────────────────────────────────── */
const SERVICES = [
  { name: "Manufacturing of Machines",        href: "/services/manufacturing" },
  { name: "Machine Repairment",               href: "/services/repair" },
  { name: "Welding Services",                 href: "/services/welding" },
  { name: "Painting Services",                href: "/services/painting" },
  { name: "Electricity Installation and Repair", href: "/services/electrical" },
  { name: "Plumbing Services",                href: "/services/plumbing" },
  { name: "Product Design",                   href: "/services/design" },
];

/* ── Page ─────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="About Us"
        title="Who We Are"
        subtitle="Imvunwa Business Group is a leading metal fabrication, painting, repair, and restoration company — your one stop shop for transforming your space."
        bgImage="/image/imvunwa.jpg"
      />

      {/* ── Our Story ── */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[42px]">
              Transforming Spaces Across Rwanda.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-muted">
              Imvunwa Business Group Ltd is a leading metal fabrication, painting, repair, and restoration
              company, dedicated to delivering exceptional services to our clients. We specialise in
              transforming spaces through industrial services and product manufacturing, with a constant
              emphasis on precision engineering and quality finishes.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted">
              From designing and building custom machines to welding, painting, electrical, plumbing, and
              product design, we bring together a complete range of capabilities under one roof — so homes,
              businesses, schools, and factories have a single, trusted partner for the work they need done.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex min-h-[48px] items-center gap-3 rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover"
            >
              Explore Our Services
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative after:absolute after:-bottom-5 after:-right-5 after:-z-10 after:h-[44%] after:w-[44%] after:rounded-lg after:border after:border-signal">
            <Image
              src="/image/abou.jpg"
              alt="Imvunwa Business Group at work"
              width={520}
              height={600}
              quality={82}
              className="h-[360px] w-full rounded-lg object-cover shadow-industrial lg:h-[560px]"
            />
          </div>
        </Container>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-panel px-4 py-14 sm:px-6 border-t border-line">
        <Container>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[32px] font-black leading-none text-signal sm:text-[40px]">{s.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-8 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-signal/15 text-signal">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              <h3 className="mt-5 text-[20px] font-black text-ink">Our Mission</h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-muted">
                To transform spaces and empower businesses across Rwanda through high-quality metal
                fabrication, manufacturing, repair, and finishing — delivered with precision engineering
                and dependable craftsmanship.
              </p>
            </div>

            <div className="rounded-2xl border border-line bg-panel p-8 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-signal/15 text-signal">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </span>
              <h3 className="mt-5 text-[20px] font-black text-ink">Our Vision</h3>
              <p className="mt-3 text-[14px] leading-[1.8] text-muted">
                To be Rwanda&apos;s most trusted one stop shop for industrial services and product
                manufacturing — the first name businesses and homeowners think of when they want to
                transform their space.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Our Team ── */}
      <section className="bg-warm px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="mb-12 max-w-[620px]">
            <Eyebrow>Our people, our strength</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Meet the Team
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-muted">
              Meet the team that drives Imvunwa&apos;s success and commitment to quality.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="group flex flex-col items-center rounded-2xl border border-line bg-white p-7 text-center shadow-card transition-all hover:border-signal/50 hover:shadow-industrial"
              >
                {/* Avatar */}
                {member.image ? (
                  <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-signal/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      quality={80}
                      sizes="96px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-signal to-signal-hover text-[26px] font-black text-ink ring-2 ring-signal/30">
                    {member.initials}
                  </div>
                )}

                <h3 className="mt-5 text-[15px] font-extrabold leading-snug text-ink">{member.name}</h3>
                <div className="mx-auto mt-3 h-[3px] w-8 rounded-full bg-signal" />
                <p className="mt-3 text-[12px] font-semibold leading-[1.5] text-muted">{member.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="bg-panel px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="mb-12 max-w-[560px]">
            <Eyebrow>Why choose us</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Built on Quality &amp; Trust
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-muted">
              What sets Imvunwa apart is the range, precision, and reliability we bring to every project.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r) => (
              <div key={r.title} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <h3 className="text-[15px] font-extrabold text-ink">{r.title}</h3>
                <div className="mt-3 h-[3px] w-8 rounded-full bg-signal" />
                <p className="mt-4 text-[13px] leading-[1.65] text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What We Do ── */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>What we do</Eyebrow>
              <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex min-h-[46px] items-center gap-3 rounded-full border border-ink/20 px-7 text-[12px] font-black text-ink/70 transition-all duration-300 hover:border-signal hover:text-signal"
            >
              View All Services
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.name}
                href={s.href}
                className="group flex items-center justify-between gap-3 rounded-lg border border-line bg-panel px-5 py-4 shadow-sm transition-all hover:border-signal hover:bg-signal/5"
              >
                <span className="text-[13.5px] font-bold text-ink/85 group-hover:text-ink">{s.name}</span>
                <ArrowIcon className="h-4 w-4 shrink-0 text-signal transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Let's transform your space."
        body="Tell us what you need built, repaired, or finished — and our team will help shape the next step."
        href="/contact"
        label="Get in Touch"
        videoSrc="/video-imvunwa/Create_an_second_cinematic_v.mp4"
      />
    </div>
  );
}
