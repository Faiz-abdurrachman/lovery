---
title: Pengingat
module: Business Rules
version: 1.0.0
status: DRAFT
owner: Product Team
related:
  - STATUS_PENGAJUAN.md
  - WHATSAPP.md
  - GOOGLE_CALENDAR.md
  - PENDAPATAN.md
---

# ⏰ Pengingat

## Ringkasan Modul

| Informasi | Nilai |
|-----------|-------|
| Modul | Pengingat |
| Aktor | Admin |
| Jenis | Reminder & Task Management |
| Otomatis | Ya |
| Prioritas | Tinggi |

---

# Pendahuluan

Modul Pengingat merupakan pusat aktivitas harian admin.

Berbeda dengan notifikasi biasa, modul ini tidak hanya memberi tahu bahwa suatu kejadian telah terjadi.

Modul ini membantu admin mengetahui tindakan apa yang harus segera dilakukan.

Dengan adanya modul ini, admin tidak perlu lagi mengingat pekerjaan secara manual.

Dashboard akan menyusun daftar pekerjaan berdasarkan kondisi terbaru dari setiap pengajuan.

---

# Tujuan

Modul ini dibuat untuk:

- Mengurangi pekerjaan yang terlupakan.
- Mengurangi ketergantungan pada ingatan admin.
- Membantu admin menentukan prioritas pekerjaan.
- Menjadikan dashboard sebagai pusat operasional studio.

---

# Filosofi

Admin tidak boleh bertanya:

> "Hari ini saya harus mengerjakan apa?"

Dashboard harus langsung menjawab pertanyaan tersebut.

---

# Jenis Pengingat

Pengingat dibagi menjadi beberapa kategori.

## 1. Menunggu Review

Pengajuan baru yang belum direview.

Contoh:

```
🔶 5 Pengajuan Baru
```

Prioritas:

⭐⭐⭐⭐⭐

---

## 2. Menunggu DP

Klien sudah menerima invoice tetapi belum melakukan pembayaran DP.

Dashboard menampilkan:

- Nama Klien
- Nomor Pengajuan
- Tanggal Pengajuan
- Jumlah Hari Menunggu

Contoh:

```
🔶 Faiz

Menunggu DP

2 Hari
```

---

## 3. Menunggu Pelunasan

Pelunasan belum diterima.

Reminder muncul menjelang batas pelunasan sesuai Terms & Conditions.

---

## 4. Jadwal Hari Ini

Seluruh sesi yang berlangsung hari ini.

Contoh:

```
📸 Graduation

Faiz

08.00

UII Jakal
```

---

## 5. Jadwal Besok

Reminder H-1.

Admin dapat langsung membuka WhatsApp.

---

## 6. Proses Editing

Sesi yang telah selesai tetapi masih dalam proses editing.

Dashboard menampilkan:

- Nama Klien
- Tanggal Sesi
- Hari ke berapa proses editing

---

## 7. Hasil Belum Dikirim

Google Drive sudah siap tetapi belum dikirim.

Prioritas tinggi.

---

## 8. Pengajuan Perlu Penjadwalan Ulang

Admin perlu melanjutkan komunikasi dengan klien melalui WhatsApp.

---

# Prioritas Pengingat

Setiap reminder memiliki tingkat prioritas.

| Prioritas | Warna |
|-----------|--------|
| Sangat Tinggi | 🔴 |
| Tinggi | 🟠 |
| Sedang | 🟡 |
| Rendah | 🔵 |

Dashboard mengurutkan berdasarkan prioritas.

---

# Cara Kerja

Pengingat tidak dibuat manual.

Pengingat muncul otomatis berdasarkan status pengajuan.

Contoh:

```
Status

↓

Menunggu DP

↓

Sistem membuat reminder
```

---

# Dashboard

Bagian atas dashboard menampilkan:

```
🔥 Yang Harus Dikerjakan Hari Ini
```

Contoh:

```
🔴 Verifikasi DP

Faiz

INV00012026

[ Verifikasi ]

────────────────

🟠 Reminder Pelunasan

Alya

H-1

[ Hubungi WA ]

────────────────

🔵 Upload Google Drive

Dimas

[ Upload ]
```

---

# Action Card

Setiap reminder mempunyai aksi langsung.

Contoh.

## Menunggu Review

```
[ Review ]
```

---

## Menunggu DP

```
[ Verifikasi DP ]

[ WhatsApp ]
```

---

## Jadwal Hari Ini

```
[ Lihat Detail ]
```

---

## Editing

```
[ Upload Google Drive ]
```

---

## Google Drive

```
[ Kirim WhatsApp ]
```

---

# Reminder Otomatis

Sistem membuat reminder ketika:

✅ Pengajuan baru.

✅ Invoice dikirim.

✅ H-1 pelunasan.

✅ H-1 sesi.

✅ Editing belum selesai.

✅ Google Drive belum dikirim.

---

# Reminder Tidak Ditampilkan Lagi

Reminder otomatis hilang apabila:

- Tugas telah diselesaikan.
- Status berubah.
- Pengajuan dibatalkan.

---

# Dashboard Counter

Dashboard juga menampilkan jumlah reminder.

Contoh.

```
🔥 Hari Ini

12 Tugas

────────────

🔴 2 Mendesak

🟠 4 Penting

🟡 6 Normal
```

---

# Riwayat

Setiap reminder yang selesai dicatat.

Contoh.

```
02 Juli

Reminder Pelunasan

↓

Diselesaikan

oleh Admin
```

---

# Validasi

Reminder hanya dibuat apabila:

- Pengajuan aktif.
- Status sesuai.
- Belum pernah diselesaikan.

---

# Edge Case

## Admin Tidak Membuka Dashboard

Reminder tetap tersedia.

Tidak hilang.

---

## Reminder Terlambat

Tetap berada di urutan paling atas.

---

## Jadwal Sudah Lewat

Reminder otomatis berubah menjadi:

```
Terlambat
```

---

## Google Drive Belum Dikirim Selama 14 Hari

Dashboard memberikan badge merah.

Prioritas naik menjadi:

```
Sangat Tinggi
```

---

# UX Rules

- Dashboard harus fokus pada tindakan.
- Maksimal satu klik menuju halaman terkait.
- Prioritas menggunakan warna yang konsisten.
- Pengingat yang terlambat selalu berada di urutan paling atas.
- Action Button harus terlihat jelas.

---

# Future Improvement

Versi berikutnya dapat menambahkan:

- Push Notification.
- Telegram Notification.
- Email Reminder.
- Kalender tugas.
- Daily Digest.

---

# Ringkasan

Modul Pengingat merupakan pusat aktivitas harian admin.

Dashboard tidak hanya menampilkan informasi, tetapi membantu admin mengetahui pekerjaan apa yang harus segera diselesaikan.

Dengan pendekatan ini, Lovery Studio Management System menjadi asisten operasional yang aktif, bukan sekadar aplikasi pencatat data.