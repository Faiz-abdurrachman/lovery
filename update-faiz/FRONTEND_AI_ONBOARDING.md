# 🎨 LOVERY FRONTEND AI ONBOARDING

Dokumen khusus untuk AI assistant yang mengerjakan tugas-tugas Frontend di Lovery Studio Management System.

---

## 🏗️ TECH STACK FRONTEND

*   **Framework:** Next.js 16.2.9 (App Router) dengan Turbopack.
*   **Language:** TypeScript 5 (Strict Mode).
*   **Styling:** Tailwind CSS v4 + Tailwind Animate CSS.
*   **UI Components:** shadcn/ui (dengan base-ui).
*   **Icons:** `lucide-react`.
*   **State Management & Data Fetching:** TanStack Query v5 (`@tanstack/react-query`) di client, Fetch API standar.
*   **Forms & Validation:** `react-hook-form` + `@hookform/resolvers/zod` + Zod v4.
*   **Dates:** `date-fns` v4 + `react-day-picker`.
*   **PDF Generation:** `jspdf` + `html2canvas` (client-side generation).

---

## 🎨 DESIGN SYSTEM & STYLING

Styling utama diatur di `src/app/globals.css` menggunakan sintaks baru Tailwind v4 (`@theme inline`).

### Colors (Tailwind Custom Colors)
Gunakan warna-warna ini dengan prefix utility seperti `bg-`, `text-`, `border-`:
*   `lovery-pink`: `#E89CC9` (Warna utama brand)
*   `lovery-pink-light`: `#F5D5E8`
*   `lovery-pink-dark`: `#D47DAA`
*   `success`: `#22C55E`
*   `warning`: `#F59E0B`
*   `error`: `#EF4444`
*   `info`: `#3B82F6`

**Status Colors:** Terdapat custom colors untuk badge status pengajuan (`status-review`, `status-dp`, `status-editing`, dll). Referensi penggunaan ada di `src/features/submission/constants/submission.constant.ts`.

### Radius (Border Radius)
*   `.rounded-sm` (8px)
*   `.rounded-md` (12px)
*   `.rounded-lg` (16px)
*   `.rounded-xl` (20px)

Secara umum, elemen UI (Button, Card, Input) menggunakan radius yang membulat (biasanya `rounded-xl`).

### Fonts
Font diatur via `next/font/google` di root layout (`src/app/layout.tsx`):
*   **Heading:** Geist Sans (`--font-sans`)
*   **Body:** Public Sans (`--font-body`)

### Utility
*   `cn(...inputs)` dari `src/lib/utils.ts` untuk merge class names Tailwind (kombinasi `clsx` dan `twMerge`).
*   `formatRupiah(n: number)` dari `src/lib/utils.ts` untuk format uang.

---

## 📂 STRUKTUR DIREKTORI FRONTEND

```
src/
├── app/
│   ├── (admin)/admin/   # Admin pages (Protected)
│   ├── ajukan-sesi/     # Form booking client (5-step wizard)
│   ├── components/      # Komponen khusus landing page (Hero, FAQ, dll)
│   ├── globals.css      # Tema Tailwind v4
│   └── layout.tsx       # Root layout + Providers
├── components/
│   ├── layout/          # Sidebar, AdminHeader
│   └── ui/              # Komponen shadcn/ui
├── features/            # Feature-based module (Schema, Hooks, Constants)
│   ├── client/
│   ├── invoice/
│   ├── settings/
│   ├── submission/
│   └── whatsapp/        # WhatsApp link generator & templates
└── providers/           # TanStack Query & NextAuth Session Provider
```

---

## 🧩 ARSITEKTUR KOMPONEN & PAGE

### 1. Root & Providers
Semua halaman dibungkus oleh `<Providers>` (`src/providers/index.tsx`) yang menyediakan `SessionProvider` (NextAuth), `QueryClientProvider` (TanStack Query), dan `<Toaster>` (Sonner untuk notifikasi).

### 2. Admin Layout (`src/app/(admin)/admin/layout.tsx`)
*   Mengecek session (server-side via `auth()`). Redirect ke `/admin/login` jika tidak ada.
*   Menggunakan `Sidebar` (kiri, hidden di mobile) dan `AdminHeader` (atas, ada hamburger menu/Sheet untuk mobile).
*   Area konten utama menggunakan `bg-gray-50` dengan padding.

### 3. Client Form Wizard (`src/app/ajukan-sesi/`)
Ini adalah fitur interaktif paling kompleks di frontend.
*   **State:** Menggunakan satu form state global via `react-hook-form` (`FormProvider`) dan divalidasi oleh Zod schema (`submissionSchema`).
*   **Flow:** Terdiri dari 5 step. Validasi dilakukan *per-step* sebelum lanjut menggunakan `form.trigger(['field1', 'field2'])`.
*   **Komponen:** Dipecah menjadi komponen kecil per step (`StepOneCategory`, `StepTwoAddOns`, dst) di folder `components/` dalam folder `ajukan-sesi`. Terdapat juga komponen `PriceSummary` di samping yang reaktif menghitung total harga (termasuk logic hitung DP).

### 4. Admin Dashboard (`src/app/(admin)/admin/page.tsx`)
*   Merupakan **Server Component** (`async function`).
*   Data fetching dilakukan secara paralel menggunakan `Promise.all` dan `supabaseAdmin` (bukan TanStack query) untuk performa render pertama.
*   Menggunakan `date-fns-tz` untuk konsistensi timezone Jakarta.

### 5. Detail Pengajuan (`src/app/(admin)/admin/pengajuan/[id]/page.tsx`)
*   Merupakan **Client Component**.
*   **Penting:** Data Supabase kadang mengembalikan array `[{}]` untuk relasi (join), sehingga kode menggunakan pola fallback pengaksesan: `const clientData = (sub.client as any)?.[0] || sub.client`.
*   Terdapat fungsionalitas kompleks:
    *   Mengubah status pengajuan via modal dialog.
    *   Membuat dan mengunduh Invoice PDF secara client-side (`jsPDF`).
    *   Mencatat dan memverifikasi pembayaran.
    *   Menghasilkan link WhatsApp pre-filled untuk kirim notifikasi ke klien.

---

## 📡 DATA FETCHING (CLIENT-SIDE)

Aplikasi sangat bergantung pada TanStack Query (`useQuery`, `useMutation`) untuk fetching data di client (terutama di panel admin). Custom hooks disediakan per fitur di dalam folder `src/features/**/hooks/`.

**Pola Umum:**
1. Hook `useQuery` memanggil API route internal (`/api/...`).
2. API route memproses request dan mereturn standar response `{ success: boolean, data?: any, message?: string }`.
3. Jika mutasi berhasil (di `useMutation`), `onSuccess` akan melakukan `queryClient.invalidateQueries` untuk merefresh data terkait.

Contoh Hooks:
*   `useSubmissions(filters)`: Mengambil list pengajuan dengan pagination/filter.
*   `useSubmission(id)`: Mengambil detail satu pengajuan.
*   `useUpdateStatus()`: Mutasi ubah status pengajuan.
*   `useSettings()`, `useClients()`, `useInvoices()`.

---

## ⚠️ GOTCHAS & ATURAN FRONTEND

1. **Zod v4:** Terdapat breaking changes di Zod v4 (terutama `z.coerce`). Jangan menggunakan `z.coerce` atau `z.preprocess` di schema form client karena akan membuat tipe di `react-hook-form` menjadi `unknown`.
2. **Supabase Relational Data:** Jika memanggil API route yang mereturn data dari Supabase dengan join (seperti `.select('*, client:clients(*)')`), di frontend **selalu antisipasi** bahwa objek relasi (`client`, `package`) bisa berbentuk object tunggal ATAU array object.
   *   `❌ sub.client?.name` (Bisa undefined jika data aslinya array)
   *   `✅ (sub.client as any)?.[0]?.name || sub.client?.name`
3. **Komponen shadcn/ui:** Semua import komponen base harus mengarah ke alias `@/components/ui/...`.
4. **Icons:** Gunakan komponen SVG dari `lucide-react`. Hindari menambah library icon lain.
5. **Animasi:** Landing page menggunakan class animasi dari `tw-animate-css` (misal: `animate-fade-up`, `animate-delay-100`).
6. **Timezone:** Server sering jalan di UTC. Pastikan handling tanggal di dashboard yang membutuhkan perbandingan (seperti "Hari Ini", "Bulan Ini") memakai `date-fns-tz` dengan zona waktu `"Asia/Jakarta"`.
7. **Hydration Errors:** Hati-hati menempatkan `<a>` atau `<button>` di dalam elemen interaktif lain. Ini sering jadi masalah di komponen Dropdown/Menu.

---

## 🚀 PANDUAN PENGEMBANGAN FITUR BARU

1. **Buat Type/Schema:** Jika ada data model baru, definisikan dulu `Zod` schema dan TypeScript `type`-nya di `src/features/<feature_name>/`.
2. **Buat Hooks:** Buat custom hooks TanStack Query di `src/features/<feature_name>/hooks/`. Jangan fetching pakai `fetch` mentah langsung di dalam komponen UI.
3. **UI Components:** Letakkan komponen re-usable kecil di `src/components/ui/`. Letakkan komponen kompleks spesifik halaman di dalam folder halaman tersebut (misal `src/app/admin/klien/components/`).
4. **Pola CSS:** Hindari membuat file `.css` baru kecuali terpaksa. Gunakan utility classes Tailwind. Jika ada style kompleks yang repetitif, ekstrak menjadi komponen React atau gunakan fungsi `cn()` jika hanya menyatukan class.

***
Selamat coding! Fokus pada keindahan desain (vibrant, modern, rounded) dan UX yang fluid.
