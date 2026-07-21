import Image from "next/image";
import StarRating from "./StarRating";
import QuoteIcon from "./QuoteIcon";

/**
 * TestimonialCard — glassmorphism testimonial card used in the homepage section.
 * Replaces 3× repeated ~70-line testimonial card blocks in app/page.js.
 *
 * Props:
 *  - image      string  image src
 *  - imageAlt   string  image alt text
 *  - badge      string  service badge label
 *  - quote      string  testimonial text
 *  - author     string  author full name
 *  - role       string  author role/location
 *  - initial    string  single letter for the avatar circle
 *  - animClass  string  Tailwind animation class (e.g. "animate-float-1")
 */
export default function TestimonialCard({
  image, imageAlt, badge, quote, author, role, initial, animClass = "animate-float-1"
}) {
  return (
    <div
      className={`${animClass} flex flex-col overflow-hidden rounded-3xl`}
      style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,0.13)",
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden shrink-0">
        <Image
          src={image}
          alt={imageAlt}
          width={380}
          height={200}
          quality={75}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
        <span className="absolute bottom-3 left-4 rounded-full bg-signal px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
          {badge}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <StarRating count={5} />
        <QuoteIcon />
        <p className="flex-1 text-[13px] leading-[1.85] text-white/80">{quote}</p>
        <div className="my-5 h-px bg-white/10" />
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-signal text-[12px] font-black text-white">
            {initial}
          </div>
          <div>
            <div className="text-[13px] font-bold text-white">{author}</div>
            <div className="text-[11px] text-white/50">{role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
