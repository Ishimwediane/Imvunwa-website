import Link from "next/link";
import Container from "./Container";

/**
 * SectionCta — bottom call-to-action section with heading + button.
 * Replaces identical CTA sections on services, process, and projects pages.
 *
 * Props:
 *  - heading   string   heading text
 *  - body      string   optional subtitle text
 *  - href      string   button link destination
 *  - label     string   button label text
 *  - dark      boolean  dark bg (ink) vs cream bg (warm) — default: false (cream)
 */
export default function SectionCta({ heading, body, href = "/contact", label = "Get in Touch", dark = false }) {
  return (
    <section className={`px-4 py-[70px] sm:px-6 lg:py-24 ${dark ? "bg-base text-white" : "bg-warm text-ink"}`}>
      <Container className="text-center">
        <h2 className="text-[24px] font-black sm:text-[32px]">{heading}</h2>
        {body && (
          <p className={`mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.7] ${dark ? "text-white/70" : "text-ink/50"}`}>
            {body}
          </p>
        )}
        <Link
          href={href}
          className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-signal px-10 text-[13px] font-black text-white transition-colors hover:bg-signal-hover"
        >
          {label}
        </Link>
      </Container>
    </section>
  );
}
