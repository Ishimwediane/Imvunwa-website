"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "../../components/ui/Container";
import PageHero from "../../components/ui/PageHero";
import SectionCta from "../../components/ui/SectionCta";
import Lightbox from "../../components/ui/Lightbox";
import { PORTFOLIO_DATA as PORTFOLIO } from "../../data/portfolioData";

/* ── Clickable image card ─────────────────────────────────────── */
function ImgCard({ src, caption, onClick }) {
  return (
    <div
      className="group relative cursor-zoom-in overflow-hidden rounded-2xl bg-white border border-black/10 shadow-md aspect-[4/3]"
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
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Expand icon */}
      <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      {/* Caption */}
      <p className="absolute bottom-0 left-0 right-0 translate-y-3 px-4 py-4 text-[12px] font-semibold leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {caption}
      </p>
    </div>
  );
}

/* ── Sub-category section ─────────────────────────────────────── */
const INITIAL_SHOW = 6;

function SubCategory({ name, images }) {
  const [expanded, setExpanded] = useState(false);
  const [lbIndex, setLbIndex] = useState(null);
  const visible = expanded ? images : images.slice(0, INITIAL_SHOW);
  const hasMore = images.length > INITIAL_SHOW;

  return (
    <div className="mb-14">
      {/* Sub-heading */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="h-[3px] w-8 rounded-full bg-signal" />
          <h3 className="text-[13px] font-black uppercase tracking-[0.15em] text-signal">{name}</h3>
        </div>
        <div className="h-px flex-1 bg-line" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
          {images.length} {images.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Standard grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((img, i) => (
          <div key={i}>
            <ImgCard
              {...img}
              onClick={() => setLbIndex(i)}
            />
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-8 py-3 text-[12px] font-black uppercase tracking-wider text-ink/70 transition-all duration-200 hover:border-signal hover:bg-signal/10 hover:text-signal"
          >
            {expanded ? (
              <>
                <span className="transition-transform group-hover:-translate-y-0.5">↑</span>
                Collapse
              </>
            ) : (
              <>
                <span className="transition-transform group-hover:translate-y-0.5">↓</span>
                Show {images.length - INITIAL_SHOW} More
              </>
            )}
          </button>
        </div>
      )}

      {lbIndex !== null && (
        <Lightbox
          images={images}
          index={lbIndex}
          onClose={() => setLbIndex(null)}
          onNavigate={setLbIndex}
        />
      )}
    </div>
  );
}

/* ── Inner page content ───────────────────────────────────────── */
function ProjectsContent() {
  const searchParams = useSearchParams();
  const [activeCat, setActiveCat] = useState("welding");
  const [activeSub, setActiveSub] = useState("all");
  const contentRef = useRef(null);

  useEffect(() => {
    const cat = searchParams.get("cat");
    const sub = searchParams.get("sub");
    
    const validCat = PORTFOLIO.find((c) => c.id === cat);
    if (validCat) {
      setActiveCat(validCat.id);
      if (sub && validCat.subs.some((s) => s.name === sub)) {
        setActiveSub(sub);
      } else {
        setActiveSub("all");
      }
      
      // If navigating from navbar to a specific category, scroll to the content
      if (cat) {
        setTimeout(() => {
          contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300); // slight delay to ensure layout is ready
      }
    } else {
      // If no valid cat in URL, keep default but ensure sub is "all"
      setActiveSub("all");
    }
  }, [searchParams]);

  const handleCatChange = (catId) => {
    setActiveCat(catId);
    setActiveSub("all");
  };

  const current = PORTFOLIO.find((c) => c.id === activeCat);
  const totalImages = current.subs.reduce((acc, s) => acc + s.images.length, 0);
  const totalSubs   = current.subs.length;

  const displayedSubs =
    activeSub === "all"
      ? current.subs
      : current.subs.filter((s) => s.name === activeSub);

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <PageHero
        eyebrow="Our Portfolio"
        title="Projects & Work"
        subtitle="Browse our completed projects by service category. Each category shows the specific types of work we deliver across Rwanda."
        bgImage="/image/execution.jpg"
      />

      <section ref={contentRef} className="scroll-mt-6 px-4 py-16 sm:px-6 lg:py-20">
        <Container>

          {/* ── Stats bar ──────────────────────────────────────── */}
          <div className="mb-12 grid grid-cols-2 gap-3 rounded-2xl border border-line bg-panel p-4 sm:grid-cols-4 sm:p-6 shadow-sm">
            {[
              { label: "Service Areas", value: PORTFOLIO.length },
              { label: "Project Categories", value: PORTFOLIO.reduce((a, s) => a + s.subs.length, 0) },
              { label: "Photos in This View", value: totalImages },
              { label: "Sub-categories", value: totalSubs },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-[28px] font-black text-signal leading-none">{value}+</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* ── Two-column layout: sidebar + content ─────────── */}
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">

            {/* Sidebar navigation */}
            <aside className="lg:w-[220px] shrink-0">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.15em] text-muted">
                Service Areas
              </p>
              <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1">
                {PORTFOLIO.map((cat) => {
                  const isActive = activeCat === cat.id;
                  const count = cat.subs.reduce((a, s) => a + s.images.length, 0);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCatChange(cat.id)}
                      className={`group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-[12px] font-bold transition-all duration-200 w-full ${
                        isActive
                          ? "bg-signal text-ink shadow-lg shadow-signal/25"
                          : "text-ink/70 hover:bg-panel hover:text-ink"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span>{cat.shortLabel || cat.label}</span>
                      </span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${
                        isActive ? "bg-black/20 text-ink" : "bg-ink/8 text-muted"
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar CTA */}
              <div className="mt-8 hidden rounded-2xl border border-signal/30 bg-signal/10 p-5 lg:block">
                <p className="text-[13px] font-bold text-ink">
                  Interested in {current.shortLabel || current.label}?
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">
                  Get a tailored quote for your project.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-signal py-2.5 text-[12px] font-black text-ink transition-colors hover:bg-signal-hover"
                >
                  Request Quote
                </Link>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-w-0 flex-1">
              {/* Category header */}
              <div className="mb-10 flex flex-wrap items-start justify-between gap-4 rounded-2xl border border-line bg-panel p-6 shadow-sm">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-[22px] font-black text-ink sm:text-[26px]">
                      {current.label}
                    </h2>
                  </div>
                  <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed text-muted">
                    {current.desc}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveSub("all")}
                      className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold transition-all ${
                        activeSub === "all"
                          ? "bg-signal text-ink"
                          : "border border-ink/15 text-ink/70 hover:border-signal/50 hover:text-ink"
                      }`}
                    >
                      All Categories
                    </button>
                    {current.subs.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => setActiveSub(s.name)}
                        className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-bold transition-all ${
                          activeSub === s.name
                            ? "bg-signal text-ink"
                            : "border border-ink/15 text-ink/70 hover:border-signal/50 hover:text-ink"
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
                <Link
                  href={`/services/${activeCat}`}
                  className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-2.5 text-[12px] font-black text-ink/70 transition-all hover:border-signal hover:text-signal shrink-0"
                >
                  View Service Page →
                </Link>
              </div>

              {/* Sub-categories */}
              <div className="space-y-12">
                {displayedSubs.map((sub, i) => (
                  <div
                    key={sub.name}
                    style={{ animation: `grid-in 0.4s ease both`, animationDelay: `${i * 0.05}s` }}
                  >
                    <SubCategory name={sub.name} images={sub.images} />
                  </div>
                ))}
              </div>
            </main>
          </div>
          
          <style>{`
            @keyframes grid-in {
              from { opacity: 0; transform: translateY(14px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
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

/* ── Page wrapper ─────────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-signal border-t-transparent" />
            <p className="text-[13px] text-muted">Loading portfolio…</p>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
