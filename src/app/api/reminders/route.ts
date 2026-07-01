import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "PENDING"

    const reminders = await prisma.reminder.findMany({
      where: { status: status === "PENDING" ? "PENDING" : "COMPLETED" },
      include: {
        submission: {
          select: {
            id: true,
            submissionNumber: true,
            eventName: true,
            eventDate: true,
            client: { select: { name: true } },
          },
        },
      },
      orderBy: [{ type: "asc" }, { createdAt: "desc" }],
      take: 50,
    })

    return NextResponse.json({ success: true, data: reminders })
  } catch (error) {
    console.error("List reminders error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
