import { createClient } from "@/lib/supabase-server"
import { MenuManager } from "@/components/admin/MenuManager"

export const metadata = {
  title: "Menu Management | Gorkhali Bisauni Admin",
}

export default async function AdminMenuPage() {
  const supabase = await createClient()
  const { data: items } = await supabase.from("food_menu").select("*").order("created_at", { ascending: false })

  return (
    <div>
      <MenuManager initialItems={items ?? []} />
    </div>
  )
}
