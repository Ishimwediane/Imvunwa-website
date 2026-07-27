/**
 * Shared, framework-agnostic helpers for the projects data tree.
 * Pure functions only (no client/server imports) so both the public
 * reader (data.js) and the admin API (adminApi.js) can use them.
 */

/** Nested select for a category → subcategories → images tree. */
export const PROJECT_TREE_SELECT = `id, name, slug, sort_order,
  project_subcategories ( id, name, sort_order,
    project_images ( id, image_url, caption, sort_order ) )`;

const bySortOrder = (a, b) => a.sort_order - b.sort_order;

/** Reshape + sort the raw project_categories query into the UI tree. */
export function normalizeProjectTree(categories = []) {
  return categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    subs: (cat.project_subcategories || [])
      .slice()
      .sort(bySortOrder)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        images: (sub.project_images || [])
          .slice()
          .sort(bySortOrder)
          .map((img) => ({ id: img.id, src: img.image_url, caption: img.caption || "" })),
      })),
  }));
}
