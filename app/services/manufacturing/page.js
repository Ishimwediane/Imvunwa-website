"use client";

import Link from "next/link";
import PageHero from "../../../components/ui/PageHero";
import Container from "../../../components/ui/Container";
import Eyebrow from "../../../components/ui/Eyebrow";
import ServiceProjects from "../../../components/ui/ServiceProjects";

const FEATURES = [
  "Custom machine design tailored to your production needs",
  "Industrial-grade materials for long-lasting durability",
  "Precision engineering with quality control at every stage",
  "Factory delivery, installation, and commissioning support",
  "Machines built to local and international standards",
  "Dedicated after-sale maintenance and technical support",
];

/* ── Product categories we manufacture ───────────────────────── */
const PRODUCT_CATEGORIES = [
  {
    name: "Housing Components",
    items: ["Roof trusses", "Gutters", "Metal fences", "Windows"],
  },
  {
    name: "Home Furniture",
    items: ["TV stands", "Storage units", "Wardrobes", "Bedroom furniture"],
  },
  {
    name: "School & Market Products",
    items: ["Cabinets", "Shelves", "Desks", "Tables"],
  },
  {
    name: "Kitchen Appliances",
    items: ["Processing machines", "Grinders", "Stoves", "Feeders"],
  },
];

export default function ManufacturingPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Fabrication"
        title="Manufacturing of Machines"
        subtitle="Design and production of high-quality machines tailored to meet specific industrial needs — from concept to commissioning."
        bgImage="/image/manufacturing.jpg"
      />

      {/* About */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-start gap-16 lg:grid-cols-2">
          <div>
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Built to Work. Built to Last.
            </h2>
            <p className="mt-5 text-[14px] leading-[1.8] text-muted">
              At Imvunwa, we design and manufacture custom industrial machines that meet the unique demands of your production environment. Whether you need a single prototype or full production line equipment, our engineering team delivers machines with the precision and durability your business depends on.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-muted">
              Every machine is built using high-quality, locally and internationally sourced materials, assembled by skilled technicians, and tested rigorously before delivery.
            </p>
            <Link href="/contact"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-signal px-8 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover">
              Request a Custom Machine
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

      {/* What We Manufacture — product categories */}
      <section className="bg-panel px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container>
          <div className="mb-12 max-w-[560px]">
            <Eyebrow>What we manufacture</Eyebrow>
            <h2 className="m-0 text-[26px] font-black leading-[1.06] text-ink sm:text-[34px] lg:text-[40px]">
              Products We Make
            </h2>
            <p className="mt-4 text-[14px] leading-[1.7] text-muted">
              Beyond industrial machines, our fabrication covers a wide range of metal and household products for homes, schools, markets, and businesses.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div key={cat.name} className="rounded-lg border border-line bg-white p-6 shadow-sm">
                <h3 className="text-[15px] font-extrabold text-ink">{cat.name}</h3>
                <div className="mt-3 h-[3px] w-8 rounded-full bg-signal" />
                <ul className="mt-4 grid gap-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-[1.5] text-ink/75">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects & Categories */}
      <ServiceProjects serviceId="manufacturing" />
    </div>
  );
}
