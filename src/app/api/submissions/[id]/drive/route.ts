import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Tidak diizinkan" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { driveLink, send } = body

    if (!driveLink || !driveLink.startsWith("https://")) {
      return NextResponse.json({ success: false, message: "Link harus URL valid" }, { status: 400 })
    }

    const { data: submission } = await supabase.from("submissions").select("*, client:clients(name,phone)").eq("id", id).single()

    if (!submission) {
      return NextResponse.json({ success: false, message: "Pengajuan tidak ditemukan" }, { status: 404 })
    }

    if (["CANCELLED", "REJECTED", "COMPLETED"].includes(submission.status)) {
      return NextResponse.json({ success: false, message: "Pengajuan sudah selesai" }, { status: 400 })
    }

    if (send && submission.status !== "EDITING") {
      return NextResponse.json({ success: false, message: "Hasil hanya bisa dikirim saat Proses Editing" }, { status: 400 })
    }

    const updateData: Record<string, unknown> = { googleDriveLink: driveLink }
    if (send) updateData.status = "DELIVERED"

    await supabase.from("submissions").update(updateData).eq("id", id)

    await supabase.from("timelines").insert({
      submissionId: id,
      activity: send ? "Hasil dikirim" : "Link Google Drive diperbarui",
      description: driveLink,
      performedById: session.user.id as string,
    })

    return NextResponse.json({
      success: true,
      data: { driveLink },
      clientName: submission.client?.name,
      clientPhone: submission.client?.phone,
    })
  } catch (error) {
    console.error("Drive link error:", error)
    return NextResponse.json({ success: false, message: "Terjadi kesalahan server" }, { status: 500 })
  }
}
