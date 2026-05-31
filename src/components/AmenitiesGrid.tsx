import { Car, Fan, Bath, Thermometer, WashingMachine, Headphones, Plane, Compass } from "lucide-react"

const amenities = [
  { icon: Car, label: "Free Parking", description: "Secure on-site parking" },
  { icon: Thermometer, label: "AC Rooms", description: "2 AC rooms available" },
  { icon: Fan, label: "Fan", description: "All rooms with ceiling fan" },
  { icon: Bath, label: "Attached Bathroom", description: "5 rooms with attached toilet" },
  { icon: Thermometer, label: "Hot Water", description: "24/7 hot water supply" },
  { icon: WashingMachine, label: "Washing Service", description: "Laundry service available" },
  { icon: Headphones, label: "24-hr Front Desk", description: "Round-the-clock service" },
  { icon: Plane, label: "Airport Pickup", description: "Hotel vehicle available" },
  { icon: Compass, label: "City Tours", description: "Guided Kathmandu tours" },
]

export function AmenitiesGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-deep-blue dark:text-deep-blue-light">
            Amenities & Services
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Everything you need for a comfortable stay
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {amenities.map((amenity) => (
            <div
              key={amenity.label}
              className="group rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm transition-all hover:border-crimson/30 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-crimson/50 sm:p-6"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-crimson/10 text-crimson transition-colors group-hover:bg-crimson group-hover:text-white sm:h-12 sm:w-12">
                <amenity.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-sm font-semibold sm:text-base">{amenity.label}</h3>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
