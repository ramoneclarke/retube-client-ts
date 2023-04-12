import React from "react";
import PlanTile from "./PlanTile";

const SubscriptionPlans = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <h1 className="">Choose a Subscription</h1>
      <p className="text-lg">Monthly Billing</p>
      <div className="flex w-full flex-row gap-8">
        <PlanTile planName="Free" price="0" priceId="" />
        <PlanTile
          planName="Basic"
          price="10"
          priceId="price_1MtZWtA6tstbPJ9j6SBQluzy"
        />
        <PlanTile
          planName="Premium"
          price="30"
          priceId="price_1MtZa0A6tstbPJ9jRykgICGE"
        />
      </div>
    </div>
  );
};

export default SubscriptionPlans;
