import SubscriptionPlans from "@/components/account-components/SubscriptionPlans";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { useRouter } from "next/router";

const Account = () => {
  const router = useRouter();
  const { data: session, status, update } = useRefetchingSession();

  useEffect(() => {
    const csrftoken = Cookies.get("csrftoken");
    if (csrftoken === undefined) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/csrf/`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data: ", data);
          Cookies.set("csrftoken", data["X-CSRFToken"]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const createPortalSession = () => {
    const csrftoken = Cookies.get("csrftoken");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-customer-portal-session/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Bearer ${session.accessToken}`,
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push(data.redirect);
      });
  };

  return (
    <div>
      <button className="bg-brand p-4" onClick={createPortalSession}>
        Manage Billing
      </button>
      <SubscriptionPlans />
    </div>
  );
};

export default Account;
