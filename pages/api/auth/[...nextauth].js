import NextAuth from "next-auth";
import Cookies from "js-cookie";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  debug: true,
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
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        // extract these two tokens
        const { access_token: accessToken, id_token: idToken } = account;

        // make a POST request to the DRF backend
        try {
          const response = await fetch(
            "http://127.0.0.1:8000/api/social/login/google/",
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
          const data = await response.json();
          user.accessToken = data.access_token;

          return true; // return true if everything worked
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return false;
    },

    async jwt({ user, token, account }) {
      if (user) {
        // reform the token object from the acces token we appended to the 'user' object
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, user, token }) {
      // Send access token to the client
      session.accessToken = token.accessToken;
      return session;
    },
  },
  //   session: {
  //     strategy: "database",
  //   },
};

export default NextAuth(authOptions);
