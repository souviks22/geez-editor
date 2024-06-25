import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Session from "@/components/wrapper/Session"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Geez',
  description: 'Reat-time collaborative document editor'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang='en'>
    <Session>
      <body className={inter.className}>{children}</body>
    </Session>
  </html>)
}
