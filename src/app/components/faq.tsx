"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GlassCard } from "./glass-card"

const FAQS = [
  { q: "Bagaimana cara mereservasi jadwal?", a: "Klik tombol 'Mulai Sesi Anda'. Anda akan diarahkan ke form reservasi pintar kami. Setelah data terisi, konsultan kami akan menghubungi Anda secara personal melalui WhatsApp." },
  { q: "Apakah tersedia penambahan layanan di luar paket?", a: "Tentu. Kami menyediakan opsi fleksibel seperti penambahan waktu sesi, pengadaan drone, hingga videografi sinematik. Semua harga tertera transparan tanpa biaya tersembunyi." },
  { q: "Bagaimana prosedur administrasinya?", a: "Setelah reservasi dikonfirmasi, Anda akan menerima invoice digital resmi. Penjadwalan akan terkunci setelah pembayaran Down Payment via QRIS atau Transfer Bank diselesaikan." },
  { q: "Kapan saya dapat menerima hasil kurasi foto?", a: "Seluruh foto mentah akan tersedia maksimal H+1. Untuk foto yang telah melalui proses kurasi dan retouching warna, estimasi pengerjaan adalah 3-7 hari kerja tergantung dari jenis paket." },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-32 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/40 backdrop-blur-md text-black border border-white/50 text-xs font-bold tracking-widest mb-6">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black tracking-tight">Informasi Esensial</h2>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map(({ q, a }, i) => (
            <GlassCard 
              key={q} 
              intensity="heavy"
              className="group"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full px-8 py-8 text-left flex items-center justify-between cursor-pointer focus:outline-none"
                aria-expanded={openIndex === i}
              >
                <span className="font-heading font-bold text-black text-xl tracking-tight pr-8">{q}</span>
                <motion.div 
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 text-gray-600 text-base leading-relaxed border-t border-black/5 mt-2">
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
