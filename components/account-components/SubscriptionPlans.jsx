import React from "react";
import PlanTile from "./PlanTile";

const SubscriptionPlans = ({
  selectedBillingType,
  userData,
  createPortalSession = { createPortalSession },
}) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <PlanTile
          planName="Free"
          price="0"
          priceId=""
          selectedBillingType={selectedBillingType}
          userData={userData}
          createPortalSession={createPortalSession}
        />
        <PlanTile
          planName="Basic"
          price={selectedBillingType === "monthly" ? "10" : "100"}
          priceId="price_1MtZWtA6tstbPJ9j6SBQluzy"
          selectedBillingType={selectedBillingType}
          userData={userData}
          createPortalSession={createPortalSession}
        />
        <PlanTile
          planName="Premium"
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
