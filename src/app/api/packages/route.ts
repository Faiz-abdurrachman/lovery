import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("isActive", true)
      .order("category", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Get packages error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    )
  }
}
