"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from "./config";

/**
 * Browser-side Supabase client (used inside the admin dashboard for
 * reading/writing content and uploading images). Returns null if
 * Supabase isn't configured yet, so callers can fall back to preview mode.
 */
export function createClient() {
  if (!isSupabaseConfigured) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
