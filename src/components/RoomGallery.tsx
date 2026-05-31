"use client"

import { useState } from "react"
import Image from "next/image"
import { Bed, ChevronLeft, ChevronRight } from "lucide-react"

export function RoomGallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0)
  const hasMultiple = images.length > 1

  function prev() {
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))
  }

  function next() {
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))
  }

  if (images.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
        <Bed className="h-16 w-16 text-zinc-400" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
        <Image
          src={images[current]}
          alt={`${name} - Image ${current + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={current === 0}
        />
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                i === current ? "border-deep-blue dark:border-deep-blue-light" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} - thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
