import Link from "next/link"

export default function SyaratKetentuanPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto px-4 prose prose-gray">
        <h1 className="text-3xl font-bold text-black mb-8">Syarat & Ketentuan</h1>
        <h2 className="text-xl font-semibold mt-6">1. Pengajuan Sesi</h2>
        <p>Pengajuan sesi tidak menjamin ketersediaan jadwal. Admin akan melakukan peninjauan dan konfirmasi melalui WhatsApp.</p>
        <h2 className="text-xl font-semibold mt-6">2. Pembayaran</h2>
        <p>DP wajib dibayarkan untuk mengamankan jadwal. Pelunasan maksimal H-1 sebelum sesi. Pembayaran dilakukan melalui transfer bank atau QRIS.</p>
        <h2 className="text-xl font-semibold mt-6">3. Pembatalan</h2>
        <p>Pembatalan setelah DP dibayarkan akan mengikuti kebijakan refund Lovery Photography. Hubungi admin melalui WhatsApp untuk detail.</p>
        <h2 className="text-xl font-semibold mt-6">4. Hasil Foto</h2>
        <p>Hasil foto dikirim melalui Google Drive. Link aktif selama 14 hari untuk paket reguler dan 30 hari untuk paket premium.</p>
        <h2 className="text-xl font-semibold mt-6">5. Publikasi</h2>
        <p>Dengan menyetujui publikasi, Anda mengizinkan Lovery Photography menggunakan hasil foto untuk portfolio dan media sosial.</p>
        <div className="mt-12">
          <Link href="/ajukan-sesi" className="text-lovery-pink underline font-medium">
            ← Kembali ke Form Pengajuan
          </Link>
        </div>
      </div>
    </div>
  )
}
