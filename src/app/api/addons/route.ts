import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const addOns = await prisma.addOn.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ success: true, data: addOns })
  } catch (error) {
    console.error("Get addons error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    )
  }
}
