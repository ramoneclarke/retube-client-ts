import Head from "next/head";
import Cookies from "js-cookie";
import Frame from "@/components/design/Frame";
import {
  FaRegHandScissors,
  FaListAlt,
  FaSearchengin,
  FaHome,
} from "react-icons/fa";
import { useState } from "react";
import DashboardDesign from "@/components/design/DashboardDesign";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import Dashboard from "@/components/dashboard-components/Dashboard";
import { useColorMode } from "@/context/ColorModeContext";

export default function Home() {
  const { darkMode } = useColorMode();

  const { data: session, status, update } = useRefetchingSession();

  // useEffect(() => {
  //   const csrftoken = Cookies.get("csrftoken");
  //   if (csrftoken === undefined) {
  //     fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/csrf/`, {
  //       credentials: "include",
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("data: ", data);
  //         Cookies.set("csrftoken", data["X-CSRFToken"]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, []);

  return (
    <>
      {/* {status === "loading" && <h2>Loading...</h2>}

      {status === "unauthenticated" && !session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn("google")}>Sign in</button>
          <pre>{!session && "User is not logged in"}</pre>
        </>
      )}

      {status === "authenticated" && session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => handleSignOut()}>Sign out</button>
          {session.accessToken && <pre>User has access token</pre>}
        </>
      )} */}
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
