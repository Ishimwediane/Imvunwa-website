import Eyebrow from "./Eyebrow";
import Container from "./Container";

/**
 * PageHero — dark hero section used at the top of every inner page.
 * Replaces identical hero patterns in services, process, contact, projects pages.
 *
 * Props:
 *  - eyebrow   string   small label above the title
 *  - title     string   main h1 heading
 *  - subtitle  string   optional subtitle paragraph
 *  - center    boolean  whether to center the text (default: true)
 */
export default function PageHero({ eyebrow, title, subtitle, center = true }) {
  return (
    <section className="bg-base px-4 py-20 text-white sm:px-6">
      <Container className={center ? "text-center" : ""}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="m-0 text-[32px] font-black leading-[1.04] sm:text-[44px] lg:text-[54px]">
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-5 text-[14px] leading-[1.7] text-white/75 ${center ? "mx-auto max-w-[600px]" : "max-w-[600px]"}`}>
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
