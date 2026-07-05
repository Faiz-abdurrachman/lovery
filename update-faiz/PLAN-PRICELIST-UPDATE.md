# 📋 PLAN — Update Pricelist Sesuai Data Asli

**Date:** 5 Juli 2026
**Status:** Planning
**Source:** `docs/PRICELIST GRADUATION 2026 -1.md`, `docs/PRICELIST CASUAL -1.md`, `docs/PRICELIST WEDDING 2026-1.md`

---

## 🔴 MASALAH

Sistem skrg punya **4 paket** dan **5 add-on** — tapi pricelist asli punya **17 paket** dan **10+ add-on** yang完全不同. Semua data seed harus dirombak.

---

## 📦 PAKET BARU

### Graduation (6 paket) — Kategori: "Graduation"
| Paket | Harga | Durasi | Foto | Detail |
|-------|-------|--------|------|--------|
| Short Session (Reguler) | **Rp195.000** | 30 menit | 15 edit | 1 wisudawan |
| Personal (Reguler) | **Rp300.000** | 60 menit | 30 edit | 1 wisudawan |
| Premium Short Session | **Rp290.000** | 30 menit | 15 edit | +1 assistant, lighting |
| Personal Premium | **Rp500.000** | 60 menit | 30 edit | +1 assistant, lighting |
| Couple | **Rp650.000** | 60 menit | 30 edit | 2 wisudawan |
| Group (4-6) | **Rp725.000** | 90 menit | 30 edit | 4-6 wisudawan |

### Casual / Personal (3 paket) — Kategori: "Casual"
| Paket | Harga | Durasi | Foto | Detail |
|-------|-------|--------|------|--------|
| Personal Reguler | **Rp300.000** | 60 menit | 30 edit | 1 orang |
| Personal Premium | **Rp500.000** | 60 menit | 30 edit | +assistant, lighting |
| Group & Family (4-6) | **Rp725.000** | 90 menit | 30 edit | 4-6 orang |

### Wedding (8 paket) — Kategori: "Wedding"
| Paket | Harga | Detail |
|-------|-------|--------|
| Prewedding Bronze | **Rp650.000** | 1 fotografer, 2 jam, 40 edit |
| Prewedding Silver | **Rp1.450.000** | 1 foto + 1 video, cinematic 1mnt |
| Engagement Bronze | **Rp850.000** | 1 fotografer, 4 jam, 60 edit |
| Engagement Silver | **Rp1.750.000** | 1 foto + 1 video, cinematic 1mnt |
| Gold (Akad Only) | **Rp3.500.000** | 2 foto + 1 video, 6-7 jam, 100 edit |
| Platinum (Resepsi) | **Rp4.500.000** | 2 foto + 1 video, 8-9 jam |
| Diamond (Akad+Resepsi) | **Rp5.500.000** | 3-4 mnt cinematic, 10-12 jam, 200 edit |
| YPS (Yang Penting Sah) | **Rp670.000** | 1 fotografer, 3 jam, 15 edit, KUA only |

---

## ➕ ADD-ON BARU

Sesuai pricelist, add-on yang bener:

| Add-On | Harga | Berlaku Untuk |
|--------|-------|---------------|
| Make Up | **Rp350.000** | Graduation, Casual |
| Hair Do | **Rp175.000** | Graduation, Casual |
| Content Creator | **Rp200.000** | Graduation, Casual, Wedding |
| Video Cinematic | **Rp650.000** | Graduation, Casual |
| Extra 10 Menit | **Rp50.000** | Graduation Reguler |
| Extra 10 Menit | **Rp100.000** | Graduation Premium, Casual |
| Extra 1 Jam | **Rp250.000** | Wedding (overtime) |
| Foto Edit Tambahan | **Rp10.000/foto** | Graduation, Casual |
| Tambah Orang | **Rp35.000/orang** | Casual |
| Cetak Album | ❌ **Gak ada di pricelist** | Hapus |
| Drone | ❌ **Gak ada di pricelist** | Hapus |
| Extra Foto Rp100rb | ❌ **Gak ada di pricelist** | Hapus |

---

## 🔧 FILE YANG PERLU DIUBAH

| File | Perubahan |
|------|-----------|
| `prisma/seed.ts` | Ganti total 17 paket + 7 add-on (atau via Supabase SQL) |
| Atau **`update-pricelist.sql`** | SQL langsung INSERT ke Supabase (lebih aman) |
| `src/features/invoice/constants/invoice.constant.ts` | Cek `calculateDP()` — mungkin perlu update kalo ada aturan baru |
| `src/app/paket/page.tsx` | Nampilin 17 paket sekarang |

---

## ⚠️ RISIKO

1. **Paket ID berubah** — submission yang udah ada pake packageId lama → bakal orphan kalo ID-nya diubah
2. **Add-on ID berubah** — submission_add_ons pake addonId lama
3. **calculateDP** — aturan DP 50rb/100rb masih sesuai, wedding 40% juga sesuai

### Mitigasi:
- Jangan DELETE paket lama — cukup `isActive: false`
- Buat paket baru dengan ID baru
- Submission lama tetap nunjuk ke paket lama (tapi dianggap tidak aktif)
- Atau lebih baik: **UPDATE nama & harga paket existing** — ganti id-nya jadi ID baru yang cocok

---

## 🏁 EKSEKUSI PLAN

### Wave 1: Data Seed
1. Matikan paket lama (isActive = false)
2. Insert 17 paket baru sesuai pricelist
3. Insert add-on baru (7 item)
4. Hapus add-on lama yang gak ada di pricelist (drone, cetak album, extra foto)

### Wave 2: Frontend
5. Update halaman `/paket` — nampilin semua paket baru
6. Booking form — pilih dari 17 paket
7. `calculateDP()` — cek apakah masih sesuai

### Wave 3: Verification
8. Test booking pake paket baru
9. Test admin accept → invoice
10. Verify DP calculation
