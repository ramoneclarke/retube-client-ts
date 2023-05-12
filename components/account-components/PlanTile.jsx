import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { GiCheckMark } from "react-icons/gi";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { formatDuration } from "@/utils/utils";

const PlanTile = ({
  planName,
  price,
  priceId,
  selectedBillingType,
  userData,
  createPortalSession,
}) => {
  const router = useRouter();
  const { data: session } = useRefetchingSession();

  const snippetsMonthlyLimit =
    userData.subscription.plan.snippets_monthly_limit;
  const snippetsMaxLength = userData.subscription.plan.snippets_max_length;
  const summariesMonthlyLimit =
    userData.subscription.plan.summaries_monthly_limit;
  const summariesMaxVideoLength =
    userData.subscription.plan.summaries_max_video_length;

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
    <div className="flex min-h-[30rem] w-full flex-col rounded-2xl bg-slate-200 p-8 text-darkest shadow-lg dark:bg-darker dark:text-lightest md:w-1/3">
      <h2 className="mb-6 text-2xl font-medium">{planName} Plan</h2>
      <p className="text-5xl font-bold">
        £{price}
        <span className="text-lg font-normal">
          / {selectedBillingType === "monthly" ? "month" : "year"}
        </span>
      </p>
      <p className="text-lg font-medium">Billed Monthly</p>
      {planName.toLowerCase() === userData.subscription.plan.name ? (
        planName.toLowerCase() === "free" ? (
          <motion.button
            onClick={createPortalSession}
            className="mt-4 w-full rounded-lg bg-mid font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Current Plan
          </motion.button>
        ) : (
          <motion.button
            onClick={createPortalSession}
            className="mt-4 w-full rounded-lg bg-red-400 p-4 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Unsubscribe
          </motion.button>
        )
      ) : (
        <motion.button
          onClick={
            userData.subscription.plan.name === "free"
              ? createCheckoutSession
              : createPortalSession
          } // create checkout section when subscribing to a paid account from a free account, and a portal session when changing existing subscriptions
          className="mt-4 w-full rounded-lg bg-brand p-4 font-semibold dark:bg-brandDark"
          whileHover={{ scale: 1.05 }}
        >
          Change plan
        </motion.button>
      )}
      {/* Features */}
      <div className="mt-8 flex w-full flex-col gap-2">
        <div className="flex h-12 flex-row items-center gap-2">
          <div className="flex items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>
          <p className="">Create and save text snippets from youtube clips</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="">Generate summaries of youtube videos</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="">
            Search though a playlist of Youtube videos (Coming soon)
          </p>{" "}
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="font-semibold">
            {snippetsMonthlyLimit} Snippets per month
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="font-semibold">
            Snippet max length: {formatDuration(snippetsMaxLength)}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="font-semibold">
            {summariesMonthlyLimit} Summaries per month
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="font-semibold">
            Summaries max video length:{" "}
            {formatDuration(summariesMaxVideoLength)}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-12 items-center justify-center">
            <GiCheckMark className="text-2xl text-brand" />{" "}
          </div>{" "}
          <p className="">Search Playlists: Coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default PlanTile;
