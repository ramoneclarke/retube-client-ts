import React from "react";
import Cookies from "js-cookie";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { useRouter } from "next/router";
import Head from "next/head";
import AccountPage from "@/components/account-components/AccountPage";
import { useColorMode } from "@/context/ColorModeContext";
import type { Session } from "next-auth";
import { getServerSession } from "next-auth";
import { UserData, getUserData } from "@/hooks/useUserData";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { authOptions } from "@/utils/authOptions";

interface PlanDetails {
  id: number;
  name: string;
  stripe_product_id: string;
  snippets_monthly_limit: number;
  snippets_max_length: number;
  summaries_monthly_limit: number;
  summaries_max_video_length: number;
  search_max_playlists: number;
  search_max_playlist_videos: number;
  search_max_video_length: number;
}

interface AccountProps {
  userData: UserData;
  planDetails: PlanDetails[];
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
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

  const plans = await getPlansDetails(accessToken);

  return {
    props: {
      userData: userData,
      planDetails: plans,
    },
  };
};

const Account = ({ userData, planDetails }: AccountProps) => {
  const router = useRouter();
  const { darkMode } = useColorMode();
  const { data: session } = useRefetchingSession();

  const createPortalSession = () => {
    const csrftoken = Cookies.get("csrftoken");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-customer-portal-session/`;

    if (csrftoken && session) {
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
    }
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
          planDetails={planDetails}
        />{" "}
      </main>
    </>
  );
};

const getPlansDetails = async (token: string): Promise<PlanDetails[]> => {
  try {
    const csrftoken = Cookies.get("csrftoken");
    if (csrftoken) {
      const response = await fetch(
        `
          ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/plans/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (err) {
    throw err;
  }
};

export default Account;
