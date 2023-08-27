import { UserData } from "@/types/dataTypes";
import { useQuery } from "@tanstack/react-query";

const { useSession } = require("next-auth/react");

export const getUserData = async (accessToken: string): Promise<UserData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/user-data/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch user data:",
      response.status,
      response.statusText
    );
  }
  const userData = await response.json();
  return userData;
};

export const useUserData = (initialUserData: UserData) => {
  const { data: session, update } = useSession();
  return useQuery(
    ["user-data"],
    async () => {
      await update(); // refresh the session
      return getUserData(session.accessToken);
    },
    {
      initialData: initialUserData,
    }
  );
};
