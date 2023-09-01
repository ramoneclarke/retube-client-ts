import Head from "next/head";
import Dashboard from "@/components/dashboard-components/Dashboard";
import { useColorMode } from "@/context/ColorModeContext";
import { getServerSession } from "next-auth";
import { getUserData } from "@/hooks/useUserData";
import { authOptions } from "@/utils/authOptions";
import { GetServerSideProps } from "next";
import { UserData } from "@/types/dataTypes";

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

export default function Home({ userData }: { userData: UserData }) {
  const { darkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Retube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <Dashboard initialUserData={userData} />
      </main>
    </>
  );
}
