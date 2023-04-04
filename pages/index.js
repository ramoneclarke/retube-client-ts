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

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const { data: session, status, update } = useRefetchingSession();

  // if (session) {
  //   return (
  //     <>
  //       Signed in as {session.user.email} <br />
  //       <p className="">Status: {status}</p>
  //       <button onClick={() => signOut()}>Sign out</button>
  //     </>
  //   );
  // }
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn("google")}>Sign in</button>
  //   </>
  // );

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}

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
          <button onClick={() => signOut()}>Sign out</button>
          {session.accessToken && <pre>User has access token</pre>}
        </>
      )}
    </>
  );
}

const nav = [
  {
    text: "Home",
    icon: <FaHome size="1.3rem" className="text-brand" />,
  },
  {
    text: "Snippets",
    icon: <FaRegHandScissors size="1.3rem" className="text-brand" />,
  },
  {
    text: "Summaries",
    icon: <FaListAlt size="1.3rem" className="text-brand" />,
  },
  {
    text: "Search",
    icon: <FaSearchengin size="1.3rem" className="text-brand" />,
  },
];
