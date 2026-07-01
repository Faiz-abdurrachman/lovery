# 📸 Lovery Studio Management System

**Sistem operasional studio fotografi berbasis web.**

Lovery bukan marketplace atau aplikasi booking. Lovery adalah **Digital Operating System** yang membantu admin mengelola seluruh proses administrasi studio dalam satu dashboard — dari pengajuan sesi oleh klien hingga penyerahan hasil via Google Drive. WhatsApp tetap menjadi media komunikasi utama.

---

## ✨ Fitur

### Website Klien
- Landing page profesional dengan portfolio, paket, FAQ
- Form pengajuan sesi 5-step — pilih paket, add-on (harga realtime), isi data, konfirmasi
- Halaman status pengajuan — lacak dengan nomor pengajuan + WhatsApp
- Semua konten dalam Bahasa Indonesia

### Dashboard Admin
- **Dashboard** — tugas hari ini (reminder), agenda sesi, pendapatan, aktivitas terbaru
- **Pengajuan** — review, terima/tolak/reschedule, timeline aktivitas, Google Drive link
- **Invoice** — auto-generate saat terima pengajuan, edit, kirim, riwayat pembayaran
- **Kalender** — agenda sesi harian/mingguan, sinkronisasi Google Calendar
- **Pendapatan** — monitoring revenue, export Excel (.xlsx)
- **Klien** — database klien, riwayat pengajuan & pembayaran
- **Pengaturan** — konfigurasi studio, rekening, Google, jam operasional

### Integrasi
- **WhatsApp** — deep link otomatis (invoice, reminder, hasil)
- **Google Calendar** — auto-create event saat DP diverifikasi
- **Google Drive** — simpan + kirim link hasil dokumentasi

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 16 (App Router) + Turbopack |
| Bahasa | TypeScript |
| ORM | Prisma 7 + PostgreSQL |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Base UI) |
| Validation | Zod |
| Form | React Hook Form |
| State | TanStack Query v5 |
| Auth | NextAuth v5 (JWT + Credentials) |
| Icons | Lucide React |
| Packages | pnpm (wajib) |
| Deployment | Vercel |

---

## 🚀 Setup — Development

### Prasyarat
- **Node.js** ≥ 20
- **pnpm** ≥ 9 (`npm i -g pnpm`)
- **PostgreSQL** ≥ 15 (running locally or cloud)

### 1. Clone & Install

```bash
git clone <repo-url>
cd lovery2
pnpm install
```

### 2. Setup Database

Buat database PostgreSQL:

```bash
psql -U postgres -c "CREATE USER lovery WITH PASSWORD 'lovery123' CREATEDB;"
psql -U postgres -c "CREATE DATABASE lovery OWNER lovery;"
```

### 3. Environment Variables

Copy template dan sesuaikan:

```bash
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://lovery:lovery123@localhost:5432/lovery"
AUTH_SECRET="ubah-ini-dengan-random-string-minimal-32-karakter"

# Optional — untuk integrasi Google Calendar & Drive
GOOGLE_CLIENT_EMAIL=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_CALENDAR_ID=""
GOOGLE_DRIVE_FOLDER_ID=""

# WhatsApp (ganti dengan nomor asli)
NEXT_PUBLIC_WHATSAPP_NUMBER="6281234567890"
```

### 4. Migration & Seed

```bash
pnpm prisma migrate dev --name init    # Jalankan migration
pnpm prisma db seed                     # Isi data awal
```

### 5. Jalankan

```bash
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 🔑 Test Credentials

Setelah seed, data berikut tersedia untuk testing:

### Login Admin

| Field | Value |
|-------|-------|
| URL | http://localhost:3000/admin/login |
| Email | `admin@lovery.com` |
| Password | `admin123` |

### Paket (4 paket)

| Nama | Kategori | Harga |
|------|----------|-------|
| Graduation Basic | Graduation | Rp500.000 |
| Graduation Premium | Graduation | Rp750.000 |
| Casual Session | Casual | Rp400.000 |
| Wedding Package | Wedding | Rp2.000.000 |

### Add-On (5 add-on)

| Nama | Harga |
|------|-------|
| Drone | Rp300.000 |
| Extra Jam | Rp150.000 |
| Video Highlight | Rp250.000 |
| Cetak Album | Rp200.000 |
| Extra Foto | Rp100.000 |

---

## 🧪 Testing Flow — End-to-End

### 1. Client Mengajukan Sesi

1. Buka http://localhost:3000
2. Klik **"Ajukan Sesi"** atau langsung ke http://localhost:3000/ajukan-sesi
3. Pilih paket → pilih add-on → isi data diri → isi detail acara → konfirmasi → **Kirim**
4. Catat nomor pengajuan (format: `LVR-0001-2026`)
5. Lacak di http://localhost:3000/status dengan nomor pengajuan + nomor WA

### 2. Admin Review & Verifikasi

1. Login ke http://localhost:3000/admin/login
2. Dashboard → klik widget **"Pengajuan Baru"** atau buka **Pengajuan**
3. Klik ikon mata pada pengajuan baru
4. Klik **"Terima Pengajuan"** → invoice auto-generated
5. Buka **Invoice** → klik detail → **"Catat Pembayaran"**
6. Isi: Tipe **DP**, Nominal **100000**, Metode **Transfer** → **Simpan & Verifikasi**
7. Status berubah ke **"DP Diterima"** — Google Calendar event auto-created (jika credentials ada)

### 3. Lanjutan

- **Pelunasan** → catat & verifikasi → status **"Lunas"**
- **Mulai Sesi** → status **"Sesi Berlangsung"**
- **Selesaikan Sesi** → status **"Proses Editing"**
- **Upload Google Drive** → tempel link → **"Simpan & Kirim"** → WhatsApp terbuka
- **Tandai Selesai** → status **"Selesai"**

### 4. Monitoring

- **Dashboard** — widget counts, agenda hari ini, pendapatan, aktivitas
- **Pendapatan** — filter per bulan, export Excel
- **Klien** — search nama/WA, lihat riwayat

---

## 📁 Project Structure

```
lovery2/
├── prisma/
│   ├── schema.prisma          # 11 models + 8 enums
│   ├── seed.ts                # Data awal (admin, paket, add-on, settings)
│   └── migrations/            # Migration history
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (admin)/admin/     # Admin pages (protected)
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── pengajuan/     # Submission list + detail
│   │   │   ├── invoice/       # Invoice management
│   │   │   ├── kalender/      # Studio calendar
│   │   │   ├── pendapatan/    # Revenue monitoring
│   │   │   ├── klien/         # Client database
│   │   │   └── pengaturan/    # Studio settings
│   │   ├── admin/login/       # Admin login
│   │   ├── ajukan-sesi/       # Client submission form (5-step)
│   │   ├── status/            # Client status tracker
│   │   ├── paket/             # Package listing
│   │   ├── api/               # API routes (19 endpoints)
│   │   └── components/        # Landing page components (9)
│   ├── components/
│   │   ├── ui/                # shadcn/ui components (17)
│   │   └── layout/            # Sidebar, header
│   ├── features/              # Feature-based modules
│   │   ├── submission/        # Schemas, hooks, types, constants
│   │   ├── invoice/           # Schemas, hooks, types, constants
│   │   ├── payment/           # (integrated in invoice)
│   │   ├── client/            # Hooks, types
│   │   ├── settings/          # Hooks, schemas
│   │   └── whatsapp/          # WhatsApp utility + templates
│   ├── lib/                   # Shared libraries
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth config (server)
│   │   ├── auth.config.ts     # Auth config (Edge-safe)
│   │   ├── auth-edge.ts       # Auth for middleware (Edge)
│   │   ├── google-calendar.ts # Calendar service
│   │   ├── google.ts          # Google auth setup
│   │   └── utils.ts           # cn() utility
│   └── providers/             # React providers
├── docs/                      # Documentation (DDD)
├── middleware.ts              # Auth middleware (Edge-compatible)
├── prisma.config.ts           # Prisma 7 config
└── .env.example               # Environment template
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate` | Run migration (dev) |
| `pnpm db:push` | Push schema to DB |
| `pnpm db:seed` | Seed database |
| `pnpm db:studio` | Open Prisma Studio |

---

## 🏗️ Architecture

```
Client Browser
    │
    ▼
Next.js App Router
    │
    ├── Middleware (Edge) — auth.config.ts (JWT cookie check)
    │
    ├── Server Components — auth.ts (PrismaAdapter)
    ├── API Routes — Zod validation, Prisma queries
    │
    ├── Business Logic — features/ (services, schemas, constants)
    │
    └── External Services
        ├── PostgreSQL (via Prisma 7 + pg adapter)
        ├── Google Calendar API
        ├── Google Drive (link only, no upload)
        └── WhatsApp (deep link, no bot)
```

### Status Flow (11 states)

```
PENDING_REVIEW → WAITING_DP → DP_PAID → PAID → ON_SESSION
                                                     │
                   REJECTED                          ▼
                   RESCHEDULE                     EDITING
                   CANCELLED                         │
                                                     ▼
                                                 DELIVERED
                                                     │
                                                     ▼
                                                 COMPLETED
```

---

## 🚢 Deploy ke Vercel

1. Push repo ke GitHub
2. Connect Vercel → import repo
3. Set environment variables di dashboard Vercel:

```
DATABASE_URL="postgresql://user:pass@host:5432/db"
AUTH_SECRET="random-32-char-string"
NEXT_PUBLIC_WHATSAPP_NUMBER="628xxx"
# Optional
GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID, GOOGLE_DRIVE_FOLDER_ID
```

4. Deploy. Vercel akan menjalankan:
   - `pnpm install` → `prisma generate` (postinstall)
   - `pnpm build` → `prisma migrate deploy` (manual via CLI)
- Run seed: `pnpm prisma db seed` via Vercel CLI

---

## 📖 Dokumentasi

Dokumentasi lengkap mengikuti Documentation Driven Development:

```
docs/
├── PROJECT_PLAYBOOK.md        # Start here
├── README.md
├── IMPLEMENTATION_PLAN.md     # Phase breakdown
├── 00_FOUNDATION/             # Product philosophy & business background
├── 01_BUSINESS_RULES/         # All business rules
├── 02_PRODUCT_DESIGN/         # UX journeys & specs
├── 03_PRODUCT_ALIGNMENT/      # MVP scope
├── 04_TECHNICAL/              # Architecture, DB, ERD, standards
└── 05_DESIGN_SYSTEM/          # Brand, colors, typography, components
```

---

## 🔒 Security

- Semua endpoint admin dilindungi auth guard
- Middleware Edge-compatible — tidak import Prisma di Edge
- Password di-hash dengan bcrypt
- .env tidak dikomit ke repo
- Serializable isolation pada transaksi kritis (invoice, payment)
- Rate limiting: (belum, rekomendasi tambahkan via Vercel WAF)

---

## ⚠️ Known Limitations (MVP)

- Tidak ada payment gateway — verifikasi manual admin
- Tidak ada login klien — tracking via nomor pengajuan + WA
- Tidak ada manajemen freelancer/fotografer
- Tidak ada chat internal — WhatsApp untuk komunikasi
- Google Calendar/Drive perlu service account credentials
- No email notifications
- Single admin role (OWNER/ADMIN — belum ada RBAC granular)

---

## 📝 License

Private — Lovery Photography internal use only.
