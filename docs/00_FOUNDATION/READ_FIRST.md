# 📸 Lovery Studio Management System

> **Version:** 1.0.0  
> **Status:** Draft MVP  
> **Author:** Lovery Development Team  
> **Last Update:** 1 Juli 2026

---

# Selamat Datang

Selamat datang di dokumentasi resmi **Lovery Studio Management System**.

Apabila Anda membaca dokumen ini, berarti Anda akan terlibat dalam proses perancangan, pengembangan, desain, implementasi, maupun pengelolaan sistem ini.

Dokumen ini merupakan dokumen pertama yang **WAJIB** dibaca sebelum membuka dokumen lain.

Seluruh dokumentasi berikutnya mengacu pada keputusan dan filosofi yang dijelaskan pada dokumen ini.

---

# Tentang Produk

Lovery Studio Management System merupakan sistem operasional berbasis web yang dirancang khusus untuk membantu Lovery Photography mengelola seluruh aktivitas administrasi studio dalam satu platform.

Produk ini **bukan sekadar website fotografi**.

Produk ini juga **bukan sekadar website pengajuan sesi**.

Produk ini merupakan **Digital Operating System** yang membantu admin menjalankan operasional studio secara lebih efektif, lebih cepat, lebih terstruktur, dan lebih mudah dipantau.

Website hanyalah salah satu bagian dari keseluruhan sistem.

Nilai utama produk ini berada pada bagaimana sistem mampu membantu admin mengurangi pekerjaan manual setiap hari.

---

# Mengapa Produk Ini Dibuat?

Saat ini operasional Lovery Photography masih dilakukan menggunakan beberapa aplikasi yang terpisah.

Contohnya:

- WhatsApp
- Google Calendar
- Google Drive
- Invoice Manual
- Spreadsheet
- Catatan pribadi admin

Masing-masing aplikasi memiliki fungsi yang berbeda.

Namun karena seluruh proses administrasi dilakukan secara manual, admin harus berpindah-pindah aplikasi berkali-kali hanya untuk menyelesaikan satu pekerjaan.

Semakin banyak klien yang masuk, semakin besar pula kemungkinan terjadinya:

- lupa follow up
- jadwal bentrok
- invoice terlambat dikirim
- pembayaran belum diverifikasi
- pelunasan terlewat
- Google Drive lupa dikirim
- pekerjaan administrasi menumpuk

Masalah utama Lovery Photography bukan kurangnya aplikasi.

Masalah utamanya adalah **seluruh proses administrasi masih bergantung pada ingatan admin**.

---

# Tujuan Produk

Lovery Studio Management System dibangun untuk membantu admin menjalankan pekerjaan sehari-hari dengan lebih mudah.

Produk ini bertujuan untuk:

- Mengurangi pekerjaan administratif yang berulang.
- Mengurangi kemungkinan kesalahan manusia.
- Menyatukan seluruh proses administrasi dalam satu dashboard.
- Mempermudah pemantauan aktivitas studio.
- Mempermudah pemantauan pendapatan.
- Mempermudah proses komunikasi dengan klien.
- Mempermudah proses pembayaran.
- Mempermudah proses pengiriman hasil.

Fokus utama produk **bukan menambah fitur**, melainkan mengurangi beban kerja admin.

---

# Filosofi Produk

Seluruh proses pengembangan harus selalu mengacu pada filosofi berikut.

## 1. Jangan Mengubah Cara Kerja Lovery

Sistem tidak dibuat untuk memaksa Lovery Photography bekerja dengan cara baru.

Sistem dibuat untuk membantu proses yang sudah berjalan.

Contohnya:

- WhatsApp tetap menjadi media komunikasi utama.
- Google Calendar tetap menjadi kalender resmi studio.
- Google Drive tetap digunakan untuk mengirim hasil foto dan video.
- Admin tetap menjadi pengambil keputusan.

Sistem hanya membantu agar proses tersebut menjadi lebih cepat.

---

## 2. Sistem Membantu Admin, Bukan Menggantikan Admin

Seluruh keputusan penting tetap dilakukan oleh admin.

Contohnya:

- menerima pengajuan
- menolak pengajuan
- melakukan reschedule
- memverifikasi pembayaran
- mengirim Google Drive

Sistem tidak boleh mengambil keputusan bisnis secara otomatis.

---

## 3. Admin Tidak Boleh Mengingat Pekerjaan Sendiri

Ini merupakan prinsip paling penting dari seluruh produk.

Dashboard harus mampu memberi tahu admin:

- apa yang harus dikerjakan hari ini
- siapa yang harus dihubungi
- pembayaran apa yang belum diverifikasi
- sesi apa yang akan berlangsung
- file mana yang belum dikirim

Dashboard bukan tempat melihat data.

Dashboard adalah tempat bekerja.

---

## 4. WhatsApp Tetap Menjadi Media Komunikasi

Website tidak dibuat untuk menggantikan WhatsApp.

Setelah admin menerima pengajuan sesi, seluruh komunikasi lanjutan dilakukan melalui WhatsApp.

Website hanya membantu mengotomatisasi proses sebelum dan sesudah komunikasi berlangsung.

---

## 5. Google Calendar Menjadi Jadwal Resmi Studio

Seluruh jadwal resmi studio berasal dari Google Calendar.

Website akan membuat atau memperbarui jadwal secara otomatis setelah admin mengonfirmasi pembayaran DP.

Google Calendar menjadi sumber informasi utama mengenai jadwal operasional studio.

---

# Prinsip User Experience

Seluruh pengalaman penggunaan sistem dibagi menjadi dua kelompok utama.

## Client Experience

Klien hanya menggunakan website ketika ingin mengajukan sesi.

Oleh karena itu seluruh proses harus:

- sederhana
- cepat
- jelas
- tidak membingungkan

Target utama:

Klien dapat menyelesaikan proses pengajuan sesi dalam waktu kurang dari **3 menit**.

Setiap halaman harus selalu menjelaskan:

> Apa yang sedang terjadi.

dan

> Apa yang akan terjadi setelah ini.

Sehingga klien tidak merasa bingung.

---

## Admin Experience

Admin merupakan pengguna utama sistem.

Seluruh fitur harus dirancang untuk membantu pekerjaan admin.

Dashboard harus langsung menunjukkan:

- pekerjaan yang perlu diselesaikan
- pengajuan yang perlu direview
- pembayaran yang perlu diverifikasi
- sesi yang akan berlangsung
- file yang belum dikirim

Admin tidak boleh dipaksa mencari informasi secara manual.

---

# Nilai Utama Produk

Lovery Studio Management System bukan sekadar aplikasi administrasi.

Produk ini merupakan pusat operasional studio fotografi.

Seluruh proses administrasi dihubungkan menjadi satu alur kerja yang saling terintegrasi.

Nilai utama produk adalah:

- mengurangi pekerjaan manual
- mengurangi kesalahan administrasi
- meningkatkan kecepatan pelayanan
- meningkatkan keteraturan operasional
- membantu pemilik studio memantau bisnis

---

# Prinsip Pengembangan

Seluruh pengembangan harus selalu mengikuti prinsip berikut.

## Automation First

Segala sesuatu yang dapat dilakukan secara otomatis harus diotomatisasi.

Contohnya:

- membuat invoice
- menghitung total pembayaran
- menghitung add-on
- mengirim WhatsApp setelah pengajuan diterima
- membuat event Google Calendar
- membuat timeline aktivitas

---

## Human Decision First

Segala sesuatu yang membutuhkan keputusan bisnis tetap dilakukan oleh admin.

Contohnya:

- menerima pengajuan
- menolak pengajuan
- menentukan biaya transport
- memverifikasi DP
- mengirim Google Drive

---

# Yang Tidak Boleh Diubah

Seluruh keputusan berikut merupakan keputusan bisnis yang telah disepakati bersama pemilik Lovery Photography.

Keputusan berikut tidak boleh diubah tanpa persetujuan pemilik produk.

- WhatsApp merupakan media komunikasi utama.
- Google Calendar merupakan kalender resmi studio.
- Pengajuan sesi harus direview admin.
- Pengajuan sesi tidak otomatis diterima.
- Pembayaran DP diverifikasi secara manual.
- Sistem menggunakan istilah Bahasa Indonesia.
- Fokus utama sistem adalah mengurangi pekerjaan admin.

---

# Cara Membaca Dokumentasi

Dokumentasi disusun secara berurutan.

Urutan membaca yang disarankan adalah:

1. 00_READ_FIRST.md
2. 01_PROJECT_CONTEXT.md
3. 02_BUSINESS_BACKGROUND.md
4. 03_CURRENT_WORKFLOW.md
5. 04_PROBLEM_ANALYSIS.md
6. 05_PRODUCT_VISION.md

dan seterusnya.

Membaca dokumentasi secara berurutan akan memberikan pemahaman yang utuh mengenai produk.

---

# Penutup

Seluruh keputusan desain, implementasi, maupun pengembangan fitur harus selalu kembali kepada satu pertanyaan utama.

> **Apakah perubahan ini benar-benar membantu admin Lovery bekerja lebih mudah?**

Apabila jawabannya **ya**, maka perubahan tersebut sesuai dengan tujuan produk.

Apabila jawabannya **tidak**, maka perubahan tersebut harus dipertimbangkan kembali.

---

> **"Sistem yang baik bukanlah sistem dengan fitur paling banyak, melainkan sistem yang paling mampu membantu penggunanya menyelesaikan pekerjaan."**