import Link from "next/link";

/**
 * Button — the site's pill call-to-action, rendered as a Next.js Link.
 * Replaces the copy-pasted `rounded-full bg-signal ...` anchor markup.
 *
 * Props:
 *  - href      string   destination
 *  - variant   "solid" | "outline"   visual style (default: "solid")
 *  - className string   extra utility classes (e.g. spacing) to merge
 */
const VARIANTS = {
  solid: "bg-signal text-ink hover:bg-signal-hover",
  outline: "border border-ink/20 text-ink hover:border-signal hover:text-signal",
};

export default function Button({ href, children, variant = "solid", className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[48px] items-center justify-center rounded-full px-8 text-[13px] font-black transition-colors ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
