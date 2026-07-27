import { createPublicClient as createClient } from "./supabase/public";
import { normalizeProjectTree, PROJECT_TREE_SELECT } from "./normalize";
import {
  SITE_CONTENT_DEFAULT,
  SERVICES_DEFAULT,
  TEAM_DEFAULT,
  TESTIMONIALS_DEFAULT,
  PROJECTS_DEFAULT,
} from "./defaults";

/**
 * Server-side content readers for the PUBLIC website.
 *
 * Each reader tries Supabase and, on any problem (not configured, query
 * error, outage), falls back to the built-in defaults so the site never
 * breaks. Pages using these should set `export const revalidate = 60` so
 * results are cached and visitors don't hit the database on every request.
 */

/**
 * Run a public read and return its rows, or `null` when Supabase is
 * unavailable or the query errors — so callers can fall back to defaults.
 */
async function readRows(query) {
  const supabase = createClient();
  if (!supabase) return null;
  try {
    const { data, error } = await query(supabase);
    return error ? null : data;
  } catch {
    return null;
  }
}

/** Site text as a plain object keyed like the defaults (missing keys fall back). */
export async function getSiteContent() {
  const rows = await readRows((db) => db.from("site_content").select("key, value"));
  if (!rows?.length) return SITE_CONTENT_DEFAULT;
  const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
  return { ...SITE_CONTENT_DEFAULT, ...fromDb };
}

export async function getServices() {
  const rows = await readRows((db) =>
    db.from("services").select("id, name, description, image_url").order("sort_order", { ascending: true })
  );
  return rows?.length ? rows : SERVICES_DEFAULT;
}

export async function getTeam() {
  const rows = await readRows((db) =>
    db.from("team_members").select("id, name, role, image_url").order("sort_order", { ascending: true })
  );
  return rows?.length ? rows : TEAM_DEFAULT;
}

export async function getTestimonials() {
  const rows = await readRows((db) =>
    db
      .from("testimonials")
      .select("id, author, role, badge, quote, image_url")
      .order("sort_order", { ascending: true })
  );
  return rows?.length ? rows : TESTIMONIALS_DEFAULT;
}

/** Full project tree: categories → subcategories → images. */
export async function getProjects() {
  const rows = await readRows((db) =>
    db.from("project_categories").select(PROJECT_TREE_SELECT).order("sort_order", { ascending: true })
  );
  return rows?.length ? normalizeProjectTree(rows) : PROJECTS_DEFAULT;
}

/** Convenience: one project category by its slug (for service subpages). */
export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((c) => c.slug === slug) || null;
}
