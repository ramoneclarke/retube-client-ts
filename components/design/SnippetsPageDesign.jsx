import { formatTimeFromSeconds } from "@/utils/formatTimeFromSeconds";
import React, { useState } from "react";
import YouTube from "react-youtube";
import SnippetSlider from "../SnippetSlider";
import SnippetTileDesign from "./SnippetTileDesign";

const SnippetsPageDesign = () => {
  const testVideoEndTimeSeconds = 60;
  const [startTimeSeconds, setStartTimeSeconds] = useState(0);
  const [endTimeSeconds, setEndTimeSeconds] = useState(testVideoEndTimeSeconds);

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: startTimeSeconds,
      end: endTimeSeconds,
      fs: 0,
    },
  };

  const setEndTimeToDuration = (e) => {
    const duration = e.target.getDuration();
    setEndTimeSeconds(duration - 1);
  };

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
          Load Video
        </button>
      </div>
      <div className="relative flex w-auto items-center justify-center overflow-hidden rounded-xl shadow-md">
        {/* <iframe
          style={{ width: "100%", height: "100%" }}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/mr15Xzb1Ook?&start=${
            startTimeSeconds.toString
          }&end=${endTimeSeconds.toString()}`}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay;"
          //   title={`${title} trailer`}
        /> */}
        <YouTube
          videoId="mr15Xzb1Ook"
          opts={opts}
          className="flex"
          onReady={(e) => setEndTimeToDuration(e)}
          // style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="mb-12 flex w-4/5 flex-col items-center gap-y-8 rounded-xl bg-lightest p-8 shadow-md dark:bg-darker">
        <div className="flex w-full flex-col items-center gap-2">
          {/* Controls */}
          <div className="mb-4 flex  h-14 w-60 flex-row items-center justify-center gap-4 rounded-xl bg-light text-2xl font-medium dark:bg-light">
            {/* Snippet details view */}
            <p className="text-darker dark:text-darker">
              {formatTimeFromSeconds(startTimeSeconds)}
            </p>
            <p className="text-darker dark:text-darker">-</p>
            <p className="text-darker dark:text-darker">
              {formatTimeFromSeconds(endTimeSeconds)}
            </p>
          </div>
          <p className="text-darker dark:text-lighter">
            Drag the sliders below to set the start and end times for your
            snippet
          </p>
          <div className="flex w-full flex-row items-center justify-start gap-4">
            {/* Start */}
            <p className="w-[14%] text-base font-normal text-slate-400">
              Snippet time:{" "}
            </p>
            <SnippetSlider
              startTimeSeconds={startTimeSeconds}
              endTimeSeconds={endTimeSeconds}
              maxTimeSeconds={testVideoEndTimeSeconds}
              setStartTimeSeconds={setStartTimeSeconds}
              setEndTimeSeconds={setEndTimeSeconds}
            />
            <button
              type="submit"
              className="h-12 w-24 rounded-xl bg-brand font-medium text-darkest shadow-md dark:bg-brand"
            >
              Snip
            </button>
          </div>
        </div>
      </div>
      <div className="w-5/6">
        <h2 className="text-xl font-bold text-darker dark:text-lighter">
          Recent Snippets
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

export default SnippetsPageDesign;
