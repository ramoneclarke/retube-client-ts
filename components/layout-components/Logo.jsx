import React from "react";

const Logo = () => {
  return (
    <div className="flex h-full w-fit flex-row items-center bg-lightest pl-4 dark:bg-darkest lg:w-1/5 lg:min-w-[16rem] lg:pl-8 ">
      <div className="text-3xl font-extrabold">
        <span className="text-darkest dark:text-lightest">Re</span>
        <span className="text-brand">Tube</span>
      </div>
    </div>
  );
};

export default Logo;
