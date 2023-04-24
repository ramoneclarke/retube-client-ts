import ColorModeButton from "../ColorModeButton";

const meta = {
  title: "Layout/ColorModeButton",
  component: ColorModeButton,
};

export default meta;

export const LightModeButton = {
  args: {
    darkMode: false,
  },
};

export const DarkModeButton = {
  args: {
    darkMode: true,
  },
};
