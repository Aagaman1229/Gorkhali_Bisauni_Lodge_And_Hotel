import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase-server"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 overflow-auto bg-zinc-50 p-6 dark:bg-zinc-950">
        {children}
      </div>
    </div>
  )
}
