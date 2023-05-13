import Link from "next/link";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui-components/DropdownMenu";
import { useColorMode } from "@/context/ColorModeContext";
import useMediaQuery from "@/hooks/useMediaQuery";
import { handleSignOut } from "@/utils/handlers";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { useRouter } from "next/router";

const UserAccountButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");
  const { darkMode } = useColorMode();
  const { data: session } = useRefetchingSession();

  const router = useRouter();

  if (isMobile) {
    return (
      <Link href="/account" className="no-tap-highlight">
        <FaUserCircle className="cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]" />
      </Link>
    );
  }

  return (
    <DropdownMenuRoot
      className={`${darkMode && "dark"}`}
      open={menuOpen}
      onOpenChange={() => console.log("onchange")}
    >
      <DropdownMenuTrigger
        className="focus:outline-none"
        onMouseOver={() => setMenuOpen(true)}
      >
        <FaUserCircle className="cursor-pointer text-[1.8rem] text-brand lg:text-[2rem]" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className={darkMode ? "bg-darker" : "bg-lightest"}
          sideOffset={5}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <Link href="/account">
            <DropdownMenuItem
              className={
                darkMode
                  ? "text-lighter hover:bg-dark"
                  : "text-darkest hover:bg-lighter"
              }
            >
              My Account
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator
            className={
              darkMode
                ? "mx-[10px] h-[0.2px] bg-slate-800"
                : "mx-[10px] h-[0.2px] bg-slate-200"
            }
          />
          <DropdownMenuItem
            className={
              darkMode
                ? "text-lighter hover:bg-dark"
                : "text-darkest hover:bg-lighter"
            }
            onClick={() => handleSignOut(session.refreshToken, router)}
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

export default UserAccountButton;
