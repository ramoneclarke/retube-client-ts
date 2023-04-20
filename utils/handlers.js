export const handleSignOut = async () => {
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
