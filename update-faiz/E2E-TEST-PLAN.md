# E2E Test Plan — Lovery Studio Management System

**Date:** 5 Juli 2026
**Base URL:** http://localhost:3001
**Tool:** Playwright Browser via MCP

## Flow 1: Landing Page & Navigation
1. Open homepage → verify Hero, Navbar, Portfolio, About, Services, FAQ, CTA, Footer
2. Click "Lihat Portfolio" → scroll to portfolio section
3. Click "Ajukan Sesi" button in navbar → navigate to /ajukan-sesi

## Flow 2: Client 5-Step Submission
4. Step 1 - Paket: Select "Graduation Basic" (pkg-graduation-basic)
5. Step 2 - Add-On: Select "Drone" and "Extra Foto"
6. Step 3 - Data Diri: Fill name, phone, instagram
7. Step 4 - Acara: Fill event name, date, time, location
8. Step 5 - Konfirmasi: Verify price summary, agree terms, submit
9. Record submission number from redirect

## Flow 3: Status Tracking (Public)
10. Open /status → enter submission number + phone
11. Click "Lacak Status" → verify status = "Menunggu Review"

## Flow 4: Admin Login
12. Open /admin/login → enter admin@lovery.com / admin123
13. Click "Masuk" → verify redirect to /admin dashboard

## Flow 5: Admin Dashboard
14. Verify widget counts appear
15. Verify "Pengajuan Baru" count > 0

## Flow 6: Admin Review Submission
16. Open /admin/pengajuan → see submission list
17. Click submission detail → verify timeline, client info, package info
18. Click "Terima Pengajuan" → confirm → verify status changes

## Flow 7: Admin Invoice & Payment
19. Open /admin/invoice → see invoice list
20. Click invoice detail → verify invoice data
21. Record payment DP → verify status update
22. Record payment PELUNASAN → verify status update

## Flow 8: Verify Status Updated
23. Open /status → track again → verify new status
