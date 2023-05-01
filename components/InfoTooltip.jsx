import { TooltipArrow } from "@radix-ui/react-tooltip";
import Link from "next/link";
import React from "react";
import { ImInfo } from "react-icons/im";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui-components/Tooltip";

const InfoTooltip = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link href="/account">
            <ImInfo className="cursor-pointer text-xl text-slate-400 dark:text-lighter" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="mr-2 bg-lightest text-darkest dark:border-darker dark:bg-dark dark:text-lightest">
          <TooltipArrow className="fill-lightest dark:fill-dark" />
          <p className="text-darkest dark:text-lighter">
            Drag the sliders to set the start and end times for your snippet
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
