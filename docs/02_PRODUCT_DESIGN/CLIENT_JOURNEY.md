---
title: Client Journey
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - SYSTEM_WORKFLOW.md
  - PENGAJUAN_SESI.md
  - STATUS_PENGAJUAN.md
---

# 👤 Client Journey

## Pendahuluan

Dokumen ini menjelaskan perjalanan pengguna (Client Journey) saat menggunakan Lovery Studio Management System.

Journey dimulai sejak pertama kali membuka website hingga seluruh proses dokumentasi selesai.

Dokumen ini menjadi acuan utama bagi UI/UX Designer, Frontend Developer, Backend Developer, dan QA Engineer dalam memahami pengalaman pengguna.

---

# Filosofi

Website bukan dibuat untuk menggantikan komunikasi dengan admin.

Website dibuat untuk:

- memberikan informasi
- mempermudah pengajuan sesi
- memberikan transparansi status
- mempercepat proses administrasi

Seluruh komunikasi setelah pengajuan diterima tetap dilakukan melalui WhatsApp.

---

# Journey Overview

```
Landing Page

↓

Melihat Portfolio

↓

Melihat Paket

↓

Membaca FAQ

↓

Membaca Terms & Conditions

↓

Mengajukan Sesi

↓

Menunggu Review

↓

WhatsApp

↓

Pembayaran

↓

Status

↓

Hari Pelaksanaan

↓

Menunggu Hasil

↓

Menerima Google Drive

↓

Selesai
```

---

# Tahap 1

# Landing Page

## Tujuan

Memberikan kesan pertama terhadap Lovery Photography.

Client dapat:

- melihat portfolio
- mengenal Lovery
- melihat layanan
- membaca FAQ
- membaca Terms & Conditions

CTA utama:

```
Ajukan Sesi
```

---

# Tahap 2

# Memilih Paket

Client memilih kategori.

Misalnya:

- Graduation
- Casual
- Wedding

Setelah memilih kategori.

Client dapat melihat:

- deskripsi paket
- harga
- detail layanan
- add-on

---

# Tahap 3

# Memilih Add-On

Client dapat memilih layanan tambahan.

Contoh:

☐ Drone

☐ Extra Jam

☐ Video Highlight

☐ Album Cetak

Setiap perubahan.

↓

Harga berubah otomatis.

---

# Tahap 4

# Mengisi Formulir

Client mengisi:

- Nama
- WhatsApp
- Instagram
- Paket
- Add-On
- Lokasi
- Tanggal
- Jam
- Request Khusus
- Persetujuan Publikasi

↓

Klik

```
Kirim Pengajuan
```

---

# Tahap 5

# Menunggu Review

Website menampilkan.

```
✅

Pengajuan berhasil dikirim.

Admin akan melakukan peninjauan pada jam operasional.

Informasi selanjutnya akan dikirim melalui WhatsApp.
```

Client tidak perlu mengirim chat terlebih dahulu.

---

# Tahap 6

# Review Admin

Client menunggu keputusan.

Kemungkinan.

## Diterima

↓

WhatsApp otomatis.

↓

Invoice diterima.

---

## Ditolak

↓

WhatsApp otomatis.

↓

Alasan dijelaskan oleh admin.

---

## Penjadwalan Ulang

↓

WhatsApp otomatis.

↓

Diskusi bersama admin.

---

# Tahap 7

# Pembayaran

Client menerima invoice.

↓

Transfer.

↓

Mengirim bukti pembayaran melalui WhatsApp.

↓

Menunggu verifikasi.

---

# Tahap 8

# Status Pengajuan

Client dapat membuka halaman.

```
Status Pengajuan
```

Status.

```
Menunggu Review

↓

Menunggu DP

↓

DP Diterima

↓

Lunas

↓

Sesi Berlangsung

↓

Proses Editing

↓

Hasil Dikirim

↓

Selesai
```

Status diperbarui secara real-time setelah admin melakukan tindakan.

---

# Tahap 9

# Hari Pelaksanaan

Client datang sesuai:

- tanggal
- jam
- lokasi

Seluruh komunikasi tetap melalui WhatsApp apabila terdapat perubahan.

---

# Tahap 10

# Menunggu Hasil

Status berubah menjadi.

```
Proses Editing
```

Client cukup menunggu.

Tidak perlu menghubungi admin untuk menanyakan progres apabila belum melewati estimasi.

---

# Tahap 11

# Menerima Google Drive

Client menerima WhatsApp.

Isi pesan:

- ucapan
- link Google Drive
- informasi masa aktif link

Ketentuan:

Paket Reguler

↓

Link aktif 14 hari.

Paket Premium

↓

Link aktif 30 hari.

---

# Tahap 12

# Selesai

Status berubah.

```
Selesai
```

Client dapat menggunakan kembali website untuk mengajukan sesi berikutnya.

Riwayat sebelumnya tetap tersimpan.

---

# Emosi Pengguna

| Tahap | Perasaan | Solusi Sistem |
|--------|-----------|---------------|
| Landing | Penasaran | Portfolio & Branding |
| Pilih Paket | Membandingkan | Paket jelas & harga transparan |
| Formulir | Berharap | Form sederhana |
| Menunggu Review | Tidak sabar | Status "Menunggu Review" |
| Menunggu DP | Bingung | WhatsApp + Invoice otomatis |
| Menunggu Hari H | Antusias | Reminder H-1 |
| Editing | Menunggu | Status "Proses Editing" |
| Hasil | Senang | Google Drive + Ucapan Terima Kasih |

---

# Pain Point

Masalah yang ingin diselesaikan.

❌ Tidak tahu apakah pengajuan sudah diterima.

↓

Status Pengajuan.

---

❌ Bingung harus chat siapa.

↓

WhatsApp otomatis.

---

❌ Tidak tahu pembayaran sudah diterima.

↓

Status pembayaran.

---

❌ Bingung kapan hasil selesai.

↓

Status Editing.

---

# UX Rules

- Maksimal 3 klik menuju formulir.
- Bahasa menggunakan Bahasa Indonesia.
- Hindari istilah teknis.
- CTA selalu jelas.
- Mobile First.
- Semua halaman harus responsif.

---

# Business View

Journey ini dibuat agar calon klien dapat melakukan pengajuan sesi dengan mudah tanpa harus memulai seluruh proses melalui WhatsApp.

Website membantu mengurangi pertanyaan yang berulang kepada admin serta meningkatkan profesionalisme Lovery Photography.

---

# UX View

Website harus memberikan rasa tenang kepada klien.

Setiap perubahan status harus mudah dipahami.

Setiap tindakan penting harus mendapatkan umpan balik yang jelas.

---

# Developer Notes

- Jangan membuat chat internal pada website.
- WhatsApp tetap menjadi media komunikasi utama.
- Status harus diperbarui setelah aksi admin.
- Harga Add-On harus dihitung secara real-time.
- Seluruh status harus diambil dari sumber data yang sama.

---

# Ringkasan

Client Journey menggambarkan pengalaman lengkap pengguna saat menggunakan Lovery Studio Management System.

Dokumen ini memastikan bahwa seluruh halaman, fitur, dan interaksi yang dibangun selalu berorientasi pada kebutuhan klien serta tetap mengikuti proses operasional Lovery Photography.