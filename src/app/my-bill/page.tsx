import { createClient } from "@/lib/supabase-server"
import { MyBillClient } from "@/components/MyBillClient"

export const metadata = {
  title: "My Bill | Gorkhali Bisauni Lodge And Hotel",
}

export default async function MyBillPage() {
  const supabase = await createClient()
  const { data: bills } = await supabase
    .from("bills")
    .select("*, bill_charges(*)")
    .order("created_at", { ascending: false })

  return <MyBillClient bills={bills ?? []} />
}
