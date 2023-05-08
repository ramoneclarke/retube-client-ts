import { useColorMode } from "@/context/ColorModeContext";
import { getServerSession } from "next-auth";
import Head from "next/head";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { getUserData } from "@/hooks/useUserData";
import SummariesPage from "@/components/summaries-components/SummariesPage";
import { parse } from "cookie";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const accessToken = session.accessToken;

  const cookies = parse(context.req.headers.cookie || "");
  const csrftoken = cookies.csrftoken;

  let summaries;

  try {
    const response = await fetch(
      `
            ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/video-summary/
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
    summaries = data;
  } catch (err) {
    console.log(err);
  }

  const userData = await getUserData(accessToken);

  return {
    props: {
      userData: userData,
      initialSummaries: summaries,
    },
  };
}

const Summaries = ({ userData, initialSummaries }) => {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Snippets - ReTube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <SummariesPage
          initialUserData={userData}
          initialSummaries={initialSummaries}
        />
      </main>
    </>
  );
};

export default Summaries;
