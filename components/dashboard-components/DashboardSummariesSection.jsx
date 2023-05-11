import React from "react";
import SummaryCard from "../summaries-components/SummaryCard";
import { AnimatePresence, motion } from "framer-motion";
import SummaryWindow from "../summaries-components/SummaryWindow";
import Link from "next/link";

const DashboardSummariesSection = ({
  userData,
  setSelectedSummaryData,
  setSummaryWindowOpen,
  summaryWindowOpen,
  selectedSummaryData,
}) => {
  if (userData.summaries.length === 0) {
    return (
      <div className="flex h-[12rem] w-full flex-col px-1 md:px-4">
        <h2 className="px-4 text-base font-semibold text-darker dark:text-lighter md:text-xl">
          Recent Summaries
        </h2>
        <div className="flex w-full flex-col p-4 px-12">
          {/* <p className="">No Snippets created</p> */}
          <Link href="/summaries">
            <motion.button
              className="w-fit rounded-lg bg-violet-600 py-2 px-4 font-medium text-lighter dark:text-lighter"
              whileHover={{ opacity: 0.8, scale: 1.05 }}
            >
              Create your first summary
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[24rem] w-full flex-col px-1 md:px-4 ">
        <h2 className="px-4 text-base font-semibold text-darker dark:text-lighter md:text-xl">
          Recent Summaries
        </h2>
        <div className="no-scrollbar flex h-full w-full flex-row items-start gap-6 overflow-x-scroll rounded-xl p-4">
          {userData.summaries.slice(0, 7).map((summary) => (
            <div className="h-[90%] w-64 flex-none" key={summary.id}>
              <SummaryCard
                summary={summary}
                title={summary.video.title}
                videoId={summary.video.video_id}
                setSelectedSummaryData={setSelectedSummaryData}
                setSummaryWindowOpen={setSummaryWindowOpen}
              />
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {summaryWindowOpen ? (
          <SummaryWindow
            setSummaryWindowOpen={setSummaryWindowOpen}
            existingSummaryData={selectedSummaryData}
            setSelectedSummaryData={setSelectedSummaryData}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DashboardSummariesSection;
