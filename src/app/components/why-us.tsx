"use client"

import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"

const REASONS = [
  { title: "Profesional", desc: "Fotografer berpengalaman yang memahami teknis dan estetika setiap momen penting Anda." },
  { title: "Personal", desc: "Pendekatan hangat dan komprehensif — bagi kami Anda bukan sekadar klien, tapi subjek seni." },
  { title: "Hasil Berkualitas", desc: "Editing dengan sentuhan warna yang tak lekang oleh waktu dan elegan." },
  { title: "Proses Mudah", desc: "Sistem reservasi yang ringkas dan komunikasi asisten digital via WhatsApp." },
  { title: "Transparan", desc: "Sistem harga jelas tanpa biaya tersembunyi. Status progres selalu ter-update." },
  { title: "Tepat Waktu", desc: "Dedikasi tinggi terhadap tenggat waktu. Hasil karya selalu tepat pada waktunya." },
]

export function WhyUs() {
  return (
    <section className="py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md text-black border border-white/50 text-xs font-bold tracking-widest mb-6">MENGAPA LOVERY</span>
          <h2 className="text-4xl lg:text-6xl font-heading font-bold text-black tracking-tight">Filosofi Kerja Kami</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map(({ title, desc }, i) => (
            <GlassCard 
              key={title} 
              intensity="light"
              className="p-10 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
            >
              <div className="absolute -right-6 -top-10 text-[10rem] font-accent font-bold text-black/[0.02] group-hover:text-lovery-pink/[0.05] transition-colors duration-500 select-none">
                0{i + 1}
              </div>
              <div className="relative z-10 mt-12">
                <h3 className="font-heading font-bold text-black text-2xl tracking-tight mb-4">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
