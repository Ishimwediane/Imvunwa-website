"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import Lightbox from "./Lightbox";
import { getServicePortfolio } from "../../data/portfolioData";

/* ── Clickable image card ─────────────────────────────────────── */
function ImgCard({ src, caption, onClick }) {
  return (
    <div
      className="group relative cursor-zoom-in overflow-hidden rounded-xl bg-white border border-black/10 shadow-lg aspect-[4/3]"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={caption}
        fill
        quality={80}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      <p className="absolute bottom-0 left-0 right-0 translate-y-2 px-4 py-3 text-[12px] font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </p>
    </div>
  );
}

/* ── Marquee strip (used in "All" view) ───────────────────────── */
function MarqueeStrip({ sub, subIdx, onOpen }) {
  const duration = Math.max(20, sub.images.length * 8);
  const needsDuplicate = sub.images.length < 6;
  return (
    <div className="group/sub">
      <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-3">
        <div className="flex items-center gap-3">
          <div className="h-[3px] w-6 rounded-full bg-signal" />
          <h3 className="text-[14px] font-black uppercase tracking-widest text-ink">{sub.name}</h3>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {sub.images.length} {sub.images.length === 1 ? "Project" : "Projects"}
        </span>
      </div>
      <div className="group/marquee flex overflow-hidden w-full relative">
        <div
          className="flex w-max group-hover/marquee:[animation-play-state:paused]"
          style={{ animation: `marquee ${duration}s linear infinite` }}
        >
          <div className="flex gap-5 pr-5 w-max">
            {sub.images.map((img, imgIdx) => (
              <div key={`s1-${imgIdx}`} className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0">
                <ImgCard {...img} onClick={() => onOpen(subIdx, imgIdx)} />
              </div>
            ))}
          </div>
          <div className="flex gap-5 pr-5 w-max">
            {(needsDuplicate ? [...sub.images, ...sub.images] : sub.images).map((img, imgIdx) => (
              <div key={`s2-${imgIdx}`} className="w-[280px] sm:w-[320px] lg:w-[360px] shrink-0">
                <ImgCard {...img} onClick={() => onOpen(subIdx, imgIdx % sub.images.length)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Focused grid (used when a specific category is selected) ──── */
function CategoryGrid({ sub, onOpen }) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Category title card */}
      <div className="mb-8 rounded-2xl border border-ink/10 bg-white px-6 py-5 shadow-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-signal">
              Category
            </p>
            <h3 className="mt-1 text-[22px] font-black text-ink">{sub.name}</h3>
            <p className="mt-1 text-[13px] text-muted">
              {sub.images.length} {sub.images.length === 1 ? "project" : "projects"} in this category
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-signal/10 px-4 py-2 text-[12px] font-black text-signal-dark">
              {sub.images.length} Photos
            </span>
          </div>
        </div>
      </div>

      {/* Standard grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sub.images.map((img, i) => (
          <div
            key={i}
            style={{
              animation: `grid-in 0.35s ease both`,
              animationDelay: `${i * 0.05}s`,
            }}
          >
            <ImgCard
              {...img}
              onClick={() => onOpen(0, i)}
            />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes grid-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function ServiceProjects({
  serviceId,
  title = "Our Work & Project Categories",
  subtitle,
}) {
  const service = getServicePortfolio(serviceId);
  const [activeSub, setActiveSub] = useState("all");
  const [lb, setLb] = useState(null);
  const contentRef = useRef(null);

  if (!service || !service.subs || service.subs.length === 0) return null;

  const hasMultipleSubs = service.subs.length > 1;

  /* When "all": show all subs. When specific: find the one sub */
  const selectedSub =
    activeSub === "all" ? null : service.subs.find((s) => s.name === activeSub);

  /* For lightbox: images come from selected sub or the sub at given index */
  const lbImages =
    lb !== null
      ? activeSub === "all"
        ? service.subs[lb.subIdx]?.images ?? []
        : selectedSub?.images ?? []
      : [];

  const handleTabChange = (name) => {
    setLb(null);
    setActiveSub(name);
    /* Smooth scroll to content */
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  };

  return (
    <section className="bg-panel px-4 py-[70px] sm:px-6 lg:py-24 border-t border-line">
      <Container>
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Portfolio & Categories</Eyebrow>
            <h2 className="m-0 text-[26px] font-black text-ink sm:text-[34px]">{title}</h2>
            <p className="mt-3 max-w-[580px] text-[14px] leading-[1.7] text-muted">
              {subtitle ||
                `Explore all projects executed under ${service.label}. Click a category to focus on specific work.`}
            </p>
          </div>
          <Link
            href={`/projects?cat=${serviceId}`}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-ink/20 px-6 text-[12px] font-black text-ink transition-all hover:border-signal hover:bg-signal/10 hover:text-signal"
          >
            View Full Portfolio →
          </Link>
        </div>

        {/* Sub-category filter tabs */}
        {hasMultipleSubs && (
          <div className="mb-10 flex gap-2 overflow-x-auto pb-3 scrollbar-none">
            <button
              onClick={() => handleTabChange("all")}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                activeSub === "all"
                  ? "bg-signal text-ink shadow-md shadow-signal/30"
                  : "border border-ink/15 text-ink/70 hover:border-signal/50 hover:text-ink"
              }`}
            >
              All
              <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                activeSub === "all" ? "bg-black/15" : "bg-ink/8"
              }`}>
                {service.subs.reduce((acc, s) => acc + s.images.length, 0)}
              </span>
            </button>
            {service.subs.map((sub) => (
              <button
                key={sub.name}
                onClick={() => handleTabChange(sub.name)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all duration-200 ${
                  activeSub === sub.name
                    ? "bg-signal text-ink shadow-md shadow-signal/30"
                    : "border border-ink/15 text-ink/70 hover:border-signal/50 hover:text-ink"
                }`}
              >
                {sub.name}
                <span className={`rounded-full px-2 py-0.5 text-[10px] ${
                  activeSub === sub.name ? "bg-black/15" : "bg-ink/8"
                }`}>
                  {sub.images.length}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Content area */}
        <div ref={contentRef}>
          {activeSub === "all" ? (
            /* ── All categories: marquee strips ── */
            <div className="space-y-12">
              {service.subs.map((sub, subIdx) => (
                <MarqueeStrip
                  key={subIdx}
                  sub={sub}
                  subIdx={subIdx}
                  onOpen={(si, ii) => setLb({ subIdx: si, imgIdx: ii })}
                />
              ))}
            </div>
          ) : (
            /* ── Specific category: animated bento grid ── */
            selectedSub && (
              <CategoryGrid
                sub={selectedSub}
                onOpen={(si, ii) => setLb({ subIdx: 0, imgIdx: ii })}
              />
            )
          )}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white border border-line p-6 text-ink sm:p-8 shadow-card">
          <div>
            <h4 className="text-[18px] font-bold text-ink">
              Need custom work in {service.shortLabel}?
            </h4>
            <p className="mt-1 text-[13px] text-muted">
              We engineer solutions to match your exact specifications and site requirements.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[46px] shrink-0 items-center rounded-full bg-signal px-7 text-[12px] font-black text-ink transition-colors hover:bg-signal-hover"
          >
            Request a Free Quote
          </Link>
        </div>
      </Container>

      {/* Lightbox */}
      {lb !== null && lbImages.length > 0 && (
        <Lightbox
          images={lbImages}
          index={lb.imgIdx}
          onClose={() => setLb(null)}
          onNavigate={(imgIdx) => setLb((prev) => ({ ...prev, imgIdx }))}
        />
      )}
    </section>
  );
}
