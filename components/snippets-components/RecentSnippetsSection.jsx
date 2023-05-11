import React from "react";
import { PropagateLoader } from "react-spinners";
import Card from "./Card";

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
        <h2 className="mb-4 text-base font-semibold text-darker dark:text-lighter lg:mb-0">
          Recent Snippets
        </h2>
      </div>
      <div className="flex w-full justify-center lg:w-4/5">
        <div className="flex h-full w-full flex-row flex-wrap justify-center gap-8 p-0 md:gap-4 md:p-0 lg:gap-4">
          {data.length === 0 ? (
            <div className="px-4">
              <p className="text-sm text-darkest dark:text-light">
                No snippets created
              </p>
            </div>
          ) : null}
          {data.map((snippet) => (
            <div
              className="h-fit w-full md:w-[31%] lg:h-96 lg:w-[31%]"
              key={snippet.id}
            >
              <Card
                snippet={snippet}
                text={snippet.text}
                title={snippet.video.title}
                videoId={snippet.video.video_id}
                setSelectedSnippetData={setSelectedSnippetData}
                setSnippetWindowOpen={setSnippetWindowOpen}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentSnippetsSection;
