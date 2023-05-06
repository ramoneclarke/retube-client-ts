import Head from "next/head";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import Dashboard from "@/components/dashboard-components/Dashboard";
import { useColorMode } from "@/context/ColorModeContext";

export default function Home() {
  const { darkMode } = useColorMode();

  const { data: session, status, update } = useRefetchingSession();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <Dashboard />
      </main>
    </>
  );
}
