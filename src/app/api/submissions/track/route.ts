import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const number = searchParams.get("number")
    const phone = searchParams.get("phone")

    if (!number || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor pengajuan dan nomor WhatsApp wajib diisi",
        },
        { status: 400 }
      )
    }

    const submission = await prisma.submission.findUnique({
      where: { submissionNumber: number },
      include: {
        client: true,
        package: true,
        submissionAddOns: {
          include: { addOn: true },
        },
        timelines: {
          orderBy: { createdAt: "desc" },
        },
        invoices: {
          include: { payments: true },
          orderBy: { createdAt: "desc" },
          where: { status: "ACTIVE" },
        },
      },
    })

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          message: "Pengajuan tidak ditemukan",
        },
        { status: 404 }
      )
    }

    if (submission.client.phone !== phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Nomor WhatsApp tidak sesuai dengan data pengajuan",
        },
        { status: 403 }
      )
    }

    const { client, ...submissionData } = submission

    return NextResponse.json({
      success: true,
      data: {
        ...submissionData,
        clientName: client.name,
      },
    })
  } catch (error) {
    console.error("Track submission error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
