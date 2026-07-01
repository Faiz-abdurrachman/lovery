import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

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

    const updated = await prisma.reminder.update({
      where: { id },
      data: { status: "COMPLETED" },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Pengingat tidak ditemukan" },
        { status: 404 }
      )
    }
    console.error("Complete reminder error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
