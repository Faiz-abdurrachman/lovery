import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-server"

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { id } = await params

    const { data: payment } = await supabaseAdmin
      .from("payments")
      .select("verifiedAt")
      .eq("id", id)
      .single()

    if (!payment) {
      return NextResponse.json({ success: false, message: "Pembayaran tidak ditemukan" }, { status: 404 })
    }

    if (payment.verifiedAt) {
      return NextResponse.json({ success: false, message: "Pembayaran yang sudah diverifikasi tidak dapat dihapus" }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from("payments")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true, message: "Pembayaran berhasil dihapus" })
  } catch (error) {
    console.error("Delete payment error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
