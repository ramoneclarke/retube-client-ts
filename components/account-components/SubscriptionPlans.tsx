import React from "react";
import PlanTile from "./PlanTile";
import { PlanDetails, UserData } from "@/types/dataTypes";

interface SubscriptionPlansProps {
  selectedBillingType: string;
  userData: UserData;
  createPortalSession: () => void;
  planDetails: PlanDetails[];
}

const SubscriptionPlans = ({
  selectedBillingType,
  userData,
  createPortalSession,
  planDetails,
}: SubscriptionPlansProps) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <PlanTile
          planName="Free"
          plan={planDetails[0]}
          price="0"
          priceId=""
          selectedBillingType={selectedBillingType}
          userData={userData}
          createPortalSession={createPortalSession}
        />
        <PlanTile
          planName="Basic"
          plan={planDetails[1]}
          price={selectedBillingType === "monthly" ? "10" : "100"}
          priceId="price_1MtZWtA6tstbPJ9j6SBQluzy"
          selectedBillingType={selectedBillingType}
          userData={userData}
          createPortalSession={createPortalSession}
        />
        <PlanTile
          planName="Premium"
          plan={planDetails[2]}
          price={selectedBillingType === "monthly" ? "30" : "300"}
          priceId="price_1MtZa0A6tstbPJ9jRykgICGE"
          selectedBillingType={selectedBillingType}
          userData={userData}
          createPortalSession={createPortalSession}
        />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
