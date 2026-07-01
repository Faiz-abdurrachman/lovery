import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  TrendingUp,
  Clock,
  MapPin,
  Flame,
  Bell,
  CreditCard,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import Link from "next/link"
import type { SubmissionStatus } from "@prisma/client"
import {
  SUBMISSION_STATUS_LABELS,
  SUBMISSION_STATUS_COLORS,
} from "@/features/submission/constants/submission.constant"

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
  }).format(n)
}

export default async function AdminDashboardPage() {
  const session = await auth()
  if (!session?.user) {
    redirect("/admin/login")
  }

  const now = new Date()
  const jakartaOffset = 7 * 60 * 60 * 1000
  const jakartaTime = new Date(now.getTime() + jakartaOffset)
  const todayJakarta = new Date(
    Date.UTC(jakartaTime.getUTCFullYear(), jakartaTime.getUTCMonth(), jakartaTime.getUTCDate(), -7)
  )
  const tomorrowJakarta = new Date(todayJakarta.getTime() + 86400000)
  const monthStartJakarta = new Date(
    Date.UTC(jakartaTime.getUTCFullYear(), jakartaTime.getUTCMonth(), 1, -7)
  )

  const [
    pendingReviewCount,
    waitingDpCount,
    dpPaidCount,
    editingCount,
    todaySessions,
    recentTimelines,
    todayPayments,
    monthPayments,
    outstandingInvoice,
    dpToday,
    pendingReminders,
  ] = await Promise.all([
    prisma.submission.count({ where: { status: "PENDING_REVIEW" } }),
    prisma.submission.count({ where: { status: "WAITING_DP" } }),
    prisma.submission.count({ where: { status: "DP_PAID" } }),
    prisma.submission.count({ where: { status: "EDITING" } }),
    prisma.submission.findMany({
      where: {
        eventDate: { gte: todayJakarta, lt: tomorrowJakarta },
        status: { notIn: ["CANCELLED", "REJECTED", "COMPLETED"] },
      },
      include: {
        client: { select: { name: true } },
        package: { select: { name: true } },
      },
      orderBy: { eventTime: "asc" },
    }),
    prisma.timeline.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        submission: {
          select: { submissionNumber: true },
        },
      },
    }),
    prisma.payment.findMany({
      where: { verifiedAt: { gte: todayJakarta, lt: tomorrowJakarta } },
      select: { amount: true },
    }),
    prisma.payment.findMany({
      where: { verifiedAt: { gte: monthStartJakarta } },
      select: { amount: true },
    }),
    prisma.invoice.aggregate({
      _sum: { remainingAmount: true },
      where: { status: "ACTIVE", remainingAmount: { gt: 0 } },
    }),
    prisma.payment.findMany({
      where: {
        verifiedAt: { gte: todayJakarta, lt: tomorrowJakarta },
        paymentType: "DP",
      },
      select: { amount: true },
    }),
    prisma.reminder.findMany({
      where: { status: "PENDING" },
      include: {
        submission: {
          select: {
            id: true,
            submissionNumber: true,
            eventName: true,
            eventDate: true,
            client: { select: { name: true, phone: true } },
          },
        },
      },
      orderBy: [{ type: "asc" }, { createdAt: "desc" }],
      take: 10,
    }),
  ])

  const unpaidDelivered = await prisma.submission.count({
    where: {
      status: "DELIVERED",
      googleDriveLink: { not: null },
    },
  })

  const todayRevenue = todayPayments.reduce((s, p) => s + p.amount, 0)
  const monthRevenue = monthPayments.reduce((s, p) => s + p.amount, 0)
  const outstandingAmount = outstandingInvoice._sum.remainingAmount || 0
  const dpTodayAmount = dpToday.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">
          Selamat datang, {session.user.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="text-gray-500 mt-1">
          Berikut ringkasan operasional studio hari ini.
        </p>
      </div>

      {pendingReminders.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-error">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Flame className="h-4 w-4 text-error" />
              Yang Harus Dikerjakan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingReminders.map((r) => {
              const typeConfig = {
                SESSION: { icon: Bell, color: "text-error", bg: "bg-error/10" },
                PAYMENT: { icon: CreditCard, color: "text-warning", bg: "bg-warning/10" },
                DELIVERY: { icon: Send, color: "text-info", bg: "bg-info/10" },
              }[r.type] || { icon: Bell, color: "text-gray-400", bg: "bg-gray-100" }
              const Icon = typeConfig.icon

              return (
                <Link
                  key={r.id}
                  href={`/admin/pengajuan/${r.submission.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", typeConfig.bg)}>
                    <Icon className={cn("h-4 w-4", typeConfig.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {r.submission.submissionNumber} • {r.submission.client.name}
                    </p>
                  </div>
                </Link>
              )
            })}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Pengajuan Baru", count: pendingReviewCount, color: "bg-status-review" },
          { label: "Menunggu DP", count: waitingDpCount, color: "bg-status-dp" },
          { label: "DP Diterima", count: dpPaidCount, color: "bg-status-dp-paid" },
          { label: "Proses Editing", count: editingCount, color: "bg-status-editing" },
          { label: "Sesi Hari Ini", count: todaySessions.length, color: "bg-lovery-pink" },
          { label: "Hasil Blm Dikirim", count: unpaidDelivered, color: "bg-gray-400" },
        ].map((widget) => (
          <Card key={widget.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-black">{widget.count}</p>
              <p className="text-xs text-gray-500 mt-1">{widget.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-info" />
            Agenda Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaySessions.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">
              Tidak ada sesi hari ini.
            </p>
          ) : (
            <div className="space-y-2">
              {todaySessions.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/admin/pengajuan/${sub.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-lovery-pink/10 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-lovery-pink" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-black text-sm">
                      {sub.client.name} • {sub.package.name}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                      <span>{sub.eventTime}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {sub.location}
                      </span>
                    </div>
                  </div>
                  <Badge
                    className={cn(
                      "rounded-full",
                      SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus]
                    )}
                  >
                    {SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Pendapatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">Hari Ini</p>
                <p className="text-lg font-semibold text-black mt-1">
                  {formatRupiah(todayRevenue)}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">Bulan Ini</p>
                <p className="text-lg font-semibold text-black mt-1">
                  {formatRupiah(monthRevenue)}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">Outstanding</p>
                <p className="text-lg font-semibold text-black mt-1">
                  {formatRupiah(outstandingAmount)}
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-500">DP Hari Ini</p>
                <p className="text-lg font-semibold text-black mt-1">
                  {formatRupiah(dpTodayAmount)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentTimelines.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">
                Belum ada aktivitas.
              </p>
            ) : (
              <div className="space-y-3">
                {recentTimelines.map((t) => (
                  <div key={t.id} className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-lovery-pink mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">
                        {format(new Date(t.createdAt), "dd MMM, HH:mm")}
                      </p>
                      <p className="text-sm text-black">{t.activity}</p>
                      {t.description && (
                        <p className="text-xs text-gray-500">{t.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t.submission.submissionNumber}
                      </p>
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
