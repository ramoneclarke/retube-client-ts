import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import { motion } from "framer-motion";
import React from "react";
import SnippetSlider from "./SnippetSlider";
import InfoTooltip from "../Shared/InfoTooltip";

const SnippetsControls = ({
  session,
  startTimeSeconds,
  endTimeSeconds,
  setStartTimeSeconds,
  setEndTimeSeconds,
  videoDuration,
  videoId,
  snippetMutation,
  setNewSnippetWindowOpen,
  userData,
  setMaxUsage,
  darkMode,
}) => {
  const snippetsUsage = userData?.subscription.snippets_usage;
  const snippetsMonthlyLimit =
    userData?.subscription.plan.snippets_monthly_limit;

  const handleClick = () => {
    if (snippetsUsage >= snippetsMonthlyLimit) {
      setMaxUsage(true);
      setNewSnippetWindowOpen(true);
    } else {
      if (videoId && videoDuration > 0) {
        snippetMutation.mutate({
          id: videoId,
          start: startTimeSeconds,
          end: endTimeSeconds,
          token: session.accessToken,
        });
        setNewSnippetWindowOpen(true);
      }
    }
  };

  return (
    <div className="mb-12 flex min-h-[30vh] w-full flex-col items-center gap-y-8 rounded-lg bg-lightest p-6 shadow-md dark:bg-slate-800 md:h-fit md:min-h-[10vh] lg:min-h-0 lg:w-4/5 lg:p-8">
      <div className="flex w-full flex-col items-center gap-2">
        {/* Controls */}
        <div className="mb-4 flex h-14 w-60 flex-row items-center justify-center gap-4 rounded-xl bg-slate-200 text-2xl font-medium dark:bg-light">
          {/* Snippet details view */}
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(startTimeSeconds)}
          </p>
          <p className="text-darker dark:text-darker">-</p>
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(endTimeSeconds)}
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-4 md:flex-row lg:flex-row lg:px-8">
          {/* Start */}
          <InfoTooltip text="Drag the sliders to set the start and end times for your snippet" />
          <SnippetSlider
            endTimeSeconds={endTimeSeconds}
            maxTimeSeconds={videoDuration}
            setStartTimeSeconds={setStartTimeSeconds}
            setEndTimeSeconds={setEndTimeSeconds}
            userData={userData}
            darkMode={darkMode}
          />
          <motion.button
            onClick={handleClick}
            className="no-tap-highlight h-10 w-full rounded-xl bg-brand font-medium text-darkest shadow-md dark:bg-brand dark:font-semibold md:h-12 md:w-32 lg:h-12 lg:w-24"
            whileTap={{
              scale: 0.9,
            }}
          >
            Snip
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SnippetsControls;
