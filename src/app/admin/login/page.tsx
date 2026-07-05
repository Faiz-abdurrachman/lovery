"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid"),
  password: z
    .string()
    .min(1, "Password wajib diisi"),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    setError("")

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      setError("Email atau password salah")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:20px_20px] px-4">
      <div className="w-full max-w-md bg-white border-4 border-black shadow-[12px_12px_0_0_#111111] p-8 md:p-10 relative overflow-hidden">
        {/* Tape decor */}
        <div className="absolute top-0 right-0 w-24 h-6 bg-lovery-pink transform rotate-45 translate-x-6 -translate-y-2 border-y-2 border-black z-10" />

        <div className="text-center space-y-4 mb-10">
          <div className="mx-auto w-24 h-24 bg-lovery-pink border-4 border-black shadow-[6px_6px_0_0_#111111] flex items-center justify-center p-3 -skew-y-3">
            <img src="/LOGO.png" alt="Lovery" className="w-full h-full object-contain" />
          </div>
          <div className="pt-4">
            <h1 className="text-2xl md:text-3xl font-heading font-black text-black uppercase tracking-widest">
              Lovery
            </h1>
            <h2 className="text-xl md:text-2xl font-heading font-black text-white bg-black inline-block px-3 py-1 uppercase tracking-widest -skew-x-6 mt-2 border-2 border-black shadow-[4px_4px_0_0_#E89CC9]">
              Admin Login
            </h2>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {error && (
            <div className="bg-red-500 border-4 border-black shadow-[4px_4px_0_0_#111111] px-4 py-3 text-sm font-bold text-white uppercase tracking-widest text-center">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="email" className="font-accent font-black uppercase tracking-widest text-sm text-black inline-block mb-1 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ADMIN@LOVERY.COM"
              autoComplete="email"
              className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0_0_#111111] focus:bg-white focus:ring-0 focus:border-black focus:shadow-[6px_6px_0_0_#E89CC9] transition-all h-14 px-4 text-black font-body font-bold text-base placeholder:text-gray-400 placeholder:font-bold"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-xs font-black text-white bg-black px-2 py-1 uppercase inline-block shadow-[2px_2px_0_0_#E89CC9] mt-2">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="font-accent font-black uppercase tracking-widest text-sm text-black inline-block mb-1 bg-white border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="rounded-none border-4 border-black bg-white shadow-[6px_6px_0_0_#111111] focus:bg-white focus:ring-0 focus:border-black focus:shadow-[6px_6px_0_0_#E89CC9] transition-all h-14 px-4 text-black font-body font-bold text-base placeholder:text-gray-400"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-xs font-black text-white bg-black px-2 py-1 uppercase inline-block shadow-[2px_2px_0_0_#E89CC9] mt-2">{errors.password.message}</p>
            )}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-black hover:bg-lovery-pink text-white hover:text-black border-4 border-black rounded-none shadow-[8px_8px_0_0_#E89CC9] hover:shadow-[8px_8px_0_0_#111111] h-16 font-accent font-black text-xl uppercase tracking-widest transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-3 h-6 w-6 animate-spin" />}
              MASUK AREA ADMIN
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
