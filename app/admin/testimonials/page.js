"use client";

import { useEffect, useState } from "react";
import {
  ModeBanner, PageHeader, Btn, Icon, ICONS, ConfirmDialog,
  EditableText, EditableImage, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";
import {
  fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial, uploadImage,
} from "../../../backend/adminApi";

const initialOf = (name) => (name || "?").trim().charAt(0).toUpperCase() || "?";

export default function TestimonialsManager() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toast, showToast] = useSavedToast();

  useEffect(() => {
    fetchTestimonials()
      .then(setItems)
      .catch((e) => showToast("Could not load testimonials: " + e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (id, patch) => {
    setItems((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
    updateTestimonial(id, patch).catch((e) => showToast("Could not save: " + e.message));
  };

  const addItem = async () => {
    try {
      const row = await createTestimonial({
        author: "", role: "", badge: "", quote: "", image_url: "", sort_order: items.length + 1,
      });
      setItems((list) => [...list, row]);
      showToast("New testimonial added");
    } catch (e) {
      showToast("Could not add: " + e.message);
    }
  };

  const confirmDelete = async () => {
    const id = deleting.id;
    setItems((list) => list.filter((t) => t.id !== id));
    setDeleting(null);
    try {
      await deleteTestimonial(id);
      showToast("Testimonial removed");
    } catch (e) {
      showToast("Could not remove: " + e.message);
    }
  };

  return (
    <div>
      {toast}
      <ModeBanner />
      <PageHeader
        title="Testimonials"
        subtitle="These are the client reviews shown on your home page. Click a photo, quote, name, role, or service label to edit it. Use “Add testimonial” for a new one."
        action={
          <Btn onClick={addItem}>
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Add testimonial
          </Btn>
        }
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-[320px] animate-pulse rounded-xl border border-line bg-line/30" />
          ))}
        </div>
      ) : (
        <PreviewBlock where="Home page — What Our Clients Say">
          {/* Dark backdrop mirrors the real testimonial section */}
          <div className="rounded-xl bg-gradient-to-br from-deeper to-[#2b3a4d] p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <article
                  key={t.id}
                  className="group/card relative flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] backdrop-blur"
                >
                  <button
                    onClick={() => setDeleting(t)}
                    className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover/card:opacity-100"
                    aria-label="Remove testimonial"
                  >
                    <Icon path={ICONS.trash} className="h-4 w-4" />
                  </button>

                  {/* Photo + badge */}
                  <div className="relative">
                    <EditableImage
                      value={t.image_url}
                      onChange={(url) => update(t.id, { image_url: url })}
                      uploader={uploadImage}
                      rounded="rounded-none"
                      className="h-[150px] w-full"
                      placeholder="Add photo"
                    />
                    <span className="pointer-events-none absolute bottom-2 left-3 z-[1]">
                      <EditableText
                        value={t.badge}
                        onChange={(v) => update(t.id, { badge: v })}
                        placeholder="Service"
                        className="pointer-events-auto rounded-full bg-signal px-3 py-1 text-[10px] font-black uppercase tracking-wider text-ink"
                      />
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="mb-2 text-signal">★★★★★</span>
                    <EditableText
                      as="p"
                      multiline
                      value={t.quote}
                      onChange={(v) => update(t.id, { quote: v })}
                      placeholder="Write the client's review here…"
                      className="flex-1 text-[13px] leading-[1.8] text-white/80"
                    />
                    <div className="my-4 h-px bg-white/10" />
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-signal text-[13px] font-black text-white">
                        {initialOf(t.author)}
                      </div>
                      <div className="min-w-0">
                        <EditableText
                          value={t.author}
                          onChange={(v) => update(t.id, { author: v })}
                          placeholder="Client name"
                          className="block text-[13px] font-bold text-white"
                        />
                        <EditableText
                          value={t.role}
                          onChange={(v) => update(t.id, { role: v })}
                          placeholder="Role, location"
                          className="block text-[11px] text-white/50"
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Add tile */}
              <button
                onClick={addItem}
                className="flex min-h-[320px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/25 text-white/70 transition-colors hover:border-signal hover:text-signal"
              >
                <Icon path={ICONS.plus} className="h-8 w-8" />
                <span className="text-[13px] font-bold">Add a testimonial</span>
              </button>
            </div>
          </div>
        </PreviewBlock>
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Remove this testimonial?"
        message={`The review from "${deleting?.author || "this client"}" will be removed from your home page.`}
        confirmLabel="Remove testimonial"
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
