import { TooltipArrow } from "@radix-ui/react-tooltip";
import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui-components/Tooltip";

const UserAccountButton = () => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          {" "}
          <Link href="/account">
            <FaUserCircle className="cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]" />
          </Link>
        </TooltipTrigger>
        <TooltipContent className="mr-2 bg-lightest text-darkest dark:border-darker dark:bg-dark dark:text-lightest">
          <TooltipArrow className="fill-lightest dark:fill-dark" />
          <p>My Account</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UserAccountButton;
