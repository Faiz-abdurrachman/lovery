# 🤖 AI ONBOARDING — Lovery Studio Management System

> **BACA INI DULU SEBELUM BACA APA PUN.**
>
> Dokumen ini adalah peta jalan buat AI assistant baru yang akan melanjutkan development Lovery.

---

## 📋 PROJECT SUMMARY

**Lovery Studio Management System** — sistem operasional studio fotografi berbasis web.

- **Production URL:** https://lovery-photography.vercel.app
- **Admin Login:** `/admin/login` → `admin@lovery.com` / `admin123`
- **Database:** Supabase (PostgreSQL via REST API)
- **Framework:** Next.js 16 (App Router) + TypeScript + Tailwind 4
- **State:** MVP COMPLETE — semua fitur sudah jalan

---

## 📖 BACAAN WAJIB (URUTAN)

### 1. Dokumentasi Resmi (sudah ada di repo)
```
docs/PROJECT_PLAYBOOK.md          ← PINTU MASUK UTAMA
docs/00_FOUNDATION/                ← Filosofi, latar belakang, problem, decision log
docs/01_BUSINESS_RULES/            ← Aturan bisnis (status flow, DP, invoice, WhatsApp)
docs/02_PRODUCT_DESIGN/            ← User journey, page structure, feature spec
docs/03_PRODUCT_ALIGNMENT/         ← MVP scope (batasan fitur)
docs/04_TECHNICAL/                 ← Architecture, ERD, database, coding standards
docs/05_DESIGN_SYSTEM/             ← Brand, colors, typography, components
docs/IMPLEMENTATION_PLAN.md        ← Phase breakdown 0-8
```

### 2. File Kunci di `src/`
```
src/lib/data.ts          ← SEMUA query database (Supabase SDK) — 14 functions
src/lib/supabase.ts      ← Supabase client singleton
src/lib/auth.ts          ← NextAuth config (credentials via Supabase)
src/lib/auth.config.ts   ← Auth config untuk Edge middleware
src/lib/auth-edge.ts     ← Auth wrapper untuk middleware (Edge-safe)
src/lib/google-calendar.ts ← Google Calendar integration
src/lib/prisma.ts        ← LEGACY — masih ada tapi gak dipake runtime
src/features/            ← Business logic per modul (submission, invoice, etc.)
src/app/api/             ← 19 API route handlers
src/app/(admin)/admin/   ← Admin dashboard pages
src/app/ajukan-sesi/     ← Client submission form (5-step wizard)
src/app/status/          ← Client status tracker
src/app/components/      ← Landing page components
```

---

## 🏗️ ARSITEKTUR PENTING

### Database: Supabase SDK (BUKAN Prisma)
Proyek ini MIGRASI dari Prisma ke Supabase SDK pada akhir development. Kenapa?

| Sebelum | Sekarang |
|---------|----------|
| Prisma + `@prisma/adapter-pg` | Supabase JS SDK (REST API via HTTPS) |
| PostgreSQL direct connection | HTTPS REST API (gak perlu TCP ke DB) |
| Tetap pake Prisma untuk `generate` (types) | Runtime semua lewat Supabase SDK |

**Jangan pernah import/use PrismaClient di runtime.** Prisma hanya dipake untuk `prisma generate` (generate types) dan schema reference. Semua query database pakai `import { supabase } from "@/lib/supabase"`.

### Zod Version: v4 (⚠️ BREAKING CHANGES)
Zod v4 punya perbedaan besar dari v3:
- `z.preprocess()` dan `z.coerce()` menghasilkan type `unknown` (bukan tipe inner schema)
- `@hookform/resolvers` mungkin gak compatible sama Zod v4 untuk tipe yang pake `preprocess`/`coerce`
- **Workaround:** Jangan pake `z.coerce`/`z.preprocess` di schema frontend. Parse data di API route sebelum Zod validation.

### UUID Generation
Prisma `@default(cuid())` gak ada di Supabase. **Setiap INSERT HARUS include `id: crypto.randomUUID()`**.

### `updatedAt` Field
Prisma `@updatedAt` gak translate ke DB trigger. **Setiap INSERT HARUS include `updatedAt: new Date().toISOString()`**.

---

## 🐛 KNOWN GOTCHAS

| # | Issue | Solusi |
|---|-------|--------|
| 1 | Zod 4 `z.coerce.date()` → type `unknown`, bikin RHF type error | Parse date di API route sebelum Zod |
| 2 | Supabase join returns arrays `client: [{...}]`, kode expects single object | Access `client?.[0]?.name` atau `client?.name` (handles both) |
| 3 | Supabase gak ada auto UUID — semua INSERT butuh `crypto.randomUUID()` | Selalu tambahin `id: crypto.randomUUID()` |
| 4 | `updatedAt` NOT NULL tanpa default di DB | Selalu tambahin `updatedAt: new Date()` di INSERT |
| 5 | Vercel env vars `NEXT_PUBLIC_*` harus diset di dashboard | `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| 6 | Build cache Vercel kadang stale | Hapus deployment + redeploy fresh |
| 7 | Port 3000 sering kepake di local | Gunakan `pnpm dev -p 3001` |
| 8 | Middleware harus Edge-compatible (gak boleh import Prisma/node modules) | Pakai `@/lib/auth-edge.ts` (bukan `@/lib/auth.ts`) |

---

## 🚀 LOCAL DEVELOPMENT

```bash
# Install
pnpm install

# Setup .env (copy dari production Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://pimdpquknsfhtlebndnv.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_Xsx4sVME3Gp5J2RTo-77RQ_PRlp7Kbq"
AUTH_SECRET="random-string-here"

# Run
pnpm dev -p 3001

# Build
pnpm build
```

---

## 📊 STATUS PENGERJAAN

| Phase | Status | Note |
|-------|--------|------|
| 0 — Init | ✅ | Next.js + TypeScript + Tailwind + shadcn |
| 1 — Database | ✅ | Prisma schema (11 models), migrated ke Supabase |
| 2 — Auth | ✅ | NextAuth v5 JWT + Credentials |
| 3 — Pengajuan | ✅ | Client form + admin review |
| 4 — Invoice | ✅ | Auto-generate, edit, payment verification |
| 5 — Google | ✅ | Calendar create event, Drive link |
| 6 — Pendapatan | ✅ | Revenue page + export Excel |
| 7 — Landing | ✅ | Landing page + paket + FAQ |
| 8 — Polish | ✅ | Klien, Pengaturan, Reminders, Error/Loading states |

---

## 📞 TEST CREDENTIALS

| Role | URL | Email | Password |
|------|-----|-------|----------|
| Admin | `/admin/login` | `admin@lovery.com` | `admin123` |
| Client | `/ajukan-sesi` | (no login) | (no login) |

---

## 🔗 DEPLOYMENT

- **Vercel project:** `lovery-photography`
- **Supabase project:** `pimdpquknsfhtlebndnv` (Singapore)
- **Auto-deploy:** Push ke `main` branch → Vercel auto-build
- **Env vars Vercel:** `DATABASE_URL`, `AUTH_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`

---

## ⚡ QUICK START — Baca dalam 5 menit

1. `PROJECT_PLAYBOOK.md` (skimming)
2. `src/lib/data.ts` (ini jantung aplikasi)
3. `src/lib/supabase.ts` (koneksi database)
4. `src/lib/auth.ts` (autentikasi)
5. `src/app/api/submissions/route.ts` (flow utama: client submit)
6. `src/app/(admin)/admin/page.tsx` (dashboard admin)
