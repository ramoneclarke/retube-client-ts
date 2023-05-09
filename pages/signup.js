import Head from "next/head";
import React from "react";
import { useColorMode } from "@/context/ColorModeContext";
import LoginPage from "@/components/auth-components/LoginPage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import SignUpPage from "@/components/auth-components/SignUpPage";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
const Signup = () => {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Sign Up - Retube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <SignUpPage />
      </main>
    </>
  );
};

export default Signup;
