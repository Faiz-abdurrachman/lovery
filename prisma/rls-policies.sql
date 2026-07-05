-- ============================================================
-- LOVERY RLS POLICIES
-- Jalankan ini di Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Enable RLS on ALL tables
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submission_add_ons ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- CATATAN: Semua admin & client submission API routes 
-- sekarang pake supabaseAdmin (service_role key) yang bypass RLS.
-- Anon key cuma dipake untuk:
--   1. Public listing packages (paket/page.tsx)
--   2. Public listing add-ons (tapi via API routes)
--   3. Landing page (server components)
-- Jadi anon c butuh SELECT di packages & add_ons.
-- ============================================================

-- ============================================================
-- PACKAGES — public read only
-- ============================================================
CREATE POLICY "Public can read packages" ON packages
  FOR SELECT USING (true);

-- ============================================================
-- ADD_ONS — public read only
-- ============================================================
CREATE POLICY "Public can read add_ons" ON add_ons
  FOR SELECT USING (true);

-- ============================================================
-- Default: deny all for other tables (anon can't access)
-- Semua akses lain via supabaseAdmin (service role)
-- ============================================================
