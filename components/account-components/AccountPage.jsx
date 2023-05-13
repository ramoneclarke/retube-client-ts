import React, { useState } from "react";
import SubscriptionPlans from "./SubscriptionPlans";
import Layout from "../layout-components/Layout";
import BillingTypeTabs from "./BillingTypeTabs";
import { motion } from "framer-motion";
import { useUserData } from "@/hooks/useUserData";

const AccountPage = ({ createPortalSession, initialUserData }) => {
  const [selectedBillingType, setSelectedBillingType] = useState("monthly");

  const { data: userData, refetch: refetchUserData } =
    useUserData(initialUserData);

  return (
    <div>
      <Layout>
        <div className="flex w-full flex-col gap-8">
          <div className="mt-4 flex w-full p-4 md:mt-0 md:w-1/4">
            <motion.button
              className="no-tap-highlight w-full rounded-xl border-darker bg-brand p-4 font-semibold dark:border-lighter md:border-2"
              onClick={createPortalSession}
              whileHover={{ backgroundColor: "rgb(0 220 155)" }}
            >
              Manage Billing
            </motion.button>
          </div>
          <div className="flex w-full flex-col items-center gap-2 text-darkest dark:text-lightest">
            <h1 className="text-center text-3xl">Upgrade your plan</h1>
            <h2 className="text-center text-xl">
              Choose the plan and payment schedule that works for you.
            </h2>
          </div>
          <div className="flex w-full flex-col items-center">
            <BillingTypeTabs
              setSelectedBillingType={setSelectedBillingType}
              selectedBillingType={selectedBillingType}
            />
          </div>
          <div className="flex w-full px-8 md:py-8">
            <SubscriptionPlans
              selectedBillingType={selectedBillingType}
              userData={userData}
              createPortalSession={createPortalSession}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AccountPage;
