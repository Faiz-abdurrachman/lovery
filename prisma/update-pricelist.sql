-- ============================================================
-- UPDATE PRICELIST — Sesuai Pricelist Asli Lovery Photography
-- ============================================================
-- 1. Nonaktifkan paket lama (jangan dihapus, submission lama
--    masih referensi ID ini)
UPDATE packages SET "isActive" = false WHERE "isActive" = true;

-- 2. Insert 17 paket baru
INSERT INTO packages (id, name, category, description, price, "isActive", "createdAt", "updatedAt") VALUES

-- GRADUATION (6)
('pkg-grad-short', 'Short Session', 'Graduation', '1 wisudawan/ti, 30 menit, 15 foto edited, unlimited file via Gdrive. Cocok untuk yang hanya ingin foto cepat.', 195000, true, NOW(), NOW()),
('pkg-grad-personal', 'Personal', 'Graduation', '1 wisudawan/ti, 60 menit, 30 foto edited, unlimited file via Gdrive, foto bersama keluarga/teman.', 300000, true, NOW(), NOW()),
('pkg-grad-premium-short', 'Premium Short Session', 'Graduation', '1 wisudawan/ti, 30 menit, 15 foto edited, 1 assistant, lighting support (flash eksternal), unlimited file via Gdrive. BONUS 1 foto diedit di hari H.', 290000, true, NOW(), NOW()),
('pkg-grad-premium', 'Personal Premium', 'Graduation', '1 wisudawan/ti, 60 menit, 30 foto edited, 1 assistant, lighting support (flash eksternal), unlimited file via Gdrive.', 500000, true, NOW(), NOW()),
('pkg-grad-couple', 'Couple', 'Graduation', '2 wisudawan/ti, 60 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive.', 650000, true, NOW(), NOW()),
('pkg-grad-group', 'Group', 'Graduation', '4-6 wisudawan/ti, 90 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive.', 725000, true, NOW(), NOW()),

-- CASUAL / PERSONAL (3)
('pkg-casual-personal', 'Personal Reguler', 'Casual', '1 orang, 60 menit, 30 foto edited, unlimited file via Gdrive, free transport area kota.', 300000, true, NOW(), NOW()),
('pkg-casual-premium', 'Personal Premium', 'Casual', '1 orang, 60 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive, free transport area kota.', 500000, true, NOW(), NOW()),
('pkg-casual-group', 'Group & Family', 'Casual', '4-6 orang, 90 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive, free transport area kota.', 725000, true, NOW(), NOW()),

-- WEDDING (8)
('pkg-wed-prewed-bronze', 'Prewedding Bronze', 'Wedding', '1 fotografer, stand by 2 jam, 1 lokasi, 40 foto edited, unlimited file via Gdrive, free transport DIY.', 650000, true, NOW(), NOW()),
('pkg-wed-prewed-silver', 'Prewedding Silver', 'Wedding', '1 fotografer + 1 videografer, video cinematic 1 menit, 40 foto edited, stand by 3 jam, 1 lokasi, unlimited file via Gdrive, free transport DIY.', 1450000, true, NOW(), NOW()),
('pkg-wed-engage-bronze', 'Engagement Bronze', 'Wedding', '1 fotografer, stand by 4 jam, 1 lokasi, 60 foto edited, unlimited file via Gdrive, free transport DIY.', 850000, true, NOW(), NOW()),
('pkg-wed-engage-silver', 'Engagement Silver', 'Wedding', '1 fotografer + 1 videografer, video cinematic 1 menit, 60 foto edited, stand by 4 jam, 1 lokasi, unlimited file via Gdrive, free transport DIY.', 1750000, true, NOW(), NOW()),
('pkg-wed-gold', 'Gold (Akad Only)', 'Wedding', '2 fotografer + 1 videografer, video cinematic 1 menit, stand by 6-7 jam, 100 foto edited, unlimited file via Gdrive, free transport DIY.', 3500000, true, NOW(), NOW()),
('pkg-wed-platinum', 'Platinum (Resepsi)', 'Wedding', '2 fotografer + 1 videografer, video cinematic 2 menit, stand by 8-9 jam.', 4500000, true, NOW(), NOW()),
('pkg-wed-diamond', 'Diamond (Akad+Resepsi)', 'Wedding', '2 fotografer + 1 videografer, video cinematic 3-4 menit, stand by 10-12 jam, 200 foto edited, unlimited file via Gdrive, free transport DIY.', 5500000, true, NOW(), NOW()),
('pkg-wed-yps', 'YPS (Yang Penting Sah)', 'Wedding', '1 fotografer, stand by 3 jam, 15 foto edited, unlimited file via Gdrive, free transport DIY. Khusus akad di KUA/pencatatan nikah, area Jogja kota & ringroad.', 670000, true, NOW(), NOW());

-- ============================================================
-- UPDATE ADD-ONS — Sesuai Pricelist
-- ============================================================
-- Nonaktifkan add-on lama
UPDATE add_ons SET "isActive" = false WHERE "isActive" = true;

-- Insert add-on baru
INSERT INTO add_ons (id, name, price, description, "isActive", "createdAt", "updatedAt") VALUES
('addon-makeup', 'Make Up', 350000, 'Rias wajah profesional untuk wisuda/casual session.', true, NOW(), NOW()),
('addon-hairdo', 'Hair Do', 175000, 'Tata rambut untuk wisuda/casual session.', true, NOW(), NOW()),
('addon-content-creator', 'Content Creator', 200000, 'Dokumentasi tambahan berupa konten untuk media sosial (Reels, Story, dll).', true, NOW(), NOW()),
('addon-video-cinematic', 'Video Cinematic', 650000, 'Video cinematic 1-2 menit dengan editing profesional.', true, NOW(), NOW()),
('addon-extra-10', 'Extra 10 Menit', 100000, 'Tambahan 10 menit sesi foto (harga premium). Tersedia juga Rp50.000 untuk paket reguler — diskusikan dengan admin.', true, NOW(), NOW()),
('addon-foto-edit', 'Foto Edit Tambahan', 10000, 'Tambahan foto edit per file. Minimal 10 file.', true, NOW(), NOW()),
('addon-extra-person', 'Tambah Orang', 35000, 'Tambahan 1 orang untuk paket group/family. Berlaku untuk Casual.', true, NOW(), NOW());
