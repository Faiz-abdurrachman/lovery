import { NextResponse } from "next/server"

const SUPABASE_URL = "https://pimdpquknsfhtlebndnv.supabase.co"
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpbWRwcXVrbnNmaHRsZWJuZG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MDU1MzEsImV4cCI6MjA5ODQ4MTUzMX0.PPx1aNCMv_z8Z3Ili39Jb3FqcP1wpDdnAoCQI5TsXtA"

export async function GET() {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/packages?select=id,name,price&limit=5`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    )
    const data = await res.json()
    return NextResponse.json({ success: true, driver: "supabase-js", data })
  } catch (e: unknown) {
    return NextResponse.json({ success: false, error: (e as Error).message })
  }
}
