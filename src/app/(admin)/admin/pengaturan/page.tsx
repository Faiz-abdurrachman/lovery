"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSettings, useUpdateSettings } from "@/features/settings/hooks/use-settings"
import { settingsSchema, type SettingsFormData } from "@/features/settings/schemas/settings.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"

export default function PengaturanPage() {
  const { data: settings, isLoading } = useSettings()
  const updateSettings = useUpdateSettings()

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  })

  useEffect(() => {
    if (settings) {
      form.reset({
        studioName: settings.studioName || "",
        whatsapp: settings.whatsapp || "",
        bankName: settings.bankName || "",
        bankAccount: settings.bankAccount || "",
        bankHolder: settings.bankHolder || "",
        qrisImage: settings.qrisImage || "",
        googleCalendarId: settings.googleCalendarId || "",
        googleDriveFolder: settings.googleDriveFolder || "",
        businessHourStart: settings.businessHourStart || "",
        businessHourEnd: settings.businessHourEnd || "",
      })
    }
  }, [settings, form])

  async function onSubmit(data: SettingsFormData) {
    try {
      await updateSettings.mutateAsync(data)
      toast.success("Pengaturan berhasil disimpan")
    } catch (err) {
      toast.error((err as Error)?.message || "Gagal menyimpan")
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-lovery-pink" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto w-full">
      <div>
        <h1 className="text-4xl font-heading font-black text-black uppercase tracking-widest drop-shadow-[4px_4px_0_#E89CC9]">Pengaturan</h1>
        <p className="font-accent font-bold uppercase tracking-widest text-black border-l-4 border-lovery-pink pl-3 mt-2 block">Konfigurasi studio, rekening, dan integrasi.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full">Info Studio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="studioName">Nama Studio</Label>
              <Input id="studioName" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" {...form.register("studioName")} />
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input id="whatsapp" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="6281234567890" {...form.register("whatsapp")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full">Rekening Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="bankName">Nama Bank</Label>
              <Input id="bankName" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="BCA" {...form.register("bankName")} />
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="bankAccount">Nomor Rekening</Label>
              <Input id="bankAccount" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="1234567890" {...form.register("bankAccount")} />
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="bankHolder">Nama Pemegang</Label>
              <Input id="bankHolder" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="Lovery Photography" {...form.register("bankHolder")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full">Integrasi Google</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="googleCalendarId">Google Calendar ID</Label>
              <Input id="googleCalendarId" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="abc123@group.calendar.google.com" {...form.register("googleCalendarId")} />
            </div>
            <div className="space-y-2">
              <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="googleDriveFolder">Google Drive Folder ID</Label>
              <Input id="googleDriveFolder" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" placeholder="folder-id" {...form.register("googleDriveFolder")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black rounded-none shadow-[8px_8px_0_0_#111111] bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading font-black text-2xl uppercase border-b-4 border-black pb-2 mb-4 block w-full">Jam Operasional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="businessHourStart">Jam Mulai</Label>
                <Input id="businessHourStart" type="time" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" {...form.register("businessHourStart")} />
              </div>
              <div className="space-y-2">
                <Label className="font-accent font-bold uppercase tracking-widest text-black bg-lovery-pink border-2 border-black px-2 py-1 shadow-[2px_2px_0_0_#111111] inline-block mb-2" htmlFor="businessHourEnd">Jam Selesai</Label>
                <Input id="businessHourEnd" type="time" className="font-body font-bold text-black text-base h-12 rounded-none border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#111111]" {...form.register("businessHourEnd")} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="font-heading font-black text-2xl uppercase h-16 w-full mt-8 bg-black text-white hover:bg-lovery-pink hover:text-black border-4 border-black shadow-[8px_8px_0_0_#E89CC9] hover:shadow-[12px_12px_0_0_#111111] rounded-none" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Pengaturan
        </Button>
      </form>
    </div>
  )
}
