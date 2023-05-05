import { TooltipArrow } from "@radix-ui/react-tooltip";
import React from "react";
import { ImInfo } from "react-icons/im";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui-components/Tooltip";

const InfoTooltip = ({ text }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <ImInfo className="cursor-pointer text-xl text-darker dark:text-lighter" />
        </TooltipTrigger>
        <TooltipContent className="mr-2 bg-lightest text-darkest dark:border-darker dark:bg-dark dark:text-lightest">
          <TooltipArrow className="fill-lightest dark:fill-dark" />
          <p className="text-darkest dark:text-lighter">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
