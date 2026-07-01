import { supabase } from "@/lib/supabase"

export async function fetchPackages() {
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("isActive", true)
    .order("category", { ascending: true })

  if (error) {
    console.error("fetchPackages error:", error)
    return []
  }

  return data || []
}
