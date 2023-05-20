import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const SummaryCard = ({
  summary,
  title,
  videoId,
  setSelectedSummaryData,
  setSummaryWindowOpen,
}) => {
  const aspectRatio = 4 / 3;

  const handleClick = () => {
    setSelectedSummaryData(summary);
    setSummaryWindowOpen(true);
  };

  return (
    <motion.div
      className="no-tap-highlight flex h-fit w-full cursor-pointer flex-col items-center justify-between gap-2 rounded-xl bg-lightest p-4 shadow-lg dark:border dark:border-dark/20 dark:bg-slate-800 "
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <div className="flex h-16 w-full flex-col items-center justify-center">
        <p className="text-base font-semibold text-darker line-clamp-2 dark:text-lighter">
          {title}
        </p>
      </div>
      <div
        className="relative h-0 w-full overflow-hidden rounded-3xl"
        style={{ paddingBottom: `${100 / aspectRatio}%` }}
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          fill
          // sizes="(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 75vw"
          style={{ objectFit: "cover" }}
          alt={`thumbnail`}
        />
      </div>
    </motion.div>
  );
};

export default SummaryCard;
