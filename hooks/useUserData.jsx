import { useQuery } from "@tanstack/react-query";

const { useSession } = require("next-auth/react");

const getUserData = async (accessToken) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/user-data/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    const userData = await response.json();
    return userData;
  } else {
    console.error(
      "Failed to fetch user data:",
      response.status,
      response.statusText
    );
  }
};

export const useUserData = () => {
  const { data: session, update } = useSession();
  return useQuery(["user-data"], async () => {
    await update(); // refresh the session
    return getUserData(session.accessToken);
  });
};
