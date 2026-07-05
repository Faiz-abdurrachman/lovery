---
slug: bug-fixes
status: awaiting-approval
intent: clear
pending-action: write .omo/plans/bug-fixes.md
approach: Fix 22 bugs across 4 waves — Security, Functional, Data Integrity, Code Quality
---

# Draft: bug-fixes

## Findings (cited - path:lines)
Full bug list dari audit lengkap — 22 bugs found:

### 🔴 KRITIS
1. **RLS mati semua tabel** — CHECKPOINT.md:89, all 11 Supabase tables
2. **Timezone dashboard salah** — admin/page.tsx:24-31, kalkulasi manual rentan error
3. **Anon key ekspos ke browser** — lib/supabase.ts, NEXT_PUBLIC_ key bisa diekstrak

### 🟠 TINGGI
4. **Client name undefined di drive** — drive/route.ts:23,53, Supabase return array bukan object
5. **Race condition nomor invoice/client** — data.ts:152-157, submissions/route.ts:86-101
6. **Widget "Hasil Blm Dikirim" logic terbalik** — admin/page.tsx:58, hitung DELIVERED bukan EDITING
7. **Admin bisa verifikasi nominal sembarangan** — invoice/page.tsx:72-93, tanpa validasi amount
8. **Status PAID bisa verify ulang** — verify/route.ts:53-58, kurang final status check

### 🟡 SEDANG
9. **Dead code google.ts, prisma.ts** — 2 files tidak dipakai
10. **Revenue endDate kurang presisi** — pendapatan/page.tsx:52-53
11. **Invoice PATCH tanpa sanitasi** — invoices/[id]/route.ts:41
12. **agreedTerms type hack** — ajukan-sesi/content.tsx:47
13. **Duplicate reminder sesi** — verify/route.ts:84-92
14. **Harga add-on pake price bukan priceSnapshot** — pengajuan/[id]/page.tsx:130-132
15. **Revenue filter pake createdAt** — revenue/route.ts:17-18
16. **Calendar endTime overflow jam** — google-calendar.ts:51

### 🟢 RENDAH
17. **Timeline missing labels DP_PAID, PAID** — data.ts:92-101
18. **formatRupiah duplikasi 4 file** — 4 admin page files
19. **UX inconsistent RESCHEDULE label** — pengajuan/[id]/page.tsx:40-49
20. **listReminders tanpa validasi status** — reminders/route.ts:12
21. **Auth double-check layout + page** — layout.tsx, page.tsx
22. **useState year tanpa setter** — pendapatan/page.tsx:50

## Decisions (with rationale)
- **Wave 1 (Security) dikerjain pertama** — karena ini critical, tanpa RLS data bisa bocor kapan aja
- **Wave 2 (Functional) langsung menyusul** — bugs yang langsung berdampak ke user experience
- **Wave 3 (Data Integrity) after Wave 2** — potensi duplikasi data, tapi butuh Wave 1 & 2 clear dulu
- **Wave 4 (Code Quality) paling akhir** — refactor/cleanup, no functional impact

## Scope IN
- Fix semua 22 bugs
- Tambah validasi di backend untuk payment amount
- Refactor formatRupiah ke shared utility
- Hapus dead code files
- Fix timezone logic pake date-fns-tz

## Scope OUT (Must NOT have)
- TIDAK nambah fitur baru
- TIDAK refactor arsitektur besar
- TIDAK ubah UI styling/layout
- TIDAK migrate dependencies

## Approval gate
status: awaiting-approval
