---
title: Feature Specification
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - SYSTEM_WORKFLOW.md
  - PAGE_STRUCTURE.md
  - ADMIN_JOURNEY.md
---

# 📦 Feature Specification

## Pendahuluan

Dokumen ini menjelaskan seluruh fitur yang terdapat pada Lovery Studio Management System.

Dokumen ini menjadi acuan utama dalam proses pengembangan aplikasi.

Setiap fitur dijelaskan berdasarkan tujuan, pengguna, alur penggunaan, serta aturan implementasinya.

---

# Filosofi

Fitur dibuat bukan untuk memperbanyak menu.

Setiap fitur harus menyelesaikan permasalahan nyata yang dialami oleh admin maupun klien.

Apabila suatu fitur tidak memberikan manfaat yang jelas, fitur tersebut tidak perlu dibuat pada versi awal (MVP).

---

# Kategori Fitur

Seluruh fitur dibagi menjadi dua kelompok utama.

```
Client Features

↓

Admin Features
```

---

# CLIENT FEATURES

---

# 1. Landing Page

## Tujuan

Menjadi media informasi utama mengenai Lovery Photography.

## Pengguna

Calon Klien

## Fungsi

- Melihat portfolio
- Mengenal Lovery
- Melihat layanan
- Melihat paket
- Membaca FAQ
- Membaca ringkasan Terms & Conditions
- Mengakses halaman Pengajuan Sesi

---

# 2. Daftar Paket

## Tujuan

Membantu klien memilih layanan yang sesuai.

## Fitur

- Filter kategori
- Detail paket
- Harga
- Add-On
- CTA Ajukan Sesi

---

# 3. Pengajuan Sesi

## Tujuan

Mengirim permintaan sesi kepada admin.

## Data

- Nama
- Nomor WhatsApp
- Instagram
- Paket
- Add-On
- Lokasi
- Tanggal
- Jam
- Request Khusus
- Persetujuan Publikasi

## Output

Status:

```
Menunggu Review
```

---

# 4. Status Pengajuan

## Tujuan

Memberikan transparansi kepada klien.

## Menampilkan

- Status terbaru
- Timeline aktivitas
- Status pembayaran
- Detail sesi

---

# ADMIN FEATURES

---

# 5. Dashboard Admin

## Tujuan

Pusat operasional studio.

## Workspace

- Tugas Hari Ini
- Agenda Hari Ini
- Pendapatan
- Aktivitas Terbaru

---

# 6. Manajemen Pengajuan

## Tujuan

Mengelola seluruh pengajuan sesi.

## Fitur

- Review pengajuan
- Terima
- Tolak
- Penjadwalan ulang
- Detail pengajuan
- Timeline

---

# 7. Invoice

## Tujuan

Membuat invoice secara otomatis.

## Fitur

- Generate invoice
- Edit invoice
- Preview invoice
- Kirim invoice
- Riwayat invoice

---

# 8. Pembayaran

## Tujuan

Mencatat pembayaran.

## Fitur

- Verifikasi DP
- Verifikasi pelunasan
- Riwayat pembayaran
- Outstanding

---

# 9. Kalender Studio

## Tujuan

Melihat seluruh jadwal studio.

## Fitur

- Agenda harian
- Agenda mingguan
- Sinkronisasi Google Calendar

---

# 10. Pendapatan

## Tujuan

Monitoring cashflow studio.

## Fitur

- Revenue
- Cash In
- Outstanding
- Grafik
- Export Excel

---

# 11. Database Klien

## Tujuan

Menyimpan histori seluruh klien.

## Fitur

- Pencarian
- Riwayat pengajuan
- Riwayat pembayaran
- Catatan internal

---

# 12. Pengaturan

## Tujuan

Mengatur konfigurasi sistem.

## Fitur

- Google Calendar
- WhatsApp
- Nomor Rekening
- QRIS
- Jam Operasional
- Template Invoice
- Template WhatsApp
- Reminder

---

# FITUR OTOMATIS

Website juga memiliki fitur otomatis yang berjalan di belakang layar.

---

## WhatsApp

Otomatis membuka WhatsApp ketika:

- Pengajuan diterima
- Pengajuan ditolak
- Penjadwalan ulang
- Invoice dikirim
- DP diterima
- Reminder
- Link Google Drive
- Ucapan terima kasih

---

## Google Calendar

Otomatis membuat event ketika:

```
DP Diverifikasi
```

---

## Timeline

Seluruh aktivitas tercatat otomatis.

---

## Reminder

Dashboard membuat reminder otomatis berdasarkan status.

---

## Revenue

Pendapatan dihitung otomatis setelah pembayaran diverifikasi.

---

## Add-On

Harga berubah otomatis.

Invoice diperbarui otomatis.

---

# MVP

Fitur yang wajib tersedia pada versi pertama.

✅ Landing Page

✅ Paket

✅ Pengajuan Sesi

✅ Status Pengajuan

✅ Dashboard

✅ Pengajuan

✅ Invoice

✅ Pembayaran

✅ Google Calendar

✅ WhatsApp

✅ Pendapatan

✅ Google Drive

✅ Pengaturan

---

# Future Version

Fitur yang belum masuk MVP.

- Payment Gateway
- Login Klien
- Email
- Push Notification
- AI Analytics
- Promo
- Voucher
- Multi Admin
- Integrasi Akuntansi
- Integrasi Google Drive API

---

# Business View

Seluruh fitur dirancang berdasarkan proses operasional Lovery Photography yang telah berjalan.

Website bertugas mengurangi pekerjaan administratif tanpa mengubah kebiasaan kerja studio.

---

# UX View

Setiap fitur harus sederhana, mudah dipahami, dan mengurangi jumlah langkah yang dilakukan pengguna.

---

# Developer Notes

- Hindari duplikasi fungsi.
- Gunakan komponen reusable.
- Seluruh fitur harus mengikuti Business Rules.
- Semua perubahan status harus memperbarui Dashboard dan Timeline.
- Semua integrasi harus bersifat modular agar mudah dikembangkan.

---

# Ringkasan

Feature Specification menjadi daftar resmi seluruh fitur yang terdapat pada Lovery Studio Management System.

Dokumen ini menjadi dasar penyusunan backlog, sprint, implementasi frontend, backend, pengujian, serta pengembangan fitur di masa mendatang.