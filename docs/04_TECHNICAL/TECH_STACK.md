---
title: Technology Stack
module: Technical
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Technical Team
priority: CRITICAL
related:
  - SYSTEM_ARCHITECTURE.md
  - PROJECT_STRUCTURE.md
  - CODING_STANDARDS.md
---

# 🛠️ Technology Stack

## Pendahuluan

Dokumen ini menjelaskan seluruh teknologi yang digunakan dalam pengembangan Lovery Studio Management System.

Selain mencantumkan nama teknologi, dokumen ini juga menjelaskan alasan pemilihannya agar seluruh tim memiliki pemahaman yang sama mengenai keputusan teknis yang diambil.

Seluruh implementasi harus mengikuti Tech Stack yang telah disepakati.

---

# Filosofi

Teknologi dipilih bukan karena sedang populer.

Teknologi dipilih berdasarkan:

- stabilitas
- kemudahan pengembangan
- komunitas
- dokumentasi
- skalabilitas
- kemudahan maintenance

---

# Target Platform

## Client

- Desktop
- Tablet
- Mobile Browser

---

## Admin

- Desktop (Prioritas)
- Laptop
- Tablet

Dashboard tetap dapat diakses melalui perangkat mobile, namun pengalaman terbaik ditujukan untuk desktop dan laptop.

---

# Frontend

## Framework

### Next.js (App Router)

Digunakan sebagai framework utama.

### Alasan

- Server Component
- SEO Friendly
- Routing modern
- Mudah deploy ke Vercel
- Dokumentasi lengkap
- Mendukung Server Action

---

## Bahasa

TypeScript

### Alasan

- Type Safety
- Mengurangi bug
- Autocomplete lebih baik
- Cocok dengan Prisma dan Zod

---

## Styling

Tailwind CSS

### Alasan

- Utility First
- Cepat
- Konsisten
- Mudah membuat responsive layout

---

## UI Component

shadcn/ui

### Alasan

- Modern
- Accessible
- Mudah dikustomisasi
- Tidak bergantung pada runtime library tambahan

---

## Icon

Lucide React

### Alasan

- Ringan
- Konsisten
- Mudah digunakan

---

## Form

React Hook Form

### Alasan

- Performa tinggi
- Validasi mudah
- Integrasi dengan Zod

---

## Validation

Zod

### Alasan

- Type-safe
- Sinkron dengan TypeScript
- Validasi client dan server dapat menggunakan schema yang sama

---

## Data Fetching

TanStack Query

### Alasan

- Caching
- Background Refetch
- Loading State
- Error State
- Optimistic Update (bila diperlukan)

---

# Backend

## Runtime

Next.js Route Handler

### Alasan

- Tidak perlu backend terpisah pada MVP
- Struktur lebih sederhana
- Deployment lebih mudah

---

## ORM

Prisma ORM

### Alasan

- Type-safe
- Migration
- Relasi database mudah
- Dokumentasi sangat baik

---

## Database

PostgreSQL

### Alasan

- Relasional
- Cocok untuk transaksi
- Stabil
- Open Source
- Mudah dikembangkan

---

# Authentication

## Rekomendasi

Auth.js (NextAuth.js)

### Alasan

- Mendukung Next.js App Router
- Session Management
- Aman
- Banyak digunakan

Catatan:

Karena sistem hanya memiliki akun admin pada MVP, implementasi autentikasi dibuat sesederhana mungkin namun tetap aman.

---

# File Storage

Google Drive

### Alasan

Lovery Photography sudah menggunakan Google Drive sebagai media penyimpanan hasil dokumentasi.

Website hanya menyimpan tautan (link) dan metadata file.

---

# Calendar

Google Calendar API

### Alasan

Studio telah menggunakan Google Calendar sebagai kalender operasional.

Event baru dibuat setelah DP diverifikasi.

---

# WhatsApp

WhatsApp Deep Link

### Alasan

Komunikasi tetap dilakukan melalui WhatsApp.

Pada MVP belum menggunakan WhatsApp Business API.

Website akan membuka WhatsApp dengan pesan yang telah disiapkan.

---

# Export Data

Excel (.xlsx)

### Library

openpyxl (jika proses dilakukan melalui Python) atau library JavaScript yang sesuai saat implementasi.

### Alasan

Owner meminta laporan mudah dibuka menggunakan Microsoft Excel.

---

# Deployment

## Frontend + Backend

Vercel

### Alasan

- Integrasi terbaik dengan Next.js
- Deployment cepat
- CI/CD sederhana

---

## Database

Neon PostgreSQL

### Alasan

- Serverless PostgreSQL
- Mudah terhubung dengan Prisma
- Cocok untuk MVP

Catatan:

Apabila kebutuhan meningkat, database dapat dipindahkan ke PostgreSQL dedicated tanpa mengubah ORM.

---

# Version Control

Git

Repository:

GitHub

### Branch Strategy

main

↓

develop

↓

feature/*

↓

fix/*

---

# Package Manager

pnpm

### Alasan

- Lebih cepat
- Disk usage lebih kecil
- Dependency management lebih efisien

---

# Development Tools

## Code Editor

Visual Studio Code

---

## AI Coding Assistant

Didukung:

- Claude Code
- Cursor
- OpenCode
- GitHub Copilot
- Gemini CLI

Seluruh AI wajib mengikuti dokumentasi proyek.

---

# Environment Variable

Contoh:

DATABASE_URL

AUTH_SECRET

GOOGLE_CLIENT_ID

GOOGLE_CLIENT_SECRET

GOOGLE_CALENDAR_ID

GOOGLE_DRIVE_FOLDER_ID

NEXT_PUBLIC_WHATSAPP_NUMBER

---

# Logging

Menggunakan logger terpusat.

Tujuan:

- Debugging
- Audit
- Monitoring

---

# Monitoring

Versi MVP

- Vercel Logs
- Prisma Logs

Future Version

- Sentry
- OpenTelemetry

---

# Keamanan

- HTTPS wajib.
- Password di-hash.
- Validasi input menggunakan Zod.
- Environment Variable tidak boleh di-hardcode.
- Endpoint admin wajib melalui autentikasi.

---

# Future Technology

Belum digunakan pada MVP.

- WhatsApp Business API
- Payment Gateway
- Redis
- Queue Worker
- Object Storage
- AI Analytics
- Multi Tenant

---

# Technology Decision Summary

| Kebutuhan | Teknologi |
|-----------|------------|
| Frontend | Next.js |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| UI Component | shadcn/ui |
| Form | React Hook Form |
| Validation | Zod |
| Data Fetching | TanStack Query |
| Backend | Next.js Route Handler |
| ORM | Prisma |
| Database | PostgreSQL (Neon) |
| Authentication | Auth.js |
| Storage | Google Drive |
| Calendar | Google Calendar |
| Komunikasi | WhatsApp |
| Deployment | Vercel |
| Version Control | Git + GitHub |
| Package Manager | pnpm |

---

# Business View

Seluruh teknologi dipilih untuk mendukung operasional Lovery Photography dengan solusi yang stabil, mudah dikembangkan, dan tetap sederhana pada tahap MVP.

---

# Developer Notes

- Jangan mengganti teknologi utama tanpa melalui Decision Log.
- Hindari menambahkan dependency yang memiliki fungsi serupa.
- Seluruh library baru harus memiliki alasan yang jelas dan disetujui tim.

---

# Ringkasan

Technology Stack menjadi referensi resmi seluruh teknologi yang digunakan dalam pengembangan Lovery Studio Management System.

Dokumen ini memastikan seluruh tim menggunakan fondasi teknis yang sama sehingga proses pengembangan lebih konsisten, terstruktur, dan mudah dipelihara.