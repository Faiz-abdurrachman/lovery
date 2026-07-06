"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Presentation, Zap, Code2, PenTool, CheckCircle2, Rocket, Users, Route, Bug, ExternalLink, MessageSquare } from "lucide-react"

const slides = [
  // SLIDE 1: PEMBUKAAN
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

  // SLIDE 2: LATAR BELAKANG & PROBLEM
  {
    id: "problem",
    title: "LATAR BELAKANG",
    subtitle: "Mengapa kita butuh sistem ini?",
    icon: <Zap className="w-12 h-12 mb-4 text-yellow-400" />,
    content: (
      <div className="bg-red-200 border-4 border-black p-8 shadow-[12px_12px_0_0_#111111] rotate-1 hover:rotate-0 transition-transform">
        <h3 className="font-heading font-black text-3xl uppercase mb-6 bg-white inline-block px-3 border-2 border-black">The Problem</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="list-disc ml-6 space-y-4 font-bold text-lg">
            <li><span className="bg-white px-1">Miskomunikasi WA:</span> Format booking manual sering salah, bikin admin pusing nyatet.</li>
            <li><span className="bg-white px-1">Jadwal Bentrok:</span> Manajemen waktu sesi yang berantakan karena nggak ada kalender terpusat.</li>
          </ul>
          <ul className="list-disc ml-6 space-y-4 font-bold text-lg">
            <li><span className="bg-white px-1">Tracking DP Susah:</span> Tagihan nyampur sama chat personal, lupa siapa yang belum bayar.</li>
            <li><span className="bg-white px-1">Client Gelisah:</span> Sering nanya "Foto udah jadi belum min?" tiap hari.</li>
          </ul>
        </div>
      </div>
    ),
  },

  // SLIDE 3: RISET & INSIGHT
  {
    id: "insight",
    title: "RISET & INSIGHT",
    subtitle: "Mencari Solusi Terbaik",
    icon: <Users className="w-12 h-12 mb-4 text-blue-500" />,
    content: (
      <div className="bg-blue-200 border-4 border-black p-8 shadow-[12px_12px_0_0_#111111] -rotate-1 hover:rotate-0 transition-transform">
        <h3 className="font-heading font-black text-3xl uppercase mb-6 bg-white inline-block px-3 border-2 border-black text-black">The Solution</h3>
        <div className="space-y-4 font-bold text-lg text-black">
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 mt-1 shrink-0" /> 
            <span><strong>Formulir Pintar (Validasi Otomatis):</strong> Mencegah typo dan memastikan klien memilih paket & waktu yang valid.</span>
          </p>
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 mt-1 shrink-0" /> 
            <span><strong>Dashboard Manajemen:</strong> Admin bisa lihat antrean, approve pesanan, dan set tagihan dalam satu klik.</span>
          </p>
          <p className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 mt-1 shrink-0" /> 
            <span><strong>Live Tracking (Cek Status):</strong> Klien cuma butuh masukin ID Resi buat pantau pesanan mereka sampai selesai.</span>
          </p>
        </div>
      </div>
    ),
  },

  // SLIDE 4: PROSES DESAIN (PERSONA & JOURNEY)
  {
    id: "persona",
    title: "PERSONA & STORY",
    subtitle: "Siapa yang pakai sistem ini?",
    icon: <PenTool className="w-12 h-12 mb-4 text-purple-400" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111]">
          <h3 className="font-heading font-black text-xl uppercase mb-4 text-lovery-pink">Rina (Calon Pengantin)</h3>
          <p className="font-bold text-gray-700 mb-4">"Aku mau prewed bulan depan, sibuk kerja nggak sempat chat panjang-panjang, maunya langsung pilih paket dan bayar."</p>
          <div className="bg-lovery-pink text-black px-3 py-2 border-2 border-black font-black text-sm inline-block">NEEDS: Booking Cepat & Jelas</div>
        </div>
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111]">
          <h3 className="font-heading font-black text-xl uppercase mb-4 text-blue-500">Faiz (Admin Studio)</h3>
          <p className="font-bold text-gray-700 mb-4">"Gue capek ngingetin klien bayar DP dan ngerekap jadwal mingguan di Excel manual."</p>
          <div className="bg-blue-300 text-black px-3 py-2 border-2 border-black font-black text-sm inline-block">NEEDS: Dashboard Otomatis</div>
        </div>
      </div>
    ),
  },

  // SLIDE 5: INFORMATION ARCHITECTURE
  {
    id: "ia",
    title: "INFORMATION ARCHITECTURE",
    subtitle: "Alur Data Sistem",
    icon: <Route className="w-12 h-12 mb-4 text-green-500" />,
    content: (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 overflow-x-auto pb-4 items-center justify-center">
          <div className="min-w-[200px] bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_#111111] text-center">
            <h4 className="font-black text-lg text-lovery-pink mb-2">1. Frontend (Client)</h4>
            <p className="text-sm font-bold">Pilih Paket ➡️ Add-Ons ➡️ Data Diri ➡️ Checkout</p>
          </div>
          <ArrowRight className="shrink-0 w-8 h-8" />
          <div className="min-w-[200px] bg-black text-white border-4 border-black p-4 shadow-[4px_4px_0_0_#E89CC9] text-center">
            <h4 className="font-black text-lg mb-2">2. Supabase (DB)</h4>
            <p className="text-sm font-bold">Relational Data (Clients, Submissions, Timelines)</p>
          </div>
          <ArrowRight className="shrink-0 w-8 h-8" />
          <div className="min-w-[200px] bg-white border-4 border-black p-4 shadow-[4px_4px_0_0_#111111] text-center">
            <h4 className="font-black text-lg text-blue-500 mb-2">3. Admin Dashboard</h4>
            <p className="text-sm font-bold">Approval ➡️ Update Timeline ➡️ Completed</p>
          </div>
        </div>
      </div>
    ),
  },

  // SLIDE 6: DEMO PROTOTYPE
  {
    id: "prototype",
    title: "LIVE PROTOTYPE",
    subtitle: "Mari kita coba langsung!",
    icon: <ExternalLink className="w-12 h-12 mb-4 text-lovery-pink" />,
    content: (
      <div className="text-center space-y-8">
        <p className="text-xl font-bold max-w-2xl mx-auto">
          "Cerita yang menarik bukan hanya dari fitur, tapi dari pengalaman penggunanya. Silakan audiens mencoba langsung prototipe aplikasi kami."
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="/ajukan-sesi" target="_blank" className="bg-lovery-pink text-black border-4 border-black px-8 py-4 font-black uppercase text-xl shadow-[6px_6px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-1 transition-all flex items-center gap-2">
            Coba Booking Form <ExternalLink className="w-5 h-5" />
          </a>
          <a href="/status" target="_blank" className="bg-white text-black border-4 border-black px-8 py-4 font-black uppercase text-xl shadow-[6px_6px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-1 transition-all flex items-center gap-2">
            Coba Lacak Status <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </div>
    ),
  },

  // SLIDE 7: ITERASI 1 (UI/UX)
  {
    id: "iterasi-ui",
    title: "ITERASI DESAIN (UI)",
    subtitle: "Before - After",
    icon: <Code2 className="w-12 h-12 mb-4 text-orange-500" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-gray-200 border-4 border-black p-6 grayscale relative">
          <div className="absolute -top-4 -left-4 bg-black text-white font-black px-4 py-1 border-2 border-black rotate-[-10deg]">BEFORE</div>
          <h3 className="font-heading font-black text-xl mb-4 text-gray-700">Teks Overlap di Mobile</h3>
          <p className="font-bold text-gray-600 mb-4">Ukuran font hero terlalu besar dan line-height (leading) terlalu rapat, membuat tulisan bertumpuk tidak terbaca di HP.</p>
        </div>
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] relative">
          <div className="absolute -top-4 -left-4 bg-green-400 text-black font-black px-4 py-1 border-2 border-black rotate-[-10deg]">AFTER</div>
          <h3 className="font-heading font-black text-xl mb-4 text-lovery-pink">Responsive Typography</h3>
          <p className="font-bold text-gray-800">Menyesuaikan ukuran font (sm:text-[8rem]) dan merenggangkan line-height khusus layar mobile. Teks sekarang rapi dan tegas.</p>
        </div>
      </div>
    ),
  },

  // SLIDE 8: ITERASI 2 (BUG FIX)
  {
    id: "iterasi-bug",
    title: "ITERASI SISTEM (BUG FIX)",
    subtitle: "The Real World Problem",
    icon: <Bug className="w-12 h-12 mb-4 text-red-500" />,
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        <div className="bg-gray-200 border-4 border-black p-6 grayscale relative">
           <div className="absolute -top-4 -left-4 bg-black text-white font-black px-4 py-1 border-2 border-black rotate-[-10deg]">BEFORE</div>
          <h3 className="font-heading font-black text-xl mb-4 text-gray-700">Crash & Data Numpuk</h3>
          <ul className="list-disc ml-6 space-y-2 font-bold text-gray-600 text-sm">
            <li><strong>Dashboard:</strong> Pesanan yang sudah selesai (COMPLETED) masih menumpuk di notifikasi admin.</li>
            <li><strong>API:</strong> Gagal submit barengan karena constraint ID Klien berbenturan (Empty String).</li>
            <li><strong>Cache:</strong> Cek status mengembalikan error karena cache agresif dari Vercel.</li>
          </ul>
        </div>
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#111111] relative">
          <div className="absolute -top-4 -left-4 bg-lovery-pink text-black font-black px-4 py-1 border-2 border-black rotate-[-10deg]">AFTER</div>
          <h3 className="font-heading font-black text-xl mb-4 text-blue-500">System Robustness</h3>
          <ul className="list-disc ml-6 space-y-2 font-bold text-gray-800 text-sm">
            <li><strong>Dashboard:</strong> Filter data level database. Hanya tampil status APPROVED.</li>
            <li><strong>API:</strong> Generate UUID dan ID Klien secara presisi sebelum eksekusi Insert.</li>
            <li><strong>Cache:</strong> Force-dynamic API route agar fetch real-time.</li>
          </ul>
        </div>
      </div>
    ),
  },

  // SLIDE 9: REFLEKSI
  {
    id: "refleksi",
    title: "REFLEKSI & PELAJARAN",
    subtitle: "Apa yang kita pelajari?",
    icon: <Presentation className="w-12 h-12 mb-4 text-green-500" />,
    content: (
      <div className="text-center space-y-6">
        <div className="bg-black text-white border-4 border-lovery-pink p-8 shadow-[12px_12px_0_0_#E89CC9] -skew-x-2">
          <p className="text-xl md:text-2xl font-bold leading-relaxed">
            "Membangun aplikasi nyata bukan cuma soal UI yang cantik, tapi tentang bagaimana sistem merespon di bawah tekanan, menangani *edge-cases*, dan menyajikan pengalaman terbaik bagi klien maupun admin."
          </p>
        </div>
      </div>
    ),
  },

  // SLIDE 10: QNA
  {
    id: "qna",
    title: "TERIMA KASIH",
    subtitle: "Silakan bertanya jika ada",
    icon: <MessageSquare className="w-16 h-16 mb-4 text-lovery-pink animate-bounce" />,
    content: (
      <div className="text-center space-y-6 flex flex-col items-center">
        <h3 className="text-5xl font-black uppercase mt-4 bg-white inline-block px-8 py-4 border-4 border-black shadow-[8px_8px_0_0_#111111] hover:shadow-[4px_4px_0_0_#111111] transition-all">
          Sesi Q & A
        </h3>
        <p className="font-bold text-xl text-gray-600 mt-4">"Siapkan pertanyaan terbaik Anda!"</p>
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
            className="w-full max-w-5xl bg-white border-8 border-black shadow-[16px_16px_0_0_#111111] p-8 md:p-16 flex flex-col items-center justify-center min-h-[65vh] relative"
          >
            {/* Corner Decor */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-lovery-pink border-l-8 border-b-8 border-black" />
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-blue-400 border-r-8 border-t-8 border-black" />

            <div className="text-center mb-10 flex flex-col items-center">
              {slides[currentSlide].icon}
              <h1 className="text-4xl md:text-6xl font-heading font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0_#E89CC9] leading-tight">
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
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-white hover:bg-gray-200 border-4 border-black p-3 md:p-4 shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] transition-all font-bold flex items-center gap-2 uppercase"
        >
          <ArrowLeft className="w-6 h-6" /> <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex gap-2 overflow-x-auto max-w-[50vw] px-2 py-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-10 h-10 shrink-0 border-4 border-black font-black flex items-center justify-center transition-all ${
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
          className="disabled:opacity-50 disabled:cursor-not-allowed bg-lovery-pink hover:bg-pink-400 border-4 border-black p-3 md:p-4 shadow-[4px_4px_0_0_#111111] hover:shadow-[2px_2px_0_0_#111111] hover:translate-y-[2px] transition-all font-bold flex items-center gap-2 uppercase"
        >
          <span className="hidden sm:inline">Selanjutnya</span> <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </div>
  )
}
