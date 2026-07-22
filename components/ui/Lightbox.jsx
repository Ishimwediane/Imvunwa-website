"use client";

import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const total = images.length;
  const current = images[index];

  const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  /* ── Keyboard navigation ─────────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   goPrev();
      if (e.key === "ArrowRight")  goNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.93)" }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg backdrop-blur-sm transition hover:bg-white/25"
      >
        ✕
      </button>

      {/* Counter */}
      <div className="absolute left-1/2 top-5 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-[12px] font-bold text-white/70 backdrop-blur-sm select-none">
        {index + 1} / {total}
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => { e.stopPropagation(); goPrev(); }}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl font-bold backdrop-blur-sm transition hover:bg-signal hover:text-ink sm:left-6"
      >
        ‹
      </button>

      {/* Main image */}
      <div
        className="relative mx-16 flex flex-col items-center sm:mx-24"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={`${current.src}-${index}`}
          src={current.src}
          alt={current.caption}
          className="block max-h-[78vh] max-w-[80vw] rounded-xl object-contain shadow-2xl"
          style={{ animation: "lb-fade 0.2s ease" }}
        />
        {/* Caption */}
        {current.caption && (
          <p className="mt-4 text-center text-[13px] font-medium text-white/55 max-w-[60vw]">
            {current.caption}
          </p>
        )}
      </div>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); goNext(); }}
        aria-label="Next image"
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white text-2xl font-bold backdrop-blur-sm transition hover:bg-signal hover:text-ink sm:right-6"
      >
        ›
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 overflow-x-auto px-4 max-w-[80vw]">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
            aria-label={`Go to image ${i + 1}`}
            className={`shrink-0 rounded-full transition-all duration-200 ${
              i === index
                ? "h-2 w-7 bg-signal"
                : "h-2 w-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes lb-fade {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>,
    document.body
  );
}
