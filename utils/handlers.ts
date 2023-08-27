import Cookies from "js-cookie";
import { signOut } from "next-auth/react";
import { NextRouter } from "next/router";

export const handleSignOut = async (
  refreshToken: string,
  router: NextRouter
) => {
  try {
    // Call backend API to sign out user
    const csrftoken = Cookies.get("csrftoken");
    if (csrftoken) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/auth/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        credentials: "include",
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }).then((response) => {
        console.log(response);
      });

      // Sign out user on front end
      const data = await signOut({ redirect: false, callbackUrl: "/login" });
      router.push(data.url);
    }
  } catch (error) {
    console.error(error);
  }
};

export const extractVideoId = (url: string): string => {
  // regular expression pattern to match YouTube video URLs
  const pattern =
    /^https?:\/\/(?:www\.)?youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
  // regular expression pattern to match YouTube mobile URLs
  const mobilePattern = /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})/;
  // test if the URL matches the patterns
  if (pattern.test(url)) {
    // extract the video ID using regex match
    const match = url.match(pattern);
    if (match) {
      return match[1];
    } else {
      return "Invalid YouTube URL";
    }
  } else if (mobilePattern.test(url)) {
    // extract the video ID using regex match
    const match = url.match(mobilePattern);
    if (match) {
      return match[1];
    } else {
      return "Invalid YouTube URL";
    }
  } else {
    // URL is not valid
    return "Invalid YouTube URL";
  }
};
