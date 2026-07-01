import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { verifyPayment } from "@/lib/data"
import { supabase } from "@/lib/supabase"
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
    const { data: payment } = await supabase
      .from("payments")
      .select("*")
      .eq("id", id)
      .single()

    if (!payment) {
      return NextResponse.json({ success: false, message: "Pembayaran tidak ditemukan" }, { status: 404 })
    }

    const { data: invoice } = await supabase
      .from("invoices")
      .select("submissionId")
      .eq("id", payment.invoiceId)
      .single()

    if (!invoice) {
      return NextResponse.json({ success: false, message: "Invoice tidak ditemukan" }, { status: 404 })
    }

    const { data: submission } = await supabase
      .from("submissions")
      .select("status, eventName, eventDate, eventTime, location, specialRequest, submissionNumber, client:clients(name,phone), package:packages(name), submission_add_ons(addOn:add_ons(name))")
      .eq("id", invoice?.submissionId)
      .single()

    if (!submission) {
      return NextResponse.json({ success: false, message: "Pengajuan tidak ditemukan" }, { status: 404 })
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
        clientName: (submission.client as any)?.[0]?.name || "",
        clientPhone: (submission.client as any)?.[0]?.phone || "",
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
        await supabase.from("submissions").update({ googleEventId: eventId }).eq("id", invoice.submissionId)
      }

      // Create session reminder
      const dueDate = new Date(submission.eventDate)
      dueDate.setDate(dueDate.getDate() - 1)
      await supabase.from("reminders").insert({
        submissionId: invoice.submissionId,
        type: "SESSION",
        title: `Sesi - ${(submission.client as any)?.[0]?.name} (${format(new Date(submission.eventDate), "dd MMM")})`,
        dueDate: dueDate.toISOString(),
      })
    }

    return NextResponse.json({ success: true, data: { status: newStatus } })
  } catch (error) {
    console.error("Verify payment error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

async function getActiveInvoice(submissionId?: string) {
  if (!submissionId) return null
  const { data } = await supabase.from("invoices").select("invoiceNumber").eq("submissionId", submissionId).eq("status", "ACTIVE").maybeSingle()
  return data
}
