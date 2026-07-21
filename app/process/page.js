"use client";

import Image from "next/image";
import Container from "../../components/ui/Container";
import Eyebrow from "../../components/ui/Eyebrow";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";

/* ── Data ────────────────────────────────────────────────────── */
const STEPS = [
  ["01", "Consultation", "We listen to the project goals, site needs, budget, and technical constraints."],
  ["02", "Design",       "We prepare the practical plan, material approach, and build method before production begins."],
  ["03", "Execution",    "Our technicians fabricate, install, repair, or finish the work with close quality control."],
  ["04", "Delivery",     "We test, refine, and hand over the finished result with support for next steps."],
];

const VALUES = [
  { emoji: "💡", label: "Innovation", text: "We continuously seek new and creative solutions to meet our clients' needs." },
  { emoji: "🤝", label: "Integrity",  text: "We conduct our business with honesty and transparency." },
  { emoji: "🏆", label: "Excellence", text: "We strive for excellence in every project we undertake." },
];

/* ── Sub-components ──────────────────────────────────────────── */
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

function ValueCard({ emoji, label, text }) {
  return (
    <div className="rounded-xl border border-line bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <span className="text-3xl" role="img" aria-label={label}>{emoji}</span>
      <h3 className="mt-4 text-[16px] font-extrabold text-ink">{label}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">{text}</p>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ProcessPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="How we work"
        title="Our Process"
        subtitle="A clear, structured approach from the first conversation to final handover — so every project runs smoothly."
      />

      {/* Process steps */}
      <section className="px-4 py-[70px] sm:px-6 lg:py-24">
        <Container className="grid items-center gap-16 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)]">
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
            <Eyebrow>How we work</Eyebrow>
            <h2 className="m-0 max-w-[760px] text-[26px] font-black leading-[1.02] tracking-normal text-ink sm:text-[34px] lg:text-[42px]">
              A clear route from first conversation to handover.
            </h2>
            <div className="mt-8 grid gap-3.5">
              {STEPS.map(([number, title, text]) => (
                <ProcessStep key={title} number={number} title={title} text={text} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <Container>
          <h2 className="text-center text-xl font-black uppercase tracking-wider text-ink">Our Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {VALUES.map((v) => (
              <ValueCard key={v.label} {...v} />
            ))}
          </div>
        </Container>
      </section>

      <SectionCta
        heading="Ready to work with us?"
        href="/contact"
        label="Start Your Project"
      />
    </div>
  );
}
