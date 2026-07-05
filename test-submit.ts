import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

async function run() {
  try {
    const data = {
      phone: "08123456789",
      name: "Test User",
      instagram: "testuser",
      allowPublish: true,
      packageId: "pkg-casual-personal",
      addonIds: [],
      eventName: "Test Event",
      eventDate: new Date("2026-07-28"),
      eventTime: "10:00",
      location: "Jakarta",
      specialRequest: "",
      agreedTerms: true
    }

    let { data: client } = await supabase
      .from("clients")
      .select("id, clientNumber")
      .eq("phone", data.phone)
      .maybeSingle()

    if (client) {
      console.log("Client exists")
    } else {
      console.log("Creating client")
      const { data: newClient, error: clientError } = await supabase
        .from("clients")
        .insert({
          id: crypto.randomUUID(),
          phone: data.phone,
          name: data.name,
          instagram: data.instagram || null,
          allowPublish: data.allowPublish,
          clientNumber: "",
          updatedAt: new Date().toISOString(),
        })
        .select()
        .single()
      if (clientError) throw clientError
      client = newClient
    }

    console.log("Creating submission")
    const ts = Date.now().toString(36).toUpperCase().slice(-5)
    const subNumber = `LVR-${ts}-2026`

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
    console.log("Success", submission)
  } catch (err) {
    console.error("ERROR", err)
  }
}
run()
