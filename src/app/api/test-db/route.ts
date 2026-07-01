import { NextResponse } from "next/server"

export async function GET() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg") as typeof import("pg")
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 1,
      connectionTimeoutMillis: 5000,
    })
    const result = await pool.query("SELECT id, name, price FROM packages LIMIT 3")
    await pool.end()
    return NextResponse.json({ success: true, driver: "pg", data: result.rows })
  } catch (e: unknown) {
    const err = e as Error
    return NextResponse.json({ success: false, driver: "pg", error: err.message }, { status: 500 })
  }
}
