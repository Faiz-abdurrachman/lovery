---
title: Pembayaran
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - INVOICE.md
  - PENDAPATAN.md
  - GOOGLE_CALENDAR.md
---

# 💳 Pembayaran

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Pembayaran |
| Aktor | Klien, Admin |
| Media Pembayaran | Transfer Bank / QRIS |
| Payment Gateway | Tidak digunakan pada MVP |
| Verifikasi | Manual oleh Admin |
| Integrasi | Invoice, WhatsApp, Google Calendar, Pendapatan |

---

# Pendahuluan

Modul Pembayaran mengatur seluruh proses pembayaran pada Lovery Studio Management System.

Pembayaran dilakukan secara langsung oleh klien menggunakan rekening atau QRIS yang dimiliki Lovery Photography.

Website tidak menerima pembayaran secara langsung.

Website hanya membantu mencatat status pembayaran dan mengotomatisasi proses administrasi setelah pembayaran diverifikasi oleh admin.

---

# Filosofi

Pembayaran merupakan bukti komitmen dari klien.

Namun keputusan bahwa pembayaran telah diterima tetap berada di tangan admin.

Sistem membantu proses administrasi setelah pembayaran diverifikasi.

---

# Jenis Pembayaran

## 1. Down Payment (DP)

Pembayaran awal untuk mengamankan jadwal.

Ketentuan saat ini:

- Photo Only → Minimal Rp50.000
- Bundling / Add-On → Minimal Rp100.000
- Wedding → Minimal 40% dari total invoice

Nominal mengikuti kebijakan Lovery Photography dan dapat diubah melalui pengaturan sistem.

---

## 2. Pelunasan

Sisa pembayaran yang harus dibayarkan oleh klien.

Pelunasan wajib dilakukan maksimal H-1 sebelum sesi sesuai Terms & Conditions.

---

# Alur Pembayaran

```text
Admin menerima pengajuan

↓

Invoice dibuat otomatis

↓

WhatsApp otomatis dikirim

↓

Klien transfer

↓

Klien mengirim bukti pembayaran melalui WhatsApp

↓

Admin melakukan verifikasi

↓

Status diperbarui

↓

Google Calendar diperbarui

↓

Pendapatan tercatat
```

---

# Yang Dilakukan Sistem

Saat invoice dibuat.

Sistem otomatis:

- Menghitung total pembayaran.
- Menghitung nominal DP.
- Menghitung sisa pelunasan.
- Membuat status pembayaran.
- Menunggu verifikasi admin.

---

# Yang Dilakukan Admin

Admin bertugas:

- Memeriksa bukti pembayaran.
- Memastikan nominal sesuai.
- Menekan tombol **Verifikasi DP**.
- Menekan tombol **Verifikasi Pelunasan**.

Sistem tidak boleh melakukan verifikasi otomatis.

---

# Status Pembayaran

Status resmi pembayaran terdiri dari:

```text
Menunggu DP

↓

DP Diterima

↓

Menunggu Pelunasan

↓

Lunas
```

---

# Saat DP Diverifikasi

Ketika admin menekan tombol **Verifikasi DP**, sistem otomatis:

✅ Mengubah status menjadi **DP Diterima**.

✅ Menambahkan aktivitas ke Riwayat Pengajuan.

✅ Mencatat transaksi pada Pendapatan.

✅ Membuat jadwal di Google Calendar.

✅ Memindahkan pengajuan ke daftar **Sesi Terjadwal**.

---

# Saat Pelunasan Diverifikasi

Ketika admin menekan tombol **Verifikasi Pelunasan**, sistem otomatis:

- Mengubah status menjadi **Lunas**.
- Memperbarui data Pendapatan.
- Menambahkan aktivitas pada Riwayat Pengajuan.

---

# Dashboard Admin

Dashboard harus menampilkan:

- Menunggu DP
- DP Diterima Hari Ini
- Menunggu Pelunasan
- Pelunasan Hari Ini

Admin dapat langsung membuka detail pembayaran dari dashboard.

---

# Pembatalan

Apabila klien tidak melakukan pembayaran DP dalam waktu yang ditentukan.

Admin dapat:

- Membatalkan pengajuan.
- Menambahkan alasan pembatalan.

Status berubah menjadi:

```text
Dibatalkan
```

Riwayat tetap disimpan.

---

# Refund

Pada MVP.

Refund mengikuti Terms & Conditions Lovery Photography.

Website hanya mencatat status refund apabila diperlukan.

Perhitungan refund dilakukan di luar sistem.

---

# Nomor Transaksi

Setiap transaksi memiliki ID otomatis.

Contoh:

```text
PAY-2026-000001
```

ID digunakan untuk pencarian transaksi dan laporan.

---

# Riwayat Pembayaran

Setiap pembayaran memiliki histori.

Contoh:

```text
01 Juli 2026
Invoice dibuat

──────────────

02 Juli 2026
DP Diverifikasi

──────────────

10 Juli 2026
Pelunasan Diverifikasi
```

Riwayat tidak dapat dihapus.

---

# Validasi

Admin hanya dapat memverifikasi pembayaran apabila:

- Invoice sudah dibuat.
- Pengajuan belum dibatalkan.

Pelunasan hanya dapat diverifikasi apabila status sebelumnya adalah **DP Diterima**.

---

# Edge Case

## Nominal DP Kurang

Admin dapat:

- Menolak verifikasi.
- Menghubungi klien melalui WhatsApp.

Status tetap **Menunggu DP**.

---

## Bukti Transfer Tidak Jelas

Admin tidak melakukan verifikasi.

Klien diminta mengirim ulang bukti pembayaran.

---

## Klien Membayar Lebih

Admin tetap dapat melakukan verifikasi.

Nominal aktual disimpan pada histori transaksi.

---

## Klien Membatalkan Setelah DP

Mengikuti Terms & Conditions Lovery Photography.

Website tidak menentukan keputusan refund.

---

## Admin Salah Verifikasi

Admin dapat mengubah status pembayaran melalui halaman detail transaksi.

Seluruh perubahan tercatat pada Riwayat Aktivitas.

---

# UX Rules

- Status pembayaran harus mudah dipahami.
- Warna status harus konsisten.
- Admin cukup satu klik untuk verifikasi.
- Seluruh nominal menggunakan format Rupiah.
- Semua perubahan harus memiliki dialog konfirmasi.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Payment Gateway.
- Verifikasi otomatis.
- Virtual Account.
- Midtrans/Xendit.
- QRIS Dinamis.
- Bukti pembayaran upload langsung melalui website.

---

# Ringkasan

Modul Pembayaran memastikan seluruh proses pembayaran tetap mengikuti cara kerja Lovery Photography saat ini.

Website tidak menggantikan proses pembayaran, tetapi membantu pencatatan, status, integrasi dengan Google Calendar, dashboard, dan laporan pendapatan secara otomatis setelah admin melakukan verifikasi.