/**
 * QuoteIcon — large decorative opening-quote SVG.
 * Replaces 3× repeated quote mark in testimonials.
 */
export default function QuoteIcon() {
  return (
    <svg
      className="mb-3 h-7 w-7 text-signal/40"
      fill="currentColor"
      viewBox="0 0 32 32"
      aria-hidden="true"
    >
      <path d="M10 8C5.6 8 2 11.6 2 16v8h8v-8H5.9C6.4 13.5 8 11.5 10 11V8zm12 0c-4.4 0-8 3.6-8 8v8h8v-8h-4.1c.5-2.5 2.1-4.5 4.1-5V8z" />
    </svg>
  );
}
