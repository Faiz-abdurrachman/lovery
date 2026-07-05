import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-server"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { id } = await params
    const { data, error } = await supabaseAdmin.from("clients").select("*, submissions:submissions(*, package:packages(name,category), invoices(grandTotal,status))").eq("id", id).single()
    if (error || !data) return NextResponse.json({ success: false, message: "Klien tidak ditemukan" }, { status: 404 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Get client error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
