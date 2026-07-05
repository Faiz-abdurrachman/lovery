"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { GlassCard } from "./glass-card"

function fmt(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n)
}

interface Pkg { id: string; name: string; category: string; description: string | null; price: number }

export function Services({ packages }: { packages: Pkg[] }) {
  const cats = [...new Set(packages.map((p) => p.category))]

  return (
    <section id="layanan" className="py-32 relative z-10 border-t-8 border-black bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 12 }}
          className="mb-20 inline-block"
        >
          <h2 className="text-5xl lg:text-7xl font-heading font-black text-white bg-black px-6 py-2 -skew-x-12 shadow-[8px_8px_0_0_#E89CC9]">
            LAYANAN
          </h2>
          <h2 className="text-4xl lg:text-6xl font-heading font-black text-black mt-2 ml-6 uppercase tracking-tighter drop-shadow-[4px_4px_0_#E89CC9]">
            PILIHAN PAKET
          </h2>
        </motion.div>

        {packages.length === 0 ? (
          <div className="text-center py-20 bg-gray-100 border-4 border-black shadow-[8px_8px_0_0_#111111]">
            <p className="text-2xl font-accent font-bold uppercase tracking-widest text-black">Belum ada paket tersedia.</p>
          </div>
        ) : (
          cats.map((cat, catIndex) => (
            <div key={cat} className="mb-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 border-b-8 border-black pb-4"
              >
                <div className="text-6xl font-heading font-black text-white bg-black px-4 py-2 shadow-[4px_4px_0_0_#E89CC9] skew-x-[-10deg]">0{catIndex + 1}</div>
                <h3 className="text-4xl lg:text-5xl font-heading font-black text-black uppercase tracking-widest">{cat}</h3>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {packages.filter((p) => p.category === cat).map((pkg, i) => (
                  <motion.div 
                    key={pkg.id} 
                    className="border-4 border-black bg-white p-6 md:p-8 flex flex-col group hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#111111] shadow-[8px_8px_0_0_#111111] transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, type: "spring" }}
                  >
                    {/* Decorative stripes */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-lovery-pink transform origin-bottom-left rotate-45 translate-x-8 -translate-y-8 border-l-4 border-black" />
                    
                    <div className="mb-8 relative z-10">
                      <p className="font-heading font-black text-black text-2xl lg:text-3xl uppercase tracking-tighter mb-4">{pkg.name}</p>
                      {pkg.description && (
                        <ul className="space-y-2 border-l-4 border-black pl-3 py-1">
                          {pkg.description.split(",").map((feature, idx) => {
                            const cleanFeature = feature.replace(/\.$/, "").trim();
                            if (!cleanFeature) return null;
                            return (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-lovery-pink font-black text-lg leading-none mt-0.5">»</span>
                                <span className="text-black font-accent font-bold leading-tight uppercase text-sm tracking-wider">{cleanFeature}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                    <div className="mt-auto pt-6 border-t-4 border-black border-dashed relative z-10">
                      <p className="text-lovery-pink font-heading font-black text-4xl drop-shadow-[2px_2px_0_#111111] tracking-tighter">{fmt(pkg.price)}</p>
                      <Link href={`/ajukan-sesi?pkg=${pkg.id}`} className="block mt-6">
                        <Button className="w-full rounded-none border-4 border-black py-6 text-xl font-heading font-black uppercase tracking-widest bg-black text-white hover:bg-lovery-pink hover:text-black transition-colors shadow-[4px_4px_0_0_#E89CC9] hover:shadow-[6px_6px_0_0_#111111] flex justify-between items-center px-4">
                          <span>Pilih Paket</span>
                          <ArrowRight className="h-6 w-6 stroke-[3]" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
