export function openWhatsApp(phone: string, message: string) {
  let cleanPhone = phone.replace(/[^0-9]/g, "")
  if (cleanPhone.startsWith("0")) {
    cleanPhone = "62" + cleanPhone.slice(1)
  }
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
  window.open(url, "_blank")
}

export const WhatsAppTemplates = {
  submissionAccepted: (name: string, invNumber: string) =>
    `Halo ${name}! 🎉\n\nPengajuan sesi Anda telah *diterima*.\n\nBerikut nomor invoice: *${invNumber}*\n\nSilakan lakukan pembayaran DP untuk mengamankan jadwal. Informasi rekening dan detail invoice akan kami kirimkan.\n\nTerima kasih,\nLovery Photography`,

  submissionRejected: (name: string, reason: string) =>
    `Halo ${name},\n\nMohon maaf, pengajuan sesi Anda belum dapat kami terima.\n\nAlasan: ${reason}\n\nSilakan hubungi kami jika ada pertanyaan.\n\nTerima kasih,\nLovery Photography`,

  invoiceReady: (name: string, invNumber: string, total: string, dp: string, packageName?: string) =>
    `Halo ${name},\n\nInvoice untuk pengajuan${packageName ? ` *${packageName}*` : ""} Anda sudah siap:\n\nNo. Invoice: *${invNumber}*\nTotal: *${total}*\nDP: *${dp}*\n\nSilakan lakukan pembayaran DP untuk mengamankan jadwal Anda.\n\nTerima kasih,\nLovery Photography`,

  dpVerified: (name: string, eventDate: string) =>
    `Halo ${name},\n\nPembayaran DP Anda telah *diverifikasi*.\n\nJadwal sesi Anda pada *${eventDate}* telah dikonfirmasi.\n\nKami akan menghubungi kembali menjelang hari H.\n\nTerima kasih,\nLovery Photography`,

  pelunasanReminder: (name: string, remaining: string) =>
    `Halo ${name},\n\nPengumuman: sisa pembayaran sebesar *${remaining}* mohon dilunasi maksimal H-1 sebelum sesi.\n\nTerima kasih,\nLovery Photography`,

  sessionReminder: (name: string, date: string, time: string, location: string) =>
    `Halo ${name},\n\n*Pengingat sesi* 📸\n\nBesok adalah jadwal sesi Anda:\n📅 ${date}\n⏰ ${time}\n📍 ${location}\n\nSampai jumpa!\nLovery Photography`,

  driveDelivered: (name: string, driveLink: string) =>
    `Halo ${name},\n\nHasil dokumentasi Anda sudah siap! 🎉\n\nBerikut link Google Drive:\n${driveLink}\n\nLink aktif selama 14 hari. Silakan diunduh.\n\nTerima kasih telah memilih Lovery Photography!\n\nSenang bisa mengabadikan momen Anda. 💕`,

  thankYou: (name: string) =>
    `Halo ${name},\n\nTerima kasih telah memilih Lovery Photography!\n\nKami senang bisa menjadi bagian dari momen spesial Anda. Sampai jumpa di sesi berikutnya. 💕`,

  rescheduleRequested: (name: string) =>
    `Halo ${name},\n\nMenindaklanjuti pengajuan sesi Anda, mohon maaf jadwal yang Anda pilih saat ini belum tersedia.\n\nApakah Anda berkenan untuk menjadwalkan ulang sesi ke hari atau jam lain? Silakan balas pesan ini untuk berdiskusi lebih lanjut.\n\nTerima kasih,\nLovery Photography`,
}
