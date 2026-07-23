"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "../components/ui/Container";
import Eyebrow from "../components/ui/Eyebrow";
import ServiceCard from "../components/ui/ServiceCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import ArrowIcon from "../components/ui/ArrowIcon";

/* ── Services data ───────────────────────────────────────────── */
const SERVICES = [
  {
    title: "Manufacturing of Machines",
    description: "Design and production of high-quality machines tailored to meet specific industrial needs.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Machine Repairment",
    description: "Comprehensive repair services for a wide range of machinery, with prompt diagnosis and effective solutions.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Welding Services",
    description: "Top-tier welding services for both structural and custom projects, delivered with precision and safety.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Painting Services",
    description: "Top-quality painting finishes for homes and businesses, with lasting protective surface coating.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Electricity Installation and Repair",
    description: "Professional electrical services including installation, repair, and maintenance by certified electricians.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Plumbing Services",
    description: "Installations, repairs, and maintenance of water systems for residential and commercial spaces.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-3.727 0-6.75-2.925-6.75-6.532 0-3.28 3.04-7.087 5.446-9.94A1.71 1.71 0 0112 4.657a1.71 1.71 0 011.304.62c2.406 2.854 5.446 6.66 5.446 9.94 0 3.608-3.023 6.533-6.75 6.533z" />
      </svg>
    ),
  },
  {
    title: "Product Design",
    description: "Innovative product design services developed collaboratively using cutting-edge technology.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
];

/* ── Portfolio data ───────────────────────────────────────────── */
const PORTFOLIO_ITEMS = [
  { src: "/image/manifa.jpg",        alt: "Machine manufacturing",     tag: "Manufacturing",  title: "Custom Industrial Machine",     desc: "Precision-built industrial equipment for local manufacturing plants." },
  { src: "/image/repaire.jpg",       alt: "Machine repair",            tag: "Repair",         title: "Heavy Equipment Overhaul",       desc: "Full diagnostics and restoration of production-critical machinery." },
  { src: "/image/welding1.png",      alt: "Welding project",           tag: "Welding",        title: "Structural Steel Fabrication",   desc: "Custom welded steel frameworks for industrial and commercial builds." },
  { src: "/image/electricity.jpg",   alt: "Electrical installation",   tag: "Electrical",     title: "Industrial Electrical System",   desc: "Complete wiring and electrical fit-out for manufacturing facilities." },
  { src: "/image/painting.jpg",      alt: "Painting project",          tag: "Painting",       title: "Anti-Corrosion Coating",         desc: "Industrial-grade protective coating for long-lasting metal surfaces." },
  { src: "/image/plumb.jpg",         alt: "Plumbing network",          tag: "Plumbing",       title: "Commercial Plumbing Network",    desc: "Full plumbing infrastructure for industrial and commercial buildings." },
  { src: "/image/repairement.jpg",   alt: "Machine repairement",       tag: "Repair",         title: "Precision Machine Restoration",  desc: "Component-level repair and calibration of complex industrial equipment." },
  { src: "/image/paint.jpg",         alt: "Paint finish project",      tag: "Painting",       title: "Industrial Paint Finish",        desc: "High-durability surface coating for steel structures and equipment." },
  { src: "/image/plumbling.jpg",     alt: "Plumbing installation",     tag: "Plumbing",       title: "Industrial Piping System",       desc: "Heavy-duty pipe installation for factories and production facilities." },
  { src: "/image/design.jpg",        alt: "Product design",            tag: "Design",         title: "Product Design & Prototyping",  desc: "Engineering drawings and prototype fabrication for custom products." },
  { src: "/image/mman.png",          alt: "Manufacturing process",     tag: "Manufacturing",  title: "Production Line Equipment",      desc: "End-to-end fabrication of machinery for production line integration." },
  { src: "/image/manufacturing.jpg", alt: "Manufacturing facility",    tag: "Manufacturing",  title: "Factory Setup & Installation",  desc: "Turnkey manufacturing setup including installation and commissioning." },
];

/* ── Hero stats ──────────────────────────────────────────────── */
const STATS = [
  { value: "10+",  label: "Years Exp." },
  { value: "200+", label: "Projects" },
  { value: "100%", label: "Satisfaction" },
];

/* ── Testimonial data ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    image:     "/image/manifa.jpg",
    imageAlt:  "Custom machine manufactured for Jean-Pierre",
    badge:     "Manufacturing of Machines",
    quote:     "Imvunwa fabricated the custom machines for our production line on time and within budget. The quality is exceptional — we've had zero downtime since installation. Truly world-class work.",
    author:    "Jean-Pierre Nkurunziza",
    role:      "Factory Manager, Kigali",
    initial:   "J",
    animClass: "animate-float-1",
  },
  {
    image:     "/image/welding1.png",
    imageAlt:  "Steel structure welded for Emmanuel",
    badge:     "Welding Services",
    quote:     "The welding work on our steel structure was absolutely flawless. Clean welds, precise measurements, and they finished two days ahead of schedule. I would not trust anyone else for structural work.",
    author:    "Emmanuel Habimana",
    role:      "Construction Contractor, Kigali",
    initial:   "E",
    animClass: "animate-float-2",
  },
  {
    image:     "/image/painting.jpg",
    imageAlt:  "Painting project done for Vestine",
    badge:     "Painting Services",
    quote:     "The painting finish on our hotel facility is simply stunning. Very durable, applied with great care and attention to detail. Our guests always compliment how well-maintained the building looks.",
    author:    "Vestine Iradukunda",
    role:      "Hotel Manager, Rubavu",
    initial:   "V",
    animClass: "animate-float-3",
  },
];

/* ── PortfolioCard ────────────────────────────────────────────── */
function PortfolioCard({ src, alt, tag, title, desc }) {
  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl cursor-pointer border border-white/10 bg-base">
      {/* Background Image */}
      <Image
        src={src}
        alt={alt}
        width={400}
        height={300}
        quality={75}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Overlay gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />

      {/* Arrow Button - scales up on hover */}
      <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 hover:bg-signal hover:text-white">
        <ArrowIcon className="h-4 w-4" />
      </div>

      {/* Text Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-10 pointer-events-none">
        <span className="text-[9px] font-black uppercase tracking-widest text-signal mb-1.5">{tag}</span>
        <h3 className="text-[15px] font-extrabold leading-snug text-white">{title}</h3>
        <p className="mt-2 text-[11px] leading-relaxed text-white/70 overflow-hidden max-h-0 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative flex h-screen min-h-[600px] overflow-hidden text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "20% center" }}
          src="/video-imvunwa/Create_an_second_cinematic_v (1).mp4"
          autoPlay muted loop playsInline aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div
          className="relative z-10 flex w-full max-w-[52%] flex-col justify-center px-8 py-16 lg:px-16"
          style={{ background: "linear-gradient(to right, var(--color-dark-bg) 0%, var(--color-dark-bg) 55%, rgba(14,18,21,0) 100%)" }}
        >
          <div className="mb-5 h-[3px] w-10 rounded-full bg-signal" />
          <Eyebrow>Imvunwa Business Group · Rwanda</Eyebrow>

          <h1 className="m-0 text-[24px] font-black leading-[1.08] tracking-tight text-white sm:text-[30px] lg:text-[36px]">
            Your One Stop Shop<br />
            For <span className="text-signal">Transforming</span><br />
            Your Space
          </h1>

          <p className="mt-4 max-w-[460px] text-[13px] leading-[1.7] text-white/60">
            A leading metal fabrication, painting, repair, and restoration company — delivering exceptional services across Rwanda.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center gap-3 rounded-full bg-signal py-2 pl-6 pr-2 text-[12px] font-black text-ink shadow-lg transition-colors hover:bg-signal-hover"
            >
              Get Started
              <span className="grid h-8 w-8 place-items-center rounded-full bg-ink/20">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-6 text-[12px] font-black text-white/80 transition-colors hover:border-white/60 hover:text-white"
            >
              Our Services
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-8 flex gap-6 border-t border-white/10 pt-6">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-[18px] font-black text-signal">{s.value}</div>
                <div className="mt-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-signal" />
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Scroll</span>
          <svg className="h-4 w-4 animate-bounce text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="bg-warm px-4 py-[70px] sm:px-6 lg:py-24">
        <Container>
          <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="m-0 text-[28px] font-black leading-[1.06] text-ink sm:text-[36px]">Our Services</h2>
              <p className="mt-3 max-w-[460px] text-[14px] leading-[1.7] text-ink/75">
                Metal fabrication, manufacturing, repair, and finishing — a complete range of industrial services to transform your space.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-signal px-7 font-black text-ink text-sm shadow-md transition-colors hover:bg-signal-hover"
            >
              Get Started
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Portfolio Section ── */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>Our Work</Eyebrow>
              <h2 className="m-0 text-[28px] font-black leading-[1.06] text-ink sm:text-[36px]">Portfolio & Projects</h2>
              <p className="mt-3 max-w-[500px] text-[14px] leading-[1.7] text-muted">
                A showcase of precision-engineered products and completed projects spanning all our service categories.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_ITEMS.slice(0, 6).map((item, i) => (
              <PortfolioCard key={i} {...item} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex min-h-[50px] items-center gap-3 rounded-full border border-ink/20 px-8 text-[12px] font-black text-ink/70 transition-all duration-300 hover:border-signal hover:text-signal"
            >
              View Detailed Projects Page
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Testimonials Section ── */}
      <section className="relative overflow-hidden py-[90px]">
        {/* Parallax-style optimized background image */}
        <Image
          src="/image/testimoni.jpg"
          alt="Testimonials background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.28]"
        />

        <div className="relative z-10 mx-auto max-w-shell px-4 sm:px-6">
          <div className="mb-14 text-center">
            <Eyebrow>Client Voices</Eyebrow>
            <h2 className="text-[28px] font-black leading-[1.06] text-white sm:text-[36px]">What Our Clients Say</h2>
            <p className="mx-auto mt-3 max-w-[500px] text-[14px] leading-[1.7] text-white/55">
              Real results, real clients — here&apos;s what they experienced working with Imvunwa.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.author} {...t} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
