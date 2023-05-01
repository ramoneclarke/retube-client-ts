import { motion } from "framer-motion";
import React from "react";

const LinkActionButton = ({ text, handleLoadVideo, inputText }) => {
  return (
    <motion.button
      //   type="submit"
      className="h-full w-1/6 rounded-xl bg-violet-600 font-medium text-lightest shadow-md dark:bg-violet-600"
      onClick={() => handleLoadVideo(inputText)}
      whileTap={{
        scale: 0.9,
      }}
    >
      {text}
    </motion.button>
  );
};

export default LinkActionButton;
