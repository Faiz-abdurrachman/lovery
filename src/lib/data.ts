import { supabase } from "@/lib/supabase"
import { calculateDP } from "@/features/invoice/constants/invoice.constant"

// ─── Submissions ────────────────────────────────

export async function listSubmissions(params: {
  status?: string
  search?: string
  page?: number
  limit?: number
}) {
  const page = params.page || 1
  const limit = params.limit || 10
  const from = (page - 1) * limit
  const to = from + limit - 1

  let query = supabase
    .from("submissions")
    .select("*, client:clients(id,name,phone), package:packages(id,name,category)", { count: "exact" })

  if (params.status) {
    query = query.eq("status", params.status)
  }

  if (params.search) {
    query = query.or(
      `submissionNumber.ilike.%${params.search}%,eventName.ilike.%${params.search}%`
    )
  }

  const { data, count, error } = await query
    .order("createdAt", { ascending: false })
    .range(from, to)

  if (error) throw error

  return { items: data || [], total: count || 0, page, limit }
}

export async function getSubmission(id: string) {
  const { data, error } = await supabase
    .from("submissions")
    .select(
      "*, client:clients(*), package:packages(*), submission_add_ons(*, addOn:add_ons(*)), timelines(*), invoices(*, payments(*))"
    )
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

export async function trackSubmission(number: string, phone: string) {
  // First find the submission
  const { data: submission, error } = await supabase
    .from("submissions")
    .select("*, package:packages(*), submission_add_ons(*, addOn:add_ons(*)), timelines(*), invoices(*, payments(*))")
    .eq("submissionNumber", number)
    .single()

  if (error || !submission) return null

  // Then verify the client phone
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", submission.clientId)
    .eq("phone", phone)
    .maybeSingle()

  if (!client) return null

  return { ...submission, client }
}

export async function updateSubmissionStatus(
  id: string,
  status: string,
  adminNote?: string,
  adminId?: string
) {
  const { data, error } = await supabase
    .from("submissions")
    .update({ status, adminNote: adminNote || null })
    .eq("id", id)
    .select()
    .single()

  if (error) throw error

  // Add timeline
  const activityLabels: Record<string, string> = {
    WAITING_DP: "Pengajuan diterima",
    REJECTED: "Pengajuan ditolak",
    RESCHEDULE: "Penjadwalan ulang diminta",
    CANCELLED: "Pengajuan dibatalkan",
    ON_SESSION: "Sesi dimulai",
    EDITING: "Sesi selesai - Masuk editing",
    DELIVERED: "Hasil dikirim",
    COMPLETED: "Pengajuan selesai",
  }

  await supabase.from("timelines").insert({
    id: crypto.randomUUID(),
    submissionId: id,
    activity: activityLabels[status] || `Status: ${status}`,
    description: adminNote || null,
    performedById: adminId || null,
  })

  return data
}

export async function createInvoiceForSubmission(submissionId: string, adminId?: string) {
  // Get submission package and addons
  const { data: sub } = await supabase
    .from("submissions")
    .select("*, package:packages(price,category), submission_add_ons(priceSnapshot)")
    .eq("id", submissionId)
    .single()

  if (!sub) throw new Error("Submission not found")

  const pkg = (sub.package as any)?.[0] || sub.package
  const subtotal = pkg.price
  const addonTotal = (sub.submission_add_ons || []).reduce(
    (s: number, a: { priceSnapshot: number }) => s + a.priceSnapshot, 0
  )
  const grandTotal = subtotal + addonTotal
  const hasAddOns = (sub.submission_add_ons || []).length > 0
  const dpAmount = calculateDP(grandTotal, pkg.category, hasAddOns)

  // Get revision number
  const { data: lastInv } = await supabase
    .from("invoices")
    .select("revision")
    .eq("submissionId", submissionId)
    .order("revision", { ascending: false })
    .limit(1)
    .maybeSingle()

  const revision = (lastInv?.revision || 0) + 1

  // Deactivate old ACTIVE invoices
  await supabase
    .from("invoices")
    .update({ status: "REVISED" })
    .eq("submissionId", submissionId)
    .eq("status", "ACTIVE")

  // Generate invoice number
  const year = new Date().getFullYear().toString().slice(-2)
  const { count } = await supabase
    .from("invoices")
    .select("*", { count: "exact", head: true })

  const invNumber = `INV${String((count || 0) + 1).padStart(4, "0")}${year}`

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      id: crypto.randomUUID(),
      invoiceNumber: invNumber,
      submissionId,
      subtotal,
      addonTotal,
      grandTotal,
      dpAmount,
      remainingAmount: grandTotal - dpAmount,
      status: "ACTIVE",
      revision,
      issuedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) throw error

  await supabase.from("timelines").insert({
    id: crypto.randomUUID(),
    submissionId,
    activity: "Invoice dibuat",
    description: `Invoice ${invNumber} (Revisi ${revision})`,
    performedById: adminId || null,
  })

  return invoice
}

// ─── Clients ─────────────────────────────────────

export async function listClients(search?: string) {
  let query = supabase.from("clients").select("*, submissions:submissions(count)", { count: "exact" })

  if (search) {
    query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,clientNumber.ilike.%${search}%`)
  }

  const { data, error } = await query.order("createdAt", { ascending: false }).limit(100)

  if (error) throw error

  return (data || []).map((c: any) => ({
    ...c,
    _count: { submissions: c.submissions?.[0]?.count || 0 },
  }))
}

// ─── Settings ────────────────────────────────────

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").limit(1).maybeSingle()
  if (error) throw error
  return data
}

export async function updateSettings(body: Record<string, unknown>) {
  let { data } = await supabase.from("settings").select("id").limit(1).maybeSingle()

  if (!data) {
    const { data: created, error } = await supabase
      .from("settings")
      .insert({ id: crypto.randomUUID(), ...body, whatsapp: body.whatsapp || "6281234567890", updatedAt: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return created
  }

  const { data: updated, error } = await supabase
    .from("settings")
    .update({ ...body, updatedAt: new Date().toISOString() })
    .eq("id", data.id)
    .select()
    .single()
  if (error) throw error
  return updated
}

// ─── Invoices ────────────────────────────────────

export async function listInvoices() {
  const { data, error } = await supabase
    .from("invoices")
    .select("*, submission:submissions(submissionNumber, client:clients(name,phone), package:packages(name))")
    .order("createdAt", { ascending: false })
    .limit(50)

  if (error) throw error
  return data
}

export async function getInvoice(id: string) {
  const { data, error } = await supabase
    .from("invoices")
    .select("*, submission:submissions(*, client:clients(*), package:packages(*), submission_add_ons(*, addOn:add_ons(*))), payments(*)")
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

// ─── Payments ────────────────────────────────────

export async function createPayment(data: {
  invoiceId: string
  paymentType: string
  amount: number
  paymentMethod: string
  notes?: string
}) {
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from("payments")
    .select("*", { count: "exact", head: true })

  const paymentNumber = `PAY-${year}-${String((count || 0) + 1).padStart(6, "0")}`

  const { data: payment, error } = await supabase
    .from("payments")
    .insert({ id: crypto.randomUUID(), ...data, paymentNumber })
    .select()
    .single()

  if (error) throw error
  return payment
}

export async function verifyPayment(paymentId: string, adminId: string) {
  const { data: payment, error } = await supabase
    .from("payments")
    .select("*, invoice:invoices(submissionId)")
    .eq("id", paymentId)
    .single()

  if (error) throw error

  const isDP = payment.paymentType === "DP"
  const newStatus = isDP ? "DP_PAID" : "PAID"

  await supabase.from("payments").update({
    verifiedById: adminId,
    verifiedAt: new Date().toISOString(),
  }).eq("id", paymentId)

  await supabase.from("submissions").update({ status: newStatus }).eq("id", payment.invoice.submissionId)

  const activity = isDP ? "DP Diverifikasi" : "Pelunasan Diverifikasi"
  await supabase.from("timelines").insert({
    id: crypto.randomUUID(),
    submissionId: payment.invoice.submissionId,
    activity,
    description: `${new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(payment.amount)} via ${payment.paymentMethod}`,
    performedById: adminId,
  })

  return { status: newStatus }
}

// ─── Reminders ───────────────────────────────────

export async function listReminders(status?: string) {
  const query = supabase
    .from("reminders")
    .select("*, submission:submissions(id, submissionNumber, eventName, eventDate, client:clients(name))")

  if (status) query.eq("status", status)

  const { data, error } = await query.order("createdAt", { ascending: false }).limit(50)
  if (error) throw error
  return data
}

export async function completeReminder(id: string) {
  const { data, error } = await supabase.from("reminders").update({ status: "COMPLETED" }).eq("id", id).select().single()
  if (error) throw error
  return data
}
