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

const Account = ({ userData }) => {
  const router = useRouter();
  const { darkMode } = useColorMode();
  const { data: session, status, update } = useRefetchingSession();

  const createPortalSession = () => {
    const csrftoken = Cookies.get("csrftoken");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-customer-portal-session/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Bearer ${session.accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(data.redirect);
      });
  };

  return (
    <>
      <Head>
        <title>Account - Retube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <AccountPage
          createPortalSession={createPortalSession}
          initialUserData={userData}
        />{" "}
      </main>
    </>
  );
};

export default Account;
