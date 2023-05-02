import useRefetchingSession from "@/hooks/useRefetchingSession";
import { handleSignOut } from "@/utils/handlers";
import { withAuth } from "@/utils/withAuth";
import React from "react";
import Layout from "../layout-components/Layout";

const Dashboard = () => {
  const { data: session, status, update } = useRefetchingSession();

  return (
    <div>
      <Layout>
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
            <button onClick={() => handleSignOut(session.refreshToken)}>
              Sign out
            </button>
            {session.accessToken && <pre>User has access token</pre>}
          </>
        )}
      </Layout>
    </div>
  );
};

export default withAuth()(Dashboard);
