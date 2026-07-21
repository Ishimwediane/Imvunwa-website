import Link from "next/link";

/* ── Data ────────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { href: "/",         label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Portfolio" },
  { href: "/contact",  label: "Contact Us" },
];

const SERVICE_LINKS = [
  "Manufacturing of Machines",
  "Machine Repairment",
  "Welding Services",
  "Painting Services",
  "Electricity Installation",
  "Plumbing Services",
];

/* ── Sub-components ──────────────────────────────────────────── */
function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="hover:text-signal transition-colors">
        {children}
      </Link>
    </li>
  );
}

function FooterHeading({ children }) {
  return (
    <strong className="text-white text-sm font-bold uppercase tracking-wider">
      {children}
    </strong>
  );
}

/* ── Footer ──────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="bg-deeper text-white border-t border-white/10">
      <div className="mx-auto max-w-shell px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <strong className="text-white text-lg font-black tracking-wider uppercase">Imvunwa</strong>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Imvunwa is a leading metal fabrication, painting, repair, and restoration company,
            dedicated to delivering exceptional services to our clients.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/85">
            {QUICK_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <FooterHeading>Our Services</FooterHeading>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/85">
            {SERVICE_LINKS.map((name) => (
              <FooterLink key={name} href="/services">{name}</FooterLink>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeading>Contact Us</FooterHeading>
          <address className="mt-4 not-italic text-sm grid gap-2.5 text-white/85">
            <span>Imvunwa Ltd</span>
            <span>P.O. Box 45, Kigali, Rwanda</span>
            <a href="tel:+250787782226" className="hover:text-signal transition-colors">Phone: +250 787 782 226</a>
            <a href="mailto:ishimwediane400@gmail.com" className="hover:text-signal transition-colors">Email: ishimwediane400@gmail.com</a>
          </address>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs text-white/70">
        <p>© Copyright {new Date().getFullYear()} Imvunwa. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
