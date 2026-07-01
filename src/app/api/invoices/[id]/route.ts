import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { editInvoiceSchema } from "@/features/invoice/schemas/invoice.schema"

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

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        submission: {
          select: {
            id: true,
            submissionNumber: true,
            eventName: true,
            eventDate: true,
            eventTime: true,
            location: true,
            specialRequest: true,
            client: {
              select: {
                id: true,
                name: true,
                phone: true,
                instagram: true,
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
                  select: { id: true, name: true, price: true },
                },
              },
            },
          },
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: invoice })
  } catch (error) {
    console.error("Get invoice error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
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

    const parsed = editInvoiceSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validasi gagal",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const existing = await prisma.invoice.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { success: false, message: "Invoice tidak ditemukan" },
        { status: 404 }
      )
    }

    if (existing.status !== "ACTIVE") {
      return NextResponse.json(
        { success: false, message: "Hanya invoice aktif yang dapat diedit" },
        { status: 400 }
      )
    }

    const updated = await prisma.invoice.update({
      where: { id },
      data: {
        subtotal: parsed.data.subtotal ?? existing.subtotal,
        addonTotal: parsed.data.addonTotal ?? existing.addonTotal,
        grandTotal: parsed.data.grandTotal ?? existing.grandTotal,
        dpAmount: parsed.data.dpAmount ?? existing.dpAmount,
        remainingAmount: parsed.data.remainingAmount ?? existing.remainingAmount,
      },
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    console.error("Edit invoice error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
