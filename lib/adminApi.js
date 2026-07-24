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
import {
  SITE_CONTENT_DEFAULT,
  SERVICES_DEFAULT,
  TEAM_DEFAULT,
  PROJECTS_DEFAULT,
} from "./defaults";

export const configured = isSupabaseConfigured;

const clone = (v) => JSON.parse(JSON.stringify(v));
const tempId = () => `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

/* ── Auth ────────────────────────────────────────────────────── */
export async function signIn(email, password) {
  const supabase = createClient();
  if (!supabase) return { ok: true, preview: true };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
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
  const { error } = await supabase.storage.from(SUPABASE_BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/* ── Site content ────────────────────────────────────────────── */
export async function fetchSiteContent() {
  const supabase = createClient();
  if (!supabase) return { ...SITE_CONTENT_DEFAULT };
  const { data, error } = await supabase.from("site_content").select("key, value");
  if (error) throw new Error(error.message);
  const fromDb = Object.fromEntries((data || []).map((r) => [r.key, r.value ?? ""]));
  return { ...SITE_CONTENT_DEFAULT, ...fromDb };
}

export async function saveSiteContent(obj) {
  const supabase = createClient();
  if (!supabase) return;
  const rows = Object.entries(obj).map(([key, value]) => ({ key, value }));
  const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

/* ── Services ────────────────────────────────────────────────── */
export async function fetchServices() {
  const supabase = createClient();
  if (!supabase) return clone(SERVICES_DEFAULT);
  const { data, error } = await supabase
    .from("services")
    .select("id, name, description, image_url, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createService(row) {
  const supabase = createClient();
  if (!supabase) return { id: tempId(), ...row };
  const { data, error } = await supabase.from("services").insert(row).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateService(id, patch) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("services").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteService(id) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/* ── Team ────────────────────────────────────────────────────── */
export async function fetchTeam() {
  const supabase = createClient();
  if (!supabase) return clone(TEAM_DEFAULT);
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, role, image_url, sort_order")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export async function createTeamMember(row) {
  const supabase = createClient();
  if (!supabase) return { id: tempId(), ...row };
  const { data, error } = await supabase.from("team_members").insert(row).select().single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateTeamMember(id, patch) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("team_members").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteTeamMember(id) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/* ── Projects (categories / subcategories / images) ──────────── */
export async function fetchProjects() {
  const supabase = createClient();
  if (!supabase) return clone(PROJECTS_DEFAULT);
  const { data, error } = await supabase
    .from("project_categories")
    .select(
      `id, name, slug, sort_order,
       project_subcategories ( id, name, sort_order,
         project_images ( id, image_url, caption, sort_order ) )`
    )
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data || []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    subs: (cat.project_subcategories || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        images: (sub.project_images || [])
          .slice()
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((img) => ({ id: img.id, src: img.image_url, caption: img.caption || "" })),
      })),
  }));
}

export async function createCategory(name, sort_order = 0) {
  const supabase = createClient();
  if (!supabase) return { id: tempId(), name, slug: null, subs: [] };
  const { data, error } = await supabase
    .from("project_categories")
    .insert({ name, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, name: data.name, slug: data.slug, subs: [] };
}

export async function renameCategory(id, name) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("project_categories").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteCategory(id) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("project_categories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function createSubcategory(categoryId, name, sort_order = 0) {
  const supabase = createClient();
  if (!supabase) return { id: tempId(), name, images: [] };
  const { data, error } = await supabase
    .from("project_subcategories")
    .insert({ category_id: categoryId, name, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, name: data.name, images: [] };
}

export async function renameSubcategory(id, name) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("project_subcategories").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteSubcategory(id) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("project_subcategories").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function addProjectImage(subcategoryId, src, caption = "", sort_order = 0) {
  const supabase = createClient();
  if (!supabase) return { id: tempId(), src, caption };
  const { data, error } = await supabase
    .from("project_images")
    .insert({ subcategory_id: subcategoryId, image_url: src, caption, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return { id: data.id, src: data.image_url, caption: data.caption || "" };
}

export async function deleteProjectImage(id) {
  const supabase = createClient();
  if (!supabase) return;
  const { error } = await supabase.from("project_images").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
