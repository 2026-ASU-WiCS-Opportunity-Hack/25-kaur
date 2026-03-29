/**
 * Supabase client-safe key: legacy `anon` JWT or newer `sb_publishable_*` key.
 * See https://supabase.com/docs/guides/api/api-keys
 */
export function getSupabasePublicKey(): string | undefined {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim()
  return key || undefined
}

export function getSupabaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  return url || undefined
}
