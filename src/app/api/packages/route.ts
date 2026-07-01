import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { category: "asc" },
    })
    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    console.error("Get packages error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    )
  }
}
