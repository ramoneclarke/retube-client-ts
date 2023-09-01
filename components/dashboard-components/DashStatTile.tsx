import React from "react";
import { FaListAlt, FaRegHandScissors, FaSearchengin } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";

type DashStatTileProps = {
  label: string;
  stat: string;
  text: string;
  subscription?: {
    planName: string;
    renewalDate: string;
  };
  isLoadingUserData?: boolean;
};

const DashStatTile = ({
  label,
  stat,
  text,
  subscription,
  isLoadingUserData,
}: DashStatTileProps) => {
  let Icon;
  switch (label) {
    case "Snippets Usage":
      Icon = FaRegHandScissors;
      break;
    case "Summaries Usage":
      Icon = FaListAlt;
      break;
    case "Search Videos":
      Icon = FaSearchengin;
      break;
    default:
      Icon = FaRegHandScissors;
      break;
  }

  if (isLoadingUserData) {
    return (
      <div className="flex h-full w-1/3 flex-col items-center justify-center gap-3 rounded-xl bg-lightest/50 p-8 pt-10 shadow-lg dark:bg-darker/70">
        <PropagateLoader color="#6EE7B7" />
      </div>
    );
  }

  if (label === "Subscription") {
    return (
      <div className="flex h-full w-1/3 flex-col items-center gap-3 rounded-xl bg-lightest/50 p-8 pt-10 shadow-lg dark:bg-darker/70">
        <div className="flex flex-row gap-1">
          <Icon size="1.5rem" className="text-brand" />
          <p className="text-base font-semibold text-darker dark:text-light">
            {label}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-base font-medium text-darker dark:text-mid">
            Plan: {subscription?.planName}
          </p>
          <p className="text-base font-medium text-darker dark:text-mid">
            Renewal date: {subscription?.renewalDate}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-[30%] flex-col items-center gap-5 rounded-xl bg-lightest/50 p-8 pt-5 shadow-lg dark:bg-darker/70 md:w-[32%] md:p-4 md:pt-10 lg:w-1/3 lg:p-8">
      <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:gap-1">
        <Icon size="1.5rem" className="text-brand" />
        <p className="text-center text-base font-medium text-darker dark:text-light md:text-start">
          {label}
        </p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <p className="text-2xl font-bold text-dark dark:text-mid md:text-3xl lg:text-5xl">
          {stat}
        </p>
        <p className="hidden text-base font-semibold text-dark dark:text-mid md:block">
          {text}
        </p>
      </div>
    </div>
  );
};

export default DashStatTile;
