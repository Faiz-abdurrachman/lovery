import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!serviceRoleKey) {
  console.warn(
    "SUPABASE_SERVICE_ROLE_KEY tidak di-set. Server client akan fallback ke anon key. " +
    "Set SUPABASE_SERVICE_ROLE_KEY di .env atau Vercel dashboard untuk operasi admin."
  )
}

/**
 * Supabase client untuk SERVER-SIDE (API routes, server components, auth).
 * Menggunakan service role key agar bisa bypass RLS untuk operasi admin.
 * Jangan pernah import ini di client component — akan expose service role key!
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
