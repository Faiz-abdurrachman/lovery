import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { updateSubmissionStatus, createInvoiceForSubmission, getSubmission } from "@/lib/data"
import { NEXT_ALLOWED_STATUSES } from "@/features/submission/constants/submission.constant"
import type { SubmissionStatus } from "@prisma/client"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status: newStatus, adminNote } = body

    if (!newStatus) {
      return NextResponse.json({ success: false, message: "Status tidak valid" }, { status: 400 })
    }

    const sub = await getSubmission(id)
    if (!sub) {
      return NextResponse.json({ success: false, message: "Pengajuan tidak ditemukan" }, { status: 404 })
    }

    const allowed = NEXT_ALLOWED_STATUSES[sub.status as SubmissionStatus]
    if (!allowed.includes(newStatus as SubmissionStatus)) {
      return NextResponse.json({ success: false, message: "Transisi status tidak diizinkan" }, { status: 400 })
    }

    await updateSubmissionStatus(id, newStatus, adminNote, session.user.id as string)

    let invoice = null
    if (newStatus === "WAITING_DP") {
      invoice = await createInvoiceForSubmission(id, session.user.id as string)
    }

    return NextResponse.json({ success: true, data: { submission: { id, status: newStatus }, invoice } })
  } catch (error) {
    console.error("Update status error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
