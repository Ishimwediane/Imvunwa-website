import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Server-side Supabase client (used by Server Components / Route Handlers).
 * Returns null when Supabase isn't configured so public pages can fall
 * back to default content without crashing.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;

  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // In Server Components cookies are read-only; the middleware
        // refreshes the session, so we can safely ignore write errors here.
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          /* no-op */
        }
      },
    },
  });
}
