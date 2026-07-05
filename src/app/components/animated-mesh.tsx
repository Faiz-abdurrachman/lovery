"use client"

import { motion } from "framer-motion"

export function AnimatedMeshBg() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-white pointer-events-none">
      {/* Halftone Dot Pattern (Khas Manga/Comic) */}
      <div 
        className="absolute inset-0 opacity-[0.05] z-0" 
        style={{ 
          backgroundImage: 'radial-gradient(#111111 2px, transparent 2px)', 
          backgroundSize: '20px 20px' 
        }}
      />
      
      {/* Dynamic Skewed Pink Slash Background */}
      <motion.div
        initial={{ x: "-100%", skewX: -20 }}
        animate={{ x: "-20%", skewX: -20 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-[20%] -bottom-[20%] left-0 w-[45vw] bg-lovery-pink z-0 shadow-[20px_0_0_0_#111111]"
      />

      {/* Floating Black Starburst (Pernak-Pernik Anime/Persona) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[15%] right-[15%] w-48 h-48 bg-black z-10 opacity-10"
        style={{ 
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' 
        }}
      />
      
      {/* Moving Text Marquee Background */}
      <div className="absolute top-[50%] -translate-y-1/2 w-[200vw] -skew-y-6 bg-black py-4 z-0 overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="whitespace-nowrap font-accent font-bold text-lovery-pink text-3xl tracking-[0.5em]"
        >
          LOVERY PHOTOGRAPHY // LOVERY PHOTOGRAPHY // LOVERY PHOTOGRAPHY // LOVERY PHOTOGRAPHY // LOVERY PHOTOGRAPHY // 
        </motion.div>
      </div>
    </div>
  )
}
