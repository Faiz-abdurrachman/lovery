import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import type { PaymentType, PaymentMethod } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { invoiceId, paymentType, amount, paymentMethod, notes } = body

    if (!invoiceId || !paymentType || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Data pembayaran tidak lengkap" },
        { status: 400 }
      )
    }

    const validTypes: PaymentType[] = ["DP", "PELUNASAN", "REFUND"]
    if (!validTypes.includes(paymentType)) {
      return NextResponse.json(
        { success: false, message: "Tipe pembayaran tidak valid" },
        { status: 400 }
      )
    }

    const validMethods: PaymentMethod[] = ["TRANSFER", "QRIS"]
    if (!validMethods.includes(paymentMethod)) {
      return NextResponse.json(
        { success: false, message: "Metode pembayaran tidak valid" },
        { status: 400 }
      )
    }

    const parsedAmount = parseInt(String(amount), 10)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Nominal pembayaran tidak valid" },
        { status: 400 }
      )
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: { submission: true },
    })

    if (!invoice) {
      return NextResponse.json(
        { success: false, message: "Invoice tidak ditemukan" },
        { status: 404 }
      )
    }

    const payment = await prisma.$transaction(
      async (tx) => {
        const year = new Date().getFullYear()
        const count = await tx.payment.count({
          where: {
            createdAt: { gte: new Date(`${year}-01-01`) },
          },
        })
        const seq = String(count + 1).padStart(6, "0")
        const paymentNumber = `PAY-${year}-${seq}`

        return tx.payment.create({
          data: {
            paymentNumber,
            invoiceId,
            paymentType,
            amount: parsedAmount,
            paymentMethod,
            notes: notes || undefined,
          },
        })
      },
      {}
    )

    return NextResponse.json(
      { success: true, data: payment },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create payment error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
