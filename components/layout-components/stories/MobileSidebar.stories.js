import MobileSidebar from "../MobileSidebar";

const meta = {
  title: "Layout/MobileSidebar",
  component: MobileSidebar,
};

export default meta;

export const OpenMobileSidebar = {
  args: {
    open: true,
    setOpen: null,
    menuClicked: false,
    setMenuClicked: null,
  },
};
