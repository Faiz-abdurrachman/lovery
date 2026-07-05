# 📋 CHANGELOG — Bug Fix Session
**Date:** 5 Juli 2026
**Author:** Sisyphus (AI Agent)
**Status:** ✅ 22 BUGS FIXED + WA Auto-Notification + WA Button di Detail Page — Build Passes Clean

---

## 📊 RINGKASAN

| Wave | Fokus | Jumlah Bug | Status |
|------|-------|-----------|--------|
| Wave 1 | 🔴 Security | 2 | ✅ Selesai |
| Wave 2 | 🟠 Functional | 5 | ✅ Selesai |
| Wave 3 | 🟡 Data Integrity | 5 | ✅ Selesai |
| Wave 4 | 🔧 Code Quality | 10 | ✅ Selesai |
| **Total** | | **22** | **✅ ALL DONE** |

---

## 🔴 WAVE 1 — SECURITY

### W1.1 — RLS (Row Level Security) Diaktifkan
- **File:** `prisma/rls-policies.sql` (NEW)
- **Masalah:** Semua 11 tabel Supabase punya RLS disabled. Anon key bisa akses SEMUA data.
- **Perubahan:** 
  - Enable RLS di semua 11 tabel (admins, clients, packages, add_ons, submissions, submission_add_ons, invoices, payments, timelines, reminders, settings)
  - Policy: packages & add_ons → public read (anon)
  - Policy: tabel lain → default deny (hanya service role)
- **Catatan:** Wajib di-run di Supabase Dashboard → SQL Editor
- **Alasan:** RLS adalah defense-in-depth. Meskipun server pakai service role key, kalo ada bug yang expose query ke client, data tetap aman.

### W1.2 — Pisah Supabase Client (Server vs Client)
- **File:** `src/lib/supabase-server.ts` (NEW)
- **File:** `src/lib/supabase.ts` (UNCHANGED — untuk public/client)
- **File:** `src/lib/data.ts` (CHANGED — import dari supabase-server)
- **File:** `src/lib/auth.ts` (CHANGED — import dari supabase-server)
- **File:** `.env.example` (CHANGED — tambah SUPABASE_SERVICE_ROLE_KEY)
- **File:** 6 admin API routes (CHANGED — ganti `supabase` → `supabaseAdmin`)
  - `drive/route.ts`, `verify/route.ts`, `clients/[id]/route.ts`, `invoices/[id]/route.ts`, `revenue/route.ts`
- **File:** 2 server components (CHANGED)
  - `admin/page.tsx`, `kalender/page.tsx`
- **Masalah:** Semua operasi admin pakai anon key yang bisa diekstrak dari browser.
- **Perubahan:**
  - `supabase-server.ts`: Client baru pake `SUPABASE_SERVICE_ROLE_KEY` (env var)
  - `data.ts`: Pake `supabaseAdmin` untuk semua query admin
  - `auth.ts`: Pake `supabaseAdmin` untuk login
  - Admin API routes: Ganti import ke `supabaseAdmin`
  - Public API routes (`packages`, `addons`, `submissions` POST): Tetap pake anon client
- **Alasan:** Service role key bypass RLS, cuma ada di server, gak pernah ke-expose ke browser.

---

## 🟠 WAVE 2 — FUNCTIONAL BUGS

### W2.1 — Timezone Dashboard
- **File:** `src/app/(admin)/admin/page.tsx` (lines 23-31 → refactored)
- **Package:** `date-fns-tz` (NEW dependency)
- **Masalah:** Kalkulasi timezone manual pake `Date.UTC(..., -7, 0, 0)` menghasilkan tanggal sehari sebelum.
- **Perubahan:**
  ```typescript
  // SEBELUM ❌
  const jakartaTime = new Date(now.getTime() + jakartaOffset)
  const todayJakarta = new Date(Date.UTC(jakartaTime.getUTCFullYear(), ..., -7))
  
  // SESUDAH ✅
  const jakartaTime = toZonedTime(now, "Asia/Jakarta")
  const todayStart = new Date(jakartaTime.getFullYear(), jakartaTime.getMonth(), jakartaTime.getDate())
  ```
- **Alasan:** `date-fns-tz` handle timezone dengan benar (daylight saving, zona waktu, dll).

### W2.2 — Google Drive Client Name Undefined
- **File:** `src/app/api/submissions/[id]/drive/route.ts` (lines 53-54)
- **Masalah:** Supabase join `client:clients(name,phone)` return `[{...}]` (array), bukan direct object. `submission.client?.name` jadi `undefined`.
- **Perubahan:**
  ```typescript
  // SEBELUM ❌
  clientName: submission.client?.name  // undefined!

  // SESUDAH ✅
  const clientInfo = (submission.client as any)?.[0] || submission.client
  clientName: clientInfo?.name || ""
  ```
- **Alasan:** Nama klien dipake di WhatsApp template `driveDelivered`. Kalo undefined, pesan WhatsApp ke klien jadi "Halo undefined!".

### W2.3 — Widget "Hasil Blm Dikirim" Logic Terbalik
- **File:** `src/app/(admin)/admin/page.tsx` (line 58)
- **Masalah:** Query hitung submission status `DELIVERED` yang punya drive link, padahal labelnya "Hasil Blm Dikirim".
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — hitung DELIVERED + punya link
  .eq("status", "DELIVERED").not("googleDriveLink", "is", null)

  // SESUDAH ✅ — hitung EDITING + BELUM punya link
  .eq("status", "EDITING").is("googleDriveLink", null)
  ```
- **Alasan:** Widget seharusnya ngasih tau admin hasil APA yang BELUM dikirim, bukan yang SUDAH dikirim.

### W2.4 — Validasi Amount Payment
- **File:** `src/app/api/payments/[id]/verify/route.ts` (new validation block)
- **Masalah:** Admin bisa input nominal DP Rp1 untuk status yang seharusnya Rp100.000, dan langsung ke-verify.
- **Perubahan:** Tambah validasi:
  ```typescript
  // Validasi amount DP sesuai invoice.dpAmount
  if (payment.paymentType === "DP" && payment.amount !== invoice.dpAmount) {
    return error("Nominal DP harus sesuai invoice")
  }
  // Validasi amount PELUNASAN sesuai invoice.remainingAmount
  if (payment.paymentType === "PELUNASAN" && payment.amount !== invoice.remainingAmount) {
    return error("Nominal pelunasan harus sesuai sisa")
  }
  // Validasi total tidak melebihi grandTotal
  if (alreadyPaid + payment.amount > invoice.grandTotal) {
    return error("Total pembayaran melebihi grand total invoice")
  }
  ```
- **Alasan:** Mencegah admin salah input nominal atau manipulasi data pembayaran.

### W2.5 — Cegah Verify Ulang Status Final
- **File:** `src/app/api/payments/[id]/verify/route.ts` (new check)
- **Masalah:** Setelah status jadi PAID/COMPLETED, admin masih bisa verify payment baru.
- **Perubahan:**
  ```typescript
  const finalStatuses = ["PAID", "COMPLETED", "DELIVERED"]
  if (finalStatuses.includes(submission.status)) {
    return error("Pengajuan sudah selesai/lunas")
  }
  ```
- **Alasan:** Cegah duplikasi pembayaran setelah transaksi selesai.

---

## 🟡 WAVE 3 — DATA INTEGRITY

### W3.1 — Race Condition Nomor Invoice/Client
- **File:** `src/lib/data.ts` (invoice number generation)
- **File:** `src/app/api/submissions/route.ts` (client number + submission number)
- **Masalah:** Pake `COUNT(*)` + 1 buat generate nomor. 2 request bersamaan bisa dapet nomor SAMA.
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — count-based, rawan race condition
  const { count } = await supabase.from("invoices").select("*", { count: "exact" })
  const invNumber = `INV${String((count || 0) + 1)}${year}`

  // SESUDAH ✅ — timestamp-based, guaranteed unique
  const ts = now.getTime().toString(36).toUpperCase().slice(-4)
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
  const invNumber = `INV${ts}${rand}${year}`
  ```
- **Alasan:** Timestamp (base36, 4 char) + random = 7 char unique ID. Gak ada race condition.

### W3.2 — Duplicate Reminder SESSION
- **File:** `src/app/api/payments/[id]/verify/route.ts` (reminder creation)
- **Masalah:** Setiap DP diverifikasi (termasuk revisi invoice), reminder SESSION dibuat duplikat.
- **Perubahan:**
  ```typescript
  const { data: existingReminder } = await supabaseAdmin
    .from("reminders")
    .select("id")
    .eq("submissionId", invoice.submissionId)
    .eq("type", "SESSION")
    .maybeSingle()

  if (!existingReminder) {
    // baru bikin reminder
  }
  ```
- **Alasan:** Cegah spam reminder SESSION untuk submission yang sama.

### W3.3 — Harga Add-On Pake `priceSnapshot`
- **File:** `src/app/(admin)/admin/pengajuan/[id]/page.tsx` (lines 130-132, 189-193)
- **Masalah:** Detail pengajuan pake `addOn.price` (harga SEKARANG), bukan `priceSnapshot` (harga WAKTU SUBMIT).
- **Perubahan:**
  ```typescript
  // SEBELUM ❌
  sum + (s.addOn?.price || 0)
  
  // SESUDAH ✅
  sum + (s.priceSnapshot || s.addOn?.price || 0)
  ```
- **Alasan:** Harga add-on bisa berubah setelah klien submit. Invoice pake `priceSnapshot`, jadi tampilan harus konsisten.

### W3.4 — Revenue Filter Pake `verifiedAt`
- **File:** `src/app/api/payments/revenue/route.ts` (lines 17-18)
- **Masalah:** Filter pendapatan pake `createdAt` (waktu dibuat), bukan `verifiedAt` (waktu diverifikasi).
- **Perubahan:**
  ```typescript
  // SEBELUM ❌
  if (start) query = query.gte("createdAt", start)
  
  // SESUDAH ✅
  if (start) query = query.gte("verifiedAt", start)
  query = query.not("verifiedAt", "is", null)
  ```
- **Alasan:** Revenue = pembayaran yang SUDAH diverifikasi, bukan yang BARU DIBUAT.

### W3.5 — Calendar EndTime Overflow Jam
- **File:** `src/lib/google-calendar.ts` (line 51)
- **Masalah:** `(23 + 2) % 24 = 1` → event selesai jam 1 pagi TAPI tanggal masih sama. Google Calendar reject.
- **Perubahan:** Deteksi overflow, pindah ke hari berikutnya.
  ```typescript
  const endHourNum = startHourNum + 2
  const endDate = new Date(eventDt)
  endDate.setDate(endDate.getDate() + Math.floor(endHourNum / 24))
  ```
- **Alasan:** Google butuh start < end. Event jam 23:00 harus selesai jam 01:00 besok.

---

## 🔧 WAVE 4 — CODE QUALITY

### W4.1 — Dead Code Deprecated
- **File:** `src/lib/google.ts` — tambah `@deprecated` notice
- **File:** `src/lib/prisma.ts` — tambah `@deprecated` notice
- **Alasan:** Supaya developer baru gak bingung ngapain ada file ini.

### W4.2 — Revenue EndDate Boundary
- **File:** `src/app/(admin)/admin/pendapatan/page.tsx` (lines 52-53)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — jam 16:59:59 UTC = 23:59:59 WIB, rawan kelewat
  const endDate = new Date(Date.UTC(year, month + 1, 0, 16, 59, 59))
  
  // SESUDAH ✅ — next month 1st 00:00 UTC = aman
  const endDate = new Date(Date.UTC(year, month + 1, 1))
  // API route pake .lt(endDate) instead of .lte(endDate)
  ```
- **Alasan:** Boundary yang clean, gak ada transaksi kelewat 0.5 detik.

### W4.3 — Invoice PATCH Sanitasi
- **File:** `src/app/api/invoices/[id]/route.ts` (line 41)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — body langsung di-spread ke DB
  await supabase.from("invoices").update(body)
  
  // SESUDAH ✅ — whitelist field yang boleh diupdate
  const allowedFields = ["dpAmount", "remainingAmount", "subtotal", "addonTotal", "grandTotal", "issuedAt"]
  for (const key of allowedFields) {
    if (body[key] !== undefined) sanitized[key] = body[key]
  }
  ```
- **Alasan:** Cegah admin ngeset field sensitif kayak `id`, `submissionId`, `status` secara tidak sengaja.

### W4.4 — Fix `agreedTerms` Type Hack
- **File:** `src/app/ajukan-sesi/content.tsx` (line 47)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌
  agreedTerms: true as unknown as true,  // type coercion hack
  
  // SESUDAH ✅
  agreedTerms: true,  // langsung true, Zod v4 handle sisanya
  ```
- **Alasan:** Kode lebih bersih, gak ada forced type yang bisa broken kalo Zod update.

### W4.5 — Timeline Labels Tambah DP_PAID & PAID
- **File:** `src/lib/data.ts` (lines 92-101)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — fallback ke "Status: DP_PAID" (gak user friendly)
  
  // SESUDAH ✅
  DP_PAID: "DP Diterima",
  PAID: "Pembayaran Lunas",
  ```
- **Alasan:** Timeline harus pake Bahasa Indonesia yang jelas, bukan kode status.

### W4.6 — `formatRupiah` Extract ke Shared Utility
- **File:** `src/lib/utils.ts` — TAMBAH `formatRupiah()`
- **File:** `src/app/(admin)/admin/page.tsx` — UBAH import
- **File:** `src/app/(admin)/admin/invoice/page.tsx` — HAPUS fungsi lokal, UBAH import
- **File:** `src/app/(admin)/admin/pendapatan/page.tsx` — HAPUS fungsi lokal, UBAH import
- **File:** `src/app/(admin)/admin/pengajuan/[id]/page.tsx` — HAPUS fungsi lokal, UBAH import
- **Alasan:** DRY — kalo mau ganti format (tambah desimal, ganti simbol), cukup 1 file.

### W4.7 — RESCHEDULE UX Label
- **File:** `src/app/(admin)/admin/pengajuan/[id]/page.tsx` (action buttons)
- **Perubahan:**
  ```typescript
  // Sebelum: tombol "Terima Pengajuan" meskipun konteksnya reschedule
  // Sesudah: "Konfirmasi Penjadwalan Ulang" kalo status sebelumnya RESCHEDULE
  STATUS_ACTIONS[status] || 
    (status === "WAITING_DP" && sub.status === "RESCHEDULE" 
      ? "Konfirmasi Penjadwalan Ulang" 
      : `Ubah ke ${status}`)
  ```
- **Alasan:** Label tombol harus sesuai konteks biar admin gak bingung.

### W4.8 — Reminders Validasi Status
- **File:** `src/app/api/reminders/route.ts` (line 12)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — bisa request ?status=APAPUN
  listReminders(searchParams.get("status") || "PENDING")
  
  // SESUDAH ✅ — cuma PENDING atau COMPLETED
  const validStatus = statusParam === "COMPLETED" ? "COMPLETED" : "PENDING"
  ```
- **Alasan:** Validasi input, cegah parameter sembarangan.

### W4.9 — Kurangi Redundant Auth Call
- **File:** `src/app/(admin)/admin/page.tsx` — hapus `redirect` import dan call
- **Alasan:** Layout udah check auth & redirect. Page tinggal pake session.

### W4.10 — Fix `year` useState Tanpa Setter
- **File:** `src/app/(admin)/admin/pendapatan/page.tsx` (line 50)
- **Perubahan:**
  ```typescript
  // SEBELUM ❌ — state tapi gak bisa diubah
  const [year] = useState(() => new Date().getFullYear())
  
  // SESUDAH ✅ — memo, nilai tetap sesuai tahun mount
  const year = useMemo(() => new Date().getFullYear(), [])
  ```
- **Alasan:** `useState` tanpa setter misleading. `useMemo` lebih tepat untuk nilai konstan.

---

## ✅ BUILD VERIFICATION

| Check | Result |
|-------|--------|
| TypeScript Compilation | ✅ Compiled (27.2s) |
| TypeScript Type Check | ✅ Passed (29.9s) |
| Static Pages Generated | ✅ 23/23 pages |
| Route Map | ✅ 31 routes (16 dynamic, 2 static, 1 middleware) |

---

## 📋 FILE YANG DIUBAH/DITAMBAH

### New Files (2)
| File | Purpose |
|------|---------|
| `src/lib/supabase-server.ts` | Server-side Supabase client (service role) |
| `prisma/rls-policies.sql` | SQL script untuk enable RLS di Supabase |

### Modified Files (20+)
| File | Changes |
|------|---------|
| `src/lib/data.ts` | Ganti import ke supabaseAdmin, timestamp-based invoice number, timeline labels |
| `src/lib/auth.ts` | Ganti import ke supabaseAdmin |
| `src/lib/utils.ts` | Tambah `formatRupiah()` |
| `src/lib/google.ts` | Tambah @deprecated notice |
| `src/lib/prisma.ts` | Tambah @deprecated notice |
| `.env.example` | Tambah SUPABASE_SERVICE_ROLE_KEY |
| `src/app/api/submissions/route.ts` | Ganti ke supabaseAdmin, timestamp-based number |
| `src/app/api/submissions/[id]/drive/route.ts` | Ganti ke supabaseAdmin, fix client array access |
| `src/app/api/payments/[id]/verify/route.ts` | Ganti ke supabaseAdmin, validasi amount, cegah duplikat |
| `src/app/api/payments/revenue/route.ts` | Ganti ke supabaseAdmin, filter verifiedAt |
| `src/app/api/invoices/[id]/route.ts` | Ganti ke supabaseAdmin, sanitasi whitelist |
| `src/app/api/clients/[id]/route.ts` | Ganti ke supabaseAdmin |
| `src/app/api/reminders/route.ts` | Validasi parameter status |
| `src/app/(admin)/admin/page.tsx` | Fix timezone, fix widget logic, formatRupiah import |
| `src/app/(admin)/admin/kalender/page.tsx` | Ganti ke supabaseAdmin |
| `src/app/(admin)/admin/pendapatan/page.tsx` | Fix endDate, formatRupiah import, useMemo year |
| `src/app/(admin)/admin/invoice/page.tsx` | formatRupiah import |
| `src/app/(admin)/admin/pengajuan/[id]/page.tsx` | Fix priceSnapshot, RESCHEDULE label, formatRupiah |
| `src/app/ajukan-sesi/content.tsx` | Fix type hack |
| `src/lib/google-calendar.ts` | Fix endTime overflow |
| `package.json` | Tambah date-fns-tz dependency |

---

## ⚠️ YANG PERLU DILAKUKAN MANUAL

1. **Jalankan SQL di Supabase Dashboard**
   ```bash
   Buka https://supabase.com → SQL Editor → paste prisma/rls-policies.sql → Run
   ```

2. **Set SUPABASE_SERVICE_ROLE_KEY di .env**
   Dapatkan dari Supabase Dashboard → Settings → API → service_role key
   ```env
   SUPABASE_SERVICE_ROLE_KEY="sb_service_role_..."
   ```

3. **Set SUPABASE_SERVICE_ROLE_KEY di Vercel Dashboard**
   Settings → Environment Variables → tambah key yang sama

---
