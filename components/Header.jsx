"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const contactItems = [
  "Call +250 787 782 226",
  "Call +250 790 755 673",
  "Email ishimwediane400@gmail.com",
  "Rwanda, Kigali, Kimironko",
  "Industrial manufacturing and repair services"
];

const dropdownServices = [
  { name: "Manufacturing of Machines", href: "/services#manufacturing" },
  { name: "Repairment of Machines", href: "/services#repair" },
  { name: "Welding Services", href: "/services#welding" },
  { name: "Painting Services", href: "/services#painting" },
  { name: "Electricity Installation & Repair", href: "/services#electricity" },
  { name: "Plumbing Services", href: "/services#plumbing" },
  { name: "Product Design", href: "/services#design" },
];

export default function Header() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  const navLink = (href, label, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return (
      <Link
        href={href}
        className={`transition-colors hover:text-[#F5A623] ${isActive ? "text-[#F5A623] font-black" : "text-[#1a1a1a]"}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <header className="relative z-20 bg-white text-[#1a1a1a] shadow-md">
        {/* Top bar marquee */}
        <div className="overflow-hidden border-b border-white/10 bg-[#F5A623] py-2 text-[12px] font-semibold text-white">
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...contactItems, ...contactItems, ...contactItems, ...contactItems].map((item, index) => (
              <span className="mx-6 inline-flex items-center gap-3" key={`${item}-${index}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Main navbar */}
        <div className="mx-auto flex min-h-[80px] w-full max-w-[1440px] items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-8 lg:px-10">
          {/* Logo */}
          <Link className="flex shrink-0 items-center gap-3" href="/" aria-label="Imvunwa home">
            <img src="/image/logo.jpg" alt="Imvunwa Business Group Ltd logo" className="h-[72px] w-auto object-contain" />
            <span className="hidden flex-col lg:flex">
              <span className="text-[16px] font-black uppercase leading-none tracking-wider text-[#1a1a1a]">Imvunwa</span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">Business Group Ltd</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 text-[13px] font-bold uppercase tracking-wide lg:flex" aria-label="Main navigation">
            {navLink("/", "Home", true)}

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`inline-flex items-center gap-1.5 transition-colors hover:text-[#F5A623] uppercase font-bold text-[13px] ${pathname.startsWith("/services") ? "text-[#F5A623]" : "text-[#1a1a1a]"}`}
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${servicesDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {servicesDropdownOpen && (
                <div
                  className="services-dropdown absolute left-0 z-50"
                  style={{
                    top: "calc(100% + 12px)",
                    minWidth: "260px",
                    background: "#ffffff",
                    borderTop: "4px solid #F5A623",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)",
                    borderRadius: "0 0 6px 6px",
                    maxHeight: "70vh",
                    overflowY: "auto",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  {dropdownServices.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={() => setServicesDropdownOpen(false)}
                      className="services-dropdown-item"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLink("/process", "How We Work")}
            {navLink("/projects", "Projects")}
            {navLink("/contact", "Contact")}

            <Link
              className="ml-4 inline-flex min-h-[46px] items-center justify-center rounded-lg bg-[#F5A623] px-6 py-2 text-[13px] font-black text-white hover:opacity-90 transition-opacity"
              href="/contact"
            >
              Contact +250787782226
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="flex flex-col gap-[5px] lg:hidden focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-6 bg-[#1a1a1a] transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#1a1a1a] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-6 bg-[#1a1a1a] transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 border-t border-gray-100 bg-white px-6 py-4 text-[13px] font-bold uppercase text-[#1a1a1a] lg:hidden" aria-label="Mobile navigation">
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5A623]" href="/">Home</Link>

            {/* Mobile Services */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between hover:text-[#F5A623] uppercase font-bold text-[13px]"
              >
                Services
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div
                  className="mt-2 flex flex-col normal-case font-semibold"
                  style={{
                    borderLeft: "3px solid #F5A623",
                    paddingLeft: "12px",
                    maxHeight: "240px",
                    overflowY: "auto",
                  }}
                >
                  {dropdownServices.map((service) => (
                    <Link
                      key={service.name}
                      href={service.href}
                      onClick={() => { setMobileServicesOpen(false); setMobileMenuOpen(false); }}
                      className="py-2 text-[#1a1a1a] hover:text-[#F5A623] transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5A623]" href="/process">How We Work</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5A623]" href="/projects">Projects</Link>
            <Link onClick={() => setMobileMenuOpen(false)} className="hover:text-[#F5A623]" href="/contact">Contact</Link>
            <Link
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#F5A623] px-6 py-2.5 text-[13px] font-black text-white hover:opacity-90"
              href="/contact"
            >
              Contact +250787782226
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
