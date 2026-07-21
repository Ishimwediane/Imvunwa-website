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
export default function SectionCta({
  heading,
  body,
  href = "/contact",
  label = "Get in Touch",
  dark = false,
  videoSrc = null,
}) {
  const isVideo = !!videoSrc;
  return (
    <section
      className={`relative overflow-hidden px-4 py-[70px] sm:px-6 lg:py-24 ${isVideo || dark ? "bg-base text-white" : "bg-warm text-ink"}`}
      style={isVideo ? { clipPath: "inset(0)" } : {}}
    >
      {isVideo && (
        <>
          <video
            className="fixed inset-0 h-full w-full object-cover z-0 pointer-events-none"
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          />
          <div className="fixed inset-0 bg-black/72 z-0 pointer-events-none" />
        </>
      )}
      <Container className="relative z-10 text-center">
        <h2 className="text-[24px] font-black sm:text-[32px]">{heading}</h2>
        {body && (
          <p className={`mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.7] ${isVideo || dark ? "text-white/70" : "text-ink/50"}`}>
            {body}
          </p>
        )}
        <Link
          href={href}
          className="mt-8 inline-flex min-h-[50px] items-center justify-center rounded-full bg-signal px-10 text-[13px] font-black text-ink transition-colors hover:bg-signal-hover"
        >
          {label}
        </Link>
      </Container>
    </section>
  );
}
