import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getSettings, updateSettings } from "@/lib/data"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const data = await getSettings()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Get settings error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const body = await request.json()
    const data = await updateSettings(body)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
