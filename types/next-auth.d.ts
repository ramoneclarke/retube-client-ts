import NextAuth, { Account } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: Account.accessToken;
    refreshToken: Account.refreshToken;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: Account.accessToken;
    refreshToken: Account.refreshToken;
    iat: number;
    exp: number;
  }
}
