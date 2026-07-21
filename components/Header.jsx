"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ChevronIcon from "./ui/ChevronIcon";

/* ── Data ────────────────────────────────────────────────────── */
const MARQUEE_ITEMS = [
  "Call +250 787 782 226",
  "Call +250 790 755 673",
  "Email ishimwediane400@gmail.com",
  "Rwanda, Kigali, Kimironko",
  "Industrial manufacturing and repair services",
];

const NAV_LINKS = [
  { href: "/",        label: "Home",       exact: true },
  { href: "/projects",label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const SERVICE_LINKS = [
  { name: "Manufacturing of Machines",       href: "/services#manufacturing" },
  { name: "Repairment of Machines",          href: "/services#repair" },
  { name: "Welding Services",                href: "/services#welding" },
  { name: "Painting Services",               href: "/services#painting" },
  { name: "Electricity Installation & Repair", href: "/services#electricity" },
  { name: "Plumbing Services",               href: "/services#plumbing" },
  { name: "Product Design",                  href: "/services#design" },
];

/* ── Sub-components ──────────────────────────────────────────── */
function NavLink({ href, label, exact = false, onClick }) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`transition-colors hover:text-signal ${isActive ? "font-black text-signal" : "text-white/80"}`}
    >
      {label}
    </Link>
  );
}

/* ── Header ──────────────────────────────────────────────────── */
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = () => { setMobileOpen(false); setMobileServicesOpen(false); };

  return (
    <>
      <header className="relative z-20 bg-deeper text-white shadow-md">

        {/* ── Top marquee bar ── */}
        <div className="overflow-hidden border-b border-white/10 bg-signal py-2 text-[12px] font-semibold text-ink">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span className="mx-6 inline-flex items-center gap-3" key={`${item}-${i}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-ink/30" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <div className="mx-auto flex min-h-[80px] w-full max-w-nav items-center justify-between border-b border-white/10 px-4 py-3 sm:px-8 lg:px-10">

          {/* Logo */}
          <Link className="flex shrink-0 items-center gap-3" href="/" aria-label="Imvunwa home">
            <Image
              src="/image/logo.jpg"
              alt="Imvunwa Business Group Ltd logo"
              width={72}
              height={72}
              priority
              className="h-[72px] w-auto object-contain"
            />
            <span className="hidden flex-col lg:flex">
              <span className="text-[16px] font-black uppercase leading-none tracking-wider text-white">Imvunwa</span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Business Group Ltd</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-wide lg:flex" aria-label="Main navigation">

            <NavLink href="/" label="Home" exact />

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 transition-colors hover:text-signal ${pathname.startsWith("/services") ? "font-black text-signal" : "text-white/80"}`}
              >
                Services
                <ChevronIcon open={dropdownOpen} />
              </Link>

              {dropdownOpen && (
                <div
                  className="services-dropdown absolute left-0 z-50 overflow-y-auto rounded-b-md"
                  style={{
                    top: "calc(100% + 12px)",
                    minWidth: "260px",
                    maxHeight: "70vh",
                    background: "#ffffff",
                    borderTop: "4px solid var(--color-brand)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      onClick={() => setDropdownOpen(false)}
                      className="services-dropdown-item"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.filter(l => l.href !== "/").map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} exact={l.exact} />
            ))}

            <Link
              href="/contact"
              className="ml-4 inline-flex min-h-[46px] items-center justify-center rounded-lg bg-signal px-6 py-2 text-[13px] font-black text-white transition-opacity hover:opacity-90"
            >
              Contact +250787782226
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="flex flex-col gap-[5px] lg:hidden focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-white transition-transform duration-300 ${mobileOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* ── Mobile nav ── */}
        {mobileOpen && (
          <nav
            className="flex flex-col gap-4 border-t border-white/10 bg-deeper px-6 py-4 text-[13px] font-bold uppercase text-white/80 lg:hidden"
            aria-label="Mobile navigation"
          >
            <Link onClick={closeMobile} className="hover:text-signal transition-colors" href="/">Home</Link>

            {/* Mobile services accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between hover:text-signal transition-colors"
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronIcon open={mobileServicesOpen} />
              </button>

              {mobileServicesOpen && (
                <div
                  className="mt-2 flex flex-col overflow-y-auto normal-case font-semibold"
                  style={{ borderLeft: "3px solid var(--color-brand)", paddingLeft: "12px", maxHeight: "240px" }}
                >
                  {SERVICE_LINKS.map((s) => (
                    <Link
                      key={s.name}
                      href={s.href}
                      onClick={closeMobile}
                      className="py-2 text-white/70 hover:text-signal transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link onClick={closeMobile} className="hover:text-signal transition-colors" href="/projects">Projects</Link>
            <Link onClick={closeMobile} className="hover:text-signal transition-colors" href="/contact">Contact</Link>

            <Link
              onClick={closeMobile}
              href="/contact"
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-signal px-6 py-2.5 text-[13px] font-black text-white transition-opacity hover:opacity-90"
            >
              Contact +250787782226
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
