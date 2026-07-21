import Eyebrow from "./Eyebrow";
import Container from "./Container";
import Image from "next/image";

/**
 * PageHero — dark hero section used at the top of every inner page.
 * Replaces identical hero patterns in services, process, contact, projects pages.
 *
 * Props:
 *  - eyebrow   string   small label above the title
 *  - title     string   main h1 heading
 *  - subtitle  string   optional subtitle paragraph
 *  - center    boolean  whether to center the text (default: true)
 *  - bgImage   string   optional background image source
 */
export default function PageHero({ eyebrow, title, subtitle, center = true, bgImage }) {
  return (
    <section className="relative bg-base px-4 py-24 text-white sm:px-6 overflow-hidden">
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            quality={85}
            className="object-cover object-center"
          />
          {/* Low light overlay (dark overlay to make text highly readable) */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </>
      )}
      <Container className={`relative z-10 ${center ? "text-center" : ""}`}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="m-0 text-[32px] font-black leading-[1.04] sm:text-[44px] lg:text-[54px] text-white">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-5 text-[14px] leading-[1.7] text-white/80 ${center ? "mx-auto max-w-[600px]" : "max-w-[600px]"}`}>
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
