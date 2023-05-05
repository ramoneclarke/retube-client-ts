import useRefetchingSession from "@/hooks/useRefetchingSession";
import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import { motion } from "framer-motion";
import React from "react";
import InfoTooltip from "../InfoTooltip";
import SnippetSlider from "./SnippetSlider";

const SnippetsControls = ({
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
}) => {
  const { data: session, status, update } = useRefetchingSession();

  const snippetsUsage = userData?.subscription.snippets_usage;
  const snippetsMonthlyLimit =
    userData?.subscription.plan.snippets_monthly_limit;

  console.log(session);

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
    <div className="mb-12 flex w-4/5 flex-col items-center gap-y-8 rounded-xl bg-lightest p-8 shadow-md dark:bg-darker">
      <div className="flex w-full flex-col items-center gap-2">
        {/* Controls */}
        <div className="mb-4 flex  h-14 w-60 flex-row items-center justify-center gap-4 rounded-xl bg-slate-200 text-2xl font-medium dark:bg-light">
          {/* Snippet details view */}
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(startTimeSeconds)}
          </p>
          <p className="text-darker dark:text-darker">-</p>
          <p className="text-darker dark:text-darker">
            {formatTimeFromSeconds(endTimeSeconds)}
          </p>
        </div>
        <div className="flex w-full flex-row items-center justify-start gap-4 px-8">
          {/* Start */}
          <InfoTooltip text="Drag the sliders to set the start and end times for your snippet" />
          <SnippetSlider
            endTimeSeconds={endTimeSeconds}
            maxTimeSeconds={videoDuration}
            setStartTimeSeconds={setStartTimeSeconds}
            setEndTimeSeconds={setEndTimeSeconds}
            userData={userData}
          />
          <motion.button
            onClick={handleClick}
            className="h-12 w-24 rounded-xl bg-brand font-medium text-darkest shadow-md dark:bg-brand"
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
