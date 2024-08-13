import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import Session from "@/components/wrapper/Session"
import Navbar from "@/components/navigation/Navbar"
import AuthProvider from "@/context/auth-context"
import DocProvider from "@/context/document-context"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], weight: '400' })

export const metadata: Metadata = {
  title: 'Geez',
  description: 'Reat-time collaborative document editor'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang='en'>
    <Session>
      <AuthProvider>
        <DocProvider>
          <body className={roboto.className}>
            <Navbar />
            {children}
          </body>
        </DocProvider>
      </AuthProvider>
    </Session>
  </html>)
}
