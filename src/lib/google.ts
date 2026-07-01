import { google } from "googleapis"

function getAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/drive.file",
    ],
  })

  return auth
}

export const calendarClient = () =>
  google.calendar({ version: "v3", auth: getAuth() })

export const driveClient = () =>
  google.drive({ version: "v3", auth: getAuth() })
