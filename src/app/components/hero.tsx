"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-10">
        
        {/* TEXT CONTENT - AGGRESSIVE PERSONA STYLE */}
        <div className="flex-1 z-20 relative w-full">
          {/* Badge */}
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute -top-12 -left-6 bg-black text-white px-6 py-2 border-4 border-white font-accent font-bold text-xl z-30 shadow-[6px_6px_0_0_#E89CC9]"
          >
            TAKE YOUR HEART!
          </motion.div>

          {/* Massive Overlapping Typo */}
          <div className="relative font-heading font-black text-black leading-[0.8] tracking-tighter uppercase text-[4rem] sm:text-[8rem] lg:text-[10rem]">
            <motion.div 
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 12 }}
              className="relative z-10"
            >
              ABADIKAN
            </motion.div>
            <motion.div 
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 12 }}
              className="relative z-20 text-white bg-black w-fit px-6 sm:px-10 py-2 sm:py-3 -skew-x-12 -mt-4 sm:-mt-6 shadow-[8px_8px_0_0_#E89CC9] sm:shadow-[12px_12px_0_0_#E89CC9] ml-6 sm:ml-12 leading-none flex items-center"
            >
              <span className="translate-y-1">MOMEN</span>
            </motion.div>
            <motion.div 
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", damping: 12 }}
              className="relative z-10 text-white mt-4 [-webkit-text-stroke:2px_#111111] sm:[-webkit-text-stroke:3px_#111111] drop-shadow-[4px_4px_0_#111111] sm:drop-shadow-[8px_8px_0_#111111] ml-2 sm:ml-4"
            >
              SPESIAL
            </motion.div>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-black bg-white/90 p-4 border-2 border-black mt-8 text-lg sm:text-xl font-bold font-body max-w-lg shadow-[6px_6px_0_0_#111111] sm:shadow-[8px_8px_0_0_#111111]"
          >
            Kolektif visual dengan All-Female Crew. Kami membekukan estetika visual lewat perspektif perempuan yang berani, tajam, dan penuh memori.
          </motion.p>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", damping: 10 }}
            className="mt-10"
          >
            <Link href="/ajukan-sesi">
              <button className="relative px-8 sm:px-12 py-4 sm:py-6 bg-lovery-pink text-black font-accent font-bold text-xl sm:text-2xl uppercase tracking-widest border-4 border-black hover:-translate-y-2 hover:translate-x-2 transition-transform duration-200 shadow-[8px_8px_0_0_#111111] sm:shadow-[10px_10px_0_0_#111111] hover:shadow-[0_0_0_0_#111111] group">
                <span className="relative z-10 flex items-center gap-3">
                  AJUKAN SESI 
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" strokeWidth="4" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                {/* Diagonal cut decoration */}
                <div className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 bg-white border-l-4 border-b-4 border-black transform translate-x-1 -translate-y-1" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* BRUTALIST/MANGA IMAGE LAYOUT */}
        <motion.div 
          initial={{ opacity: 0, rotate: 10, scale: 0.8 }}
          animate={{ opacity: 1, rotate: -4, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 relative w-full h-[400px] sm:h-[600px] mt-12 lg:mt-0 z-20"
        >
          {/* Jagged Frame Background */}
          <div className="absolute inset-0 bg-black translate-x-6 translate-y-6" style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }} />
          
          <div className="absolute inset-0 border-8 border-black overflow-hidden bg-white" style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}>
            <img 
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop" 
              alt="Model" 
              className="w-full h-full object-cover scale-110 opacity-90 grayscale contrast-125 mix-blend-multiply"
            />
            {/* Duotone effect using mix-blend */}
            <div className="absolute inset-0 bg-lovery-pink mix-blend-screen opacity-60" />
            
            {/* Manga Style Action Lines / Decoration */}
            <div className="absolute bottom-10 right-10 bg-white border-4 border-black text-black font-accent font-black text-4xl p-4 -rotate-12">
              WOW!!
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
