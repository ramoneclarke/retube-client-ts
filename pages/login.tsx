import Head from "next/head";
import React from "react";
import { useColorMode } from "@/context/ColorModeContext";
import LoginPage from "@/components/auth-components/LoginPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};

const Login = () => {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Log In - Retube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <LoginPage />
      </main>
    </>
  );
};

export default Login;
