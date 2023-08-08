import Link from "next/link";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserIdentity = ({ session }) => {
  return (
    <Link
      href="/account"
      className="justify-left flex h-14 w-full cursor-pointer flex-row items-center gap-x-3 rounded-lg bg-lighter pl-3 no-underline  hover:shadow-sm dark:bg-darker"
    >
      <FaUserCircle className="text-[1.3rem] text-brand lg:text-[1.5rem]" />
      <div className="flex w-3/4 flex-col">
        <p className="text-sm font-medium text-darkest dark:text-lightest">
          {session?.user.name}
        </p>
        <p className="text-xs font-medium text-darkest line-clamp-1 dark:text-lightest">
          {session?.user.email}
        </p>
      </div>
    </Link>
  );
};

export default UserIdentity;
