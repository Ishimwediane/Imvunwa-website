"use client";

import { useEffect, useState } from "react";
import {
  ModeBanner, PageHeader, Btn, Icon, ICONS, ConfirmDialog,
  EditableText, EditableImage, PreviewBlock, useSavedToast,
} from "../../../components/admin/ui";
import {
  fetchTeam, createTeamMember, updateTeamMember, deleteTeamMember, uploadImage,
} from "../../../lib/adminApi";

const initialsOf = (name) =>
  (name || "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("") || "?";

export default function TeamManager() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toast, showToast] = useSavedToast();

  useEffect(() => {
    fetchTeam()
      .then(setTeam)
      .catch((e) => showToast("Could not load team: " + e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (id, patch) => {
    setTeam((t) => t.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    updateTeamMember(id, patch).catch((e) => showToast("Could not save: " + e.message));
  };

  const addMember = async () => {
    try {
      const row = await createTeamMember({ name: "", role: "", image_url: "", sort_order: team.length + 1 });
      setTeam((t) => [...t, row]);
      showToast("New team member added");
    } catch (e) {
      showToast("Could not add: " + e.message);
    }
  };

  const confirmDelete = async () => {
    const id = deleting.id;
    setTeam((t) => t.filter((m) => m.id !== id));
    setDeleting(null);
    try {
      await deleteTeamMember(id);
      showToast("Team member removed");
    } catch (e) {
      showToast("Could not remove: " + e.message);
    }
  };

  return (
    <div>
      {toast}
      <ModeBanner />
      <PageHeader
        title="Team"
        subtitle="This is the “Meet the Team” section on your About page. Click a photo to change it, and click a name or role to edit it. Members without a photo show their initials."
        action={
          <Btn onClick={addMember}>
            <Icon path={ICONS.plus} className="h-4 w-4" />
            Add member
          </Btn>
        }
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[230px] animate-pulse rounded-xl border border-line bg-line/30" />
          ))}
        </div>
      ) : (
        <PreviewBlock where="About page — Meet the Team">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.id} className="group/card relative flex flex-col items-center rounded-xl border border-line bg-white p-6 text-center shadow-sm">
                <button
                  onClick={() => setDeleting(m)}
                  className="absolute right-2 top-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover/card:opacity-100"
                  aria-label="Remove member"
                >
                  <Icon path={ICONS.trash} className="h-4 w-4" />
                </button>

                <EditableImage
                  value={m.image_url}
                  onChange={(url) => update(m.id, { image_url: url })}
                  uploader={uploadImage}
                  rounded="rounded-full"
                  className="h-24 w-24 ring-2 ring-signal/30"
                  fallback={
                    <div className="grid h-full w-full place-items-center bg-gradient-to-br from-signal to-signal-hover text-[24px] font-black text-ink">
                      {initialsOf(m.name)}
                    </div>
                  }
                />

                <EditableText
                  as="h3"
                  value={m.name}
                  onChange={(v) => update(m.id, { name: v })}
                  placeholder="Full name"
                  className="mt-4 text-[14.5px] font-extrabold leading-snug text-ink"
                />
                <div className="mx-auto mt-3 h-[3px] w-8 rounded-full bg-signal" />
                <EditableText
                  as="p"
                  multiline
                  value={m.role}
                  onChange={(v) => update(m.id, { role: v })}
                  placeholder="Role / job title"
                  className="mt-3 block text-[12px] font-semibold leading-[1.5] text-muted"
                />
              </div>
            ))}

            <button
              onClick={addMember}
              className="flex min-h-[230px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line text-muted transition-colors hover:border-signal hover:text-signal-dark"
            >
              <Icon path={ICONS.plus} className="h-8 w-8" />
              <span className="text-[13px] font-bold">Add a member</span>
            </button>
          </div>
        </PreviewBlock>
      )}

      <ConfirmDialog
        open={!!deleting}
        title="Remove this team member?"
        message={`"${deleting?.name || "This member"}" will be removed from your About page.`}
        confirmLabel="Remove member"
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </div>
  );
}
