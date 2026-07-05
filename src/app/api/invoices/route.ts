import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { listInvoices, createInvoiceForSubmission } from "@/lib/data"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const data = await listInvoices()
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("List invoices error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { submissionId } = await request.json()
    if (!submissionId) {
      return NextResponse.json({ success: false, message: "submissionId wajib diisi" }, { status: 400 })
    }
    const invoice = await createInvoiceForSubmission(submissionId, session.user.id as string)
    return NextResponse.json({ success: true, data: invoice }, { status: 201 })
  } catch (error) {
    console.error("Create invoice error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
