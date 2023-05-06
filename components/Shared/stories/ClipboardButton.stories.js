import ClipboardButton from "../ClipboardButton";

const meta = {
  title: "Shared/ClipboardButton",
  component: ClipboardButton,
};

export default meta;

export const DefaultClipboardButton = {
  args: {
    text: "Test snippet text",
    setCopied: null,
    copied: false,
    clipboardType: "Snippet",
  },
};

export const ClickedClipboardButton = {
  args: {
    text: "Test snippet text",
    setCopied: null,
    copied: true,
    clipboardType: "Snippet",
  },
};
