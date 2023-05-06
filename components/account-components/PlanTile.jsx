import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import useRefetchingSession from "@/hooks/useRefetchingSession";

const PlanTile = ({ planName, price, priceId }) => {
  const router = useRouter();
  const { data: session, status, update } = useRefetchingSession();
  console.log(session);

  const createCheckoutSession = () => {
    const csrftoken = Cookies.get("csrftoken");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-checkout-session/`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Bearer ${session.accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ price_id: priceId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        router.push(data.redirect);
      });
  };
  return (
    <div className="flex w-1/3 flex-col bg-slate-200 p-8">
      <h2 className="text-lg">{planName} Plan</h2>
      <p className="text-xl">£{price} / month</p>
      <p className="text-xl">Billed Monthly</p>
      <button
        onClick={createCheckoutSession}
        className="mt-4 h-8 w-full bg-brand"
      >
        Subscribe
      </button>
    </div>
  );
};

export default PlanTile;
