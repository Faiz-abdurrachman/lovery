---
title: Implementation Plan
version: 1.0.0
status: DRAFT
owner: Faiz + AI
priority: CRITICAL
related:
  - PROJECT_PLAYBOOK.md
  - MVP_SCOPE.md
---

# 📐 LOVERY — IMPLEMENTATION PLAN

> **Blueprint eksekusi Lovery Studio Management System.**
>
> Semua phase, task, dependency, dan checklist ada di sini.
>
> Kerjakan **per phase**. Setiap phase selesai → review → lanjut.

---

## STRATEGY

- **Fondasi backend dulu** (Phase 0-1): project init, Prisma schema, database
- **Vertical slice per fitur** (Phase 2-7): API + UI dalam satu phase
- **Setiap phase deliverable bisa didemo**
- **Landing page terakhir** — prioritas bisnis: dashboard operasional dulu

---

## DEPENDENCY MAP

```
Phase 0 ───► Phase 1 ───► Phase 2 ───► Phase 3
                                            │
                              ┌─────────────┘
                              ▼
                          Phase 4 ───► Phase 5
                              │            │
                              ▼            │
                          Phase 6 ◄────────┘
                              │
                              ▼
                          Phase 7 (parallel dgn Phase 5-6)
                              │
                              ▼
                          Phase 8
```

- Phase 0-2: Sequential, gak bisa diparalelkan
- Phase 3: Butuh Phase 2 (auth + layout)
- Phase 4: Butuh Phase 3 (submission harus ada)
- Phase 5: Butuh Phase 4 (calendar butuh DP verified)
- Phase 6: Butuh Phase 3-5 (dashboard agregasi semua data)
- Phase 7: Bisa paralel dengan Phase 5-6 (client side mandiri)
- Phase 8: Final

---

## PHASE 0 — PROJECT INITIALIZATION

> **Goal:** Project siap jalan, semua dependency terinstall, struktur folder rapi.

### 0.1 Initialize Next.js + TypeScript
- [ ] `pnpm create next-app lovery-studio --typescript --tailwind --eslint --app --src-dir`
- [ ] Konfigurasi path alias `@/` di `tsconfig.json`
- [ ] Setup `next.config.js` (image domains, env)
- [ ] Buat struktur folder sesuai Project Convention:
  ```
  src/
    app/
    components/
      ui/          ← shadcn/ui
      layout/      ← sidebar, header
    features/
    lib/
      prisma.ts
      auth.ts
      google.ts
    hooks/
    types/
    utils/
  prisma/
    schema.prisma
    seed.ts
  public/
  ```

### 0.2 Install Dependencies
- [ ] `pnpm add prisma @prisma/client`
- [ ] `pnpm add zod react-hook-form @hookform/resolvers`
- [ ] `pnpm add @tanstack/react-query`
- [ ] `pnpm add lucide-react`
- [ ] `pnpm add date-fns`
- [ ] `pnpm add next-auth@beta @auth/prisma-adapter bcryptjs`
- [ ] `pnpm add @types/bcryptjs`
- [ ] `pnpm add xlsx`
- [ ] `pnpm add googleapis`
- [ ] `pnpm dlx shadcn-ui@latest init` (style: new-york, color: zinc, css variables: yes)
- [ ] `pnpm add sonner` (toast)

### 0.3 Configure Tooling
- [ ] ESLint + Prettier config
- [ ] Tailwind: extend dengan Design Tokens (warna #E89CC9, spacing, font, radius)
- [ ] Font setup: TT Hoves (heading), Public Sans (body), Questrial (highlight)
- [ ] `.env.example`
- [ ] `.gitignore`

**Deliverable:** `pnpm dev` tanpa error, semua dependency ready.

---

## PHASE 1 — DATABASE FOUNDATION

> **Goal:** Prisma schema lengkap, migration, seed data.

### 1.1 Prisma Schema

**Enums:**
- [ ] `SubmissionStatus`: PENDING_REVIEW, WAITING_DP, DP_PAID, PAID, ON_SESSION, EDITING, DELIVERED, COMPLETED, REJECTED, RESCHEDULE, CANCELLED
- [ ] `PaymentType`: DP, PELUNASAN, REFUND
- [ ] `PaymentMethod`: TRANSFER, QRIS
- [ ] `ReminderType`: PAYMENT, SESSION, DELIVERY
- [ ] `InvoiceStatus`: ACTIVE, REVISED, VOID
- [ ] `ReminderStatus`: PENDING, COMPLETED

**Models (11 tabel):**
- [ ] **Admin**: id (cuid), name, email (unique), passwordHash, role, createdAt, updatedAt
- [ ] **Client**: id (cuid), clientNumber (unique), name, phone (unique), instagram?, allowPublish, notes?, createdAt, updatedAt, deletedAt?
- [ ] **Package**: id (cuid), name, category, description?, price (Int), isActive, createdAt, updatedAt
- [ ] **AddOn**: id (cuid), name, price (Int), description?, isActive, createdAt, updatedAt
- [ ] **Submission**: id (cuid), submissionNumber (unique), clientId (FK), packageId (FK), status (enum), eventName, eventDate, eventTime, location, specialRequest?, adminNote?, rescheduleCount, googleEventId?, googleDriveLink?, createdAt, updatedAt, deletedAt?
- [ ] **SubmissionAddOn**: submissionId (FK), addonId (FK), priceSnapshot (Int), @@id([submissionId, addonId])
- [ ] **Invoice**: id (cuid), invoiceNumber (unique), submissionId (FK), subtotal (Int), addonTotal (Int), grandTotal (Int), dpAmount (Int), remainingAmount (Int), status (enum), revision, issuedAt?, createdAt, updatedAt
- [ ] **Payment**: id (cuid), invoiceId (FK), paymentType (enum), amount (Int), paymentMethod (enum), paymentDate?, verifiedBy (FK Admin)?, verifiedAt?, notes?, createdAt
- [ ] **Timeline**: id (cuid), submissionId (FK), activity, description?, performedBy?, createdAt
- [ ] **Reminder**: id (cuid), submissionId (FK), type (enum), title, dueDate?, status (enum), createdAt
- [ ] **Settings**: id (cuid), studioName, whatsapp, bankName?, bankAccount?, bankHolder?, qrisImage?, googleCalendarId?, googleDriveFolder?, businessHourStart?, businessHourEnd?, updatedAt

**Relasi:**
```
Client 1──∞ Submission
Package 1──∞ Submission
Submission 1──∞ SubmissionAddOn ∞──1 AddOn
Submission 1──∞ Invoice
Invoice 1──∞ Payment
Submission 1──∞ Timeline
Submission 1──∞ Reminder
Admin 1──∞ Payment (verifiedBy)
Admin 1──∞ Timeline (performedBy)
```

### 1.2 Migration
- [ ] `pnpm prisma migrate dev --name init`
- [ ] Verifikasi: `pnpm prisma studio` — semua tabel ada

### 1.3 Seed Data (`prisma/seed.ts`)
- [ ] Admin default (admin@lovery.com, password hash)
- [ ] Paket minimal: Graduation Basic (500000), Graduation Premium (750000), Casual (400000), Wedding (2000000)
- [ ] Add-On minimal: Drone (300000), Extra Jam (150000), Video Highlight (250000), Cetak Album (200000), Extra Foto (100000)
- [ ] Settings default
- [ ] `pnpm prisma db seed`

**Deliverable:** Database siap pakai, data seed untuk development.

---

## PHASE 2 — AUTHENTICATION & LAYOUT

> **Goal:** Admin bisa login, dashboard layout skeleton siap.

### 2.1 Authentication
- [ ] Setup next-auth (Auth.js v5) dengan Prisma Adapter
- [ ] Credentials Provider (email + password, bcrypt)
- [ ] Halaman `/admin/login`: email, password, error state, loading state
- [ ] Callback session → include admin role
- [ ] Middleware: redirect unauthenticated ke `/admin/login`
- [ ] Logout button di header

### 2.2 Admin Layout
- [ ] **Sidebar** (`components/layout/sidebar.tsx`):
  - Logo Lovery
  - Nav items (Dashboard, Pengajuan, Invoice, Kalender, Pendapatan, Klien, Pengaturan)
  - Active state styling
  - Mobile: drawer (slide from left)
- [ ] **Header** (`components/layout/header.tsx`):
  - Hamburger (mobile)
  - Page title (dinamis)
  - User avatar + dropdown (logout)
- [ ] Layout wrapper: sidebar + header + content

### 2.3 Providers Setup
- [ ] TanStack Query Provider
- [ ] Session Provider
- [ ] Sonner Toaster

**Deliverable:** Admin login, lihat layout kosong, navigasi berfungsi.

---

## PHASE 3 — PENGAJUAN SESI

> **Goal:** Klien submit form → admin review → status berubah.

### 3.1 Schemas & Types
- [ ] `features/submission/schemas/submission.schema.ts` (Zod)
- [ ] `features/submission/types/submission.type.ts`

### 3.2 API Routes
- [ ] `POST /api/submissions` — klien submit
  - Validasi Zod, upsert Client, generate `LVR-XXXX-YYYY`, status PENDING_REVIEW, timeline
- [ ] `GET /api/submissions` — admin list (query: status, search, page)
- [ ] `GET /api/submissions/[id]` — admin detail
- [ ] `PATCH /api/submissions/[id]/status` — admin update status (terima/tolak/reschedule)

### 3.3 Hooks
- [ ] `useSubmissions(filters)` — list
- [ ] `useSubmission(id)` — detail
- [ ] `useCreateSubmission()` — mutation
- [ ] `useUpdateStatus()` — mutation

### 3.4 Client: Form Pengajuan (`app/ajukan-sesi/page.tsx`)
- [ ] Step 1: Pilih Kategori & Paket (card grid, klik)
- [ ] Step 2: Pilih Add-On (checkbox, harga realtime client-side)
- [ ] Step 3: Data Diri (nama, WA wajib, Instagram opsional)
- [ ] Step 4: Detail Acara (event, lokasi, tanggal datepicker, jam)
- [ ] Step 5: Request Khusus (textarea opsional)
- [ ] Step 6: Ringkasan Harga (sidebar kanan / sticky bottom)
- [ ] Step 7: Persetujuan Publikasi + Checklist T&C
- [ ] Progress step indicator
- [ ] Validasi inline (react-hook-form + zodResolver)
- [ ] Submit → redirect halaman status

### 3.5 Client: Status Pengajuan (`app/status/page.tsx`)
- [ ] Input nomor pengajuan + nomor WA
- [ ] GET submission by number + WA
- [ ] Status badge (warna), timeline, detail sesi, status pembayaran
- [ ] Tombol "Hubungi Admin" → WhatsApp deep link

### 3.6 Admin: Daftar Pengajuan (`app/admin/pengajuan/page.tsx`)
- [ ] Tabel: nomor, klien, paket, tanggal, status badge, aksi
- [ ] Filter status, search, pagination
- [ ] Empty state, loading skeleton

### 3.7 Admin: Detail Pengajuan (`app/admin/pengajuan/[id]/page.tsx`)
- [ ] Info klien + detail sesi + paket + add-on breakdown, timeline
- [ ] Action buttons per status:
  - PENDING_REVIEW → [Terima] [Tolak] [Reschedule]
  - WAITING_DP → [Verifikasi DP] [Batalkan]
  - DP_PAID → [Verifikasi Pelunasan]
  - ON_SESSION → [Selesaikan Sesi]
  - EDITING → [Upload Google Drive]
  - DELIVERED → [Tandai Selesai]
- [ ] Dialog konfirmasi untuk setiap aksi
- [ ] Input alasan untuk Tolak / Batalkan

**Deliverable:** Full flow Pengajuan Sesi: klien submit → admin review → status berubah.

---

## PHASE 4 — INVOICE & PEMBAYARAN

> **Goal:** Invoice auto-generate. Admin verifikasi DP & pelunasan. WhatsApp deep link.

### 4.1 Schemas
- [ ] `features/invoice/schemas/invoice.schema.ts`
- [ ] `features/payment/schemas/payment.schema.ts`

### 4.2 Invoice — API
- [ ] `POST /api/invoices` — auto-generate saat submission diterima
  - Format: `INV{seq}{year}`, kalkulasi subtotal/addonTotal/grandTotal/dpAmount/remainingAmount
- [ ] `GET /api/invoices` — list
- [ ] `GET /api/invoices/[id]` — detail
- [ ] `PATCH /api/invoices/[id]` — edit sebelum dikirim (harga, add-on)
- [ ] `POST /api/invoices/[id]/send` — tandai dikirim, trigger WA
- [ ] `POST /api/invoices/[id]/revise` — add-on baru → invoice baru, lama jadi REVISED

### 4.3 Invoice — UI
- [ ] Daftar Invoice (`app/admin/invoice/page.tsx`)
  - Kolom: nomor, klien, nominal, status, tanggal
- [ ] Preview Invoice (modal/page)
  - Info studio, info klien, detail sesi, add-on breakdown
  - Ringkasan: Paket + Add-On = Subtotal → DP → Sisa Pelunasan
- [ ] Edit Invoice (sebelum kirim)
- [ ] Tombol "Kirim Invoice" → WA deep link
- [ ] Histori invoice revisi

### 4.4 Pembayaran — API
- [ ] `POST /api/payments` — catat pembayaran (DP/PELUNASAN/REFUND)
- [ ] `PATCH /api/payments/[id]/verify` — admin verifikasi
  - DP verified → status DP_PAID → catat pendapatan → trigger Google Calendar (Phase 5) → timeline
  - Pelunasan verified → status PAID → update pendapatan → timeline

### 4.5 Pembayaran — UI
- [ ] Panel di Detail Pengajuan: status badge, breakdown (DP + Pelunasan + Sisa)
- [ ] Tabel riwayat pembayaran
- [ ] Tombol "Verifikasi DP" → dialog konfirmasi nominal
- [ ] Tombol "Verifikasi Pelunasan" → dialog konfirmasi nominal

### 4.6 WhatsApp Utility
- [ ] `lib/whatsapp.ts` → `generateWhatsAppLink(number, message)`
- [ ] Template pesan: pengajuan diterima, invoice siap, DP terverifikasi, reminder pelunasan, reminder H-1, hasil dikirim

**Deliverable:** Invoice auto-generate, verifikasi DP + pelunasan, WhatsApp deep link.

---

## PHASE 5 — GOOGLE INTEGRATIONS

> **Goal:** Calendar auto-create saat DP verified. Admin simpan + kirim Google Drive link.

### 5.1 Google Calendar — Backend
- [ ] Setup Google Service Account / OAuth
- [ ] Config: `googleCalendarId` di Settings
- [ ] `lib/google-calendar.ts`:
  - `createEvent(submission)` — title: "{Kategori} - {Nama}", date, time, location, description
  - `updateEvent(submission)` — update jadwal
  - `deleteEvent(googleEventId)` — hapus jika dibatalkan
- [ ] Trigger: verifyPayment(DP) → createEvent() → simpan googleEventId
- [ ] Error handling: retry + log + notifikasi admin

### 5.2 Kalender Studio — UI
- [ ] Halaman `/admin/kalender`
  - Tampilan bulanan grid
  - Hari dengan sesi: dot/tanda
  - Klik hari → list agenda
- [ ] Agenda Hari Ini di Dashboard
- [ ] Mini Calendar di Dashboard

### 5.3 Google Drive — Backend
- [ ] `PATCH /api/submissions/[id]/drive` — simpan link GD
- [ ] Action: kirim → status DELIVERED → WhatsApp + timeline

### 5.4 Google Drive — UI
- [ ] Panel di Detail Pengajuan (status EDITING): input link GD
- [ ] Tombol "Simpan & Kirim" → buka WhatsApp + timeline
- [ ] Bisa update link
- [ ] Dashboard: counter "Hasil Belum Dikirim"

**Deliverable:** Calendar auto-create, Drive link simpan + kirim.

---

## PHASE 6 — DASHBOARD & PENDAPATAN

> **Goal:** Dashboard fungsional penuh. Pendapatan monitor + export.

### 6.1 Dashboard API
- [ ] `GET /api/dashboard/tasks` — task prioritas (verifikasi DP, reminder pelunasan, review, upload drive)
- [ ] `GET /api/dashboard/agenda` — sesi hari ini
- [ ] `GET /api/dashboard/revenue-summary` — hari ini, bulan ini, outstanding, DP hari ini
- [ ] `GET /api/dashboard/recent-activities` — 10 aktivitas terbaru
- [ ] `GET /api/dashboard/widgets` — counter: pengajuan baru, menunggu DP, pelunasan, editing, hasil belum dikirim, jadwal hari ini

### 6.2 Dashboard UI (`app/admin/page.tsx`)

**Workspace 1: 🔥 Yang Harus Dikerjakan**
- [ ] Task cards urut prioritas (🔴 Merah → 🟠 Orange → 🟡 Kuning → 🟢 Hijau)
- [ ] Action card per task: verifikasi DP [Verifikasi], reminder pelunasan [Hubungi WA], review [Review], upload drive [Upload]
- [ ] Badge counter task mendesak
- [ ] Empty state: "Semua pekerjaan selesai!"

**Workspace 2: 📅 Agenda Hari Ini**
- [ ] List sesi (jam, kategori, nama, lokasi)
- [ ] Klik → detail pengajuan
- [ ] Empty: "Tidak ada sesi hari ini"

**Workspace 3: 💰 Pendapatan**
- [ ] Widget: Hari Ini, Bulan Ini, Outstanding, DP Hari Ini
- [ ] Format Rupiah
- [ ] Klik → halaman Pendapatan

**Workspace 4: 📝 Aktivitas Terbaru**
- [ ] Timeline 10 aktivitas terakhir

**Widget Cards:**
- [ ] Pengajuan Baru, Menunggu DP, Menunggu Pelunasan, Editing, Hasil Belum Dikirim, Jadwal Hari Ini

**Quick Actions:**
- [ ] + Pengajuan Baru, + Invoice, Cari Klien, Kalender, Pendapatan

**Global Search:**
- [ ] Search modal: nama klien, nomor WA, nomor pengajuan, nomor invoice
- [ ] Hasil langsung ke detail

### 6.3 Pendapatan API
- [ ] `GET /api/revenue` — summary (filter: rentang tanggal)
- [ ] `GET /api/revenue/transactions` — list transaksi (pagination, filter)
- [ ] `GET /api/revenue/export` — generate Excel

### 6.4 Pendapatan UI (`app/admin/pendapatan/page.tsx`)
- [ ] Filter rentang tanggal
- [ ] Revenue Cards: Total, DP, Pelunasan, Outstanding
- [ ] Bar chart pendapatan per bulan (recharts atau chart.js)
- [ ] Tabel transaksi (tanggal, klien, tipe, nominal, status)
- [ ] Tombol Export Excel
- [ ] Insights: paket terlaris, kota terbanyak, tren

**Deliverable:** Dashboard fungsional penuh. Pendapatan monitor + export Excel.

---

## PHASE 7 — LANDING PAGE & CLIENT WEBSITE

> **Goal:** Website publik lengkap, client flow mandiri.

### 7.1 Landing Page (`app/page.tsx`)
- [ ] Navbar: logo, menu (Beranda, Paket, Status, Hubungi), CTA "Ajukan Sesi"
- [ ] Hero: foto besar, headline, subheadline, CTA
- [ ] Portfolio Gallery (filter kategori)
- [ ] Tentang Lovery
- [ ] Kategori Layanan (card grid)
- [ ] Mengapa Memilih Lovery (value props)
- [ ] FAQ (accordion)
- [ ] Terms & Conditions ringkasan
- [ ] Footer

### 7.2 Halaman Paket (`app/paket/page.tsx`)
- [ ] Filter kategori
- [ ] Card per paket (nama, harga, deskripsi, fasilitas)
- [ ] Tombol "Ajukan Sesi" → form dengan paket terpilih

### 7.3 Detail Paket (`app/paket/[id]/page.tsx`)
- [ ] Breadcrumb, nama + harga
- [ ] Galeri contoh
- [ ] Fasilitas list
- [ ] Add-On tersedia
- [ ] CTA "Ajukan Sesi"

### 7.4 Status Pengajuan (Client) — sudah ada di Phase 3.5

**Deliverable:** Landing page + client flow lengkap.

---

## PHASE 8 — POLISH & DEPLOY

> **Goal:** Production ready.

### 8.1 Responsive & Accessibility
- [ ] Semua halaman responsive (Desktop 1280, Tablet 768, Mobile 390)
- [ ] WCAG AA contrast
- [ ] Keyboard navigation
- [ ] Focus states
- [ ] Min touch target 44px
- [ ] Semantic HTML

### 8.2 State Handling
- [ ] Loading state (skeleton) semua halaman
- [ ] Empty state semua list/tabel
- [ ] Error state + retry
- [ ] Toast notifications (sukses/gagal)

### 8.3 Database Klien (`app/admin/klien/page.tsx`)
- [ ] Search + filter
- [ ] Daftar klien
- [ ] Detail: riwayat pengajuan, riwayat pembayaran, catatan internal

### 8.4 Pengaturan (`app/admin/pengaturan/page.tsx`)
- [ ] Google Calendar ID
- [ ] Nomor WhatsApp
- [ ] Rekening bank (nama, nomor, pemegang)
- [ ] QRIS upload
- [ ] Jam operasional
- [ ] Template WhatsApp message (textarea)
- [ ] Simpan per section

### 8.5 Pengingat (Reminder System)
- [ ] Auto-create reminder saat status tertentu:
  - Verifikasi DP → reminder pelunasan (due: H-3 sebelum sesi)
  - DP_PAID → reminder H-1 sesi
  - EDITING → reminder pengiriman (due: +7 hari)
- [ ] Dashboard: reminder yang sudah lewat due date → prioritas tinggi

### 8.6 Deployment
- [ ] Vercel project setup
- [ ] Environment variables production
- [ ] Database production (Supabase/Neon/Railway)
- [ ] `pnpm build` — no errors
- [ ] DNS / custom domain
- [ ] Seed production admin

### 8.7 Documentation Final
- [ ] Update PROJECT_PLAYBOOK status
- [ ] Update Decision Log jika ada perubahan
- [ ] API documentation (self-documenting dari route handlers)

**Deliverable:** Production deployment, semua fitur MVP berjalan.

---

## RINGKASAN PHASE

| Phase | Nama | Task Count | Dependency | Estimasi |
|-------|------|------------|------------|----------|
| 0 | Project Init | ~30 | - | 1 sesi |
| 1 | Database | ~30 | Phase 0 | 1 sesi |
| 2 | Auth + Layout | ~20 | Phase 1 | 1 sesi |
| 3 | Pengajuan Sesi | ~40 | Phase 2 | 2-3 sesi |
| 4 | Invoice + Pembayaran | ~30 | Phase 3 | 2 sesi |
| 5 | Google Integrations | ~20 | Phase 4 | 2 sesi |
| 6 | Dashboard + Pendapatan | ~30 | Phase 3-5 | 2 sesi |
| 7 | Landing Page | ~20 | Phase 3 | 1-2 sesi |
| 8 | Polish + Deploy | ~30 | All | 1-2 sesi |
| **TOTAL** | | **~250 tasks** | | **13-16 sesi** |

---

## DEFINITION OF DONE (Per Phase)

Sebuah phase dianggap selesai apabila:

- [ ] Semua checklist tercentang
- [ ] Tidak ada TypeScript error
- [ ] Tidak ada lint error
- [ ] Semua state tertangani (loading, empty, error)
- [ ] Responsive (Desktop + Tablet + Mobile)
- [ ] UI mengikuti Design System
- [ ] Mengikuti Business Rules
- [ ] Menggunakan istilah Product Dictionary
- [ ] Bisa didemo tanpa error
- [ ] Tidak ada fitur di luar MVP
