import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { id } = await params

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        submissions: {
          include: {
            package: { select: { name: true, category: true } },
            invoices: { select: { grandTotal: true, status: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!client) {
      return NextResponse.json({ success: false, message: "Klien tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: client })
  } catch (error) {
    console.error("Get client error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
