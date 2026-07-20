import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#08090a] text-white/80 border-t border-white/10">
      <div className="mx-auto max-w-[1180px] px-6 py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <strong className="text-white text-lg font-black tracking-wider uppercase">Imvunwa</strong>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Imvunwa is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients.
          </p>
        </div>
        <div>
          <strong className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</strong>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/60">
            <li><Link href="/" className="hover:text-[#F5A623] transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Services</Link></li>
            <li><Link href="/projects" className="hover:text-[#F5A623] transition-colors">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-[#F5A623] transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <strong className="text-white text-sm font-bold uppercase tracking-wider">Our Services</strong>
          <ul className="mt-4 grid gap-2.5 text-sm text-white/60">
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Manufacturing of Machines</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Machine Repairment</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Welding Services</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Painting Services</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Electricity Installation</Link></li>
            <li><Link href="/services" className="hover:text-[#F5A623] transition-colors">Plumbing Services</Link></li>
          </ul>
        </div>
        <div>
          <strong className="text-white text-sm font-bold uppercase tracking-wider">Contact Us</strong>
          <address className="mt-4 not-italic text-sm grid gap-2.5 text-white/60">
            <span>Imvunwa Ltd</span>
            <span>P.O. Box 45, Kigali, Rwanda</span>
            <a href="tel:+250787782226" className="hover:text-[#F5A623] transition-colors">Phone: +250 787 782 226</a>
            <a href="mailto:ishimwediane400@gmail.com" className="hover:text-[#F5A623] transition-colors">Email: ishimwediane400@gmail.com</a>
          </address>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
        <p>© Copyright 2026 Imvunwa. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
