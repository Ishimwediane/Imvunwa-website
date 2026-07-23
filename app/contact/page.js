"use client";

import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";

/* ── Contact info items ──────────────────────────────────────── */
const CONTACT_INFO = [
  { tag: "a", href: "tel:+250787782226",                     icon: "📞", text: "+250 787 782 226" },
  { tag: "a", href: "mailto:imvunwabusinessgroup@gmail.com", icon: "✉️", text: "imvunwabusinessgroup@gmail.com" },
  { tag: "span", icon: "📍", text: "Rwanda, Kigali, Kimironko" },
  { tag: "span", icon: "🕐", text: "Mon–Sat, 11:00–23:00" },
];

const WA_PATH = "M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825 0 6.938 3.112 6.938 6.937s-3.113 6.937-6.938 6.937z";

/* ── Sub-components ──────────────────────────────────────────── */
function ContactRow({ tag: Tag, href, icon, text }) {
  const baseClass = "flex items-center gap-3 text-[14px] text-ink/85 transition-colors hover:text-signal";
  const inner = (
    <>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-ink/5 text-base">{icon}</span>
      {text}
    </>
  );
  return href
    ? <a href={href} className={baseClass}>{inner}</a>
    : <span className={baseClass}>{inner}</span>;
}

function FormInput({ type = "text", placeholder, label }) {
  return (
    <input
      className="w-full rounded-md border border-line bg-white p-3.5 text-[13px] text-ink outline-none placeholder:text-muted transition-colors focus:border-signal"
      aria-label={label}
      placeholder={placeholder}
      type={type}
    />
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <div className="overflow-hidden">
      <PageHero
        eyebrow="Get in touch"
        title="Contact Us"
        subtitle="Share your machine, fabrication, repair, utility, or finishing need and the team will help shape the next step."
        bgImage="/image/consultation.jpg"
      />

      <section className="bg-white px-4 py-[70px] text-ink sm:px-6 lg:py-24">
        <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Contact info */}
          <div>
            <p className="mb-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-signal">Contact</p>
            <h2 className="m-0 text-[26px] font-black leading-none tracking-normal sm:text-[34px] lg:text-[40px] text-ink">
              Let&apos;s talk about your next project.
            </h2>
            <p className="mt-4 text-[14px] leading-[1.65] text-muted">
              Reach out through any of the channels below and our team will get back to you as soon as possible.
            </p>
            <div className="mt-8 grid gap-4">
              {CONTACT_INFO.map((item) => (
                <ContactRow key={item.text} {...item} />
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/250787782226"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex h-11 w-max items-center gap-3 rounded-full bg-whatsapp px-6 text-[13px] font-bold text-white transition-opacity hover:opacity-90"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d={WA_PATH} />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="grid gap-3 rounded-2xl border border-line bg-panel p-6 shadow-card text-[13px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="mb-2 text-[17px] font-black text-ink">Send us a message</h3>
            <FormInput placeholder="Your name"   label="Your name" />
            <FormInput placeholder="Your email"  label="Your email"  type="email" />
            <FormInput placeholder="Subject"     label="Subject" />
            <textarea
              className="w-full resize-y rounded-md border border-line bg-white p-3.5 text-[13px] text-ink outline-none placeholder:text-muted transition-colors focus:border-signal"
              aria-label="Message"
              placeholder="Tell us about the project"
              rows="5"
            />
            <button
              className="inline-flex min-h-[46px] items-center justify-center rounded-md bg-signal text-[13px] font-extrabold text-ink transition-colors hover:bg-signal-hover"
              type="submit"
            >
              Send message
            </button>
          </form>
        </Container>
      </section>
    </div>
  );
}
