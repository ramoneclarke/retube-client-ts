import { useColorMode } from "@/context/ColorModeContext";
import { motion } from "framer-motion";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";

const ClipboardButton = ({ text, setCopied, copied, clipboardType }) => {
  const { darkMode } = useColorMode();
  const handleCopyClick = () => {
    setCopied(true);
    // Set timeout to change copied back to false after 3 seconds (3000ms)
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const defaultColor = darkMode ? "#FFFFFF" : "#000000";

  return (
    <CopyToClipboard text={text} onCopy={handleCopyClick}>
      <motion.button
        className="flex w-52 flex-row items-center justify-center gap-1 rounded-xl border-2 border-darker p-2 font-semibold dark:border-lighter"
        animate={{
          color: copied ? "#6EE7B7" : defaultColor,
          borderColor: copied ? "#6EE7B7" : defaultColor,
        }}
        whileTap={{ scale: 0.9 }}
      >
        {copied ? (
          <>
            <BsClipboardCheck className="text-xl" />{" "}
            <span>Copied {clipboardType}</span>
          </>
        ) : (
          <>
            <BsClipboard className="text-xl" />{" "}
            <span>Copy {clipboardType}</span>
          </>
        )}
      </motion.button>
    </CopyToClipboard>
  );
};

export default ClipboardButton;
