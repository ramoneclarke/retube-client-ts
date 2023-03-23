import React from "react";
import { FaRegHandScissors, FaListAlt, FaSearchengin } from "react-icons/fa";
import DashSnippetsTile from "./DashSnippetsTile";
import DashStatTile from "./DashStatTile";
import DashSummariesTile from "./DashSummariesTile";

const DashboardDesign = () => {
  return (
    <div className="flex w-full flex-col gap-16">
      <div className="flex h-48 w-full px-4 py-2">
        <div className="flex h-full w-full gap-6 rounded-xl">
          <DashStatTile
            label="Snippets Usage:"
            stat="3/20"
            text="Snippets"
            icon={<FaRegHandScissors size="1.3rem" className="text-brand" />}
          />
          <DashStatTile
            label="Summary Minutes Usage:"
            stat="72/300"
            text="Minutes"
            icon={<FaListAlt size="1.3rem" className="text-brand" />}
          />
          <DashStatTile
            label="Search Videos Usage:"
            stat="14/50"
            text="Videos"
            icon={<FaSearchengin size="1.3rem" className="text-brand" />}
          />
        </div>
      </div>
      <div className="flex h-56 w-full flex-col gap-2 px-4 ">
        <h2 className="px-4 text-xl font-bold text-darker dark:text-lighter">
          Recent Snippets
        </h2>
        <div className="flex h-full w-full gap-6 rounded-xl">
          <DashSnippetsTile />
          <DashSnippetsTile />
          <DashSnippetsTile />
        </div>
      </div>
      <div className="flex h-56 w-full flex-col gap-2 px-4">
        <h2 className="px-4 text-xl font-bold text-darker dark:text-lighter">
          Recent Summaries
        </h2>
        <div className="flex h-full w-full gap-6 rounded-xl">
          <DashSummariesTile />
          <DashSummariesTile />
          <DashSummariesTile />
          {/* <DashSummariesTile /> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardDesign;
