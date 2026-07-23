"use client";

import { useRef, useState } from "react";
import {
  DemoBanner, PageHeader, Field, TextInput, Btn, Icon, ICONS,
  Modal, ConfirmDialog, EmptyState, EditableText, useSavedToast,
} from "../../../components/admin/ui";

let UID = 1000;
const uid = () => ++UID;

/* Seed mirrors the live portfolio (trimmed to a few photos each) */
const SEED = [
  {
    id: uid(), name: "Welding Services", subs: [
      { id: uid(), name: "Doors & Gates", images: [
        { id: uid(), src: "/image/project1.jpg" }, { id: uid(), src: "/image/project2.jpg" }, { id: uid(), src: "/image/project4.jpg" },
      ] },
      { id: uid(), name: "Roofing Frames", images: [
        { id: uid(), src: "/image/project5.jpg" }, { id: uid(), src: "/image/welding1.png" },
      ] },
      { id: uid(), name: "Structural Frames", images: [
        { id: uid(), src: "/image/execution.jpg" }, { id: uid(), src: "/image/manufacturing.jpg" },
      ] },
    ],
  },
  {
    id: uid(), name: "Manufacturing of Machines", subs: [
      { id: uid(), name: "Industrial Machines", images: [
        { id: uid(), src: "/image/manifa.jpg" }, { id: uid(), src: "/image/mman.png" },
      ] },
      { id: uid(), name: "Product Fabrication", images: [
        { id: uid(), src: "/image/product1.jpg" }, { id: uid(), src: "/image/ppic (1).jpg" },
      ] },
    ],
  },
  {
    id: uid(), name: "Machine Repairment", subs: [
      { id: uid(), name: "Heavy Equipment", images: [{ id: uid(), src: "/image/repaire.jpg" }] },
      { id: uid(), name: "Precision Repair", images: [{ id: uid(), src: "/image/pic1.jpg" }] },
    ],
  },
  {
    id: uid(), name: "Painting Services", subs: [
      { id: uid(), name: "Anti-Corrosion Coating", images: [{ id: uid(), src: "/image/painting.jpg" }] },
      { id: uid(), name: "Decorative Finishes", images: [{ id: uid(), src: "/image/paint.jpg" }] },
    ],
  },
  {
    id: uid(), name: "Electricity Installation and Repair", subs: [
      { id: uid(), name: "Industrial Wiring", images: [{ id: uid(), src: "/image/electricity.jpg" }] },
    ],
  },
  {
    id: uid(), name: "Plumbing Services", subs: [
      { id: uid(), name: "Industrial Piping", images: [{ id: uid(), src: "/image/plumb.jpg" }] },
    ],
  },
  {
    id: uid(), name: "Product Design", subs: [
      { id: uid(), name: "Design & Prototyping", images: [{ id: uid(), src: "/image/design.jpg" }] },
    ],
  },
];

/* ── A single photo tile with hover-remove ───────────────────── */
function PhotoTile({ src, onRemove }) {
  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      <button
        onClick={onRemove}
        className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
        aria-label="Remove photo"
      >
        <Icon path={ICONS.trash} className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

/* ── "Add photo" upload tile ─────────────────────────────────── */
function AddPhotoTile({ onAdd }) {
  const ref = useRef(null);
  const handle = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => onAdd(URL.createObjectURL(f)));
    e.target.value = "";
  };
  return (
    <>
      <button
        onClick={() => ref.current?.click()}
        className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-line text-muted transition-colors hover:border-signal hover:text-signal-dark"
      >
        <Icon path={ICONS.upload} className="h-6 w-6" />
        <span className="text-[11px] font-bold">Add photo</span>
      </button>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handle} />
    </>
  );
}

export default function ProjectsManager() {
  const [cats, setCats] = useState(SEED);
  const [open, setOpen] = useState(() => new Set(SEED.length ? [SEED[0].id] : []));
  const [catModal, setCatModal] = useState(null);   // { mode, id?, name }
  const [subModal, setSubModal] = useState(null);   // { mode, catId, id?, name }
  const [confirm, setConfirm] = useState(null);      // { kind, ...ids, label }
  const [toast, showToast] = useSavedToast();

  const toggle = (id) =>
    setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  /* ── Category ops ── */
  const saveCat = (e) => {
    e.preventDefault();
    const name = catModal.name.trim();
    if (!name) return;
    if (catModal.mode === "edit") {
      setCats((c) => c.map((x) => (x.id === catModal.id ? { ...x, name } : x)));
      showToast("Category renamed (preview)");
    } else {
      const id = uid();
      setCats((c) => [...c, { id, name, subs: [] }]);
      setOpen((s) => new Set(s).add(id));
      showToast("Category added (preview)");
    }
    setCatModal(null);
  };

  /* ── Sub-category ops ── */
  const saveSub = (e) => {
    e.preventDefault();
    const name = subModal.name.trim();
    if (!name) return;
    if (subModal.mode === "edit") {
      setCats((c) => c.map((x) => x.id !== subModal.catId ? x : {
        ...x, subs: x.subs.map((s) => (s.id === subModal.id ? { ...s, name } : s)),
      }));
      showToast("Sub-category renamed (preview)");
    } else {
      setCats((c) => c.map((x) => x.id !== subModal.catId ? x : {
        ...x, subs: [...x.subs, { id: uid(), name, images: [] }],
      }));
      showToast("Sub-category added (preview)");
    }
    setSubModal(null);
  };

  /* ── Image ops ── */
  const addImage = (catId, subId, src) =>
    setCats((c) => c.map((x) => x.id !== catId ? x : {
      ...x, subs: x.subs.map((s) => s.id !== subId ? s : { ...s, images: [...s.images, { id: uid(), src }] }),
    }));

  const removeImage = (catId, subId, imgId) =>
    setCats((c) => c.map((x) => x.id !== catId ? x : {
      ...x, subs: x.subs.map((s) => s.id !== subId ? s : { ...s, images: s.images.filter((i) => i.id !== imgId) }),
    }));

  const renameCat = (catId, name) =>
    setCats((c) => c.map((x) => (x.id === catId ? { ...x, name } : x)));

  const renameSub = (catId, subId, name) =>
    setCats((c) => c.map((x) => x.id !== catId ? x : {
      ...x, subs: x.subs.map((s) => (s.id === subId ? { ...s, name } : s)),
    }));

  /* ── Delete confirm ── */
  const runConfirm = () => {
    if (confirm.kind === "cat") {
      setCats((c) => c.filter((x) => x.id !== confirm.catId));
      showToast("Category removed (preview)");
    } else {
      setCats((c) => c.map((x) => x.id !== confirm.catId ? x : { ...x, subs: x.subs.filter((s) => s.id !== confirm.subId) }));
      showToast("Sub-category removed (preview)");
    }
    setConfirm(null);
  };

  const totalPhotos = (cat) => cat.subs.reduce((a, s) => a + s.images.length, 0);

  return (
    <div>
      {toast}
      <DemoBanner />
      <PageHeader
        title="Projects & Photos"
        subtitle="Organise your work into categories (e.g. Welding) and sub-categories (e.g. Doors & Gates), then upload photos into each one."
        action={
          <Btn onClick={() => setCatModal({ mode: "add", name: "" })}>
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Add category
          </Btn>
        }
      />

      {cats.length === 0 ? (
        <EmptyState
          title="No categories yet"
          hint="Create your first project category to start adding photos of your work."
          action={<Btn onClick={() => setCatModal({ mode: "add", name: "" })}><Icon path={ICONS.plus} className="h-4 w-4" />Add category</Btn>}
        />
      ) : (
        <div className="space-y-4">
          {cats.map((cat) => {
            const isOpen = open.has(cat.id);
            return (
              <div key={cat.id} className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
                {/* Category header */}
                <div className="flex items-center gap-3 px-5 py-4">
                  <button onClick={() => toggle(cat.id)} className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-panel text-muted transition-transform hover:text-ink" aria-label={isOpen ? "Collapse" : "Expand"}>
                    <Icon path={ICONS.chevron} className={`h-4 w-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <EditableText
                      as="h3"
                      value={cat.name}
                      onChange={(v) => renameCat(cat.id, v)}
                      placeholder="Category name"
                      className="text-[15px] font-extrabold text-ink"
                    />
                    <p className="text-[11.5px] font-semibold text-muted">
                      {cat.subs.length} sub-categories · {totalPhotos(cat)} photos
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Btn variant="ghost" size="sm" onClick={() => toggle(cat.id)}>
                      {isOpen ? "Collapse" : "Open"}
                    </Btn>
                    <Btn variant="danger" size="sm" onClick={() => setConfirm({ kind: "cat", catId: cat.id, label: cat.name })}>
                      <Icon path={ICONS.trash} className="h-4 w-4" />
                    </Btn>
                  </div>
                </div>

                {/* Sub-categories */}
                {isOpen && (
                  <div className="space-y-5 border-t border-line bg-panel/40 px-5 py-5">
                    {cat.subs.map((sub) => (
                      <div key={sub.id} className="rounded-xl border border-line bg-white p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex min-w-0 flex-1 items-center gap-2">
                            <span className="h-[3px] w-6 shrink-0 rounded-full bg-signal" />
                            <EditableText
                              as="h4"
                              value={sub.name}
                              onChange={(v) => renameSub(cat.id, sub.id, v)}
                              placeholder="Sub-category name"
                              className="text-[13.5px] font-extrabold text-ink"
                            />
                            <span className="shrink-0 rounded-full bg-panel px-2 py-0.5 text-[10.5px] font-bold text-muted">{sub.images.length}</span>
                          </div>
                          <button onClick={() => setConfirm({ kind: "sub", catId: cat.id, subId: sub.id, label: sub.name })} className="shrink-0 rounded-md p-1.5 text-muted hover:bg-red-50 hover:text-red-600" aria-label="Delete sub-category">
                            <Icon path={ICONS.trash} className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
                          {sub.images.map((img) => (
                            <PhotoTile key={img.id} src={img.src} onRemove={() => removeImage(cat.id, sub.id, img.id)} />
                          ))}
                          <AddPhotoTile onAdd={(src) => addImage(cat.id, sub.id, src)} />
                        </div>
                      </div>
                    ))}

                    <Btn variant="ghost" size="sm" onClick={() => setSubModal({ mode: "add", catId: cat.id, name: "" })}>
                      <Icon path={ICONS.plus} className="h-4 w-4" /> Add sub-category
                    </Btn>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Category modal */}
      <Modal
        open={!!catModal}
        title={catModal?.mode === "edit" ? "Rename category" : "Add a category"}
        onClose={() => setCatModal(null)}
        size="sm"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setCatModal(null)}>Cancel</Btn>
            <Btn type="submit" form="cat-form">{catModal?.mode === "edit" ? "Save" : "Add category"}</Btn>
          </>
        }
      >
        {catModal && (
          <form id="cat-form" onSubmit={saveCat}>
            <Field label="Category name" hint="e.g. Welding Services, Painting Services">
              <TextInput value={catModal.name} onChange={(e) => setCatModal((m) => ({ ...m, name: e.target.value }))} autoFocus required />
            </Field>
          </form>
        )}
      </Modal>

      {/* Sub-category modal */}
      <Modal
        open={!!subModal}
        title={subModal?.mode === "edit" ? "Rename sub-category" : "Add a sub-category"}
        onClose={() => setSubModal(null)}
        size="sm"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setSubModal(null)}>Cancel</Btn>
            <Btn type="submit" form="sub-form">{subModal?.mode === "edit" ? "Save" : "Add sub-category"}</Btn>
          </>
        }
      >
        {subModal && (
          <form id="sub-form" onSubmit={saveSub}>
            <Field label="Sub-category name" hint="e.g. Doors & Gates, Roofing Frames">
              <TextInput value={subModal.name} onChange={(e) => setSubModal((m) => ({ ...m, name: e.target.value }))} autoFocus required />
            </Field>
          </form>
        )}
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={!!confirm}
        title={confirm?.kind === "cat" ? "Remove this category?" : "Remove this sub-category?"}
        message={
          confirm?.kind === "cat"
            ? `"${confirm?.label}" and all its sub-categories and photos will be removed.`
            : `"${confirm?.label}" and its photos will be removed.`
        }
        confirmLabel="Remove"
        onConfirm={runConfirm}
        onClose={() => setConfirm(null)}
      />
    </div>
  );
}
