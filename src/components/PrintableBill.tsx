"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Printer, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Booking, Bill, Order } from "@/types"

export function PrintableBill({
  booking,
  bills,
  orders,
}: {
  booking: Booking & { rooms?: { name: string; room_code: string; price: number } }
  bills: Bill[]
  orders: (Order & { order_items?: any[] })[]
}) {
  const bill = bills?.[0]
  const dueAmount = (bill?.total ?? 0) - (bill?.paid_amount ?? 0)

  const billText = `
GORKHALI BISAUNI LODGE & HOTEL
Gongabu, Kathmandu, Nepal | Tel: 01-4356753

INVOICE
Bill Date: ${bill?.bill_date ?? new Date().toISOString().split("T")[0]}

Guest: ${booking.user_name}
${booking.user_email ? `Email: ${booking.user_email}` : ""}
${booking.user_phone ? `Phone: ${booking.user_phone}` : ""}
Room: ${booking.rooms?.name ?? "Room"} (${booking.room_code})
Check In: ${booking.check_in}  |  Check Out: ${booking.check_out}

----------------------------------------
ITEM                         AMOUNT
----------------------------------------
Room Charge             Rs.${bill?.room_charge?.toLocaleString() ?? 0}
${bill?.food_charge ? `Food & Beverages      Rs.${bill.food_charge.toLocaleString()}` : ""}
${(bill?.bill_charges ?? []).filter((c: any) => c.charge_type === "extra").map((c: any) => `${c.description.padEnd(25)}Rs.${c.amount.toLocaleString()}`).join("\n")}
${bill?.discount ? `Discount              -Rs.${bill.discount.toLocaleString()}` : ""}
----------------------------------------
TOTAL                    Rs.${bill?.total?.toLocaleString() ?? 0}
Paid                     Rs.${bill?.paid_amount?.toLocaleString() ?? 0}
Due                      Rs.${dueAmount.toLocaleString()}

${booking.security_deposit > 0 ? `Security Deposit: Rs.${booking.security_deposit}` : ""}

"Atithi Devo Bhava" - Guest is God
Thank you for staying with us!`.trim()

  function handlePrint() { window.print() }

  function handleEmail() {
    const subject = encodeURIComponent(`Bill - Gorkhali Bisauni - ${booking.user_name}`)
    const body = encodeURIComponent(billText)
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${subject}&body=${body}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-zinc-50 print:bg-white">
      <div className="mx-auto max-w-lg px-4 py-6 print:max-w-full print:px-0 print:py-0">
        <div className="mb-4 flex items-center justify-between print:hidden">
          <Link href="/admin/checkins" className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-deep-blue">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex gap-2">
            <Button onClick={handleEmail} variant="outline" size="sm">
              <Mail className="mr-1 h-4 w-4" /> Gmail
            </Button>
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="mr-1 h-4 w-4" /> Print
            </Button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border bg-white print:border-0">
          <div className="bg-deep-blue px-5 py-4 text-white">
            <div className="flex items-start justify-between">
              <Image src="/images/logo.png" alt="" width={90} height={27} className="h-7 w-auto brightness-0 invert" />
              <div className="text-right">
                <p className="text-lg font-bold">INVOICE</p>
                <p className="text-xs opacity-80">{bill?.bill_date ?? new Date().toISOString().split("T")[0]}</p>
              </div>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="font-semibold uppercase tracking-wider text-zinc-400">Guest</p>
                <p className="mt-0.5 font-medium">{booking.user_name}</p>
                {booking.user_email && <p className="text-zinc-500">{booking.user_email}</p>}
                {booking.user_phone && <p className="text-zinc-500">{booking.user_phone}</p>}
              </div>
              <div className="text-right">
                <p className="font-semibold uppercase tracking-wider text-zinc-400">Room</p>
                <p className="mt-0.5 font-medium">{booking.rooms?.name ?? "Room"} ({booking.room_code})</p>
                <p className="text-zinc-500">{booking.check_in} → {booking.check_out}</p>
              </div>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-t text-left font-semibold uppercase text-zinc-400">
                  <th className="py-1.5">Description</th>
                  <th className="py-1.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-1.5">Room Charge</td>
                  <td className="py-1.5 text-right">Rs.{(bill?.room_charge ?? 0).toLocaleString()}</td>
                </tr>
                {(bill?.food_charge ?? 0) > 0 && (
                  <tr className="border-b">
                    <td className="py-1.5">Food &amp; Beverages</td>
                    <td className="py-1.5 text-right">Rs.{bill!.food_charge.toLocaleString()}</td>
                  </tr>
                )}
                {(bill?.bill_charges ?? []).filter((c: any) => c.charge_type === "extra").map((c: any, i: number) => (
                  <tr key={i} className="border-b">
                    <td className="py-1.5">{c.description}</td>
                    <td className="py-1.5 text-right">Rs.{c.amount.toLocaleString()}</td>
                  </tr>
                ))}
                {(bill?.discount ?? 0) > 0 && (
                  <tr className="border-b">
                    <td className="py-1.5 text-green-600">Discount</td>
                    <td className="py-1.5 text-right text-green-600">-Rs.{bill!.discount.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-b-2 border-deep-blue text-sm font-bold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right">Rs.{(bill?.total ?? 0).toLocaleString()}</td>
                </tr>
                <tr className="text-green-600">
                  <td className="pb-0.5">Paid</td>
                  <td className="pb-0.5 text-right">-Rs.{(bill?.paid_amount ?? 0).toLocaleString()}</td>
                </tr>
                <tr className="font-bold text-crimson">
                  <td className="pb-1">Due</td>
                  <td className="pb-1 text-right">Rs.{dueAmount.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>

            {booking.security_deposit > 0 && (
              <div className="mt-3 rounded bg-blue-50 p-2 text-xs">
                <span className="font-medium">Security Deposit:</span> Rs.{booking.security_deposit}
                {bill?.payment_status === "paid" && <span className="ml-1 text-green-600">(Adjusted)</span>}
              </div>
            )}
          </div>

          <div className="border-t bg-zinc-50 px-5 py-2 text-center text-[10px] text-zinc-400">
            &ldquo;Atithi Devo Bhava&rdquo; &mdash; Thank you, {booking.user_name}, for staying at Gorkhali Bisauni Lodge, Gongabu, Kathmandu
          </div>
        </div>
      </div>
    </div>
  )
}
