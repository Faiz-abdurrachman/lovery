import { NextResponse } from "next/server"
import { Pool } from "pg"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || ""
  const masked = dbUrl.replace(/:[^:@]+@/, ":****@")

  try {
    const pool = new Pool({ connectionString: dbUrl, max: 1, connectionTimeoutMillis: 5000 })
    const result = await pool.query("SELECT id, name FROM packages LIMIT 2")
    await pool.end()
    return NextResponse.json({ success: true, url: masked, data: result.rows })
  } catch (error: unknown) {
    const e = error as Error
    return NextResponse.json({
      success: false,
      url: masked,
      error: e.message,
    }, { status: 500 })
  }
}
