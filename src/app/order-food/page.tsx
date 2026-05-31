import { createClient } from "@/lib/supabase-server"
import { FoodOrderForm } from "@/components/FoodOrderForm"

export const metadata = {
  title: "Order Food | Gorkhali Bisauni Lodge And Hotel",
  description: "Order food for delivery to your room at Gorkhali Bisauni Lodge And Hotel.",
}

export default async function OrderFoodPage() {
  const supabase = await createClient()
  const { data: menu } = await supabase.from("food_menu").select("*").order("category")

  return <FoodOrderForm menu={menu ?? []} />
}
