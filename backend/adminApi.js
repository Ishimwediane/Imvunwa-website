"use client";

/**
 * Admin data operations used by the dashboard (browser-side).
 *
 * Every function is "preview-aware": if Supabase isn't configured yet, it
 * behaves locally (no network) so the dashboard still works as a preview.
 * Once the owner adds their Supabase keys, the same calls persist for real.
 */
import { createClient } from "./supabase/client";
import { isSupabaseConfigured, SUPABASE_BUCKET } from "./supabase/config";
import { normalizeProjectTree, PROJECT_TREE_SELECT } from "./normalize";
import {
  SITE_CONTENT_DEFAULT,
  SERVICES_DEFAULT,
  TEAM_DEFAULT,
  TESTIMONIALS_DEFAULT,
  PROJECTS_DEFAULT,
} from "./defaults";

export const configured = isSupabaseConfigured;

/* ── Helpers ─────────────────────────────────────────────────── */
const clone = (v) => JSON.parse(JSON.stringify(v));
const tempId = () => `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/** Await a Supabase query, throwing a plain Error on failure. */
async function run(query) {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

/**
 * Run `live(db)` when Supabase is configured; otherwise return the preview
 * fallback so the dashboard keeps working offline. `fallback` may be a value
 * or a function that produces one (use a function for fresh clones / temp ids).
 */
async function withDb(fallback, live) {
  const supabase = createClient();
  if (!supabase) return typeof fallback === "function" ? fallback() : fallback;
  return live(supabase);
}

/**
 * Ask the public site to rebuild its database-backed pages after a change,
 * so the backend is read only when content actually updates (not on a timer).
 * Best-effort, and only when Supabase is live.
 */
async function triggerRevalidate() {
  if (!isSupabaseConfigured) return;
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    /* best-effort: pages still refresh on the next deploy/build */
  }
}

/**
 * CRUD for a standard table: `sort_order`-ordered list plus id-keyed
 * create / update / delete. Each is preview-aware, and every write refreshes
 * the public pages on success.
 */
function crudTable(table, columns, previewDefault) {
  return {
    list: () =>
      withDb(
        () => clone(previewDefault),
        async (db) =>
          (await run(db.from(table).select(columns).order("sort_order", { ascending: true }))) || []
      ),
    create: (row) =>
      withDb(
        () => ({ id: tempId(), ...row }),
        async (db) => {
          const created = await run(db.from(table).insert(row).select().single());
          await triggerRevalidate();
          return created;
        }
      ),
    update: (id, patch) =>
      withDb(undefined, async (db) => {
        await run(db.from(table).update(patch).eq("id", id));
        await triggerRevalidate();
      }),
    remove: (id) =>
      withDb(undefined, async (db) => {
        await run(db.from(table).delete().eq("id", id));
        await triggerRevalidate();
      }),
  };
}

/* ── Auth ────────────────────────────────────────────────────── */
export async function signIn(email, password) {
  const supabase = createClient();
  if (!supabase) return { ok: true, preview: true };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return error ? { ok: false, error: error.message } : { ok: true };
}

export async function signOut() {
  const supabase = createClient();
  if (supabase) await supabase.auth.signOut();
}

/* ── Image upload ────────────────────────────────────────────── */
export async function uploadImage(file) {
  const supabase = createClient();
  if (!supabase) return URL.createObjectURL(file); // preview only

  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  await run(
    supabase.storage.from(SUPABASE_BUCKET).upload(path, file, { cacheControl: "3600", upsert: false })
  );
  return supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path).data.publicUrl;
}

/* ── Site content ────────────────────────────────────────────── */
export function fetchSiteContent() {
  return withDb(
    () => ({ ...SITE_CONTENT_DEFAULT }),
    async (db) => {
      const rows = await run(db.from("site_content").select("key, value"));
      const fromDb = Object.fromEntries((rows || []).map((r) => [r.key, r.value ?? ""]));
      return { ...SITE_CONTENT_DEFAULT, ...fromDb };
    }
  );
}

export function saveSiteContent(obj) {
  return withDb(undefined, async (db) => {
    const rows = Object.entries(obj).map(([key, value]) => ({ key, value }));
    await run(db.from("site_content").upsert(rows, { onConflict: "key" }));
    await triggerRevalidate();
  });
}

/* ── Services / Team / Testimonials (standard CRUD) ──────────── */
const services = crudTable("services", "id, name, description, image_url, sort_order", SERVICES_DEFAULT);
export const fetchServices = services.list;
export const createService = services.create;
export const updateService = services.update;
export const deleteService = services.remove;

const team = crudTable("team_members", "id, name, role, image_url, sort_order", TEAM_DEFAULT);
export const fetchTeam = team.list;
export const createTeamMember = team.create;
export const updateTeamMember = team.update;
export const deleteTeamMember = team.remove;

const testimonials = crudTable(
  "testimonials",
  "id, author, role, badge, quote, image_url, sort_order",
  TESTIMONIALS_DEFAULT
);
export const fetchTestimonials = testimonials.list;
export const createTestimonial = testimonials.create;
export const updateTestimonial = testimonials.update;
export const deleteTestimonial = testimonials.remove;

/* ── Projects (categories / subcategories / images) ──────────── */
export function fetchProjects() {
  return withDb(
    () => clone(PROJECTS_DEFAULT),
    async (db) => {
      const rows = await run(
        db.from("project_categories").select(PROJECT_TREE_SELECT).order("sort_order", { ascending: true })
      );
      return normalizeProjectTree(rows || []);
    }
  );
}

export function createCategory(name, sort_order = 0) {
  return withDb(
    () => ({ id: tempId(), name, slug: null, subs: [] }),
    async (db) => {
      const cat = await run(
        db.from("project_categories").insert({ name, sort_order }).select().single()
      );
      return { id: cat.id, name: cat.name, slug: cat.slug, subs: [] };
    }
  );
}

export const renameCategory = (id, name) =>
  withDb(undefined, async (db) => {
    await run(db.from("project_categories").update({ name }).eq("id", id));
  });

export const deleteCategory = (id) =>
  withDb(undefined, async (db) => {
    await run(db.from("project_categories").delete().eq("id", id));
  });

export function createSubcategory(categoryId, name, sort_order = 0) {
  return withDb(
    () => ({ id: tempId(), name, images: [] }),
    async (db) => {
      const sub = await run(
        db
          .from("project_subcategories")
          .insert({ category_id: categoryId, name, sort_order })
          .select()
          .single()
      );
      return { id: sub.id, name: sub.name, images: [] };
    }
  );
}

export const renameSubcategory = (id, name) =>
  withDb(undefined, async (db) => {
    await run(db.from("project_subcategories").update({ name }).eq("id", id));
  });

export const deleteSubcategory = (id) =>
  withDb(undefined, async (db) => {
    await run(db.from("project_subcategories").delete().eq("id", id));
  });

export function addProjectImage(subcategoryId, src, caption = "", sort_order = 0) {
  return withDb(
    () => ({ id: tempId(), src, caption }),
    async (db) => {
      const img = await run(
        db
          .from("project_images")
          .insert({ subcategory_id: subcategoryId, image_url: src, caption, sort_order })
          .select()
          .single()
      );
      return { id: img.id, src: img.image_url, caption: img.caption || "" };
    }
  );
}

export const deleteProjectImage = (id) =>
  withDb(undefined, async (db) => {
    await run(db.from("project_images").delete().eq("id", id));
  });
