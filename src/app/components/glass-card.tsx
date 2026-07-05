"use client"

import { motion, HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  intensity?: "light" | "medium" | "heavy"
}

export function GlassCard({ children, className, intensity = "medium", ...props }: GlassCardProps) {
  const intensityClasses = {
    light: "bg-white/40 backdrop-blur-md border-white/40 shadow-sm",
    medium: "bg-white/60 backdrop-blur-2xl border-white/60 shadow-xl shadow-black/[0.03]",
    heavy: "bg-white/80 backdrop-blur-3xl border-white/80 shadow-2xl shadow-lovery-pink/5",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-like easing (easeOutExpo)
      className={cn(
        "rounded-[2.5rem] border overflow-hidden",
        intensityClasses[intensity],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
