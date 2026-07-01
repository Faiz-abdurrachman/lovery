import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import type { SubmissionStatus } from "@prisma/client"
import {
  SUBMISSION_STATUS_LABELS,
  SUBMISSION_STATUS_COLORS,
} from "@/features/submission/constants/submission.constant"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminCalendarPage() {
  const now = new Date()
  const submissions = await prisma.submission.findMany({
    where: {
      eventDate: { gte: new Date(now.getFullYear(), now.getMonth(), 1) },
      status: {
        notIn: ["CANCELLED", "REJECTED", "COMPLETED"],
      },
    },
    include: {
      client: { select: { name: true, phone: true } },
      package: { select: { name: true, category: true } },
    },
    orderBy: { eventDate: "asc" },
    take: 100,
  })

  const grouped: Record<string, typeof submissions> = {}
  for (const sub of submissions) {
    const key = format(new Date(sub.eventDate), "yyyy-MM-dd")
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(sub)
  }

  const sortedDates = Object.keys(grouped).sort()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-black">Kalender Studio</h1>
        <p className="text-gray-500 mt-1">
          Jadwal sesi yang telah dikonfirmasi. Sinkronisasi dengan Google Calendar.
        </p>
      </div>

      {sortedDates.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <CalendarDays className="h-12 w-12 text-gray-300" />
            <p className="text-gray-400 mt-4">Belum ada jadwal sesi.</p>
            <p className="text-sm text-gray-400 mt-1">
              Jadwal akan muncul setelah DP diverifikasi.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedDates.map((dateKey) => {
            const items = grouped[dateKey]
            return (
              <Card key={dateKey} className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-lovery-pink" />
                    {format(new Date(dateKey), "EEEE, dd MMMM yyyy")}
                    <Badge variant="secondary" className="ml-2 rounded-full">
                      {items.length} sesi
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {items.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/admin/pengajuan/${sub.id}`}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-xl bg-lovery-pink/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-lovery-pink" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-black truncate">
                            {sub.eventName}
                          </p>
                          <Badge
                            className={cn(
                              "rounded-full",
                              SUBMISSION_STATUS_COLORS[
                                sub.status as SubmissionStatus
                              ]
                            )}
                          >
                            {
                              SUBMISSION_STATUS_LABELS[
                                sub.status as SubmissionStatus
                              ]
                            }
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {sub.eventTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span className="truncate">{sub.location}</span>
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {sub.client.name} • {sub.package.name}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
