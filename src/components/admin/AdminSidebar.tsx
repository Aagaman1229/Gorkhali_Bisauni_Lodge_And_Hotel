"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BedDouble, UtensilsCrossed, ShoppingCart, DollarSign, LogOut, UserCheck, BarChart3, Download } from "lucide-react"
import { adminLogout } from "@/lib/actions"

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/checkins", label: "Check-ins", icon: UserCheck },
  { href: "/admin/rooms", label: "Rooms", icon: BedDouble },
  { href: "/admin/menu", label: "Food Menu", icon: UtensilsCrossed },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/bills", label: "Bills & Dues", icon: DollarSign },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/export", label: "Export Data", icon: Download },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-56 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:w-64">
      <div className="flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800 lg:px-6">
        <Link href="/admin/dashboard" className="text-base font-bold tracking-tight lg:text-lg">
          <span className="text-crimson">Gorkhali</span>{" "}
          <span className="text-deep-blue">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 lg:p-4">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              pathname === link.href
                ? "bg-deep-blue/10 text-deep-blue dark:bg-deep-blue/20 dark:text-deep-blue-light"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800 lg:p-4">
        <form action={adminLogout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-950 dark:hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  )
}
