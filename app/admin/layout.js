"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Icon, ICONS } from "../../components/admin/ui";

/* ── Navigation ──────────────────────────────────────────────── */
const NAV = [
  { href: "/admin",          label: "Dashboard",        icon: ICONS.home,   exact: true },
  { href: "/admin/content",  label: "Site Text",        icon: ICONS.text },
  { href: "/admin/services", label: "Services",         icon: ICONS.wrench },
  { href: "/admin/projects", label: "Projects & Photos", icon: ICONS.image },
  { href: "/admin/team",     label: "Team",             icon: ICONS.users },
];

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <Image src="/image/logo.jpg" alt="Imvunwa" width={40} height={40} className="h-10 w-10 rounded-lg object-contain" />
        <div className="leading-tight">
          <p className="text-[13px] font-black uppercase tracking-wider text-white">Imvunwa</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-bold transition-colors ${
                active ? "bg-signal text-ink" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon path={item.icon} className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer actions */}
      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          target="_blank"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon path={ICONS.external} className="h-5 w-5 shrink-0" />
          View website
        </Link>
        <Link
          href="/admin/login"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-[13px] font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Icon path={ICONS.logout} className="h-5 w-5 shrink-0" />
          Log out
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Login page: no dashboard chrome */
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-[#eef0f3]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#eef0f3]">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-deeper lg:block">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-deeper">
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <button
            className="grid h-10 w-10 place-items-center rounded-lg text-ink lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Icon path="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" className="h-6 w-6" />
          </button>
          <p className="hidden text-[13px] font-semibold text-muted sm:block">
            Manage your website content
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-2 rounded-lg border border-line px-4 py-2 text-[12px] font-bold text-ink/70 transition-colors hover:border-ink/30 hover:text-ink sm:inline-flex"
            >
              <Icon path={ICONS.external} className="h-4 w-4" />
              View site
            </Link>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-signal text-[13px] font-black text-ink">A</span>
          </div>
        </header>

        {/* Content */}
        <main className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
