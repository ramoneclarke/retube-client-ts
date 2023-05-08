import { motion } from "framer-motion";
import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { CiFaceFrown } from "react-icons/ci";
import { PropagateLoader } from "react-spinners";
import Link from "next/link";
import SummaryDisplay from "@/pages/designs/SummaryDisplay";

const NewSummaryWindow = ({
  summaryWindowOpen,
  setSummaryWindowOpen,
  summaryMutation,
  maxUsage,
  setMaxUsage,
  exceedsMaxLength,
  setExceedsMaxLength,
}) => {
  const handleClose = () => {
    if (maxUsage) {
      setMaxUsage(false);
      setSummaryWindowOpen(!summaryWindowOpen);
      if (exceedsMaxLength) {
        setExceedsMaxLength(false);
      }
    }
  };
  if (maxUsage) {
    return (
      <motion.div
        className="absolute top-2 right-0 z-20 flex h-[98%] w-[98vw] flex-col overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-darker lg:top-4 lg:h-[94%] lg:w-4/5 lg:p-6"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-2 right-2 flex w-full flex-row justify-end md:top-4 md:right-4 lg:top-4 lg:right-4">
          {" "}
          <IoClose
            className="cursor-pointer text-3xl text-dark dark:text-light lg:text-5xl"
            onClick={handleClose}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8">
          <CiFaceFrown className="text-9xl text-red-400" />
          <div className="flex flex-row items-center gap-2">
            <p className="text-center text-2xl font-bold text-darkest dark:text-lightest">
              Oops! You have reached your monthly summaries limit
            </p>{" "}
          </div>
          <p className="text-center text-xl text-darkest dark:text-lightest">
            Upgrade your account to unlock a higher summary limit and more
            advanced features.{" "}
            <Link href="/account" className="font-medium">
              Click here to upgrade.
            </Link>
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  if (exceedsMaxLength) {
    return (
      <motion.div
        className="absolute top-2 right-0 z-20 flex h-[98%] w-[98vw] flex-col overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-darker lg:top-4 lg:h-[94%] lg:w-4/5 lg:p-6"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-2 right-2 flex w-full flex-row justify-end md:top-4 md:right-4 lg:top-4 lg:right-4">
          {" "}
          <IoClose
            className="cursor-pointer text-3xl text-dark dark:text-light lg:text-5xl"
            onClick={() => setSummaryWindowOpen(!summaryWindowOpen)}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8">
          <BiErrorCircle className="text-9xl text-red-400" />
          <p className="text-center text-xl text-red-400">
            Video duration exceeds the maximum length allowed for your
            subscription plan. Please upgrade to a higher plan or choose a
            shorter video to summarize.
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  if (summaryMutation.isError) {
    return (
      <motion.div
        className="absolute top-2 right-0 z-20 flex h-[98%] w-[98vw] flex-col overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-darker lg:top-4 lg:h-[94%] lg:w-4/5 lg:p-6"
        initial={{ x: 1500 }}
        animate={{ x: 0 }}
        exit={{ x: 1500 }}
        transition={{ duration: 0.3, type: "tween" }}
      >
        <div className="absolute top-2 right-2 flex w-full flex-row justify-end md:top-4 md:right-4 lg:top-4 lg:right-4">
          {" "}
          <IoClose
            className="cursor-pointer text-3xl text-dark dark:text-light lg:text-5xl"
            onClick={() => setSummaryWindowOpen(!summaryWindowOpen)}
          />
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-8">
          <BiErrorCircle className="text-9xl text-red-400" />
          <p className="text-center text-xl text-red-400">
            An error occurred while creating the summary. Please try again.
          </p>{" "}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="absolute top-2 right-0 z-20 flex h-[98%] w-[98vw] flex-col overflow-y-scroll rounded-xl bg-slate-200 p-4 shadow-lg dark:bg-darker lg:top-4 lg:h-[94%] lg:w-4/5 lg:p-6"
      initial={{ x: 1500 }}
      animate={{ x: 0 }}
      exit={{ x: 1500 }}
      transition={{ duration: 0.3, type: "tween" }}
    >
      <div className="absolute top-2 right-2 flex w-full flex-row justify-end md:top-4 md:right-4 lg:top-4 lg:right-4">
        {" "}
        <IoClose
          className="cursor-pointer text-3xl text-dark dark:text-light lg:text-5xl"
          onClick={() => setSummaryWindowOpen(!summaryWindowOpen)}
        />
      </div>
      <div className="mt-6 flex h-full w-full lg:mt-0">
        {summaryMutation.isIdle || summaryMutation.isLoading ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6 pb-10">
            <p className="text-xl text-darkest dark:text-lightest">
              Loading Summary
            </p>
            <PropagateLoader color="#6EE7B7" />
          </div>
        ) : (
          <SummaryDisplay newSummary={true} summaryMutation={summaryMutation} />
        )}
      </div>
    </motion.div>
  );
};

export default NewSummaryWindow;
