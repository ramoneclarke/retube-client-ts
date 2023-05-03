import { motion } from "framer-motion";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { PropagateLoader } from "react-spinners";
import SnippetDisplay from "./SnippetDisplay";

const NewSnippetWindow = ({
  snippetWindowOpen,
  setSnippetWindowOpen,
  snippetMutation,
  startTimeSeconds,
  endTimeSeconds,
}) => {
  if (snippetMutation.isError) {
    console.log(snippetMutation.error);
    return (
      <motion.div
        className="absolute right-0 z-20 flex h-[90vh] w-4/5 flex-col overflow-y-scroll rounded-xl bg-slate-200 p-6 shadow-lg"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
          {" "}
          <IoClose
            className="cursor-pointer text-5xl text-dark"
            onClick={() => setSnippetWindowOpen(!snippetWindowOpen)}
          />
        </div>
        <div className="flex h-full w-full flex-row items-center justify-center gap-2 p-8">
          <BiErrorCircle className="text-5xl text-red-400" />
          <p className="text-xl text-red-400">
            An error occurred while creating the snippet. Please try again.
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="absolute right-0 z-20 flex h-[90vh] w-4/5 flex-col overflow-y-scroll rounded-xl bg-slate-200 p-6 shadow-lg"
      initial={{ x: 1500 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
        {" "}
        <IoClose
          className="cursor-pointer text-5xl text-dark"
          onClick={() => setSnippetWindowOpen(!snippetWindowOpen)}
        />
      </div>
      <div className="flex h-full w-full">
        {snippetMutation.isIdle || snippetMutation.isLoading ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
            <p className="text-xl">Loading Snippet</p>
            <PropagateLoader color="#6EE7B7" />
          </div>
        ) : (
          <SnippetDisplay
            newSnippet={true}
            snippetMutation={snippetMutation}
            startTimeSeconds={startTimeSeconds}
            endTimeSeconds={endTimeSeconds}
          />
        )}
      </div>
    </motion.div>
  );
};

export default NewSnippetWindow;
