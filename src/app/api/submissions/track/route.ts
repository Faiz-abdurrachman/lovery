import { NextRequest, NextResponse } from "next/server"
import { trackSubmission } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const number = searchParams.get("number")

    if (!number) {
      return NextResponse.json({ success: false, message: "Nomor pengajuan wajib diisi" }, { status: 400 })
    }

    const data = await trackSubmission(number)

    if (!data) {
      return NextResponse.json({ success: false, message: "Pengajuan tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: { ...data, clientName: data.client?.name } })
  } catch (error) {
    console.error("Track submission error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
