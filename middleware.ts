import { auth } from "@/lib/auth-edge"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname === "/admin/login"

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.url))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    )
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/admin/:path*"],
}
