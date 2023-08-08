import React from "react";
import {
  FaHome,
  FaListAlt,
  FaRegHandScissors,
  FaSearchengin,
} from "react-icons/fa";
import SidebarButton from "./SidebarButton";
import UserIdentity from "./UserIdentity";

const Sidebar = ({ darkMode, path, session }) => {
  return (
    <div className="fixed hidden h-[calc(100vh-4rem)] min-h-[720px] w-1/5 min-w-[16rem] flex-col items-center justify-between bg-lightest pt-16 dark:bg-darkest lg:flex">
      <div className="flex w-full flex-col items-center gap-y-4">
        {navLinks.map((link) => (
          <SidebarButton
            link={link}
            key={link.text}
            darkMode={darkMode}
            path={path}
          />
        ))}
      </div>
      <div className="mb-4 flex w-full cursor-pointer flex-row items-center justify-start px-2">
        <UserIdentity session={session} />
      </div>
    </div>
  );
};

const navLinks = [
  {
    text: "Home",
    icon: <FaHome size="1.3rem" className="text-brand" />,
    path: "/",
  },
  {
    text: "Snippets",
    icon: <FaRegHandScissors size="1.3rem" className="text-brand" />,
    path: "/snippets",
  },
  {
    text: "Summaries",
    icon: <FaListAlt size="1.3rem" className="text-brand" />,
    path: "/summaries",
  },
  {
    text: "Search",
    icon: <FaSearchengin size="1.3rem" className="text-brand" />,
    path: "/search",
  },
];

export default Sidebar;
