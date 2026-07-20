"use client";

import Link from "next/link";

const shell = "relative mx-auto w-full max-w-[1180px]";


export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero — split layout: dark left panel bleeds into full-screen video */}
      <section className="relative flex h-screen min-h-[600px] overflow-hidden text-white">

        {/* ── RIGHT: video (fills full section as absolute background) ── */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "20% center" }}
          src="/video-imvunwa/Create_an_second_cinematic_v (1).mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />

        {/* Very light overlay on video side — keeps it bright & cinematic */}
        <div className="absolute inset-0 bg-black/20" />

        {/* ── LEFT: dark steel panel that colour-matches the video edges ── */}
        {/* The right edge fades to transparent so it melts into the video */}
        <div
          className="relative z-10 flex w-full max-w-[38%] flex-col justify-center px-8 py-16 lg:px-12"
          style={{
            background:
              "linear-gradient(to right, #0e1215 0%, #0e1215 60%, rgba(14,18,21,0) 100%)",
          }}
        >
          {/* Amber top accent bar */}
          <div className="mb-5 h-[3px] w-10 rounded-full bg-[#F5A623]" />

          {/* Eyebrow label */}
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.18em] text-[#F5A623]">
            Industrial Excellence · Rwanda
          </p>

          {/* Headline */}
          <h1 className="m-0 text-[28px] font-black leading-[1.08] tracking-tight text-white sm:text-[36px] lg:text-[42px]">
            We Build &amp; Fix<br />
            <span className="text-[#F5A623]">Machines</span> That<br />
            Keep Rwanda Moving
          </h1>

          {/* Body */}
          <p className="mt-4 max-w-[320px] text-[13px] leading-[1.7] text-white/60">
            Manufacturing, repair, welding, electrical, plumbing, painting, and
            product design services — delivered with precision.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-[44px] items-center gap-3 rounded-full bg-[#F5A623] py-2 pl-6 pr-2 text-[12px] font-black text-white shadow-lg hover:bg-[#e09212] transition-colors"
              href="/contact"
            >
              Get Started
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            <Link
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 px-6 text-[12px] font-black text-white/80 hover:border-white/60 hover:text-white transition-colors"
              href="/services"
            >
              Our Services
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-8 flex gap-6 border-t border-white/10 pt-6">
            {[
              { value: "10+", label: "Years Exp." },
              { value: "200+", label: "Projects" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-[20px] font-black text-[#F5A623]">{stat.value}</div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Amber accent line at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-[3px] bg-[#F5A623]" />

        {/* Scroll indicator — sits on video side */}
        <div className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white">Scroll</span>
          <svg className="h-4 w-4 animate-bounce text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="px-4 py-[70px] sm:px-6 lg:py-24" style={{ background: "linear-gradient(135deg, #f8f6f1 0%, #f0ede6 100%)" }}>
        <div className={shell}>
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
            <div>
              <h2 className="m-0 text-[34px] font-black leading-[1.06] text-ink sm:text-[46px]">Our Services</h2>
              <p className="mt-3 max-w-[460px] text-[15px] leading-[1.7] text-muted">
                Unleashing Comprehensive Industrial Services Tailored to Elevate Your Business and Boost Your Success.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-full bg-[#F5A623] px-7 font-black text-white text-sm shadow-md hover:bg-[#e09212] transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* Card 1 — Machine Manufacturing */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Machine Manufacturing</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                Custom machines engineered for industrial use — precision-built to your exact specifications.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 2 — Machine Repair */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Machine Repair</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                Diagnostics, restoration, and maintenance services to keep your equipment running at peak performance.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 3 — Welding Services */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Welding Services</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                Structural and custom welding for fabrication and repair — delivered with precision and safety.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 4 — Project Management */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Project Management</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                End-to-end project oversight ensuring timely delivery, budget control, and quality assurance.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 5 — Design & Fabrication */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Design & Fabrication</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                Creative product design paired with expert fabrication for industrial and commercial applications.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 6 — Electrical & Plumbing */}
            <div className="group flex flex-col rounded-2xl bg-white p-7 shadow-sm border border-gray-100 hover:bg-[#0e1215] hover:border-[#0e1215] hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fef4e4] group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">Electrical & Plumbing</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-muted group-hover:text-white/60 flex-1 transition-colors duration-300">
                Reliable electrical installations and plumbing solutions for industrial and commercial buildings.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Manufacturing Journey Section ── */}
      <section style={{ background: "#2b2b2b" }} className="overflow-hidden pl-4 pr-0 py-[70px] sm:pl-6 lg:py-20">
        {/* Centered heading */}
        <div className="mx-auto mb-10 max-w-[820px] text-center">
          <h2 className="text-[28px] font-black leading-[1.1] text-white sm:text-[36px] lg:text-[44px]">
            From Concept to Creation: Our Manufacturing Journey
          </h2>
        </div>

        {/* Body — image wider, text overlaps it from the right */}
        <div className="mx-auto max-w-[1180px]">
          <div className="relative flex items-center">

            {/* Image — wider, strong right-edge dark fade for text readability */}
            <div className="relative w-[58%] flex-shrink-0 overflow-hidden rounded-2xl">
              <img
                src="/image/manufacturing.jpg"
                alt="Imvunwa team collaborating on a project"
                className="h-[420px] w-full object-cover lg:h-[480px]"
                style={{ filter: "grayscale(50%) brightness(0.55)" }}
              />
              {/* Heavy dark fade on right so overlapping text is readable */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(20,20,20,0.15) 0%, rgba(20,20,20,0.1) 40%, rgba(20,20,20,0.75) 80%, rgba(20,20,20,0.92) 100%)",
                }}
              />
            </div>

            {/* Text — pulled left so it overlaps the image's right edge, no card */}
            <div className="relative z-10 -ml-[18%] flex flex-col items-center gap-10 text-center lg:gap-12">

              {/* Block 1 — How we do things */}
              <div className="flex flex-col items-center">
                <h3 className="text-[20px] font-black text-white sm:text-[24px]">How we do things</h3>
                <p className="mt-3 text-[14px] leading-[1.85] text-white/70 whitespace-nowrap">
                  Dive into our structured manufacturing journey that blends innovation with precision, resulting in exceptional products.
                </p>
                <Link
                  href="/process"
                  className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#F5A623] px-8 font-bold text-white text-[13px] hover:bg-[#e09212] transition-colors"
                >
                  View our process
                </Link>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-white/15" />

              {/* Block 2 — The team */}
              <div className="flex flex-col items-center">
                <h3 className="text-[20px] font-black text-white sm:text-[24px]">
                  The Minds and Hands Behind Our Work
                </h3>
                <p className="mt-3 text-[14px] leading-[1.85] text-white/70 whitespace-nowrap">
                  Meet the people who turn ideas into reality with their unparalleled skills.
                </p>
                <Link
                  href="/about"
                  className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#F5A623] px-8 font-bold text-white text-[13px] hover:bg-[#e09212] transition-colors"
                >
                  meet expert
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
