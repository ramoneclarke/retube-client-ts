import LinkActionButton from "@/components/Shared/LinkActionButton";

const meta = {
  title: "Summaries/LinkActionButton",
  component: LinkActionButton,
};

export default meta;

export const SummariseLinkActionButton = {
  args: {
    text: "Summarise",
    handleLoadVideo: null,
    inputText: "url",
    summarise: true,
  },
};
