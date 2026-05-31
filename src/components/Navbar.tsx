"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/food", label: "Food Menu" },
  { href: "/#booking", label: "Book Now" },
]

const serviceLinks = [
  { href: "/order-food", label: "Order Food" },
  { href: "/my-bill", label: "My Bill" },
  { href: "/#contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!servicesOpen) return
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [servicesOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Gorkhali Bisauni Lodge And Hotel"
            width={180}
            height={55}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-deep-blue dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-deep-blue-light"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-deep-blue dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-deep-blue-light"
            >
              Services
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            {servicesOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-deep-blue dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-deep-blue-light"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950 md:hidden",
          mobileOpen ? "max-h-[32rem]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {[...navLinks, ...serviceLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-deep-blue dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-deep-blue-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
