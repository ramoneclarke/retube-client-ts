import React, { useEffect, useState } from "react";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { signIn } from "next-auth/react";

export const withAuth = () => (Component) => {
  const WithAuth = (props) => {
    const [cachedSession, setCachedSession] = useState(null);
    const { data: session, status, update } = useRefetchingSession();

    useEffect(() => {
      if (status === "authenticated") {
        setCachedSession(session);
        console.log("Set cachedSession to updated session");
      }
    }, [session, status]);

    if (status !== "loading" && !session) {
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn("google")}>Sign in</button>
          <pre>{"User is not logged in"}</pre>
        </>
      );
    } else {
      console.log(`status: ${status}`);
      return (
        <Component
          session={cachedSession}
          status={status}
          update={update}
          {...props}
        />
      );
    }
  };
  return WithAuth;
};
