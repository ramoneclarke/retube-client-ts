import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useRefetchingSession() {
  /*
      custom hook that keeps the session up-to-date by refreshing it
      @param {number} refreshInterval: The refresh/polling interval in seconds. default is 5 minutes.
      @return {object} An object of the Session and boolean loading value
    */
  const { data, status, update } = useSession();

  // Polling the session every 5 minutes¦
  useEffect(() => {
    const interval = setInterval(() => {
      if (navigator.onLine) {
        update();
      }
      // }, 1000 * 60 * 5); // 5 minutes
    }, 1000 * 60); // 60 seconds

    return () => clearInterval(interval);
  }, [update]);

  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  useEffect(() => {
    const visibilityHandler = () => {
      document.visibilityState === "visible" && update();
    };
    window.addEventListener("visibilitychange", visibilityHandler, false);
    return () =>
      window.removeEventListener("visibilitychange", visibilityHandler, false);
  }, [update]);

  return {
    data: data,
    status: status,
    update: update,
  };
}
