import { Hero } from "@/components/Hero"
import { HotelOverview } from "@/components/HotelOverview"
import { AmenitiesGrid } from "@/components/AmenitiesGrid"
import { BookingForm } from "@/components/BookingForm"
import { ReviewSection } from "@/components/ReviewSection"
import { ReviewForm } from "@/components/ReviewForm"
import { createClient } from "@/lib/supabase-server"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: rooms } = await supabase.from("rooms").select("*").order("price")
  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(9)

  return (
    <>
      <Hero />
      <HotelOverview />
      <AmenitiesGrid />

      {/* Review & Feedback Section */}
      <section className="bg-zinc-50 py-16 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ReviewSection reviews={reviews ?? []} />
            </div>
            <div>
              <ReviewForm />
            </div>
          </div>
        </div>
      </section>

      <BookingForm rooms={rooms ?? []} />
    </>
  )
}
