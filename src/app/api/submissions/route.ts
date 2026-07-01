import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { submissionSchema } from "@/features/submission/schemas/submission.schema"

function generateNumber(prefix: string, year: number, seq: number): string {
  return `${prefix}-${String(seq).padStart(4, "0")}-${year}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Convert ISO date string from JSON to Date object (Zod 4 requires Date, not string)
    if (body.eventDate && typeof body.eventDate === "string") {
      body.eventDate = new Date(body.eventDate)
    }

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

    if (!data.agreedTerms) {
      return NextResponse.json(
        {
          success: false,
          message: "Anda harus menyetujui Syarat & Ketentuan",
        },
        { status: 400 }
      )
    }

    const year = new Date().getFullYear()

    // Upsert client
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert(
        {
          phone: data.phone,
          name: data.name,
          instagram: data.instagram || null,
          allowPublish: data.allowPublish,
          clientNumber: "",
          updatedAt: new Date().toISOString(),
        },
        { onConflict: "phone" }
      )
      .select()
      .single()

    if (clientError) throw clientError

    // Update client number for new clients
    if (!client.clientNumber || client.clientNumber === "") {
      const { count } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })

      await supabase
        .from("clients")
        .update({ clientNumber: `CLI-${String((count || 0)).padStart(5, "0")}` })
        .eq("id", client.id)
    }

    // Generate submission number
    const { count: subCount } = await supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })

    const subNumber = generateNumber("LVR", year, (subCount || 0) + 1)

    // Get addon prices
    let addonPrices: Record<string, number> = {}
    if (data.addonIds.length > 0) {
      const { data: addons } = await supabase
        .from("add_ons")
        .select("id,price")
        .in("id", data.addonIds)

      if (addons) {
        addonPrices = Object.fromEntries(addons.map((a: { id: string; price: number }) => [a.id, a.price]))
      }
    }

    // Create submission
    const { data: submission, error: subError } = await supabase
      .from("submissions")
      .insert({
        submissionNumber: subNumber,
        clientId: client.id,
        packageId: data.packageId,
        eventName: data.eventName,
        eventDate: data.eventDate.toISOString().split("T")[0],
        eventTime: data.eventTime,
        location: data.location,
        specialRequest: data.specialRequest || null,
        status: "PENDING_REVIEW",
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single()

    if (subError) throw subError

    // Create submission addons
    if (data.addonIds.length > 0) {
      await supabase.from("submission_add_ons").insert(
        data.addonIds.map((id: string) => ({
          submissionId: submission.id,
          addonId: id,
          priceSnapshot: addonPrices[id] || 0,
        }))
      )
    }

    // Create timeline
    await supabase.from("timelines").insert({
      submissionId: submission.id,
      activity: "Pengajuan dibuat",
      description: "Klien mengirim pengajuan sesi",
    })

    return NextResponse.json(
      {
        success: true,
        data: submission,
        message: "Pengajuan berhasil dikirim",
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[CREATE SUBMISSION ERROR]", {
      message: error?.message || "Unknown",
      code: error?.code,
      details: error?.details,
      hint: error?.hint,
    })
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan server",
        debug: process.env.NODE_ENV !== "production" ? error?.message : undefined,
      },
      { status: 500 }
    )
  }
}
