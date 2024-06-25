import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import { apiRequest } from "./api"

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
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        const { id, email, name, image } = user
        const { data } = await apiRequest(`/users/${trigger?.toLowerCase()}`, 'POST', { id, email, name, image })
        token.apiToken = data?.token
      }
      return token
    },
    async session({ session, token }) {
      session.user.apiToken = token.apiToken
      return session
    }
  }
}