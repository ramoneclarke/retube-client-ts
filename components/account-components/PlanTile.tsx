import { useRouter } from "next/router";
import React from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { formatDuration } from "@/utils/utils";
import PlanBenefit from "./PlanBenefit";
import { PlanDetails, UserData } from "@/types/dataTypes";

interface PlanTileProps {
  planName: string;
  plan: PlanDetails;
  price: string;
  priceId: string;
  selectedBillingType: string;
  userData: UserData;
  createPortalSession: () => void;
}

const PlanTile = ({
  planName,
  plan,
  price,
  priceId,
  selectedBillingType,
  userData,
  createPortalSession,
}: PlanTileProps) => {
  const router = useRouter();
  const { data: session } = useRefetchingSession();

  const snippetsMonthlyLimit = plan.snippets_monthly_limit;
  const snippetsMaxLength = plan.snippets_max_length;
  const summariesMonthlyLimit = plan.summaries_monthly_limit;
  const summariesMaxVideoLength = plan.summaries_max_video_length;

  const createCheckoutSession = () => {
    const csrftoken = Cookies.get("csrftoken");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/payments/create-checkout-session/`;
    if (csrftoken && session) {
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
          router.push(data.redirect);
        });
    }
  };

  return (
    <div className="flex min-h-[30rem] w-full flex-col rounded-2xl bg-slate-200 p-8 text-darkest shadow-lg dark:bg-darker dark:text-lightest md:w-1/3">
      <h2 className="mb-6 text-2xl font-medium md:h-16">{planName} Plan</h2>
      <p className="text-5xl font-bold md:text-4xl lg:text-5xl">
        £{price}
        <span className="text-lg font-normal">
          / {selectedBillingType === "monthly" ? "month" : "year"}
        </span>
      </p>
      <p className="text-lg font-medium">
        {planName.toLowerCase() === "free" ? "Always free" : "Billed Monthly"}
      </p>
      {planName.toLowerCase() === userData.subscription.plan.name ? (
        planName.toLowerCase() === "free" ? (
          <motion.button
            onClick={createPortalSession}
            className="no-tap-highlight mt-4 w-full rounded-lg bg-mid p-4 font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Current Plan
          </motion.button>
        ) : (
          <motion.button
            onClick={createPortalSession}
            className="no-tap-highlight mt-4 w-full rounded-lg bg-red-400 p-4 font-semibold"
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
          className="no-tap-highlight mt-4 w-full rounded-lg bg-brand p-4 font-semibold dark:bg-brandDark"
          whileHover={{ scale: 1.05 }}
        >
          Change plan
        </motion.button>
      )}
      {/* Features */}
      <div className="mt-8 flex w-full flex-col gap-2">
        <PlanBenefit text="Create and save text snippets from youtube clips" />
        <PlanBenefit text="Generate summaries of youtube videos" />
        <PlanBenefit
          text="            Search though a playlist of Youtube videos (Coming soon)
"
        />
        <PlanBenefit
          text={`${snippetsMonthlyLimit} Snippets per month`}
          bold={true}
        />
        <PlanBenefit
          text={`            Snippet max length: ${formatDuration(
            snippetsMaxLength
          )}
`}
          bold={true}
        />
        <PlanBenefit
          text={`            ${summariesMonthlyLimit} Summaries per month
`}
          bold={true}
        />
        <PlanBenefit
          text={`  Summaries max video length: 
            ${formatDuration(summariesMaxVideoLength)}`}
          bold={true}
        />
        <PlanBenefit text="Search Playlists: Coming soon!" />
      </div>
    </div>
  );
};

export default PlanTile;
