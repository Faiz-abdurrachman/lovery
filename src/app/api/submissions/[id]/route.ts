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
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const { id } = await params

    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            name: true,
            phone: true,
            instagram: true,
            clientNumber: true,
          },
        },
        package: {
          select: {
            id: true,
            name: true,
            category: true,
            price: true,
          },
        },
        submissionAddOns: {
          include: {
            addOn: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
          },
        },
        timelines: {
          orderBy: { createdAt: "desc" },
        },
        invoices: {
          include: {
            payments: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!submission) {
      return NextResponse.json(
        { success: false, message: "Pengajuan tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: submission })
  } catch (error) {
    console.error("Get submission error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
