import { google } from "googleapis"
import { format } from "date-fns"

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
  const calendarId = process.env.GOOGLE_CALENDAR_ID

  if (!clientEmail || !privateKey || !calendarId) {
    return null
  }

  try {
    return new google.auth.GoogleAuth({
      credentials: { client_email: clientEmail, private_key: privateKey },
      scopes: ["https://www.googleapis.com/auth/calendar"],
    })
  } catch {
    return null
  }
}

export async function createCalendarEvent(data: {
  eventName: string
  clientName: string
  clientPhone: string
  packageName: string
  addOnNames: string[]
  eventDate: Date
  eventTime: string
  location: string
  specialRequest: string | null
  submissionNumber: string
  invoiceNumber: string
}): Promise<string | null> {
  const auth = getAuth()
  if (!auth) {
    console.warn("Google Calendar: credentials not configured, skipping event creation")
    return null
  }

  try {
    const calendar = google.calendar({ version: "v3", auth })
    const calendarId = process.env.GOOGLE_CALENDAR_ID!

    const [hours, minutes] = data.eventTime.split(":")
    const hour = hours.padStart(2, "0")
    const minute = minutes.padStart(2, "0")
    const dateStr = format(new Date(data.eventDate), "yyyy-MM-dd")
    const startDateTime = `${dateStr}T${hour}:${minute}:00+07:00`
    const endHour = String((parseInt(hours) + 2) % 24).padStart(2, "0")
    const endDateTime = `${dateStr}T${endHour}:${minute}:00+07:00`

    const description = [
      `Klien: ${data.clientName}`,
      `WhatsApp: ${data.clientPhone}`,
      `Paket: ${data.packageName}`,
      (data.addOnNames || []).length > 0
        ? `Add-On: ${data.addOnNames.join(", ")}`
        : null,
      data.specialRequest ? `Request: ${data.specialRequest}` : null,
      `No. Pengajuan: ${data.submissionNumber}`,
      `No. Invoice: ${data.invoiceNumber}`,
    ]
      .filter(Boolean)
      .join("\n")

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `${data.packageName} - ${data.clientName}`,
        description,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Jakarta",
        },
        end: {
          dateTime: endDateTime,
          timeZone: "Asia/Jakarta",
        },
        location: data.location,
      },
    })

    return event.data.id || null
  } catch (error) {
    console.error("Google Calendar: failed to create event:", error)
    return null
  }
}

export async function updateCalendarEvent(
  eventId: string,
  data: {
    eventDate?: Date
    eventTime?: string
    location?: string
  }
): Promise<boolean> {
  const auth = getAuth()
  if (!auth) return false

  try {
    const calendar = google.calendar({ version: "v3", auth })
    const calendarId = process.env.GOOGLE_CALENDAR_ID!

    const updateBody: Record<string, unknown> = {}

    if (data.eventDate && data.eventTime) {
      const [hours, minutes] = data.eventTime.split(":")
      const hour = hours.padStart(2, "0")
      const minute = minutes.padStart(2, "0")
      const dateStr = format(new Date(data.eventDate), "yyyy-MM-dd")
      const startDateTime = `${dateStr}T${hour}:${minute}:00+07:00`
      const endHour = String((parseInt(hours) + 2) % 24).padStart(2, "0")
      const endDateTime = `${dateStr}T${endHour}:${minute}:00+07:00`

      updateBody.start = { dateTime: startDateTime, timeZone: "Asia/Jakarta" }
      updateBody.end = { dateTime: endDateTime, timeZone: "Asia/Jakarta" }
    }

    if (data.location) {
      updateBody.location = data.location
    }

    await calendar.events.patch({
      calendarId,
      eventId,
      requestBody: updateBody,
    })

    return true
  } catch (error) {
    console.error("Google Calendar: failed to update event:", error)
    return false
  }
}

export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  const auth = getAuth()
  if (!auth) return false

  try {
    const calendar = google.calendar({ version: "v3", auth })
    const calendarId = process.env.GOOGLE_CALENDAR_ID!

    await calendar.events.delete({
      calendarId,
      eventId,
    })

    return true
  } catch (error) {
    console.error("Google Calendar: failed to delete event:", error)
    return false
  }
}

export function getGoogleCalendarEmbedUrl(): string | null {
  const calendarId = process.env.GOOGLE_CALENDAR_ID
  if (!calendarId) return null
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(calendarId)}&ctz=Asia%2FJakarta`
}
