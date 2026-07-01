import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

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
    let settings = await prisma.settings.findFirst()

    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          studioName: body.studioName || "Lovery Photography",
          whatsapp: body.whatsapp || "6281234567890",
          bankName: body.bankName || undefined,
          bankAccount: body.bankAccount || undefined,
          bankHolder: body.bankHolder || undefined,
          qrisImage: body.qrisImage || undefined,
          googleCalendarId: body.googleCalendarId || undefined,
          googleDriveFolder: body.googleDriveFolder || undefined,
          businessHourStart: body.businessHourStart || undefined,
          businessHourEnd: body.businessHourEnd || undefined,
        },
      })
    } else {
      settings = await prisma.settings.update({
        where: { id: settings.id },
        data: {
          studioName: body.studioName ?? settings.studioName,
          whatsapp: body.whatsapp ?? settings.whatsapp,
          bankName: body.bankName !== undefined ? body.bankName || null : settings.bankName,
          bankAccount: body.bankAccount !== undefined ? body.bankAccount || null : settings.bankAccount,
          bankHolder: body.bankHolder !== undefined ? body.bankHolder || null : settings.bankHolder,
          qrisImage: body.qrisImage !== undefined ? body.qrisImage || null : settings.qrisImage,
          googleCalendarId: body.googleCalendarId !== undefined ? body.googleCalendarId || null : settings.googleCalendarId,
          googleDriveFolder: body.googleDriveFolder !== undefined ? body.googleDriveFolder || null : settings.googleDriveFolder,
          businessHourStart: body.businessHourStart !== undefined ? body.businessHourStart || null : settings.businessHourStart,
          businessHourEnd: body.businessHourEnd !== undefined ? body.businessHourEnd || null : settings.businessHourEnd,
        },
      })
    }

    return NextResponse.json({ success: true, data: settings })
  } catch (error) {
    console.error("Update settings error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan" }, { status: 500 })
  }
}
