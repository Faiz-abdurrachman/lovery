import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { AdminHeader } from "@/components/layout/admin-header"
import { Sidebar } from "@/components/layout/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden lg:flex w-56 shrink-0" />

      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
