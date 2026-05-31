"use client"

import { useActionState, useEffect, useState } from "react"
import { submitReview } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { toast } from "sonner"
import { useGuestInfo } from "@/lib/guest-storage"

export function ReviewForm() {
  const { guest } = useGuestInfo()
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [state, action] = useActionState(submitReview, null)

  useEffect(() => {
    if (state?.success) toast.success("Review submitted! Dhanyabaad!")
    else if (state?.error) toast.error(state.error)
  }, [state])

  return (
    <form action={action} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-lg font-semibold">Share your experience</h3>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="review_name">Name</Label>
            <Input id="review_name" name="user_name" defaultValue={guest?.user_name ?? ""} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="review_email">Email</Label>
            <Input id="review_email" name="user_email" type="email" defaultValue={guest?.user_email ?? ""} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Rating</Label>
          <div className="flex gap-1">
            <input type="hidden" name="rating" value={rating} />
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-colors"
              >
                <Star
                  className={`h-6 w-6 ${
                    star <= (hover || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-zinc-300 dark:text-zinc-600"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="comment">Comment</Label>
          <textarea
            id="comment"
            name="comment"
            rows={3}
            required
            className="flex w-full rounded-md border border-zinc-300 bg-background px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-deep-blue dark:border-zinc-700 dark:placeholder:text-zinc-500"
            placeholder="Tell us about your stay..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="review_image">Photo (optional)</Label>
          <Input id="review_image" name="image" type="file" accept="image/*" />
        </div>

        <Button type="submit" variant="accent">Submit Review</Button>
      </div>
    </form>
  )
}
