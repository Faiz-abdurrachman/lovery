import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin as supabase } from "@/lib/supabase-server"
import { submissionSchema } from "@/features/submission/schemas/submission.schema"

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

    // Check if client already exists
    let { data: client } = await supabase
      .from("clients")
      .select("id, clientNumber")
      .eq("phone", data.phone)
      .maybeSingle()

    if (client) {
      // Update existing client
      await supabase.from("clients").update({
        name: data.name,
        instagram: data.instagram || null,
        allowPublish: data.allowPublish,
        updatedAt: new Date().toISOString(),
      }).eq("id", client.id).select().single()
    } else {
      // Create new client with UUID and generated clientNumber
      const tsClient = Date.now().toString(36).toUpperCase().slice(-5)
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          id: crypto.randomUUID(),
          phone: data.phone,
          name: data.name,
          instagram: data.instagram || null,
          allowPublish: data.allowPublish,
          clientNumber: `CLI-${tsClient}`,
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single()

      if (clientError) throw clientError
      client = newClient
    }

    if (!client) {
      return NextResponse.json({ success: false, message: "Gagal membuat data klien" }, { status: 500 })
    }

    // Generate submission number — pake timestamp biar unique
    const ts = Date.now().toString(36).toUpperCase().slice(-5)
    const subNumber = `LVR-${ts}-${year}`

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
        id: crypto.randomUUID(),
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
      id: crypto.randomUUID(),
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
        debug: error?.message || error?.details || JSON.stringify(error),
      },
      { status: 500 }
    )
  }
}
