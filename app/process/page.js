"use client";

import Link from "next/link";

const shell = "relative mx-auto w-full max-w-[1180px]";
const eyebrow = "mb-3.5 text-xs font-black uppercase tracking-normal text-signal";
const bodyText = "text-muted leading-[1.65]";

const process = [
  ["01", "Consultation", "We listen to the project goals, site needs, budget, and technical constraints."],
  ["02", "Design", "We prepare the practical plan, material approach, and build method before production begins."],
  ["03", "Execution", "Our technicians fabricate, install, repair, or finish the work with close quality control."],
  ["04", "Delivery", "We test, refine, and hand over the finished result with support for next steps."]
];

export default function ProcessPage() {
  return (
    <div className="overflow-hidden">
      {/* Page Hero */}
      <section className="bg-ink px-4 py-20 text-white sm:px-6">
        <div className={`${shell} text-center`}>
          <p className={eyebrow}>How we work</p>
          <h1 className="m-0 text-[44px] font-black leading-[1.04] sm:text-[60px] lg:text-[72px]">Our Process</h1>
          <p className="mx-auto mt-5 max-w-[600px] text-lg leading-[1.7] text-white/75">
            A clear, structured approach from the first conversation to final handover — so every project runs smoothly.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className={`${shell} grid items-center gap-16 px-4 py-[70px] sm:px-6 lg:grid-cols-[minmax(300px,0.9fr)_minmax(0,1.1fr)] lg:py-24`}>
        <div className="relative after:absolute after:-bottom-5 after:-right-5 after:-z-10 after:h-[44%] after:w-[44%] after:rounded-lg after:border after:border-signal">
          <img className="h-[360px] w-full rounded-lg object-cover shadow-industrial lg:h-[620px]" src="/image/teamm.png" alt="Imvunwa team at work" />
        </div>
        <div>
          <p className={eyebrow}>How we work</p>
          <h2 className="m-0 max-w-[760px] text-[34px] font-black leading-[1.02] tracking-normal text-ink sm:text-[44px] lg:text-[54px]">A clear route from first conversation to handover.</h2>
          <div className="mt-8 grid gap-3.5">
            {process.map(([number, title, text]) => (
              <article className="grid grid-cols-[46px_1fr] gap-4 border-t border-line py-5 lg:grid-cols-[64px_1fr]" key={title}>
                <strong className="text-[28px] font-black text-signal">{number}</strong>
                <div>
                  <h3 className="m-0 text-[22px] font-extrabold">{title}</h3>
                  <p className={`mt-2 ${bodyText}`}>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24">
        <div className={shell}>
          <h2 className="text-center text-2xl font-black uppercase tracking-wider text-ink">Our Core Values</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl" role="img" aria-label="Innovation">💡</span>
              <h3 className="mt-4 text-xl font-extrabold text-ink">Innovation</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">We continuously seek new and creative solutions to meet our clients' needs.</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl" role="img" aria-label="Integrity">🤝</span>
              <h3 className="mt-4 text-xl font-extrabold text-ink">Integrity</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">We conduct our business with honesty and transparency.</p>
            </div>
            <div className="rounded-xl border border-line bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl" role="img" aria-label="Excellence">🏆</span>
              <h3 className="mt-4 text-xl font-extrabold text-ink">Excellence</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">We strive for excellence in every project we undertake.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-[70px] sm:px-6 lg:py-24">
        <div className={`${shell} text-center`}>
          <h2 className="text-[34px] font-black text-ink sm:text-[48px]">Ready to work with us?</h2>
          <Link href="/contact" className="mt-8 inline-flex min-h-[56px] items-center justify-center rounded-full bg-[#F5A623] px-10 font-black text-white hover:opacity-90 transition-opacity">
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
