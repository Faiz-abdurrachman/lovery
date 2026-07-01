# 📸 Lovery Studio Management System

> **Document:** 03_PROBLEM_ANALYSIS.md
> **Version:** 1.0.0
> **Status:** Draft MVP
> **Last Update:** 1 Juli 2026

---

# Problem Analysis

## Pendahuluan

Sebelum membangun sebuah sistem, penting untuk memahami bahwa setiap fitur yang dikembangkan harus memiliki alasan yang jelas.

Lovery Studio Management System tidak dibuat karena ingin mengikuti tren digitalisasi, melainkan karena terdapat berbagai pekerjaan administratif yang terus berulang setiap hari.

Dokumen ini menjelaskan seluruh permasalahan operasional yang ditemukan pada proses bisnis Lovery Photography, kemudian menghubungkannya dengan solusi yang akan dibangun pada sistem.

Seluruh fitur dalam aplikasi harus mampu menjawab minimal satu permasalahan yang dijelaskan pada dokumen ini.

---

# Filosofi Analisis

Selama proses analisis digunakan satu prinsip utama.

> **Jangan membuat fitur apabila tidak menyelesaikan masalah nyata.**

Setiap fitur harus memiliki tujuan yang jelas.

Apabila sebuah fitur tidak memberikan manfaat terhadap operasional studio, maka fitur tersebut tidak termasuk ke dalam MVP.

---

# Permasalahan 1

## Pengajuan Klien Masih Dilakukan Melalui WhatsApp

### Kondisi Saat Ini

Saat ini seluruh calon klien menghubungi admin melalui WhatsApp.

Percakapan biasanya dimulai dengan pertanyaan seperti:

- Apakah tanggal tertentu masih tersedia?
- Berapa harga paket?
- Bagaimana cara booking?
- Apakah ada biaya transport?
- Paket apa yang cocok?

Admin kemudian harus membalas seluruh pertanyaan tersebut secara manual.

Setelah itu admin kembali meminta data-data yang sebenarnya selalu sama.

Misalnya:

- nama
- nomor WhatsApp
- tanggal
- lokasi
- paket
- request khusus

Seluruh data tersebut kembali diketik secara manual.

---

### Dampak

Akibatnya:

- pekerjaan admin menjadi berulang
- data mudah tercecer
- format data setiap klien berbeda
- membutuhkan waktu lebih lama

---

### Solusi

Website menyediakan halaman **Pengajuan Sesi**.

Klien langsung mengisi seluruh data yang dibutuhkan.

Admin hanya perlu melakukan proses review.

WhatsApp tetap digunakan sebagai media komunikasi setelah pengajuan diterima.

---

# Permasalahan 2

## Admin Harus Mengingat Banyak Hal

### Kondisi Saat Ini

Dalam satu hari admin harus mengingat banyak pekerjaan.

Contohnya:

- siapa yang belum DP
- siapa yang harus diingatkan
- siapa yang besok photoshoot
- siapa yang belum lunas
- siapa yang belum dikirim Google Drive

Sebagian besar informasi tersebut masih bergantung pada ingatan admin.

---

### Dampak

Risiko yang muncul:

- lupa follow up
- lupa reminder
- lupa mengirim hasil
- pekerjaan tertunda

---

### Solusi

Dashboard akan menjadi **pusat pekerjaan admin**.

Dashboard secara otomatis menyusun daftar pekerjaan berdasarkan kondisi sistem.

Admin tidak perlu lagi mengingat sendiri.

---

# Permasalahan 3

## Invoice Dibuat Secara Manual

### Kondisi Saat Ini

Invoice dihitung satu per satu.

Admin harus menghitung:

- harga paket
- add-on
- DP
- sisa pembayaran

Kemudian membuat invoice dan mengirimkannya melalui WhatsApp.

---

### Dampak

- memakan waktu
- rawan salah hitung
- format invoice tidak konsisten

---

### Solusi

Invoice dibuat otomatis berdasarkan paket dan add-on yang dipilih.

Admin tetap dapat melakukan perubahan apabila diperlukan sebelum invoice dikirim.

---

# Permasalahan 4

## Jadwal Studio Tidak Terhubung Dengan Pengajuan

### Kondisi Saat Ini

Setelah DP diterima, admin masih harus membuka Google Calendar kemudian membuat jadwal secara manual.

---

### Dampak

- berpotensi lupa membuat jadwal
- pekerjaan dilakukan dua kali
- memperlambat proses administrasi

---

### Solusi

Setelah admin memverifikasi DP, sistem akan secara otomatis membuat jadwal pada Google Calendar.

Google Calendar tetap menjadi kalender resmi studio.

---

# Permasalahan 5

## Follow Up Dilakukan Secara Manual

### Kondisi Saat Ini

Reminder dilakukan berdasarkan ingatan admin.

Misalnya:

- reminder H-1
- reminder pelunasan
- reminder pengiriman hasil

Belum ada sistem yang membantu mengingatkan pekerjaan tersebut.

---

### Dampak

- risiko lupa follow up
- pelayanan menjadi kurang konsisten

---

### Solusi

Dashboard menyediakan daftar **Yang Perlu Ditindaklanjuti**.

Sistem menyusun daftar pekerjaan berdasarkan kondisi terbaru.

---

# Permasalahan 6

## Pendapatan Sulit Dipantau

### Kondisi Saat Ini

Pendapatan masih dicatat secara manual.

Admin harus menghitung sendiri:

- DP masuk
- pelunasan
- total pendapatan
- outstanding payment

---

### Dampak

- laporan memakan waktu
- rawan kesalahan pencatatan

---

### Solusi

Sistem menghitung seluruh transaksi secara otomatis.

Dashboard menyediakan:

- Pendapatan Hari Ini
- Pendapatan Bulan Ini
- DP Masuk
- Pelunasan
- Outstanding Payment

Data juga dapat diekspor ke Microsoft Excel.

---

# Permasalahan 7

## Status Pengajuan Sulit Dipantau

### Kondisi Saat Ini

Admin harus membuka WhatsApp untuk mengetahui proses terakhir setiap klien.

Belum ada tempat yang menunjukkan perjalanan sebuah pengajuan.

---

### Dampak

- sulit mengetahui progres
- rawan terjadi miskomunikasi

---

### Solusi

Setiap pengajuan memiliki timeline aktivitas.

Semua aktivitas akan tercatat secara otomatis.

Misalnya:

- Pengajuan dibuat
- Direview
- Invoice dibuat
- WhatsApp dikirim
- DP diterima
- Jadwal dibuat
- Editing
- Google Drive dikirim
- Selesai

---

# Permasalahan 8

## Terlalu Banyak Pekerjaan Berulang

Contoh pekerjaan yang dilakukan hampir setiap hari:

- membuka WhatsApp
- mengecek Google Calendar
- membuat invoice
- menghitung DP
- mengingat reminder
- mencatat pembayaran
- mencari data klien

Seluruh pekerjaan tersebut sebenarnya dapat dibantu oleh sistem.

---

# Kesimpulan

Permasalahan utama Lovery Photography bukan terletak pada proses bisnis.

Permasalahan utama berada pada proses administrasi yang masih dilakukan secara manual dan tersebar di berbagai aplikasi.

Lovery Studio Management System dibangun untuk mempertahankan workflow yang sudah berjalan, kemudian mengotomatisasi pekerjaan-pekerjaan administratif yang berulang.

Dengan demikian admin dapat lebih fokus memberikan pelayanan kepada klien dibandingkan melakukan pekerjaan administratif.