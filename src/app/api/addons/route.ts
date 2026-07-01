import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("add_ons")
      .select("*")
      .eq("isActive", true)
      .order("name", { ascending: true })

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("Get addons error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan" },
      { status: 500 }
    )
  }
}
