import React from "react";

const LinkInput = ({ inputText, setInputText, summary, setVideoDuration }) => {
  const handleChange = (e) => {
    setInputText(e.target.value);
    if (summary) {
      setVideoDuration(0);
    }
  };
  return (
    <div className="flex h-full w-5/6 max-w-3xl overflow-hidden rounded-lg bg-lightest shadow-md dark:bg-slate-700">
      <input
        type="text"
        placeholder="Enter a Youtube URL"
        className="h-full w-full bg-lightest p-4 text-base outline-none dark:bg-darker/50 dark:text-lighter "
        value={inputText}
        onChange={handleChange}
      />
    </div>
  );
};

export default LinkInput;
