"use client";

import { useState, useRef, useEffect } from "react";
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
  {
    name: "Manufacturing of Machines",
    href: "/services/manufacturing",
    subs: [
      { label: "Industrial Machines",  href: "/projects?cat=manufacturing&sub=Industrial%20Machines" },
      { label: "Product Fabrication",  href: "/projects?cat=manufacturing&sub=Product%20Fabrication" },
    ],
  },
  {
    name: "Repairment of Machines",
    href: "/services/repair",
    subs: [
      { label: "Heavy Equipment",  href: "/projects?cat=repair&sub=Heavy%20Equipment" },
      { label: "Precision Repair", href: "/projects?cat=repair&sub=Precision%20Repair" },
    ],
  },
  {
    name: "Welding Services",
    href: "/services/welding",
    subs: [
      { label: "Doors & Gates",      href: "/projects?cat=welding&sub=Doors%20%26%20Gates" },
      { label: "Roofing Frames",     href: "/projects?cat=welding&sub=Roofing%20Frames" },
      { label: "Structural Frames",  href: "/projects?cat=welding&sub=Structural%20Frames" },
    ],
  },
  {
    name: "Painting Services",
    href: "/services/painting",
    subs: [
      { label: "Anti-Corrosion Coating", href: "/projects?cat=painting&sub=Anti-Corrosion%20Coating" },
      { label: "Decorative Finishes",    href: "/projects?cat=painting&sub=Decorative%20Finishes" },
    ],
  },
  {
    name: "Electricity Installation & Repair",
    href: "/services/electrical",
    subs: [
      { label: "Industrial Wiring", href: "/projects?cat=electrical&sub=Industrial%20Wiring" },
    ],
  },
  {
    name: "Plumbing Services",
    href: "/services/plumbing",
    subs: [
      { label: "Industrial Piping", href: "/projects?cat=plumbing&sub=Industrial%20Piping" },
    ],
  },
  {
    name: "Product Design",
    href: "/services/design",
    subs: [
      { label: "Design & Prototyping", href: "/projects?cat=design&sub=Design%20%26%20Prototyping" },
    ],
  },
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

/* One row in the main dropdown — hovering opens its sub-panel */
function ServiceItem({ service, onClose }) {
  const [subOpen, setSubOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setSubOpen(true)}
      onMouseLeave={() => setSubOpen(false)}
    >
      {/* Single-line row: name · arrow — all on one line */}
      <Link
        href={service.href}
        onClick={onClose}
        className="services-dropdown-item flex w-full items-center whitespace-nowrap pr-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        <span className="flex-1 truncate">{service.name}</span>
        {service.subs.length > 0 && (
          <svg
            className="ml-auto shrink-0 h-3 w-3 opacity-40"
            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
      </Link>

      {/* Sub-panel to the right — stays open while hovering either the row or the panel */}
      {subOpen && service.subs.length > 0 && (
        <div
          className="services-dropdown absolute left-full top-0 z-[60] rounded-md"
          style={{
            minWidth: "200px",
            marginLeft: "2px",
            background: "#ffffff",
            borderTop: "4px solid var(--color-brand)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
        >
          <p className="px-4 pb-1 pt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-signal-dark">
            Projects by category
          </p>
          {service.subs.map((sub) => (
            <Link
              key={sub.label}
              href={sub.href}
              onClick={onClose}
              className="services-dropdown-item whitespace-nowrap text-[12px] font-semibold"
            >
              {sub.label}
            </Link>
          ))}
          <div className="mt-1 border-t border-line/30 pt-1">
            <Link
              href="/projects"
              onClick={onClose}
              className="services-dropdown-item whitespace-nowrap text-[11px] font-bold text-signal-dark hover:text-signal"
            >
              View all projects →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Header ──────────────────────────────────────────────────── */
export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState(null);
  const pathname  = usePathname();
  const wrapperRef = useRef(null); // ref around the whole Services button + dropdown

  /* ── Click-outside: close dropdown when user clicks anywhere else ── */
  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dropdownOpen]);

  const closeAll    = () => setDropdownOpen(false);
  const closeMobile = () => { setMobileOpen(false); setMobileServicesOpen(false); setMobileSubOpen(null); };

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

            {/* Services dropdown — click to open, click outside to close */}
            <div ref={wrapperRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center gap-1.5 transition-colors hover:text-signal ${pathname.startsWith("/services") ? "font-black text-signal" : "text-white/80"}`}
              >
                Services
                <ChevronIcon open={dropdownOpen} />
              </button>

              {dropdownOpen && (
                <div
                  className="services-dropdown absolute left-0 z-50 rounded-b-md"
                  style={{
                    top: "calc(100% + 12px)",
                    minWidth: "280px",
                    background: "#ffffff",
                    borderTop: "4px solid var(--color-brand)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  {SERVICE_LINKS.map((s) => (
                    <ServiceItem key={s.name} service={s} onClose={closeAll} />
                  ))}
                  <div className="mt-1.5 border-t border-line/40 pt-1">
                    <Link
                      href="/services"
                      onClick={closeAll}
                      className="services-dropdown-item font-bold text-signal-dark hover:text-signal"
                    >
                      All Services →
                    </Link>
                  </div>
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
                onClick={() => { setMobileServicesOpen(!mobileServicesOpen); setMobileSubOpen(null); }}
                className="flex w-full items-center justify-between hover:text-signal transition-colors"
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronIcon open={mobileServicesOpen} />
              </button>

              {mobileServicesOpen && (
                <div
                  className="mt-2 flex flex-col overflow-y-auto normal-case font-semibold"
                  style={{ borderLeft: "3px solid var(--color-brand)", paddingLeft: "12px", maxHeight: "340px" }}
                >
                  {SERVICE_LINKS.map((s) => (
                    <div key={s.name}>
                      <button
                        onClick={() => setMobileSubOpen(mobileSubOpen === s.name ? null : s.name)}
                        className="flex w-full items-center justify-between py-2 text-white/70 hover:text-signal transition-colors"
                      >
                        <span className="truncate">{s.name}</span>
                        <ChevronIcon open={mobileSubOpen === s.name} />
                      </button>

                      {mobileSubOpen === s.name && (
                        <div
                          className="mb-2 flex flex-col"
                          style={{ borderLeft: "2px solid #e09212", paddingLeft: "10px" }}
                        >
                          <p className="pt-1 pb-0.5 text-[9px] font-black uppercase tracking-widest text-signal/70">Projects</p>
                          {s.subs.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={closeMobile}
                              className="py-1.5 text-[11px] text-white/60 hover:text-signal transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
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
