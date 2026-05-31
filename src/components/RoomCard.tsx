import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bed, Users, Check, ImageIcon } from "lucide-react"
import type { Room } from "@/types"

const statusColor: Record<string, "success" | "destructive" | "secondary"> = {
  available: "success",
  booked: "destructive",
  maintenance: "secondary",
}

const statusLabel: Record<string, string> = {
  available: "Available",
  booked: "Booked",
  maintenance: "Maintenance",
}

export function RoomCard({ room }: { room: Room }) {
  return (
    <Link href={`/rooms/${room.id}`}>
      <Card className="group cursor-pointer overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          {room.image_url ? (
            <Image
              src={room.image_url}
              alt={room.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-zinc-100 dark:bg-zinc-800">
              <Bed className="h-12 w-12 text-zinc-400" />
            </div>
          )}
          <div className="absolute right-2 top-2 flex items-center gap-2">
            {room.gallery && room.gallery.length > 1 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <ImageIcon className="h-3 w-3" /> {room.gallery.length}
              </Badge>
            )}
            <Badge variant={statusColor[room.status] ?? "secondary"}>
              {statusLabel[room.status] ?? room.status}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{room.name}</CardTitle>
            <span className="text-lg font-bold text-deep-blue dark:text-deep-blue-light">
              Rs.{room.price}
              <span className="text-xs font-normal text-zinc-500">/night</span>
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{room.description}</p>
          <div className="flex items-center gap-1 text-sm text-zinc-500">
            <Users className="h-4 w-4" />
            <span>Up to {room.capacity} guests</span>
          </div>
          {room.features.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {room.features.slice(0, 4).map((feature) => (
                <Badge key={feature} variant="secondary" className="flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  {feature}
                </Badge>
              ))}
              {room.features.length > 4 && (
                <Badge variant="outline" className="text-xs">+{room.features.length - 4} more</Badge>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <span className="inline-flex h-9 w-full items-center justify-center rounded-md bg-deep-blue px-4 text-sm font-medium text-white transition-colors hover:bg-deep-blue-dark dark:bg-deep-blue-light dark:hover:bg-deep-blue">
            {room.status === "available" ? "View & Book" : "View Details"}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
