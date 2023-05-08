import React from "react";

const SummariesDetail = ({ label, stat }) => {
  return (
    <div className="flex h-full w-1/3 flex-col items-center justify-between gap-4 rounded-xl bg-lighter p-4 pt-6 shadow-lg dark:bg-darker/70 md:justify-start md:gap-6">
      <div className="flex h-1/4 flex-row items-center gap-1">
        <p className="text-center text-base font-medium text-slate-400 dark:text-slate-400">
          {label}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-center text-lg font-bold text-mid dark:text-mid md:text-3xl">
          {stat}
        </p>
        {/* <p className="text-base font-bold text-darker dark:text-mid">{text}</p> */}
      </div>
    </div>
  );
};

export default SummariesDetail;
