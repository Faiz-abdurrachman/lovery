---
title: Google Drive
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - STATUS_PENGAJUAN.md
  - WHATSAPP.md
  - PENGINGAT.md
---

# ☁️ Google Drive

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Google Drive |
| Aktor | Admin |
| Penyimpanan | Google Drive |
| Upload File | Tidak melalui website |
| Yang Disimpan Sistem | Link Google Drive |

---

# Pendahuluan

Google Drive merupakan media resmi untuk menyerahkan hasil foto dan video kepada klien.

Lovery Studio Management System **tidak digunakan untuk mengunggah file hasil dokumentasi**.

Proses editing tetap dilakukan seperti biasa.

Setelah hasil selesai, editor atau admin mengunggah file ke Google Drive.

Website hanya menyimpan tautan (link) Google Drive dan membantu proses distribusi kepada klien.

---

# Tujuan

Modul ini dibuat untuk:

- Mengurangi kesalahan pengiriman link.
- Menyimpan histori link Google Drive.
- Menghubungkan hasil editing dengan data klien.
- Mempermudah admin mengirim hasil melalui WhatsApp.

---

# Filosofi

Website tidak menggantikan Google Drive.

Website hanya menjadi pusat administrasi.

Google Drive tetap menjadi tempat penyimpanan resmi hasil dokumentasi.

---

# Workflow

```text
Sesi Selesai

↓

Editing

↓

Upload ke Google Drive

↓

Salin Link

↓

Tempel ke Website

↓

Klik Kirim

↓

WhatsApp Terbuka

↓

Link Terkirim

↓

Status Selesai
```

---

# Yang Dilakukan Admin

Admin cukup:

- Menyalin link Google Drive.
- Membuka detail pengajuan.
- Menempelkan link.
- Menekan tombol **Simpan & Kirim**.

---

# Yang Dilakukan Sistem

Setelah admin menekan tombol **Simpan & Kirim**, sistem akan:

- Menyimpan link Google Drive.
- Menambahkan aktivitas pada Timeline.
- Mengubah status menjadi **Hasil Dikirim**.
- Menyiapkan pesan WhatsApp otomatis.
- Membuka WhatsApp dengan pesan yang sudah terisi.

---

# Informasi Yang Disimpan

Setiap link Google Drive memiliki data berikut:

- Nomor Pengajuan
- Nomor Invoice
- Nama Klien
- Tanggal Upload
- Link Google Drive
- Admin Pengirim

---

# Masa Akses File

Website hanya menampilkan informasi masa aktif file.

Ketentuan saat ini:

## Paket Reguler

Link aktif maksimal **14 hari** sejak dikirim.

---

## Paket Premium

Link aktif maksimal **30 hari** sejak dikirim.

---

Website hanya mengingatkan admin mengenai masa aktif tersebut.

Pengaturan file di Google Drive tetap dilakukan secara manual.

---

# Dashboard

Dashboard menampilkan:

```
📁 Hasil Belum Dikirim

──────────────────

Faiz

Graduation

Selesai Editing

[ Kirim Link ]

──────────────────

Alya

Wedding

Belum Upload

[ Detail ]
```

---

# Timeline

Setiap aktivitas dicatat.

Contoh:

```text
18 Juli

Editing Selesai

──────────────

18 Juli

Link Google Drive Ditambahkan

──────────────

18 Juli

WhatsApp Dibuka

──────────────

18 Juli

Status Hasil Dikirim
```

---

# Validasi

Admin tidak dapat mengirim link apabila:

- Link kosong.
- Status belum **Proses Editing**.
- Pengajuan telah dibatalkan.

---

# Edge Case

## Link Salah

Admin dapat memperbarui link.

Timeline mencatat revisi.

Klien dapat dikirim ulang melalui WhatsApp.

---

## File Belum Selesai Diupload

Admin dapat menyimpan draft tanpa mengirim.

---

## Klien Kehilangan Link

Admin dapat membuka detail pengajuan.

Klik:

```
Kirim Ulang Link
```

WhatsApp akan terbuka kembali.

---

## Link Kedaluwarsa

Dashboard memberikan pengingat bahwa masa akses telah berakhir.

Admin dapat memperbarui link apabila diperlukan.

---

# UX Rules

- Admin cukup satu halaman.
- Tidak perlu membuka banyak menu.
- Tombol "Simpan & Kirim" menjadi aksi utama.
- Link dapat disalin dengan satu klik.
- Riwayat pengiriman selalu tersedia.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Integrasi Google Drive API.
- Membuat folder otomatis.
- Upload langsung dari website.
- Generate link otomatis.
- Menampilkan kapasitas penyimpanan Google Drive.

---

# Ringkasan

Google Drive tetap menjadi media penyimpanan resmi Lovery Photography.

Lovery Studio Management System hanya menghubungkan proses administrasi dengan hasil dokumentasi, sehingga admin dapat mengirim hasil kepada klien dengan lebih cepat, lebih rapi, dan seluruh riwayat tetap terdokumentasi.