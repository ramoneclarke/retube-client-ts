import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex w-fit flex-row items-center">
      <div className="text-3xl font-extrabold">
        <span className="text-darkest dark:text-lightest">Re</span>
        <span className="text-brand">Tube</span>
      </div>
    </Link>
  );
};

export default Logo;
