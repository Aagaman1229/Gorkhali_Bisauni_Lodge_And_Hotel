import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/app/providers"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Gorkhali Bisauni Lodge And Hotel | Gongabu, Kathmandu",
  description:
    "Experience authentic Nepali hospitality at Gorkhali Bisauni Lodge And Hotel in Gongabu, Kathmandu. Book AC rooms, enjoy free parking, and explore Kathmandu tours.",
  keywords: ["hotel", "kathmandu", "nepal", "gongabu", "gorkhali", "bisauni", "lodge", "booking"],
  openGraph: {
    title: "Gorkhali Bisauni Lodge And Hotel",
    description: "Experience authentic Nepali hospitality in Kathmandu.",
    type: "website",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background font-sans text-foreground antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
