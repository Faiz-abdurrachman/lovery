---
title: Project Structure
module: Technical
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Technical Team
priority: CRITICAL
related:
  - SYSTEM_ARCHITECTURE.md
  - CODING_STANDARDS.md
---

# 📁 Project Structure

## Pendahuluan

Dokumen ini menjelaskan struktur folder resmi Lovery Studio Management System.

Seluruh source code harus mengikuti struktur ini agar mudah dipelajari, dikembangkan, dan dipelihara.

Struktur ini menggunakan pendekatan **Feature-Based Architecture**, sehingga setiap fitur memiliki komponen, service, validasi, dan tipe datanya sendiri.

---

# Filosofi

Source code harus mudah ditemukan.

Developer tidak boleh membutuhkan waktu lama hanya untuk mencari lokasi suatu file.

Setiap folder memiliki satu tanggung jawab yang jelas.

---

# Prinsip

- Feature First
- Modular
- Reusable
- Scalable
- Low Coupling
- High Cohesion

---

# Root Project

```
lovery-studio/

├── app/
├── components/
├── features/
├── lib/
├── hooks/
├── providers/
├── types/
├── utils/
├── prisma/
├── public/
├── docs/
├── middleware.ts
├── package.json
└── README.md
```

---

# Folder App

Menggunakan App Router Next.js.

```
app/

(layout)

(page)

loading.tsx

error.tsx

not-found.tsx
```

Semua halaman berada di folder ini.

---

# Folder Components

Berisi komponen yang digunakan lintas fitur.

Contoh.

```
components/

Button/

Card/

Modal/

Badge/

Table/

Input/

Calendar/

Dialog/

Loading/

EmptyState/
```

Komponen di folder ini tidak boleh mengandung logika bisnis.

---

# Folder Features

Seluruh logika aplikasi berada di sini.

```
features/

dashboard/

submission/

invoice/

payment/

calendar/

revenue/

client/

settings/

google-drive/

whatsapp/
```

Setiap folder berdiri sendiri.

---

# Struktur Feature

Contoh.

```
submission/

components/

services/

hooks/

schemas/

types/

utils/

actions/

constants/
```

---

# Components

Komponen khusus fitur.

Contoh.

```
SubmissionCard

SubmissionForm

SubmissionTimeline

SubmissionStatus
```

---

# Services

Berisi Business Logic.

Contoh.

```
AcceptSubmission

RejectSubmission

VerifyDP

CreateInvoice
```

---

# Hooks

React Hooks khusus fitur.

```
useSubmission

useSubmissionStatus

useSubmissionTimeline
```

---

# Schemas

Validasi menggunakan Zod.

```
submission.schema.ts

invoice.schema.ts
```

---

# Types

```
submission.type.ts

invoice.type.ts
```

---

# Utils

Fungsi kecil.

```
formatCurrency

formatDate

statusColor
```

---

# Actions

Server Actions.

```
createSubmission

updateSubmission

deleteSubmission
```

---

# Constants

```
SubmissionStatus

ReminderType

PaymentStatus
```

---

# Folder Lib

Berisi konfigurasi global.

Contoh.

```
prisma

auth

google

env

logger
```

---

# Folder Hooks

React Hooks global.

```
useMobile

useDebounce

useToast
```

---

# Folder Providers

```
ThemeProvider

QueryProvider

SessionProvider
```

---

# Folder Types

Type global.

```
api.ts

pagination.ts

response.ts
```

---

# Folder Utils

Utility global.

```
date.ts

currency.ts

number.ts

string.ts
```

---

# Folder Prisma

```
schema.prisma

seed.ts

migrations/
```

---

# Folder Public

```
logo

images

icons

illustrations

fonts
```

---

# Naming Convention

Folder.

```
lowercase-kebab-case
```

File.

```
camelCase.ts

PascalCase.tsx
```

Komponen.

```
SubmissionCard.tsx
```

Hook.

```
useSubmission.ts
```

Schema.

```
submission.schema.ts
```

Type.

```
submission.type.ts
```

Constant.

```
submission.constant.ts
```

---

# Import Rules

Gunakan alias.

```
@/components

@/features

@/lib

@/hooks

@/utils
```

Hindari relative import yang terlalu panjang.

---

# Dependency Rules

```
Component

↓

Feature

↓

Service

↓

Repository

↓

Database
```

Tidak boleh melompati layer.

---

# Reusable Rules

Apabila suatu komponen digunakan lebih dari satu fitur.

↓

Pindahkan ke:

```
components/
```

---

# Feature Rules

Setiap fitur harus independen.

Perubahan pada satu fitur tidak boleh merusak fitur lain.

---

# Business View

Struktur project dirancang agar pertumbuhan fitur di masa depan tidak menyebabkan source code sulit dipelihara.

---

# Developer Notes

- Gunakan Feature-Based Architecture.
- Hindari folder "misc" atau "helpers" yang tidak jelas.
- Pisahkan Business Logic dari UI.
- Seluruh validasi menggunakan Zod.
- Gunakan TypeScript secara penuh.

---

# Ringkasan

Project Structure menjadi standar resmi organisasi source code Lovery Studio Management System.

Seluruh developer wajib mengikuti struktur ini agar kode tetap konsisten, mudah dibaca, dan siap dikembangkan untuk jangka panjang.