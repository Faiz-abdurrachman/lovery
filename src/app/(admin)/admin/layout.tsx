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
        <AdminHeader userName={session.user.name} />
        <main 
          className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 relative"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.1) 2px, transparent 2px)', backgroundSize: '24px 24px' }}
        >
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
