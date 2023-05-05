import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import Link from "next/link";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";
import ClipboardButton from "../ClipboardButton";

const SnippetDisplay = ({
  newSnippet,
  snippetMutation,
  startTimeSeconds,
  endTimeSeconds,
  existingSnippetData,
}) => {
  const [copied, setCopied] = useState(false);

  if (newSnippet) {
    return (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-fit w-full flex-row">
          <div className="flex h-fit w-1/2 flex-col">
            {/* Video title  */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">Video Title: </h2>
              <p className="flex h-full items-center px-4 text-lg text-darkest dark:text-lightest">
                {snippetMutation?.data?.video?.title}
              </p>
            </div>
            {/* Snippet timestamps */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">Time: </h2>
              <p className="flex h-full items-center px-4 text-lg text-darkest dark:text-lightest">
                {formatTimeFromSeconds(startTimeSeconds)} -{" "}
                {formatTimeFromSeconds(endTimeSeconds)}
              </p>
            </div>
            {/* Youtube URL */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">URL: </h2>
              {snippetMutation?.data ? (
                <Link
                  href={snippetMutation?.data?.video?.url}
                  className="flex h-full items-center px-4 text-lg text-blue-500"
                >
                  {snippetMutation?.data?.video?.url}
                </Link>
              ) : null}
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-1/2 items-end justify-end gap-4 ">
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
        <div className="flex h-full w-full gap-4 pt-4">
          <h2 className="w-28 text-lg text-gray-400">Snippet: </h2>
          <div className="flex h-fit min-h-full w-full flex-1 overflow-y-auto rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700">
            <p className="text-darkest dark:text-lightest">
              {snippetMutation?.data?.text}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return existingSnippetData ? (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-fit w-full flex-row">
          <div className="flex h-fit w-1/2 flex-col">
            {/* Video title  */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">Video Title: </h2>
              <p className="flex h-full items-center px-4 text-lg text-darkest dark:text-lightest">
                {existingSnippetData?.video?.title}
              </p>
            </div>
            {/* Snippet timestamps */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">Time: </h2>
              <p className="flex h-full items-center px-4 text-lg text-darkest dark:text-lightest">
                {formatTimeFromSeconds(startTimeSeconds)} -{" "}
                {formatTimeFromSeconds(endTimeSeconds)}
              </p>
            </div>
            {/* Youtube URL */}
            <div className="flex h-16 w-full items-center gap-4">
              <h2 className="w-28 text-lg text-gray-400">URL: </h2>
              <Link
                href={existingSnippetData?.video?.url}
                className="flex h-full items-center px-4 text-lg text-blue-500"
              >
                {existingSnippetData?.video?.url}
              </Link>
            </div>
          </div>
          {/* Copy to clipboard */}
          <div className="flex h-full w-1/2 items-end justify-end gap-4 ">
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
        <div className="flex h-full w-full gap-4 pt-4">
          <h2 className="w-28 text-lg text-gray-400">Snippet: </h2>
          <div className="flex h-fit min-h-full w-full flex-1 overflow-y-auto rounded-3xl bg-lighter p-4 text-lg shadow-md dark:bg-slate-700">
            <p className="text-darkest dark:text-lightest">
              {existingSnippetData?.text}
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex h-full w-full flex-col gap-2">
        <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
          <p className="text-xl">Loading Snippet</p>
          <PropagateLoader color="#6EE7B7" />
        </div>
      </div>
    );
  }
};

export default SnippetDisplay;
