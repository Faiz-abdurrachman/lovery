---
title: WhatsApp Integration
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - INVOICE.md
  - PEMBAYARAN.md
  - STATUS_PENGAJUAN.md
---

# 💬 WhatsApp Integration

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | WhatsApp Integration |
| Aktor | Admin, Klien |
| Media | WhatsApp |
| Otomatis | Ya |
| Keputusan Admin | Tetap Dibutuhkan |
| Integrasi | Pengajuan, Invoice, Pembayaran, Reminder |

---

# Pendahuluan

WhatsApp merupakan media komunikasi resmi antara Lovery Photography dan seluruh klien.

Website tidak dibuat untuk menggantikan WhatsApp.

Sebaliknya, website bertugas mengotomatisasi aktivitas administrasi sehingga komunikasi tetap berlangsung melalui WhatsApp.

Seluruh komunikasi setelah Pengajuan Sesi diterima dilakukan menggunakan WhatsApp.

---

# Tujuan

Modul ini dibuat untuk:

- Mempercepat respon admin.
- Mengurangi pekerjaan mengetik pesan yang sama berulang kali.
- Menjaga format komunikasi tetap profesional.
- Mengurangi risiko admin lupa menghubungi klien.

---

# Filosofi

WhatsApp adalah media komunikasi.

Website adalah media administrasi.

Keduanya saling melengkapi.

---

# Kapan WhatsApp Digunakan?

WhatsApp digunakan ketika:

✅ Pengajuan diterima

✅ Pengajuan ditolak

✅ Admin meminta penjadwalan ulang

✅ Invoice dikirim

✅ DP telah diverifikasi

✅ Reminder pelunasan

✅ Reminder H-1

✅ Google Drive dikirim

✅ Ucapan terima kasih

---

# Yang Dilakukan Sistem

Sistem membantu:

- Membuat isi pesan.
- Mengisi nama klien otomatis.
- Mengisi nomor invoice otomatis.
- Mengisi nominal pembayaran.
- Mengisi link invoice.
- Mengisi status terbaru.

Admin tidak perlu mengetik ulang.

---

# Yang Dilakukan Admin

Admin tetap memiliki kendali penuh.

Admin dapat:

- Melihat preview pesan.
- Mengubah isi pesan sebelum dikirim.
- Membatalkan pengiriman.
- Mengirim ulang apabila diperlukan.

---

# Alur Pengiriman

```text
Admin Menekan Tombol

↓

Sistem Membuat Template Pesan

↓

Preview Ditampilkan

↓

Admin Konfirmasi

↓

WhatsApp Dibuka

↓

Pesan Siap Dikirim

↓

Admin Menekan Tombol Kirim
```

Website **tidak mengirim pesan tanpa konfirmasi admin**.

---

# Template Pesan

## 1. Pengajuan Diterima

```
Halo Kak {{Nama}} 👋

Terima kasih telah mengajukan sesi di Lovery Photography.

Pengajuan Kakak sudah kami terima.

Invoice telah kami siapkan.

Silakan melakukan pembayaran DP sesuai invoice terlampir.

Apabila ada pertanyaan silakan langsung membalas chat ini.

Terima kasih 🤍
```

---

## 2. Pengajuan Ditolak

```
Halo Kak {{Nama}}

Mohon maaf.

Setelah kami lakukan pengecekan, tanggal yang diajukan belum dapat kami layani.

Silakan menghubungi admin apabila ingin mendiskusikan jadwal lain.

Terima kasih.
```

---

## 3. Request Reschedule

```
Halo Kak {{Nama}}

Terima kasih atas pengajuannya.

Mohon maaf, jadwal yang dipilih belum dapat kami layani.

Silakan diskusikan jadwal alternatif bersama admin melalui chat ini.

Terima kasih 🤍
```

---

## 4. DP Diterima

```
Halo Kak {{Nama}}

Pembayaran DP sudah kami terima.

Terima kasih.

Jadwal Kakak sudah resmi masuk ke kalender Lovery Photography.

Sampai bertemu pada hari sesi 🤍
```

---

## 5. Reminder Pelunasan

```
Halo Kak {{Nama}}

Kami mengingatkan bahwa pelunasan dilakukan maksimal H-1 sebelum sesi.

Apabila sudah melakukan pembayaran silakan kirim bukti transfer melalui chat ini.

Terima kasih.
```

---

## 6. Reminder H-1

```
Halo Kak {{Nama}}

Besok adalah jadwal sesi Lovery Photography.

Jangan lupa hadir sesuai waktu yang telah disepakati.

Sampai bertemu besok 🤍
```

---

## 7. Pengiriman Google Drive

```
Halo Kak {{Nama}}

Berikut hasil dokumentasi Kakak.

{{Link Google Drive}}

Link aktif sesuai ketentuan paket.

Terima kasih telah mempercayakan momen spesial kepada Lovery Photography 🤍
```

---

## 8. Ucapan Terima Kasih

```
Terima kasih telah menggunakan layanan Lovery Photography.

Semoga hasil dokumentasi kami dapat menjadi kenangan terbaik untuk Kakak.

Sampai bertemu di sesi berikutnya 🤍
```

---

# Dashboard

Dashboard harus menampilkan:

- Pesan belum dikirim
- Pengiriman gagal
- Reminder hari ini
- Reminder besok

---

# Validasi

WhatsApp hanya dapat dikirim apabila:

- Nomor WhatsApp tersedia.
- Pengajuan masih aktif.
- Template tersedia.

---

# Edge Case

## Nomor Salah

Admin dapat mengubah nomor WhatsApp.

Pesan dapat dikirim ulang.

---

## Klien Ganti Nomor

Nomor diperbarui pada data klien.

Seluruh pengiriman berikutnya menggunakan nomor terbaru.

---

## Admin Tidak Jadi Mengirim

Admin dapat membatalkan sebelum WhatsApp dibuka.

Status pengajuan tidak berubah.

---

## WhatsApp Tidak Bisa Dibuka

Sistem menampilkan notifikasi.

Admin dapat mencoba kembali.

---

# UX Rules

- Preview pesan wajib ditampilkan.
- Nama klien selalu terisi otomatis.
- Nomor invoice otomatis.
- Nominal otomatis.
- Bahasa tetap sopan.
- Emoji digunakan secukupnya.
- Admin maksimal 2 klik untuk mengirim pesan.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- WhatsApp Business API.
- Pengiriman otomatis tanpa membuka WhatsApp Web.
- Template multi bahasa.
- Broadcast reminder.
- Pengiriman dokumen PDF langsung melalui API.

---

# Ringkasan

WhatsApp merupakan media komunikasi utama Lovery Studio Management System.

Website bertugas mengotomatisasi penyusunan pesan, menghubungkan setiap perubahan status dengan komunikasi kepada klien, serta mengurangi pekerjaan admin tanpa menghilangkan kendali penuh terhadap setiap pesan yang dikirim.