import { motion } from "framer-motion";
import React from "react";

const LinkActionButton = ({ text, handleLoadVideo, inputText, summarise }) => {
  return (
    <motion.button
      //   type="submit"
      className="flex h-full w-1/6 items-center justify-center rounded-lg bg-violet-600 font-medium text-lightest shadow-md dark:bg-violet-600"
      onClick={() => handleLoadVideo(inputText)}
      whileTap={{
        scale: 0.9,
      }}
      animate={{ backgroundColor: summarise ? "#6EE7B7" : "#7c3aed" }}
    >
      {text}
    </motion.button>
  );
};

export default LinkActionButton;
