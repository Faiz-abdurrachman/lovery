import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    success: true,
    dbUrl: (process.env.DATABASE_URL || "NOT SET").replace(/:[^:@]+@/, ":****@"),
    nodeEnv: process.env.NODE_ENV,
  })
}
