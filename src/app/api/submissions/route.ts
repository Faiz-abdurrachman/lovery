import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { submissionSchema } from "@/features/submission/schemas/submission.schema"
import { Prisma } from "@prisma/client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = submissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validasi gagal",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = parsed.data

    const submissionNumber = await generateSubmissionNumber()

    const result = await prisma.$transaction(async (tx: any) => {
      const client = await tx.client.upsert({
        where: { phone: data.phone },
        update: {
          name: data.name,
          instagram: data.instagram || undefined,
          allowPublish: data.allowPublish,
        },
        create: {
          clientNumber: await generateClientNumber(),
          name: data.name,
          phone: data.phone,
          instagram: data.instagram || undefined,
          allowPublish: data.allowPublish,
        },
      })

      const submission = await tx.submission.create({
        data: {
          submissionNumber,
          clientId: client.id,
          packageId: data.packageId,
          eventName: data.eventName,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          location: data.location,
          specialRequest: data.specialRequest || undefined,
          status: "PENDING_REVIEW",
          submissionAddOns: {
            create: data.addonIds.map((addonId: string) => ({
              addonId,
              priceSnapshot: 0,
            })),
          },
        },
        include: {
          submissionAddOns: true,
        },
      })

      if (data.addonIds.length > 0) {
        const addOns = await tx.addOn.findMany({
          where: { id: { in: data.addonIds } },
        })

        for (const item of submission.submissionAddOns) {
          const addon = addOns.find((a: { id: string }) => a.id === item.addonId)
          if (addon) {
            await tx.submissionAddOn.update({
              where: {
                submissionId_addonId: {
                  submissionId: submission.id,
                  addonId: item.addonId,
                },
              },
              data: { priceSnapshot: addon.price },
            })
          }
        }
      }

      await tx.timeline.create({
        data: {
          submissionId: submission.id,
          activity: "Pengajuan dibuat",
          description: "Klien mengirim pengajuan sesi",
        },
      })

      return { submission, client }
    })

    return NextResponse.json(
      {
        success: true,
        data: result.submission,
        message: "Pengajuan berhasil dikirim",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Create submission error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}

async function generateSubmissionNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const count = await prisma.submission.count({
    where: { createdAt: { gte: new Date(`${year}-01-01`) } },
  })
  const seq = String(count + 1).padStart(4, "0")
  return `LVR-${seq}-${year}`
}

async function generateClientNumber(): Promise<string> {
  const count = await prisma.client.count()
  const seq = String(count + 1).padStart(5, "0")
  return `CLI-${seq}`
}
