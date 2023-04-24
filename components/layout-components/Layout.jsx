import useMediaQuery from "@/hooks/useMediaQuery";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <div className="flex h-screen flex-col">
      <Toolbar
        setOpen={setOpen}
        menuClicked={menuClicked}
        setMenuClicked={setMenuClicked}
      />
      <div className="flex h-full flex-row overflow-hidden bg-lighter dark:bg-darkest">
        {/* main section*/}
        <Sidebar />
        <AnimatePresence>
          {isMobile && open ? (
            <MobileSidebar
              open={open}
              setOpen={setOpen}
              menuClicked={menuClicked}
              setMenuClicked={setMenuClicked}
            />
          ) : null}
        </AnimatePresence>
        <main className="flex max-h-full w-full flex-1 flex-col overflow-y-auto bg-lighter dark:bg-darkest lg:ml-[20%] lg:border-r lg:border-b lg:border-gray-700">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
