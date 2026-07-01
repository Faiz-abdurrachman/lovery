---
title: Pengajuan Sesi
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PEMBAYARAN.md
  - INVOICE.md
  - STATUS_PENGAJUAN.md
  - WHATSAPP.md
---

# 📅 Pengajuan Sesi

## Pendahuluan

Pengajuan Sesi merupakan pintu masuk seluruh proses operasional Lovery Studio Management System.

Seluruh calon klien yang ingin menggunakan layanan Lovery Photography wajib melalui proses Pengajuan Sesi.

Pengajuan Sesi **bukan berarti jadwal telah diterima**.

Pengajuan hanya merupakan permintaan dari klien yang nantinya akan direview oleh admin.

Keputusan diterima atau ditolak sepenuhnya berada di tangan admin.

---

# Tujuan

Modul ini dibuat untuk:

- Mengumpulkan data klien secara terstruktur.
- Mengurangi proses tanya jawab yang berulang melalui WhatsApp.
- Mempermudah admin melakukan review.
- Menjadi awal seluruh alur administrasi studio.

---

# Filosofi

Website tidak langsung menerima pemesanan.

Website hanya membantu klien mengajukan permintaan sesi.

Keputusan tetap berada pada admin.

---

# Aktor

## Klien

Melakukan pengajuan sesi.

---

## Admin

Melakukan review terhadap seluruh pengajuan.

---

# Alur Pengajuan

```text
Klien membuka website

↓

Memilih kategori layanan

↓

Memilih paket

↓

Memilih Add-On (Opsional)

↓

Mengisi formulir

↓

Mengirim Pengajuan

↓

Status :
Menunggu Review

↓

Admin melakukan review

↓

Diterima / Ditolak
```

---

# Informasi Yang Harus Diisi

## Data Pribadi

- Nama Lengkap
- Nomor WhatsApp
- Username Instagram (Opsional)

---

## Detail Sesi

- Kategori
- Paket
- Tanggal
- Jam
- Lokasi
- Jenis Acara

---

## Add-On

Opsional.

Klien dapat memilih lebih dari satu.

Total harga akan berubah secara otomatis.

---

## Request Khusus

Kolom bebas.

Misalnya:

- konsep foto
- warna outfit
- request pose
- permintaan lainnya

---

## Persetujuan Publikasi

Pilihan:

- Bersedia
- Tidak Bersedia

Apabila memilih **Bersedia**, maka Lovery Photography diperbolehkan menggunakan hasil dokumentasi untuk media sosial dan portofolio.

---

# Validasi

Sistem wajib melakukan validasi berikut.

## Nama

Tidak boleh kosong.

---

## Nomor WhatsApp

Wajib.

Format nomor Indonesia.

---

## Paket

Harus dipilih.

---

## Tanggal

Harus dipilih.

---

## Jam

Harus dipilih.

---

## Lokasi

Harus diisi.

---

# Yang Tidak Dilakukan Sistem

Sistem **tidak**:

- mengecek ketersediaan fotografer
- mengecek freelancer
- menentukan biaya transport
- menerima pengajuan otomatis
- menolak pengajuan otomatis

Seluruh keputusan dilakukan oleh admin.

---

# Setelah Tombol "Kirim Pengajuan"

Sistem melakukan:

✅ Membuat Nomor Pengajuan

Contoh:

```text
LVR-0001-2026
```

---

✅ Membuat Data Klien

Apabila klien baru.

---

✅ Membuat Riwayat Aktivitas

Aktivitas pertama:

```text
Pengajuan dibuat.
```

---

✅ Membuat Status

Status awal.

```text
Menunggu Review
```

---

✅ Menampilkan Notifikasi

```text
Pengajuan berhasil dikirim.

Admin akan melakukan peninjauan pada jam operasional.

Informasi selanjutnya akan dikirim melalui WhatsApp.
```

---

# Jam Operasional

Jam operasional admin:

```text
08.00

↓

20.00 WIB
```

Apabila pengajuan dikirim di luar jam operasional.

Status tetap:

```text
Menunggu Review
```

Admin akan memproses pada jam kerja berikutnya.

---

# Review Oleh Admin

Admin memiliki tiga pilihan.

## Terima

↓

Status berubah.

↓

Menunggu DP.

↓

Invoice dibuat.

↓

WhatsApp otomatis dikirim.

---

## Tolak

↓

Status berubah.

↓

Ditolak.

↓

WhatsApp otomatis dikirim.

↓

Admin dapat menambahkan alasan.

---

## Minta Penjadwalan Ulang

↓

Status berubah.

↓

Perlu Penjadwalan Ulang.

↓

WhatsApp otomatis dikirim.

↓

Klien melanjutkan diskusi melalui WhatsApp.

---

# WhatsApp Otomatis

Apabila admin menerima pengajuan.

Sistem akan menampilkan konfirmasi:

```text
Invoice akan dibuat.

Pesan WhatsApp akan dikirim otomatis.

Apakah Anda yakin?
```

Admin memilih.

```text
Ya
```

↓

Sistem:

- Membuat Invoice
- Membuat Timeline
- Mengubah Status
- Mengirim WhatsApp

---

# Dashboard Admin

Pengajuan baru otomatis muncul pada widget.

```text
🟡 Menunggu Review
```

Admin cukup membuka dashboard untuk melihat pekerjaan baru.

---

# Timeline Aktivitas

Contoh.

```text
09.00

Pengajuan dibuat

──────────────

09.30

Direview Admin

──────────────

09.31

Invoice dibuat

──────────────

09.31

WhatsApp dikirim
```

---

# UX Rules

Website harus:

- Mobile First.
- Maksimal 3 langkah menuju formulir.
- Form mudah dipahami.
- Bahasa Indonesia.
- Tidak menggunakan istilah "Booking".
- Menampilkan progress yang jelas.

---

# Edge Case

## Klien menutup website sebelum submit

Data tidak disimpan.

---

## Klien mengirim dua kali

Admin melihat dua pengajuan.

Dapat menghapus salah satunya.

---

## Admin lupa review

Dashboard tetap menampilkan badge Menunggu Review sampai diproses.

---

## Klien ingin mengubah paket setelah submit

Perubahan dilakukan melalui WhatsApp.

Admin dapat memperbarui data pengajuan dari dashboard sebelum invoice dibuat.

---

## Klien tidak jadi melanjutkan

Admin dapat mengubah status menjadi:

```text
Dibatalkan
```

Pengajuan tetap tersimpan sebagai riwayat.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Draft pengajuan otomatis.
- Upload referensi foto.
- Estimasi biaya transport.
- Notifikasi email.
- Sinkronisasi kalender sebelum review.

---

# Ringkasan

Pengajuan Sesi merupakan awal seluruh alur kerja Lovery Studio Management System.

Modul ini dirancang untuk mengumpulkan data klien secara lengkap, mempermudah proses review admin, dan menjadi dasar bagi proses-proses berikutnya seperti invoice, pembayaran, Google Calendar, WhatsApp, reminder, dan pencatatan pendapatan.

Seluruh keputusan bisnis tetap berada di tangan admin, sedangkan sistem berperan sebagai alat bantu administrasi yang mengotomatisasi pekerjaan berulang.