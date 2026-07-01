import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "startDate dan endDate wajib diisi" },
        { status: 400 }
      )
    }

    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        paymentType: { in: ["DP", "PELUNASAN"] },
      },
      include: {
        invoice: {
          select: {
            invoiceNumber: true,
            submission: {
              select: {
                submissionNumber: true,
                client: { select: { name: true } },
                package: { select: { name: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 500,
    })

    return NextResponse.json({
      success: true,
      data: { payments },
    })
  } catch (error) {
    console.error("Revenue error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
