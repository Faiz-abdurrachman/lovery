# 🎨 Wireframes: Rencana Revamp Frontend

Berikut adalah gambaran "kotak-kotak" (wireframe) dari halaman utama aplikasi Lovery. Wireframe ini merangkum struktur layout saat ini yang nantinya akan kita percantik (revamp) dengan styling Tailwind modern, shadow halus, dan efek glassmorphism.

## 1. Landing Page (`/`)
Halaman ini adalah wajah studio. Kita akan ubah agar foto-foto hero terlihat dominan dan elegan.

```text
+-------------------------------------------------------------+
| [ LOGO ] Lovery Photography      Portfolio  Layanan  [Ajukan Sesi] |
+-------------------------------------------------------------+
|                                                             |
|   (Hero Section - Full Width Image / Video Background)      |
|   Abadikan Momen Berharga Anda                              |
|   [ Lihat Portofolio ]  [ Booking Sekarang ]                |
|                                                             |
+-------------------------------------------------------------+
|   (Layanan Kami)                                            |
|   [ Wedding ] [ Pre-Wedding ] [ Graduation ] [ Casual ]     |
|   +-------+   +-------+       +-------+      +-------+      |
|   | Foto  |   | Foto  |       | Foto  |      | Foto  |      |
|   | 1.5jt |   | 1.2jt |       | 500k  |      | 300k  |      |
|   +-------+   +-------+       +-------+      +-------+      |
+-------------------------------------------------------------+
|   (Footer) Alamat, Kontak WA, Instagram                     |
+-------------------------------------------------------------+
```

## 2. Form Booking (`/ajukan-sesi`)
Wizard interaktif 5 langkah. Area ini butuh UI yang tidak membosankan (contoh: *card layout* untuk paket, animasi transisi antar step).

```text
+-------------------------------------------------------------+
|                  [ LOGO ] Ajukan Sesi                       |
|   [1] Paket > [2] Add-on > [3] Data > [4] Acara > [5] Konfirmasi |
+-------------------------------------------------------------+
|                                  |                          |
|  Pilih Kategori Paket:           |  Ringkasan Pesanan       |
|  [ Wedding ] [ Grad ] [ Studio ] |                          |
|                                  |  - Paket Wedding  1.5M   |
|  [x] Paket Silver (1.5M)         |  - Addon Cetak    100K   |
|      - 1 Fotografer              |  ----------------------- |
|      - 50 Edited Photos          |  Total            1.6M   |
|                                  |                          |
|  [ ] Paket Gold (2.5M)           |  Estimasi DP: 500K       |
|                                  |                          |
|  < Kembali         [Selanjutnya] |                          |
|                                  |                          |
+-------------------------------------------------------------+
```

## 3. Admin Dashboard (`/admin`)
Pusat kontrol operasional. Perlu kita optimasi dengan *soft shadows* dan *badge* warna-warni yang jelas untuk indikator status.

```text
+-----------+-------------------------------------------------+
| [ LOGO ]  |  Header (Admin Name)                 [Logout]   |
+-----------+-------------------------------------------------+
| Dashboard |  Selamat datang, Admin!                         |
| Sesi      |                                                 |
| Kalender  |  +------------+ +------------+ +------------+   |
| Pendapatan|  | Baru: 5    | | Tunggu DP:2| | Sesi hr ini:1| |
| Klien     |  +------------+ +------------+ +------------+   |
| Pengaturan|                                                 |
|           |  [ Agenda Hari Ini ]                            |
|           |  - 10:00 Budi (Wedding) - Lokasi X   [Badge]    |
|           |                                                 |
|           |  [ Pendapatan ]        [ Aktivitas Terbaru ]    |
|           |  - Hari Ini: 1.5M      - Budi submit sesi       |
|           |  - Bulan Ini: 10M      - Ani bayar DP           |
+-----------+-------------------------------------------------+
```

## 4. Detail Sesi Admin (`/admin/pengajuan/[id]`)
Ini adalah halaman paling krusial. Struktur gridnya (3 kolom) sudah bagus, tinggal kita perhalus card-nya agar informasinya tidak terlalu padat.

```text
+-----------+-------------------------------------------------+
| [ LOGO ]  |  Header (Admin Name)                 [Logout]   |
+-----------+-------------------------------------------------+
| < Kembali |  Pengajuan #LVR-12345        [Badge: WAITING_DP]|
+-----------+-------------------------------------------------+
|  [ Info Klien ]                   [ Timeline ]              |
|  Nama: Budi                       - 10:00 Submit Sesi       |
|  WA: 081234...                    - 10:05 Admin Accept      |
|                                                             |
|  [ Detail Sesi ]                  [ Aksi ]                  |
|  Acara: Wedding                   [ Terima Pembayaran DP ]  |
|  Tanggal: 10 Ags 2026             [ Batalkan Sesi ]         |
|                                                             |
|  [ Invoice & Pembayaran ]         [ WhatsApp ]              |
|  Subtotal: 1.5M                   [ Kirim Invoice PDF ]     |
|  DP: 500K (Tunggu)                [ Kirim Pengingat ]       |
|  [ Download PDF ] [ Bayar ]                                 |
+-----------+-------------------------------------------------+
```
