"use client"

import { signOut } from "next-auth/react"
import { Menu, LogOut, ShieldAlert } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "@/components/layout/sidebar"
import { motion } from "framer-motion"

export function AdminHeader({ userName }: { userName?: string | null }) {

  const initials = (userName || "AD")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-4 border-black bg-white px-4 lg:px-6 shadow-[0_4px_0_0_#111111]">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger className="lg:hidden p-2 rounded-none border-2 border-black hover:bg-lovery-pink hover:shadow-[2px_2px_0_0_#111111] transition-all" aria-label="Buka menu">
            <Menu className="h-5 w-5 text-black" />
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 border-r-4 border-black rounded-none">
            <Sidebar className="h-full" />
          </SheetContent>
        </Sheet>
        
        {/* Scrolling Marquee / Persona Alert text */}
        <div className="hidden lg:flex items-center bg-black px-4 py-1.5 -skew-x-12 overflow-hidden w-64 shadow-[4px_4px_0_0_#E89CC9]">
          <ShieldAlert className="w-4 h-4 text-lovery-pink mr-3 animate-pulse shrink-0" />
          <motion.div 
            animate={{ x: [0, -200] }} 
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="whitespace-nowrap font-accent font-black text-lovery-pink text-xs tracking-widest uppercase"
          >
            ADMIN TERMINAL SECURED /// RESTRICTED AREA /// 
          </motion.div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className={cn(
          "flex items-center gap-3 px-3 py-1.5 border-2 border-black rounded-none text-sm font-medium",
          "bg-white text-black hover:bg-lovery-pink hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#111111] transition-all cursor-pointer",
          "outline-none select-none"
        )}>
          <span className="text-sm font-accent font-bold uppercase tracking-widest hidden sm:block mt-0.5">
            {userName || "ADMIN"}
          </span>
          <Avatar className="h-8 w-8 rounded-none border border-black shadow-[2px_2px_0_0_#111111]">
            <AvatarFallback className="bg-black text-lovery-pink text-xs font-black rounded-none">
              {initials}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40 rounded-none border-4 border-black shadow-[6px_6px_0_0_#111111] p-0">
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-white bg-black hover:bg-error hover:text-white rounded-none cursor-pointer p-3 font-accent font-bold uppercase tracking-widest focus:bg-error focus:text-white"
          >
            <LogOut className="mr-3 h-4 w-4" />
            LOGOUT
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
