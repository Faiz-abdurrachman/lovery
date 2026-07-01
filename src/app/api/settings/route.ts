import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { settingsSchema } from "@/features/settings/schemas/settings.schema"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    let settings = await prisma.settings.findFirst()

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          studioName: "Lovery Photography",
          whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
        },
      })
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Get settings error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const body = await request.json()
    const parsed = settingsSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validasi gagal", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = parsed.data
    let settings = await prisma.settings.findFirst()

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          studioName: data.studioName || "Lovery Photography",
          whatsapp: data.whatsapp || "6281234567890",
          bankName: data.bankName || undefined,
          bankAccount: data.bankAccount || undefined,
          bankHolder: data.bankHolder || undefined,
          qrisImage: data.qrisImage || undefined,
          googleCalendarId: data.googleCalendarId || undefined,
          googleDriveFolder: data.googleDriveFolder || undefined,
          businessHourStart: data.businessHourStart || undefined,
          businessHourEnd: data.businessHourEnd || undefined,
        },
      })
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          studioName: data.studioName ?? settings.studioName,
          whatsapp: data.whatsapp ?? settings.whatsapp,
          bankName: data.bankName !== undefined ? data.bankName || null : settings.bankName,
          bankAccount: data.bankAccount !== undefined ? data.bankAccount || null : settings.bankAccount,
          bankHolder: data.bankHolder !== undefined ? data.bankHolder || null : settings.bankHolder,
          qrisImage: data.qrisImage !== undefined ? data.qrisImage || null : settings.qrisImage,
          googleCalendarId: data.googleCalendarId !== undefined ? data.googleCalendarId || null : settings.googleCalendarId,
          googleDriveFolder: data.googleDriveFolder !== undefined ? data.googleDriveFolder || null : settings.googleDriveFolder,
          businessHourStart: data.businessHourStart !== undefined ? data.businessHourStart || null : settings.businessHourStart,
          businessHourEnd: data.businessHourEnd !== undefined ? data.businessHourEnd || null : settings.businessHourEnd,
        },
      })
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
