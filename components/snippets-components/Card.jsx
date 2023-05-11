import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

const Card = ({
  snippet,
  text,
  title,
  videoId,
  setSelectedSnippetData,
  setSnippetWindowOpen,
}) => {
  const aspectRatio = 4 / 3;

  const handleClick = () => {
    setSelectedSnippetData(snippet);
    setSnippetWindowOpen(true);
  };

  return (
    <motion.div
      className="flex h-full w-full cursor-pointer flex-col items-center gap-2 rounded-xl bg-lightest p-4 shadow-lg dark:border dark:border-dark/20 dark:bg-slate-800"
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 },
      }}
      whileTap={{ scale: 1 }}
      onClick={handleClick}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <p className="font-medium text-darker line-clamp-1 dark:text-lighter">
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
      <div className="flex h-full w-full flex-col">
        <p className="text-dark line-clamp-5 dark:text-light">
          &quot;{text}&quot;
        </p>
      </div>
    </motion.div>
  );
};

export default Card;
