import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

export const refreshToken = async function (
  refreshToken: string,
  accessToken: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error - Status: ${response.status}`);
    }
    const { access, refresh } = await response.json();
    return [access, refresh];
  } catch (error) {
    console.error(error);
    return [null, null];
  }
};

export default NextAuth(authOptions);
