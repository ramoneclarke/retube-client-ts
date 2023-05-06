import LinkActionButton from "../LinkActionButton";

const meta = {
  title: "Shared/LinkActionButton",
  component: LinkActionButton,
};

export default meta;

export const DesktopLinkActionButton = {
  args: {
    text: "Load Video",
    handleLoadVideo: null,
    inputText: "url",
  },
};

export const MobileLinkActionButton = {
  args: {
    text: "Load",
    handleLoadVideo: null,
    inputText: "url",
  },
};
