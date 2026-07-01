# 📸 Lovery Studio Management System

> **Document:** 06_PRODUCT_DICTIONARY.md
> **Version:** 1.0.0
> **Status:** Draft MVP
> **Author:** Lovery Development Team
> **Last Update:** 1 Juli 2026

---

# Product Dictionary

## Pendahuluan

Dokumen ini berisi seluruh istilah resmi yang digunakan pada Lovery Studio Management System.

Tujuan utama dokumen ini adalah menjaga konsistensi bahasa di seluruh produk, mulai dari desain antarmuka, dokumentasi, basis data, API, hingga implementasi kode.

Seluruh anggota tim wajib menggunakan istilah yang terdapat pada dokumen ini.

Apabila ditemukan istilah baru, maka istilah tersebut harus ditambahkan ke dokumen ini sebelum digunakan pada sistem.

---

# Filosofi Penamaan

Lovery Studio Management System menggunakan Bahasa Indonesia sebagai bahasa utama aplikasi.

Keputusan ini diambil karena pengguna utama sistem adalah admin dan pemilik studio yang lebih nyaman menggunakan istilah yang mudah dipahami dibandingkan istilah teknis.

Selain itu, istilah yang digunakan harus mengikuti proses bisnis Lovery Photography, bukan sekadar menerjemahkan istilah dari bahasa Inggris.

---

# Istilah Resmi

## Pengajuan Sesi

### Definisi

Pengajuan Sesi adalah permintaan dari klien untuk menggunakan layanan Lovery Photography pada tanggal dan waktu tertentu.

Pengajuan belum berarti sesi tersebut diterima.

Admin masih harus melakukan proses review sebelum pengajuan disetujui.

### Digunakan Pada

- Website
- Dashboard
- Database
- Dokumentasi
- API

### Jangan Gunakan

- Booking
- Reservation
- Appointment

---

## Klien

### Definisi

Klien adalah orang yang menggunakan layanan Lovery Photography.

### Jangan Gunakan

- Client
- Customer
- User

---

## Beranda Admin

### Definisi

Halaman utama yang pertama kali dibuka admin setelah login.

Beranda Admin berfungsi sebagai pusat aktivitas harian, bukan sekadar dashboard statistik.

### Jangan Gunakan

- Dashboard
- Home Dashboard

---

## Pengajuan Baru

### Definisi

Pengajuan yang baru dikirim oleh klien dan belum direview oleh admin.

---

## Menunggu Review

### Definisi

Status ketika pengajuan sudah diterima oleh sistem tetapi belum diproses oleh admin.

---

## Menunggu DP

### Definisi

Status ketika pengajuan telah disetujui oleh admin.

Invoice telah dikirim.

Klien sedang menunggu melakukan pembayaran DP.

### Jangan Gunakan

- Waiting Payment
- Pending Payment

---

## DP Diterima

### Definisi

Status pembayaran ketika admin telah melakukan verifikasi pembayaran uang muka.

Pada tahap ini sistem akan:

- memperbarui status pembayaran
- membuat jadwal pada Google Calendar
- menganggap sesi telah dikonfirmasi

---

## Lunas

### Definisi

Status ketika seluruh pembayaran telah diselesaikan oleh klien.

---

## Riwayat Pengajuan

### Definisi

Daftar seluruh aktivitas yang terjadi sejak pengajuan dibuat hingga proyek selesai.

Contohnya:

- Pengajuan dibuat
- Direview
- Invoice dibuat
- WhatsApp dikirim
- DP diterima
- Pelunasan
- Google Drive dikirim
- Selesai

### Jangan Gunakan

- Timeline Booking
- Activity Log

---

## Pengingat

### Definisi

Daftar pekerjaan yang harus segera ditindaklanjuti oleh admin.

Contohnya:

- Pengajuan baru
- DP belum diverifikasi
- Pelunasan
- Jadwal besok
- Google Drive belum dikirim

### Jangan Gunakan

- Reminder Center
- Notification Center

---

## Kalender Studio

### Definisi

Kalender operasional resmi Lovery Photography.

Seluruh jadwal resmi studio berasal dari Google Calendar.

Website hanya melakukan sinkronisasi.

### Jangan Gunakan

- Booking Calendar

---

## Pendapatan

### Definisi

Ringkasan seluruh pemasukan studio.

Meliputi:

- DP Masuk
- Pelunasan
- Total Pendapatan
- Outstanding Payment

### Jangan Gunakan

- Revenue

---

## Add-On

### Definisi

Layanan tambahan yang dapat dipilih klien di luar paket utama.

Contoh:

- Drone
- Album
- Frame
- Extra Edit

Nilai add-on secara otomatis memengaruhi total pembayaran.

---

## Invoice

### Definisi

Dokumen tagihan yang dibuat otomatis setelah admin menerima pengajuan.

Invoice dapat diperbarui apabila terdapat perubahan sebelum pembayaran selesai.

Nomor invoice dibuat otomatis dengan format:

```text
INV00012026
```

---

## Nomor Pengajuan

### Definisi

Kode unik yang diberikan pada setiap pengajuan.

Format:

```text
LVR-0001-2026
```

Nomor ini digunakan untuk mempermudah pencarian data oleh admin.

---

## Google Drive

### Definisi

Media resmi pengiriman hasil foto dan video kepada klien.

Website tidak menyimpan file.

Website hanya menyimpan tautan Google Drive yang dimasukkan oleh admin.

---

## WhatsApp

### Definisi

Media komunikasi resmi antara admin dan klien.

Seluruh komunikasi setelah pengajuan diterima dilakukan melalui WhatsApp.

Website tidak menyediakan fitur chat internal.

---

# Status Pengajuan

Urutan status resmi yang digunakan sistem.

```text
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

Status ini digunakan secara konsisten pada seluruh halaman aplikasi.

---

# Istilah Yang Tidak Digunakan

Berikut merupakan istilah yang tidak digunakan pada Lovery Studio Management System.

| Hindari | Gunakan |
|----------|----------|
| Booking | Pengajuan Sesi |
| Client | Klien |
| Revenue | Pendapatan |
| Dashboard | Beranda Admin |
| Booking Status | Status Pengajuan |
| Booking Management | Pengelolaan Pengajuan |
| Activity Log | Riwayat Pengajuan |
| Notification Center | Pengingat |
| Availability Checker | Tidak digunakan pada MVP |

---

# Aturan Penamaan

Seluruh desain antarmuka, dokumentasi, dan implementasi sistem harus menggunakan istilah yang terdapat pada dokumen ini.

Apabila terdapat perbedaan istilah antara desain, backend, frontend, maupun dokumentasi, maka istilah pada Product Dictionary menjadi acuan utama.

Dokumen ini merupakan sumber referensi resmi untuk seluruh penamaan dalam Lovery Studio Management System.