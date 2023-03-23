import React from "react";
import SnippetTileDesign from "./SnippetTileDesign";

const SummariesPageDesign = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center gap-8">
      <div className="flex h-16 w-4/5 flex-row gap-2">
        <div className="flex h-full w-5/6 overflow-hidden rounded-xl bg-lightest shadow-md dark:bg-darker">
          {/* Search bar */}
          <input
            type="text"
            placeholder="Enter a Youtube URL"
            className="h-full w-full p-4 text-lg outline-none dark:bg-darker/50 dark:text-lighter "
          />
        </div>
        <button
          type="submit"
          className="h-full w-1/6 rounded-xl bg-violet-600 font-medium text-lightest shadow-md dark:bg-violet-600"
        >
          Summarise
        </button>
      </div>
      <div className="mb-12 flex min-h-[50vh] w-4/5 flex-col items-center gap-y-8 rounded-xl bg-lightest p-8 shadow-md dark:bg-darker"></div>
      <div className="w-5/6">
        <h2 className="text-xl font-bold text-darker dark:text-lighter">
          Recent Summaries
        </h2>
      </div>
      <div className="flex w-4/5 flex-row flex-wrap gap-4">
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
        <SnippetTileDesign />
      </div>
    </div>
  );
};

export default SummariesPageDesign;
