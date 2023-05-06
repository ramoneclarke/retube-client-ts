import { motion } from "framer-motion";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { PropagateLoader } from "react-spinners";
import SnippetDisplay from "./SnippetDisplay";

const SnippetWindow = ({
  setSnippetWindowOpen,
  startTimeSeconds,
  endTimeSeconds,
  existingSnippetData,
  setSelectedSnippetData,
}) => {
  const handleClose = () => {
    setSnippetWindowOpen(false);
    setSelectedSnippetData(null);
  };
  return (
    <motion.div
      className="absolute top-2 right-0 z-20 flex h-[98%] w-[98vw] flex-col overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-darker md:w-4/5 lg:top-4 lg:h-[94%] lg:w-4/5 lg:p-6"
      initial={{ x: 1500 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div className="absolute top-2 right-2 flex w-full flex-row justify-end md:top-4 md:right-4 lg:top-4 lg:right-4">
        {" "}
        <IoClose
          className="cursor-pointer text-3xl text-dark dark:text-light md:text-5xl lg:text-5xl"
          onClick={handleClose}
        />
      </div>
      <div className="mt-6 flex h-full w-full lg:mt-0">
        <SnippetDisplay
          newSnippet={false}
          startTimeSeconds={startTimeSeconds}
          endTimeSeconds={endTimeSeconds}
          existingSnippetData={existingSnippetData}
        />
      </div>
    </motion.div>
  );
};

export default SnippetWindow;
