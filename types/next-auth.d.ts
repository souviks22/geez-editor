import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      apiToken: string
    } & DefaultSession['user']
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken: string
  }
}