"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Presentation, Zap, Code2, PenTool, CheckCircle2, Rocket } from "lucide-react"

const slides = [
  {
    id: "pembukaan",
    title: "LOVERY PHOTOGRAPHY",
    subtitle: "Web Booking System & Dashboard",
    icon: <Presentation className="w-12 h-12 mb-4" />,
    content: (
      <div className="space-y-6 text-center">
        <p className="text-xl md:text-2xl font-bold bg-lovery-pink inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0_0_#111111]">
          "Mengotomatisasi Booking & Manajemen Sesi Foto"
        </p>
        <div className="flex justify-center mt-8">
          <img src="/logo bulat.png" alt="Lovery" className="w-48 h-48 border-4 border-black shadow-[8px_8px_0_0_#111111] -skew-y-3 hover:skew-y-0 transition-transform duration-300 bg-white" />
        </div>
      </div>
    ),
  },
  {
    id: "latar-belakang",
    title: "LATAR BELAKANG & RISET",
    subtitle: "Kenapa kita bikin ini?",
    icon: <Zap className="w-12 h-12 mb-4 text-yellow-400" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-red-200 border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] rotate-1 hover:rotate-0 transition-transform">
          <h3 className="font-heading font-black text-2xl uppercase mb-4 bg-white inline-block px-2 border-2 border-black">Problem</h3>
          <ul className="list-disc ml-6 space-y-2 font-bold text-lg">
            <li>Booking via WA sering salah format/typo.</li>
            <li>Admin pusing track jadwal & invoice DP.</li>
            <li>Status order & file drive tercerai-berai.</li>
          </ul>
        </div>
        <div className="bg-green-200 border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] -rotate-1 hover:rotate-0 transition-transform">
          <h3 className="font-heading font-black text-2xl uppercase mb-4 bg-white inline-block px-2 border-2 border-black">Insight</h3>
          <ul className="list-disc ml-6 space-y-2 font-bold text-lg">
            <li>Butuh form mandiri yang tervalidasi (Zod).</li>
            <li>Butuh Dashboard terpusat untuk kelola status.</li>
            <li>Klien bisa track status pesanan mandiri.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "proses-desain",
    title: "PROSES DESAIN",
    subtitle: "Persona, IA & Wireframe",
    icon: <PenTool className="w-12 h-12 mb-4 text-purple-400" />,
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111]">
          <h3 className="font-heading font-black text-xl uppercase mb-2 text-lovery-pink">Persona Utama</h3>
          <p className="font-bold text-lg">Pasangan Prewed, Wisudawan, dan Keluarga yang butuh reservasi fotografer secara instan, jelas paketnya, dan nggak ribet.</p>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4">
          <div className="min-w-[250px] bg-lovery-pink border-4 border-black p-4 shadow-[4px_4px_0_0_#111111]">
            <h4 className="font-black text-lg bg-white inline-block px-2 border-2 border-black mb-2">Step 1: Pilih Paket</h4>
            <p className="text-sm font-bold">Client memilih kategori dan paket foto.</p>
          </div>
          <ArrowRight className="my-auto shrink-0" />
          <div className="min-w-[250px] bg-yellow-300 border-4 border-black p-4 shadow-[4px_4px_0_0_#111111]">
            <h4 className="font-black text-lg bg-white inline-block px-2 border-2 border-black mb-2">Step 2: Add-Ons</h4>
            <p className="text-sm font-bold">Upselling (Extra edit, makeup, dll).</p>
          </div>
          <ArrowRight className="my-auto shrink-0" />
          <div className="min-w-[250px] bg-blue-300 border-4 border-black p-4 shadow-[4px_4px_0_0_#111111]">
            <h4 className="font-black text-lg bg-white inline-block px-2 border-2 border-black mb-2">Step 3: Dashboard</h4>
            <p className="text-sm font-bold">Admin approve & client bayar DP.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "solusi",
    title: "SOLUSI HIGH-FIDELITY",
    subtitle: "Neo-Brutalism Interface",
    icon: <Code2 className="w-12 h-12 mb-4 text-blue-500" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] hover:-translate-y-2 transition-transform">
          <h3 className="font-heading font-black text-2xl uppercase mb-4 underline decoration-lovery-pink decoration-4">Sisi Client</h3>
          <ul className="space-y-3 font-bold">
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> UI/UX sangat ekspresif & berani</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Form 5-langkah dinamis</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Halaman Cek Status (Live Tracking)</li>
          </ul>
        </div>
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] hover:-translate-y-2 transition-transform">
          <h3 className="font-heading font-black text-2xl uppercase mb-4 underline decoration-blue-500 decoration-4">Sisi Admin</h3>
          <ul className="space-y-3 font-bold">
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Dashboard Analytics Terpusat</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Manajemen Invoice & DP</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="text-green-500" /> Update Timeline sekali klik</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "testing",
    title: "TESTING & ITERASI",
    subtitle: "Bug Hunting & Solusi",
    icon: <Rocket className="w-12 h-12 mb-4 text-orange-500" />,
    content: (
      <div className="space-y-6 text-left">
        <div className="bg-red-100 border-4 border-red-500 p-6 shadow-[8px_8px_0_0_#111111]">
          <h3 className="font-heading font-black text-xl uppercase mb-2 text-red-600">Bug 1: Filter Pengingat Dashboard</h3>
          <p className="font-bold text-lg">Pesanan yang sudah COMPLETED tetap muncul di daftar "Yang Harus Dikerjakan". <br/><br/><span className="bg-green-400 text-black px-2 border-2 border-black">Fix: Modifikasi SQL Query filter di Supabase admin endpoint.</span></p>
        </div>
        <div className="bg-red-100 border-4 border-red-500 p-6 shadow-[8px_8px_0_0_#111111]">
          <h3 className="font-heading font-black text-xl uppercase mb-2 text-red-600">Bug 2: Unique Constraint Client ID</h3>
          <p className="font-bold text-lg">Gagal submit jika 2 klien baru dimasukkan (karena default clientNumber = ""). <br/><br/><span className="bg-green-400 text-black px-2 border-2 border-black">Fix: Generate Unique CLI-ID sebelum eksekusi Insert.</span></p>
        </div>
      </div>
    ),
  },
  {
    id: "refleksi",
    title: "REFLEKSI",
    subtitle: "Pelajaran yang Didapat",
    icon: <Presentation className="w-12 h-12 mb-4 text-green-500" />,
    content: (
      <div className="text-center space-y-6">
        <div className="bg-black text-white border-4 border-lovery-pink p-8 shadow-[12px_12px_0_0_#E89CC9] -skew-x-2">
          <p className="text-xl md:text-2xl font-bold leading-relaxed">
            "Tech stack modern (Next.js, Tailwind, Supabase) dipadukan dengan desain 
            <span className="text-lovery-pink mx-2">Neo-Brutalism</span> 
            menciptakan aplikasi yang nggak cuma fungsional, tapi punya karakter kuat dan sangat berkesan buat pengguna."
          </p>
        </div>
        <h3 className="text-4xl font-black uppercase mt-12 bg-white inline-block px-6 py-2 border-4 border-black shadow-[6px_6px_0_0_#111111]">
          Q & A
        </h3>
      </div>
    ),
  },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1))
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        nextSlide()
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [nextSlide, prevSlide])

  return (
    <div className="min-h-screen bg-gray-100 bg-[radial-gradient(#111111_2px,transparent_2px)] [background-size:32px_32px] overflow-hidden flex flex-col font-body">
      
      {/* Top Bar */}
      <div className="h-16 bg-black border-b-4 border-black flex items-center justify-between px-6 z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <img src="/logo bulat.png" alt="Logo" className="w-10 h-10 bg-white rounded-full border-2 border-white" />
          <span className="text-white font-heading font-black uppercase tracking-widest text-lg">Presentasi Proyek</span>
        </div>
        <div className="text-white font-bold bg-lovery-pink px-3 py-1 border-2 border-black text-black">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      {/* Main Slide Content */}
      <main className="flex-1 relative flex items-center justify-center p-4 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -100, rotate: -2 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            className="w-full max-w-5xl bg-white border-8 border-black shadow-[16px_16px_0_0_#111111] p-8 md:p-16 flex flex-col items-center justify-center min-h-[60vh] relative"
          >
            {/* Corner Decor */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-lovery-pink border-l-8 border-b-8 border-black" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-400 border-r-8 border-t-8 border-black" />

            <div className="text-center mb-10 flex flex-col items-center">
              {slides[currentSlide].icon}
              <h1 className="text-4xl md:text-6xl font-heading font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0_#E89CC9]">
                {slides[currentSlide].title}
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-gray-700 mt-2 border-b-4 border-black inline-block pb-1">
                {slides[currentSlide].subtitle}
              </h2>
            </div>

            <div className="w-full max-w-4xl">
              {slides[currentSlide].content}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Controls */}
      <div className="h-24 bg-white border-t-8 border-black flex items-center justify-between px-6 md:px-12 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-200 border-4 border-black p-4 shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] transition-all font-bold flex items-center gap-2 uppercase"
        >
          <ArrowLeft className="w-6 h-6" /> <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-10 h-10 border-4 border-black font-black flex items-center justify-center transition-all ${
                currentSlide === idx ? "bg-lovery-pink shadow-[4px_4px_0_0_#111111] -translate-y-1" : "bg-white hover:bg-gray-200"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-lovery-pink hover:bg-pink-400 border-4 border-black p-4 shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] transition-all font-bold flex items-center gap-2 uppercase"
        >
          <span className="hidden sm:inline">Selanjutnya</span> <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  )
}
