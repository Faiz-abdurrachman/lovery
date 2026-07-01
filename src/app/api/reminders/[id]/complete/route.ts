import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { completeReminder } from "@/lib/data"

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { id } = await params
    const data = await completeReminder(id)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Complete reminder error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
