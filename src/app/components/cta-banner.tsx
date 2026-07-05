"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function CtaBanner() {
  return (
    <section className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-black rounded-[3rem] p-12 lg:p-24 text-center overflow-hidden shadow-2xl"
        >
          {/* Glass Orb inside Black Box */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-lovery-pink/30 rounded-full blur-[100px] pointer-events-none" 
          />
          
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-[1.1]">
              Wujudkan Visual <br />
              <span className="text-lovery-pink italic font-light">Impian Anda</span>
            </h2>
            <p className="text-gray-400 mt-8 max-w-lg mx-auto text-lg leading-relaxed">
              Tim profesional kami siap mengubah konsep Anda menjadi karya seni fotografi yang mewah dan tak terlupakan.
            </p>
            <Link href="/ajukan-sesi">
              <Button className="mt-12 rounded-full bg-white text-black hover:bg-gray-100 px-10 py-8 text-lg font-accent tracking-wide hover:scale-105 transition-transform duration-300 shadow-xl group">
                Reservasi Jadwal
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
