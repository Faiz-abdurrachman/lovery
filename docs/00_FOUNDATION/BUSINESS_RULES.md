w# 📖 Business Rules

> **Folder:** 07_BUSINESS_RULES
> **Version:** 1.0.0

---

# Pendahuluan

Folder ini berisi seluruh aturan bisnis (Business Rules) yang digunakan pada Lovery Studio Management System.

Business Rules merupakan aturan yang mengatur bagaimana sistem bekerja sesuai dengan proses operasional Lovery Photography.

Seluruh proses pada sistem harus mengikuti aturan yang terdapat pada folder ini.

Apabila terjadi perbedaan antara implementasi sistem dan Business Rules, maka Business Rules menjadi acuan utama.

---

# Tujuan

Dokumen Business Rules dibuat untuk memastikan bahwa:

- seluruh proses bisnis berjalan konsisten
- frontend dan backend memiliki pemahaman yang sama
- AI Coding Assistant tidak membuat alur yang bertentangan
- perubahan di masa depan dapat dilakukan tanpa mengubah filosofi produk

---

# Struktur Dokumen

Business Rules dibagi menjadi beberapa bagian.

## 01 Pengajuan Sesi

Menjelaskan seluruh aturan mengenai proses pengajuan sesi.

---

## 02 Pembayaran

Menjelaskan aturan DP, pelunasan, dan pembayaran.

---

## 03 Invoice

Menjelaskan proses pembuatan invoice.

---

## 04 WhatsApp

Menjelaskan otomatisasi WhatsApp.

---

## 05 Google Calendar

Menjelaskan sinkronisasi kalender.

---

## 06 Google Drive

Menjelaskan pengiriman hasil.

---

## 07 Pendapatan

Menjelaskan perhitungan pendapatan studio.

---

## 08 Add-On

Menjelaskan aturan layanan tambahan.

---

## 09 Status Pengajuan

Menjelaskan seluruh status resmi sistem.

---

## 10 Pengingat

Menjelaskan sistem reminder dan dashboard pekerjaan.

---

# Cara Membaca

Dokumen Business Rules dibaca berdasarkan modul.

Contoh.

Apabila sedang mengembangkan fitur pembayaran.

Maka cukup membaca:

02_PEMBAYARAN.md

Apabila sedang mengembangkan sinkronisasi Google Calendar.

Maka cukup membaca:

05_GOOGLE_CALENDAR.md

Setiap dokumen dapat dibaca secara mandiri.

---

# Prinsip

Business Rules merupakan representasi langsung dari proses operasional Lovery Photography.

Business Rules **bukan** dibuat berdasarkan asumsi developer.

Seluruh aturan berasal dari hasil diskusi bersama pemilik Lovery Photography.

Apabila terdapat perubahan proses bisnis di masa depan, maka perubahan dilakukan terlebih dahulu pada Business Rules sebelum dilakukan implementasi pada kode program.