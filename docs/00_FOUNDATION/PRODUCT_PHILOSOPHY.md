# 📸 Lovery Studio Management System

> **Document:** 05_PRODUCT_PHILOSOPHY.md
> **Version:** 1.0.0
> **Status:** Draft MVP
> **Author:** Lovery Development Team
> **Last Update:** 1 Juli 2026

---

# Product Philosophy

## Pendahuluan

Lovery Studio Management System bukan sekadar kumpulan halaman web, formulir, atau dashboard administrasi.

Produk ini dibangun berdasarkan serangkaian prinsip yang menjadi dasar dalam setiap keputusan desain, pengalaman pengguna, maupun pengembangan sistem.

Dokumen ini menjelaskan filosofi yang menjadi fondasi produk sehingga seluruh anggota tim memiliki cara berpikir yang sama ketika mengambil keputusan.

Apabila suatu saat muncul kebutuhan baru atau ide fitur baru, maka keputusan tersebut harus selalu dibandingkan dengan filosofi yang dijelaskan dalam dokumen ini.

Apabila bertentangan dengan filosofi produk, maka fitur tersebut harus dipertimbangkan kembali.

---

# Filosofi Utama

Seluruh Lovery Studio Management System dibangun berdasarkan satu tujuan besar.

> **Mengurangi pekerjaan administrasi tanpa mengubah cara kerja Lovery Photography.**

Sistem ini tidak dibuat untuk mengubah kebiasaan kerja studio.

Sistem dibuat untuk membantu proses yang selama ini sudah berjalan agar menjadi lebih cepat, lebih rapi, dan lebih mudah dikelola.

---

# Prinsip 1

# Sistem Mengikuti Bisnis

Banyak aplikasi memaksa pengguna mengikuti alur yang dibuat oleh aplikasi.

Lovery Studio Management System tidak dibuat seperti itu.

Sebaliknya.

Produk ini dibangun berdasarkan cara kerja Lovery Photography yang sudah berjalan selama ini.

Artinya.

Workflow bisnis menjadi prioritas utama.

Bukan workflow aplikasi.

Apabila proses bisnis berubah, maka sistem harus mengikuti perubahan tersebut.

Bukan sebaliknya.

---

# Prinsip 2

# WhatsApp Tetap Menjadi Media Komunikasi

Seluruh komunikasi dengan klien tetap dilakukan melalui WhatsApp.

Keputusan ini diambil karena:

- sudah menjadi kebiasaan admin
- sudah menjadi kebiasaan klien
- komunikasi terasa lebih personal
- tidak memerlukan aplikasi tambahan

Website tidak mencoba menggantikan WhatsApp.

Website hanya membantu mengotomatisasi aktivitas sebelum dan sesudah komunikasi berlangsung.

Contohnya:

- membuat invoice
- mengirim invoice
- mengirim pengingat
- mengirim informasi pembayaran

Setelah pesan terkirim.

Seluruh komunikasi kembali dilakukan melalui WhatsApp.

---

# Prinsip 3

# Google Calendar Tetap Menjadi Kalender Resmi

Google Calendar telah menjadi bagian dari operasional Lovery Photography.

Oleh karena itu.

Website tidak membuat sistem kalender baru yang berdiri sendiri.

Website hanya membantu membuat, memperbarui, atau menghapus jadwal secara otomatis.

Google Calendar tetap menjadi sumber jadwal resmi studio.

Keputusan ini memberikan beberapa keuntungan.

- admin tidak perlu belajar sistem baru
- jadwal dapat diakses melalui berbagai perangkat
- kalender tetap dapat digunakan di luar aplikasi

---

# Prinsip 4

# Dashboard Adalah Tempat Bekerja

Sebagian besar dashboard hanya menampilkan statistik.

Contohnya.

- jumlah transaksi
- jumlah klien
- jumlah invoice

Lovery Studio Management System memiliki pendekatan yang berbeda.

Dashboard bukan dibuat untuk melihat angka.

Dashboard dibuat untuk membantu admin bekerja.

Saat admin membuka dashboard, sistem harus langsung menjawab pertanyaan berikut.

- Apa yang harus saya kerjakan hari ini?
- Pengajuan mana yang perlu direview?
- Pembayaran mana yang perlu diverifikasi?
- Klien mana yang harus dihubungi?
- File mana yang belum dikirim?

Dashboard menjadi daftar pekerjaan harian.

Bukan sekadar halaman statistik.

---

# Prinsip 5

# Admin Tidak Boleh Mengingat Pekerjaan Sendiri

Ini merupakan prinsip terpenting dalam seluruh sistem.

Selama ini sebagian besar pekerjaan masih bergantung pada ingatan admin.

Misalnya.

- mengingat reminder
- mengingat pelunasan
- mengingat pengiriman Google Drive
- mengingat jadwal besok

Sistem harus mengambil alih proses mengingat tersebut.

Admin cukup membuka dashboard.

Sistem yang mengingatkan.

---

# Prinsip 6

# Pengajuan Bukan Booking

Selama proses perancangan diputuskan bahwa istilah **Booking** tidak digunakan.

Alasannya.

Saat klien mengisi formulir.

Belum tentu sesi tersebut diterima.

Admin masih harus melakukan review.

Oleh karena itu istilah yang digunakan adalah.

**Pengajuan Sesi**

Status baru berubah setelah admin menerima pengajuan.

Keputusan ini membuat bahasa aplikasi lebih sesuai dengan proses bisnis sebenarnya.

---

# Prinsip 7

# Admin Tetap Menjadi Pengambil Keputusan

Sistem boleh mengotomatisasi pekerjaan.

Tetapi sistem tidak boleh mengambil keputusan bisnis.

Contohnya.

Sistem boleh:

- membuat invoice
- menghitung DP
- menghitung add-on
- membuat timeline
- membuat event Google Calendar

Tetapi sistem tidak boleh:

- menerima pengajuan secara otomatis
- menolak pengajuan secara otomatis
- menentukan biaya transport
- memverifikasi pembayaran

Keputusan tersebut tetap dilakukan oleh admin.

---

# Prinsip 8

# Satu Sumber Data Untuk Setiap Informasi

Setiap informasi hanya memiliki satu sumber utama.

Contohnya.

| Informasi | Sumber Resmi |
|-----------|--------------|
| Komunikasi | WhatsApp |
| Jadwal Studio | Google Calendar |
| Administrasi | Lovery Studio Management System |
| Hasil Foto & Video | Google Drive |

Dengan pendekatan ini tidak akan terjadi kebingungan mengenai data mana yang paling benar.

---

# Prinsip 9

# Bahasa Harus Mudah Dipahami

Produk ini tidak ditujukan untuk pengguna teknis.

Karena itu seluruh istilah menggunakan Bahasa Indonesia yang sederhana.

Contoh.

| Hindari | Gunakan |
|----------|----------|
| Booking | Pengajuan Sesi |
| Client | Klien |
| Revenue | Pendapatan |
| Dashboard | Beranda Admin |
| Availability | Ketersediaan Sesi |

Bahasa yang sederhana akan mempercepat proses belajar pengguna.

---

# Prinsip 10

# Setiap Fitur Harus Menyelesaikan Masalah

Setiap fitur baru harus mampu menjawab pertanyaan berikut.

> Masalah apa yang sedang diselesaikan?

Apabila sebuah fitur tidak memiliki masalah nyata yang ingin diselesaikan.

Maka fitur tersebut tidak termasuk ke dalam MVP.

Prinsip ini menjaga agar produk tetap sederhana dan fokus.

---

# Prinsip 11

# Otomatisasi Tanpa Menghilangkan Kendali

Lovery Studio Management System mendorong otomatisasi.

Namun otomatisasi hanya dilakukan pada proses yang bersifat administratif.

Contohnya.

✅ Membuat invoice.

✅ Mengirim WhatsApp setelah admin menerima pengajuan.

✅ Menghitung total pembayaran.

✅ Menghitung add-on.

✅ Membuat timeline aktivitas.

Namun.

Keputusan tetap berada di tangan manusia.

Pendekatan ini menjaga keseimbangan antara efisiensi dan kontrol.

---

# Prinsip 12

# Kesederhanaan Selalu Menang

Setiap halaman harus menjawab satu tujuan utama.

Apabila sebuah halaman memiliki terlalu banyak fungsi.

Maka halaman tersebut perlu disederhanakan.

Semakin sedikit pengguna berpikir.

Semakin baik pengalaman pengguna.

---

# Filosofi Pengembangan

Selama pengembangan berlangsung.

Setiap anggota tim diharapkan selalu mengingat pertanyaan berikut.

> **Apakah keputusan ini benar-benar membuat pekerjaan admin menjadi lebih mudah?**

Apabila jawabannya **ya**, maka keputusan tersebut sesuai dengan filosofi produk.

Apabila jawabannya **tidak**, maka keputusan tersebut harus dievaluasi kembali.

---

# Penutup

Lovery Studio Management System tidak dibangun untuk menjadi sistem dengan fitur paling banyak.

Produk ini dibangun untuk menjadi sistem yang paling membantu operasional Lovery Photography.

Keberhasilan produk tidak diukur dari jumlah halaman, jumlah tombol, atau banyaknya teknologi yang digunakan.

Keberhasilan produk diukur dari satu hal.

> **Seberapa besar sistem mampu mengurangi pekerjaan manual admin setiap hari.**