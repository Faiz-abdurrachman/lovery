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
  const packages = await Promise.all([
    prisma.package.upsert({
      where: { id: "pkg-graduation-basic" },
      update: {},
      create: {
        id: "pkg-graduation-basic",
        name: "Graduation Basic",
        category: "Graduation",
        description:
          "Paket foto wisuda basic. Cocok untuk dokumentasi sederhana bersama keluarga dan teman.",
        price: 500000,
        isActive: true,
      },
    }),
    prisma.package.upsert({
      where: { id: "pkg-graduation-premium" },
      update: {},
      create: {
        id: "pkg-graduation-premium",
        name: "Graduation Premium",
        category: "Graduation",
        description:
          "Paket foto wisuda premium. Termasuk foto di 2 lokasi dan video highlight pendek.",
        price: 750000,
        isActive: true,
      },
    }),
    prisma.package.upsert({
      where: { id: "pkg-casual-session" },
      update: {},
      create: {
        id: "pkg-casual-session",
        name: "Casual Session",
        category: "Casual",
        description:
          "Paket foto casual untuk segala kebutuhan. Santai, natural, dan personal.",
        price: 400000,
        isActive: true,
      },
    }),
    prisma.package.upsert({
      where: { id: "pkg-wedding" },
      update: {},
      create: {
        id: "pkg-wedding",
        name: "Wedding Package",
        category: "Wedding",
        description:
          "Paket foto pernikahan lengkap. Dokumentasi dari persiapan hingga resepsi.",
        price: 2000000,
        isActive: true,
      },
    }),
  ])
  console.log(`  ✅ Packages: ${packages.length} created`)

  // ─── Add-Ons ──────────────────────────────────────
  const addOns = await Promise.all([
    prisma.addOn.upsert({
      where: { id: "addon-drone" },
      update: {},
      create: {
        id: "addon-drone",
        name: "Drone",
        price: 300000,
        description: "Foto dan video udara menggunakan drone.",
        isActive: true,
      },
    }),
    prisma.addOn.upsert({
      where: { id: "addon-extra-jam" },
      update: {},
      create: {
        id: "addon-extra-jam",
        name: "Extra Jam",
        price: 150000,
        description: "Tambahan 1 jam sesi foto.",
        isActive: true,
      },
    }),
    prisma.addOn.upsert({
      where: { id: "addon-video-highlight" },
      update: {},
      create: {
        id: "addon-video-highlight",
        name: "Video Highlight",
        price: 250000,
        description: "Video highlight 1-2 menit dari momen terbaik.",
        isActive: true,
      },
    }),
    prisma.addOn.upsert({
      where: { id: "addon-cetak-album" },
      update: {},
      create: {
        id: "addon-cetak-album",
        name: "Cetak Album",
        price: 200000,
        description: "Album cetak ukuran 20x30 cm, 20 halaman.",
        isActive: true,
      },
    }),
    prisma.addOn.upsert({
      where: { id: "addon-extra-foto" },
      update: {},
      create: {
        id: "addon-extra-foto",
        name: "Extra Foto",
        price: 100000,
        description: "Tambahan 20 file foto yang diedit.",
        isActive: true,
      },
    }),
  ])
  console.log(`  ✅ Add-Ons: ${addOns.length} created`)

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
