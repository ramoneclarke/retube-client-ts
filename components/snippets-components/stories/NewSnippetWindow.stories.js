import NewSnippetWindow from "../NewSnippetWindow";

const meta = {
  title: "Layout/NewSnippetWindow",
  component: NewSnippetWindow,
};

export default meta;

export const DefaultNewSnippetWindow = {
  args: {
    snippetWindowOpen: true,
    snippetMutation: {
      data: {
        id: 1,
        text: "Test snippet",
        video: {
          id: 4,
          title:
            "3 Patterns for Great Business Ideas with Jack Abraham, Founder, Managing Partner & CEO at Atomic",
          video_id: "YCq6RjGi-qA",
          url: "https://www.youtube.com/watch?v=YCq6RjGi-qA",
        },
        date_created: "2023-05-05T17:28:06.848795Z",
        owner: "test",
      },
      isLoading: false,
      isError: false,
      error: null,
      isIdle: false,
    },
    startTimeSeconds: 0,
    endTimeSeconds: 60,
    maxUsage: false,
  },
};

export const MaxUsageNewSnippetWindow = {
  args: {
    snippetWindowOpen: true,
    startTimeSeconds: 0,
    endTimeSeconds: 60,
    maxUsage: true,
  },
};

export const ErrorNewSnippetWindow = {
  args: {
    snippetWindowOpen: true,
    snippetMutation: {
      data: {
        id: 1,
        text: "Test snippet",
        video: {
          id: 4,
          title:
            "3 Patterns for Great Business Ideas with Jack Abraham, Founder, Managing Partner & CEO at Atomic",
          video_id: "YCq6RjGi-qA",
          url: "https://www.youtube.com/watch?v=YCq6RjGi-qA",
        },
        date_created: "2023-05-05T17:28:06.848795Z",
        owner: "test",
      },
      isLoading: false,
      isError: true,
      error: "Test error",
      isIdle: false,
    },
    startTimeSeconds: 0,
    endTimeSeconds: 60,
    maxUsage: false,
  },
};
