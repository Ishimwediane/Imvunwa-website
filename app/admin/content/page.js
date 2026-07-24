"use client";

import { useEffect, useState } from "react";
import {
  ModeBanner, PageHeader, Btn, EditableText, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";
import { SITE_CONTENT_DEFAULT } from "../../../lib/defaults";
import { fetchSiteContent, saveSiteContent } from "../../../lib/adminApi";

/* Field keys map 1:1 to the site_content table keys */
export default function ContentManager() {
  const [form, setForm] = useState(SITE_CONTENT_DEFAULT);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useSavedToast();
  const upd = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  useEffect(() => {
    fetchSiteContent()
      .then(setForm)
      .catch((e) => showToast("Could not load: " + e.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveSiteContent(form);
      showToast("All text saved");
    } catch (e) {
      showToast("Could not save: " + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pb-24">
      {toast}
      <ModeBanner />
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
              value={form.hero_eyebrow}
              onChange={upd("hero_eyebrow")}
              className="mb-3 inline-block text-[11px] font-black uppercase tracking-[0.18em] text-signal"
            />
            <EditableText
              as="h1"
              multiline
              value={form.hero_title}
              onChange={upd("hero_title")}
              className="block text-[26px] font-black leading-tight text-white sm:text-[36px]"
            />
            <EditableText
              as="p"
              multiline
              value={form.hero_subtitle}
              onChange={upd("hero_subtitle")}
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
              value={form.about_story}
              onChange={upd("about_story")}
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
          <p className="hidden text-[12.5px] text-muted sm:block">Edits show live above. Press Save to keep them.</p>
          <Btn onClick={handleSave} disabled={saving} className="ml-auto">{saving ? "Saving…" : "Save changes"}</Btn>
        </div>
      </div>
    </div>
  );
}
