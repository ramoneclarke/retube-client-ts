import SummariesDetails from "../SummariesDetails";

const meta = {
  title: "Summaries/SummariesDetails",
  component: SummariesDetails,
};

export default meta;

export const DesktopSummariesDetails = {
  args: {
    userData: {
      subscription: {
        plan: {
          summaries_monthly_limit: 100,
          summaries_max_video_length: 360,
        },
        summaries_usage: 5,
      },
      summaries: [],
    },
    isMobile: false,
  },
};

export const MobileSummariesDetails = {
  args: {
    userData: {
      subscription: {
        plan: {
          summaries_monthly_limit: 100,
          summaries_max_video_length: 360,
        },
        summaries_usage: 5,
      },
      summaries: [],
    },
    isMobile: true,
  },
};
