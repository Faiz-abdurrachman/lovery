---
title: Decision Log
version: 1.0.0
status: DRAFT
owner: Product Team
last_updated: 2026-07-01
related:
  - PRODUCT_PHILOSOPHY
  - PRODUCT_DICTIONARY
  - BUSINESS_RULES
---

# 📒 Decision Log

## Pendahuluan

Dokumen ini mencatat seluruh keputusan penting yang telah disepakati selama proses perancangan Lovery Studio Management System.

Tujuan utama dokumen ini adalah memastikan bahwa seluruh anggota tim memahami alasan di balik setiap keputusan produk.

Apabila di masa depan muncul pertanyaan seperti:

- Mengapa fitur tertentu tidak dibuat?
- Mengapa memilih solusi A dibanding solusi B?
- Mengapa istilah tertentu digunakan?

Maka jawaban resmi terdapat pada dokumen ini.

Dokumen ini merupakan **sumber kebenaran (Single Source of Truth)** untuk seluruh keputusan produk.

---

# Cara Membaca

Setiap keputusan memiliki:

- ID
- Tanggal
- Status
- Keputusan
- Alasan
- Dampak

Status keputusan terdiri dari:

| Status | Arti |
|---------|------|
| 🟢 LOCKED | Tidak boleh diubah tanpa persetujuan Product Owner |
| 🟡 REVIEW | Sedang dipertimbangkan |
| 🔴 REJECTED | Tidak digunakan |

---

# Keputusan Produk

---

## DEC-001

### Status

🟢 LOCKED

### Keputusan

WhatsApp menjadi media komunikasi utama antara admin dan klien.

### Alasan

- Sudah menjadi kebiasaan admin.
- Sudah menjadi kebiasaan klien.
- Komunikasi lebih personal.
- Tidak perlu membuat sistem chat baru.

### Dampak

Website tidak menyediakan fitur chat internal.

---

## DEC-002

### Status

🟢 LOCKED

### Keputusan

Google Calendar menjadi kalender resmi studio.

### Alasan

- Sudah digunakan oleh admin.
- Tidak perlu belajar sistem baru.
- Sinkron dengan perangkat lain.

### Dampak

Website hanya melakukan sinkronisasi jadwal.

---

## DEC-003

### Status

🟢 LOCKED

### Keputusan

Menggunakan istilah **Pengajuan Sesi**.

### Alasan

Klien belum tentu mendapatkan jadwal ketika mengisi formulir.

Admin masih harus melakukan review.

### Dampak

Istilah "Booking" tidak digunakan pada seluruh sistem.

---

## DEC-004

### Status

🟢 LOCKED

### Keputusan

Pengajuan tidak otomatis diterima.

### Alasan

Admin harus memastikan jadwal masih tersedia.

### Dampak

Seluruh pengajuan masuk ke status **Menunggu Review**.

---

## DEC-005

### Status

🟢 LOCKED

### Keputusan

Invoice dibuat otomatis setelah admin menerima pengajuan.

### Alasan

Mengurangi pekerjaan manual admin.

---

## DEC-006

### Status

🟢 LOCKED

### Keputusan

Invoice masih dapat diedit.

### Alasan

Admin dapat melakukan koreksi apabila terjadi perubahan.

---

## DEC-007

### Status

🟢 LOCKED

### Keputusan

Apabila terdapat add-on setelah invoice pertama dibuat, sistem membuat invoice baru.

### Alasan

Menjaga histori transaksi tetap rapi.

---

## DEC-008

### Status

🟢 LOCKED

### Keputusan

Pembayaran diverifikasi secara manual.

### Alasan

Belum menggunakan Payment Gateway.

---

## DEC-009

### Status

🟢 LOCKED

### Keputusan

Setelah DP diverifikasi:

- Status berubah menjadi DP Diterima.
- Google Calendar diperbarui.

### Alasan

Menghindari jadwal bentrok.

---

## DEC-010

### Status

🟢 LOCKED

### Keputusan

Website tidak mengunci tanggal sebelum DP diverifikasi.

### Alasan

Pengajuan belum tentu menjadi transaksi resmi.

---

## DEC-011

### Status

🟢 LOCKED

### Keputusan

Nomor pengajuan dibuat otomatis.

### Format

```text
LVR-0001-2026
```

---

## DEC-012

### Status

🟢 LOCKED

### Keputusan

Nomor invoice dibuat otomatis.

### Format

```text
INV00012026
```

---

## DEC-013

### Status

🟢 LOCKED

### Keputusan

Pendapatan dihitung berdasarkan:

- DP
- Pelunasan

### Alasan

Owner ingin melihat cashflow secara lengkap.

---

## DEC-014

### Status

🟢 LOCKED

### Keputusan

Laporan pendapatan dapat diekspor ke Excel.

---

## DEC-015

### Status

🟢 LOCKED

### Keputusan

Google Drive tetap digunakan untuk distribusi hasil.

### Alasan

Sudah menjadi workflow studio.

---

## DEC-016

### Status

🟢 LOCKED

### Keputusan

Website hanya menyimpan tautan Google Drive.

Tidak mengunggah file.

---

## DEC-017

### Status

🟢 LOCKED

### Keputusan

Admin memasukkan tautan Google Drive secara manual.

---

## DEC-018

### Status

🟢 LOCKED

### Keputusan

Reminder wajib tersedia pada seluruh proses penting.

Contohnya:

- Pengajuan Baru
- DP
- Pelunasan
- H-1
- Google Drive

---

## DEC-019

### Status

🟢 LOCKED

### Keputusan

Dashboard harus berorientasi pada pekerjaan.

Bukan hanya statistik.

---

## DEC-020

### Status

🟢 LOCKED

### Keputusan

Admin tidak boleh mengingat pekerjaan sendiri.

Dashboard bertugas menunjukkan pekerjaan yang harus diselesaikan.

---

## DEC-021

### Status

🟢 LOCKED

### Keputusan

Manajemen freelancer tidak termasuk MVP.

### Alasan

Crew bersifat fleksibel dan diatur di luar sistem.

---

## DEC-022

### Status

🟢 LOCKED

### Keputusan

Transport tidak dihitung otomatis.

Biaya transport ditentukan melalui diskusi admin dan klien melalui WhatsApp.

---

## DEC-023

### Status

🟢 LOCKED

### Keputusan

Form Pengajuan wajib meminta nomor WhatsApp.

### Alasan

Seluruh komunikasi lanjutan dilakukan melalui WhatsApp.

---

## DEC-024

### Status

🟢 LOCKED

### Keputusan

Status Pengajuan mengikuti urutan berikut.

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

---

## DEC-025

### Status

🟢 LOCKED

### Keputusan

Seluruh halaman website harus responsif dengan prioritas Mobile First.

### Alasan

Sebagian besar klien mengakses website menggunakan smartphone.

---

# Penutup

Decision Log merupakan dokumen hidup.

Setiap keputusan baru harus ditambahkan ke dokumen ini sebelum dilakukan implementasi.

Dengan demikian seluruh anggota tim akan selalu memiliki referensi yang sama mengenai alasan di balik setiap keputusan produk.

Seluruh keputusan yang berstatus **🟢 LOCKED** tidak boleh diubah tanpa persetujuan Product Owner.