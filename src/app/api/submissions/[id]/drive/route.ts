import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const TERMINAL_STATUSES = ["CANCELLED", "REJECTED", "COMPLETED"] as const

export async function PATCH(
  request: NextRequest,
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
    const body = await request.json()
    const { driveLink, send } = body

    if (!driveLink || typeof driveLink !== "string") {
      return NextResponse.json(
        { success: false, message: "Link Google Drive wajib diisi" },
        { status: 400 }
      )
    }

    if (!driveLink.startsWith("https://")) {
      return NextResponse.json(
        { success: false, message: "Link harus berupa URL valid (https://)" },
        { status: 400 }
      )
    }

    const submission = await prisma.submission.findUnique({
      where: { id },
      include: {
        client: { select: { name: true, phone: true } },
      },
    })

    if (!submission) {
      return NextResponse.json(
        { success: false, message: "Pengajuan tidak ditemukan" },
        { status: 404 }
      )
    }

    if (TERMINAL_STATUSES.includes(submission.status as typeof TERMINAL_STATUSES[number])) {
      return NextResponse.json(
        {
          success: false,
          message: "Tidak dapat mengubah pengajuan yang sudah selesai atau dibatalkan",
        },
        { status: 400 }
      )
    }

    if (send && submission.status !== "EDITING") {
      return NextResponse.json(
        {
          success: false,
          message: "Hasil hanya bisa dikirim saat status Proses Editing",
        },
        { status: 400 }
      )
    }

    const updateData = send
      ? { googleDriveLink: driveLink, status: "DELIVERED" as const }
      : { googleDriveLink: driveLink }

    await prisma.submission.update({
      where: { id },
      data: updateData,
    })

    await prisma.timeline.create({
      data: {
        submissionId: id,
        activity: send ? "Hasil dikirim" : "Link Google Drive diperbarui",
        description: driveLink,
        performedById: session.user?.id as string,
      },
    })

    return NextResponse.json({
      success: true,
      data: { driveLink },
      clientName: submission.client.name,
      clientPhone: submission.client.phone,
    })
  } catch (error) {
    console.error("Drive link error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
