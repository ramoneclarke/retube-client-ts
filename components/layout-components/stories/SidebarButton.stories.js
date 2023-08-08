import { FaHome } from "react-icons/fa";
import SidebarButton from "../SidebarButton";

const meta = {
  title: "Layout/SidebarButton",
  component: SidebarButton,
};

export default meta;

export const InactiveSidebarButton = {
  args: {
    link: {
      text: "Home",
      icon: <FaHome size="1.3rem" className="text-brand" />,
      path: "/",
    },
    darkMode: false,
    path: "/snippets",
  },
};

export const ActiveSidebarButton = {
  args: {
    link: {
      text: "Home",
      icon: <FaHome size="1.3rem" className="text-brand" />,
      path: "/",
    },
    darkMode: false,
    path: "/",
  },
};
