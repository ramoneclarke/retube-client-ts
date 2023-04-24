import { motion } from "framer-motion";
import React, { useEffect } from "react";
import {
  FaCog,
  FaHome,
  FaListAlt,
  FaRegHandScissors,
  FaSearchengin,
  FaUserCircle,
} from "react-icons/fa";
import { useClickOutside } from "react-click-outside-hook";
import SidebarButton from "./SidebarButton";

const MobileSidebar = ({ open, setOpen, menuClicked, setMenuClicked }) => {
  const [ref, hasClickedOutside] = useClickOutside();

  useEffect(() => {
    if (open && hasClickedOutside && ref.current) {
      setOpen(false);
    }
    if (menuClicked) {
      setMenuClicked(false);
    }
  }, [hasClickedOutside, open, setOpen, ref, menuClicked, setMenuClicked]);

  return (
    <motion.div
      className="z-10 flex h-[calc(100vh-4rem)] w-2/3 flex-col items-center justify-between bg-lightest pt-16 dark:bg-darkest lg:hidden"
      initial={{ x: -800 }}
      animate={{
        x: 0,
      }}
      exit={{ x: -800 }}
      transition={{ duration: 0.3, type: "tween" }}
      ref={ref}
    >
      <div className="flex w-full flex-col items-center gap-y-4">
        {navLinks.map((link) => (
          <SidebarButton link={link} key={link.text} />
        ))}
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="justify-left mb-4 flex h-11 w-5/6 cursor-pointer flex-row items-center gap-x-3 rounded-lg pl-3  hover:bg-lighter dark:hover:bg-dark">
          <SidebarButton
            link={{
              text: "Account",
              icon: <FaUserCircle size="1.3rem" className="text-brand" />,
              path: "/account",
            }}
          />
        </div>
        <div className="justify-left mb-4 flex h-11 w-5/6 cursor-pointer flex-row items-center gap-x-3 rounded-lg pl-3  hover:bg-lighter dark:hover:bg-dark">
          <SidebarButton
            link={{
              text: "Settings",
              icon: <FaCog size="1.3rem" className="text-brand" />,
              path: "/settings",
            }}
          />
        </div>
      </div>
    </motion.div>
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
export default MobileSidebar;
