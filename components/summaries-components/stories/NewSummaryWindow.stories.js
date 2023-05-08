import NewSummaryWindow from "../NewSummaryWindow";

const meta = {
  title: "Summaries/NewSummaryWindow",
  component: NewSummaryWindow,
};

export default meta;

export const DefaultNewSummaryWindow = {
  args: {
    summaryWindowOpen: true,
    setSummaryWindowOpen: null,
    summaryMutation: {
      data: {
        bullet_points:
          "- Tailwind is a collection of tiny CSS utility classes for building websites quickly.\n- It uses a functional approach by providing utility classes that can be composed together to build components.\n- Tailwind allows you to control things like color, shadows, and other properties, and apply them conditionally.\n- It lives in the sweet spot between convention and configuration, giving you more freedom over your creativity.\n- Tailwind produces some ugly HTML with duplicated class names, but you can avoid code duplication by creating reusable components with your favorite JS framework.\n- Tailwind has tooling that autocomplete its classes, and you can customize everything to build your own unique design system.\n- Tailwind weighs over 3500 kilobytes but automatically purges any unused utility when building for production, resulting in faster page loads.",
        date_created: "2023-05-06T19:19:03.767389Z",
        id: 2,
        owner: "test",
        video: {
          id: 5,
          title: "Tailwind in 100 Seconds",
          video_id: "mr15Xzb1Ook",
          url: "https://www.youtube.com/watch?v=mr15Xzb1Ook",
        },
      },
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
    },
    maxUsage: false,
    setMaxUsage: null,
    exceedsMaxLength: false,
    setExceedsMaxLength: null,
  },
};

export const MaxUsageNewSnippetWindow = {
  args: {
    summaryWindowOpen: true,
    setSummaryWindowOpen: null,
    maxUsage: true,
    exceedsMaxLength: false,
    setExceedsMaxLength: null,
  },
};

export const ErrorNewSnippetWindow = {
  args: {
    summaryWindowOpen: true,
    setSummaryWindowOpen: null,
    summaryMutation: {
      data: {
        bullet_points:
          "- Tailwind is a collection of tiny CSS utility classes for building websites quickly.\n- It uses a functional approach by providing utility classes that can be composed together to build components.\n- Tailwind allows you to control things like color, shadows, and other properties, and apply them conditionally.\n- It lives in the sweet spot between convention and configuration, giving you more freedom over your creativity.\n- Tailwind produces some ugly HTML with duplicated class names, but you can avoid code duplication by creating reusable components with your favorite JS framework.\n- Tailwind has tooling that autocomplete its classes, and you can customize everything to build your own unique design system.\n- Tailwind weighs over 3500 kilobytes but automatically purges any unused utility when building for production, resulting in faster page loads.",
        date_created: "2023-05-06T19:19:03.767389Z",
        id: 2,
        owner: "test",
        video: {
          id: 5,
          title: "Tailwind in 100 Seconds",
          video_id: "mr15Xzb1Ook",
          url: "https://www.youtube.com/watch?v=mr15Xzb1Ook",
        },
      },
      isLoading: false,
      isError: true,
      error: "Test error",
      isIdle: false,
    },
    maxUsage: false,
    setMaxUsage: null,
    exceedsMaxLength: false,
    setExceedsMaxLength: null,
  },
};

export const ExceedsMaxLengthSnippetWindow = {
  args: {
    summaryWindowOpen: true,
    setSummaryWindowOpen: null,
    summaryMutation: {
      data: {
        bullet_points:
          "- Tailwind is a collection of tiny CSS utility classes for building websites quickly.\n- It uses a functional approach by providing utility classes that can be composed together to build components.\n- Tailwind allows you to control things like color, shadows, and other properties, and apply them conditionally.\n- It lives in the sweet spot between convention and configuration, giving you more freedom over your creativity.\n- Tailwind produces some ugly HTML with duplicated class names, but you can avoid code duplication by creating reusable components with your favorite JS framework.\n- Tailwind has tooling that autocomplete its classes, and you can customize everything to build your own unique design system.\n- Tailwind weighs over 3500 kilobytes but automatically purges any unused utility when building for production, resulting in faster page loads.",
        date_created: "2023-05-06T19:19:03.767389Z",
        id: 2,
        owner: "test",
        video: {
          id: 5,
          title: "Tailwind in 100 Seconds",
          video_id: "mr15Xzb1Ook",
          url: "https://www.youtube.com/watch?v=mr15Xzb1Ook",
        },
      },
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
    },
    maxUsage: false,
    setMaxUsage: null,
    exceedsMaxLength: true,
    setExceedsMaxLength: null,
  },
};
