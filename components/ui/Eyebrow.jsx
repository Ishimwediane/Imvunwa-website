/**
 * Eyebrow — small uppercase label above headings.
 * Replaces the copy-pasted `const eyebrow` in every page.
 */
export default function Eyebrow({ children, className = "" }) {
  return (
    <p className={`mb-3.5 text-[10px] font-black uppercase tracking-[0.18em] text-signal ${className}`}>
      {children}
    </p>
  );
}
