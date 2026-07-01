---
title: Coding Standards
module: Technical
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Technical Team
priority: CRITICAL
related:
  - PROJECT_STRUCTURE.md
  - SYSTEM_ARCHITECTURE.md
---

# 💻 Coding Standards

## Pendahuluan

Dokumen ini berisi standar penulisan kode resmi Lovery Studio Management System.

Seluruh developer maupun AI Coding Assistant wajib mengikuti aturan pada dokumen ini agar source code tetap konsisten, mudah dipahami, mudah dipelihara, dan mudah dikembangkan.

---

# Filosofi

Kode yang baik bukan hanya berjalan dengan benar.

Kode yang baik juga harus:

- mudah dibaca
- mudah diuji
- mudah dipelihara
- mudah dikembangkan

---

# Prinsip

Gunakan prinsip berikut.

- Clean Code
- SOLID Principle
- DRY (Don't Repeat Yourself)
- KISS (Keep It Simple)
- Single Responsibility
- Composition over Inheritance

---

# Bahasa Pemrograman

Seluruh project menggunakan:

- TypeScript
- React
- Next.js App Router

Jangan menggunakan JavaScript biasa.

---

# Penamaan File

Gunakan aturan berikut.

## React Component

```
SubmissionCard.tsx

RevenueChart.tsx

DashboardHeader.tsx
```

Menggunakan:

PascalCase

---

## Hook

```
useSubmission.ts

useRevenue.ts

useReminder.ts
```

Selalu diawali dengan:

```
use
```

---

## Schema

```
submission.schema.ts

payment.schema.ts
```

---

## Type

```
submission.type.ts

invoice.type.ts
```

---

## Constant

```
submission.constant.ts

role.constant.ts
```

---

## Utility

```
currency.ts

date.ts

string.ts
```

---

# Penamaan Folder

Gunakan:

```
lowercase-kebab-case
```

Contoh.

```
google-drive

status-pengajuan

client-management
```

---

# Penamaan Variable

Gunakan nama yang jelas.

✅

```
submissionStatus
```

❌

```
ss
```

---

✅

```
totalRevenue
```

❌

```
tr
```

---

# Penamaan Function

Gunakan bentuk kata kerja.

Contoh.

```
createInvoice()

verifyPayment()

acceptSubmission()

sendReminder()

generateInvoiceNumber()
```

---

# Penamaan Boolean

Gunakan awalan.

```
is

has

can

should
```

Contoh.

```
isPaid

hasInvoice

canEdit

shouldNotify
```

---

# React Component

Gunakan Functional Component.

```
function SubmissionCard() {

}
```

Jangan menggunakan Class Component.

---

# Props

Selalu gunakan interface.

```
interface SubmissionCardProps {

}
```

---

# TypeScript

Hindari penggunaan:

```
any
```

Gunakan:

- interface
- type
- generic

Semaksimal mungkin.

---

# Validasi

Seluruh validasi menggunakan:

```
Zod
```

Tidak menggunakan validasi manual.

---

# Form

Gunakan.

```
React Hook Form
```

---

# API

Semua API harus.

- divalidasi
- typed
- memiliki error handling
- memiliki response yang konsisten

---

# Format Response

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

# Error Handling

Gunakan.

```
try

catch
```

Jangan melakukan:

```
console.log(error)
```

Gunakan Logger.

---

# Logging

Semua aktivitas penting dicatat.

Contoh.

- Login
- Logout
- Pengajuan
- Pembayaran
- Invoice
- Google Calendar

---

# React Query

Gunakan.

```
TanStack Query
```

Untuk seluruh data fetching.

---

# State Management

Prioritas.

1.

Server State

↓

TanStack Query

---

2.

Local State

↓

useState

---

3.

Global State

↓

Context

atau

Zustand

Apabila diperlukan.

---

# Styling

Gunakan.

```
Tailwind CSS
```

Tidak menggunakan CSS biasa.

---

# Component

Prioritaskan reusable component.

Apabila digunakan lebih dari satu fitur.

↓

Pindahkan ke.

```
components/
```

---

# Business Logic

Business Logic tidak boleh berada di.

```
React Component
```

Business Logic berada pada.

```
services/
```

---

# Database

Seluruh query menggunakan.

```
Prisma
```

Jangan menggunakan SQL mentah kecuali benar-benar diperlukan.

---

# Import

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

# Magic Number

Hindari.

```
if(status===7)
```

Gunakan Constant.

```
SubmissionStatus.PAID
```

---

# Komentar

Komentar hanya digunakan apabila diperlukan.

Kode harus cukup jelas tanpa komentar yang berlebihan.

---

# Testing

Setiap Business Logic harus dapat diuji.

Pisahkan logika dari UI.

---

# Git Commit

Gunakan Conventional Commit.

```
feat:

fix:

refactor:

docs:

style:

test:

chore:
```

Contoh.

```
feat(invoice): add automatic invoice generator

fix(payment): validate payment status

docs(product): update business rules
```

---

# Pull Request

Satu Pull Request hanya untuk satu tujuan.

Jangan mencampur.

- Feature
- Bug Fix
- Refactor

Dalam satu PR.

---

# Developer Notes

- Jangan duplikasi kode.
- Hindari nested component yang terlalu dalam.
- Maksimalkan TypeScript.
- Gunakan reusable component.
- Pisahkan UI dan Business Logic.
- Selalu ikuti Product Dictionary.
- Selalu ikuti Business Rules.

---

# AI Coding Assistant Rules

Apabila menggunakan AI Coding Assistant.

AI wajib.

- mengikuti Project Structure
- mengikuti Product Dictionary
- mengikuti Business Rules
- tidak membuat folder baru tanpa alasan
- tidak mengubah nama status
- tidak menggunakan istilah selain yang ada pada Product Dictionary
- tidak membuat fitur di luar MVP Scope

---

# Ringkasan

Coding Standards menjadi standar resmi penulisan source code Lovery Studio Management System.

Seluruh developer dan AI Coding Assistant wajib mengikuti aturan ini agar implementasi tetap konsisten, mudah dipelihara, dan siap dikembangkan dalam jangka panjang.