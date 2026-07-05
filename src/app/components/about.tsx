"use client"

import { motion } from "framer-motion"

export function About() {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Subtle text behind */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-heading font-bold text-black/[0.02] -z-10 select-none whitespace-nowrap">
            L O V E R Y
          </div>
          
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md text-black border border-white/50 text-xs font-bold tracking-widest mb-8">TENTANG KAMI</span>
          
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-black mt-6 leading-[1.1] tracking-tight">
            Eksklusivitas dalam <br />
            <span className="italic font-light text-gray-500">Setiap Frame</span>
          </h2>
          
          <p className="text-gray-600 mt-10 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto font-body">
            Lovery Photography adalah manifestasi dari apresiasi terhadap estetika dan waktu. Berbasis di Yogyakarta, kami memfokuskan diri pada dokumentasi momen yang intim, elegan, dan penuh makna. Setiap karya kami bukan sekadar gambar, melainkan warisan visual untuk generasi mendatang.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
