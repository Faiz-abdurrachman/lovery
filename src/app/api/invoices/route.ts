import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { SubmissionStatus } from "@prisma/client"

async function generateInvoiceNumber(
  tx: Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$extends">
): Promise<string> {
  const year = new Date().getFullYear().toString().slice(-2)
  const count = await tx.invoice.count({
    where: { createdAt: { gte: new Date(`${new Date().getFullYear()}-01-01`) } },
  })
  const seq = String(count + 1).padStart(4, "0")
  return `INV${seq}${year}`
}

async function createInvoiceWithRetry(submissionId: string, userId: string) {
  const maxRetries = 3

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await prisma.$transaction(
        async (tx) => {
          const submission = await tx.submission.findUnique({
            where: { id: submissionId },
            include: {
              package: true,
              submissionAddOns: { include: { addOn: true } },
            },
          })

          if (!submission) throw new Error("NOT_FOUND")

          const validStatuses: SubmissionStatus[] = [
            "PENDING_REVIEW",
            "WAITING_DP",
            "RESCHEDULE",
          ]
          if (!validStatuses.includes(submission.status)) {
            throw new Error("INVALID_STATUS")
          }

          const highestRev = await tx.invoice.findFirst({
            where: { submissionId },
            orderBy: { revision: "desc" },
            select: { revision: true },
          })

          const revision = (highestRev?.revision || 0) + 1
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
            where: { submissionId, status: "ACTIVE" },
            data: { status: "REVISED" },
          })

          const invNumber = await generateInvoiceNumber(tx)

          const invoice = await tx.invoice.create({
            data: {
              invoiceNumber: invNumber,
              submissionId,
              subtotal,
              addonTotal,
              grandTotal,
              dpAmount,
              remainingAmount: grandTotal - dpAmount,
              status: "ACTIVE",
              revision,
              issuedAt: new Date(),
            },
            include: {
              submission: {
                select: {
                  submissionNumber: true,
                  client: { select: { name: true, phone: true } },
                  package: { select: { name: true } },
                },
              },
            },
          })

          await tx.timeline.create({
            data: {
              submissionId,
              activity: "Invoice dibuat",
              description: `Invoice ${invNumber} (Revisi ${revision})`,
              performedById: userId,
            },
          })

          return invoice
        },
        { isolationLevel: "Serializable" }
      )
    } catch (err) {
      const isSerializationError =
        err instanceof Error &&
        err.message.includes("could not serialize access")

      if (isSerializationError && attempt < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, 50 * (attempt + 1)))
        continue
      }

      throw err
    }
  }

  throw new Error("RETRY_EXHAUSTED")
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const { submissionId } = await request.json()

    if (!submissionId) {
      return NextResponse.json(
        { success: false, message: "submissionId wajib diisi" },
        { status: 400 }
      )
    }

    const invoice = await createInvoiceWithRetry(
      submissionId,
      session.user.id as string
    )

    return NextResponse.json(
      { success: true, data: invoice },
      { status: 201 }
    )
  } catch (error) {
    if (
      error instanceof Error &&
      (error.message === "NOT_FOUND" || error.message === "INVALID_STATUS")
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            error.message === "NOT_FOUND"
              ? "Pengajuan tidak ditemukan"
              : "Status pengajuan tidak valid untuk pembuatan invoice",
        },
        { status: 400 }
      )
    }

    console.error("Create invoice error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        submission: {
          select: {
            submissionNumber: true,
            client: { select: { name: true, phone: true } },
            package: { select: { name: true } },
          },
        },
      },
      take: 50,
    })

    return NextResponse.json({ success: true, data: invoices })
  } catch (error) {
    console.error("List invoices error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
