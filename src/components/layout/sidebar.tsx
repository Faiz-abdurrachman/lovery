"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Receipt,
  Calendar,
  DollarSign,
  Users,
  Settings,
  Camera,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "DASHBOARD", icon: LayoutDashboard },
  { href: "/admin/pengajuan", label: "SESI", icon: FileText },
  { href: "/admin/kalender", label: "KALENDER", icon: Calendar },
  { href: "/admin/pendapatan", label: "PENDAPATAN", icon: DollarSign },
  { href: "/admin/klien", label: "KLIEN", icon: Users },
  { href: "/admin/pengaturan", label: "PENGATURAN", icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col border-r-4 border-black bg-white z-40 relative shadow-[4px_0_0_0_#111111]",
        className
      )}
    >
      <Link
        href="/admin"
        className="flex items-center gap-3 px-6 py-6 border-b-4 border-black bg-lovery-pink"
      >
        <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shadow-[2px_2px_0_0_#111111] overflow-hidden">
          <img src="/LOGO.png" alt="Lovery" className="w-full h-full object-cover scale-110" />
        </div>
        <span className="font-heading font-black text-black text-xl tracking-widest uppercase mt-1">Lovery</span>
      </Link>

      <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-none text-base font-accent font-bold tracking-widest uppercase transition-all duration-200 border-2",
                isActive
                  ? "bg-black text-white border-black shadow-[4px_4px_0_0_#E89CC9] -skew-x-6 translate-x-2"
                  : "bg-white text-black border-transparent hover:border-black hover:bg-lovery-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="mt-0.5">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      
      {/* Decorative footer */}
      <div className="p-4 border-t-4 border-black bg-black">
        <p className="text-lovery-pink font-accent font-black text-xs tracking-[0.2em] uppercase text-center">
          /// SYSTEM ACTIVE ///
        </p>
      </div>
    </aside>
  )
}
