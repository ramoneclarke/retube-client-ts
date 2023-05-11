import React from "react";
import { PropagateLoader } from "react-spinners";
import SummaryCard from "./SummaryCard";

const RecentSummariesSection = ({
  data,
  setSummaryWindowOpen,
  setSelectedSummaryData,
}) => {
  if (!data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
        <PropagateLoader color="#6EE7B7" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full lg:w-5/6">
        <h2 className="mb-0 text-base font-semibold text-darker dark:text-lighter md:mb-4 lg:mb-0">
          Recent Summaries
        </h2>
      </div>
      <div className="flex w-full justify-center lg:w-4/5">
        <div className="flex h-full w-full flex-row flex-wrap justify-start gap-8 p-0 md:gap-4 md:p-0 lg:gap-4">
          {" "}
          {data.length === 0 ? (
            <div className="px-4">
              <p className="text-sm text-darkest dark:text-light">
                No summaries created
              </p>
            </div>
          ) : null}
          {data.map((summary) => (
            <div
              className="h-fit w-full md:h-[17rem] md:w-[31%] lg:h-[17rem] lg:w-[31%]"
              key={summary.id}
            >
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
    </>
  );
};

export default RecentSummariesSection;
