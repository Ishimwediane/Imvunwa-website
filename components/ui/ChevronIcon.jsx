/**
 * ChevronIcon — animated chevron for dropdowns.
 * Replaces repeated inline chevron SVGs in Header.
 */
export default function ChevronIcon({ open = false, className = "h-3 w-3" }) {
  return (
    <svg
      className={`${className} transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
