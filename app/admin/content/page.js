"use client";

import { useState } from "react";
import {
  DemoBanner, PageHeader, Btn, EditableText, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";

/* Seed values mirror what's currently live on the site */
const SEED = {
  heroEyebrow: "Imvunwa Business Group · Rwanda",
  heroTitle: "Your One Stop Shop For Transforming Your Space",
  heroSubtitle: "A leading metal fabrication, painting, repair, and restoration company — delivering exceptional services across Rwanda.",
  tagline: "Your one stop shop for transforming your space",
  description: "Imvunwa is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients.",
  phone: "+250 787 782 226",
  email: "imvunwabusinessgroup@gmail.com",
  address: "Rwanda, Kigali, Kimironko",
  hours: "Mon–Sat, 11:00–23:00",
  aboutStory: "Imvunwa Business Group Ltd is a leading metal fabrication, painting, repair, and restoration company, dedicated to delivering exceptional services to our clients. We specialise in transforming spaces through industrial services and product manufacturing, with a constant emphasis on precision engineering and quality finishes.",
  mission: "To transform spaces and empower businesses across Rwanda through high-quality metal fabrication, manufacturing, repair, and finishing — delivered with precision engineering and dependable craftsmanship.",
  vision: "To be Rwanda's most trusted one stop shop for industrial services and product manufacturing — the first name businesses and homeowners think of when they want to transform their space.",
};

export default function ContentManager() {
  const [form, setForm] = useState(SEED);
  const [toast, showToast] = useSavedToast();
  const upd = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div className="pb-24">
      {toast}
      <DemoBanner />
      <PageHeader
        title="Site Text"
        subtitle="This is what your website looks like. Click on any text below to change it — your edit shows up straight away."
      />

      <div className="space-y-5">
        {/* ── HOME HERO ── */}
        <PreviewBlock where="Home page — top banner">
          <div className="relative overflow-hidden rounded-xl bg-deeper p-7 sm:p-10">
            <div className="mb-4 h-[3px] w-10 rounded-full bg-signal" />
            <EditableText
              as="p"
              value={form.heroEyebrow}
              onChange={upd("heroEyebrow")}
              className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.18em] text-signal"
            />
            <EditableText
              as="h1"
              multiline
              value={form.heroTitle}
              onChange={upd("heroTitle")}
              className="block text-[26px] font-black leading-tight text-white sm:text-[36px]"
            />
            <EditableText
              as="p"
              multiline
              value={form.heroSubtitle}
              onChange={upd("heroSubtitle")}
              className="mt-4 block max-w-[520px] text-[13px] leading-relaxed text-white/70"
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-signal px-5 py-2 text-[12px] font-black text-ink">Get Started</span>
              <span className="rounded-full border border-white/30 px-5 py-2 text-[12px] font-black text-white/80">Our Services</span>
            </div>
          </div>
        </PreviewBlock>

        {/* ── BRAND ── */}
        <PreviewBlock where="Footer & page headings">
          <div className="rounded-xl border border-line bg-panel p-6">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-signal-dark">Tagline / slogan</p>
            <EditableText
              as="p"
              multiline
              value={form.tagline}
              onChange={upd("tagline")}
              className="block text-[17px] font-black text-ink"
            />
            <p className="mb-1 mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-signal-dark">Company description</p>
            <EditableText
              as="p"
              multiline
              value={form.description}
              onChange={upd("description")}
              className="block text-[13.5px] leading-relaxed text-muted"
            />
          </div>
        </PreviewBlock>

        {/* ── CONTACT ── */}
        <PreviewBlock where="Contact page & footer">
          <div className="rounded-xl border border-line bg-panel p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: "📞", key: "phone", label: "Phone" },
                { icon: "✉️", key: "email", label: "Email" },
                { icon: "📍", key: "address", label: "Location" },
                { icon: "🕐", key: "hours", label: "Opening hours" },
              ].map((row) => (
                <div key={row.key} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 border border-line">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink/5 text-base">{row.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted">{row.label}</p>
                    <EditableText
                      as="p"
                      value={form[row.key]}
                      onChange={upd(row.key)}
                      className="block text-[13.5px] font-semibold text-ink"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11.5px] text-muted">
              The phone and email here are also used by the “Call” and “WhatsApp” buttons on your site.
            </p>
          </div>
        </PreviewBlock>

        {/* ── ABOUT ── */}
        <PreviewBlock where="About page">
          <div className="rounded-xl border border-line bg-panel p-6">
            <p className="mb-1 text-[10px] font-black uppercase tracking-[0.16em] text-signal-dark">Our story</p>
            <EditableText
              as="p"
              multiline
              value={form.aboutStory}
              onChange={upd("aboutStory")}
              className="block text-[13.5px] leading-relaxed text-muted"
            />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-5">
                <h3 className="text-[15px] font-black text-ink">Our Mission</h3>
                <div className="mt-2 h-[3px] w-8 rounded-full bg-signal" />
                <EditableText
                  as="p"
                  multiline
                  value={form.mission}
                  onChange={upd("mission")}
                  className="mt-3 block text-[13px] leading-relaxed text-muted"
                />
              </div>
              <div className="rounded-lg border border-line bg-white p-5">
                <h3 className="text-[15px] font-black text-ink">Our Vision</h3>
                <div className="mt-2 h-[3px] w-8 rounded-full bg-signal" />
                <EditableText
                  as="p"
                  multiline
                  value={form.vision}
                  onChange={upd("vision")}
                  className="mt-3 block text-[13px] leading-relaxed text-muted"
                />
              </div>
            </div>
          </div>
        </PreviewBlock>
      </div>

      {/* Sticky save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-white/95 px-4 py-3 backdrop-blur lg:pl-64">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-2 sm:px-6">
          <p className="hidden text-[12.5px] text-muted sm:block">Changes update the preview instantly. Press Save to keep them.</p>
          <Btn onClick={() => showToast("All text saved (preview)")} className="ml-auto">Save changes</Btn>
        </div>
      </div>
    </div>
  );
}
