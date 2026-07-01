import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { createCalendarEvent } from "@/lib/google-calendar"
import type { SubmissionStatus } from "@prisma/client"
import { format } from "date-fns"

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

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        invoice: {
          include: {
            submission: {
              select: {
                id: true,
                status: true,
                eventName: true,
                eventDate: true,
                eventTime: true,
                location: true,
                specialRequest: true,
                submissionNumber: true,
                client: { select: { name: true, phone: true } },
                package: { select: { name: true } },
                submissionAddOns: {
                  include: {
                    addOn: { select: { name: true } },
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!payment) {
      return NextResponse.json(
        { success: false, message: "Pembayaran tidak ditemukan" },
        { status: 404 }
      )
    }

    const currentStatus = payment.invoice.submission.status
    const isDP = payment.paymentType === "DP"

    if (isDP && currentStatus !== "WAITING_DP") {
      return NextResponse.json(
        {
          success: false,
          message: `Verifikasi DP hanya dapat dilakukan pada status Menunggu DP. Status saat ini: ${currentStatus}`,
        },
        { status: 400 }
      )
    }

    if (!isDP && currentStatus !== "DP_PAID") {
      return NextResponse.json(
        {
          success: false,
          message: `Verifikasi pelunasan hanya dapat dilakukan setelah DP diverifikasi. Status saat ini: ${currentStatus}`,
        },
        { status: 400 }
      )
    }

    const newStatus: SubmissionStatus = isDP ? "DP_PAID" : "PAID"
    const sub = payment.invoice.submission
    const activeInvoice = await prisma.invoice.findFirst({
      where: { submissionId: sub.id, status: "ACTIVE" },
    })

    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id },
        data: {
          verifiedById: session.user?.id as string,
          verifiedAt: new Date(),
        },
      })

      await tx.submission.update({
        where: { id: sub.id },
        data: { status: newStatus },
      })

      const activityLabel = isDP
        ? "DP Diverifikasi"
        : "Pelunasan Diverifikasi"

      await tx.timeline.create({
        data: {
          submissionId: sub.id,
          activity: activityLabel,
          description: `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(payment.amount)} via ${payment.paymentMethod}`,
          performedById: session.user?.id as string,
        },
      })
    })

    let googleEventId: string | null = null

    if (isDP) {
      googleEventId = await createCalendarEvent({
        eventName: sub.eventName,
        clientName: sub.client.name,
        clientPhone: sub.client.phone,
        packageName: sub.package.name,
        addOnNames: sub.submissionAddOns.map((s) => s.addOn.name),
        eventDate: sub.eventDate,
        eventTime: sub.eventTime,
        location: sub.location,
        specialRequest: sub.specialRequest,
        submissionNumber: sub.submissionNumber,
        invoiceNumber: activeInvoice?.invoiceNumber || "-",
      })

      if (googleEventId) {
        try {
          await prisma.submission.update({
            where: { id: sub.id },
            data: { googleEventId },
          })
        } catch (err) {
          console.error(
            "Failed to save googleEventId after calendar creation:",
            err
          )
        }
      }
    }

    if (isDP) {
      try {
        const dueDate = new Date(sub.eventDate)
        dueDate.setDate(dueDate.getDate() - 1)
        await prisma.reminder.create({
          data: {
            submissionId: sub.id,
            type: "SESSION",
            title: `Sesi - ${sub.client.name} (${format(new Date(sub.eventDate), "dd MMM")})`,
            dueDate,
          },
        })
      } catch (e) {
        console.error("Failed to create session reminder:", e)
      }
    }

    return NextResponse.json({
      success: true,
      data: { status: newStatus, googleEventId },
      message: isDP
        ? "DP berhasil diverifikasi"
        : "Pelunasan berhasil diverifikasi",
    })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
