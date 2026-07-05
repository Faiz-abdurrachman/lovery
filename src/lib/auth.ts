import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { supabaseAdmin } from "@/lib/supabase-server"
import bcrypt from "bcryptjs"
import { authConfig } from "@/lib/auth.config"

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: admin } = await supabaseAdmin
          .from("admins")
          .select("*")
          .eq("email", credentials.email as string)
          .single()

        if (!admin) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash
        )

        if (!isValid) return null

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
      },
    }),
  ],
})
