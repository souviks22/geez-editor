import { NextAuthOptions } from "next-auth"
import { request } from "./api"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

const isProduction = process.env.NODE_ENV === 'production'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GithubProvider({
      clientId: isProduction ? process.env.GITHUB_CLIENT_ID as string : process.env.GITHUB_DEV_CLIENT_ID as string,
      clientSecret: isProduction ? process.env.GITHUB_CLIENT_SECRET as string : process.env.GITHUB_DEV_CLIENT_SECRET as string
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
        const { data } = await request({
          url: `/users/${trigger?.toLowerCase()}`,
          method: 'POST',
          body: { oauthId: id, email, name, image }
        })
        token.auth = {
          token: data?.token,
          _id: data?._id
        }
      }
      return token
    },
    async session({ session, token }) {
      session.token = token.auth?.token
      session.user._id = token.auth?._id
      return session
    }
  }
}