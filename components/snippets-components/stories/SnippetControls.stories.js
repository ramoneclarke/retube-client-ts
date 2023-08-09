import SnippetsControls from "../SnippetsControls";

const meta = {
  title: "Snippets/SnippetsControls",
  component: SnippetsControls,
};

export default meta;

export const DefaultSnippetContols = {
  args: {
    session: null,
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
    setStartTimeSeconds: null,
    setEndTimeSeconds: null,
    videoDuration: 300,
    videoId: "v=KfSSplX2Lpk",
    setNewSnippetWindowOpen: null,
    userData: {
      userId: "00000000000000000000000",
      username: "test",
      email: "test@googlemail.com",
      subscription: {
        id: 1,
        user: "00000000000000000000000",
        plan: {
          id: 3,
          name: "premium",
          snippets_monthly_limit: 300,
          snippets_max_length: 300,
          summaries_monthly_limit: 100,
          summaries_max_video_length: 3600,
          search_max_playlists: 10,
          search_max_playlist_videos: 30,
          search_max_video_length: 3600,
        },
        snippets_usage: 35,
        summaries_usage: 0,
        search_playlists_active: 0,
      },
    },
    setMaxUsage: null,
  },
};
