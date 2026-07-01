---
title: Add-On
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - PENGAJUAN_SESI.md
  - INVOICE.md
  - PEMBAYARAN.md
  - PENDAPATAN.md
---

# 🎁 Add-On

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Add-On |
| Aktor | Klien, Admin |
| Perhitungan Harga | Otomatis |
| Mengubah Invoice | Ya |
| Mengubah Total Pembayaran | Ya |

---

# Pendahuluan

Add-On merupakan layanan tambahan yang dapat dipilih oleh klien untuk melengkapi paket utama.

Add-On bersifat opsional.

Klien bebas memilih satu atau lebih Add-On sesuai kebutuhan.

Sistem akan menghitung seluruh perubahan harga secara otomatis sehingga admin tidak perlu melakukan perhitungan manual.

---

# Tujuan

Modul ini dibuat untuk:

- Mempermudah klien memilih layanan tambahan.
- Mengurangi kesalahan perhitungan harga.
- Mempercepat pembuatan invoice.
- Menjaga histori perubahan transaksi.

---

# Filosofi

Paket utama merupakan dasar transaksi.

Add-On merupakan penyesuaian sesuai kebutuhan klien.

Setiap perubahan Add-On harus tercatat sebagai bagian dari histori transaksi.

---

# Alur Add-On

```text
Klien Memilih Paket

↓

Klien Memilih Add-On

↓

Harga Berubah Otomatis

↓

Pengajuan Dikirim

↓

Admin Review

↓

Invoice Dibuat

↓

Apabila Ada Add-On Baru

↓

Invoice Baru Dibuat
```

---

# Pemilihan Add-On

Klien dapat memilih lebih dari satu Add-On.

Contoh:

```
☑ Extra Foto

☑ Drone

☑ Cetak Album

☑ Extra Jam

☑ Video Highlight
```

Jumlah pilihan tidak dibatasi.

---

# Perhitungan Harga

Setiap Add-On memiliki harga masing-masing.

Contoh.

```
Paket

Rp600.000

────────────

Drone

+ Rp300.000

────────────

Extra Jam

+ Rp150.000

────────────

TOTAL

Rp1.050.000
```

Perubahan harga dilakukan secara **real-time**.

Klien langsung melihat total biaya sebelum mengirim pengajuan.

---

# Tampilan Harga

Website harus selalu menampilkan:

```
Harga Paket

+

Total Add-On

=

Total Keseluruhan
```

Nominal diperbarui setiap kali klien memilih atau menghapus Add-On.

---

# Yang Dilakukan Sistem

Saat Add-On dipilih.

Sistem otomatis:

- Menghitung ulang total harga.
- Menghitung ulang DP.
- Menghitung ulang sisa pelunasan.
- Menampilkan total terbaru.

---

# Yang Dilakukan Admin

Admin dapat:

- Menambah Add-On.
- Menghapus Add-On.
- Mengubah harga apabila diperlukan.

Seluruh perubahan tercatat pada histori.

---

# Add-On Setelah Invoice

Apabila klien meminta Add-On baru setelah invoice dikirim.

Admin dapat:

```
Tambah Add-On

↓

Sistem Membuat Invoice Baru

↓

Invoice Lama Menjadi Histori

↓

Invoice Baru Menjadi Aktif
```

Keputusan ini menjaga riwayat transaksi tetap rapi.

---

# Add-On Setelah DP

Apabila Add-On ditambahkan setelah DP diterima.

Sistem:

- Menghitung ulang total pembayaran.
- Menghitung ulang sisa pelunasan.
- Membuat invoice revisi.
- Menyimpan histori invoice sebelumnya.

DP yang sudah dibayarkan tetap tercatat.

Yang berubah hanyalah sisa tagihan.

---

# Dashboard

Dashboard Add-On menampilkan:

- Add-On paling sering dipilih.
- Total pendapatan dari Add-On.
- Add-On berdasarkan kategori layanan.

Contoh.

```
🥇 Drone

42 Kali

────────────

📸 Extra Jam

35 Kali

────────────

🎬 Video Highlight

21 Kali
```

---

# Riwayat

Setiap perubahan Add-On dicatat.

Contoh.

```
01 Juli

Invoice Dibuat

────────────

02 Juli

Tambah Drone

────────────

Invoice Baru Dibuat

────────────

03 Juli

Tambah Extra Jam
```

Riwayat tidak dapat dihapus.

---

# Validasi

Admin tidak dapat menambahkan Add-On apabila:

- Pengajuan telah selesai.
- Invoice telah ditutup.
- Status telah diarsipkan.

---

# Edge Case

## Klien Membatalkan Add-On

Admin membuat invoice revisi.

Sistem menghitung ulang total pembayaran.

---

## Admin Salah Memilih Add-On

Admin dapat menghapus sebelum invoice dikirim.

Apabila invoice sudah dikirim, sistem membuat invoice revisi.

---

## Harga Add-On Berubah

Perubahan harga hanya berlaku untuk pengajuan baru.

Pengajuan lama tetap menggunakan harga saat invoice dibuat.

---

## Klien Memilih Banyak Add-On

Tidak ada batasan jumlah.

Seluruh harga tetap dihitung otomatis.

---

# UX Rules

- Harga berubah secara real-time.
- Tidak perlu refresh halaman.
- Total pembayaran selalu terlihat.
- Ringkasan harga selalu berada di sisi kanan (desktop) atau bagian bawah (mobile).
- Add-On menggunakan checkbox agar mudah dipilih.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Bundle Add-On.
- Diskon otomatis.
- Promo musiman.
- Rekomendasi Add-On berdasarkan paket.
- Paket custom.

---

# Ringkasan

Modul Add-On memungkinkan klien menyesuaikan layanan sesuai kebutuhan tanpa mengubah alur utama sistem.

Seluruh perubahan harga dilakukan secara otomatis dan seluruh revisi transaksi disimpan sebagai histori sehingga proses administrasi tetap transparan, mudah dilacak, dan sesuai dengan operasional Lovery Photography.