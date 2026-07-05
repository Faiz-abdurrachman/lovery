import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { verifyPayment } from "@/lib/data"
import { supabaseAdmin } from "@/lib/supabase-server"
import { createCalendarEvent } from "@/lib/google-calendar"
import { format } from "date-fns"

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

    // Get payment with submission details
    const { data: payment } = await supabaseAdmin
      .from("payments")
      .select("*")
      .eq("id", id)
      .single()

    if (!payment) {
      return NextResponse.json({ success: false, message: "Pembayaran tidak ditemukan" }, { status: 404 })
    }

    const { data: invoice } = await supabaseAdmin
      .from("invoices")
      .select("submissionId, dpAmount, remainingAmount, grandTotal")
      .eq("id", payment.invoiceId)
      .single()

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice tidak ditemukan" }, { status: 404 })
    }

    // Validasi amount sesuai invoice
    if (payment.paymentType === "DP" && payment.amount !== invoice.dpAmount) {
      return NextResponse.json({
        success: false,
        message: `Nominal DP harus Rp ${invoice.dpAmount.toLocaleString("id-ID")} sesuai invoice`
      }, { status: 400 })
    }
    if (payment.paymentType === "PELUNASAN" && payment.amount !== invoice.remainingAmount) {
      return NextResponse.json({
        success: false,
        message: `Nominal pelunasan harus Rp ${invoice.remainingAmount.toLocaleString("id-ID")} sesuai sisa`
      }, { status: 400 })
    }
    // Cek total tidak melebihi grandTotal
    const { data: paidPayments } = await supabaseAdmin
      .from("payments")
      .select("amount")
      .eq("invoiceId", payment.invoiceId)
      .not("id", "eq", payment.id)
      .not("verifiedAt", "is", null)
    const alreadyPaid = (paidPayments || []).reduce((s: number, p: { amount: number }) => s + p.amount, 0)
    if (alreadyPaid + payment.amount > invoice.grandTotal) {
      return NextResponse.json({
        success: false,
        message: "Total pembayaran melebihi grand total invoice"
      }, { status: 400 })
    }

    const { data: submission } = await supabaseAdmin
      .from("submissions")
      .select("status, eventName, eventDate, eventTime, location, specialRequest, submissionNumber, client:clients(name,phone), package:packages(name), submission_add_ons(addOn:add_ons(name))")
      .eq("id", invoice?.submissionId)
      .single()

    if (!submission) {
      return NextResponse.json({ success: false, message: "Pengajuan tidak ditemukan" }, { status: 404 })
    }

    // Cegah verify kalo status udah final
    const finalStatuses = ["PAID", "COMPLETED", "DELIVERED"]
    if (finalStatuses.includes(submission.status)) {
      return NextResponse.json({ success: false, message: "Pengajuan sudah selesai/lunas" }, { status: 400 })
    }

    const isDP = payment.paymentType === "DP"

    if (isDP && submission.status !== "WAITING_DP") {
      return NextResponse.json({ success: false, message: "Status harus Menunggu DP" }, { status: 400 })
    }
    if (!isDP && submission.status !== "DP_PAID") {
      return NextResponse.json({ success: false, message: "DP harus diverifikasi terlebih dahulu" }, { status: 400 })
    }

    const result = await verifyPayment(id, session.user.id as string)
    const newStatus = result.status

    // Calendar event creation
    if (isDP) {
      const inv = await getActiveInvoice(invoice?.submissionId)
      const eventId = await createCalendarEvent({
        eventName: submission.eventName,
        clientName: (submission.client as any)?.name || (submission.client as any)?.[0]?.name || "",
        clientPhone: (submission.client as any)?.phone || (submission.client as any)?.[0]?.phone || "",
        packageName: (submission.package as any)?.[0]?.name || "",
        addOnNames: (submission.submission_add_ons || []).map((s: any) => s.addOn?.name).filter(Boolean),
        eventDate: submission.eventDate,
        eventTime: submission.eventTime,
        location: submission.location,
        specialRequest: submission.specialRequest,
        submissionNumber: submission.submissionNumber,
        invoiceNumber: inv?.invoiceNumber || "-",
      })

      if (eventId) {
        await supabaseAdmin.from("submissions").update({ googleEventId: eventId }).eq("id", invoice.submissionId)
      }

      // Create session reminder — cek dulu biar gak duplikat
      const { data: existingReminder } = await supabaseAdmin
        .from("reminders")
        .select("id")
        .eq("submissionId", invoice.submissionId)
        .eq("type", "SESSION")
        .maybeSingle()

      if (!existingReminder) {
        const dueDate = new Date(submission.eventDate)
        dueDate.setDate(dueDate.getDate() - 1)
        await supabaseAdmin.from("reminders").insert({
          id: crypto.randomUUID(),
          submissionId: invoice.submissionId,
          type: "SESSION",
          title: `Sesi - ${(submission.client as any)?.name || (submission.client as any)?.[0]?.name} (${format(new Date(submission.eventDate), "dd MMM")})`,
          dueDate: dueDate.toISOString(),
        })
      }
    }

    return NextResponse.json({ success: true, data: { status: newStatus } })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

async function getActiveInvoice(submissionId?: string) {
  if (!submissionId) return null
  const { data } = await supabaseAdmin.from("invoices").select("invoiceNumber").eq("submissionId", submissionId).eq("status", "ACTIVE").maybeSingle()
  return data
}
