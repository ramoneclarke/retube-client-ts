import Cookies from "js-cookie";
import { signOut } from "next-auth/react";

export const handleSignOut = async (refreshToken, router) => {
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
        refresh: refreshToken,
      }),
    }).then((response) => {
      console.log(response);
    });

    // Sign out user on front end
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    router.push(data.url);
  } catch (error) {
    console.error(error);
  }
};

export const extractVideoId = (url) => {
  // regular expression pattern to match YouTube video URLs
  const pattern =
    /^https?:\/\/(?:www\.)?youtube.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
  // test if the URL matches the pattern
  if (pattern.test(url)) {
    // extract the video ID using regex match
    const match = url.match(pattern);
    return match[1];
  } else {
    // URL is not valid
    return "Invalid YouTube URL";
  }
};
