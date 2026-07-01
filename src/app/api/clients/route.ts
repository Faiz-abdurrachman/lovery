import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { listClients } from "@/lib/data"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const data = await listClients(searchParams.get("search") || undefined)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("List clients error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
