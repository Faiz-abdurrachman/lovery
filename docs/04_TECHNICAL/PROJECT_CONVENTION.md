---
title: Project Convention
module: Technical
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Technical Team
priority: CRITICAL
related:
  - CODING_STANDARDS.md
  - PROJECT_STRUCTURE.md
  - TECH_STACK.md
---

# 📜 Project Convention

## Pendahuluan

Dokumen ini merupakan standar teknis resmi Lovery Studio Management System.

Seluruh developer, AI Coding Assistant, dan contributor wajib mengikuti seluruh aturan pada dokumen ini.

Dokumen ini menjadi acuan utama sebelum menulis source code.

---

# Filosofi

Seluruh keputusan teknis harus:

- Konsisten
- Mudah dipelihara
- Mudah dikembangkan
- Mudah dipahami developer baru

---

# 1. Bahasa Pemrograman

Gunakan:

- TypeScript

Jangan menggunakan JavaScript.

---

# 2. Framework

Frontend + Backend

Next.js App Router

---

# 3. Package Manager

Gunakan:

pnpm

Jangan mencampur:

- npm
- yarn
- bun

---

# 4. Branch Strategy

```
main

↓

develop

↓

feature/*

↓

fix/*
```

Contoh

```
feature/dashboard

feature/payment

feature/google-calendar

fix/invoice
```

---

# 5. Commit Convention

Gunakan Conventional Commit.

```
feat:

fix:

docs:

refactor:

style:

test:

chore:
```

Contoh.

```
feat(invoice): automatic invoice generator

fix(payment): verify payment validation

docs(product): update workflow
```

---

# 6. ID Strategy

Semua Primary Key menggunakan:

```
cuid()
```

Contoh.

```
id String @id @default(cuid())
```

Public Number dipisahkan.

Contoh.

```
Submission

LVR-0001-2026

Invoice

INV00012026
```

---

# 7. Timestamp

Seluruh tabel wajib memiliki.

```
createdAt

updatedAt
```

Soft Delete.

```
deletedAt
```

Apabila diperlukan.

---

# 8. Timezone

Database:

UTC

Frontend:

Asia/Jakarta

Semua konversi waktu dilakukan pada layer frontend.

---

# 9. Currency

Seluruh nominal menggunakan.

```
Int
```

Contoh.

```
500000
```

Jangan menggunakan Float.

---

# 10. Enum

Seluruh status menggunakan Prisma Enum.

Jangan menggunakan String.

Contoh.

```
SubmissionStatus

PaymentStatus

ReminderType
```

---

# 11. Naming

Model

PascalCase

```
Submission

Client

Invoice
```

---

Field

camelCase

```
phoneNumber

eventDate

createdAt
```

---

Folder

kebab-case

```
google-drive

status-pengajuan

client-management
```

---

# 12. Import

Gunakan alias.

```
@/
```

Contoh.

```
@/features

@/components

@/lib
```

---

# 13. Validation

Gunakan.

Zod

Seluruh validasi client dan server menggunakan schema yang sama.

---

# 14. Form

Gunakan.

React Hook Form.

---

# 15. Database

Gunakan.

Prisma ORM.

Tidak menggunakan SQL mentah kecuali benar-benar diperlukan.

---

# 16. API

Seluruh Response.

Success.

```
{
 success:true,
 data:{},
 message:"..."
}
```

Error.

```
{
 success:false,
 message:"...",
 code:"..."
}
```

---

# 17. Error Handling

Gunakan Logger.

Jangan menggunakan.

```
console.log()
```

pada production.

---

# 18. Business Logic

Business Logic hanya berada pada.

```
services/
```

React Component tidak boleh memiliki Business Logic.

---

# 19. Reusable Component

Komponen yang digunakan lebih dari satu fitur dipindahkan ke.

```
components/
```

---

# 20. Security

- Password wajib di-hash.
- Environment Variable tidak boleh di-hardcode.
- Endpoint admin wajib diautentikasi.
- Validasi dilakukan pada seluruh input.

---

# 21. Environment Variable

Gunakan format.

```
DATABASE_URL

AUTH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_CALENDAR_ID

GOOGLE_DRIVE_FOLDER_ID

NEXT_PUBLIC_WHATSAPP_NUMBER
```

---

# 22. Git Ignore

Minimal.

```
node_modules

.env

.next

dist

coverage
```

---

# 23. Documentation Rule

Apabila terdapat perubahan:

- Business Rules
- Database
- API
- Status
- Workflow

Dokumentasi wajib diperbarui terlebih dahulu sebelum implementasi dilakukan.

---

# 24. AI Coding Assistant Rule

Seluruh AI wajib:

- Membaca Product Dictionary.
- Mengikuti Business Rules.
- Mengikuti Coding Standards.
- Mengikuti Project Structure.
- Tidak membuat folder baru tanpa alasan.
- Tidak mengubah istilah resmi.
- Tidak membuat fitur di luar MVP.

---

# 25. Quality Standard

Seluruh Pull Request harus memenuhi:

- Build berhasil.
- TypeScript tanpa error.
- Lint tanpa error.
- Tidak ada duplikasi kode.
- Dokumentasi diperbarui apabila diperlukan.

---

# Ringkasan

Project Convention merupakan aturan teknis resmi Lovery Studio Management System.

Seluruh keputusan teknis harus mengacu pada dokumen ini agar pengembangan tetap konsisten, mudah dipelihara, dan siap berkembang dalam jangka panjang.