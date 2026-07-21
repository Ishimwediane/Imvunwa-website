import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

/**
 * ServiceCard — icon-based service card used on the homepage services grid.
 * Replaces 6× repeated service card JSX blocks in app/page.js.
 *
 * Props:
 *  - icon        ReactNode  SVG icon element
 *  - title       string     card heading
 *  - description string     card body text
 *  - href        string     link destination (default: /services)
 */
export default function ServiceCard({ icon, title, description, href = "/services" }) {
  return (
    <div className="group flex flex-col rounded-2xl bg-warm-card p-7 shadow-sm border border-black/10 hover:bg-ink hover:border-ink hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-signal/10 group-hover:bg-white/10 transition-colors duration-300">
        <span className="text-signal">{icon}</span>
      </div>
      <h3 className="text-[17px] font-extrabold text-ink group-hover:text-white transition-colors duration-300">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-[12px] leading-[1.7] text-ink/75 group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-1.5 text-[12px] font-extrabold text-ink group-hover:text-signal hover:gap-3 transition-all duration-300"
      >
        Learn more <span className="text-base">›</span>
      </Link>
    </div>
  );
}
