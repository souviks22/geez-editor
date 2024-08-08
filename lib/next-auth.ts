import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import { request } from "./api"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        const { id, email, name, image } = user
        await request({
          url: `/users/${trigger?.toLowerCase()}`,
          method: 'POST',
          body: { oauthId: id, email, name, image }
        })
      }
      return token
    }
  }
}