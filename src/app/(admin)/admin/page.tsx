import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, TrendingUp, Clock, MapPin, Flame, Bell, CreditCard, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import type { SubmissionStatus } from "@prisma/client"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/features/submission/constants/submission.constant"

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")

  const now = new Date()
  const jakartaOffset = 7 * 60 * 60 * 1000
  const jakartaTime = new Date(now.getTime() + jakartaOffset)
  const todayJakarta = new Date(Date.UTC(jakartaTime.getUTCFullYear(), jakartaTime.getUTCMonth(), jakartaTime.getUTCDate(), -7))
  const tomorrowJakarta = new Date(todayJakarta.getTime() + 86400000)
  const monthStartJakarta = new Date(Date.UTC(jakartaTime.getUTCFullYear(), jakartaTime.getUTCMonth(), 1, -7))
  const todayStr = todayJakarta.toISOString()
  const tomorrowStr = tomorrowJakarta.toISOString()
  const monthStartStr = monthStartJakarta.toISOString()

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
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "PENDING_REVIEW"),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "WAITING_DP"),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "DP_PAID"),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "EDITING"),
    supabase.from("submissions").select("*, client:clients(name), package:packages(name)").gte("eventDate", todayStr).lt("eventDate", tomorrowStr).not("status", "in", '("CANCELLED","REJECTED","COMPLETED")').order("eventTime", { ascending: true }),
    supabase.from("timelines").select("*, submission:submissions(submissionNumber)").order("createdAt", { ascending: false }).limit(8),
    supabase.from("payments").select("amount").gte("verifiedAt", todayStr).lt("verifiedAt", tomorrowStr),
    supabase.from("payments").select("amount").gte("verifiedAt", monthStartStr),
    supabase.from("invoices").select("remainingAmount").eq("status", "ACTIVE").gt("remainingAmount", 0),
    supabase.from("payments").select("amount").eq("paymentType", "DP").gte("verifiedAt", todayStr).lt("verifiedAt", tomorrowStr),
    supabase.from("reminders").select("*, submission:submissions(id, submissionNumber, eventName, eventDate, client:clients(name,phone))").eq("status", "PENDING").order("createdAt", { ascending: false }).limit(10),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "DELIVERED").not("googleDriveLink", "is", null),
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Selamat datang, {session.user.name?.split(" ")[0] || "Admin"}</h1>
        <p className="text-gray-500 mt-1">Berikut ringkasan operasional studio hari ini.</p>
      </div>

      {pendingReminders.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-error">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2"><Flame className="h-4 w-4 text-error" />Yang Harus Dikerjakan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingReminders.map((r: any) => {
              const cfg: Record<string, { icon: any; color: string; bg: string }> = {
                SESSION: { icon: Bell, color: "text-error", bg: "bg-error/10" },
                PAYMENT: { icon: CreditCard, color: "text-warning", bg: "bg-warning/10" },
                DELIVERY: { icon: Send, color: "text-info", bg: "bg-info/10" },
              }
              const c = cfg[r.type] || { icon: Bell, color: "text-gray-400", bg: "bg-gray-100" }
              const Icon = c.icon
              return (
                <Link key={r.id} href={`/admin/pengajuan/${r.submission?.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", c.bg)}><Icon className={cn("h-4 w-4", c.color)} /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.submission?.submissionNumber} • {r.submission?.client?.[0]?.name || r.submission?.client?.name}</p>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Pengajuan Baru", count: pendingReviewCount || 0 },
          { label: "Menunggu DP", count: waitingDpCount || 0 },
          { label: "DP Diterima", count: dpPaidCount || 0 },
          { label: "Proses Editing", count: editingCount || 0 },
          { label: "Sesi Hari Ini", count: (todaySessions || []).length },
          { label: "Hasil Blm Dikirim", count: unpaidDelivered || 0 },
        ].map((w) => (
          <Card key={w.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center"><p className="text-2xl font-bold text-black">{w.count}</p><p className="text-xs text-gray-500 mt-1">{w.label}</p></CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2"><CalendarDays className="h-4 w-4 text-info" />Agenda Hari Ini</CardTitle>
        </CardHeader>
        <CardContent>
          {todaySessions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">Tidak ada sesi hari ini.</p>
          ) : (
            <div className="space-y-2">
              {todaySessions.map((sub: any) => (
                <Link key={sub.id} href={`/admin/pengajuan/${sub.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-lovery-pink/10 flex items-center justify-center shrink-0"><Clock className="h-4 w-4 text-lovery-pink" /></div>
                  <div className="flex-1">
                    <p className="font-medium text-black text-sm">{(sub.client as any)?.[0]?.name || sub.client?.name} • {(sub.package as any)?.[0]?.name || sub.package?.name}</p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5"><span>{sub.eventTime}</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{sub.location}</span></div>
                  </div>
                  <Badge className={cn("rounded-full", SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus])}>{SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}</Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold flex items-center gap-2"><TrendingUp className="h-4 w-4 text-success" />Pendapatan</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-xs text-gray-500">Hari Ini</p><p className="text-lg font-semibold text-black mt-1">{fmt(todayRevenue)}</p></div>
              <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-xs text-gray-500">Bulan Ini</p><p className="text-lg font-semibold text-black mt-1">{fmt(monthRevenue)}</p></div>
              <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-xs text-gray-500">Outstanding</p><p className="text-lg font-semibold text-black mt-1">{fmt(outstandingAmount)}</p></div>
              <div className="rounded-xl bg-gray-50 p-4 text-center"><p className="text-xs text-gray-500">DP Hari Ini</p><p className="text-lg font-semibold text-black mt-1">{fmt(dpTodayAmount)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3"><CardTitle className="text-base font-semibold flex items-center gap-2"><Clock className="h-4 w-4 text-gray-400" />Aktivitas Terbaru</CardTitle></CardHeader>
          <CardContent>
            {recentTimelines.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">Belum ada aktivitas.</p>
            ) : (
              <div className="space-y-3">
                {recentTimelines.map((t: any) => (
                  <div key={t.id} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lovery-pink mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">{format(new Date(t.createdAt), "dd MMM, HH:mm")}</p>
                      <p className="text-sm text-black">{t.activity}</p>
                      {t.description && <p className="text-xs text-gray-500">{t.description}</p>}
                      <p className="text-xs text-gray-400 mt-0.5">{t.submission?.submissionNumber}</p>
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
