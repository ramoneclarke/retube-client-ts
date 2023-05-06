import React from "react";

const LinkInput = ({ inputText, setInputText }) => {
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  return (
    <div className="flex h-full w-5/6 overflow-hidden rounded-lg bg-lightest shadow-md dark:bg-slate-700">
      <input
        type="text"
        placeholder="Enter a Youtube URL"
        className="h-full w-full p-4 text-lg outline-none dark:bg-darker/50 dark:text-lighter "
        value={inputText}
        onChange={handleChange}
      />
    </div>
  );
};

export default LinkInput;
