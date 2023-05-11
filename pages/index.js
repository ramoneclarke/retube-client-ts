import Head from "next/head";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import Dashboard from "@/components/dashboard-components/Dashboard";
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

export default function Home({ userData }) {
  const { darkMode } = useColorMode();

  const { data: session, status, update } = useRefetchingSession();

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
