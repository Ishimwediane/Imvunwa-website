"use client";

import { useState } from "react";
import {
  DemoBanner, PageHeader, Btn, Icon, ICONS, ConfirmDialog,
  EditableText, EditableImage, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";

/* Seed = the 7 official services currently on the site */
const SEED = [
  { id: 1, name: "Manufacturing of Machines", description: "Design and production of high-quality machines tailored to meet specific industrial needs.", image: "/image/manufacturing.jpg" },
  { id: 2, name: "Machine Repairment", description: "Comprehensive repair services for a wide range of machinery, with prompt diagnosis and effective solutions.", image: "/image/repairement.jpg" },
  { id: 3, name: "Welding Services", description: "Top-tier welding services for both structural and custom projects, delivered with precision and safety.", image: "/image/welding1.png" },
  { id: 4, name: "Painting Services", description: "Top-quality painting finishes for homes and businesses, with protective surface coating that lasts.", image: "/image/paint.jpg" },
  { id: 5, name: "Electricity Installation and Repair", description: "Professional electrical services including installation, repair, and maintenance by certified electricians.", image: "/image/electricity.jpg" },
  { id: 6, name: "Plumbing Services", description: "Installations, repairs, and maintenance of water systems for residential and commercial spaces.", image: "/image/plumb.jpg" },
  { id: 7, name: "Product Design", description: "Innovative product design services developed collaboratively using cutting-edge technology.", image: "/image/product1.jpg" },
];

let NEXT = 100;

export default function ServicesManager() {
  const [services, setServices] = useState(SEED);
  const [deleting, setDeleting] = useState(null);
  const [toast, showToast] = useSavedToast();

  const update = (id, patch) =>
    setServices((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  const addService = () => {
    const id = ++NEXT;
    setServices((list) => [...list, { id, name: "", description: "", image: "" }]);
    showToast("New service added (preview)");
  };

  const confirmDelete = () => {
    setServices((list) => list.filter((s) => s.id !== deleting.id));
    setDeleting(null);
    showToast("Service removed (preview)");
  };

  return (
    <div>
      {toast}
      <DemoBanner />
      <PageHeader
        title="Services"
        subtitle="This is your Services page. Click a service's photo, name, or description to change it. Use “Add service” for a new one, or the bin icon to remove one."
        action={
          <Btn onClick={addService}>
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Add service
          </Btn>
        }
      />

      <PreviewBlock where="Services page">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article key={s.id} className="group/card relative flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
              {/* Delete */}
              <button
                onClick={() => setDeleting(s)}
                className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover/card:opacity-100"
                aria-label="Remove service"
              >
                <Icon path={ICONS.trash} className="h-4 w-4" />
              </button>

              <EditableImage
                value={s.image}
                onChange={(url) => update(s.id, { image: url })}
                rounded="rounded-none"
                className="h-[150px] w-full"
                placeholder="Add photo"
              />

              <div className="flex flex-1 flex-col p-4">
                <EditableText
                  as="h3"
                  value={s.name}
                  onChange={(v) => update(s.id, { name: v })}
                  placeholder="Service name"
                  className="text-[15px] font-extrabold text-ink"
                />
                <EditableText
                  as="p"
                  multiline
                  value={s.description}
                  onChange={(v) => update(s.id, { description: v })}
                  placeholder="Write a short description of this service…"
                  className="mt-2 block flex-1 text-[12.5px] leading-relaxed text-muted"
                />
              </div>
            </article>
          ))}

          {/* Add tile */}
          <button
            onClick={addService}
            className="flex min-h-[260px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line text-muted transition-colors hover:border-signal hover:text-signal-dark"
          >
            <Icon path={ICONS.plus} className="h-8 w-8" />
            <span className="text-[13px] font-bold">Add a service</span>
          </button>
        </div>
      </PreviewBlock>

      <ConfirmDialog
        open={!!deleting}
        title="Remove this service?"
        message={`"${deleting?.name || "This service"}" will be removed from your website. You can always add it again later.`}
        confirmLabel="Remove service"
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
