# 📋 Rencana Perombakan Frontend (Revamp)

Berikut adalah daftar seluruh halaman (pages) dan komponen utama di aplikasi Lovery yang perlu kita rombak untuk meningkatkan UI/UX agar terlihat lebih premium, dinamis, dan estetik.

## 🌐 Public Pages (Klien)

Ini adalah halaman-halaman yang dilihat langsung oleh klien. Desain di sini harus sangat memukau (WOW factor), responsif, dan memberikan kesan studio fotografi profesional kelas atas.

| Halaman | Route | Lokasi File Utama | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Landing Page** | `/` | `src/app/page.tsx`<br>`src/app/components/*` | Wajah utama studio. Memuat Hero, Portfolio, Layanan, FAQ, dll. Harus sangat premium. |
| **Daftar Paket** | `/paket` | `src/app/paket/page.tsx` | Menampilkan katalog paket (Wedding, Graduation, dll). |
| **Form Booking (Wizard)** | `/ajukan-sesi` | `src/app/ajukan-sesi/page.tsx`<br>`src/app/ajukan-sesi/content.tsx`<br>`src/app/ajukan-sesi/components/*` | Form 5 langkah interaktif. Butuh transisi yang halus, form yang cantik, dan validasi yang jelas. |
| **Tracker Status** | `/status` | `src/app/status/page.tsx` | Untuk klien mengecek status pengajuannya via nomor WA. |
| **Syarat & Ketentuan** | `/syarat-ketentuan` | `src/app/syarat-ketentuan/page.tsx` | Halaman statis teks, tapi butuh tipografi yang nyaman dibaca. |
| **Login Admin** | `/admin/login` | `src/app/admin/login/page.tsx` | Pintu masuk admin. Desainnya harus clean dan aman. |

---

## 🔐 Admin Dashboard Pages

Halaman operasional admin. Desain di sini harus fokus pada utilitas, keterbacaan data (readability), kecepatan aksi, dan tampilan yang rapi (clean design).

| Halaman | Route | Lokasi File Utama | Deskripsi |
| :--- | :--- | :--- | :--- |
| **Layout & Sidebar** | `(global admin)` | `src/app/(admin)/admin/layout.tsx`<br>`src/components/layout/sidebar.tsx`<br>`src/components/layout/admin-header.tsx` | Struktur utama dashboard admin. |
| **Dashboard Utama** | `/admin` | `src/app/(admin)/admin/page.tsx` | Ringkasan operasional: widget stat, agenda hari ini, pendapatan, dan timeline terbaru. |
| **List Pengajuan (Sesi)** | `/admin/pengajuan` | `src/app/(admin)/admin/pengajuan/page.tsx` | Tabel daftar sesi klien dengan fitur pencarian dan filter. |
| **Detail Sesi** | `/admin/pengajuan/[id]` | `src/app/(admin)/admin/pengajuan/[id]/page.tsx` | Halaman paling kompleks. Mengelola status, invoice PDF, pembayaran, link Drive, dan WA. |
| **List Invoice** | `/admin/invoice` | `src/app/(admin)/admin/invoice/page.tsx` | Tabel daftar invoice yang terbit. |
| **Kalender** | `/admin/kalender` | `src/app/(admin)/admin/kalender/page.tsx` | Tampilan jadwal sesi per bulan/hari. |
| **Pendapatan** | `/admin/pendapatan` | `src/app/(admin)/admin/pendapatan/page.tsx` | Laporan keuangan, filter bulan, dan tombol Export Excel. |
| **Database Klien** | `/admin/klien` | `src/app/(admin)/admin/klien/page.tsx` | Direktori klien beserta riwayat sesinya. |
| **Pengaturan** | `/admin/pengaturan` | `src/app/(admin)/admin/pengaturan/page.tsx` | Form manajemen studio, bank, Google Calendar, dll. |

---

## 🎯 Fokus Perombakan (UI/UX)

1.  **Color Palette:** Kita gunakan palet warna turunan `--color-lovery-pink` yang lebih elegan, mungkin dikombinasikan dengan warna netral seperti *slate* atau *zinc* untuk kesan premium.
2.  **Micro-animations:** Tambahkan efek hover yang halus (smooth transitions), state loading yang estetik, dan animasi masuk (fade-in/slide-up) menggunakan `tw-animate-css`.
3.  **Typography:** Optimasi ukuran font dan jarak antar baris. *Geist Sans* dan *Public Sans* sudah bagus, tinggal kita atur hierarkinya.
4.  **Glassmorphism/Shadows:** Buat kartu (cards) dan modal terlihat lebih modern dengan bayangan lembut (soft shadows) dan efek blur tipis.
5.  **Form & Inputs:** Percantik form booking dengan indikator langkah (step) yang interaktif, input dengan focus ring yang elegan, dan pesan error yang ramah.
