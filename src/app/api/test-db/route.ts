import { NextResponse } from "next/server"
import { Pool } from "pg"

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL
    const pool = new Pool({ connectionString: dbUrl, max: 1 })
    const result = await pool.query("SELECT id, name, price FROM packages LIMIT 2")
    await pool.end()
    return NextResponse.json({ success: true, data: result })
  } catch (error: unknown) {
    const e = error as Error
    return NextResponse.json({
      success: false,
      error: e.message,
      stack: e.stack?.split("\n").slice(0, 3),
    }, { status: 500 })
  }
}
