import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { listReminders } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const data = await listReminders(searchParams.get("status") || "PENDING")
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("List reminders error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
