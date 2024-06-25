import NextAuth from "next-auth/next";
import { nextAuthOptions } from "@/lib/next-auth";

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST }