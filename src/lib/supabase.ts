import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://pimdpquknsfhtlebndnv.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbWRwcXVrbnNmaHRsZWJuZG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MDU1MzEsImV4cCI6MjA5ODQ4MTUzMX0.PPx1aNCMv_z8Z3Ili39Jb3FqcP1wpDdnAoCQI5TsXtA"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
