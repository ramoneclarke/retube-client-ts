import { withAuth } from "@/utils/withAuth";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { extractVideoId } from "@/utils/handlers";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { useUserData } from "@/hooks/useUserData";
import useMediaQuery from "@/hooks/useMediaQuery";
import Layout from "../layout-components/Layout";
import LinkInput from "../Shared/LinkInput";
import LinkActionButton from "../Shared/LinkActionButton";
import SummariesDetails from "./SummariesDetails";
import RecentSummariesSection from "./RecentSummariesSection";
import NewSummaryWindow from "./NewSummaryWindow";
import SummaryWindow from "./SummaryWindow";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { GiCheckMark } from "react-icons/gi";

dayjs.extend(duration);

const SummariesPage = ({ initialUserData, initialSummaries }) => {
  const summariesMaxVideoLength =
    initialUserData.subscription.plan.summaries_max_video_length;
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [inputText, setInputText] = useState("");
  const [summaryWindowOpen, setSummaryWindowOpen] = useState(false);
  const [newSummaryWindowOpen, setNewSummaryWindowOpen] = useState(false);
  const [selectedSummaryData, setSelectedSummaryData] = useState(null);
  const [maxUsage, setMaxUsage] = useState(false);
  const [exceedsMaxLength, setExceedsMaxLength] = useState(false);

  const { data: session, update } = useRefetchingSession();

  const isMobile = useMediaQuery("(max-width: 1023px)");

  const { data: userData, refetch: refetchUserData } =
    useUserData(initialUserData);
  const summariesUsage = userData?.subscription.summaries_usage;
  const summariesMonthlyLimit =
    userData?.subscription.plan.summaries_monthly_limit;

  const { isLoading, data, isError, refetch } = useQuery(
    ["summaries"],
    () => getSummaries(session.accessToken),
    {
      initialData: initialSummaries,
      enabled: false,
    }
  );

  const summaryMutation = useMutation({
    mutationFn: (mutationArgs) => {
      const { id, token } = mutationArgs;
      return createSummary(id, token);
    },
    onSuccess: () => {
      try {
        update().then(() => {
          refetch();
          refetchUserData();
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  });

  const getYoutubeVideoDuration = async (videoId) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    const duration = data.items[0].contentDetails.duration;
    const durationSeconds = dayjs.duration(duration).asSeconds();
    return durationSeconds;
  };

  const handleLoadVideo = async (url) => {
    setVideoLoading(true);
    const id = extractVideoId(url);
    if (id === "Invalid YouTube URL") {
      alert("Please enter a valid YouTube URL");
      setVideoLoading(false);
    } else {
      setVideoId(id);
      try {
        const duration = await getYoutubeVideoDuration(id);
        setVideoDuration(duration);
        setVideoLoading(false);
      } catch {
        alert("Invalid YouTube URL. Please check the URL and try again.");
      }
    }
  };

  const handleSummarise = () => {
    if (summariesUsage >= summariesMonthlyLimit) {
      setMaxUsage(true);
      setNewSummaryWindowOpen(true);
    } else if (videoDuration > summariesMaxVideoLength) {
      setExceedsMaxLength(true);
      setNewSummaryWindowOpen(true);
    } else {
      if (videoId) {
        summaryMutation.mutate({
          id: videoId,
          token: session.accessToken,
        });
        setNewSummaryWindowOpen(true);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-4 flex h-auto w-full flex-col items-center gap-4 px-4 pb-12 md:mt-8 md:gap-8 md:px-8 md:pb-32 lg:mt-0 lg:gap-8 lg:px-0">
          <div className="flex h-12 w-full flex-row gap-2 md:gap-2 lg:h-16 lg:w-4/5 lg:gap-2">
            <LinkInput
              inputText={inputText}
              setInputText={setInputText}
              summary={true}
              setVideoDuration={setVideoDuration}
            />
            {videoDuration ? (
              <LinkActionButton
                text={isMobile ? <GiCheckMark /> : "Summarise"}
                handleLoadVideo={handleSummarise}
                inputText={inputText}
                summarise={true}
              />
            ) : (
              <LinkActionButton
                text={isMobile ? "Load" : "Load Video"}
                handleLoadVideo={handleLoadVideo}
                inputText={inputText}
              />
            )}
          </div>
          <SummariesDetails userData={userData} isMobile={isMobile} />
          <RecentSummariesSection
            data={data}
            setSummaryWindowOpen={setSummaryWindowOpen}
            setSelectedSummaryData={setSelectedSummaryData}
          />
          <AnimatePresence>
            {newSummaryWindowOpen ? (
              <NewSummaryWindow
                summaryWindowOpen={newSummaryWindowOpen}
                setSummaryWindowOpen={setNewSummaryWindowOpen}
                summaryMutation={summaryMutation}
                maxUsage={maxUsage}
                setMaxUsage={setMaxUsage}
                exceedsMaxLength={exceedsMaxLength}
                setExceedsMaxLength={setExceedsMaxLength}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {summaryWindowOpen ? (
              <SummaryWindow
                setSummaryWindowOpen={setSummaryWindowOpen}
                existingSummaryData={selectedSummaryData}
                setSelectedSummaryData={setSelectedSummaryData}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
};

const createSummary = async (videoId, token) => {
  const csrftoken = Cookies.get("csrftoken");
  const response = await fetch(
    `
        ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/video-summary/
        `,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({
        video_id: videoId,
      }),
    }
  );
  const data = await response.json();
  return data;
};

const getSummaries = async (token) => {
  try {
    const csrftoken = Cookies.get("csrftoken");
    const response = await fetch(
      `
            ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/video-summary/
            `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export default withAuth()(SummariesPage);
