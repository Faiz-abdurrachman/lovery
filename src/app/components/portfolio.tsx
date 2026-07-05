"use client"

import { motion } from "framer-motion"

const PORTFOLIO_ITEMS = [
  { id: 1, cat: "WEDDING", embedUrl: "https://www.instagram.com/p/DWV3cBNkQLG/embed" },
  { id: 2, cat: "CASUAL", embedUrl: "https://www.instagram.com/p/DZNQDxVkrGb/embed" },
  { id: 3, cat: "GRADUATION", embedUrl: "https://www.instagram.com/p/DYMb7EbEv3p/embed" },
  { id: 4, cat: "EVENTS", embedUrl: "https://www.instagram.com/p/DZDALVmGXuy/embed" },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 relative z-10 border-t-8 border-black bg-white overflow-hidden">
      
      {/* Background diagonal warning tape */}
      <div className="absolute top-10 -left-10 right-0 h-16 bg-lovery-pink -rotate-3 border-y-4 border-black z-0 flex items-center overflow-hidden opacity-50">
        <div className="whitespace-nowrap font-accent font-black text-black text-2xl tracking-[0.3em]">
          WARNING /// MASTERPIECES /// WARNING /// MASTERPIECES /// WARNING ///
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-20 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 12 }}
          className="mb-20 inline-block"
        >
          <h2 className="text-6xl lg:text-8xl font-heading font-black text-white bg-black px-6 py-2 -skew-x-12 shadow-[12px_12px_0_0_#E89CC9]">
            GALERI
          </h2>
          <h2 className="text-5xl lg:text-7xl font-heading font-black text-black mt-2 ml-10 uppercase tracking-tighter drop-shadow-[4px_4px_0_#E89CC9]">
            VISUAL KAMI
          </h2>
        </motion.div>

        {/* HORIZONTAL CAROUSEL LAYOUT */}
        <div className="flex overflow-x-auto gap-8 pb-12 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="relative group cursor-pointer transition-all duration-300 shrink-0 snap-center"
            >
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3" />
              <div className="relative border-4 border-black bg-white overflow-hidden flex flex-col z-10 w-[350px] sm:w-[400px]">
                <iframe 
                  src={item.embedUrl} 
                  width="100%" 
                  height="480" 
                  frameBorder="0" 
                  scrolling="no" 
                  className="bg-white"
                ></iframe>
                
                {/* Persona Style Badge at the bottom */}
                <div className="w-full bg-lovery-pink text-black border-t-4 border-black px-6 py-4 flex items-center justify-between">
                   <span className="font-accent font-black text-xl tracking-widest uppercase">{item.cat}</span>
                   <span className="font-bold text-xs uppercase bg-black text-white px-2 py-1">Instagram</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
