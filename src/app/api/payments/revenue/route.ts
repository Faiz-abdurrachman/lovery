import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }
    const { searchParams } = new URL(request.url)
    const start = searchParams.get("startDate")
    const end = searchParams.get("endDate")

    let query = supabase.from("payments").select("*, invoice:invoices(invoiceNumber, submission:submissions(submissionNumber, client:clients(name), package:packages(name)))").in("paymentType", ["DP", "PELUNASAN"])

    if (start) query = query.gte("createdAt", start)
    if (end) query = query.lte("createdAt", end)

    const { data, error } = await query.order("createdAt", { ascending: false }).limit(500)

    if (error) throw error

    return NextResponse.json({ success: true, data: { payments: data } })
  } catch (error) {
    console.error("Revenue error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
