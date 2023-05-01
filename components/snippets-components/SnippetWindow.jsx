import { motion } from "framer-motion";
import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { PropagateLoader } from "react-spinners";
import SnippetDisplay from "./SnippetDisplay";

const SnippetWindow = ({
  snippetWindowOpen,
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
          onClick={handleClose}
        />
      </div>
      <div className="flex h-full w-full">
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
