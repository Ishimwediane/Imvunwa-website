"use client";

import { useEffect, useRef, useState } from "react";
import {
  ModeBanner, PageHeader, Field, TextInput, Btn, Icon, ICONS,
  Modal, ConfirmDialog, EmptyState, EditableText, useSavedToast,
} from "../../../components/admin/ui";
import {
  fetchProjects, createCategory, renameCategory, deleteCategory,
  createSubcategory, renameSubcategory, deleteSubcategory,
  addProjectImage, deleteProjectImage, uploadImage,
} from "../../../lib/adminApi";

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

/* ── "Add photo" upload tile (uploads, then persists) ────────── */
function AddPhotoTile({ onAddUrl }) {
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const handle = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setBusy(true);
    try {
      for (const f of files) {
        const url = await uploadImage(f);
        await onAddUrl(url);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <button
        onClick={() => ref.current?.click()}
        disabled={busy}
        className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-line text-muted transition-colors hover:border-signal hover:text-signal-dark"
      >
        <Icon path={ICONS.upload} className="h-6 w-6" />
        <span className="text-[11px] font-bold">{busy ? "Uploading…" : "Add photo"}</span>
      </button>
      <input ref={ref} type="file" accept="image/*" multiple className="hidden" onChange={handle} />
    </>
  );
}

export default function ProjectsManager() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(() => new Set());
  const [catModal, setCatModal] = useState(null);   // { name }
  const [subModal, setSubModal] = useState(null);   // { catId, name }
  const [confirm, setConfirm] = useState(null);      // { kind, catId, subId?, label }
  const [toast, showToast] = useSavedToast();

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setCats(data);
        if (data.length) setOpen(new Set([data[0].id]));
      })
      .catch((e) => showToast("Could not load projects: " + e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fail = (e) => showToast("Something went wrong: " + e.message);

  const toggle = (id) =>
    setOpen((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  /* ── Category ── */
  const addCat = async (e) => {
    e.preventDefault();
    const name = catModal.name.trim();
    if (!name) return;
    setCatModal(null);
    try {
      const cat = await createCategory(name, cats.length + 1);
      setCats((c) => [...c, cat]);
      setOpen((s) => new Set(s).add(cat.id));
      showToast("Category added");
    } catch (e) { fail(e); }
  };

  const renameCat = (id, name) => {
    setCats((c) => c.map((x) => (x.id === id ? { ...x, name } : x)));
    renameCategory(id, name).catch(fail);
  };

  /* ── Sub-category ── */
  const addSub = async (e) => {
    e.preventDefault();
    const name = subModal.name.trim();
    if (!name) return;
    const catId = subModal.catId;
    setSubModal(null);
    try {
      const cat = cats.find((x) => x.id === catId);
      const sub = await createSubcategory(catId, name, (cat?.subs.length || 0) + 1);
      setCats((c) => c.map((x) => (x.id === catId ? { ...x, subs: [...x.subs, sub] } : x)));
      showToast("Sub-category added");
    } catch (e) { fail(e); }
  };

  const renameSub = (catId, subId, name) => {
    setCats((c) => c.map((x) => x.id !== catId ? x : {
      ...x, subs: x.subs.map((s) => (s.id === subId ? { ...s, name } : s)),
    }));
    renameSubcategory(subId, name).catch(fail);
  };

  /* ── Images ── */
  const addImage = async (catId, subId, url) => {
    try {
      const cat = cats.find((x) => x.id === catId);
      const sub = cat?.subs.find((s) => s.id === subId);
      const img = await addProjectImage(subId, url, "", (sub?.images.length || 0) + 1);
      setCats((c) => c.map((x) => x.id !== catId ? x : {
        ...x, subs: x.subs.map((s) => s.id !== subId ? s : { ...s, images: [...s.images, img] }),
      }));
    } catch (e) { fail(e); }
  };

  const removeImage = (catId, subId, imgId) => {
    setCats((c) => c.map((x) => x.id !== catId ? x : {
      ...x, subs: x.subs.map((s) => s.id !== subId ? s : { ...s, images: s.images.filter((i) => i.id !== imgId) }),
    }));
    deleteProjectImage(imgId).catch(fail);
  };

  /* ── Delete confirm ── */
  const runConfirm = async () => {
    const c = confirm;
    setConfirm(null);
    try {
      if (c.kind === "cat") {
        setCats((list) => list.filter((x) => x.id !== c.catId));
        await deleteCategory(c.catId);
        showToast("Category removed");
      } else {
        setCats((list) => list.map((x) => x.id !== c.catId ? x : { ...x, subs: x.subs.filter((s) => s.id !== c.subId) }));
        await deleteSubcategory(c.subId);
        showToast("Sub-category removed");
      }
    } catch (e) { fail(e); }
  };

  const totalPhotos = (cat) => cat.subs.reduce((a, s) => a + s.images.length, 0);

  return (
    <div>
      {toast}
      <ModeBanner />
      <PageHeader
        title="Projects & Photos"
        subtitle="Organise your work into categories (e.g. Welding) and sub-categories (e.g. Doors & Gates), then upload photos into each one. Click a name to rename it."
        action={
          <Btn onClick={() => setCatModal({ name: "" })}>
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Add category
          </Btn>
        }
      />

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-line bg-line/30" />
          ))}
        </div>
      ) : cats.length === 0 ? (
        <EmptyState
          title="No categories yet"
          hint="Create your first project category to start adding photos of your work."
          action={<Btn onClick={() => setCatModal({ name: "" })}><Icon path={ICONS.plus} className="h-4 w-4" />Add category</Btn>}
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
                          <AddPhotoTile onAddUrl={(url) => addImage(cat.id, sub.id, url)} />
                        </div>
                      </div>
                    ))}

                    <Btn variant="ghost" size="sm" onClick={() => setSubModal({ catId: cat.id, name: "" })}>
                      <Icon path={ICONS.plus} className="h-4 w-4" /> Add sub-category
                    </Btn>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add category modal */}
      <Modal
        open={!!catModal}
        title="Add a category"
        onClose={() => setCatModal(null)}
        size="sm"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setCatModal(null)}>Cancel</Btn>
            <Btn type="submit" form="cat-form">Add category</Btn>
          </>
        }
      >
        {catModal && (
          <form id="cat-form" onSubmit={addCat}>
            <Field label="Category name" hint="e.g. Welding Services, Painting Services">
              <TextInput value={catModal.name} onChange={(e) => setCatModal((m) => ({ ...m, name: e.target.value }))} autoFocus required />
            </Field>
          </form>
        )}
      </Modal>

      {/* Add sub-category modal */}
      <Modal
        open={!!subModal}
        title="Add a sub-category"
        onClose={() => setSubModal(null)}
        size="sm"
        footer={
          <>
            <Btn variant="ghost" onClick={() => setSubModal(null)}>Cancel</Btn>
            <Btn type="submit" form="sub-form">Add sub-category</Btn>
          </>
        }
      >
        {subModal && (
          <form id="sub-form" onSubmit={addSub}>
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
