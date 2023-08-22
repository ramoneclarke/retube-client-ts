import { useQuery } from "@tanstack/react-query";

const { useSession } = require("next-auth/react");

export type UserDataSnippet = {
  id: number;
  text: string;
  video: {
    id: number;
    title: string;
    video_id: string;
    url: string;
  };
  start: string;
  end: string;
  date_created: string;
  owner: string;
};

export type UserDataSummary = {
  id: number;
  bullet_points: string;
  video: {
    id: number;
    title: string;
    video_id: string;
    url: string;
  };
  date_created: string;
  owner: string;
};

type UserDataSubscription = {
  id: number;
  user: string;
  plan: {
    id: number;
    name: string;
    stripe_product_id: string;
    snippets_monthly_limit: number;
    snippets_max_length: number;
    summaries_monthly_limit: number;
    summaries_max_video_length: number;
    search_max_playlists: number;
    search_max_playlist_videos: number;
    search_max_video_length: number;
    search_videos_limit?: number;
  };
  snippets_usage: number;
  summaries_usage: number;
  search_playlists_active: number;
  search_videos_used?: number;
  start_date: string;
  end_date: string | null;
  interval: string;
  stripe_subscription_id: string;
  stripe_customer_id: string;
  stripe_product_id: string;
};

export type UserData = {
  userId: string;
  username: string;
  email: string;
  snippets: UserDataSnippet[];
  summaries: UserDataSummary[];
  playlists: never[];
  subscription: UserDataSubscription;
};

export const getUserData = async (accessToken: string): Promise<UserData> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/api/user-data/`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Failed to fetch user data:",
      response.status,
      response.statusText
    );
  }
  const userData = await response.json();
  return userData;
};

export const useUserData = (initialUserData: UserData) => {
  const { data: session, update } = useSession();
  return useQuery(
    ["user-data"],
    async () => {
      await update(); // refresh the session
      return getUserData(session.accessToken);
    },
    {
      initialData: initialUserData,
    }
  );
};
