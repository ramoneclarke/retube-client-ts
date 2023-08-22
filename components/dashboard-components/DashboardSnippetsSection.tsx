import React from "react";
import Card from "../snippets-components/Card";
import { AnimatePresence, motion } from "framer-motion";
import SnippetWindow from "../snippets-components/SnippetWindow";
import Link from "next/link";
import { UserData, UserDataSnippet } from "@/hooks/useUserData";

type DashboardSnippetsSectionProps = {
  userData: UserData;
  snippetWindowOpen: boolean;
  setSnippetWindowOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSnippetData: React.Dispatch<
    React.SetStateAction<UserDataSnippet | null>
  >;
  selectedSnippetData: UserDataSnippet | null;
};

const DashboardSnippetsSection = ({
  userData,
  snippetWindowOpen,
  setSnippetWindowOpen,
  setSelectedSnippetData,
  selectedSnippetData,
}: DashboardSnippetsSectionProps) => {
  if (userData.snippets.length === 0) {
    return (
      <div className="flex h-[12rem] w-full flex-col px-1 md:px-4 ">
        <h2 className="px-4 text-base font-semibold text-darker dark:text-lighter md:text-xl">
          Recent Snippets
        </h2>
        <div className="flex w-full flex-col p-4 px-12">
          {/* <p className="">No Snippets created</p> */}
          <Link href="/snippets">
            <motion.button
              className="w-fit rounded-lg bg-brandDark py-2 px-4 font-medium text-darkest dark:text-lighter"
              whileHover={{ opacity: 0.8, scale: 1.05 }}
            >
              Create your first snippet
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[29.5rem] w-full flex-col px-1 md:px-4">
        <h2 className="px-4 text-base font-semibold text-darker dark:text-lighter md:text-xl">
          Recent Snippets
        </h2>
        <div className="no-scrollbar flex h-full w-full flex-row items-start gap-6 overflow-x-scroll rounded-xl p-4">
          {userData.snippets.slice(0, 7).map((snippet) => (
            <div className="h-[90%] w-64 flex-none" key={snippet.id}>
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
      <AnimatePresence>
        {snippetWindowOpen ? (
          <SnippetWindow
            setSnippetWindowOpen={setSnippetWindowOpen}
            startTimeSeconds={selectedSnippetData?.start}
            endTimeSeconds={selectedSnippetData?.end}
            existingSnippetData={selectedSnippetData}
            setSelectedSnippetData={setSelectedSnippetData}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default DashboardSnippetsSection;
