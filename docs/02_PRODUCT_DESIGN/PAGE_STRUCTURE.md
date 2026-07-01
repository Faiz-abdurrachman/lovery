---
title: Page Structure
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - CLIENT_JOURNEY.md
  - ADMIN_JOURNEY.md
  - FEATURE_SPECIFICATION.md
---

# 📑 Page Structure

## Pendahuluan

Dokumen ini menjelaskan struktur setiap halaman pada Lovery Studio Management System.

Dokumen ini **bukan membahas desain visual**, melainkan menjelaskan komponen apa saja yang harus ada pada setiap halaman.

Dokumen ini menjadi acuan utama bagi UI/UX Designer dan Frontend Developer.

---

# Filosofi

Setiap halaman memiliki satu tujuan utama.

Halaman tidak boleh berisi terlalu banyak informasi yang tidak relevan.

Pengguna harus dapat memahami fungsi halaman dalam waktu kurang dari 5 detik.

---

# Daftar Halaman

Website terdiri dari dua area utama.

```
Website Client

↓

Landing Page
Daftar Paket
Detail Paket
Pengajuan Sesi
Status Pengajuan

──────────────────────────

Dashboard Admin

Dashboard
Pengajuan
Invoice
Kalender
Pendapatan
Klien
Pengaturan
```

---

# 1. Landing Page

## Tujuan

Memperkenalkan Lovery Photography.

---

## Struktur

```
Navbar

↓

Hero Section

↓

Portfolio

↓

Tentang Lovery

↓

Kategori Layanan

↓

Mengapa Memilih Lovery

↓

Testimoni (Opsional)

↓

FAQ

↓

Terms & Conditions (Ringkasan)

↓

CTA Ajukan Sesi

↓

Footer
```

---

## CTA

```
Ajukan Sesi
```

---

# 2. Halaman Daftar Paket

## Tujuan

Menampilkan seluruh kategori layanan.

---

## Struktur

```
Header

↓

Filter Kategori

↓

Daftar Paket

↓

Perbandingan Paket

↓

FAQ Paket

↓

CTA
```

---

# 3. Detail Paket

## Struktur

```
Breadcrumb

↓

Nama Paket

↓

Galeri

↓

Harga

↓

Fasilitas

↓

Add-On

↓

Catatan

↓

CTA Ajukan Sesi
```

---

# 4. Halaman Pengajuan Sesi

## Tujuan

Mengumpulkan data calon klien.

---

## Struktur

```
Progress Step

↓

Data Diri

↓

Detail Acara

↓

Tanggal & Jam

↓

Lokasi

↓

Add-On

↓

Ringkasan Harga

↓

Persetujuan Publikasi

↓

Checklist Terms & Conditions

↓

Tombol Kirim Pengajuan
```

---

# 5. Status Pengajuan

## Struktur

```
Header

↓

Progress Status

↓

Timeline Aktivitas

↓

Detail Pengajuan

↓

Status Pembayaran

↓

Tombol Hubungi Admin
```

---

# 6. Dashboard Admin

## Struktur

```
Header

↓

Quick Action

↓

Workspace Tugas

↓

Agenda Hari Ini

↓

Pendapatan

↓

Aktivitas Terbaru

↓

Mini Calendar
```

---

# 7. Halaman Pengajuan

## Struktur

```
Filter

↓

Pencarian

↓

Daftar Pengajuan

↓

Detail Pengajuan

↓

Timeline

↓

Action Button
```

---

# 8. Detail Pengajuan

## Struktur

```
Informasi Klien

↓

Detail Paket

↓

Add-On

↓

Timeline

↓

Status

↓

Pembayaran

↓

Catatan Internal

↓

Action Button
```

---

# 9. Halaman Invoice

## Struktur

```
Filter

↓

Daftar Invoice

↓

Preview Invoice

↓

Ringkasan Pembayaran

↓

Action Button
```

---

# 10. Kalender Studio

## Struktur

```
Header

↓

Calendar

↓

Agenda

↓

Detail Agenda
```

---

# 11. Pendapatan

## Struktur

```
Filter

↓

Revenue Card

↓

Cashflow

↓

Grafik

↓

Daftar Transaksi

↓

Export Excel
```

---

# 12. Database Klien

## Struktur

```
Search

↓

Filter

↓

Daftar Klien

↓

Riwayat Pengajuan

↓

Riwayat Pembayaran

↓

Catatan Internal
```

---

# 13. Pengaturan

## Struktur

```
Google Calendar

↓

WhatsApp

↓

Nomor Rekening

↓

QRIS

↓

Jam Operasional

↓

Template Invoice

↓

Template WhatsApp

↓

Reminder

↓

Simpan
```

---

# Aturan Halaman

Seluruh halaman harus memiliki:

- Header yang konsisten.
- Breadcrumb (Desktop).
- Tombol kembali (Mobile).
- Loading State.
- Empty State.
- Error State.

---

# Responsive Rules

## Desktop

Menggunakan layout multi-column.

---

## Tablet

Menggunakan layout dua kolom.

---

## Mobile

Menggunakan satu kolom.

Bottom spacing minimal 24px.

Semua tombol mudah dijangkau menggunakan ibu jari.

---

# Navigasi

Client dan Admin memiliki navigasi yang berbeda.

## Client

```
Beranda

Paket

Status Pengajuan

Hubungi Admin
```

---

## Admin

```
Dashboard

Pengajuan

Invoice

Kalender

Pendapatan

Klien

Pengaturan
```

---

# Empty State

Setiap halaman harus memiliki tampilan ketika data kosong.

Contoh:

```
📭

Belum ada pengajuan.
```

---

# Loading State

Gunakan skeleton loading.

Hindari spinner penuh selama data masih dapat dimuat secara bertahap.

---

# Error State

Apabila terjadi kesalahan.

Contoh.

```
⚠

Terjadi kesalahan.

Silakan coba beberapa saat lagi.

[ Muat Ulang ]
```

---

# Business View

Struktur halaman dirancang agar alur bisnis Lovery Photography dapat diterjemahkan menjadi pengalaman pengguna yang sederhana dan mudah dipahami.

---

# UX View

Setiap halaman hanya memiliki satu tujuan utama.

Informasi yang tidak berkaitan langsung dengan tujuan halaman sebaiknya tidak ditampilkan agar pengguna tetap fokus.

---

# Developer Notes

- Semua halaman wajib menggunakan layout yang konsisten.
- Komponen yang sama digunakan kembali (reusable components).
- Hindari logika bisnis di layer tampilan.
- Semua data diambil melalui API sesuai modul masing-masing.
- Komponen harus mendukung desktop, tablet, dan mobile.

---

# Ringkasan

Page Structure menjadi acuan utama dalam menyusun halaman Lovery Studio Management System.

Dokumen ini memastikan seluruh tim memiliki pemahaman yang sama mengenai isi, tujuan, dan susunan setiap halaman sebelum masuk ke tahap desain visual maupun implementasi teknis.