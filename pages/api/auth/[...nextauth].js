import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  debug: true,
  session: {
    strategy: "jwt",
  },
  //   cookies: {
  //     sessionToken: {
  //       name: `next-auth.session-token`,
  //       options: {
  //         httpOnly: true,
  //         sameSite: "none",
  //         path: "/",
  //         domain: process.env.NEXT_PUBLIC_DOMAIN,
  //         secure: true,
  //       },
  //     },
  //     callbackUrl: {
  //       name: `next-auth.callback-url`,
  //       options: {
  //         httpOnly: true,
  //         sameSite: "none",
  //         path: "/",
  //         domain: process.env.NEXT_PUBLIC_DOMAIN,
  //         secure: true,
  //       },
  //     },
  //     csrfToken: {
  //       name: `next-auth.csrf-token`,
  //       options: {
  //         httpOnly: true,
  //         sameSite: "none",
  //         path: "/",
  //         domain: process.env.NEXT_PUBLIC_DOMAIN,
  //         secure: true,
  //       },
  //     },
  //   },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "google") {
        // extract these two tokens
        const { access_token, id_token } = account;

        console.log(`accessToken: ${access_token}    idToken: ${id_token}`);

        // make a POST request to the DRF backend
        try {
          const response = await fetch(
            "http://localhost:8000/api/social/login/google",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                access_token: access_token,
                id_token: id_token,
              }),
            }
          );

          // extract the returned token from the DRF backend and add it to the 'user' object
          const { access_token } = await response.json();
          user.accessToken = access_token;

          return true;
        } catch (error) {
          return false;
        }
      }
    },
    async session({ session, user, token }) {
      session.accessToken = user.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const { accessToken } = user;

        // reform the 'token' object from the access token appended to the user object
        token.accessToken = accessToken;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
