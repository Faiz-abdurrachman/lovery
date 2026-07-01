---
title: Dashboard Admin
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
priority: HIGH
related:
  - PENGINGAT.md
  - STATUS_PENGAJUAN.md
  - PENDAPATAN.md
  - GOOGLE_CALENDAR.md
---

# 🖥️ Dashboard Admin

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Dashboard Admin |
| Aktor | Admin |
| Fungsi | Pusat Operasional Studio |
| Prioritas | Sangat Tinggi |

---

# Pendahuluan

Dashboard Admin merupakan halaman pertama yang dibuka setelah admin berhasil login.

Dashboard bukan hanya menampilkan data.

Dashboard merupakan **pusat operasional Lovery Photography**.

Seluruh pekerjaan harian admin dimulai dari halaman ini.

Target utama dashboard adalah membuat admin tidak perlu berpindah-pindah halaman hanya untuk mengetahui pekerjaan yang harus dilakukan.

---

# Filosofi Dashboard

Dashboard bukan tempat melihat angka.

Dashboard adalah tempat bekerja.

Ketika admin membuka dashboard, sistem harus langsung menjawab pertanyaan:

> "Apa yang harus saya kerjakan hari ini?"

---

# Prinsip Dashboard

Dashboard harus:

- sederhana
- cepat dipahami
- fokus pada tindakan
- mobile friendly
- tidak penuh grafik
- membantu pekerjaan admin

---

# Struktur Dashboard

Dashboard dibagi menjadi empat workspace utama.

```
🔥 Workspace Tugas

↓

📅 Workspace Agenda

↓

💰 Workspace Pendapatan

↓

📝 Workspace Aktivitas
```

---

# Workspace 1

# 🔥 Yang Harus Dikerjakan Hari Ini

Ini merupakan bagian paling penting.

Selalu berada di posisi paling atas.

---

## Contoh

```
🔥 Hari Ini

────────────────────

🔴 Verifikasi DP

Faiz

INV00012026

[ Verifikasi ]

────────────────────

🟠 Reminder Pelunasan

Alya

[ Hubungi WA ]

────────────────────

🟡 Review Pengajuan

3 Pengajuan Baru

[ Review ]
```

---

## Aturan

Semua task diurutkan berdasarkan prioritas.

Prioritas:

```
Merah

↓

Orange

↓

Kuning

↓

Hijau
```

---

# Workspace 2

# 📅 Agenda Hari Ini

Menampilkan seluruh sesi yang berlangsung hari ini.

Contoh.

```
08.00

Graduation

Faiz

UII Jakal

────────────────────

13.00

Casual

Nadia

Malioboro

────────────────────

17.00

Wedding

Fajar
```

Klik salah satu agenda.

↓

Masuk ke Detail Pengajuan.

---

# Workspace 3

# 💰 Pendapatan

Widget sederhana.

```
Hari Ini

Rp850.000

────────────

Bulan Ini

Rp18.500.000

────────────

Outstanding

Rp4.200.000

────────────

DP Hari Ini

Rp500.000
```

Klik widget.

↓

Masuk halaman Pendapatan.

---

# Workspace 4

# 📝 Aktivitas Terbaru

Menampilkan aktivitas terakhir.

Contoh.

```
09.30

Invoice Dibuat

────────────

09.35

DP Diverifikasi

────────────

09.36

Google Calendar Dibuat

────────────

09.37

WhatsApp Dibuka
```

---

# Widget Dashboard

Dashboard memiliki widget berikut.

---

## Pengajuan Baru

```
5
```

---

## Menunggu DP

```
3
```

---

## Menunggu Pelunasan

```
4
```

---

## Editing

```
2
```

---

## Hasil Belum Dikirim

```
1
```

---

## Jadwal Hari Ini

```
6
```

---

# Quick Action

Dashboard memiliki tombol cepat.

```
+ Pengajuan Baru

+ Invoice

+ Cari Klien

+ Kalender

+ Pendapatan
```

---

# Global Search

Dashboard menyediakan pencarian global.

Admin dapat mencari menggunakan:

- Nama Klien
- Nomor WhatsApp
- Nomor Pengajuan
- Nomor Invoice

Hasil pencarian langsung menampilkan data terkait.

---

# Dashboard Insights

Selain angka.

Dashboard juga memberikan insight.

Contoh.

```
📈 Pendapatan naik

18%

dibanding bulan lalu.
```

---

```
🥇 Paket Terlaris

Graduation Premium
```

---

```
📍 Kota Terbanyak

Yogyakarta
```

---

```
💰 Outstanding

Rp4.200.000

5 Klien
```

---

# Kalender Mini

Dashboard memiliki mini calendar.

Hari yang memiliki sesi ditandai.

Klik tanggal.

↓

Agenda hari tersebut muncul.

---

# Reminder

Reminder muncul otomatis.

Contoh.

```
🔴 H-1 Pelunasan

──────────────────

🟠 H-1 Sesi

──────────────────

🟡 Google Drive Belum Dikirim
```

---

# Action Card

Setiap task memiliki tombol aksi.

Contoh.

## Menunggu DP

```
[ Verifikasi ]

[ WhatsApp ]
```

---

## Editing

```
[ Upload Drive ]
```

---

## Pengajuan Baru

```
[ Review ]
```

---

# Notifikasi

Dashboard menampilkan badge.

Contoh.

```
🔴 5

Task Mendesak
```

Badge hilang setelah tugas selesai.

---

# Empty State

Apabila tidak ada pekerjaan.

Dashboard menampilkan.

```
🎉

Semua pekerjaan hari ini telah selesai.

Selamat bekerja!
```

---

# Mobile Version

Pada perangkat mobile.

Workspace berubah menjadi.

```
Task

↓

Agenda

↓

Revenue

↓

Activity
```

Semua card dapat di-scroll secara vertikal.

---

# Validasi

Dashboard hanya menampilkan data aktif.

Pengajuan yang selesai atau diarsipkan tidak muncul pada daftar tugas.

---

# Edge Case

## Tidak Ada Jadwal Hari Ini

Agenda menampilkan:

```
Tidak ada sesi hari ini.
```

---

## Tidak Ada Reminder

Workspace Task tetap muncul.

Isi:

```
Tidak ada pekerjaan mendesak.
```

---

## Sinkronisasi Google Calendar Gagal

Task otomatis muncul.

```
⚠ Sinkronisasi Gagal

[ Sinkronkan ]
```

---

# UX Rules

Dashboard harus dapat dipahami dalam waktu kurang dari 5 detik.

Admin tidak boleh melakukan lebih dari 2 klik untuk memulai pekerjaan.

Semua informasi penting harus terlihat tanpa perlu scroll pada tampilan desktop.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Dark Mode Dashboard
- Drag & Drop Widget
- Dashboard Personalisasi
- AI Insight
- Statistik Mingguan

---

# Ringkasan

Dashboard Admin merupakan pusat operasional Lovery Studio Management System.

Seluruh aktivitas administrasi dimulai dari halaman ini.

Dashboard dirancang bukan hanya untuk menampilkan informasi, tetapi untuk membantu admin mengetahui prioritas pekerjaan, menyelesaikan tugas lebih cepat, serta mengurangi kemungkinan terjadinya kesalahan operasional.