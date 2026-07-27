import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Cookieless, anonymous Supabase client for PUBLIC reads.
 *
 * Unlike server.js (which reads cookies for auth and therefore forces
 * dynamic rendering), this client touches no request state — so pages
 * that use it can be statically generated and cached with ISR
 * (`export const revalidate = N`) instead of hitting the DB every request.
 *
 * Returns null when Supabase isn't configured, so readers fall back to
 * built-in defaults.
 */
export function createPublicClient() {
  if (!isSupabaseConfigured) return null;
  return createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
