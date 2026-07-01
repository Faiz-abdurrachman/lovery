# 📸 Lovery Studio Management System

> **Document:** 01_PROJECT_CONTEXT.md
> **Version:** 1.0.0
> **Status:** Draft MVP
> **Author:** Lovery Development Team
> **Last Update:** 1 Juli 2026

---

# Project Context

## Pendahuluan

Lovery Studio Management System merupakan sistem operasional berbasis web yang dirancang khusus untuk membantu proses administrasi Lovery Photography.

Dokumen ini menjelaskan konteks proyek secara menyeluruh, mulai dari latar belakang bisnis, tujuan pengembangan, target pengguna, ruang lingkup sistem, hingga prinsip-prinsip utama yang menjadi dasar seluruh proses pengembangan.

Dokumen ini menjadi acuan utama bagi seluruh anggota tim, baik Product Manager, UI/UX Designer, Frontend Developer, Backend Developer, QA Engineer, maupun AI Coding Assistant.

---

# Tentang Lovery Photography

Lovery Photography merupakan studio fotografi dan videografi yang melayani berbagai kebutuhan dokumentasi profesional.

Layanan utama meliputi:

- Wisuda
- Casual Session
- Wedding
- Event
- Engagement
- Dokumentasi Perusahaan
- Dokumentasi Acara

Lovery Photography memiliki operasional di beberapa kota, yaitu:

## Yogyakarta

Sebagai cabang utama operasional.

## Solo

Melayani area Solo dan sekitarnya.

## Semarang

Melayani area Semarang dan sekitarnya.

Walaupun memiliki beberapa wilayah operasional, seluruh administrasi saat ini masih dilakukan secara terpusat.

---

# Gambaran Produk

Lovery Studio Management System bukan merupakan website portfolio biasa.

Produk ini juga bukan sekadar website untuk menerima pengajuan sesi.

Produk ini merupakan sistem operasional studio yang menghubungkan seluruh aktivitas administrasi menjadi satu alur kerja yang saling terintegrasi.

Website akan menjadi pusat administrasi, sedangkan komunikasi dengan klien tetap dilakukan melalui WhatsApp.

Google Calendar tetap digunakan sebagai kalender resmi studio.

Google Drive tetap digunakan sebagai media distribusi hasil foto maupun video.

Dengan demikian, sistem tidak mengubah cara kerja Lovery Photography, melainkan mengoptimalkan proses yang sudah berjalan.

---

# Tujuan Pengembangan

Produk ini dikembangkan dengan beberapa tujuan utama.

## Mengurangi Pekerjaan Administratif

Menghilangkan pekerjaan yang dilakukan berulang kali oleh admin, seperti:

- membuat invoice secara manual
- menghitung pembayaran
- mengirim pengingat
- mencatat jadwal
- membuat laporan pendapatan

---

## Mengurangi Kesalahan Manusia

Kesalahan yang sering terjadi antara lain:

- lupa follow up
- lupa memasukkan jadwal
- lupa mengirim invoice
- lupa mengirim Google Drive
- salah mencatat pembayaran

Sistem dirancang untuk membantu meminimalkan kemungkinan tersebut.

---

## Memusatkan Operasional

Seluruh proses administrasi dilakukan dari satu dashboard sehingga admin tidak perlu berpindah-pindah aplikasi.

---

## Mempermudah Monitoring

Pemilik studio dapat melihat perkembangan operasional melalui dashboard tanpa harus membuka spreadsheet atau mencari data secara manual.

---

# Ruang Lingkup Sistem

Sistem hanya berfokus pada proses administrasi studio.

Sistem **tidak** menggantikan proses kreatif fotografi maupun videografi.

Sistem membantu mengelola:

- pengajuan sesi
- invoice
- pembayaran
- status proyek
- jadwal studio
- data klien
- laporan pendapatan
- pengingat pekerjaan

---

# Target Pengguna

Produk ini memiliki tiga kelompok pengguna utama.

## 1. Klien

Klien menggunakan website untuk:

- melihat portfolio
- melihat paket
- memilih add-on
- mengajukan sesi
- melihat status pengajuan

Seluruh komunikasi lanjutan dilakukan melalui WhatsApp.

---

## 2. Admin

Admin merupakan pengguna utama sistem.

Admin menggunakan dashboard untuk:

- meninjau pengajuan sesi
- menerima atau menolak pengajuan
- membuat dan mengirim invoice
- memverifikasi pembayaran DP
- mengelola jadwal studio
- mengirim pengingat
- mencatat pelunasan
- mengirim tautan Google Drive
- menyelesaikan proyek

---

## 3. Pemilik Studio

Pemilik studio menggunakan dashboard untuk memantau kondisi bisnis.

Informasi yang dapat dipantau antara lain:

- jumlah pengajuan
- pendapatan
- DP masuk
- pelunasan
- proyek berjalan
- proyek selesai
- laporan bulanan

---

# Integrasi Sistem

Lovery Studio Management System terintegrasi dengan beberapa layanan eksternal.

## WhatsApp

Digunakan sebagai media komunikasi utama dengan klien.

Sistem akan membantu mengirim pesan otomatis pada tahapan tertentu sesuai keputusan admin.

---

## Google Calendar

Digunakan sebagai kalender resmi studio.

Setelah pembayaran DP diverifikasi, sistem akan membuat atau memperbarui jadwal pada Google Calendar.

---

## Google Drive

Digunakan sebagai media distribusi hasil foto dan video.

Admin akan menempelkan tautan Google Drive ke dalam sistem setelah proses editing selesai.

---

# Karakteristik Produk

Produk ini memiliki beberapa karakteristik utama.

## Sederhana

Antarmuka dibuat sesederhana mungkin agar mudah dipahami.

---

## Cepat

Admin harus dapat menyelesaikan pekerjaan dengan jumlah klik seminimal mungkin.

---

## Terstruktur

Seluruh proses mengikuti alur kerja yang jelas dan konsisten.

---

## Transparan

Baik admin maupun klien selalu mengetahui status terbaru dari proses yang sedang berjalan.

---

## Otomatis

Segala proses yang dapat diotomatisasi akan dilakukan oleh sistem tanpa mengurangi kendali admin.

---

# Batasan Sistem MVP

Agar pengembangan tetap fokus, beberapa fitur tidak termasuk dalam versi pertama (MVP).

Fitur yang **tidak** termasuk:

- Manajemen freelancer
- Penentuan ketersediaan sesi secara otomatis
- Chat internal
- Payment Gateway
- Upload file langsung ke Google Drive
- Aplikasi mobile
- AI Assistant

Fitur-fitur tersebut dapat dipertimbangkan pada versi berikutnya.

---

# Definisi Keberhasilan Produk

Produk dianggap berhasil apabila mampu:

- mengurangi pekerjaan administratif harian admin
- mempercepat proses penerimaan klien
- mengurangi kesalahan pencatatan
- mempermudah pemantauan pendapatan
- mempermudah pengelolaan jadwal studio
- mengurangi pekerjaan manual yang berulang

---

# Ringkasan

Lovery Studio Management System merupakan Digital Operating System yang dirancang untuk membantu Lovery Photography menjalankan operasional studio secara lebih efisien.

Fokus utama sistem bukan menambah fitur sebanyak mungkin, melainkan menciptakan pengalaman kerja yang lebih sederhana, lebih cepat, dan lebih terorganisir bagi admin, tanpa mengubah kebiasaan kerja yang sudah berjalan.

Dokumen berikutnya akan membahas secara rinci bagaimana proses operasional Lovery Photography berjalan saat ini sebelum sistem ini dibangun.
