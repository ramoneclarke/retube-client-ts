import React from "react";

const DashStatTile = ({ label, stat, text, icon }) => {
  return (
    <div className="flex h-full w-1/3 flex-col items-center gap-3 rounded-xl bg-lightest/50 p-8 pt-10 shadow-lg dark:bg-darker/70">
      <div className="flex flex-row gap-1">
        {icon}
        <p className="text-base font-medium text-darker dark:text-light">
          {label}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-5xl font-bold text-darker dark:text-mid">{stat}</p>
        <p className="text-base font-bold text-darker dark:text-mid">{text}</p>
      </div>
    </div>
  );
};

export default DashStatTile;
