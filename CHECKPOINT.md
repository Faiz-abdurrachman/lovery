# 📊 LOVERY 2.0 — PROJECT CHECKPOINT

> **Date:** 2026-07-02 | **Framework:** Next.js 16.2.9 (Turbopack) | **Status:** MVP COMPLETE

---

## 1. FILE COUNT — `src/`

| Metric | Count |
|---|---|
| **Total source files** | **103** |
| **Total lines of code** | **7,249** |
| Feature modules | 13 files in `src/features/` |
| UI components | 17 in `src/components/ui/` |
| API routes | 19 route files |
| Page files | 14 page files |

---

## 2. ROUTE MAP

### PUBLIC PAGES (6)

| Route | Render | Lines | Status |
|---|---|---|---|
| `/` — Landing Page | Static `○` | 30 | ✅ Full: Hero, Portfolio, About, Services, FAQ, CTA |
| `/paket` — Package List | Dynamic `ƒ` | 58 | ✅ Active |
| `/ajukan-sesi` — Form | Static `○` | 10+ | ✅ 5-step wizard |
| `/status` — Tracker | Static `○` | 10+ | ✅ Client tracking |
| `/syarat-ketentuan` — TOS | Static `○` | 26 | ✅ Active |
| `/admin/login` — Login | Static `○` | 130 | ✅ Active |

### ADMIN PAGES (8)

| Route | Render | Lines | Status |
|---|---|---|---|
| `/admin` — Dashboard | Dynamic `ƒ` | 183 | ✅ Full: counts, agenda, revenue, reminders |
| `/admin/pengajuan` — List | Dynamic `ƒ` | 156 | ✅ Filter, search, table |
| `/admin/pengajuan/[id]` — Detail | Dynamic `ƒ` | 330 | ✅ Timeline, actions, drive link |
| `/admin/invoice` — List/Detail | Dynamic `ƒ` | 342 | ✅ Generate, edit, verify payment |
| `/admin/kalender` — Calendar | Dynamic `ƒ` | 93 | ✅ Grouped by date |
| `/admin/pendapatan` — Revenue | Dynamic `ƒ` | 238 | ✅ Month filter, export Excel |
| `/admin/klien` — Clients | Dynamic `ƒ` | 120 | ✅ Search, expand detail |
| `/admin/pengaturan` — Settings | Dynamic `ƒ` | 142 | ✅ Form with 5 sections |

### API ROUTES (19)

| # | Route | Methods | Status |
|---|-------|---------|--------|
| 1 | `/api/auth/[...nextauth]` | GET, POST | ✅ NextAuth handler |
| 2 | `/api/clients` | GET | ✅ List + search |
| 3 | `/api/clients/[id]` | GET | ✅ Detail + submissions |
| 4 | `/api/submissions` | POST | ✅ Create (client) |
| 5 | `/api/submissions/list` | GET | ✅ Admin paginated list |
| 6 | `/api/submissions/track` | GET | ✅ Public tracker |
| 7 | `/api/submissions/[id]` | GET | ✅ Detail |
| 8 | `/api/submissions/[id]/status` | PATCH | ✅ Status transition |
| 9 | `/api/submissions/[id]/drive` | PATCH | ✅ Drive link |
| 10 | `/api/invoices` | GET, POST | ✅ List + Create |
| 11 | `/api/invoices/[id]` | GET, PATCH | ✅ Detail + Edit |
| 12 | `/api/payments` | POST | ✅ Record payment |
| 13 | `/api/payments/[id]/verify` | PATCH | ✅ Verify DP/Pelunasan |
| 14 | `/api/payments/revenue` | GET | ✅ Filtered by date |
| 15 | `/api/packages` | GET | ✅ List active |
| 16 | `/api/addons` | GET | ✅ List active |
| 17 | `/api/settings` | GET, PATCH | ✅ Read + Update |
| 18 | `/api/reminders` | GET | ✅ List pending |
| 19 | `/api/reminders/[id]/complete` | PATCH | ✅ Mark done |

---

## 3. DATABASE — Supabase

| Table | Rows | RLS |
|---|---|---|
| `admins` | 1 | ❌ Disabled |
| `clients` | 2 | ❌ Disabled |
| `packages` | 4 | ❌ Disabled |
| `add_ons` | 5 | ❌ Disabled |
| `submissions` | 1 | ❌ Disabled |
| `submission_add_ons` | 1 | ❌ Disabled |
| `invoices` | 1 | ❌ Disabled |
| `payments` | 2 | ❌ Disabled |
| `timelines` | 5 | ❌ Disabled |
| `reminders` | 0 | ❌ Disabled |
| `settings` | 1 | ❌ Disabled |
| **TOTAL** | **23 rows** | |

> ⚠️ RLS disabled on all 11 tables. Anon key has unrestricted access. Should be addressed before production.

---

## 4. TEST CREDENTIALS

| Role | URL | Email | Password |
|------|-----|-------|----------|
| Admin | `/admin/login` | `admin@lovery.com` | `admin123` |
| Client | `/ajukan-sesi` | (none) | (none) |

---

## 5. QA CHECKS

| Check | Status |
|---|---|
| `pnpm build` | ✅ 23/23 static pages, TypeScript clean |
| `pnpm lint` | ⚠️ 20 `any`-type warnings (cosmetic, not blocking) |
| Vercel Production | ✅ https://lovery-photography.vercel.app — HTTP 200 |
| Client form submit | ✅ Zod validation pass, Supabase insert OK |
| Admin login | ✅ NextAuth Supabase credentials |
| Admin review flow | ✅ Accept → Invoice → Payment → Verify → Calendar |
| Export Excel | ✅ xlsx download .xlsx |

---

## 6. KEY FILES

| File | Purpose | Lines |
|------|---------|-------|
| `src/lib/data.ts` | All Supabase queries (14 functions) | 341 |
| `src/lib/supabase.ts` | Supabase client singleton | 7 |
| `src/lib/auth.ts` | NextAuth config (Supabase) | 42 |
| `src/lib/auth.config.ts` | Auth config (Edge-safe) | 37 |
| `src/lib/auth-edge.ts` | Middleware auth wrapper | 4 |
| `src/lib/google-calendar.ts` | Calendar integration | 158 |
| `middleware.ts` | Route protection | 26 |
| `src/features/submission/schemas/` | Zod validation schemas | 41 |
