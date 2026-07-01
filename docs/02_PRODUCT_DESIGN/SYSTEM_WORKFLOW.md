---
title: System Workflow
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - PENGAJUAN_SESI.md
  - STATUS_PENGAJUAN.md
  - DASHBOARD_ADMIN.md
---

# 🔄 System Workflow

## Pendahuluan

Dokumen ini menjelaskan alur kerja (workflow) Lovery Studio Management System dari awal hingga akhir.

Workflow ini menjadi acuan utama bagi seluruh developer, UI/UX Designer, QA, dan AI Coding Assistant.

Seluruh implementasi sistem harus mengikuti workflow pada dokumen ini.

---

# Filosofi Workflow

Lovery Studio Management System **tidak mengubah cara kerja Lovery Photography**.

Sistem hanya mengotomatisasi pekerjaan administrasi yang sebelumnya dilakukan secara manual.

WhatsApp tetap menjadi media komunikasi utama.

Google Calendar tetap menjadi kalender resmi studio.

Google Drive tetap menjadi media pengiriman hasil.

Website menjadi pusat administrasi yang menghubungkan seluruh proses tersebut.

---

# Gambaran Besar Workflow

```
Landing Page

↓

Klien Memilih Paket

↓

Klien Mengisi Form Pengajuan Sesi

↓

Status :
Menunggu Review

↓

Admin Review

↓

┌───────────────┐
│               │
│ Diterima      │
│               │
└──────┬────────┘
       │
       ▼
Invoice Otomatis

↓

WhatsApp Otomatis

↓

Status :
Menunggu DP

↓

Klien Transfer

↓

Admin Verifikasi DP

↓

Google Calendar

↓

Status :
DP Diterima

↓

Pelunasan

↓

Admin Verifikasi

↓

Status :
Lunas

↓

Hari Pelaksanaan

↓

Status :
Sesi Berlangsung

↓

Editing

↓

Status :
Proses Editing

↓

Upload Google Drive

↓

Kirim WhatsApp

↓

Status :
Hasil Dikirim

↓

Admin Menekan
"Tandai Selesai"

↓

Status :
Selesai
```

---

# Workflow Detail

## Tahap 1

### Landing Page

Tujuan:

Memberikan informasi mengenai Lovery Photography.

Klien dapat:

- melihat portfolio
- melihat paket
- membaca FAQ
- membaca Terms & Conditions
- menuju halaman Pengajuan Sesi

---

## Tahap 2

### Pengajuan Sesi

Klien mengisi formulir.

Data yang dikirim:

- Nama
- Nomor WhatsApp
- Instagram
- Paket
- Add-On
- Tanggal
- Jam
- Lokasi
- Request Khusus
- Persetujuan Publikasi

↓

Sistem membuat:

- Nomor Pengajuan
- Timeline
- Status Menunggu Review

---

## Tahap 3

### Review Admin

Dashboard menampilkan:

```
Pengajuan Baru
```

Admin memiliki tiga pilihan.

### Terima

↓

Invoice dibuat.

↓

WhatsApp dibuka.

↓

Status berubah menjadi:

```
Menunggu DP
```

---

### Tolak

↓

Status:

```
Ditolak
```

↓

WhatsApp dibuka.

---

### Penjadwalan Ulang

↓

Status:

```
Perlu Penjadwalan Ulang
```

↓

WhatsApp dibuka.

---

## Tahap 4

### Pembayaran DP

Klien melakukan pembayaran melalui:

- QRIS
- Transfer Bank

↓

Mengirim bukti melalui WhatsApp.

↓

Admin menekan:

```
Verifikasi DP
```

↓

Sistem:

- mencatat transaksi
- memperbarui status
- membuat jadwal Google Calendar
- memperbarui dashboard
- menambahkan timeline

---

## Tahap 5

### Pelunasan

Klien melakukan pelunasan.

↓

Admin melakukan verifikasi.

↓

Status berubah menjadi:

```
Lunas
```

---

## Tahap 6

### Hari Pelaksanaan

Pada hari sesi.

Dashboard menampilkan:

```
Agenda Hari Ini
```

↓

Admin menekan:

```
Mulai Sesi
```

↓

Status:

```
Sesi Berlangsung
```

---

## Tahap 7

### Editing

Setelah sesi selesai.

↓

Admin:

```
Selesaikan Sesi
```

↓

Status:

```
Proses Editing
```

Dashboard mulai menghitung lama proses editing.

---

## Tahap 8

### Google Drive

Editor mengunggah hasil ke Google Drive.

↓

Admin menyalin link.

↓

Tempel pada website.

↓

Klik:

```
Simpan & Kirim
```

↓

WhatsApp terbuka.

↓

Status:

```
Hasil Dikirim
```

---

## Tahap 9

### Penyelesaian

Setelah admin memastikan hasil telah dikirim.

↓

Klik:

```
Tandai Selesai
```

↓

Status:

```
Selesai
```

↓

Pengajuan berpindah ke arsip.

---

# Workflow Dashboard

Setiap perubahan workflow akan menghasilkan perubahan pada dashboard.

Contoh.

```
Menunggu Review

↓

Task Baru

────────────

Menunggu DP

↓

Reminder DP

────────────

DP Diterima

↓

Agenda Kalender

────────────

Editing

↓

Reminder Editing

────────────

Google Drive

↓

Reminder Pengiriman
```

---

# Workflow WhatsApp

Website tidak menjadi media komunikasi.

Setiap perubahan penting akan membuka WhatsApp.

Contoh:

- Pengajuan diterima
- Pengajuan ditolak
- Invoice
- DP diterima
- Reminder pelunasan
- Reminder H-1
- Link Google Drive
- Ucapan terima kasih

---

# Workflow Revenue

Pendapatan hanya bertambah ketika:

```
Verifikasi DP

↓

Cash In Bertambah
```

dan

```
Verifikasi Pelunasan

↓

Cash In Bertambah
```

Invoice tidak menambah pendapatan.

---

# Workflow Google Calendar

Event hanya dibuat ketika:

```
DP Diverifikasi
```

Bukan saat pengajuan dibuat.

Hal ini mengikuti proses bisnis Lovery Photography.

---

# Workflow Add-On

Apabila Add-On ditambahkan:

Sebelum invoice dikirim:

↓

Invoice diperbarui.

Apabila setelah invoice dikirim:

↓

Invoice revisi dibuat.

↓

Invoice sebelumnya tetap menjadi histori.

---

# Workflow Error

Apabila terjadi kesalahan.

Contoh:

- WhatsApp gagal dibuka.
- Google Calendar gagal sinkron.
- Link Google Drive salah.

Sistem:

- mencatat log
- menampilkan notifikasi kepada admin
- menyediakan tombol untuk mencoba kembali

---

# Prinsip Workflow

Seluruh workflow mengikuti prinsip berikut:

- Tidak mengubah kebiasaan kerja admin.
- Mengurangi pekerjaan manual.
- Meminimalkan kesalahan administrasi.
- Mengutamakan otomatisasi yang tetap berada dalam kendali admin.
- Seluruh aktivitas harus tercatat pada timeline.

---

# Ringkasan

Workflow Lovery Studio Management System dirancang mengikuti proses operasional Lovery Photography yang telah berjalan.

Website berperan sebagai pusat administrasi yang menghubungkan seluruh aktivitas mulai dari pengajuan sesi hingga penyerahan hasil kepada klien.

Seluruh modul pada sistem harus mengacu pada workflow yang dijelaskan dalam dokumen ini.