# bug-fixes - Work Plan

## TL;DR (For humans)

**What you'll get:** 22 bugs diperbaiki — dari keamanan database (RLS), timezone dashboard yang salah, data client yang hilang di WhatsApp, sampai duplikasi kode dan logic terbalik. Semua dibagi 4 wave biar gak tabrakan.

**Why this approach:** Security dulu (RLS = celah kritis), baru functional bugs yang langsung dirasain admin, baru data integrity, terakhir cleanup. Biar aman dan terstruktur.

**What it will NOT do:** Gak nambah fitur baru. Gak ganti UI. Gak refactor arsitektur besar. Fokus fix doang.

**Effort:** Medium (4 wave, 22 bugs, estimasi 30-40 menit pengerjaan)
**Risk:** Medium — RLS changes perlu akses Supabase Dashboard, beberapa perubahan bisa impact flow existing
**Decisions to sanity-check:** Payment validation logic baru, Timezone approach pake date-fns-tz

Your next move: Approve plan ini, gue execute wave by wave. Full detail di bawah.

---

> TL;DR (machine): Medium effort, Medium risk, 22 bugs in 4 waves — Security → Functional → Data Integrity → Code Quality

## Scope
### Must have
- Aktifkan RLS di Supabase dashboard (SEMUA tabel)
- Fix timezone dashboard pakai date-fns-tz
- Fix client name undefined di drive route (Supabase array handling)
- Fix widget "Hasil Blm Dikirim" logic (EDITING + driveLink IS NULL)
- Tambah validasi amount payment di backend
- Fix race condition nomor invoice/client pakai timestamp-based ID
- Fix duplicate reminder logic
- Fix add-on price pake priceSnapshot
- Hapus dead code (google.ts, prisma.ts)
- Fix revenue filter boundary dan field
- Tambah sanitasi input di invoice PATCH
- Refactor formatRupiah ke shared utils
- Fix minor bugs (overflow jam, missing labels, dll)

### Must NOT have (guardrails, anti-slop, scope boundaries)
- JANGAN nambah dependency baru selain date-fns-tz
- JANGAN ubah struktur database
- JANGAN refactor komponen UI
- JANGAN tambah fitur baru dalam bentuk apapun
- JANGAN ubah styling/tailwind config

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + lsp_diagnostics + pnpm build
- Evidence: .omo/evidence/task-<N>-bug-fixes.txt

## Execution strategy
### Parallel execution waves
> 4 waves: Wave 1 (Security) → Wave 2 (Functional) → Wave 3 (Data Integrity) → Wave 4 (Code Quality)

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 (RLS) | Supabase akses | - | 2 |
| 2 (Anon key) | - | - | 1 |
| 3 (Timezone) | - | - | 4, 5, 6 |
| 4 (Drive name) | - | - | 3, 5, 6 |
| 5 (Widget logic) | - | - | 3, 4, 6 |
| 6 (Payment validasi) | - | - | 3, 4, 5 |
| 7 (Status final check) | 6 | - | 8 |
| 8 (Race condition) | - | - | 9, 10 |
| 9 (Duplicate reminder) | - | - | 8, 10 |
| 10 (Addon priceSnapshot) | - | - | 8, 9 |
| 11 (Dead code) | - | - | 12-22 |
| 12-22 (Minor/Quality) | - | - | ALL |

## Todos

- [ ] 1. **supabase-rls: Aktifkan RLS di semua tabel Supabase**
  What to do / Must NOT do: Buka Supabase dashboard → Authentication → Policies → Aktifin RLS di 11 tables (admins, clients, packages, add_ons, submissions, submission_add_ons, invoices, payments, timelines, reminders, settings). Buat policy dasar: "Allow authenticated users only" untuk semua operasi. JANGAN nonaktifkan anon key — itu masih dipake client.
  Parallelization: Wave 1 | Blocked by: - | Blocks: -
  References: Supabase Dashboard (https://supabase.com/dashboard/project/pimdpquknsfhtlebndnv), CHECKPOINT.md:89
  Acceptance criteria: `supabase.from('submissions').select('*', { count: 'exact', head: true }).then(r => !r.error)` — query tetap jalan, RLS enabled visible di dashboard
  QA scenarios: happy = RLS enabled, all queries still work; failure = query returns 401/403 → rollback policy
  Evidence: .omo/evidence/task-1-bug-fixes.txt

- [ ] 2. **supabase-anon-key: Pindahin Supabase server operations ke service role**
  What to do / Must NOT do: Buat `src/lib/supabase-server.ts` yang pake `SERVICE_ROLE_KEY` (env variable baru tanpa NEXT_PUBLIC_). Update `src/lib/data.ts`, `src/lib/auth.ts`, dan semua API route yang server-side untuk import dari supabase-server.ts. `src/lib/supabase.ts` (anon key) tetap dipake untuk client-side. JANGAN hapus supabase.ts.
  Parallelization: Wave 1 | Blocked by: - | Blocks: -
  References: src/lib/supabase.ts, src/lib/data.ts, src/lib/auth.ts
  Acceptance criteria: `build` success, semua API routes masih return 200
  QA scenarios: happy = build passes, API routes work; failure = service role missing → error handling
  Evidence: .omo/evidence/task-2-bug-fixes.txt

- [ ] 3. **timezone-dashboard: Fix kalkulasi timezone pake date-fns-tz**
  What to do / Must NOT do: Install `date-fns-tz`. Di `src/app/(admin)/admin/page.tsx`, ganti manual timezone logic (lines 24-31) pake `toDate()` dan `format()` dari date-fns-tz dengan timeZone "Asia/Jakarta". Also fix `src/app/(admin)/admin/pendapatan/page.tsx:52-53` dengan method yang sama. JANGAN ubah logic filtering di tempat lain.
  Parallelization: Wave 2 | Blocked by: - | Blocks: -
  References: admin/page.tsx:24-31, pendapatan/page.tsx:52-53
  Acceptance criteria: startDate = today 00:00 WIB, endDate = tomorrow 00:00 WIB dalam ISO string
  QA scenarios: happy = filter dates correct in WIB; failure = wrong timezone → build masih pass
  Evidence: .omo/evidence/task-3-bug-fixes.txt

- [ ] 4. **drive-client-name: Fix client name undefined di drive route**
  What to do / Must NOT do: Di `src/app/api/submissions/[id]/drive/route.ts:53-54`, ganti `submission.client?.name` jadi `(submission.client as any)?.[0]?.name || submission.client?.name || ""`. Sama untuk `clientPhone`. JANGAN ubah query select-nya.
  Parallelization: Wave 2 | Blocked by: - | Blocks: -
  References: drive/route.ts:23,53-54
  Acceptance criteria: response JSON mengandung `clientName` yang bukan undefined
  QA scenarios: happy = client name/phone ada di response; failure = fallback ke string kosong
  Evidence: .omo/evidence/task-4-bug-fixes.txt

- [ ] 5. **widget-hasil-logic: Fix widget "Hasil Blm Dikirim" logic terbalik**
  What to do / Must NOT do: Di `src/app/(admin)/admin/page.tsx:58`, ganti filter dari `.eq("status", "DELIVERED").not("googleDriveLink", "is", null)` jadi `.eq("status", "EDITING").is("googleDriveLink", null)`. JANGAN ubah widget lain.
  Parallelization: Wave 2 | Blocked by: - | Blocks: -
  References: admin/page.tsx:58
  Acceptance criteria: Widget nampilin jumlah submission status EDITING yg belum punya googleDriveLink
  QA scenarios: happy = count sesuai status EDITING + null drive; failure = count 0 wajar
  Evidence: .omo/evidence/task-5-bug-fixes.txt

- [ ] 6. **payment-validation: Tambah validasi amount payment di backend**
  What to do / Must NOT do: Di `src/app/api/payments/[id]/verify/route.ts`, setelah dapet `payment` dan `submission`, tambah validasi: (a) kalo DP, amount harus === invoice.dpAmount; (b) kalo PELUNASAN, amount harus === invoice.remainingAmount; (c) total payments udah ada harus <= grandTotal. Return 400 kalo gak sesuai. Also di `src/lib/data.ts:291-320` (verifyPayment), tambah check `payment.invoice.submissionId` jangan sampe double verify.
  Parallelization: Wave 2 | Blocked by: - | Blocks: 7
  References: verify/route.ts:53-58, data.ts:291-320, invoice/page.tsx:72-93
  Acceptance criteria: Payment dengan nominal salah return error 400
  QA scenarios: happy = DP amount sesuai → verified; failure = DP amount beda → 400 error
  Evidence: .omo/evidence/task-6-bug-fixes.txt

- [ ] 7. **status-final-check: Cegah verify payment kalo status udah PAID/COMPLETED**
  What to do / Must NOT do: Di `src/app/api/payments/[id]/verify/route.ts`, sebelum line 53, tambah check: `if (["PAID", "COMPLETED", "DELIVERED"].includes(submission.status)) { return 400 "Pengajuan sudah selesai/lunas" }`. JANGAN ubah flow verify yang existing.
  Parallelization: Wave 2 | Blocked by: 6 | Blocks: -
  References: verify/route.ts:53-58
  Acceptance criteria: Verify payment di submission yg udah PAID return 400
  QA scenarios: happy = status PAID → 400; failure = status WAITING_DP → normal flow
  Evidence: .omo/evidence/task-7-bug-fixes.txt

- [ ] 8. **race-condition-id: Ganti sequential numbering ke timestamp-based**
  What to do / Must NOT do: Di `src/lib/data.ts:152-157`, ganti `const { count } ... const invNumber = ...` jadi pake `INV${year}${month}${day}${random4digit}` (contoh: `const invNumber = "INV" + year + String(Math.floor(Math.random()*9000+1000)`). Sama untuk `submissions/route.ts:86-101` — clientNumber pake timestamp-based: `CLI-${Date.now().toString(36).toUpperCase()}`. JANGAN ubah format untuk existing data.
  Parallelization: Wave 3 | Blocked by: - | Blocks: -
  References: data.ts:152-157, submissions/route.ts:86-101
  Acceptance criteria: Dua request concurrent dapet nomor beda
  QA scenarios: happy = unique setiap call; failure = duplicate → constraint unique di DB nangkep
  Evidence: .omo/evidence/task-8-bug-fixes.txt

- [ ] 9. **duplicate-reminder: Cegah duplicate reminder SESSION**
  What to do / Must NOT do: Di `src/app/api/payments/[id]/verify/route.ts:84-92`, sebelum insert reminder, tambah query cek: `supabase.from("reminders").select("id").eq("submissionId", id).eq("type", "SESSION").maybeSingle()`. Kalo udah ada, skip insert. JANGAN hapus reminder existing.
  Parallelization: Wave 3 | Blocked by: - | Blocks: -
  References: verify/route.ts:84-92
  Acceptance criteria: Verify DP 2x untuk submission yg sama → reminder tetap 1
  QA scenarios: happy = 1 reminder per submission; failure = 2 reminders → cek DB
  Evidence: .omo/evidence/task-9-bug-fixes.txt

- [ ] 10. **addon-pricesnapshot: Pake priceSnapshot di detail pengajuan**
  What to do / Must NOT do: Di `src/app/(admin)/admin/pengajuan/[id]/page.tsx:130-132`, ganti `s.addOn?.price` jadi `s.priceSnapshot || s.addOn?.price || 0`. Di line 191, ganti `s.addOn?.price` jadi `s.priceSnapshot || s.addOn?.price || 0`. JANGAN ubah di tempat lain — invoice udah pake priceSnapshot.
  Parallelization: Wave 3 | Blocked by: - | Blocks: -
  References: pengajuan/[id]/page.tsx:130-132, 189-193
  Acceptance criteria: Detail pengajuan nampilin harga snapshot, bukan current price
  QA scenarios: happy = priceSnapshot dipake; failure = fallback ke addOn.price
  Evidence: .omo/evidence/task-10-bug-fixes.txt

- [ ] 11. **dead-code: Hapus file google.ts, prisma.ts, update seed**
  What to do / Must NOT do: Hapus `src/lib/google.ts` (22 lines) dan `src/lib/prisma.ts` (15 lines). Update `prisma/seed.ts` — ganti `new PrismaClient()` jadi import dari Supabase SDK (pake supabase client). JANGAN hapus prisma sebagai devDependency — masih dipake buat `prisma generate`.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: lib/google.ts, lib/prisma.ts, prisma/seed.ts
  Acceptance criteria: `build` success tanpa error missing module
  QA scenarios: happy = build pass; failure = import error → rollback
  Evidence: .omo/evidence/task-11-bug-fixes.txt

- [ ] 12. **revenue-boundary: Fix revenue date boundary pake UTC proper**
  What to do / Must NOT do: Di `src/app/(admin)/admin/pendapatan/page.tsx:52-53`, ganti jadi `startDate = new Date(Date.UTC(year, month, 1))` dan `endDate = new Date(Date.UTC(year, month + 1, 1))`. Di `src/app/api/payments/revenue/route.ts:18`, ganti `.lte("createdAt", end)` jadi `.lt("verifiedAt", end)`. Also ganti filter `createdAt` → `verifiedAt` (line 17-18) dan tambah `.not("verifiedAt", "is", null)`. JANGAN ubah response format.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: pendapatan/page.tsx:52-53, revenue/route.ts:15-19
  Acceptance criteria: Revenue query ambil data yang diverifikasi dalam range bulan
  QA scenarios: happy = verified payments in month; failure = unverified payments excluded
  Evidence: .omo/evidence/task-12-bug-fixes.txt

- [ ] 13. **invoice-patch-sanitize: Tambah whitelist field di invoice PATCH**
  What to do / Must NOT do: Di `src/app/api/invoices/[id]/route.ts:41`, sebelum `update(body)`, filter body: `const allowed = ["subtotal","addonTotal","grandTotal","dpAmount","remainingAmount"]; const sanitized = Object.fromEntries(allowed.filter(k => k in body).map(k => [k, body[k]]))`. Update pake `sanitized` bukan `body`. JANGAN ubah flow PATCH yang lain.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: invoices/[id]/route.ts:35-43
  Acceptance criteria: Field di luar whitelist diabaikan (tidak diupdate)
  QA scenarios: happy = valid field ke-update; failure = invalid field diabaikan
  Evidence: .omo/evidence/task-13-bug-fixes.txt

- [ ] 14. **agreedterms-hack: Fix type coercion di form default**
  What to do / Must NOT do: Di `src/app/ajukan-sesi/content.tsx:47`, ganti `true as unknown as true` jadi `true`. Kalo masih error type, bikin properti terpisah: `agreedTerms: true as const`. JANGAN ubah schema submission.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: ajukan-sesi/content.tsx:44-48
  Acceptance criteria: Form submit tanpa error type
  QA scenarios: happy = form submit OK; failure = type error → fallback ke `as const`
  Evidence: .omo/evidence/task-14-bug-fixes.txt

- [ ] 15. **calendar-overflow: Fix endTime overflow jam di Google Calendar**
  What to do / Must NOT do: Di `src/lib/google-calendar.ts:51`, ganti logic endHour. Tambah deteksi: kalo `parseInt(hours) + 2 >= 24`, pake next day untuk endDate. JANGAN ubah format parameter fungsi.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: google-calendar.ts:49-52
  Acceptance criteria: Event jam 23:00 punya endDate next day jam 01:00
  QA scenarios: happy = overflow handle correctly; failure = fallback ke existing logic
  Evidence: .omo/evidence/task-15-bug-fixes.txt

- [ ] 16. **timeline-labels: Tambah missing DP_PAID dan PAID labels**
  What to do / Must NOT do: Di `src/lib/data.ts:92-101`, tambah entry: `DP_PAID: "DP Diterima"` dan `PAID: "Pembayaran Lunas"`. JANGAN hapus atau rename entry existing.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: data.ts:92-101
  Acceptance criteria: Timeline activity untuk DP_PAID nampilin "DP Diterima"
  QA scenarios: happy = label muncul; failure = fallback ke "Status: DP_PAID"
  Evidence: .omo/evidence/task-16-bug-fixes.txt

- [ ] 17. **format-rupiah: Extract formatRupiah ke shared utility**
  What to do / Must NOT do: Di `src/lib/utils.ts`, export function `formatRupiah`. Hapus 4 fungsi duplikat di: `admin/page.tsx:13-15`, `admin/invoice/page.tsx:42-46`, `admin/pendapatan/page.tsx:22-26`, `admin/pengajuan/[id]/page.tsx:34-38`. Di 4 file itu, panggil `import { formatRupiah } from "@/lib/utils"`. JANGAN ubah import lain di file tsb.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: admin/page.tsx:13-15, invoice/page.tsx:42-46, pendapatan/page.tsx:22-26, pengajuan/[id]/page.tsx:34-38, lib/utils.ts
  Acceptance criteria: `import { formatRupiah } from "@/lib/utils"` works, 4 files panggil dari 1 tempat
  QA scenarios: happy = formatRupiah works di semua halaman; failure = missing export → build error
  Evidence: .omo/evidence/task-17-bug-fixes.txt

- [ ] 18. **reschedule-label: Fix UX inconsistent RESCHEDULE label**
  What to do / Must NOT do: Di `src/app/(admin)/admin/pengajuan/[id]/page.tsx:40-49`, tambah entry `WAITING_DP` dengan label berbeda untuk konteks reschedule (kalo status saat ini RESCHEDULE). Simplenya: pake `STATUS_ACTIONS` yang udah ada, gak perlu tambah logic rumit. JANGAN ubah NEXT_ALLOWED_STATUSES.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: pengajuan/[id]/page.tsx:40-49, submission.constant.ts:33-45
  Acceptance criteria: Label tombol sesuai konteks status saat ini
  QA scenarios: happy = label clear; failure = fallback ke "Ubah ke {status}"
  Evidence: .omo/evidence/task-18-bug-fixes.txt

- [ ] 19. **reminder-status-valid: Tambah validasi status di listReminders**
  What to do / Must NOT do: Di `src/app/api/reminders/route.ts:12`, tambah validasi: kalo status bukan `"COMPLETED"`, pake `"PENDING"`. JANGAN ubah fungsi listReminders di data.ts.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: reminders/route.ts:10-13
  Acceptance criteria: Parameter status tidak valid fallback ke "PENDING"
  QA scenarios: happy = "INVALID" → "PENDING"; failure = error handling
  Evidence: .omo/evidence/task-19-bug-fixes.txt

- [ ] 20. **auth-redundant: Remove redundant auth check di admin pages**
  What to do / Must NOT do: Di `src/app/(admin)/admin/page.tsx:21` (dashboard), hapus `if (!session?.user) redirect(...)` karena udah di handle layout. Tapi jaga-jaga: instead of remove, tambahin aja komentar atau biarin — redundant tapi harmless. Skip this todo, not worth the effort. Mark as CANCELLED.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: layout.tsx:12-14, admin/page.tsx:20-21
  Acceptance criteria: - (CANCELLED)
  QA scenarios: - (CANCELLED)
  Evidence: .omo/evidence/task-20-bug-fixes.txt

- [ ] 21. **year-usestate: Fix useState year biar bisa ganti tahun**
  What to do / Must NOT do: Di `src/app/(admin)/admin/pendapatan/page.tsx:50`, ganti `const [year] = useState(...)` jadi `const year = useMemo(() => new Date().getFullYear(), [])` atau pake `const year = new Date().getFullYear()` di dalam komponen. JANGAN ubah state management yang lain.
  Parallelization: Wave 4 | Blocked by: - | Blocks: -
  References: pendapatan/page.tsx:49-50
  Acceptance criteria: year selalu reflect current year
  QA scenarios: happy = year correct; failure = year stale → minor cosmetic
  Evidence: .omo/evidence/task-21-bug-fixes.txt

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. `pnpm build` success — no TypeScript/compilation errors
- [ ] F2. `lsp_diagnostics` clean on all changed files
- [ ] F3. Review each fix — logic sesuai dengan yang direncanakan
- [ ] F4. Pastikan RLS aktif di Supabase dashboard

## Commit strategy
- Wave 1: `fix(security): enable RLS and migrate to service role key`
- Wave 2: `fix(dashboard): correct timezone, drive name, widget logic, payment validation`
- Wave 3: `fix(data): prevent race conditions, duplicate reminders, use priceSnapshot`
- Wave 4: `chore: cleanup dead code, extract shared utils, fix minor bugs`

## Success criteria
- [ ] `pnpm build` exit code 0
- [ ] Semua 22 bugs teraddres (kecuali #20 CANCELLED)
- [ ] RLS aktif di semua tabel Supabase
- [ ] Payment amount tervalidasi di backend
- [ ] Dashboard nampilin data yang benar sesuai zona waktu WIB
- [ ] Client name/phone muncul di response drive route
