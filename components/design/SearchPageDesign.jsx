import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import SearchResultRowDesign from "./SearchResultRowDesign";

const SearchPageDesign = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center gap-2">
      <div className="flex h-16 w-4/5 flex-row gap-2">
        <div className="flex h-full w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-lightest shadow-md dark:bg-darker">
          {/* Playlist selector */}
          <AiFillCaretDown className="text-mid" />
          <p className="text-gray-400">Select Playlist</p>
        </div>
        <div className="flex h-full flex-1 overflow-hidden rounded-xl bg-lightest shadow-md dark:bg-darker">
          {/* Search bar */}
          <input
            type="text"
            placeholder="What are you looking for?"
            className="h-full w-full p-4 text-lg outline-none dark:bg-darker/50 dark:text-lighter "
          />
        </div>
        <button
          type="submit"
          className="h-full w-1/6 rounded-xl bg-violet-600 font-medium text-lightest shadow-md dark:bg-violet-600"
        >
          Search
        </button>
      </div>
      <div className="mb-10 flex h-8 w-4/5 cursor-pointer flex-row items-center gap-1 px-1">
        {/* Add a playlist */}
        <IoIosAddCircleOutline className="text-mid" />
        <p className="text-base font-semibold text-mid">Add new Playlist</p>
      </div>

      <div className="w-5/6">
        <h2 className="text-xl font-bold text-darker dark:text-lighter">
          Search results:
        </h2>
      </div>
      <div className="flex w-4/5 flex-row flex-wrap gap-4">
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
        <SearchResultRowDesign />
      </div>
    </div>
  );
};

export default SearchPageDesign;
