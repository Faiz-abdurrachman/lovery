import { supabaseAdmin } from "@/lib/supabase-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, MapPin } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"
import type { SubmissionStatus } from "@prisma/client"
import { SUBMISSION_STATUS_LABELS, SUBMISSION_STATUS_COLORS } from "@/features/submission/constants/submission.constant"
import { cn } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminCalendarPage() {
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)

  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select("*, client:clients(name,phone), package:packages(name,category)")
    .gte("eventDate", monthStart.toISOString().split("T")[0])
    .not("status", "in", '("CANCELLED","REJECTED","COMPLETED")')
    .order("eventDate", { ascending: true })
    .limit(100)

  const items = submissions || []

  const grouped: Record<string, typeof items> = {}
  for (const sub of items) {
    const key = format(new Date(sub.eventDate), "yyyy-MM-dd")
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(sub)
  }
  const sortedDates = Object.keys(grouped).sort()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">Kalender Studio</h1>
        <p className="text-black font-accent font-bold uppercase tracking-widest mt-2">Jadwal sesi yang telah dikonfirmasi.</p>
      </div>

      {sortedDates.length === 0 ? (
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <CalendarDays className="h-12 w-12 text-black" />
            <p className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#111111] mt-4">
              Belum ada jadwal sesi.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sortedDates.map((dateKey) => {
            const dayItems = grouped[dateKey]
            return (
              <Card key={dateKey} className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
                <CardHeader className="pb-3">
                  <CardTitle className="font-heading font-black uppercase text-black text-2xl flex items-center gap-2">
                    <CalendarDays className="h-6 w-6 text-lovery-pink" />
                    {format(new Date(dateKey), "EEEE, dd MMMM yyyy")}
                    <Badge className="ml-2 rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest bg-black text-white hover:bg-black">
                      {dayItems.length} sesi
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {dayItems.map((sub) => (
                    <Link key={sub.id} href={`/admin/pengajuan/${sub.id}`} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-lovery-pink/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-lovery-pink" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-heading font-black text-black text-xl uppercase truncate">{sub.eventName}</p>
                          <Badge className={cn("rounded-none border-2 border-black shadow-[2px_2px_0_0_#111111] font-accent font-bold uppercase tracking-widest", SUBMISSION_STATUS_COLORS[sub.status as SubmissionStatus])}>
                            {SUBMISSION_STATUS_LABELS[sub.status as SubmissionStatus]}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="flex items-center gap-1 font-accent font-bold bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] uppercase tracking-widest text-xs">
                            <Clock className="h-3 w-3" />{sub.eventTime}
                          </span>
                          <span className="flex items-center gap-1 font-accent font-bold bg-black text-white px-2 py-1 shadow-[2px_2px_0_0_#E89CC9] uppercase tracking-widest text-xs">
                            <MapPin className="h-3 w-3" /><span className="truncate">{sub.location}</span>
                          </span>
                        </div>
                        <div className="mt-4 mb-1">
                          <span className="font-accent font-bold text-black border-2 border-black px-2 py-1 uppercase shadow-[2px_2px_0_0_#111111] inline-block text-xs">
                            {(sub.client as any)?.[0]?.name || sub.client?.name || ""} • {(sub.package as any)?.[0]?.name || sub.package?.name || ""}
                          </span>
                        </div>
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
