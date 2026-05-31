import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
      <Image
        src="/hotel.jpg"
        alt="Gorkhali Bisauni Lodge And Hotel"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-4 flex justify-center">
          <Image
            src="/images/logo.png"
            alt="Gorkhali Bisauni Lodge And Hotel"
            width={280}
            height={85}
            className="h-20 w-auto brightness-0 invert"
            priority
          />
        </div>
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-zinc-300">
          स्वागतम् &bull; Swagatam &bull; Welcome
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
          <span className="text-crimson">Gorkhali</span>{" "}
          <span className="text-deep-blue-light">Bisauni</span>
        </h1>
        <p className="mx-auto mb-2 max-w-lg text-lg text-zinc-100">
          A home away from home
        </p>
        <p className="mx-auto mb-8 max-w-xl text-zinc-200">
          Experience authentic Nepali hospitality in the heart of Kathmandu.
          &ldquo;Atithi Devo Bhava&rdquo; &mdash; Guest is God.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/#booking">
            <Button size="xl" variant="accent">
              Book Now
            </Button>
          </Link>
          <Link href="/rooms">
            <Button size="xl" variant="outline" className="border-zinc-300/50 bg-black/20 text-zinc-100 backdrop-blur-sm hover:bg-white/20 hover:text-white">
              Explore Rooms
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
