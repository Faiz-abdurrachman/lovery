---
title: Status Pengajuan
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - PEMBAYARAN.md
  - GOOGLE_CALENDAR.md
  - WHATSAPP.md
---

# 🔄 Status Pengajuan

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Status Pengajuan |
| Aktor | Klien, Admin |
| Status Utama | 9 Status |
| Perubahan Status | Admin & Sistem |
| Timeline | Otomatis |
| Integrasi | Dashboard, WhatsApp, Invoice, Google Calendar |

---

# Pendahuluan

Status Pengajuan merupakan indikator utama yang menunjukkan posisi sebuah pengajuan dalam proses operasional Lovery Photography.

Setiap pengajuan hanya boleh memiliki **satu status aktif** pada satu waktu.

Seluruh perubahan status akan tercatat secara otomatis pada Riwayat Aktivitas.

---

# Tujuan

Status dibuat agar:

- Admin mengetahui progres setiap pengajuan.
- Klien mengetahui proses yang sedang berlangsung.
- Dashboard dapat menampilkan pekerjaan yang harus dilakukan.
- Sistem mengetahui otomatisasi apa yang harus dijalankan.

---

# Filosofi

Status bukan sekadar label.

Status merupakan pemicu seluruh otomatisasi sistem.

Ketika status berubah, sistem dapat menjalankan berbagai aksi sesuai aturan bisnis.

---

# State Diagram

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

Status alternatif:

```text
Ditolak

Dibatalkan

Perlu Penjadwalan Ulang
```

---

# Detail Status

---

## 1. Menunggu Review

### Deskripsi

Status awal setelah klien mengirim Pengajuan Sesi.

### Dilakukan Oleh

Sistem.

### Yang Dilakukan Sistem

- Membuat nomor pengajuan.
- Membuat timeline.
- Menampilkan pada Dashboard Admin.

### Tombol Admin

- Terima
- Tolak
- Minta Penjadwalan Ulang

---

## 2. Menunggu DP

### Deskripsi

Admin menerima pengajuan.

Invoice telah dikirim.

Klien sedang melakukan pembayaran DP.

### Yang Dilakukan Sistem

- Membuat invoice.
- Membuka WhatsApp.
- Menambahkan timeline.

### Tombol Admin

- Verifikasi DP
- Batalkan Pengajuan

---

## 3. DP Diterima

### Deskripsi

DP telah diverifikasi oleh admin.

### Yang Dilakukan Sistem

- Sinkronisasi Google Calendar.
- Menambahkan pendapatan DP.
- Menambahkan timeline.

### Tombol Admin

- Verifikasi Pelunasan

---

## 4. Lunas

### Deskripsi

Seluruh pembayaran telah diterima.

### Yang Dilakukan Sistem

- Memperbarui pendapatan.
- Menambahkan timeline.

### Tombol Admin

- Mulai Sesi

---

## 5. Sesi Berlangsung

### Deskripsi

Hari pelaksanaan dokumentasi.

### Yang Dilakukan Sistem

- Menampilkan pada agenda hari ini.
- Menghapus reminder H-1.

### Tombol Admin

- Selesaikan Sesi

---

## 6. Proses Editing

### Deskripsi

Dokumentasi sedang diproses.

### Tombol Admin

- Upload Link Google Drive

---

## 7. Hasil Dikirim

### Deskripsi

Link Google Drive telah dikirim.

### Yang Dilakukan Sistem

- Menambahkan timeline.
- Mengirim WhatsApp.

### Tombol Admin

- Tandai Selesai

---

## 8. Selesai

### Deskripsi

Seluruh proses administrasi selesai.

Pengajuan masuk ke arsip.

---

## 9. Ditolak

### Deskripsi

Pengajuan tidak dapat diterima.

### Yang Dilakukan Sistem

- Mengirim WhatsApp.
- Menyimpan alasan.

---

## 10. Dibatalkan

### Deskripsi

Pengajuan dibatalkan oleh admin atau klien.

Riwayat tetap disimpan.

---

## 11. Perlu Penjadwalan Ulang

### Deskripsi

Tanggal yang diminta tidak tersedia.

Admin dan klien melanjutkan diskusi melalui WhatsApp.

---

# Transisi Status

| Dari | Ke | Pemicu |
|------|----|---------|
| Menunggu Review | Menunggu DP | Admin menerima |
| Menunggu Review | Ditolak | Admin menolak |
| Menunggu Review | Perlu Penjadwalan Ulang | Admin memilih reschedule |
| Menunggu DP | DP Diterima | Verifikasi DP |
| Menunggu DP | Dibatalkan | Admin membatalkan |
| DP Diterima | Lunas | Verifikasi Pelunasan |
| Lunas | Sesi Berlangsung | Hari pelaksanaan |
| Sesi Berlangsung | Proses Editing | Admin selesai sesi |
| Proses Editing | Hasil Dikirim | Link Google Drive dikirim |
| Hasil Dikirim | Selesai | Admin menandai selesai |

---

# Timeline Aktivitas

Setiap perubahan status otomatis membuat aktivitas.

Contoh:

```text
08.30

Pengajuan dibuat

────────────

08.40

Pengajuan diterima

────────────

08.41

Invoice dibuat

────────────

08.42

WhatsApp dikirim

────────────

09.15

DP Diverifikasi

────────────

09.16

Google Calendar dibuat

────────────

10 Juli

Pelunasan diterima

────────────

15 Juli

Sesi dimulai

────────────

16 Juli

Masuk Editing

────────────

18 Juli

Google Drive dikirim

────────────

18 Juli

Selesai
```

Timeline tidak dapat dihapus.

---

# Dashboard

Dashboard menggunakan status ini untuk membuat widget.

Contoh:

```
🟡 Menunggu Review (5)

🟠 Menunggu DP (3)

🟢 DP Diterima (8)

🔵 Lunas (6)

🟣 Editing (4)
```

Admin cukup klik widget.

---

# Validasi

Status hanya boleh berubah melalui aksi yang telah ditentukan.

Sistem tidak boleh melompati status.

Contoh:

❌ Menunggu Review → Lunas

Tidak diperbolehkan.

---

# Edge Case

## DP Sudah Dibayar Tetapi Admin Belum Verifikasi

Status tetap:

```
Menunggu DP
```

---

## Admin Salah Verifikasi

Admin dapat mengembalikan status.

Seluruh perubahan dicatat pada timeline.

---

## Pengajuan Dibatalkan Setelah DP

Status berubah:

```
Dibatalkan
```

Catatan pembatalan wajib diisi.

---

## Link Google Drive Salah

Admin dapat memperbarui link.

Status tetap:

```
Hasil Dikirim
```

Timeline mencatat revisi.

---

# UX Rules

- Warna setiap status harus konsisten.
- Status selalu terlihat jelas pada setiap halaman.
- Timeline tampil secara kronologis.
- Status tidak boleh membingungkan.
- Tombol yang tersedia harus mengikuti status aktif.

---

# Future Improvement

- Progress bar visual.
- Timeline bergambar.
- Push notification.
- Status real-time.
- Live tracking.

---

# Ringkasan

Status Pengajuan merupakan pusat alur operasional Lovery Studio Management System.

Seluruh modul seperti Invoice, Pembayaran, Google Calendar, WhatsApp, Dashboard, Pendapatan, dan Google Drive bergantung pada perubahan status.

Oleh karena itu modul ini menjadi dasar implementasi backend, frontend, serta seluruh otomatisasi sistem.