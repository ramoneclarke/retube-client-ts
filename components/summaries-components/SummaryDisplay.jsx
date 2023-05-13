import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";
import useMediaQuery from "@/hooks/useMediaQuery";
import ClipboardButton from "@/components/Shared/ClipboardButton";
import { formatSummary } from "@/utils/utils";

const SummaryDisplay = ({
  newSummary,
  summaryMutation,
  existingSummaryData,
}) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  if (newSummary) {
    return (
      <div className="flex h-full w-full flex-col gap-2 py-2">
        <div className="flex h-fit w-full flex-col gap-4 lg:flex-row">
          <div className="flex h-fit w-full flex-col gap-4 lg:w-1/2">
            {/* Video title  */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  {isMobile ? "Title:" : "Video Title:"}
                </h2>
              </div>
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {summaryMutation?.data?.video?.title}
              </p>
            </div>
            {/* Youtube URL */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  URL:{" "}
                </h2>
              </div>{" "}
              {summaryMutation?.data ? (
                <div className="w-4/5">
                  <Link
                    href={summaryMutation?.data?.video?.url}
                    className="flex h-full w-full items-center text-base text-blue-500 lg:px-4 lg:text-lg"
                  >
                    {summaryMutation?.data?.video?.url}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-full items-end justify-end gap-4 lg:w-1/2 ">
            {" "}
            <ClipboardButton
              text={formatSummary(summaryMutation?.data?.bullet_points)}
              setCopied={setCopied}
              copied={copied}
              clipboardType="Summary"
            />
          </div>
        </div>
        {/* Summary text */}
        <div className="flex h-full w-full flex-col gap-4 pt-4 lg:flex-row">
          <h2 className="w-28 text-lg text-gray-400">Summary: </h2>
          <div className="flex h-fit w-full flex-1 rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700 lg:min-h-full lg:overflow-y-auto">
            <p className="whitespace-pre-wrap text-darkest dark:text-lightest">
              {formatSummary(summaryMutation?.data?.bullet_points)}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return existingSummaryData ? (
      <div className="flex h-full w-full flex-col gap-2 py-2">
        <div className="flex h-fit w-full flex-col gap-4 lg:flex-row">
          <div className="flex h-fit w-full flex-col md:gap-0 lg:w-1/2 lg:gap-4">
            {/* Video title  */}
            <div className="flex w-full items-center md:mt-4 md:h-10  lg:mt-0 lg:h-16 lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  {isMobile ? "Title:" : "Video Title:"}
                </h2>
              </div>
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {existingSummaryData?.video?.title}
              </p>
            </div>
            {/* Youtube URL */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  URL:{" "}
                </h2>
              </div>{" "}
              <div className="w-4/5">
                {" "}
                <Link
                  href={existingSummaryData?.video?.url}
                  className="flex h-full w-full items-center text-base text-blue-500 lg:px-4 lg:text-lg"
                >
                  {existingSummaryData?.video?.url}
                </Link>
              </div>
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-full items-end justify-end gap-4 lg:w-1/2 ">
            {" "}
            <ClipboardButton
              text={existingSummaryData?.bullet_points}
              setCopied={setCopied}
              copied={copied}
              clipboardType="Summary"
            />
          </div>
        </div>
        {/* Summary text */}
        <div className="flex h-full w-full flex-col gap-4 pt-4 lg:flex-row">
          <h2 className="w-28 text-lg text-gray-400">Summary: </h2>
          <div className="flex h-fit w-full flex-1 rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700 lg:min-h-full lg:overflow-y-auto">
            <p className="whitespace-pre-wrap text-darkest dark:text-lightest">
              {formatSummary(existingSummaryData?.bullet_points)}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
          <p className="text-xl text-darkest dark:text-lightest">
            Loading Summary
          </p>
          <PropagateLoader color="#6EE7B7" />
        </div>
      </div>
    );
  }
};

export default SummaryDisplay;
