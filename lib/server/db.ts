import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Service role hanya dipakai di server route handler. Jangan import dari komponen client.
let cached: SupabaseClient | null = null

export function adminDb(): SupabaseClient {
  if (typeof window !== 'undefined') throw new Error('adminDb hanya untuk server')
  if (cached) return cached
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase env belum lengkap')
  cached = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
  return cached
}
