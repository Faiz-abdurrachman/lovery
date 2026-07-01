import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { NEXT_ALLOWED_STATUSES } from "@/features/submission/constants/submission.constant"
import type { SubmissionStatus, Prisma } from "@prisma/client"

async function generateInvNumber(tx: Prisma.TransactionClient): Promise<string> {
  const year = new Date().getFullYear().toString().slice(-2)
  const count = await tx.invoice.count({
    where: { createdAt: { gte: new Date(`${new Date().getFullYear()}-01-01`) } },
  })
  const seq = String(count + 1).padStart(4, "0")
  return `INV${seq}${year}`
}

const STATUS_ACTIVITIES: Record<string, string> = {
  WAITING_DP: "Pengajuan diterima",
  REJECTED: "Pengajuan ditolak",
  RESCHEDULE: "Penjadwalan ulang diminta",
  CANCELLED: "Pengajuan dibatalkan",
  ON_SESSION: "Sesi dimulai",
  EDITING: "Sesi selesai - Masuk editing",
  DELIVERED: "Hasil dikirim",
  COMPLETED: "Pengajuan selesai",
}

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
    const { status: newStatus, adminNote } = body

    if (
      !newStatus ||
      !Object.values(NEXT_ALLOWED_STATUSES).flat().includes(newStatus)
    ) {
      return NextResponse.json(
        { success: false, message: "Status tidak valid" },
        { status: 400 }
      )
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const submission = await tx.submission.findUnique({
          where: { id },
          include: {
            package: true,
            submissionAddOns: { include: { addOn: true } },
          },
        })

        if (!submission) throw new Error("NOT_FOUND")

        const allowed =
          NEXT_ALLOWED_STATUSES[submission.status as SubmissionStatus]
        if (!allowed.includes(newStatus as SubmissionStatus)) {
          throw new Error("INVALID_TRANSITION")
        }

        await tx.submission.update({
          where: { id },
          data: {
            status: newStatus as SubmissionStatus,
            adminNote: adminNote || undefined,
          },
        })

        await tx.timeline.create({
          data: {
            submissionId: id,
            activity:
              STATUS_ACTIVITIES[newStatus] || `Status: ${newStatus}`,
            description: adminNote || undefined,
            performedById: session.user?.id as string,
          },
        })

        let invoice = null

        if (newStatus === "WAITING_DP") {
          const subtotal = submission.package.price
          const addonTotal = submission.submissionAddOns.reduce(
            (sum, s) => sum + s.priceSnapshot,
            0
          )
          const grandTotal = subtotal + addonTotal
          const hasAddOns = submission.submissionAddOns.length > 0
          const category = submission.package.category
          const dpAmount =
            category === "Wedding"
              ? Math.round(grandTotal * 0.4)
              : hasAddOns
                ? 100000
                : 50000

          await tx.invoice.updateMany({
            where: { submissionId: id, status: "ACTIVE" },
            data: { status: "REVISED" },
          })

          const highestRev = await tx.invoice.findFirst({
            where: { submissionId: id },
            orderBy: { revision: "desc" },
            select: { revision: true },
          })
          const revision = (highestRev?.revision || 0) + 1

          const invNumber = await generateInvNumber(tx)

          invoice = await tx.invoice.create({
            data: {
              invoiceNumber: invNumber,
              submissionId: id,
              subtotal,
              addonTotal,
              grandTotal,
              dpAmount,
              remainingAmount: grandTotal - dpAmount,
              status: "ACTIVE",
              revision,
              issuedAt: new Date(),
            },
          })

          await tx.timeline.create({
            data: {
              submissionId: id,
              activity: "Invoice dibuat",
              description: `Invoice ${invNumber} (Revisi ${revision})`,
              performedById: session.user?.id as string,
            },
          })
        }

        return { submission: { id, status: newStatus }, invoice }
      },
      { isolationLevel: "Serializable" }
    )

    if (newStatus === "WAITING_DP") {
      try {
        const sub = await prisma.submission.findUnique({
          where: { id },
          select: { eventName: true, client: { select: { name: true } } },
        })
        if (sub) {
          await prisma.reminder.create({
            data: {
              submissionId: id,
              type: "PAYMENT",
              title: `Verifikasi DP - ${sub.client.name}`,
            },
          })
        }
      } catch (e) {
        console.error("Failed to create payment reminder:", e)
      }
    }

    if (newStatus === "EDITING") {
      try {
        const sub = await prisma.submission.findUnique({
          where: { id },
          select: { eventName: true, client: { select: { name: true } } },
        })
        if (sub) {
          await prisma.reminder.create({
            data: {
              submissionId: id,
              type: "DELIVERY",
              title: `Kirim hasil - ${sub.client.name}`,
            },
          })
        }
      } catch (e) {
        console.error("Failed to create delivery reminder:", e)
      }
    }

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "NOT_FOUND" || error.message === "INVALID_TRANSITION")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.message === "NOT_FOUND"
              ? "Pengajuan tidak ditemukan"
              : "Transisi status tidak diizinkan",
        },
        { status: 400 }
      )
    }

    console.error("Update status error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
