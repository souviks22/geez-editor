import { JWT } from "next-auth/jwt"
import { Session, DefaultSession } from "next-auth"

declare module 'next-auth/jwt' {
  interface JWT {
    auth?: {
      token: string,
      _id: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    token?: string,
    user: {
      _id?: string
    } & DefaultSession['user']
  }
}