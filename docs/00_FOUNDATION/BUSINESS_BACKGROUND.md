---
title: Business Background
version: 1.0.0
status: DRAFT
owner: Product Team
last_updated: 2026-07-01
related:
  - PROJECT_CONTEXT
  - CURRENT_WORKFLOW
  - PROBLEM_ANALYSIS
---

# 💼 Business Background

## Pendahuluan

Dokumen ini menjelaskan latar belakang bisnis Lovery Photography dan alasan mengapa Lovery Studio Management System dikembangkan.

Dokumen ini **tidak membahas implementasi teknis**, melainkan menjelaskan bagaimana operasional bisnis berjalan saat ini, tantangan yang dihadapi, serta perubahan yang ingin dicapai melalui sistem yang akan dibangun.

Seluruh anggota tim diharapkan memahami dokumen ini sebelum mulai mendesain antarmuka, membuat database, ataupun menulis kode program.

---

# Tentang Lovery Photography

Lovery Photography merupakan studio fotografi dan videografi yang berfokus pada dokumentasi momen spesial dengan pendekatan yang profesional, nyaman, dan personal.

Layanan utama yang ditawarkan antara lain:

- Wisuda
- Casual Session
- Wedding
- Engagement
- Event
- Dokumentasi Perusahaan
- Dokumentasi Acara

Operasional Lovery saat ini telah berkembang ke beberapa wilayah.

## Area Operasional

- Yogyakarta
- Solo
- Semarang

Walaupun memiliki beberapa wilayah operasional, seluruh administrasi masih dikelola secara terpusat oleh admin.

---

# Karakteristik Bisnis

Lovery Photography merupakan bisnis jasa.

Produk utama yang dijual bukan berupa barang, melainkan layanan.

Karena itu kualitas pelayanan menjadi faktor yang sangat menentukan kepuasan klien.

Pelayanan tidak hanya dinilai dari hasil foto atau video, tetapi juga dari pengalaman klien sejak pertama kali menghubungi admin hingga hasil akhir diterima.

Oleh karena itu proses administrasi menjadi bagian penting dari pengalaman pelanggan.

---

# Cara Operasional Saat Ini

Saat ini sebagian besar aktivitas administrasi masih dilakukan secara manual.

Media yang digunakan antara lain:

- WhatsApp
- Google Calendar
- Google Drive
- Invoice Manual
- Spreadsheet

Masing-masing aplikasi memiliki fungsi yang berbeda.

Namun belum ada sistem yang menghubungkan seluruh proses tersebut menjadi satu alur kerja.

---

# Karakteristik Klien

Sebagian besar klien Lovery berasal dari:

- Mahasiswa
- Pasangan yang akan menikah
- Individu
- Organisasi
- Perusahaan

Karakteristik umum klien:

- Lebih nyaman berkomunikasi melalui WhatsApp.
- Menginginkan proses yang cepat.
- Menginginkan informasi harga yang jelas.
- Menginginkan kepastian jadwal.
- Menginginkan pelayanan yang responsif.

Hal tersebut menjadi alasan mengapa WhatsApp tetap dipertahankan sebagai media komunikasi utama.

---

# Mengapa WhatsApp Tetap Dipertahankan?

Pada tahap awal perancangan sempat dipertimbangkan untuk membuat fitur chat di dalam website.

Namun setelah dilakukan analisis bersama pemilik Lovery Photography, diputuskan bahwa komunikasi tetap dilakukan melalui WhatsApp.

Alasan utama keputusan tersebut:

- Klien sudah terbiasa menggunakan WhatsApp.
- Admin telah memiliki alur komunikasi yang baik melalui WhatsApp.
- Komunikasi terasa lebih personal.
- Tidak memerlukan proses adaptasi.
- Mempermudah konsultasi lanjutan.

Website hanya membantu proses administrasi sebelum dan sesudah komunikasi berlangsung.

---

# Mengapa Google Calendar Tetap Digunakan?

Google Calendar telah digunakan dalam operasional sehari-hari.

Admin telah terbiasa membuka Google Calendar untuk melihat jadwal.

Membangun kalender baru di dalam aplikasi justru akan menambah proses adaptasi.

Oleh karena itu sistem hanya melakukan sinkronisasi ke Google Calendar.

Google Calendar tetap menjadi kalender resmi studio.

---

# Mengapa Pembayaran Masih Diverifikasi Manual?

Pembayaran dilakukan melalui transfer bank maupun QRIS.

Saat ini belum digunakan payment gateway.

Karena itu admin tetap melakukan verifikasi pembayaran secara manual.

Setelah pembayaran diverifikasi, sistem akan:

- memperbarui status pembayaran
- memperbarui status pengajuan
- membuat jadwal pada Google Calendar
- menampilkan data pada dashboard

Pendekatan ini dipilih karena sesuai dengan proses operasional yang sudah berjalan.

---

# Mengapa Tidak Ada Manajemen Crew?

Pada tahap awal perancangan sempat direncanakan fitur manajemen fotografer dan videografer.

Namun setelah dilakukan diskusi dengan pemilik Lovery Photography, diputuskan bahwa fitur tersebut tidak termasuk dalam MVP.

Alasannya:

- Sebagian besar fotografer dan videografer merupakan freelancer.
- Penjadwalan crew dilakukan secara fleksibel.
- Penentuan crew dilakukan di luar sistem.

Fokus utama MVP adalah administrasi studio.

---

# Mengapa Menggunakan Istilah "Pengajuan Sesi"?

Pada awal perancangan digunakan istilah "Booking".

Namun istilah tersebut dianggap kurang sesuai.

Saat klien mengisi formulir, sebenarnya sesi belum diterima.

Admin masih harus melakukan proses review.

Karena itu istilah resmi yang digunakan adalah:

**Pengajuan Sesi**

Keputusan ini membuat bahasa aplikasi lebih sesuai dengan proses bisnis yang sebenarnya.

---

# Nilai Bisnis Yang Ingin Dicapai

Lovery Studio Management System tidak dibangun untuk mengubah proses bisnis.

Produk ini dibangun untuk memberikan nilai berikut.

## Bagi Admin

- Mengurangi pekerjaan berulang.
- Mengurangi kesalahan administrasi.
- Mempermudah pemantauan pekerjaan.

---

## Bagi Klien

- Proses pengajuan lebih sederhana.
- Status lebih jelas.
- Pelayanan lebih cepat.
- Komunikasi tetap personal melalui WhatsApp.

---

## Bagi Pemilik Studio

- Pendapatan lebih mudah dipantau.
- Operasional lebih terstruktur.
- Data lebih rapi.
- Risiko kehilangan informasi berkurang.

---

# Ruang Lingkup MVP

Versi pertama Lovery Studio Management System difokuskan pada penyelesaian masalah administrasi.

Fitur utama MVP meliputi:

- Landing Page
- Portfolio
- Informasi Paket
- Pengajuan Sesi
- Status Pengajuan
- Dashboard Admin
- Invoice Otomatis
- Verifikasi DP
- Sinkronisasi Google Calendar
- Otomatisasi WhatsApp
- Pengingat
- Pendapatan
- Google Drive Link
- Export Laporan Excel

Fitur berikut **tidak termasuk** dalam MVP:

- Payment Gateway
- Chat Internal
- Manajemen Freelancer
- Upload File ke Google Drive
- Mobile Application
- AI Assistant

---

# Definisi Keberhasilan

Lovery Studio Management System dianggap berhasil apabila:

- Admin lebih sedikit berpindah aplikasi.
- Pekerjaan administrasi lebih cepat.
- Jadwal studio lebih terorganisir.
- Pendapatan lebih mudah dipantau.
- Tidak ada lagi pekerjaan yang hanya bergantung pada ingatan admin.

Keberhasilan produk tidak diukur dari banyaknya fitur.

Keberhasilan produk diukur dari seberapa besar sistem mampu membantu operasional Lovery Photography.

---

# Ringkasan

Lovery Studio Management System merupakan Digital Operating System yang dibangun berdasarkan kebutuhan nyata operasional Lovery Photography.

Produk ini tidak mencoba mengubah cara kerja studio.

Sebaliknya, sistem mengotomatisasi proses administrasi yang sudah berjalan sehingga pekerjaan admin menjadi lebih sederhana, lebih cepat, dan lebih terstruktur.

Seluruh keputusan desain maupun implementasi teknis pada tahap berikutnya harus selalu mengacu pada konteks bisnis yang dijelaskan dalam dokumen ini.