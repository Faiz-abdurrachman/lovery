import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import type { Prisma, SubmissionStatus } from "@prisma/client"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Tidak diizinkan" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: Prisma.SubmissionWhereInput = {
      deletedAt: null,
    }

    if (status) {
      where.status = status as SubmissionStatus
    }

    if (search) {
      where.OR = [
        { submissionNumber: { contains: search, mode: "insensitive" } },
        { client: { name: { contains: search, mode: "insensitive" } } },
        { client: { phone: { contains: search } } },
        { eventName: { contains: search, mode: "insensitive" } },
      ]
    }

    const [items, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        include: {
          client: {
            select: { id: true, name: true, phone: true },
          },
          package: {
            select: { id: true, name: true, category: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.submission.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: { items, total, page, limit },
    })
  } catch (error) {
    console.error("List submissions error:", error)
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
