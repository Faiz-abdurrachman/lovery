---
title: Invoice
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - PEMBAYARAN.md
  - WHATSAPP.md
---

# 🧾 Invoice

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Invoice |
| Aktor | Admin |
| Dibuat Oleh | Sistem |
| Dapat Diedit | Ya |
| Nomor Invoice | Otomatis |
| Integrasi | WhatsApp, Pembayaran, Pendapatan |

---

# Pendahuluan

Invoice merupakan dokumen resmi yang berisi rincian tagihan kepada klien.

Invoice dibuat oleh sistem setelah admin menerima Pengajuan Sesi.

Invoice menjadi dasar seluruh proses pembayaran.

Sistem membantu membuat invoice secara otomatis, namun admin tetap memiliki kendali penuh untuk melakukan perubahan sebelum invoice dikirim kepada klien.

---

# Tujuan

Modul Invoice dibuat untuk:

- Mengurangi pembuatan invoice manual.
- Menghindari kesalahan perhitungan.
- Menyeragamkan format invoice.
- Mempercepat proses administrasi.
- Menjadi dasar pencatatan pembayaran.

---

# Filosofi

Invoice adalah hasil dari keputusan admin.

Sistem hanya membantu membuat dan menghitung.

Admin tetap menjadi pihak yang memutuskan apakah invoice siap dikirim.

---

# Kapan Invoice Dibuat?

Invoice dibuat ketika:

✅ Admin menerima Pengajuan Sesi.

Bukan ketika klien mengirim formulir.

---

# Alur Invoice

```text
Pengajuan Sesi

↓

Admin Review

↓

Terima

↓

Sistem Membuat Invoice

↓

Admin Review Invoice

↓

(Admin dapat mengedit)

↓

Kirim Invoice

↓

WhatsApp Otomatis

↓

Menunggu DP
```

---

# Nomor Invoice

Nomor invoice dibuat otomatis.

Format:

```text
INV00012026
```

Format terdiri dari:

```text
INV

+

Nomor Urut

+

Tahun
```

Nomor invoice tidak boleh berubah.

Nomor yang sudah digunakan tidak boleh dipakai kembali.

---

# Isi Invoice

Invoice minimal berisi:

## Informasi Studio

- Logo Lovery
- Nama Studio
- Nomor WhatsApp
- Rekening / QRIS

---

## Informasi Klien

- Nama
- Nomor WhatsApp
- Instagram (Opsional)

---

## Detail Sesi

- Kategori
- Paket
- Lokasi
- Tanggal
- Jam

---

## Add-On

Daftar add-on yang dipilih.

Setiap add-on memiliki:

- Nama
- Harga

---

## Ringkasan Pembayaran

- Harga Paket
- Total Add-On
- Subtotal
- Nominal DP
- Sisa Pelunasan
- Total Tagihan

---

## Catatan

Invoice dapat memuat catatan tambahan dari admin.

Contoh:

- Membawa properti sendiri.
- Meeting sebelum hari H.
- Ketentuan tambahan.

---

# Perhitungan

Sistem otomatis menghitung:

```text
Total Paket

+

Total Add-On

=

Total Invoice
```

Kemudian sistem menghitung:

```text
DP

↓

Sisa Pelunasan
```

Admin tidak perlu menghitung manual.

---

# Edit Invoice

Sebelum invoice dikirim.

Admin dapat mengubah:

- Paket
- Harga
- Add-On
- Catatan
- Nominal DP (apabila diperlukan)

Setelah perubahan disimpan.

Seluruh total dihitung ulang otomatis.

---

# Mengirim Invoice

Setelah admin menekan tombol:

```text
Kirim Invoice
```

Sistem:

- Menyimpan invoice.
- Mengubah status menjadi **Menunggu DP**.
- Menambahkan aktivitas pada Riwayat Pengajuan.
- Mengirim WhatsApp otomatis.

---

# Perubahan Setelah Invoice Dikirim

Apabila terjadi perubahan.

Misalnya:

- Klien menambah add-on.
- Klien mengganti paket.

Admin dapat membuat invoice baru.

Invoice lama tetap disimpan sebagai histori.

Invoice terbaru menjadi invoice aktif.

---

# Riwayat Invoice

Setiap perubahan invoice dicatat.

Contoh:

```text
INV00012026

↓

Dibuat

↓

Dikirim

↓

Direvisi

↓

Invoice Baru Dibuat
```

Riwayat tidak boleh dihapus.

---

# Status Invoice

Status invoice:

```text
Draft

↓

Dikirim

↓

DP Dibayar

↓

Lunas

↓

Selesai
```

---

# Dashboard

Dashboard Invoice menampilkan:

- Draft
- Menunggu DP
- DP Diterima
- Lunas

Admin dapat mencari invoice berdasarkan:

- Nomor Invoice
- Nama Klien
- Nomor Pengajuan

---

# Export

Invoice dapat:

- Dicetak PDF.
- Diunduh PDF.
- Dikirim melalui WhatsApp.

---

# Validasi

Invoice tidak dapat dikirim apabila:

- Paket belum dipilih.
- Harga kosong.
- Klien belum memiliki nomor WhatsApp.

---

# Edge Case

## Admin Salah Harga

Invoice masih dapat diedit selama belum lunas.

---

## Klien Menambah Add-On

Invoice baru dibuat.

Invoice lama menjadi histori.

---

## Klien Mengurangi Add-On

Invoice baru dibuat.

Perhitungan diperbarui otomatis.

---

## Admin Salah Nomor WhatsApp

Nomor dapat diperbarui sebelum invoice dikirim ulang.

---

## Invoice Sudah Lunas

Invoice tidak dapat diubah.

Apabila diperlukan perubahan, admin membuat invoice koreksi sesuai kebijakan studio.

---

# UX Rules

- Nominal selalu menggunakan format Rupiah.
- Add-on langsung memperbarui total harga secara real-time.
- Admin cukup satu klik untuk mengirim invoice.
- Semua perubahan memiliki dialog konfirmasi.
- Tombol utama harus jelas: **Simpan Draft**, **Kirim Invoice**, **Buat Invoice Baru**.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Tanda tangan digital.
- QR Code invoice.
- Pembayaran langsung dari invoice.
- Template invoice yang dapat dikustomisasi.
- Pengiriman invoice melalui email.

---

# Ringkasan

Invoice merupakan dokumen administratif utama yang menghubungkan proses Pengajuan Sesi dengan Pembayaran.

Sistem bertugas menghitung seluruh rincian tagihan secara otomatis, sedangkan admin tetap memiliki kendali penuh untuk meninjau, mengubah, dan mengirim invoice kepada klien melalui WhatsApp.

Seluruh perubahan invoice disimpan sebagai histori sehingga proses administrasi tetap transparan dan mudah dilacak.
