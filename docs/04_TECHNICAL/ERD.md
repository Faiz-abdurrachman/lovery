---
title: Entity Relationship Diagram
module: Technical
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Technical Team
priority: CRITICAL
related:
  - DATABASE.md
  - API_SPECIFICATION.md
  - SYSTEM_ARCHITECTURE.md
---

# 🗂️ Entity Relationship Diagram (ERD)

## Pendahuluan

Dokumen ini menjelaskan hubungan antar entitas pada Lovery Studio Management System.

ERD menjadi acuan utama dalam implementasi Prisma Schema dan PostgreSQL.

Seluruh relasi yang dijelaskan di sini harus sesuai dengan Business Rules dan Database Design.

---

# Filosofi

Database dibangun berdasarkan proses bisnis.

Bukan berdasarkan halaman website.

Satu entitas dapat digunakan oleh banyak fitur.

---

# Daftar Entitas

MVP terdiri dari:

- Admin
- Client
- Package
- AddOn
- Submission
- SubmissionAddOn
- Invoice
- Payment
- Timeline
- Reminder
- Settings
- ActivityLog

---

# Gambaran Besar Relasi

```
                Client
                   │
              1    │    ∞
                   ▼
              Submission
              /   |    \
             /    |     \
            ▼     ▼      ▼
       Package  Invoice Timeline
          │        │
          │        ▼
          │     Payment
          │
          ▼
 SubmissionAddOn
          │
          ▼
        AddOn

Submission
     │
     ▼
 Reminder

Admin
 │
 ├──────────────► Payment (verified_by)
 │
 ├──────────────► Timeline (performed_by)
 │
 └──────────────► ActivityLog

Settings
(Standalone / Singleton)
```

---

# Detail Relasi

## Client → Submission

```
1 Client

↓

Banyak Submission
```

Satu klien dapat mengajukan banyak sesi.

---

## Package → Submission

```
1 Package

↓

Banyak Submission
```

Satu paket dapat digunakan pada banyak pengajuan.

Submission menyimpan snapshot nama dan harga paket saat transaksi dibuat.

---

## Submission → AddOn

Hubungan Many-to-Many.

Menggunakan tabel:

```
SubmissionAddOn
```

Karena satu submission dapat memiliki banyak add-on dan satu add-on dapat digunakan oleh banyak submission.

---

## Submission → Invoice

```
1 Submission

↓

Banyak Invoice
```

Digunakan untuk mendukung revisi invoice.

Hanya satu invoice yang berstatus aktif.

---

## Invoice → Payment

```
1 Invoice

↓

Banyak Payment
```

Contoh:

- DP
- Pelunasan
- Refund

---

## Submission → Timeline

```
1 Submission

↓

Banyak Timeline
```

Timeline mencatat perjalanan satu pengajuan.

Tidak dapat dihapus.

---

## Submission → Reminder

```
1 Submission

↓

Banyak Reminder
```

Reminder digunakan untuk dashboard admin.

---

## Admin → Payment

```
1 Admin

↓

Banyak Payment
```

Digunakan untuk mengetahui admin yang melakukan verifikasi pembayaran.

---

## Admin → Timeline

```
1 Admin

↓

Banyak Timeline
```

Mencatat siapa yang melakukan perubahan status atau aksi tertentu.

---

## Admin → ActivityLog

```
1 Admin

↓

Banyak ActivityLog
```

Activity Log digunakan untuk audit sistem.

Berbeda dengan Timeline yang berfokus pada perjalanan pengajuan.

---

## Settings

Settings tidak memiliki relasi langsung dengan entitas lain.

Bersifat singleton (satu baris konfigurasi aktif).

---

# Snapshot Strategy

Beberapa data disimpan sebagai snapshot agar histori transaksi tetap konsisten.

Submission menyimpan:

- package_name_snapshot
- package_price_snapshot

SubmissionAddOn menyimpan:

- addon_name_snapshot
- addon_price_snapshot

Invoice menyimpan:

- subtotal
- addon_total
- grand_total
- dp_amount
- remaining_amount

Perubahan harga paket atau add-on di masa depan tidak mengubah transaksi lama.

---

# Delete Strategy

Seluruh data transaksi menggunakan Soft Delete.

```
deleted_at
```

Timeline dan Payment tidak boleh dihapus secara permanen.

---

# Audit Strategy

Activity Log mencatat:

- Login Admin
- Logout
- Edit Invoice
- Edit Settings
- Verifikasi Pembayaran
- Perubahan Status
- Sinkronisasi Google Calendar
- Pengiriman Google Drive

Timeline hanya mencatat aktivitas yang berkaitan dengan satu Submission.

---

# Enum

## SubmissionStatus

- PENDING_REVIEW
- WAITING_DP
- DP_PAID
- PAID
- ON_SESSION
- EDITING
- DELIVERED
- COMPLETED
- REJECTED
- CANCELLED
- RESCHEDULE

---

## PaymentType

- DP
- FINAL_PAYMENT
- REFUND

---

## PaymentStatus

- UNPAID
- PARTIAL
- PAID

---

## ReminderType

- PAYMENT
- SESSION
- DELIVERY

---

# Index Recommendation

Tambahkan index pada:

- submission_number
- invoice_number
- client_number
- phone
- event_date
- status
- payment_date

---

# Constraint

Harus unik:

- submission_number
- invoice_number
- client_number

Nomor WhatsApp tidak wajib unik karena satu nomor dapat digunakan untuk beberapa anggota keluarga atau pemesanan berbeda.

---

# Future Entity

Belum digunakan pada MVP:

- Photographer
- Videographer
- Employee
- Branch
- Notification
- Voucher
- Promo
- PaymentGateway
- MediaGallery

---

# Business View

Relasi antar entitas dirancang mengikuti proses operasional Lovery Photography mulai dari pengajuan sesi hingga penyelesaian layanan.

---

# Developer Notes

- Seluruh foreign key wajib menggunakan UUID.
- Gunakan referential integrity pada database.
- Hindari cascade delete pada data transaksi.
- Gunakan snapshot untuk seluruh data harga.
- Activity Log dan Timeline memiliki tujuan yang berbeda dan tidak boleh digabung.

---

# Ringkasan

Entity Relationship Diagram menjadi dasar implementasi database Lovery Studio Management System.

Dokumen ini memastikan seluruh relasi antar entitas konsisten dengan Business Rules, siap diterjemahkan ke Prisma Schema, dan mampu mendukung pengembangan fitur di masa mendatang.
