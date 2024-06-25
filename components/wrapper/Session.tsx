"use client";
import { SessionProvider } from "next-auth/react";

export default ({ children }: { children: React.ReactNode }) => {
  return (<SessionProvider>{children}</SessionProvider>)
}