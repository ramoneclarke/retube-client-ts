import React from "react";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { signIn } from "next-auth/react";

export const withAuth = () => (Component) => {
  const WithAuth = (props) => {
    const { data: session, status, update } = useRefetchingSession();

    if (typeof window !== undefined && status === "loading") {
      return null;
    }

    if (status !== "loading" && !session) {
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn("google")}>Sign in</button>
          <pre>{"User is not logged in"}</pre>
        </>
      );
    } else {
      return (
        <Component
          session={session}
          status={status}
          update={update}
          {...props}
        />
      );
    }
  };
  return WithAuth;
};
