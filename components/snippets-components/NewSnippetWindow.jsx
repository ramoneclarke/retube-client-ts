import { motion } from "framer-motion";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { CiFaceFrown } from "react-icons/ci";
import { PropagateLoader } from "react-spinners";
import SnippetDisplay from "./SnippetDisplay";
import Link from "next/link";

const NewSnippetWindow = ({
  snippetWindowOpen,
  setSnippetWindowOpen,
  snippetMutation,
  startTimeSeconds,
  endTimeSeconds,
  maxUsage,
  setMaxUsage,
}) => {
  const handleClose = () => {
    if (maxUsage) {
      setMaxUsage(false);
      setSnippetWindowOpen(!snippetWindowOpen);
    }
  };
  if (maxUsage) {
    return (
      <motion.div
        className="absolute right-0 z-20 flex h-[90vh] w-4/5 flex-col overflow-y-scroll rounded-xl bg-slate-200 p-6 shadow-lg dark:bg-darker"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
          {" "}
          <IoClose
            className="cursor-pointer text-5xl text-dark dark:text-light"
            onClick={handleClose}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
          <CiFaceFrown className="text-9xl text-red-400" />
          <div className="flex flex-row items-center gap-2">
            <p className="text-2xl font-bold text-darkest dark:text-lightest">
              Oops! You have reached your monthly snippets limit
            </p>{" "}
          </div>
          <p className="text-center text-xl text-darkest dark:text-lightest">
            Upgrade your account to unlock a higher snippet limit and more
            advanced features.{" "}
            <Link href="/account" className="font-medium">
              Click here to upgrade.
            </Link>
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  if (snippetMutation.isError) {
    console.log(snippetMutation.error);
    return (
      <motion.div
        className="absolute right-0 z-20 flex h-[90vh] w-4/5 flex-col overflow-y-scroll rounded-xl bg-slate-200 p-6 shadow-lg dark:bg-darker"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
          {" "}
          <IoClose
            className="cursor-pointer text-5xl text-dark dark:text-light"
            onClick={() => setSnippetWindowOpen(!snippetWindowOpen)}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8">
          <BiErrorCircle className="text-9xl text-red-400" />
          <p className="text-xl text-red-400">
            An error occurred while creating the snippet. Please try again.
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="absolute right-0 z-20 flex h-[90vh] w-4/5 flex-col overflow-y-scroll rounded-xl bg-slate-200 p-6 shadow-lg dark:bg-darker"
      initial={{ x: 1500 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div className="absolute top-4 right-4 flex w-full flex-row justify-end">
        {" "}
        <IoClose
          className="cursor-pointer text-5xl text-dark dark:text-light"
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
