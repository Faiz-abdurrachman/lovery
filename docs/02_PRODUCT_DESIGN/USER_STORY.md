---
title: User Story
module: Product Design
version: 1.0.0
status: DRAFT
owner: Product Team
priority: CRITICAL
related:
  - FEATURE_SPECIFICATION.md
  - SYSTEM_WORKFLOW.md
  - CLIENT_JOURNEY.md
  - ADMIN_JOURNEY.md
---

# 📖 User Story

## Pendahuluan

Dokumen ini berisi seluruh kebutuhan pengguna (User Story) yang menjadi dasar pengembangan Lovery Studio Management System.

Setiap User Story ditulis berdasarkan kebutuhan nyata pengguna dan dilengkapi dengan Acceptance Criteria agar implementasi dapat diuji dengan jelas.

Dokumen ini akan menjadi Product Backlog utama selama proses pengembangan.

---

# Format User Story

Seluruh User Story menggunakan format berikut.

```
Sebagai ...

Saya ingin ...

Sehingga ...
```

Setiap User Story wajib memiliki Acceptance Criteria.

---

# EPIC 1

# Landing Page

---

## US-001

Sebagai calon klien,

Saya ingin melihat informasi mengenai Lovery Photography,

Sehingga saya dapat mengenal layanan yang ditawarkan.

### Acceptance Criteria

- Landing Page dapat dibuka.
- Portfolio ditampilkan.
- Tentang Lovery tersedia.
- FAQ tersedia.
- CTA "Ajukan Sesi" terlihat jelas.

---

## US-002

Sebagai calon klien,

Saya ingin melihat daftar paket,

Sehingga saya dapat memilih layanan yang sesuai.

### Acceptance Criteria

- Paket ditampilkan berdasarkan kategori.
- Harga terlihat jelas.
- Detail paket dapat dibuka.

---

# EPIC 2

# Pengajuan Sesi

---

## US-003

Sebagai calon klien,

Saya ingin mengajukan sesi,

Sehingga admin dapat melakukan peninjauan.

### Acceptance Criteria

- Form dapat diisi.
- Nomor WhatsApp wajib.
- Tanggal wajib dipilih.
- Persetujuan Terms & Conditions wajib dicentang.
- Status menjadi "Menunggu Review".

---

## US-004

Sebagai calon klien,

Saya ingin memilih Add-On,

Sehingga layanan dapat disesuaikan dengan kebutuhan saya.

### Acceptance Criteria

- Dapat memilih lebih dari satu Add-On.
- Harga berubah secara real-time.
- Ringkasan pembayaran diperbarui otomatis.

---

# EPIC 3

# Status Pengajuan

---

## US-005

Sebagai klien,

Saya ingin melihat status pengajuan,

Sehingga saya mengetahui proses yang sedang berlangsung.

### Acceptance Criteria

- Status selalu diperbarui.
- Timeline terlihat.
- Status pembayaran terlihat.
- Detail sesi dapat dibuka.

---

# EPIC 4

# Dashboard Admin

---

## US-006

Sebagai admin,

Saya ingin melihat pekerjaan yang harus diselesaikan hari ini,

Sehingga saya mengetahui prioritas pekerjaan.

### Acceptance Criteria

- Dashboard menjadi halaman pertama setelah login.
- Workspace Tugas tampil di bagian paling atas.
- Task diurutkan berdasarkan prioritas.

---

## US-007

Sebagai admin,

Saya ingin melihat agenda hari ini,

Sehingga saya mengetahui seluruh sesi yang akan berlangsung.

### Acceptance Criteria

- Agenda hari ini ditampilkan.
- Klik agenda membuka detail pengajuan.

---

# EPIC 5

# Review Pengajuan

---

## US-008

Sebagai admin,

Saya ingin menerima pengajuan,

Sehingga sistem membuat invoice dan membuka WhatsApp.

### Acceptance Criteria

- Status berubah menjadi "Menunggu DP".
- Invoice dibuat otomatis.
- Preview WhatsApp muncul sebelum dikirim.

---

## US-009

Sebagai admin,

Saya ingin menolak pengajuan,

Sehingga klien menerima informasi melalui WhatsApp.

### Acceptance Criteria

- Status menjadi "Ditolak".
- Alasan penolakan wajib diisi.
- WhatsApp dibuka otomatis.

---

## US-010

Sebagai admin,

Saya ingin meminta penjadwalan ulang,

Sehingga saya dapat mendiskusikan jadwal baru dengan klien.

### Acceptance Criteria

- Status menjadi "Perlu Penjadwalan Ulang".
- WhatsApp dibuka otomatis.

---

# EPIC 6

# Pembayaran

---

## US-011

Sebagai admin,

Saya ingin memverifikasi DP,

Sehingga jadwal resmi masuk ke kalender studio.

### Acceptance Criteria

- Status menjadi "DP Diterima".
- Pendapatan bertambah.
- Google Calendar dibuat.

---

## US-012

Sebagai admin,

Saya ingin memverifikasi pelunasan,

Sehingga transaksi dinyatakan selesai.

### Acceptance Criteria

- Status menjadi "Lunas".
- Pendapatan diperbarui.

---

# EPIC 7

# Google Drive

---

## US-013

Sebagai admin,

Saya ingin mengirim link Google Drive,

Sehingga klien menerima hasil dokumentasi.

### Acceptance Criteria

- Link dapat disimpan.
- WhatsApp dibuka.
- Timeline diperbarui.
- Status menjadi "Hasil Dikirim".

---

# EPIC 8

# Pendapatan

---

## US-014

Sebagai owner,

Saya ingin melihat laporan pendapatan,

Sehingga saya mengetahui kondisi bisnis.

### Acceptance Criteria

- Revenue tampil.
- Cash In tampil.
- Outstanding tampil.
- Grafik tampil.
- Export Excel tersedia.

---

# EPIC 9

# Pengaturan

---

## US-015

Sebagai admin,

Saya ingin mengubah konfigurasi sistem,

Sehingga informasi operasional selalu sesuai.

### Acceptance Criteria

- Nomor WhatsApp dapat diubah.
- Rekening dapat diubah.
- QRIS dapat diubah.
- Jam operasional dapat diubah.
- Template WhatsApp dapat diubah.

---

# Non Functional Requirements

Selain kebutuhan fungsional, sistem juga harus memenuhi kebutuhan berikut.

## Performa

- Halaman utama dimuat dengan cepat.
- Dashboard responsif.
- Pencarian cepat.

---

## Keamanan

- Hanya admin yang dapat mengakses Dashboard.
- Data pembayaran tidak dapat diubah tanpa hak akses.

---

## Responsif

- Mendukung Desktop.
- Mendukung Tablet.
- Mendukung Mobile.

---

## Kemudahan Penggunaan

- Maksimal 3 klik menuju fitur utama.
- Bahasa Indonesia digunakan pada seluruh antarmuka.
- Tombol utama mudah ditemukan.

---

# Prioritas MVP

## Prioritas Tinggi

- Landing Page
- Pengajuan Sesi
- Dashboard
- Invoice
- Pembayaran
- Google Calendar
- WhatsApp
- Status Pengajuan

---

## Prioritas Menengah

- Pendapatan
- Database Klien
- Pengaturan

---

## Prioritas Rendah

- AI Insight
- Payment Gateway
- Multi Admin
- Integrasi Email

---

# Business View

Seluruh User Story berasal dari kebutuhan nyata operasional Lovery Photography.

Tidak ada fitur yang dibuat tanpa tujuan bisnis yang jelas.

---

# UX View

Setiap User Story harus menghasilkan pengalaman yang sederhana, jelas, dan mengurangi pekerjaan manual pengguna.

---

# Developer Notes

- Setiap User Story harus diterjemahkan menjadi task development.
- Acceptance Criteria menjadi dasar pengujian QA.
- Seluruh implementasi harus mengacu pada Business Rules.
- User Story yang sudah selesai harus diberi status "Done" pada backlog proyek.

---

# Ringkasan

Dokumen User Story menjadi Product Backlog utama Lovery Studio Management System.

Dokumen ini menjembatani kebutuhan bisnis dengan implementasi teknis sehingga seluruh tim memiliki pemahaman yang sama mengenai tujuan setiap fitur yang dikembangkan.