import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // ─── Admin ───────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12)
  const admin = await prisma.admin.upsert({
    where: { email: "admin@lovery.com" },
    update: {},
    create: {
      name: "Admin Lovery",
      email: "admin@lovery.com",
      passwordHash,
      role: "OWNER",
    },
  })
  console.log(`  ✅ Admin: ${admin.email}`)

  // ─── Packages ─────────────────────────────────────
  const packagesData = [
    // Graduation (6)
    { id: "pkg-grad-short", name: "Short Session", category: "Graduation", description: "1 wisudawan/ti, 30 menit, 15 foto edited, unlimited file via Gdrive.", price: 195000 },
    { id: "pkg-grad-personal", name: "Personal", category: "Graduation", description: "1 wisudawan/ti, 60 menit, 30 foto edited, unlimited file via Gdrive, foto bersama keluarga/teman. BONUS: 1 foto diedit DI HARI H!", price: 300000 },
    { id: "pkg-grad-premium-short", name: "Premium Short Session", category: "Graduation", description: "1 wisudawan/ti, 30 menit, 15 foto edited, 1 assistant, lighting support, unlimited file via Gdrive.", price: 290000 },
    { id: "pkg-grad-premium", name: "Personal Premium", category: "Graduation", description: "1 wisudawan/ti, 60 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive. BONUS: 1 foto diedit DI HARI H!", price: 500000 },
    { id: "pkg-grad-couple", name: "Couple", category: "Graduation", description: "2 wisudawan/ti, 60 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive.", price: 650000 },
    { id: "pkg-grad-group", name: "Group", category: "Graduation", description: "4-6 wisudawan/ti, 90 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive.", price: 725000 },
    // Casual (3)
    { id: "pkg-casual-personal", name: "Personal Reguler", category: "Casual", description: "1 orang, 60 menit, 30 foto edited, unlimited file via Gdrive, free transport area kota.", price: 300000 },
    { id: "pkg-casual-premium", name: "Personal Premium", category: "Casual", description: "1 orang, 60 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive, free transport area kota.", price: 500000 },
    { id: "pkg-casual-group", name: "Group & Family", category: "Casual", description: "4-6 orang, 90 menit, 30 foto edited, 1 assistant, lighting support, unlimited file via Gdrive, free transport area kota.", price: 725000 },
    // Wedding (8)
    { id: "pkg-wed-prewed-bronze", name: "Prewedding Bronze", category: "Wedding", description: "1 fotografer, stand by 2 jam, 1 lokasi, 40 foto edited, unlimited file via Gdrive, free transport DIY.", price: 650000 },
    { id: "pkg-wed-prewed-silver", name: "Prewedding Silver", category: "Wedding", description: "1 fotografer + 1 videografer, video cinematic 1 menit, 40 foto edited, stand by 3 jam, 1 lokasi, free transport DIY.", price: 1450000 },
    { id: "pkg-wed-engage-bronze", name: "Engagement Bronze", category: "Wedding", description: "1 fotografer, stand by 4 jam, 1 lokasi, 60 foto edited, unlimited file via Gdrive, free transport DIY.", price: 850000 },
    { id: "pkg-wed-engage-silver", name: "Engagement Silver", category: "Wedding", description: "1 fotografer + 1 videografer, video cinematic 1 menit, 60 foto edited, stand by 4 jam, 1 lokasi, free transport DIY.", price: 1750000 },
    { id: "pkg-wed-gold", name: "Gold (Akad Only)", category: "Wedding", description: "2 fotografer + 1 videografer, video cinematic 1 menit, stand by 6-7 jam, 100 foto edited, free transport DIY.", price: 3500000 },
    { id: "pkg-wed-platinum", name: "Platinum (Resepsi)", category: "Wedding", description: "2 fotografer + 1 videografer, video cinematic 2 menit, stand by 8-9 jam.", price: 4500000 },
    { id: "pkg-wed-diamond", name: "Diamond (Akad+Resepsi)", category: "Wedding", description: "2 fotografer + 1 videografer, video cinematic 3-4 menit, stand by 10-12 jam, 200 foto edited, free transport DIY.", price: 5500000 },
    { id: "pkg-wed-yps", name: "YPS (Yang Penting Sah)", category: "Wedding", description: "1 fotografer, stand by 3 jam, 15 foto edited, free transport DIY. Khusus akad di KUA/pencatatan nikah, area Jogja.", price: 670000 },
  ]

  const packages = await Promise.all(
    packagesData.map((pkg) =>
      prisma.package.upsert({
        where: { id: pkg.id },
        update: {},
        create: { ...pkg, isActive: true },
      })
    )
  )
  console.log(`  ✅ Packages: ${packages.length} created`)

  // ─── Add-Ons ──────────────────────────────────────
  const addOnsData = [
    { id: "addon-makeup", name: "Make Up", price: 350000, description: "Rias wajah profesional untuk wisuda/casual session." },
    { id: "addon-hairdo", name: "Hair Do", price: 175000, description: "Tata rambut untuk wisuda/casual session." },
    { id: "addon-content-creator", name: "Content Creator", price: 200000, description: "Dokumentasi tambahan berupa konten untuk media sosial (Reels, Story, dll)." },
    { id: "addon-video-cinematic", name: "Video Cinematic", price: 650000, description: "Video cinematic 1-2 menit dengan editing profesional." },
    { id: "addon-extra-10", name: "Extra 10 Menit", price: 100000, description: "Tambahan 10 menit sesi foto. Rp50.000 untuk paket reguler." },
    { id: "addon-foto-edit", name: "Foto Edit Tambahan", price: 10000, description: "Tambahan foto edit per file. Minimal 10 file." },
    { id: "addon-extra-person", name: "Tambah Orang", price: 35000, description: "Tambahan 1 orang untuk paket group/family." },
  ]

  const addOns = await Promise.all(
    addOnsData.map((a) =>
      prisma.addOn.upsert({
        where: { id: a.id },
        update: {},
        create: { ...a, isActive: true },
      })
    )
  )
  console.log(`  ✅ AddOns: ${addOns.length} created`)

  // ─── Settings ─────────────────────────────────────
  const settings = await prisma.settings.upsert({
    where: { id: "settings-default" },
    update: {},
    create: {
      id: "settings-default",
      studioName: "Lovery Photography",
      whatsapp: "6281234567890",
      bankName: "BCA",
      bankAccount: "1234567890",
      bankHolder: "Lovery Photography",
      businessHourStart: "08:00",
      businessHourEnd: "20:00",
    },
  })
  console.log(`  ✅ Settings: ${settings.studioName}`)

  console.log("\n🎉 Seed selesai!")
}

main()
  .catch((e) => {
    console.error("❌ Seed gagal:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
