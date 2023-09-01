import React from "react";
import Head from "next/head";
import { useColorMode } from "@/context/ColorModeContext";
import { getServerSession } from "next-auth";
import { UserData, getUserData } from "@/hooks/useUserData";
import SearchPage from "@/components/search-components/SearchPage";
import { authOptions } from "@/utils/authOptions";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
};

const Search = ({ userData }: { userData: UserData }) => {
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
