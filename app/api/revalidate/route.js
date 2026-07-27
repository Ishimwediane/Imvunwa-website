import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "../../../backend/supabase/server";

/**
 * On-demand cache refresh for the public site.
 *
 * The admin dashboard calls this (POST) after saving content. It rebuilds the
 * database-backed public pages ONCE, so the backend is read only when
 * something actually changes — not on a timer. Guarded by the Supabase auth
 * session so only a logged-in admin can trigger it.
 */
export async function POST() {
  const supabase = createClient();

  // When Supabase is configured, require a logged-in admin.
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
  }

  // Revalidate the whole site (every page shares the root layout, so this
  // refreshes the hero, footer, and all DB-backed content at once).
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: "all" });
}
