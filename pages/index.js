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

  console.log(session);

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

  const handleSignOut = async () => {
    try {
      // Call backend API to sign out user
      const csrftoken = Cookies.get("csrftoken");
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({
          refresh: session.refreshToken,
        }),
      }).then((response) => {
        console.log(response);
      });

      // Sign out user on front end
      await signOut({ redirect: false });
    } catch (error) {
      console.error(error);
    }
  };

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
          <button onClick={() => handleSignOut()}>Sign out</button>
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
