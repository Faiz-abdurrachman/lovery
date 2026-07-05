import { auth } from "@/lib/auth"
import { supabaseAdmin } from "@/lib/supabase-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, TrendingUp, Clock, MapPin, Flame, Bell, CreditCard, Send } from "lucide-react"
import { cn, formatRupiah } from "@/lib/utils"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import Link from "next/link"
import type { SubmissionStatus } from "@prisma/client"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/features/submission/constants/submission.constant"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  // Auth sudah di-check oleh layout, tapi kita perlu session untuk display name
  const session = await auth()
  if (!session?.user) return null

  const JAKARTA_TZ = "Asia/Jakarta"
  const now = new Date()
  const jakartaTime = toZonedTime(now, JAKARTA_TZ)

  // Start of today in Jakarta (00:00:00 WIB)
  const todayStart = new Date(jakartaTime.getFullYear(), jakartaTime.getMonth(), jakartaTime.getDate(), 0, 0, 0, 0)
  // Start of tomorrow in Jakarta
  const tomorrowStart = new Date(todayStart.getTime() + 86400000)
  // Start of this month in Jakarta (1st 00:00:00 WIB)
  const monthStart = new Date(jakartaTime.getFullYear(), jakartaTime.getMonth(), 1, 0, 0, 0, 0)

  // Convert back to ISO string for Supabase queries (UTC)
  // toZonedTime produces a Date that represents the correct local time when toISOString is called
  const todayStr = todayStart.toISOString()
  const tomorrowStr = tomorrowStart.toISOString()
  const monthStartStr = monthStart.toISOString()

  const [
    { count: pendingReviewCount },
    { count: waitingDpCount },
    { count: dpPaidCount },
    { count: editingCount },
    { data: todaySessionsRaw },
    { data: recentTimelinesRaw },
    { data: todayPaymentsRaw },
    { data: monthPaymentsRaw },
    { data: outstandingInvoiceData },
    { data: dpTodayRaw },
    { data: pendingRemindersRaw },
    { count: unpaidDelivered },
  ] = await Promise.all([
    supabaseAdmin.from("submissions").select("*", { count: "exact", head: true }).eq("status", "PENDING_REVIEW"),
    supabaseAdmin.from("submissions").select("*", { count: "exact", head: true }).eq("status", "WAITING_DP"),
    supabaseAdmin.from("submissions").select("*", { count: "exact", head: true }).eq("status", "DP_PAID"),
    supabaseAdmin.from("submissions").select("*", { count: "exact", head: true }).eq("status", "EDITING"),
    supabaseAdmin.from("submissions").select("*, client:clients(name), package:packages(name)").gte("eventDate", todayStr).lt("eventDate", tomorrowStr).not("status", "in", '("CANCELLED","REJECTED","COMPLETED")').order("eventTime", { ascending: true }),
    supabaseAdmin.from("timelines").select("*, submission:submissions(submissionNumber)").order("createdAt", { ascending: false }).limit(8),
    supabaseAdmin.from("payments").select("amount").gte("verifiedAt", todayStr).lt("verifiedAt", tomorrowStr),
    supabaseAdmin.from("payments").select("amount").gte("verifiedAt", monthStartStr),
    supabaseAdmin.from("invoices").select("remainingAmount").eq("status", "ACTIVE").gt("remainingAmount", 0),
    supabaseAdmin.from("payments").select("amount").eq("paymentType", "DP").gte("verifiedAt", todayStr).lt("verifiedAt", tomorrowStr),
    supabaseAdmin.from("reminders").select("*, submission:submissions(id, submissionNumber, eventName, eventDate, client:clients(name,phone))").eq("status", "PENDING").order("createdAt", { ascending: false }).limit(10),
    supabaseAdmin.from("submissions").select("*", { count: "exact", head: true }).eq("status", "EDITING").is("googleDriveLink", null),
  ])

  const todaySessions = todaySessionsRaw || []
  const recentTimelines = recentTimelinesRaw || []
  const todayPayments = todayPaymentsRaw || []
  const monthPayments = monthPaymentsRaw || []
  const dpToday = dpTodayRaw || []
  const pendingReminders = pendingRemindersRaw || []
  const outstandingAmount = (outstandingInvoiceData || []).reduce((s: number, i: { remainingAmount: number }) => s + i.remainingAmount, 0)
  const todayRevenue = todayPayments.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const monthRevenue = monthPayments.reduce((s: number, p: { amount: number }) => s + p.amount, 0)
  const dpTodayAmount = dpToday.reduce((s: number, p: { amount: number }) => s + p.amount, 0)

  return (
    <div className="space-y-10">
      <div className="border-b-4 border-black pb-4 inline-block">
        <h1 className="text-3xl lg:text-5xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">
          WELCOME, {session.user.name?.split(" ")[0] || "ADMIN"}
        </h1>
        <p className="text-gray-600 mt-2 font-accent font-bold tracking-widest uppercase">
          /// RINGKASAN OPERASIONAL STUDIO HARI INI ///
        </p>
      </div>

      {pendingReminders.length > 0 && (
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#E89CC9] bg-white">
          <CardHeader className="pb-3 border-b-4 border-black">
            <CardTitle className="text-xl font-heading font-black flex items-center gap-2 uppercase tracking-widest text-black">
              <Flame className="h-6 w-6 text-lovery-pink" /> YANG HARUS DIKERJAKAN
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 p-4">
            {pendingReminders.map((r: any) => {
              const cfg: Record<string, { icon: any; color: string; bg: string }> = {
                SESSION: { icon: Bell, color: "text-white", bg: "bg-error" },
                PAYMENT: { icon: CreditCard, color: "text-white", bg: "bg-warning" },
                DELIVERY: { icon: Send, color: "text-white", bg: "bg-info" },
              }
              const c = cfg[r.type] || { icon: Bell, color: "text-white", bg: "bg-black" }
              const Icon = c.icon
              return (
                <Link key={r.id} href={`/admin/pengajuan/${r.submission?.id}`} className="flex items-center gap-3 p-3 border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-white">
                  <div className={cn("w-12 h-12 flex items-center justify-center border-2 border-black shadow-[2px_2px_0_0_#111111]", c.bg)}><Icon className={cn("h-5 w-5", c.color)} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-accent font-bold text-black truncate uppercase tracking-wide">{r.title}</p>
                    <p className="text-xs text-gray-500 font-bold uppercase">{r.submission?.submissionNumber} • {r.submission?.client?.[0]?.name || r.submission?.client?.name}</p>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Pengajuan Baru", count: pendingReviewCount || 0, color: "bg-white" },
          { label: "Menunggu DP", count: waitingDpCount || 0, color: "bg-white" },
          { label: "DP Diterima", count: dpPaidCount || 0, color: "bg-white" },
          { label: "Proses Editing", count: editingCount || 0, color: "bg-white" },
          { label: "Sesi Hari Ini", count: (todaySessions || []).length, color: "bg-lovery-pink" },
          { label: "Hasil Blm Dikirim", count: unpaidDelivered || 0, color: "bg-white" },
        ].map((w) => (
          <div key={w.label} className={cn("border-4 border-black p-4 text-center shadow-[6px_6px_0_0_#111111] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#111111] transition-all", w.color)}>
            <p className="text-4xl font-heading font-black text-black drop-shadow-[2px_2px_0_#fff]">{w.count}</p>
            <p className="text-xs font-accent font-bold text-black uppercase tracking-wider mt-2 border-t-2 border-black pt-2">{w.label}</p>
          </div>
        ))}
      </div>

      <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
        <CardHeader className="pb-3 border-b-4 border-black">
          <CardTitle className="text-xl font-heading font-black flex items-center gap-2 uppercase tracking-widest text-black">
            <CalendarDays className="h-6 w-6 text-black" /> AGENDA HARI INI
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {todaySessions.length === 0 ? (
            <p className="text-sm font-accent font-bold text-gray-500 text-center py-8 uppercase tracking-widest">TIDAK ADA SESI HARI INI.</p>
          ) : (
            <div className="space-y-4">
              {todaySessions.map((sub: any) => (
                <Link key={sub.id} href={`/admin/pengajuan/${sub.id}`} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-2 border-black hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111] transition-all bg-white relative overflow-hidden group">
                  {/* Decorative stripes */}
                  <div className="absolute top-0 right-0 bottom-0 w-2 bg-lovery-pink transform origin-bottom skew-x-[-20deg] translate-x-4 group-hover:translate-x-0 transition-transform" />
                  
                  <div className="w-14 h-14 border-2 border-black bg-lovery-pink flex items-center justify-center shrink-0 shadow-[2px_2px_0_0_#111111]">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <p className="font-heading font-black text-black text-xl uppercase">{(sub.client as any)?.[0]?.name || sub.client?.name} <span className="text-lovery-pink px-2">/</span> {(sub.package as any)?.[0]?.name || sub.package?.name}</p>
                    <div className="flex items-center gap-4 text-xs font-accent font-bold text-gray-600 mt-2 uppercase tracking-widest">
                      <span className="bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9]">{sub.eventTime}</span>
                      <span className="flex items-center gap-1 border border-black px-2 py-1"><MapPin className="h-3 w-3" />{sub.location}</span>
                    </div>
                  </div>
                  <Badge className={cn("rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest", SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus])}>{SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3 border-b-4 border-black">
            <CardTitle className="text-xl font-heading font-black flex items-center gap-2 uppercase tracking-widest text-black">
              <TrendingUp className="h-6 w-6 text-black" /> PENDAPATAN
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black bg-lovery-pink p-4 text-center shadow-[4px_4px_0_0_#111111]">
                <p className="text-xs font-accent font-bold text-black uppercase tracking-widest border-b-2 border-black pb-2 mb-2">HARI INI</p>
                <p className="text-2xl font-heading font-black text-black">{formatRupiah(todayRevenue)}</p>
              </div>
              <div className="border-2 border-black bg-white p-4 text-center shadow-[4px_4px_0_0_#111111]">
                <p className="text-xs font-accent font-bold text-black uppercase tracking-widest border-b-2 border-black pb-2 mb-2">BULAN INI</p>
                <p className="text-2xl font-heading font-black text-black">{formatRupiah(monthRevenue)}</p>
              </div>
              <div className="border-2 border-black bg-white p-4 text-center shadow-[4px_4px_0_0_#111111]">
                <p className="text-xs font-accent font-bold text-black uppercase tracking-widest border-b-2 border-black pb-2 mb-2">OUTSTANDING</p>
                <p className="text-2xl font-heading font-black text-black">{formatRupiah(outstandingAmount)}</p>
              </div>
              <div className="border-2 border-black bg-white p-4 text-center shadow-[4px_4px_0_0_#111111]">
                <p className="text-xs font-accent font-bold text-black uppercase tracking-widest border-b-2 border-black pb-2 mb-2">DP HARI INI</p>
                <p className="text-2xl font-heading font-black text-black">{formatRupiah(dpTodayAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3 border-b-4 border-black">
            <CardTitle className="text-xl font-heading font-black flex items-center gap-2 uppercase tracking-widest text-black">
              <Clock className="h-6 w-6 text-black" /> AKTIVITAS TERBARU
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            {recentTimelines.length === 0 ? (
              <p className="text-sm font-accent font-bold text-gray-500 text-center py-8 uppercase tracking-widest">BELUM ADA AKTIVITAS.</p>
            ) : (
              <div className="space-y-4">
                {recentTimelines.map((t: any) => (
                  <div key={t.id} className="border-4 border-black p-4 mb-4 shadow-[4px_4px_0_0_#111111] bg-white hover:-translate-y-1 transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <p className="font-heading font-black text-xl text-black uppercase">{t.activity}</p>
                      <span className="font-accent font-bold uppercase tracking-widest text-xs bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] inline-block w-fit">
                        {format(new Date(t.createdAt), "dd MMM, HH:mm")}
                      </span>
                    </div>
                    {t.description && (
                      <p className="font-accent font-bold uppercase tracking-widest text-black bg-gray-100 border-2 border-black p-2 inline-block mb-3">
                        {t.description}
                      </p>
                    )}
                    <div>
                      <span className="font-heading font-black text-lg text-lovery-pink drop-shadow-[1px_1px_0_#111111] uppercase block mt-1">
                        {t.submission?.submissionNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
