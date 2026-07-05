import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getInvoice } from "@/lib/data"
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
    const data = await getInvoice(id)
    if (!data) return NextResponse.json({ success: false, message: "Invoice tidak ditemukan" }, { status: 404 })
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Get invoice error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { id } = await params
    const body = await request.json()

    const { data: existing } = await supabaseAdmin.from("invoices").select("status").eq("id", id).single()
    if (!existing) return NextResponse.json({ success: false, message: "Invoice tidak ditemukan" }, { status: 404 })
    if (existing.status !== "ACTIVE") return NextResponse.json({ success: false, message: "Hanya invoice aktif yang dapat diedit" }, { status: 400 })

    // Whitelist field yang boleh diupdate
    const allowedFields = ["dpAmount", "remainingAmount", "subtotal", "addonTotal", "grandTotal", "issuedAt"]
    const sanitized: Record<string, unknown> = {}
    for (const key of allowedFields) {
      if (body[key] !== undefined) sanitized[key] = body[key]
    }

    const { data: updated, error } = await supabaseAdmin.from("invoices").update(sanitized).eq("id", id).select().single()
    if (error) throw error
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Edit invoice error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
