---
title: Pendapatan
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PEMBAYARAN.md
  - STATUS_PENGAJUAN.md
  - DASHBOARD.md
---

# 💰 Pendapatan

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Pendapatan |
| Aktor | Admin, Owner |
| Perhitungan | Otomatis |
| Export | Excel |
| Dashboard | Ya |

---

# Pendahuluan

Modul Pendapatan digunakan untuk mencatat, menghitung, dan menampilkan seluruh pemasukan studio secara otomatis.

Setiap pembayaran yang telah diverifikasi oleh admin akan langsung tercatat sebagai transaksi.

Modul ini tidak hanya menampilkan total pendapatan, tetapi juga membantu owner memahami kondisi cashflow studio.

---

# Tujuan

Modul ini dibuat untuk:

- Mengetahui total pendapatan studio.
- Melihat cashflow secara real-time.
- Mengurangi pencatatan manual.
- Mempermudah pembuatan laporan bulanan.
- Membantu owner mengambil keputusan bisnis.

---

# Filosofi

Pendapatan hanya dihitung berdasarkan pembayaran yang **sudah diverifikasi oleh admin**.

Sistem tidak menghitung pembayaran yang belum dikonfirmasi.

Dengan demikian seluruh data pendapatan selalu sesuai dengan kondisi sebenarnya.

---

# Jenis Pendapatan

Pendapatan dibagi menjadi beberapa kategori.

## 1. DP Masuk

Total seluruh uang muka yang telah diterima.

Contoh:

```
Rp 3.500.000
```

---

## 2. Pelunasan

Total pembayaran pelunasan.

Contoh:

```
Rp 12.000.000
```

---

## 3. Total Pendapatan

Merupakan akumulasi seluruh pembayaran yang telah diterima.

Perhitungan:

```
DP

+

Pelunasan

=

Total Pendapatan
```

---

## 4. Outstanding Payment

Total tagihan yang belum dibayar oleh klien.

Outstanding **bukan pendapatan**, tetapi digunakan untuk melihat potensi pemasukan yang masih menunggu pembayaran.

---

# Dashboard Pendapatan

Dashboard harus menampilkan:

```
Pendapatan Hari Ini

Pendapatan Minggu Ini

Pendapatan Bulan Ini

Pendapatan Tahun Ini

────────────────────

DP Masuk

Pelunasan

Outstanding Payment

────────────────────

Jumlah Pengajuan

Jumlah Pengajuan Selesai

────────────────────

Grafik Pendapatan
```

---

# Grafik

Dashboard menyediakan grafik:

## Pendapatan Bulanan

```
Jan

Feb

Mar

Apr

...
```

---

## Pendapatan Berdasarkan Kategori

Misalnya:

```
Graduation

Wedding

Casual

Event
```

Owner dapat melihat kategori layanan yang paling banyak menghasilkan pendapatan.

---

# Data Transaksi

Setiap pembayaran yang diverifikasi akan menghasilkan satu data transaksi.

Minimal berisi:

- Nomor Transaksi
- Nomor Invoice
- Nama Klien
- Tanggal Pembayaran
- Jenis Pembayaran
- Nominal
- Admin yang Memverifikasi

---

# Cashflow

Dashboard menampilkan:

## Cash In

Seluruh uang yang telah masuk.

Meliputi:

- DP
- Pelunasan

---

## Outstanding

Tagihan yang masih menunggu pembayaran.

Contoh:

```
Rp 7.500.000
```

---

# Filter

Admin dapat memfilter berdasarkan:

- Hari
- Minggu
- Bulan
- Tahun
- Kategori
- Status Pembayaran

---

# Export

Seluruh data dapat diekspor menjadi:

✅ Excel (.xlsx)

Laporan minimal berisi:

- Nama Klien
- Invoice
- DP
- Pelunasan
- Total
- Status
- Tanggal

---

# Dashboard Widget

Contoh widget.

```
💰 Pendapatan Bulan Ini

Rp 18.500.000

↑ 15%

dibanding bulan lalu
```

---

```
🟠 Outstanding

Rp 4.200.000

5 Klien
```

---

```
🟢 DP Hari Ini

Rp 850.000
```

---

# Riwayat Pendapatan

Admin dapat melihat histori transaksi.

Contoh.

```
02 Juli

DP

Faiz

Rp50.000

────────────

08 Juli

Pelunasan

Faiz

Rp450.000
```

---

# Validasi

Pendapatan hanya bertambah apabila:

- Admin menekan tombol Verifikasi DP.
- Admin menekan tombol Verifikasi Pelunasan.

Pendapatan tidak berubah apabila invoice dibuat atau pengajuan diterima.

---

# Edge Case

## Admin Salah Verifikasi

Admin dapat melakukan koreksi.

Seluruh perubahan dicatat dalam histori.

---

## Pengajuan Dibatalkan

Pendapatan tidak berubah.

Outstanding diperbarui.

---

## Refund

Refund dicatat sebagai transaksi negatif.

Contoh:

```
- Rp300.000
```

Seluruh histori tetap disimpan.

---

# UX Rules

- Semua nominal menggunakan format Rupiah.
- Grafik mudah dipahami.
- Filter mudah digunakan.
- Export maksimal satu klik.
- Widget selalu menampilkan data terbaru.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Profit & Loss.
- Pengeluaran Operasional.
- Laba Bersih.
- Target Pendapatan Bulanan.
- Forecast Pendapatan.
- Integrasi Software Akuntansi.

---

# Ringkasan

Modul Pendapatan membantu Lovery Photography memantau seluruh pemasukan studio secara real-time.

Data yang ditampilkan selalu berasal dari pembayaran yang telah diverifikasi sehingga owner dapat memonitor cashflow, outstanding payment, dan performa bisnis dengan lebih mudah tanpa perlu menghitung secara manual.