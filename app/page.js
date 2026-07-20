"use client";

import { useRef } from "react";
import Link from "next/link";

const shell = "relative mx-auto w-full max-w-[1180px]";


export default function Home() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };
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
          className="relative z-10 flex w-full max-w-[52%] flex-col justify-center px-8 py-16 lg:px-16"
          style={{
            background:
              "linear-gradient(to right, #0e1215 0%, #0e1215 55%, rgba(14,18,21,0) 100%)",
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
          <p className="mt-4 max-w-[460px] text-[14px] leading-[1.7] text-white/60">
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
      <section className="px-4 py-[70px] sm:px-6 lg:py-24" style={{ background: "#f8f6f1" }}>
        <div className={shell}>
          {/* Header row */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-12">
            <div>
              <h2 className="m-0 text-[34px] font-black leading-[1.06] text-black sm:text-[46px]">Our Services</h2>
              <p className="mt-3 max-w-[460px] text-[15px] leading-[1.7] text-black/50">
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
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Machine Manufacturing</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                Custom machines engineered for industrial use — precision-built to your exact specifications.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 2 — Machine Repair */}
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Machine Repair</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                Diagnostics, restoration, and maintenance services to keep your equipment running at peak performance.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 3 — Welding Services */}
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Welding Services</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                Structural and custom welding for fabrication and repair — delivered with precision and safety.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 4 — Project Management */}
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Project Management</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                End-to-end project oversight ensuring timely delivery, budget control, and quality assurance.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 5 — Design & Fabrication */}
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Design & Fabrication</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                Creative product design paired with expert fabrication for industrial and commercial applications.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

            {/* Card 6 — Electrical & Plumbing */}
            <div className="group flex flex-col rounded-2xl bg-[#fdfbf8] p-7 shadow-sm border border-black/10 hover:bg-black hover:border-black hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#F5A623]/10 group-hover:bg-white/10 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-black group-hover:text-white transition-colors duration-300">Electrical & Plumbing</h3>
              <p className="mt-2 text-[13px] leading-[1.7] text-black/50 group-hover:text-white/60 flex-1 transition-colors duration-300">
                Reliable electrical installations and plumbing solutions for industrial and commercial buildings.
              </p>
              <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-bold text-black group-hover:text-[#F5A623] hover:gap-3 transition-all duration-300">
                Learn more <span className="text-base">›</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Portfolio Section ── */}
      <section className="px-4 py-[70px] sm:px-6 lg:py-24" style={{ background: "#0e1215" }}>
        <div className={shell}>
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#F5A623]">
                Our Work
              </p>
              <h2 className="m-0 text-[34px] font-black leading-[1.06] text-white sm:text-[46px]">
                Portfolio &amp; Projects
              </h2>
              <p className="mt-3 max-w-[500px] text-[15px] leading-[1.7] text-white/50">
                A showcase of precision-engineered products and completed projects spanning all our service categories.
              </p>
            </div>
            
            {/* Slider Navigation Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Previous Project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-300"
                aria-label="Next Project"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Portfolio Slider container */}
          <div 
            ref={sliderRef}
            className="mt-12 flex gap-5 overflow-x-auto pb-8 scrollbar-none snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {[
              { type: "orange", src: "/image/manifa.jpg",       alt: "Machine manufacturing",        tag: "Manufacturing",   title: "Custom Industrial Machine",       desc: "Precision-built industrial equipment for local manufacturing plants." },
              { type: "black",  src: "/image/repaire.jpg",      alt: "Machine repair",              tag: "Repair",          title: "Heavy Equipment Overhaul",         desc: "Full diagnostics and restoration of production-critical machinery." },
              { type: "orange", src: "/image/welding1.png",     alt: "Welding project",             tag: "Welding",         title: "Structural Steel Fabrication",     desc: "Custom welded steel frameworks for industrial and commercial builds." },
              { type: "black",  src: "/image/electricity.jpg",  alt: "Electrical installation",     tag: "Electrical",      title: "Industrial Electrical System",     desc: "Complete wiring and electrical fit-out for manufacturing facilities." },
              { type: "orange", src: "/image/painting.jpg",     alt: "Painting project",            tag: "Painting",        title: "Anti-Corrosion Coating",           desc: "Industrial-grade protective coating for long-lasting metal surfaces." },
              { type: "black",  src: "/image/plumb.jpg",        alt: "Plumbing network",            tag: "Plumbing",        title: "Commercial Plumbing Network",      desc: "Full plumbing infrastructure for industrial and commercial buildings." },
              { type: "orange", src: "/image/repairement.jpg",  alt: "Machine repairement",         tag: "Repair",          title: "Precision Machine Restoration",    desc: "Component-level repair and calibration of complex industrial equipment." },
              { type: "black",  src: "/image/paint.jpg",        alt: "Paint finish project",        tag: "Painting",        title: "Industrial Paint Finish",          desc: "High-durability surface coating for steel structures and equipment." },
              { type: "orange", src: "/image/plumbling.jpg",    alt: "Plumbing installation",       tag: "Plumbing",        title: "Industrial Piping System",         desc: "Heavy-duty pipe installation for factories and production facilities." },
              { type: "black",  src: "/image/design.jpg",       alt: "Product design",              tag: "Design",          title: "Product Design & Prototyping",     desc: "Engineering drawings and prototype fabrication for custom products." },
              { type: "orange", src: "/image/mman.png",         alt: "Manufacturing process",       tag: "Manufacturing",   title: "Production Line Equipment",        desc: "End-to-end fabrication of machinery for production line integration." },
              { type: "black",  src: "/image/manufacturing.jpg",alt: "Manufacturing facility",      tag: "Manufacturing",   title: "Factory Setup & Installation",     desc: "Turnkey manufacturing setup including installation and commissioning." },
            ].map((item, i) => {
              const isOrange = item.type === "orange";
              return (
                <div 
                  key={i} 
                  className="group relative h-[360px] w-[320px] flex-shrink-0 overflow-hidden rounded-2xl snap-start cursor-pointer border border-white/5"
                >
                  {/* Background Image */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Curved Overlay Shape */}
                  <div 
                    className={`absolute bottom-0 left-0 w-[84%] h-[72%] rounded-tr-full transition-transform duration-500 origin-bottom-left group-hover:scale-[1.03] ${
                      isOrange ? "bg-[#F5A623]" : "bg-black/90 border-t border-r border-white/10"
                    }`}
                  />
                  
                  {/* Floating Action Arrow Button on the curve boundary */}
                  <div 
                    className={`absolute left-[70%] bottom-[60%] flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-45 ${
                      isOrange ? "bg-white text-[#F5A623]" : "bg-[#F5A623] text-white"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                  
                  {/* Text Details */}
                  <div className="absolute bottom-0 left-0 z-10 w-[72%] p-6 text-left flex flex-col justify-end h-full">
                    <span 
                      className={`text-[9px] font-black uppercase tracking-wider mb-1 ${
                        isOrange ? "text-black/60" : "text-[#F5A623]"
                      }`}
                    >
                      {item.tag}
                    </span>
                    <h3 
                      className={`text-[17px] font-black leading-tight ${
                        isOrange ? "text-black" : "text-white"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className={`mt-2 text-[11px] leading-relaxed transition-opacity duration-300 ${
                        isOrange ? "text-black/85" : "text-white/70"
                      }`}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex min-h-[50px] items-center gap-3 rounded-full border border-white/20 px-8 text-[13px] font-black text-white/70 hover:border-[#F5A623] hover:text-[#F5A623] transition-all duration-300"
            >
              View Detailed Projects Page
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>




      {/* ── Testimonials Section ── */}
      <section
        className="relative overflow-hidden py-[90px]"
        style={{
          backgroundImage: "url('/image/testimoni.jpg')",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/72" />

        {/* Inject float keyframe */}
        <style>{`
          @keyframes float-up {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-10px); }
          }
          .tcard-1 { animation: float-up 5s ease-in-out infinite; }
          .tcard-2 { animation: float-up 6.5s ease-in-out 1s infinite; }
          .tcard-3 { animation: float-up 5.8s ease-in-out 0.5s infinite; }
        `}</style>

        <div className="relative z-10 mx-auto max-w-[1180px] px-4 sm:px-6">
          {/* Header */}
          <div className="mb-14 text-center">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.18em] text-[#F5A623]">
              Client Voices
            </p>
            <h2 className="text-[34px] font-black leading-[1.06] text-white sm:text-[46px]">
              What Our Clients Say
            </h2>
            <p className="mt-3 text-[15px] leading-[1.7] text-white/55 max-w-[500px] mx-auto">
              Real results, real clients — here&apos;s what they experienced working with Imvunwa.
            </p>
          </div>

          {/* 3 Testimonial Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {/* ── Card 1 ── */}
            <div
              className="tcard-1 flex flex-col overflow-hidden rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              {/* Product image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <img
                  src="/image/manifa.jpg"
                  alt="Custom machine manufactured for Jean-Pierre"
                  className="h-full w-full object-cover"
                />
                {/* Gradient fade into card body */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                {/* Service badge */}
                <span className="absolute bottom-3 left-4 rounded-full bg-[#F5A623] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  Machine Manufacturing
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="h-4 w-4 text-[#F5A623]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote mark */}
                <svg className="mb-3 h-7 w-7 text-[#F5A623]/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H5.9C6.4 13.5 8 11.5 10 11V8zm12 0c-4.4 0-8 3.6-8 8v8h8v-8h-4.1c.5-2.5 2.1-4.5 4.1-5V8z"/>
                </svg>

                <p className="flex-1 text-[14px] leading-[1.85] text-white/80">
                  Imvunwa fabricated the custom machines for our production line on time and within budget. The quality is exceptional — we&apos;ve had zero downtime since installation. Truly world-class work.
                </p>

                {/* Divider */}
                <div className="my-5 h-px bg-white/10" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[13px] font-black text-white">
                    J
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white">Jean-Pierre Nkurunziza</div>
                    <div className="text-[11px] text-white/50">Factory Manager, Kigali</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 2 ── */}
            <div
              className="tcard-2 flex flex-col overflow-hidden rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              {/* Product image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <img
                  src="/image/welding1.png"
                  alt="Steel structure welded for Emmanuel"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                <span className="absolute bottom-3 left-4 rounded-full bg-[#F5A623] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  Welding Services
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="h-4 w-4 text-[#F5A623]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                <svg className="mb-3 h-7 w-7 text-[#F5A623]/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H5.9C6.4 13.5 8 11.5 10 11V8zm12 0c-4.4 0-8 3.6-8 8v8h8v-8h-4.1c.5-2.5 2.1-4.5 4.1-5V8z"/>
                </svg>

                <p className="flex-1 text-[14px] leading-[1.85] text-white/80">
                  The welding work on our steel structure was absolutely flawless. Clean welds, precise measurements, and they finished two days ahead of schedule. I would not trust anyone else for structural work.
                </p>

                <div className="my-5 h-px bg-white/10" />

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[13px] font-black text-white">
                    E
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white">Emmanuel Habimana</div>
                    <div className="text-[11px] text-white/50">Construction Contractor, Kigali</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Card 3 ── */}
            <div
              className="tcard-3 flex flex-col overflow-hidden rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              {/* Product image */}
              <div className="relative h-[200px] w-full overflow-hidden">
                <img
                  src="/image/painting.jpg"
                  alt="Painting project done for Vestine"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                <span className="absolute bottom-3 left-4 rounded-full bg-[#F5A623] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                  Painting Services
                </span>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-6">
                {/* Stars */}
                <div className="mb-4 flex gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="h-4 w-4 text-[#F5A623]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>

                <svg className="mb-3 h-7 w-7 text-[#F5A623]/40" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H5.9C6.4 13.5 8 11.5 10 11V8zm12 0c-4.4 0-8 3.6-8 8v8h8v-8h-4.1c.5-2.5 2.1-4.5 4.1-5V8z"/>
                </svg>

                <p className="flex-1 text-[14px] leading-[1.85] text-white/80">
                  The painting finish on our hotel facility is simply stunning. Very durable, applied with great care and attention to detail. Our guests always compliment how well-maintained the building looks.
                </p>

                <div className="my-5 h-px bg-white/10" />

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#F5A623] text-[13px] font-black text-white">
                    V
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white">Vestine Iradukunda</div>
                    <div className="text-[11px] text-white/50">Hotel Manager, Rubavu</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
