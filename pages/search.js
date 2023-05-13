import React from "react";
import Cookies from "js-cookie";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { useRouter } from "next/router";
import Head from "next/head";
import AccountPage from "@/components/account-components/AccountPage";
import { useColorMode } from "@/context/ColorModeContext";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { getUserData } from "@/hooks/useUserData";
import SearchPage from "@/components/search-components/SearchPage";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const accessToken = session.accessToken;

  const userData = await getUserData(accessToken);

  return {
    props: {
      userData: userData,
    },
  };
}

const Search = ({ userData }) => {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Search - Retube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <SearchPage initialUserData={userData} />{" "}
      </main>
    </>
  );
};

export default Search;
