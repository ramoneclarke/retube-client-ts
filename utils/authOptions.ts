import { Account, AuthOptions, Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { isJwtExpired } from "@/utils/AuthUtils";
import { refreshToken } from "@/pages/api/auth/[...nextauth]";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "defaultClientId",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "defaultClientSecret",
      authorization: {
        params: {
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      user,
      token,
      account,
    }: {
      user: User;
      token: JWT;
      account: Account | null;
    }): Promise<any> {
      if (user && account) {
        if (account.provider === "google") {
          // extract these two tokens
          const { access_token: accessToken, id_token: idToken } = account;
          // make a POST request to the DRF backend
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/social/login/google/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  access_token: accessToken,
                  id_token: idToken,
                }),
              }
            );

            // extract the returned token from the DRF backend and add it to the 'user' object
            const { access_token, refresh_token } = await response.json();
            // reform the `token` object from the access token we appended to the `user` object
            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            };

            return token;
          } catch (error) {
            console.log(error);
            return null;
          }
        }
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (isJwtExpired(token.accessToken)) {
        const [newAccessToken, newRefreshToken] = await refreshToken(
          token.refreshToken,
          token.accessToken
        );

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
        }

        // unable to refresh tokens from DRF backend, invalidate the token
        return {
          ...token,
          exp: 0,
        };
      }
      // token valid
      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      // Send tokens to the client
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};
