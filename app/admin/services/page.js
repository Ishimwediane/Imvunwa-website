"use client";

import { useEffect, useState } from "react";
import {
  ModeBanner, PageHeader, Btn, Icon, ICONS, ConfirmDialog,
  EditableText, EditableImage, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";
import {
  fetchServices, createService, updateService, deleteService, uploadImage,
} from "../../../lib/adminApi";

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toast, showToast] = useSavedToast();

  useEffect(() => {
    fetchServices()
      .then(setServices)
      .catch((e) => showToast("Could not load services: " + e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Optimistic local update + persist */
  const update = (id, patch) => {
    setServices((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
    updateService(id, patch).catch((e) => showToast("Could not save: " + e.message));
  };

  const addService = async () => {
    try {
      const row = await createService({
        name: "",
        description: "",
        image_url: "",
        sort_order: services.length + 1,
      });
      setServices((list) => [...list, row]);
      showToast("New service added");
    } catch (e) {
      showToast("Could not add: " + e.message);
    }
  };

  const confirmDelete = async () => {
    const id = deleting.id;
    setServices((list) => list.filter((s) => s.id !== id));
    setDeleting(null);
    try {
      await deleteService(id);
      showToast("Service removed");
    } catch (e) {
      showToast("Could not remove: " + e.message);
    }
  };

  return (
    <div>
      {toast}
      <ModeBanner />
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

      {loading ? (
        <SkeletonGrid />
      ) : (
        <PreviewBlock where="Services page">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article key={s.id} className="group/card relative flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm">
                <button
                  onClick={() => setDeleting(s)}
                  className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover/card:opacity-100"
                  aria-label="Remove service"
                >
                  <Icon path={ICONS.trash} className="h-4 w-4" />
                </button>

                <EditableImage
                  value={s.image_url}
                  onChange={(url) => update(s.id, { image_url: url })}
                  uploader={uploadImage}
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

            <button
              onClick={addService}
              className="flex min-h-[260px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line text-muted transition-colors hover:border-signal hover:text-signal-dark"
            >
              <Icon path={ICONS.plus} className="h-8 w-8" />
              <span className="text-[13px] font-bold">Add a service</span>
            </button>
          </div>
        </PreviewBlock>
      )}

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

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[260px] animate-pulse rounded-xl border border-line bg-line/30" />
      ))}
    </div>
  );
}
