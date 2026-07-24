import { createClient } from "./supabase/server";
import {
  SITE_CONTENT_DEFAULT,
  SERVICES_DEFAULT,
  TEAM_DEFAULT,
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

/** Site text as a plain object keyed like the defaults (missing keys fall back). */
export async function getSiteContent() {
  const supabase = createClient();
  if (!supabase) return SITE_CONTENT_DEFAULT;

  try {
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error || !data?.length) return SITE_CONTENT_DEFAULT;

    const fromDb = Object.fromEntries(data.map((r) => [r.key, r.value ?? ""]));
    // Merge so any key not yet in the DB uses the default.
    return { ...SITE_CONTENT_DEFAULT, ...fromDb };
  } catch {
    return SITE_CONTENT_DEFAULT;
  }
}

export async function getServices() {
  const supabase = createClient();
  if (!supabase) return SERVICES_DEFAULT;

  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, name, description, image_url")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return SERVICES_DEFAULT;
    return data;
  } catch {
    return SERVICES_DEFAULT;
  }
}

export async function getTeam() {
  const supabase = createClient();
  if (!supabase) return TEAM_DEFAULT;

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("id, name, role, image_url")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return TEAM_DEFAULT;
    return data;
  } catch {
    return TEAM_DEFAULT;
  }
}

/**
 * Full project tree: categories → subcategories → images.
 * Returns the normalized shape used by the projects UI.
 */
export async function getProjects() {
  const supabase = createClient();
  if (!supabase) return PROJECTS_DEFAULT;

  try {
    const { data, error } = await supabase
      .from("project_categories")
      .select(
        `id, name, slug, sort_order,
         project_subcategories (
           id, name, sort_order,
           project_images ( id, image_url, caption, sort_order )
         )`
      )
      .order("sort_order", { ascending: true });

    if (error || !data?.length) return PROJECTS_DEFAULT;

    return data.map((cat) => ({
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
  } catch {
    return PROJECTS_DEFAULT;
  }
}

/** Convenience: one project category by its slug (for service subpages). */
export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((c) => c.slug === slug) || null;
}
