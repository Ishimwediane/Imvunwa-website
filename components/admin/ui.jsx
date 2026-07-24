"use client";

import { useEffect, useRef, useState } from "react";
import { isSupabaseConfigured } from "../../lib/supabase/config";

/* ──────────────────────────────────────────────────────────────
   Shared admin UI primitives.
   Plain Tailwind + site color tokens (signal / ink / muted / line).
   Written to be friendly for a non-technical editor: big targets,
   clear labels, plain-language helper text.
   ────────────────────────────────────────────────────────────── */

/* ── Demo banner ─────────────────────────────────────────────── */
export function DemoBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-signal/40 bg-signal/10 px-4 py-3">
      <span className="mt-0.5 text-lg leading-none">👋</span>
      <p className="text-[13px] leading-relaxed text-ink/80">
        <strong className="font-bold">Preview mode.</strong> This is a preview of your dashboard. You can
        click around, add, edit and remove things to see how it works — but changes are{" "}
        <strong className="font-bold">not saved yet</strong>. Saving will be switched on in the next step.
      </p>
    </div>
  );
}

/* ── Mode banner: preview (no backend) vs live (Supabase on) ──── */
export function ModeBanner() {
  if (isSupabaseConfigured) {
    return (
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3">
        <span className="mt-0.5 text-lg leading-none">✅</span>
        <p className="text-[13px] leading-relaxed text-emerald-900">
          <strong className="font-bold">Live.</strong> Changes you make here are saved and appear on your
          website automatically.
        </p>
      </div>
    );
  }
  return <DemoBanner />;
}

/* ── Page header ─────────────────────────────────────────────── */
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[24px] font-black leading-tight text-ink sm:text-[28px]">{title}</h1>
        {subtitle && <p className="mt-1.5 max-w-[560px] text-[13.5px] leading-relaxed text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── Card ────────────────────────────────────────────────────── */
export function Card({ title, description, children, className = "", action }) {
  return (
    <section className={`rounded-2xl border border-line bg-white p-6 shadow-card ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-[16px] font-extrabold text-ink">{title}</h2>}
            {description && <p className="mt-1 text-[12.5px] leading-relaxed text-muted">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/* ── Form field wrapper ──────────────────────────────────────── */
export function Field({ label, hint, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      {label && <span className="mb-1.5 block text-[12.5px] font-bold text-ink">{label}</span>}
      {children}
      {hint && <span className="mt-1.5 block text-[11.5px] leading-relaxed text-muted">{hint}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-[13.5px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-signal focus:ring-2 focus:ring-signal/20";

export function TextInput({ className = "", ...props }) {
  return <input className={`${inputBase} ${className}`} {...props} />;
}

export function TextArea({ className = "", rows = 4, ...props }) {
  return <textarea rows={rows} className={`${inputBase} resize-y ${className}`} {...props} />;
}

/* ── Button ──────────────────────────────────────────────────── */
export function Btn({ variant = "primary", size = "md", className = "", children, ...props }) {
  const variants = {
    primary: "bg-signal text-ink hover:bg-signal-hover shadow-sm",
    ghost: "border border-line bg-white text-ink/80 hover:border-ink/30 hover:text-ink",
    danger: "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
    dark: "bg-deeper text-white hover:opacity-90",
  };
  const sizes = {
    sm: "min-h-[34px] px-3 text-[12px]",
    md: "min-h-[42px] px-5 text-[13px]",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── Icon (inline SVG paths, stroke style) ───────────────────── */
export function Icon({ path, className = "h-5 w-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {Array.isArray(path) ? path.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
      )) : (
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
      )}
    </svg>
  );
}

export const ICONS = {
  plus: "M12 4.5v15m7.5-7.5h-15",
  edit: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zM19.5 8.25l-3.75-3.75",
  trash: "M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0",
  home: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.5a.75.75 0 00.75.75h4.5a.75.75 0 00.75-.75V15a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v5.25c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75V9.75M8.25 21h8.25",
  text: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12",
  wrench: "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z",
  image: "M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z",
  users: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
  logout: "M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9",
  external: "M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25",
  chevron: "M8.25 4.5l7.5 7.5-7.5 7.5",
  check: "M4.5 12.75l6 6 9-13.5",
  upload: "M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5",
  close: "M6 18L18 6M6 6l12 12",
  grid: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z",
};

/* ── Modal ───────────────────────────────────────────────────── */
export function Modal({ open, title, onClose, children, footer, size = "md" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;
  const widths = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl" };

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-sm sm:p-8">
      <div className={`relative w-full ${widths[size]} rounded-2xl bg-white shadow-industrial`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h3 className="text-[16px] font-extrabold text-ink">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-line/40 hover:text-ink"
          >
            <Icon path={ICONS.close} className="h-4 w-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-line px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

/* ── Confirm dialog ──────────────────────────────────────────── */
export function ConfirmDialog({ open, title = "Are you sure?", message, confirmLabel = "Delete", onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
          <Btn variant="danger" onClick={onConfirm}>{confirmLabel}</Btn>
        </>
      }
    >
      <p className="text-[13.5px] leading-relaxed text-muted">{message}</p>
    </Modal>
  );
}

/* ── Image uploader (preview only, demo) ─────────────────────── */
export function ImageUploader({ value, onChange, label = "Image", hint, ratio = "aspect-[4/3]" }) {
  const inputRef = useRef(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (file) onChange?.(URL.createObjectURL(file));
  };

  return (
    <div>
      {label && <span className="mb-1.5 block text-[12.5px] font-bold text-ink">{label}</span>}
      <div
        className={`group relative ${ratio} w-full overflow-hidden rounded-xl border-2 border-dashed border-line bg-panel transition-colors hover:border-signal`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="Preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
            <Icon path={ICONS.image} className="h-8 w-8" />
            <span className="text-[12px] font-semibold">No image yet</span>
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center bg-black/0 text-[12px] font-bold text-white opacity-0 transition-all group-hover:bg-black/45 group-hover:opacity-100"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur-md">
            <Icon path={ICONS.upload} className="h-4 w-4" />
            {value ? "Change image" : "Upload image"}
          </span>
        </button>
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="text-[12px] font-bold text-signal-dark hover:underline"
        >
          Choose file…
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange?.("")}
            className="text-[12px] font-semibold text-muted hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>
      {hint && <span className="mt-1.5 block text-[11.5px] leading-relaxed text-muted">{hint}</span>}
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────────── */
export function EmptyState({ title, hint, action }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-panel px-6 py-14 text-center">
      <h3 className="text-[15px] font-bold text-ink">{title}</h3>
      {hint && <p className="mt-1.5 max-w-[380px] text-[12.5px] leading-relaxed text-muted">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/* ── Saved toast (transient, bottom-right) ───────────────────── */
export function useSavedToast() {
  const [msg, setMsg] = useState("");
  const show = (text = "Saved (preview)") => {
    setMsg(text);
    window.clearTimeout(show._t);
    show._t = window.setTimeout(() => setMsg(""), 2600);
  };
  const node = msg ? (
    <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-2.5 rounded-xl bg-deeper px-5 py-3.5 text-[13px] font-bold text-white shadow-industrial">
      <span className="grid h-6 w-6 place-items-center rounded-full bg-signal text-ink">
        <Icon path={ICONS.check} className="h-4 w-4" />
      </span>
      {msg}
    </div>
  ) : null;
  return [node, show];
}

/* ── Small avatar (photo or initials) ────────────────────────── */
export function Avatar({ image, initials, size = "h-12 w-12" }) {
  if (image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={image} alt="" className={`${size} shrink-0 rounded-full object-cover`} />;
  }
  return (
    <span className={`${size} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-signal to-signal-hover text-[13px] font-black text-ink`}>
      {initials}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────────
   Inline "edit on the page" primitives.
   These let a non-technical editor click text/photos directly on a
   live preview of their website and change them in place.
   ────────────────────────────────────────────────────────────── */

/* ── Click-to-edit text (contentEditable) ────────────────────── */
export function EditableText({
  value,
  onChange,
  as: Tag = "span",
  multiline = false,
  className = "",
  placeholder = "Click to edit",
}) {
  const ref = useRef(null);

  const commit = () => {
    const text = (ref.current?.innerText ?? "").replace(/ /g, " ").trim();
    if (text !== value) onChange?.(text);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      ref.current?.blur();
    }
    if (e.key === "Escape") {
      if (ref.current) ref.current.innerText = value;
      ref.current?.blur();
    }
  };

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      role="textbox"
      tabIndex={0}
      title="Click to edit"
      onBlur={commit}
      onKeyDown={onKeyDown}
      data-empty={value ? undefined : "true"}
      data-placeholder={placeholder}
      className={`editable ${className}`}
    >
      {value}
    </Tag>
  );
}

/* ── Click-to-change image (inline, with hover overlay) ──────── */
export function EditableImage({
  value,
  onChange,
  uploader,
  className = "",
  rounded = "rounded-xl",
  label = "Change photo",
  placeholder = "Add photo",
  fallback = null,
}) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const handle = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    try {
      setBusy(true);
      const url = uploader ? await uploader(f) : URL.createObjectURL(f);
      onChange?.(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`group relative overflow-hidden ${rounded} ${className}`}>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-full w-full object-cover" />
      ) : fallback ? (
        fallback
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-panel text-muted">
          <Icon path={ICONS.image} className="h-7 w-7" />
          {placeholder && <span className="text-[11px] font-semibold">{placeholder}</span>}
        </div>
      )}

      <button
        type="button"
        onClick={() => ref.current?.click()}
        disabled={busy}
        className={`absolute inset-0 flex items-center justify-center text-[12px] font-bold text-white transition-all ${
          busy ? "bg-black/55 opacity-100" : "bg-black/0 opacity-0 group-hover:bg-black/45 group-hover:opacity-100"
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md">
          <Icon path={ICONS.upload} className="h-4 w-4" />
          {busy ? "Uploading…" : value ? label : placeholder}
        </span>
      </button>

      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handle} />
    </div>
  );
}

/* ── Location chip (tells editor WHERE this appears on the site) ── */
export function WhereChip({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-3 py-1 text-[11px] font-bold text-signal-dark">
      <Icon path={ICONS.image} className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

/* ── Preview block wrapper (frames a live website section) ───── */
export function PreviewBlock({ where, children }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="mb-3 flex items-center gap-2">
        <WhereChip>{where}</WhereChip>
        <span className="text-[11px] font-semibold text-muted">Live preview — click to edit</span>
      </div>
      {children}
    </section>
  );
}
