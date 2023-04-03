import NextAuth from "next-auth";
import Cookies from "js-cookie";
import GoogleProvider from "next-auth/providers/google";
import { isJwtExpired, makeUrl } from "@/utils/AuthUtils";

export const refreshToken = async function (refreshToken, accessToken) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_BASE}/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error - Status: ${response.status}`);
    }

    const { access, refresh } = await response.json();
    // still within this block, return true
    return [access, refresh];
  } catch (error) {
    console.error(error);
    return [null, null];
  }
};

export const authOptions = {
  debug: true,
  session: {
    strategy: "jwt",
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          access_type: "offline",
        },
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (account.provider === "google") {
    //     // extract these two tokens
    //     const { access_token: accessToken, id_token: idToken } = account;

    //     // make a POST request to the DRF backend
    //     try {
    //       const response = await fetch(
    //         `${process.env.BACKEND_API_BASE}/api/social/login/google/`,
    //         {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //             "X-CSRFToken": Cookies.get("csrftoken"),
    //           },
    //           credentials: "include",
    //           body: JSON.stringify({
    //             access_token: accessToken,
    //             id_token: idToken,
    //           }),
    //         }
    //       );

    //       // extract the returned token from the DRF backend and add it to the 'user' object
    //       const data = await response.json();
    //       user.accessToken = data.access_token;
    //       user
    //       console.log("DATA: ", data);

    //       return true; // return true if everything worked
    //     } catch (error) {
    //       console.log(error);
    //       return false;
    //     }
    //   }
    //   return false;
    // },

    async jwt({ user, token, account }) {
      // user just signed in
      if (user) {
        if (account.provider === "google") {
          // extract these two tokens
          const { access_token: accessToken, id_token: idToken } = account;

          // make a POST request to the DRF backend
          try {
            const response = await fetch(
              `${process.env.BACKEND_API_BASE}/api/social/login/google/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-CSRFToken": Cookies.get("csrftoken"),
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

    async session({ session, token }) {
      // Send access token to the client
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
