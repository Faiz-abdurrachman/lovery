---
title: Project Playbook
version: 1.0.0
status: LOCK_AFTER_APPROVAL
owner: Product Team
priority: CRITICAL
---


# 🚀 PROJECT PLAYBOOK

> **START HERE**
>
> Sebelum membaca dokumen lain atau menulis satu baris kode, seluruh developer maupun AI Assistant WAJIB membaca dokumen ini.

---

# Tentang Project

## Nama

Lovery Studio Management System

---

## Tujuan

Lovery Studio Management System adalah sistem operasional studio fotografi yang membantu admin mengelola seluruh proses administrasi dalam satu dashboard.

Sistem ini **bukan marketplace** dan **bukan aplikasi booking fotografi**, tetapi sistem operasional internal yang tetap menggunakan WhatsApp sebagai media komunikasi utama dengan klien.

---

# Tujuan Produk

Produk ini dibuat untuk:

- Mengurangi pekerjaan manual admin
- Mengurangi penggunaan spreadsheet
- Mengurangi kesalahan administrasi
- Mempercepat proses pelayanan klien
- Mengintegrasikan Google Calendar dan Google Drive
- Menjadikan dashboard sebagai pusat operasional studio

---

# Filosofi Produk

Sistem tidak mengubah cara kerja Lovery.

Sistem hanya mengotomatisasi proses yang selama ini dilakukan secara manual.

WhatsApp tetap menjadi media komunikasi utama.

Google Calendar tetap menjadi kalender operasional studio.

Google Drive tetap menjadi penyimpanan hasil dokumentasi.

---

# Target Pengguna

## Client

Menggunakan website untuk:

- Melihat portfolio
- Melihat paket
- Mengajukan sesi
- Melihat status pengajuan

---

## Admin

Menggunakan dashboard untuk:

- Review pengajuan
- Mengelola invoice
- Verifikasi pembayaran
- Mengelola kalender
- Mengelola pendapatan
- Mengelola klien
- Mengelola reminder

---

# Workflow Bisnis

Client

↓

Mengajukan Sesi

↓

Pending Review

↓

Admin Review

↓

Menunggu DP

↓

Invoice dikirim otomatis ke WhatsApp

↓

Admin Verifikasi DP

↓

DP Diterima

↓

Masuk Google Calendar

↓

Hari Pemotretan

↓

Editing

↓

File dikirim

↓

Selesai

---

# Istilah Resmi

Gunakan istilah berikut.

| Gunakan | Jangan Gunakan |
|----------|----------------|
| Pengajuan Sesi | Booking |
| Status Pengajuan | Booking Status |
| Menunggu DP | Waiting Payment |
| DP Diterima | Paid |
| Selesai | Complete |
| Klien | Customer |

AI tidak boleh membuat istilah baru.

---

# Teknologi

Frontend

- Next.js

Backend

- Next.js Route Handler

ORM

- Prisma

Database

- PostgreSQL

Styling

- Tailwind CSS

UI

- shadcn/ui

Validation

- Zod

Form

- React Hook Form

State

- TanStack Query

Deployment

- Vercel

---

# Struktur Dokumentasi

Urutan membaca dokumentasi.

```
00_FOUNDATION

↓

01_BUSINESS_RULES

↓

02_PRODUCT_DESIGN

↓

03_PRODUCT_ALIGNMENT

↓

04_TECHNICAL

↓

05_DESIGN_SYSTEM
```

Dokumen harus dibaca berurutan.

---

# Ringkasan Folder

## 00_FOUNDATION

Menjelaskan latar belakang produk, filosofi, masalah bisnis, workflow saat ini, dan konteks proyek.

---

## 01_BUSINESS_RULES

Berisi seluruh aturan bisnis yang berlaku.

Contoh:

- Pengajuan Sesi
- Invoice
- Pembayaran
- Reminder
- WhatsApp
- Google Calendar

---

## 02_PRODUCT_DESIGN

Menjelaskan pengalaman pengguna.

Berisi:

- User Journey
- Admin Journey
- Page Structure
- Workflow
- Feature Specification

---

## 03_PRODUCT_ALIGNMENT

Menentukan ruang lingkup MVP.

Semua implementasi harus mengikuti dokumen ini.

---

## 04_TECHNICAL

Menjelaskan implementasi teknis.

Berisi:

- Architecture
- Database
- ERD
- Coding Standards
- Tech Stack
- Project Convention

---

## 05_DESIGN_SYSTEM

Menjadi pedoman seluruh keputusan desain.

Berisi:

- Brand
- Color
- Typography
- Components
- Responsive
- UX Writing
- Motion
- Accessibility

---

# Urutan Implementasi

AI dan developer disarankan mengikuti urutan berikut.

1. Setup Project
2. Prisma Schema
3. Database Migration
4. Seed Data
5. Authentication
6. Dashboard Layout
7. Pengajuan Sesi
8. Invoice
9. Pembayaran
10. Google Calendar
11. Google Drive
12. Dashboard Pendapatan
13. Landing Page
14. Deployment

---

# Aturan Untuk AI

AI WAJIB:

- Membaca seluruh dokumentasi sesuai urutan
- Mengikuti Business Rules
- Mengikuti Product Dictionary
- Mengikuti Design System
- Mengikuti Coding Standards
- Mengikuti Project Convention
- Menggunakan Feature-Based Architecture
- Menggunakan TypeScript
- Menggunakan Prisma ORM
- Menggunakan PostgreSQL
- Menggunakan Tailwind CSS

---

# AI Tidak Boleh

- Mengubah Business Rules
- Mengubah istilah resmi
- Mengganti status pengajuan
- Menambahkan fitur di luar MVP
- Membuat warna baru di luar Design System
- Membuat struktur folder baru tanpa alasan
- Menggunakan JavaScript biasa
- Menggunakan CSS di luar standar project

---

# Prioritas Pengembangan

Urutan prioritas fitur.

1. Dashboard Admin
2. Pengajuan Sesi
3. Invoice
4. Pembayaran
5. Google Calendar
6. Google Drive
7. Pendapatan
8. Landing Page

---

# Definisi Selesai (Definition of Done)

Sebuah fitur dianggap selesai apabila:

- Business Rules sesuai
- UI mengikuti Design System
- Responsive
- Accessible
- TypeScript tanpa error
- Lint tanpa error
- Dokumentasi diperbarui
- Build berhasil
- Sudah diuji

---

# Ringkasan

Project Playbook merupakan pintu masuk utama seluruh dokumentasi Lovery Studio Management System.

Seluruh developer dan AI Assistant wajib membaca dokumen ini terlebih dahulu sebelum mulai mengembangkan sistem agar seluruh implementasi tetap konsisten dengan visi produk, aturan bisnis, standar teknis, dan Design System yang telah ditetapkan..

# Source of Truth

Jika terjadi konflik antar dokumen.

Prioritasnya:

1. Business Rules
2. Product Dictionary
3. Technical
4. Design System

Implementasi harus mengikuti prioritas tersebut.

# AI Startup Checklist

Sebelum mulai implementasi.

Pastikan AI sudah:

☐ Membaca PROJECT_PLAYBOOK

☐ Membaca seluruh Foundation

☐ Membaca Business Rules

☐ Membaca Product Design

☐ Membaca Technical

☐ Membaca Design System

☐ Memahami Product Dictionary

☐ Tidak membuat fitur di luar MVP

# Current Project Status

Phase

Design & Documentation

Current Focus

UI/UX Design

Implementation

Belum dimulai

Database

Belum diimplementasikan

Frontend

Belum diimplementasikan

Backend

Belum diimplementasikan

# Documentation Status

Current Version

v1.0.0

Last Updated

2026-07-01

Status

Production Ready Documentation