import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { PropagateLoader } from "react-spinners";
import Card from "../Card";
import SnippetWindow from "./NewSnippetWindow";

const RecentSnippetsSection = ({
  data,
  setSnippetWindowOpen,
  setSelectedSnippetData,
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
        <h2 className="mb-4 text-xl font-semibold text-darker dark:text-lighter lg:mb-0">
          Recent Snippets
        </h2>
      </div>
      <div className="flex w-full justify-center lg:w-4/5">
        <div className="flex h-full w-full flex-row flex-wrap justify-center gap-8 md:gap-4 lg:gap-4">
          {" "}
          {data.map((snippet) => (
            <Card
              key={snippet.id}
              snippet={snippet}
              text={snippet.text}
              title={snippet.video.title}
              videoId={snippet.video.video_id}
              setSelectedSnippetData={setSelectedSnippetData}
              setSnippetWindowOpen={setSnippetWindowOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentSnippetsSection;
