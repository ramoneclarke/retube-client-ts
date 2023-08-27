import React, { useEffect, useState } from "react";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import LoginPage from "@/components/auth-components/LoginPage";
import { Session } from "next-auth";

export const withAuth = () => (Component: React.ComponentType<any>) => {
  const WithAuth = (props: any) => {
    const [cachedSession, setCachedSession] = useState<
      Session | null | undefined
    >(null);
    const { data: session, status, update } = useRefetchingSession();

    useEffect(() => {
      if (status === "authenticated") {
        setCachedSession(session);
      }
    }, [session, status]);

    if (status !== "loading" && !session) {
      return <LoginPage />;
    } else {
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
