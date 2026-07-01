"use client"

import { useState } from "react"

const FAQS = [
  { q: "Bagaimana cara mengajukan sesi?", a: "Klik tombol 'Ajukan Sesi' di website, pilih paket, isi data diri, dan kirim. Admin akan meninjau pengajuan Anda dan menghubungi via WhatsApp." },
  { q: "Apakah saya bisa memilih lebih dari satu add-on?", a: "Ya, Anda bisa memilih beberapa add-on sekaligus seperti Drone, Extra Jam, Video Highlight, dan lainnya. Harga akan dihitung otomatis." },
  { q: "Bagaimana proses pembayaran?", a: "Setelah pengajuan diterima, Anda akan menerima invoice via WhatsApp. Pembayaran dilakukan via transfer bank atau QRIS. DP wajib dibayar untuk mengamankan jadwal." },
  { q: "Berapa lama proses editing?", a: "Estimasi editing bervariasi tergantung paket. Status pengajuan Anda akan diperbarui secara real-time sehingga Anda selalu tahu progresnya." },
  { q: "Bagaimana saya menerima hasil foto?", a: "Hasil akan dikirim melalui Google Drive. Link akan dikirim via WhatsApp. Link aktif selama 14 hari (paket reguler) atau 30 hari (paket premium)." },
  { q: "Apakah bisa reschedule?", a: "Ya, Anda bisa mendiskusikan perubahan jadwal dengan admin melalui WhatsApp. Admin akan membantu menyesuaikan jadwal sesuai ketersediaan." },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-lovery-pink uppercase tracking-wide">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold text-black mt-3">Pertanyaan Umum</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div key={q} className="bg-white rounded-2xl border border-gray-100">
              <button
                onClick={() => toggle(i)}
                className="w-full px-6 py-4 text-left font-medium text-black flex items-center justify-between cursor-pointer"
                aria-expanded={openIndex === i}
              >
                {q}
                <span className="text-gray-400 text-lg">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
