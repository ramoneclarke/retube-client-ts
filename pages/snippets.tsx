import SnippetsPage from "@/components/snippets-components/SnippetsPage";
import { useColorMode } from "@/context/ColorModeContext";
import { parse } from "cookie";
import { getServerSession } from "next-auth";
import Head from "next/head";
import React from "react";
import { getUserData } from "@/hooks/useUserData";
import { GetServerSideProps } from "next";
import { authOptions } from "@/utils/authOptions";
import { UserData, UserDataSnippet } from "@/types/dataTypes";

interface SnippetsProps {
  userData: UserData;
  initialSnippets: UserDataSnippet[];
}

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

  const cookies = parse(context.req.headers.cookie || "");
  const csrftoken = cookies.csrftoken;

  let snippets;

  try {
    const response = await fetch(
      `
            ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/text-snippet/
            `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    snippets = data;
  } catch (err) {
    console.log(err);
  }

  const userData = await getUserData(accessToken);

  return {
    props: {
      userData: userData,
      initialSnippets: snippets,
    },
  };
};

const Snippets = ({ userData, initialSnippets }: SnippetsProps) => {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Snippets - ReTube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <SnippetsPage
          initialUserData={userData}
          initialSnippets={initialSnippets}
        />
      </main>
    </>
  );
};

export default Snippets;
