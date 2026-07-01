---
title: MVP Scope
module: Product Alignment
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Product Team
priority: CRITICAL
---

# 🎯 MVP Scope

## Pendahuluan

Dokumen ini menjelaskan batasan pengembangan Lovery Studio Management System versi pertama (Minimum Viable Product / MVP).

Tujuan utama MVP adalah menyelesaikan permasalahan operasional Lovery Photography yang saat ini masih dilakukan secara manual.

Seluruh pengembangan harus mengacu pada dokumen ini agar proyek tetap fokus dan dapat diselesaikan tepat waktu.

---

# Filosofi MVP

MVP bukan berarti aplikasi yang sederhana.

MVP adalah aplikasi yang hanya memiliki fitur yang benar-benar diperlukan untuk menyelesaikan masalah utama.

Setiap fitur yang tidak memberikan dampak langsung terhadap operasional studio tidak akan dimasukkan ke dalam versi pertama.

---

# Tujuan MVP

Versi pertama Lovery Studio Management System harus mampu:

- Mengurangi pekerjaan administratif admin.
- Mengurangi pencatatan manual.
- Menghubungkan WhatsApp, Google Calendar, dan Google Drive.
- Mempermudah proses Pengajuan Sesi.
- Mempermudah proses pembayaran.
- Menyediakan dashboard operasional yang sederhana.

---

# Permasalahan Utama Yang Diselesaikan

## Sebelum Sistem

Admin menggunakan:

- WhatsApp
- Google Calendar
- Spreadsheet
- Invoice Manual
- Google Drive

Semua dilakukan secara terpisah.

---

## Setelah Sistem

Admin cukup menggunakan Dashboard Lovery.

Website membantu menghubungkan seluruh proses administrasi.

---

# Fitur Yang Masuk MVP

## Website Klien

### Landing Page

✅ Portfolio

✅ Tentang Lovery

✅ Paket

✅ FAQ

✅ Ringkasan Terms & Conditions

✅ Tombol Ajukan Sesi

---

### Pengajuan Sesi

✅ Form Pengajuan

✅ Pilih Paket

✅ Pilih Add-On

✅ Ringkasan Harga

✅ Nomor WhatsApp

✅ Persetujuan Publikasi

---

### Status Pengajuan

✅ Timeline

✅ Status Pembayaran

✅ Detail Pengajuan

---

# Dashboard Admin

## Dashboard

✅ Workspace Tugas

✅ Agenda Hari Ini

✅ Pendapatan

✅ Aktivitas Terbaru

---

## Pengajuan

✅ Review

✅ Terima

✅ Tolak

✅ Penjadwalan Ulang

---

## Invoice

✅ Generate Otomatis

✅ Preview

✅ Edit

✅ Kirim

---

## Pembayaran

✅ Verifikasi DP

✅ Verifikasi Pelunasan

---

## Kalender Studio

✅ Sinkronisasi Google Calendar

---

## Pendapatan

✅ Revenue

✅ Cash In

✅ Outstanding

✅ Export Excel

---

## Google Drive

✅ Simpan Link

✅ Kirim WhatsApp

---

## Database Klien

✅ Riwayat Pengajuan

✅ Riwayat Pembayaran

✅ Catatan Internal

---

## Pengaturan

✅ WhatsApp

✅ Rekening

✅ QRIS

✅ Jam Operasional

✅ Template Invoice

✅ Template WhatsApp

---

# Integrasi Yang Masuk MVP

✅ WhatsApp

✅ Google Calendar

✅ Google Drive

---

# Fitur Yang Tidak Masuk MVP

Berikut fitur yang sengaja ditunda.

❌ Login Klien

Status pengajuan cukup menggunakan nomor pengajuan dan nomor WhatsApp.

---

❌ Payment Gateway

Pembayaran tetap dilakukan melalui transfer bank atau QRIS.

Verifikasi dilakukan manual oleh admin.

---

❌ Chat Dalam Website

Komunikasi tetap menggunakan WhatsApp.

---

❌ Manajemen Freelancer

Penjadwalan fotografer dan videografer tetap dilakukan di luar sistem.

Sistem hanya mengelola Pengajuan Sesi dan jadwal studio.

---

❌ AI Recommendation

Belum diperlukan pada versi pertama.

---

❌ Promo dan Voucher

Belum menjadi prioritas.

---

❌ Email Notification

Seluruh komunikasi menggunakan WhatsApp.

---

❌ Push Notification

Belum diperlukan.

---

❌ Integrasi Akuntansi

Belum diperlukan.

---

❌ Multi Cabang dengan Pengaturan Terpisah

Pada MVP seluruh operasional masih menggunakan satu dashboard.

---

# Keputusan Penting MVP

## Komunikasi

Media komunikasi utama:

WhatsApp.

---

## Kalender

Kalender resmi:

Google Calendar.

---

## Penyimpanan File

Google Drive.

---

## Pembayaran

Manual.

---

## Verifikasi

Manual oleh admin.

---

## Pendapatan

Berdasarkan pembayaran yang telah diverifikasi.

---

## Status

Status hanya berubah berdasarkan tindakan admin atau aturan sistem yang telah ditentukan.

---

# Prinsip Pengembangan

Selama MVP berlangsung.

Apabila muncul ide baru.

Lakukan langkah berikut.

```
Apakah fitur ini menyelesaikan masalah utama?

↓

YA

↓

Masuk MVP

──────────────

TIDAK

↓

Masuk Product Backlog
```

---

# Kriteria MVP Selesai

Versi pertama dianggap selesai apabila:

✅ Klien dapat mengajukan sesi.

✅ Admin dapat melakukan review.

✅ Invoice dibuat otomatis.

✅ WhatsApp membantu komunikasi.

✅ DP dapat diverifikasi.

✅ Google Calendar otomatis terisi setelah DP diverifikasi.

✅ Pendapatan tercatat otomatis.

✅ Google Drive dapat dikirim kepada klien.

✅ Dashboard mampu membantu operasional harian admin.

---

# Business View

MVP difokuskan pada digitalisasi proses administrasi Lovery Photography tanpa mengubah kebiasaan kerja yang sudah berjalan.

---

# UX View

Versi pertama harus sederhana, cepat dipelajari, dan nyaman digunakan oleh admin maupun klien.

---

# Developer Notes

- Jangan menambahkan fitur di luar ruang lingkup MVP tanpa persetujuan Product Owner.
- Semua perubahan ruang lingkup harus dicatat pada Decision Log.
- Fitur Future Version tidak boleh menghambat penyelesaian MVP.

---

# Ringkasan

Dokumen MVP Scope menjadi batas resmi ruang lingkup pengembangan Lovery Studio Management System versi pertama.

Dokumen ini memastikan seluruh tim tetap fokus menyelesaikan fitur yang benar-benar memberikan nilai bagi operasional Lovery Photography sebelum mengembangkan fitur lanjutan.www