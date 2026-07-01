---
title: Google Calendar Integration
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - PEMBAYARAN.md
  - STATUS_PENGAJUAN.md
---

# 📅 Google Calendar Integration

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Google Calendar |
| Aktor | Admin |
| Kalender Resmi | Google Calendar |
| Sinkronisasi | Otomatis |
| Integrasi | Pembayaran, Dashboard, Pengingat |

---

# Pendahuluan

Google Calendar merupakan kalender operasional resmi Lovery Photography.

Lovery Studio Management System tidak membuat kalender baru.

Website hanya bertugas membantu sinkronisasi sehingga admin tidak perlu lagi membuat jadwal secara manual.

Seluruh jadwal resmi studio tetap berada di Google Calendar.

---

# Tujuan

Modul ini dibuat untuk:

- Mengurangi pekerjaan admin.
- Menghindari lupa membuat jadwal.
- Mengurangi jadwal bentrok.
- Menjadikan Google Calendar sebagai sumber jadwal resmi studio.

---

# Filosofi

Google Calendar tetap menjadi kalender utama.

Website hanya membantu administrasi.

Apabila suatu saat website tidak dapat diakses, admin tetap dapat melihat seluruh jadwal melalui Google Calendar.

---

# Kapan Jadwal Dibuat?

Jadwal **TIDAK** dibuat ketika:

❌ Pengajuan dikirim.

❌ Invoice dibuat.

❌ Menunggu DP.

Jadwal **BARU** dibuat ketika:

✅ Admin menekan tombol **Verifikasi DP**.

Hal ini sesuai dengan proses bisnis Lovery Photography.

---

# Alur Sinkronisasi

```text
Pengajuan

↓

Review

↓

Invoice

↓

Menunggu DP

↓

Admin Verifikasi DP

↓

Google Calendar

↓

Dashboard Terupdate

↓

Reminder Aktif
```

---

# Data Yang Dikirim

Setiap event minimal berisi:

## Judul

Contoh:

```text
Graduation - Faiz
```

---

## Tanggal

Tanggal sesi.

---

## Jam

Jam mulai.

Jam selesai (estimasi).

---

## Lokasi

Lokasi sesi.

---

## Deskripsi

Berisi:

- Nama Klien
- Nomor WhatsApp
- Paket
- Add-On
- Request Khusus
- Nomor Pengajuan
- Nomor Invoice

---

# Yang Dilakukan Sistem

Saat admin memverifikasi DP.

Sistem otomatis:

- Membuat event Google Calendar.
- Menyimpan Google Event ID.
- Mengubah status sinkronisasi menjadi Berhasil.
- Menambahkan aktivitas ke Riwayat Pengajuan.

---

# Yang Dilakukan Admin

Admin tidak perlu membuka Google Calendar.

Admin cukup menekan:

```text
Verifikasi DP
```

Sisanya dilakukan sistem.

---

# Perubahan Jadwal

Apabila terjadi perubahan tanggal atau jam.

Admin dapat:

- Mengubah data sesi.
- Menekan tombol **Perbarui Kalender**.

Sistem:

- Memperbarui event Google Calendar.
- Memperbarui Riwayat Aktivitas.

---

# Pembatalan

Apabila pengajuan dibatalkan setelah jadwal dibuat.

Admin dapat memilih:

```text
Hapus Jadwal Kalender
```

Sistem akan:

- Menghapus event.
- Mengubah status sinkronisasi.

---

# Dashboard

Dashboard menampilkan:

Hari Ini

Besok

Minggu Ini

Bulan Ini

Klik salah satu jadwal akan membuka detail sesi.

---

# Status Sinkronisasi

```text
Belum Dibuat

↓

Berhasil

↓

Diubah

↓

Dihapus
```

---

# Riwayat Aktivitas

Contoh:

```text
09.00

DP Diverifikasi

────────────

09.01

Google Calendar Dibuat

────────────

09.02

Sinkronisasi Berhasil
```

---

# Validasi

Jadwal hanya dibuat apabila:

- DP sudah diverifikasi.
- Tanggal tersedia.
- Jam tersedia.
- Lokasi telah diisi.

---

# Edge Case

## Admin Salah Jam

Admin dapat mengubah jadwal.

Sistem memperbarui Google Calendar.

---

## Admin Salah Lokasi

Lokasi dapat diperbarui.

Sinkronisasi dilakukan kembali.

---

## Google Calendar Gagal

Dashboard menampilkan:

```text
⚠ Sinkronisasi Gagal
```

Admin dapat menekan:

```text
Sinkronkan Ulang
```

---

## Internet Terputus

Sinkronisasi masuk antrean.

Sistem mencoba kembali ketika koneksi tersedia.

---

# UX Rules

- Admin tidak perlu membuka Google Calendar.
- Semua sinkronisasi memiliki indikator status.
- Jadwal dapat dibuka langsung dari dashboard.
- Seluruh perubahan memiliki dialog konfirmasi.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Multi Calendar.
- Shared Calendar.
- Drag & Drop Calendar.
- Kalender internal.
- Integrasi Apple Calendar.
- Integrasi Outlook Calendar.

---

# Ringkasan

Google Calendar tetap menjadi kalender resmi Lovery Photography.

Lovery Studio Management System bertugas mengotomatisasi pembuatan, pembaruan, dan penghapusan jadwal berdasarkan aktivitas admin sehingga proses administrasi menjadi lebih cepat dan konsisten tanpa mengubah kebiasaan kerja yang sudah berjalan.