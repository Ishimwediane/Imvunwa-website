import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";
import Eyebrow from "../../components/ui/Eyebrow";
import { getServices } from "../../backend/data";

/* Fully static: read the backend only on admin save (via /api/revalidate),
   never on a timer. Falls back to built-in defaults on outage. */
export const revalidate = false;

/**
 * Presentation metadata (category tag + detail-page link) keyed by service
 * name. The DB stores name/description/image only, so these UI-only bits
 * live here; unknown names fall back to a generic tag + the services index.
 */
const SERVICE_META = {
  "Manufacturing of Machines":          { tag: "Fabrication",  href: "/services/manufacturing" },
  "Machine Repairment":                 { tag: "Maintenance",  href: "/services/repair" },
  "Welding Services":                   { tag: "Metalwork",    href: "/services/welding" },
  "Painting Services":                  { tag: "Finishing",    href: "/services/painting" },
  "Electricity Installation and Repair":{ tag: "Installation", href: "/services/electrical" },
  "Plumbing Services":                  { tag: "Utilities",    href: "/services/plumbing" },
  "Product Design":                     { tag: "Design",       href: "/services/design" },
};

/* ── Image-based service card (services page layout) ─────────── */
function ServiceArticle({ id, title, text, image, tag, href }) {
  return (
    <article id={id} className="group flex min-h-[440px] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-card scroll-mt-28">
      <Link href={href} className="relative h-[210px] w-full overflow-hidden shrink-0 block">
        <Image
          className="h-full w-full object-cover contrast-105 saturate-[.86] transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={title}
          width={400}
          height={210}
          quality={75}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-signal/85 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="text-[16px] font-black text-ink">Learn more</span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex text-[10px] font-black uppercase text-signal-dark">{tag}</span>
        <h2 className="my-3 text-[19px] font-extrabold text-ink">{title}</h2>
        <p className="mb-6 flex-1 text-[13px] leading-[1.65] text-muted">{text}</p>
        <Link
          href={href}
          className="mt-auto inline-flex h-11 w-max items-center justify-center rounded-md bg-signal px-6 text-[12px] font-bold text-white transition-colors hover:bg-signal-hover"
        >
          More details
        </Link>
      </div>
    </article>
  );
}

/* ── Process Data & Component ────────────────────────────────── */
const STEPS = [
  ["01", "Consultation", "We listen to the project goals, site needs, budget, and technical constraints."],
  ["02", "Design",       "We prepare the practical plan, material approach, and build method before production begins."],
  ["03", "Execution",    "Our technicians fabricate, install, repair, or finish the work with close quality control."],
  ["04", "Delivery",     "We test, refine, and hand over the finished result with support for next steps."],
];

function ProcessStep({ number, title, text }) {
  return (
    <article className="grid grid-cols-[46px_1fr] gap-4 border-t border-line py-5 lg:grid-cols-[64px_1fr]">
      <strong className="text-[22px] font-black text-signal">{number}</strong>
      <div>
        <h3 className="m-0 text-[18px] font-extrabold text-ink">{title}</h3>
        <p className="mt-2 text-[13px] leading-[1.65] text-muted">{text}</p>
      </div>
    </article>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Capabilities"
        title="Our Services"
        subtitle="We deliver reliable, high-quality engineering and trade services across Rwanda — from fabrication to finishing."
        bgImage="/image/manufacturing.jpg"
      />

      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const meta = SERVICE_META[s.name] || { tag: "Service", href: "/services" };
              return (
                <ServiceArticle
                  key={s.id}
                  id={s.id}
                  title={s.name}
                  text={s.description}
                  image={s.image_url}
                  tag={meta.tag}
                  href={meta.href}
                />
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Our Process Section ── */}
      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24 border-t border-line">
        <Container className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative after:absolute after:-bottom-5 after:-right-5 after:-z-10 after:h-[44%] after:w-[44%] after:rounded-lg after:border after:border-signal">
            <Image
              src="/image/teamm.png"
              alt="Imvunwa team at work"
              width={500}
              height={620}
              quality={80}
              className="h-[360px] w-full rounded-lg object-cover shadow-industrial lg:h-[620px]"
            />
          </div>
          <div>
            <Eyebrow onLight>How we work</Eyebrow>
            <h2 className="m-0 max-w-[760px] text-[26px] font-black leading-[1.02] tracking-normal text-ink sm:text-[34px] lg:text-[42px]">
              Our Process
            </h2>
            <p className="mt-4 max-w-[500px] text-[13px] leading-[1.7] text-muted">
              A clear, structured route from first conversation to final handover.
            </p>
            <div className="mt-8 grid gap-3.5">
              {STEPS.map(([number, title, text]) => (
                <ProcessStep key={title} number={number} title={title} text={text} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Need a custom solution?"
        body="Tell us about your project and we'll tailor the right service for you."
        href="/contact"
        label="Get in Touch"
        videoSrc="/video-imvunwa/Create_an_second_cinematic_v.mp4"
      />
    </div>
  );
}
