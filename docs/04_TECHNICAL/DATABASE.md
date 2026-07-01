---
title: Database Design
module: Technical
version: 1.0.0
status: DRAFT
owner: Technical Team
priority: CRITICAL
related:
  - SYSTEM_ARCHITECTURE.md
  - ERD.md
  - API_SPECIFICATION.md
---

# 🗄️ Database Design

## Pendahuluan

Dokumen ini menjelaskan rancangan database Lovery Studio Management System.

Database dirancang menggunakan PostgreSQL dengan Prisma ORM.

Seluruh relasi tabel mengikuti Business Rules yang telah disepakati.

---

# Filosofi Database

Database tidak dibuat berdasarkan halaman.

Database dibuat berdasarkan **entitas bisnis**.

Contoh.

❌ Halaman Invoice

↓

bukan berarti harus ada tabel invoice saja.

Tetapi harus melihat hubungan bisnis.

Client

↓

Submission

↓

Invoice

↓

Payment

↓

Timeline

---

# Database Principle

- Normalisasi minimal 3NF
- Soft Delete
- Audit Timestamp
- UUID sebagai Primary Key
- Public Number dipisahkan
- Foreign Key wajib
- Cascade seminimal mungkin

---

# ID Strategy

Setiap tabel memiliki dua identitas.

## Internal ID

Menggunakan UUID.

Contoh.

```
id

UUID
```

Digunakan untuk:

- Relasi
- API
- Database

Tidak pernah ditampilkan kepada pengguna.

---

## Public ID

Digunakan pada tampilan.

Contoh.

Submission Number

```
LVR-0001-2026
```

Invoice Number

```
INV00012026
```

Lebih mudah dibaca oleh admin dan klien.

---

# Audit Fields

Seluruh tabel wajib memiliki.

```
created_at

updated_at

deleted_at (nullable)
```

Menggunakan Soft Delete.

---

# Entity

Database MVP terdiri dari entity berikut.

```
Admin

↓

Client

↓

Submission

↓

Package

↓

Add On

↓

Submission Add On

↓

Invoice

↓

Payment

↓

Timeline

↓

Reminder

↓

Settings
```

---

# 1.

Admin

Menyimpan akun admin.

---

Field.

```
id

name

email

password_hash

role

created_at

updated_at
```

---

# 2.

Client

Menyimpan data klien.

---

Field.

```
id

client_number

name

phone

instagram

allow_publish

notes

created_at

updated_at

deleted_at
```

---

Catatan.

Satu klien dapat memiliki banyak Pengajuan Sesi.

---

# 3.

Submission

Entity utama sistem.

Menyimpan seluruh Pengajuan Sesi.

---

Field.

```
id

submission_number

client_id

package_id

status

event_name

event_date

event_time

location

special_request

admin_note

reschedule_count

created_at

updated_at

deleted_at
```

---

Submission mempunyai.

- satu Client
- satu Package
- banyak Add-On
- satu Invoice aktif
- banyak Payment
- banyak Timeline

---

# 4.

Package

Daftar paket.

---

Field.

```
id

name

category

description

price

is_active

created_at

updated_at
```

---

# 5.

Add On

Daftar layanan tambahan.

---

Field.

```
id

name

price

description

is_active
```

---

# 6.

Submission Add On

Tabel relasi.

Karena.

Satu Submission.

↓

Banyak Add On.

---

Field.

```
submission_id

addon_id

price_snapshot
```

Menggunakan snapshot harga.

Apabila harga Add On berubah.

↓

Pengajuan lama tetap aman.

---

# 7.

Invoice

Menyimpan invoice.

---

Field.

```
id

invoice_number

submission_id

subtotal

addon_total

grand_total

dp_amount

remaining_amount

status

revision

issued_at

created_at

updated_at
```

---

Satu Submission.

↓

Dapat memiliki banyak Invoice.

Tetapi hanya satu.

```
Active Invoice
```

---

# 8.

Payment

Riwayat pembayaran.

---

Field.

```
id

invoice_id

payment_type

amount

payment_method

payment_date

verified_by

verified_at

notes

created_at
```

---

Payment Type.

```
DP

Pelunasan

Refund
```

---

# 9.

Timeline

Seluruh aktivitas.

---

Field.

```
id

submission_id

activity

description

performed_by

created_at
```

Timeline tidak boleh dihapus.

---

# 10.

Reminder

Reminder Dashboard.

---

Field.

```
id

submission_id

type

title

due_date

status

created_at
```

---

# 11.

Settings

Konfigurasi sistem.

---

Field.

```
id

studio_name

whatsapp

bank_name

bank_account

bank_holder

qris_image

google_calendar_id

google_drive_folder

business_hour_start

business_hour_end

updated_at
```

---

# Relationship

```
Client

1

↓

∞

Submission

────────────

Submission

1

↓

∞

Invoice

────────────

Invoice

1

↓

∞

Payment

────────────

Submission

1

↓

∞

Timeline

────────────

Submission

∞

↓

∞

Add On

────────────

Package

1

↓

∞

Submission
```

---

# Enum

Submission Status.

```
PENDING_REVIEW

WAITING_DP

DP_PAID

PAID

ON_SESSION

EDITING

DELIVERED

COMPLETED

REJECTED

RESCHEDULE
```

---

Payment Status.

```
UNPAID

PARTIAL

PAID
```

---

Reminder Type.

```
PAYMENT

SESSION

DELIVERY
```

---

# Index

Tambahkan index.

```
submission_number

invoice_number

client_number

phone

event_date

status
```

---

# Constraint

Nomor WhatsApp.

↓

Harus unik.

---

Nomor Invoice.

↓

Harus unik.

---

Nomor Submission.

↓

Harus unik.

---

# Soft Delete

Data tidak langsung dihapus.

```
deleted_at

!=

NULL
```

Menandakan data telah dihapus.

---

# Backup Strategy

Backup harian.

Retensi.

30 Hari.

---

# Security

Password menggunakan hashing.

Data sensitif tidak boleh dikirim ke frontend.

---

# Future Database

Versi berikutnya dapat menambahkan.

- Employee
- Photographer
- Videographer
- Payment Gateway
- Voucher
- Promo
- Notification
- Audit Log
- Media Gallery

---

# Business View

Database dirancang berdasarkan proses bisnis Lovery Photography sehingga seluruh aktivitas administrasi dapat direpresentasikan secara konsisten dan mudah dikembangkan.

---

# Developer Notes

- Seluruh relasi menggunakan Foreign Key.
- Gunakan UUID sebagai Primary Key.
- Public Number bukan Primary Key.
- Jangan menghapus data transaksi secara permanen.
- Seluruh perubahan status harus membuat Timeline.

---

# Ringkasan

Database Lovery Studio Management System dibangun berdasarkan entitas bisnis utama seperti Klien, Pengajuan Sesi, Invoice, Pembayaran, dan Timeline.

Struktur ini dirancang agar stabil, mudah dikembangkan, serta mendukung pertumbuhan sistem pada versi berikutnya tanpa perlu mengubah fondasi database.