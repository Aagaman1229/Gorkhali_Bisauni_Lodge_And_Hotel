"use client"

import { useState } from "react"
import { useGuestInfo } from "@/lib/guest-storage"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import type { Bill } from "@/types"

const statusColors: Record<string, "default" | "secondary" | "success" | "destructive"> = {
  pending: "destructive",
  partial: "default",
  paid: "success",
}

export function MyBillClient({ bills: allBills }: { bills: Bill[] }) {
  const { guest } = useGuestInfo()
  const [searchEmail, setSearchEmail] = useState(guest?.user_email ?? "")
  const [bills, setBills] = useState<Bill[]>(() => {
    if (guest?.user_email) {
      return allBills.filter((b) => b.user_email === guest.user_email)
    }
    return []
  })

  function handleSearch() {
    if (!searchEmail) return
    setBills(allBills.filter((b) => b.user_email === searchEmail))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-deep-blue dark:text-deep-blue-light">
          My Bill
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Enter your email to view your bill and dues
        </p>
      </div>

      <div className="mb-8 flex gap-2">
        <Input
          placeholder="Enter your email"
          type="email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      {bills.length === 0 ? (
        <p className="text-center text-zinc-500">No bills found for this email.</p>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => {
            const due = bill.total - bill.paid_amount
            return (
              <Card key={bill.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-base">Bill for {bill.user_name}</CardTitle>
                    <Badge variant={statusColors[bill.payment_status] ?? "default"}>
                      {bill.payment_status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-3 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                      <p className="text-zinc-500">Room Charge</p>
                      <p className="text-lg font-semibold">Rs.{bill.room_charge}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                      <p className="text-zinc-500">Food Charge</p>
                      <p className="text-lg font-semibold">Rs.{bill.food_charge}</p>
                    </div>
                    <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900">
                      <p className="text-zinc-500">Additional</p>
                      <p className="text-lg font-semibold">Rs.{bill.additional_charges}</p>
                    </div>
                    <div className="rounded-lg bg-crimson/10 p-3">
                      <p className="text-zinc-500">Total</p>
                      <p className="text-lg font-bold text-crimson">Rs.{bill.total}</p>
                    </div>
                  </div>

                  {due > 0 && bill.payment_status !== "paid" && (
                    <div className="rounded-md bg-red-50 p-3 text-center dark:bg-red-950">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        <strong>Pending Dues:</strong> Rs.{due}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        Please pay at the front desk
                      </p>
                    </div>
                  )}

                  {bill.payment_status === "paid" && (
                    <div className="rounded-md bg-green-50 p-3 text-center text-sm text-green-700 dark:bg-green-950 dark:text-green-400">
                      Fully Paid &mdash; Thank you!
                    </div>
                  )}

                  {bill.bill_charges && bill.bill_charges.length > 0 && (
                    <div className="mt-3 rounded-md bg-zinc-50 p-3 text-sm dark:bg-zinc-900">
                      <p className="mb-1 font-medium">Extra Charges:</p>
                      {bill.bill_charges.map((c) => (
                        <div key={c.id} className="flex justify-between">
                          <span>{c.description}</span>
                          <span>Rs.{c.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
