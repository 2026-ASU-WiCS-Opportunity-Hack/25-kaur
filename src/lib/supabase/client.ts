import { createBrowserClient } from '@supabase/ssr'
import { getSupabasePublicKey, getSupabaseUrl } from './public-env'

export function createClient() {
  const supabaseUrl = getSupabaseUrl() || 'https://mock.supabase.co'
  const supabaseKey = getSupabasePublicKey() || 'mock-key'

  return createBrowserClient(supabaseUrl, supabaseKey)
}
