"use client";

import Link from "next/link";

const shell = "relative mx-auto w-full max-w-[1180px]";
const eyebrow = "mb-3.5 text-xs font-black uppercase tracking-normal text-signal";
const bodyText = "text-muted leading-[1.65]";

const services = [
  {
    title: "Machine Manufacturing",
    text: "Custom machines engineered for industrial use, built with durable materials, practical controls, and dependable performance.",
    image: "/image/manufacturing.jpg",
    tag: "Fabrication"
  },
  {
    title: "Machine Repair",
    text: "Diagnostics, restoration, and maintenance services that reduce downtime and return equipment to working condition.",
    image: "/image/repairement.jpg",
    tag: "Maintenance"
  },
  {
    title: "Welding Services",
    text: "Structural and custom welding for fabrication, repair, installation, and field service projects.",
    image: "/image/welding1.png",
    tag: "Metalwork"
  },
  {
    title: "Painting Services",
    text: "Professional residential, commercial, interior, and exterior painting services delivering a fresh look and surface protection.",
    image: "/image/paint.jpg",
    tag: "Finishing"
  },
  {
    title: "Electrical Works",
    text: "Safe electrical installation, repair, and maintenance for residential, commercial, and industrial spaces.",
    image: "/image/electricity.jpg",
    tag: "Installation"
  },
  {
    title: "Plumbing Services",
    text: "Water system installation, repair, and maintenance of water systems for homes, businesses, and project sites.",
    image: "/image/plumb.jpg",
    tag: "Utilities"
  },
  {
    title: "Product Design",
    text: "Practical product concepts, prototypes, and build-ready design support for teams turning ideas into products.",
    image: "/image/product1.jpg",
    tag: "Design"
  }
];

export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      {/* Page Hero */}
      <section className="bg-ink px-4 py-20 text-white sm:px-6">
        <div className={`${shell} text-center`}>
          <p className={eyebrow}>Capabilities</p>
          <h1 className="m-0 text-[44px] font-black leading-[1.04] sm:text-[60px] lg:text-[72px]">Our Services</h1>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-[1.7] text-white/75">
            We deliver reliable, high-quality engineering and trade services across Rwanda — from fabrication to finishing.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <div className={shell}>
          <div className="mt-0 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article className="group flex min-h-[440px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-[0_12px_34px_rgba(17,19,22,0.06)]" key={service.title}>
                <div className="relative h-[210px] w-full overflow-hidden shrink-0">
                  <img className="h-full w-full object-cover contrast-105 saturate-[.86] transition-transform duration-500 group-hover:scale-110" src={service.image} alt={service.title} />
                  <div className="absolute inset-0 flex items-center justify-center bg-[#F5A623]/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="text-xl font-black text-ink">Read more</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="inline-flex text-xs font-black uppercase text-signal-dark">{service.tag}</span>
                  <h2 className="my-3 text-[23px] font-extrabold">{service.title}</h2>
                  <p className={`${bodyText} mb-6`}>{service.text}</p>
                  <Link href="/contact" className="mt-auto inline-flex h-11 w-max items-center justify-center rounded-md bg-[#F5A623] px-6 font-bold text-white transition-colors hover:bg-[#e09212]">
                    More details
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink px-4 py-[70px] text-white sm:px-6 lg:py-24">
        <div className={`${shell} text-center`}>
          <h2 className="text-[34px] font-black sm:text-[48px]">Need a custom solution?</h2>
          <p className="mx-auto mt-4 max-w-[520px] text-lg text-white/70">Tell us about your project and we'll tailor the right service for you.</p>
          <Link href="/contact" className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#F5A623] px-10 font-black text-white hover:opacity-90 transition-opacity">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
