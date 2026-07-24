"use client";

import Link from "next/link";
import { ModeBanner, Card, Icon, ICONS, Btn } from "../../components/admin/ui";

const SECTIONS = [
  {
    href: "/admin/content",
    icon: ICONS.text,
    title: "Site Text",
    desc: "Edit the words on your website — homepage heading, company description, contact details, and the About page.",
    stat: "Home · About · Contact",
  },
  {
    href: "/admin/services",
    icon: ICONS.wrench,
    title: "Services",
    desc: "Add, edit or remove the services you offer, along with their descriptions and images.",
    stat: "7 services",
  },
  {
    href: "/admin/projects",
    icon: ICONS.image,
    title: "Projects & Photos",
    desc: "Manage project categories, sub-categories, and upload photos of completed work.",
    stat: "7 categories",
  },
  {
    href: "/admin/team",
    icon: ICONS.users,
    title: "Team",
    desc: "Add team members, edit their name and role, and upload their photos.",
    stat: "4 members",
  },
];

const TIPS = [
  "Click any card below to start editing that part of your website.",
  "You don't need to know any code — just type, upload photos, and save.",
  "Nothing breaks: you can always change things back.",
];

export default function AdminDashboard() {
  return (
    <div>
      <ModeBanner />

      {/* Welcome */}
      <div className="mb-7 rounded-2xl bg-gradient-to-br from-deeper to-[#2b3a4d] p-7 text-white shadow-card">
        <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-signal">Welcome back</p>
        <h1 className="mt-2 text-[24px] font-black leading-tight sm:text-[30px]">
          Manage your Imvunwa website
        </h1>
        <p className="mt-2 max-w-[560px] text-[13.5px] leading-relaxed text-white/70">
          Everything on your website can be updated from here — no technical skills needed.
          Pick a section below to get started.
        </p>
      </div>

      {/* Section cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-signal/50 hover:shadow-industrial"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-signal/15 text-signal-dark">
                <Icon path={s.icon} className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-panel px-3 py-1 text-[11px] font-bold text-muted">{s.stat}</span>
            </div>
            <h2 className="text-[17px] font-extrabold text-ink">{s.title}</h2>
            <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted">{s.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-black text-signal-dark">
              Open
              <Icon path={ICONS.chevron} className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <Card title="How this works" className="mt-6">
        <ul className="space-y-2.5">
          {TIPS.map((t) => (
            <li key={t} className="flex items-start gap-3 text-[13px] leading-relaxed text-ink/80">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/15 text-signal-dark">
                <Icon path={ICONS.check} className="h-3.5 w-3.5" />
              </span>
              {t}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
