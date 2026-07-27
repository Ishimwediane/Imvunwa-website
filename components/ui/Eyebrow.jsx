/**
 * Eyebrow — small uppercase label above headings.
 * Replaces the copy-pasted `const eyebrow` in every page.
 */
export default function Eyebrow({ children, className = "", onLight = false }) {
  // On white/light backgrounds the brand orange (#F5A623) fails WCAG contrast,
  // so switch to the darker accessible orange token (>=4.5:1) when `onLight`.
  const tone = onLight ? "text-signal-ink" : "text-signal";
  return (
    <p className={`mb-3.5 text-[10px] font-black uppercase tracking-[0.18em] ${tone} ${className}`}>
      {children}
    </p>
  );
}
