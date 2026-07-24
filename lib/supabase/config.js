/**
 * Central place to read Supabase env vars and know whether Supabase
 * has been configured yet. Before the owner adds their keys, the app
 * gracefully falls back to built-in default content (see lib/data.js).
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "images";

/** True once both required Supabase keys are present. */
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
