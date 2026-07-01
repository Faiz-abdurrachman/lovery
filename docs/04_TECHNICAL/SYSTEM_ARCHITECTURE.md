---
title: System Architecture
module: Technical
version: 1.0.0
status: DRAFT
owner: Technical Team
priority: CRITICAL
related:
  - DATABASE.md
  - API_SPECIFICATION.md
  - GOOGLE_SERVICES.md
---

# 🏗️ System Architecture

## Pendahuluan

Dokumen ini menjelaskan arsitektur teknis Lovery Studio Management System.

Dokumen ini menjadi acuan utama seluruh developer dalam membangun aplikasi.

Seluruh implementasi frontend, backend, database, dan integrasi eksternal harus mengikuti arsitektur pada dokumen ini.

---

# Tujuan

Arsitektur dirancang agar sistem:

- mudah dikembangkan
- mudah dipelihara
- mudah diuji
- scalable
- modular
- tidak bergantung pada satu layanan

---

# Prinsip Arsitektur

Lovery Studio Management System menggunakan pendekatan:

```
Presentation Layer

↓

Application Layer

↓

Business Layer

↓

Data Layer

↓

External Services
```

Setiap layer memiliki tanggung jawab yang berbeda.

---

# Gambaran Arsitektur

```
                    CLIENT

        Website (Next.js)

                │

                ▼

      Frontend Application

                │

                ▼

         API Route / Backend

                │

                ▼

        Business Logic Layer

                │

      ┌─────────┼─────────┐

      ▼         ▼         ▼

 Database   Google API   WhatsApp

                │

                ▼

           Google Drive

                ▼

         Google Calendar
```

---

# Technology Stack

## Frontend

Next.js

TypeScript

Tailwind CSS

Shadcn UI

TanStack Query

React Hook Form

Zod

---

## Backend

Next.js Route Handler

TypeScript

Prisma ORM

---

## Database

PostgreSQL

---

## Authentication

Admin Authentication

(Session Based)

---

## File Storage

Google Drive

---

## Calendar

Google Calendar API

---

## Communication

WhatsApp

(MVP menggunakan deep link / template)

---

# Layer

---

# Presentation Layer

Berisi seluruh tampilan.

Contoh.

Landing Page

Dashboard

Invoice

Status Pengajuan

Pengaturan

Layer ini **tidak boleh memiliki logika bisnis.**

---

# Application Layer

Berisi:

API

Validation

Authentication

Request Handling

Layer ini bertugas menerima request dari frontend.

---

# Business Layer

Berisi seluruh aturan bisnis.

Contoh.

Verifikasi DP

↓

Buat Event Calendar

↓

Tambah Revenue

↓

Update Timeline

↓

Update Status

Semua aturan bisnis berada di layer ini.

---

# Data Layer

Berisi:

Prisma

Repository

Database Query

Layer ini hanya bertugas membaca dan menyimpan data.

---

# External Service

Integrasi.

Google Calendar

Google Drive

WhatsApp

QRIS

---

# Modul Sistem

Sistem dibagi menjadi beberapa module.

```
Authentication

↓

Client Module

↓

Admin Module

↓

Invoice Module

↓

Payment Module

↓

Calendar Module

↓

Revenue Module

↓

Google Drive Module

↓

Settings Module
```

Setiap module berdiri sendiri.

---

# Flow Request

Contoh.

```
Client

↓

Submit Form

↓

API

↓

Validation

↓

Business Logic

↓

Database

↓

Response
```

---

# Flow Verifikasi DP

```
Admin

↓

Klik

Verifikasi DP

↓

API

↓

Business Logic

↓

Update Status

↓

Tambah Revenue

↓

Google Calendar

↓

Timeline

↓

Database

↓

Success
```

---

# Dependency Rules

Frontend

↓

API

↓

Service

↓

Repository

↓

Database

Frontend **tidak boleh** mengakses database secara langsung.

---

# Folder Structure

```
app/

components/

features/

services/

lib/

hooks/

types/

prisma/

public/
```

---

# Features Folder

Setiap fitur berdiri sendiri.

Contoh.

```
features/

booking/

invoice/

payment/

calendar/

dashboard/

client/

settings/
```

Masing-masing memiliki:

```
components

services

types

hooks

utils
```

---

# Integrasi

## Google Calendar

Digunakan ketika:

DP Diverifikasi.

---

## Google Drive

Digunakan ketika:

Pengiriman hasil.

---

## WhatsApp

Digunakan ketika:

Status berubah.

---

# Error Handling

Semua request menggunakan format.

```
Success

↓

Data

↓

Message
```

atau

```
Error

↓

Message

↓

Code
```

---

# Logging

Semua aktivitas penting harus dicatat.

Contoh.

- Login
- Review Pengajuan
- Invoice
- Pembayaran
- Google Calendar
- Google Drive

---

# Security

Semua endpoint admin memerlukan autentikasi.

Validasi dilakukan pada setiap request.

Input wajib divalidasi menggunakan Zod.

---

# Scalability

Arsitektur harus memungkinkan:

- Penambahan Payment Gateway
- Penambahan Multi Admin
- Penambahan Multi Cabang
- Penambahan AI Insight

Tanpa mengubah struktur utama sistem.

---

# Business View

Arsitektur dirancang mengikuti proses operasional Lovery Photography tanpa mengubah alur bisnis yang telah berjalan.

---

# Developer Notes

- Gunakan pendekatan modular.
- Hindari Business Logic di Frontend.
- Hindari Query Database langsung dari UI.
- Gunakan Service Layer untuk seluruh aturan bisnis.
- Seluruh integrasi eksternal harus dibungkus dalam service terpisah.

---

# Ringkasan

System Architecture menjadi fondasi teknis Lovery Studio Management System.

Dokumen ini memastikan seluruh developer memiliki pemahaman yang sama mengenai struktur aplikasi, tanggung jawab setiap layer, serta hubungan antara frontend, backend, database, dan layanan eksternal.