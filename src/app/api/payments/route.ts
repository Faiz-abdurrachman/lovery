import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { createPayment } from "@/lib/data"

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const body = await request.json()
    const { invoiceId, paymentType, amount, paymentMethod, notes } = body

    if (!invoiceId || !paymentType || !amount || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Data tidak lengkap" }, { status: 400 })
    }

    const parsed = parseInt(String(amount), 10)
    if (isNaN(parsed) || parsed <= 0) {
      return NextResponse.json({ success: false, message: "Nominal tidak valid" }, { status: 400 })
    }

    const payment = await createPayment({ invoiceId, paymentType, amount: parsed, paymentMethod, notes })
    return NextResponse.json({ success: true, data: payment }, { status: 201 })
  } catch (error) {
    console.error("Create payment error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
