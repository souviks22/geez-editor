import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import Session from "@/components/wrapper/Session"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], weight: '400' })

export const metadata: Metadata = {
  title: 'Geez',
  description: 'Reat-time collaborative document editor'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang='en'>
    <Session>
      <body className={roboto.className}>{children}</body>
    </Session>
  </html>)
}
