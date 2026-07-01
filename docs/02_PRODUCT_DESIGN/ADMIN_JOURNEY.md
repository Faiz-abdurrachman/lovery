---
title: Admin Journey
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - SYSTEM_WORKFLOW.md
  - DASHBOARD_ADMIN.md
  - STATUS_PENGAJUAN.md
---

# 👨‍💻 Admin Journey

## Pendahuluan

Dokumen ini menjelaskan perjalanan seorang admin saat menggunakan Lovery Studio Management System.

Berbeda dengan Client Journey yang berfokus pada pengalaman calon klien, Admin Journey menggambarkan aktivitas operasional studio dari awal hari hingga seluruh pekerjaan selesai.

Dokumen ini menjadi acuan utama dalam merancang Dashboard Admin, Workspace Admin, serta alur kerja operasional studio.

---

# Filosofi

Admin tidak boleh dipaksa mengingat pekerjaan.

Website harus membantu admin mengetahui:

- apa yang harus dikerjakan
- pekerjaan yang paling penting
- pekerjaan yang hampir terlambat
- pekerjaan yang sudah selesai

Dashboard bertindak sebagai **asisten operasional studio**.

---

# Gambaran Besar Journey

```
Login

↓

Dashboard

↓

Melihat Tugas Hari Ini

↓

Menyelesaikan Pengajuan Baru

↓

Verifikasi Pembayaran

↓

Memantau Kalender

↓

Memantau Editing

↓

Mengirim Google Drive

↓

Melihat Pendapatan

↓

Logout
```

---

# Tahap 1

# Login

Admin masuk menggunakan akun resmi Lovery Photography.

Setelah berhasil login.

↓

Langsung diarahkan ke Dashboard.

---

# Tahap 2

# Dashboard

Dashboard menjadi halaman pertama.

Admin langsung melihat.

```
🔥 Yang Harus Dikerjakan Hari Ini
```

Contoh.

```
Review Pengajuan

Verifikasi DP

Reminder Pelunasan

Upload Google Drive
```

Admin tidak perlu membuka menu lain terlebih dahulu.

---

# Tahap 3

# Review Pengajuan Baru

Admin membuka daftar:

```
Menunggu Review
```

Setiap pengajuan menampilkan:

- Nama
- Paket
- Lokasi
- Tanggal
- Jam
- Ringkasan

Admin memiliki tiga aksi.

```
Terima

Tolak

Penjadwalan Ulang
```

---

# Tahap 4

# Mengirim Invoice

Apabila pengajuan diterima.

↓

Sistem membuat invoice.

↓

Preview invoice ditampilkan.

↓

Admin melakukan pengecekan.

↓

Klik.

```
Kirim Invoice
```

↓

WhatsApp terbuka otomatis.

---

# Tahap 5

# Verifikasi DP

Klien mengirim bukti transfer melalui WhatsApp.

↓

Admin membuka detail pengajuan.

↓

Klik.

```
Verifikasi DP
```

↓

Sistem otomatis.

- mencatat transaksi
- memperbarui status
- membuat event Google Calendar
- memperbarui dashboard

---

# Tahap 6

# Memantau Kalender

Dashboard menampilkan.

```
Agenda Hari Ini
```

Admin dapat melihat.

- waktu
- lokasi
- kategori
- status pembayaran

Klik agenda.

↓

Masuk ke detail pengajuan.

---

# Tahap 7

# Hari Pelaksanaan

Setelah sesi selesai.

Admin membuka pengajuan.

↓

Klik.

```
Selesaikan Sesi
```

↓

Status berubah.

```
Proses Editing
```

---

# Tahap 8

# Memantau Editing

Dashboard menampilkan.

```
Proses Editing
```

Admin dapat mengetahui.

- siapa yang masih proses
- sudah berapa hari
- mana yang perlu dikirim

---

# Tahap 9

# Mengirim Google Drive

Admin menempelkan link Google Drive.

↓

Klik.

```
Simpan & Kirim
```

↓

WhatsApp terbuka.

↓

Status berubah.

```
Hasil Dikirim
```

---

# Tahap 10

# Menyelesaikan Pengajuan

Admin memastikan.

- hasil terkirim
- komunikasi selesai

↓

Klik.

```
Tandai Selesai
```

↓

Pengajuan masuk arsip.

---

# Tahap 11

# Monitoring Pendapatan

Admin membuka halaman.

```
Pendapatan
```

Melihat.

- DP Hari Ini
- Pelunasan
- Cash In
- Outstanding

Apabila diperlukan.

↓

Export Excel.

---

# Workspace Dashboard

Dashboard terdiri dari empat workspace utama.

```
🔥 Tugas Hari Ini

↓

📅 Agenda Hari Ini

↓

💰 Pendapatan

↓

📝 Aktivitas Terbaru
```

Admin menghabiskan sebagian besar waktu pada empat workspace tersebut.

---

# Pain Point yang Diselesaikan

## Sebelum Sistem

❌ Admin harus membuka banyak aplikasi.

- WhatsApp
- Spreadsheet
- Google Calendar
- Invoice
- Google Drive

---

## Setelah Sistem

Admin cukup membuka Dashboard.

Seluruh pekerjaan tersedia dalam satu tempat.

---

# UX Rules

- Dashboard menjadi halaman utama.
- Maksimal dua klik menuju pekerjaan.
- Tidak ada proses yang mengharuskan admin berpindah aplikasi, kecuali WhatsApp dan Google Drive.
- Semua aksi utama menggunakan tombol yang jelas.
- Dashboard harus tetap nyaman digunakan di laptop maupun tablet.

---

# Business View

Admin Journey dirancang untuk mengurangi pekerjaan administratif yang berulang dan memusatkan seluruh operasional studio pada satu dashboard.

---

# UX View

Admin harus dapat menyelesaikan pekerjaan tanpa harus mengingat urutan proses.

Setiap halaman harus selalu memberikan petunjuk mengenai langkah berikutnya.

---

# Developer Notes

- Dashboard adalah entry point setelah login.
- Seluruh task menggunakan Action Card.
- Semua perubahan status memperbarui Dashboard secara real-time.
- Semua aktivitas masuk ke Timeline.
- Dashboard tidak hanya menampilkan data, tetapi juga prioritas pekerjaan.

---

# Ringkasan

Admin Journey menggambarkan seluruh aktivitas operasional admin mulai dari login hingga seluruh pekerjaan harian selesai.

Dokumen ini menjadi dasar dalam merancang Dashboard Admin, Workspace Admin, serta pengalaman kerja yang cepat, sederhana, dan efisien sehingga admin dapat fokus melayani klien tanpa terbebani pekerjaan administratif.