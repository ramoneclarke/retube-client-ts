import React from "react";
import {
  FaCog,
  FaUserCircle,
  FaMoon,
  FaRegMoon,
  FaRegSun,
} from "react-icons/fa";

const Frame = ({ navLinks, toggleDarkMode, darkMode, ContentSection }) => {
  return (
    <div className="flex h-screen flex-col">
      <nav className="flex h-20 flex-row items-center justify-between bg-lighter shadow-2xl dark:bg-darkest">
        {/* Top nav */}
        <div className="flex h-full w-1/5 flex-row items-center bg-lightest pl-8 dark:bg-darkest ">
          <div className="text-3xl font-extrabold">
            <span className="text-darkest dark:text-lightest">Re</span>
            <span className="text-brand">Tube</span>
          </div>
        </div>
        <div className="flex gap-6 pr-4">
          {darkMode ? (
            <FaRegMoon
              size="2rem"
              className="cursor-pointer text-brand"
              onClick={toggleDarkMode}
            />
          ) : (
            <FaRegSun
              size="2rem"
              className="cursor-pointer text-brand"
              onClick={toggleDarkMode}
            />
          )}
          <FaUserCircle size="2rem" className="cursor-pointer text-brand" />
        </div>
      </nav>
      <div className="flex h-full flex-row overflow-hidden">
        {/* main section*/}
        <div className="fixed flex h-[calc(100vh-4rem)] w-1/5 flex-col items-center justify-between bg-lightest pt-16 dark:bg-darkest">
          {/* sidebar */}
          <div className="flex w-full flex-col items-center gap-y-4">
            {navLinks.map((link) => (
              <div
                className="justify-left flex h-11 w-5/6 cursor-pointer flex-row items-center gap-x-3 rounded-lg pl-3  hover:bg-lighter dark:hover:bg-darker"
                style={{
                  backgroundColor:
                    link.text === "Home" && !darkMode && "#F5F5F5",
                }}
                key={link.text}
              >
                {/* Nav links */}
                {link.icon}
                <p className="text-base font-semibold text-darker dark:text-lightest">
                  {link.text}
                </p>
              </div>
            ))}
          </div>
          <div className="justify-left mb-4 flex h-11 w-5/6 cursor-pointer flex-row items-center gap-x-3 rounded-lg pl-3  hover:bg-lighter dark:hover:bg-dark">
            <FaCog size="1.3rem" className="text-brand" />
            <p className="text-base font-semibold text-darker dark:text-light">
              Settings
            </p>
          </div>
        </div>
        <div className="ml-[20%] flex max-h-full flex-1 flex-col overflow-y-auto border-r border-b border-gray-700 bg-lighter dark:bg-darkest">
          {/* content section */}
          <ContentSection />
        </div>
      </div>
    </div>
  );
};

export default Frame;
