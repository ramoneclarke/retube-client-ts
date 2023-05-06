import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";
import ClipboardButton from "../ClipboardButton";
import useMediaQuery from "@/hooks/useMediaQuery";

const SnippetDisplay = ({
  newSnippet,
  snippetMutation,
  startTimeSeconds,
  endTimeSeconds,
  existingSnippetData,
}) => {
  const [copied, setCopied] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  if (newSnippet) {
    return (
      <div className="flex h-full w-full flex-col gap-2 py-2">
        <div className="flex h-fit w-full flex-col gap-4 lg:flex-row">
          <div className="flex h-fit w-full flex-col lg:w-1/2">
            {/* Video title  */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  {isMobile ? "Title:" : "Video Title:"}
                </h2>
              </div>
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {snippetMutation?.data?.video?.title}
              </p>
            </div>
            {/* Snippet timestamps */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  Time:{" "}
                </h2>
              </div>{" "}
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {formatTimeFromSeconds(startTimeSeconds)} -{" "}
                {formatTimeFromSeconds(endTimeSeconds)}
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
              {snippetMutation?.data ? (
                <div className="w-4/5">
                  <Link
                    href={snippetMutation?.data?.video?.url}
                    className="flex h-full w-full items-center text-base text-blue-500 lg:px-4 lg:text-lg"
                  >
                    {snippetMutation?.data?.video?.url}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-full items-end justify-end gap-4 lg:w-1/2 ">
            {" "}
            <ClipboardButton
              text={snippetMutation?.data?.text}
              setCopied={setCopied}
              copied={copied}
              clipboardType="Snippet"
            />
          </div>
        </div>
        {/* Snippet text */}
        <div className="flex h-full w-full flex-col gap-4 pt-4 lg:flex-row">
          <h2 className="w-28 text-lg text-gray-400">Snippet: </h2>
          <div className="flex h-fit w-full flex-1 rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700 lg:min-h-full lg:overflow-y-auto">
            <p className="text-darkest dark:text-lightest">
              {snippetMutation?.data?.text}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return existingSnippetData ? (
      <div className="flex h-full w-full flex-col gap-2 py-2">
        <div className="flex h-fit w-full flex-col gap-4 lg:flex-row">
          <div className="flex h-fit w-full flex-col lg:w-1/2">
            {/* Video title  */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  {isMobile ? "Title:" : "Video Title:"}
                </h2>
              </div>
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {existingSnippetData?.video?.title}
              </p>
            </div>
            {/* Snippet timestamps */}
            <div className="flex h-16 w-full items-center lg:gap-4">
              <div className="">
                {" "}
                <h2 className="w-16 text-base text-gray-400 lg:w-28 lg:text-lg">
                  Time:{" "}
                </h2>
              </div>{" "}
              <p className="flex h-full items-center text-base text-darkest dark:text-lightest lg:px-4 lg:text-lg">
                {formatTimeFromSeconds(startTimeSeconds)} -{" "}
                {formatTimeFromSeconds(endTimeSeconds)}
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
                  href={existingSnippetData?.video?.url}
                  className="flex h-full w-full items-center text-base text-blue-500 lg:px-4 lg:text-lg"
                >
                  {existingSnippetData?.video?.url}
                </Link>
              </div>
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-full items-end justify-end gap-4 lg:w-1/2 ">
            {" "}
            <ClipboardButton
              text={existingSnippetData?.text}
              setCopied={setCopied}
              copied={copied}
              clipboardType="Snippet"
            />
          </div>
        </div>
        {/* Snippet text */}
        <div className="flex h-full w-full flex-col gap-4 pt-4 lg:flex-row">
          <h2 className="w-28 text-lg text-gray-400">Snippet: </h2>
          <div className="flex h-fit w-full flex-1 rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700 lg:min-h-full lg:overflow-y-auto">
            <p className="text-darkest dark:text-lightest">
              {existingSnippetData?.text}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
          <p className="text-xl text-darkest dark:text-lightest">
            Loading Snippet
          </p>
          <PropagateLoader color="#6EE7B7" />
        </div>
      </div>
    );
  }
};

export default SnippetDisplay;
