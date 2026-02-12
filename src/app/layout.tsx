import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { RightProvider } from "@/context/right-context"
import { TRPCProvider } from "@/trpc/client"
import { Toaster } from "@/components/ui/sonner"
import { TaskProvider } from "@/context/task-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Deskmate",
  description: "Your desktop companion",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <TRPCProvider>
          <AuthProvider>
            <TaskProvider>
              <RightProvider>{children}</RightProvider>
            </TaskProvider>
          </AuthProvider>
        </TRPCProvider>
        <Toaster />
      </body>
    </html>
  )
}
