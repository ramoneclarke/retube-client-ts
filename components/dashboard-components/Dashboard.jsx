import useRefetchingSession from "@/hooks/useRefetchingSession";
import { handleSignOut } from "@/utils/handlers";
import { withAuth } from "@/utils/withAuth";
import React, { useState } from "react";
import Layout from "../layout-components/Layout";
import DashStatTile from "./DashStatTile";
import DashSnippetsTile from "./DashSnippetsTile";
import DashSummariesTile from "./DashSummariesTile";
import { useUserData } from "@/hooks/useUserData";
import Card from "../snippets-components/Card";
import { AnimatePresence } from "framer-motion";
import SnippetWindow from "../snippets-components/SnippetWindow";
import SummaryWindow from "../summaries-components/SummaryWindow";
import SummaryCard from "../summaries-components/SummaryCard";
import DashboardSnippetsSection from "./DashboardSnippetsSection";
import DashboardSummariesSection from "./DashboardSummariesSection";

const Dashboard = ({ initialUserData }) => {
  const [snippetWindowOpen, setSnippetWindowOpen] = useState(false);
  const [selectedSnippetData, setSelectedSnippetData] = useState(null);
  const [summaryWindowOpen, setSummaryWindowOpen] = useState(false);
  const [selectedSummaryData, setSelectedSummaryData] = useState(null);

  const { data: userData, refetch: refetchUserData } =
    useUserData(initialUserData);

  return (
    <div>
      <Layout>
        <div className="flex w-full flex-col gap-4">
          <div className="mb-12 mt-4 flex h-48 w-full px-4 py-2 md:mt-0">
            <div className="flex h-full w-full justify-center gap-3 rounded-xl lg:justify-start lg:gap-6">
              <DashStatTile
                label="Snippets Usage"
                stat={`${userData?.subscription?.snippets_usage}/${userData?.subscription?.plan.snippets_monthly_limit}`}
                text="Snippets"
              />
              <DashStatTile
                label="Summaries Usage"
                stat={`${userData?.subscription?.summaries_usage}/${userData?.subscription?.plan.summaries_monthly_limit}`}
                text="Summaries"
              />
              <DashStatTile
                label="Search Videos"
                stat={
                  userData?.subscription.search_videos_used
                    ? `${userData?.subscription?.search_videos_used}/${userData?.subscription?.plan.search_videos_limit}`
                    : "N/A"
                }
                text={
                  userData?.subscription?.search_videos_used ? "Videos" : ""
                }
              />
              {/* <DashStatTile
                label="Subscription"
                subscription={{
                  planName: userData.subscription.plan.name,
                  renewalDate: userData.subscription.end_date,
                }}
              /> */}
            </div>
          </div>
          <DashboardSnippetsSection
            userData={userData}
            snippetWindowOpen={snippetWindowOpen}
            setSnippetWindowOpen={setSnippetWindowOpen}
            selectedSnippetData={selectedSnippetData}
            setSelectedSnippetData={setSelectedSnippetData}
          />
          <DashboardSummariesSection
            userData={userData}
            setSelectedSummaryData={setSelectedSummaryData}
            setSummaryWindowOpen={setSummaryWindowOpen}
            summaryWindowOpen={summaryWindowOpen}
            selectedSummaryData={selectedSummaryData}
          />
        </div>
      </Layout>
    </div>
  );
};

export default withAuth()(Dashboard);
