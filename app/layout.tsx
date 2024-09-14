import type { Metadata } from "next"
import { Roboto } from "next/font/google"

import Session from "@/components/wrapper/Session"
import Navbar from "@/components/navigation/Navbar"
import AuthProvider from "@/context/auth-context"
import ErrorProvider from "@/context/error-context"
import Error from "@/components/error/Error"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], weight: '400' })

export const metadata: Metadata = {
  title: 'Geez',
  description: 'Reat-time collaborative document editor'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang='en'>
    <ErrorProvider>
      <Session>
        <AuthProvider>
          <body className={roboto.className}>
            <Navbar />
            {children}
            <Error />
          </body>
        </AuthProvider>
      </Session>
    </ErrorProvider>
  </html>)
}
