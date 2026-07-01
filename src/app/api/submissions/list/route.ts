import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { listSubmissions } from "@/lib/data"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const data = await listSubmissions({
      status: searchParams.get("status") || undefined,
      search: searchParams.get("search") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("List submissions error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
