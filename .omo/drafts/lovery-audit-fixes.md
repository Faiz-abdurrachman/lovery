# lovery-audit-fixes — Planning Draft

- **intent:** clear
- **review_required:** false
- **status:** approved — writing plan
- **pending action:** none (approved; generating plan file)
- **rate-limiting decision:** DEFER to Vercel WAF (no Upstash). H7/H8 OUT of this plan.

## User decisions (recorded)
1. Scope = Critical + High + Medium (exclude LOW/cosmetic refactor).
2. C1 (RLS + service_role key) = SEPARATE plan, not now.
3. H3 invoice format = follow doc DEC-012 → `INV00012026` (4-digit year).
4. Test strategy = manual QA via API/DB (no new test framework).

## Verified facts (read directly, not agent claims)
- Tables WITH `updatedAt` (NOT NULL, @updatedAt): Admin, Client, Package, AddOn, Submission, Invoice, Settings.
- Tables WITHOUT `updatedAt`: Payment, Timeline, Reminder, SubmissionAddOn.
- `reminders.id` = NOT NULL, no DB default (Prisma cuid). INSERT at `verify/route.ts:87` omits `id` → PRODUCTION CRASH. (C3 confirmed)
- All timeline/payment INSERTs already include `id`; timelines/payments have no `updatedAt` column → prior "missing updatedAt" findings on those are FALSE POSITIVES. (H1/H2 dropped)
- Status transitions ARE validated in `/api/submissions/[id]/status/route.ts:30-33` via `NEXT_ALLOWED_STATUSES`. data.ts need not re-validate.
- `submission.client` is a to-one embed → Supabase returns OBJECT. `verify/route.ts:68-70,90` access it as array `[0]` → Google Calendar events created with EMPTY client name/phone/package. (NEW HIGH functional bug)
- `editInvoiceSchema`, `settingsSchema`, `verifyPaymentSchema` all EXIST but are unused by the API routes (C2 fix uses them).
- Invoice format: `data.ts:152` uses `getFullYear().toString().slice(-2)` → 2-digit year. Fix = 4-digit.

## Scope ledger (post-verification)
IN — CRITICAL: C2 (mass-assign invoice/settings PATCH), C3 (reminders id), C4 (verifyPayment error handling).
IN — HIGH: H3 (invoice format), H5 (client update error handling), H6 (deactivate invoice error handling), H-CAL (verify route to-one embed → empty calendar data).
IN — MEDIUM: M1 (ID race → retry-on-conflict), M2 (.or() filter injection), M4 (drive URL validation), M5 (payment POST Zod+enum), M6 (pagination cap submissions/list), M7 (adminNote max length), M-STALE (updatedAt not refreshed on UPDATE writes).
OUT — C1 (separate plan), H1/H2 (false positive), M3 (drive route already guarded), M8 (role RBAC = documented accepted limitation), all LOW.

DECISION SURFACED AT GATE: rate-limiting (H7 track enumeration, H8 submission spam) needs external store (Upstash) on Vercel serverless → owner-decision. Recommended default: defer to Vercel WAF (matches README) + rely on input hardening now; do NOT add Upstash dep in this plan.

## Components (topology lock)
- CMP1: DB write integrity (crash + error handling) — C3, C4, H5, H6
- CMP2: Input validation / mass-assignment — C2, M4, M5, M7
- CMP3: Correctness bugs — H3, H-CAL, M1, M2, M6, M-STALE

## Test strategy
Manual agent-executed QA via real API calls (dev server pnpm dev -p 3001) + Supabase row inspection (project pimdpquknsfhtlebndnv). pnpm build + lint must stay clean. No new test framework.
