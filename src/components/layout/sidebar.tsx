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
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/pengajuan",
    label: "Pengajuan",
    icon: FileText,
  },
  {
    href: "/admin/invoice",
    label: "Invoice",
    icon: Receipt,
  },
  {
    href: "/admin/kalender",
    label: "Kalender",
    icon: Calendar,
  },
  {
    href: "/admin/pendapatan",
    label: "Pendapatan",
    icon: DollarSign,
  },
  {
    href: "/admin/klien",
    label: "Klien",
    icon: Users,
  },
  {
    href: "/admin/pengaturan",
    label: "Pengaturan",
    icon: Settings,
  },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-200 bg-white",
        className
      )}
    >
      <Link
        href="/admin"
        className="flex items-center gap-3 px-6 py-5 border-b border-gray-100"
      >
        <div className="w-9 h-9 rounded-lg bg-lovery-pink/20 flex items-center justify-center shrink-0">
          <Camera className="h-5 w-5 text-lovery-pink" />
        </div>
        <span className="font-semibold text-black text-sm">Lovery</span>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-lovery-pink/10 text-lovery-pink"
                  : "text-gray-600 hover:bg-gray-50 hover:text-black"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
