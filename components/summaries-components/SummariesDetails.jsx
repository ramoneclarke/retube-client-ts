import React from "react";
import SummariesDetail from "./SummariesDetail";
import { formatDuration } from "@/utils/utils";
import useMediaQuery from "@/hooks/useMediaQuery";

const SummariesDetails = ({ userData, isMobile }) => {
  const summariesUsage = userData?.subscription.summaries_usage;
  const summariesMonthlyLimit =
    userData?.subscription.plan.summaries_monthly_limit;
  const summariesMaxVideoLength = formatDuration(
    userData?.subscription.plan.summaries_max_video_length
  );
  const totalSummaries = userData?.summaries.length;

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-y-8 rounded-lg bg-lightest p-3 shadow-md dark:bg-slate-800 md:h-fit md:min-h-[30vh] md:min-h-[10vh] md:p-6 lg:min-h-0 lg:w-4/5 lg:p-8">
      <div className="flex w-full flex-row items-center justify-start gap-3 md:flex-row md:gap-8 lg:flex-row lg:px-0">
        <SummariesDetail
          label="Usage"
          stat={`${summariesUsage.toString()}/${summariesMonthlyLimit.toString()}`}
        />
        <SummariesDetail
          label={isMobile ? "Max Length" : "Max Video Length"}
          stat={`${summariesMaxVideoLength.toString()}`}
        />
        <SummariesDetail
          label={isMobile ? "Total Summaries" : "Total Summaries Created"}
          stat={`${totalSummaries.toString()}`}
        />
      </div>
    </div>
  );
};

export default SummariesDetails;
