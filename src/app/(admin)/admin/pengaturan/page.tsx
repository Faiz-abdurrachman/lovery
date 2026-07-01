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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-black">Pengaturan</h1>
        <p className="text-gray-500 mt-1">Konfigurasi studio, rekening, dan integrasi.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Info Studio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studioName">Nama Studio</Label>
              <Input id="studioName" className="rounded-xl" {...form.register("studioName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp">Nomor WhatsApp</Label>
              <Input id="whatsapp" className="rounded-xl" placeholder="6281234567890" {...form.register("whatsapp")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Rekening Pembayaran</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bankName">Nama Bank</Label>
              <Input id="bankName" className="rounded-xl" placeholder="BCA" {...form.register("bankName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankAccount">Nomor Rekening</Label>
              <Input id="bankAccount" className="rounded-xl" placeholder="1234567890" {...form.register("bankAccount")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bankHolder">Nama Pemegang</Label>
              <Input id="bankHolder" className="rounded-xl" placeholder="Lovery Photography" {...form.register("bankHolder")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Integrasi Google</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="googleCalendarId">Google Calendar ID</Label>
              <Input id="googleCalendarId" className="rounded-xl" placeholder="abc123@group.calendar.google.com" {...form.register("googleCalendarId")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="googleDriveFolder">Google Drive Folder ID</Label>
              <Input id="googleDriveFolder" className="rounded-xl" placeholder="folder-id" {...form.register("googleDriveFolder")} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Jam Operasional</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessHourStart">Jam Mulai</Label>
                <Input id="businessHourStart" type="time" className="rounded-xl" {...form.register("businessHourStart")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessHourEnd">Jam Selesai</Label>
                <Input id="businessHourEnd" type="time" className="rounded-xl" {...form.register("businessHourEnd")} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="rounded-xl bg-lovery-pink hover:bg-lovery-pink-dark text-white" disabled={updateSettings.isPending}>
          {updateSettings.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Simpan Pengaturan
        </Button>
      </form>
    </div>
  )
}
