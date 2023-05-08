import { withAuth } from "@/utils/withAuth";
import React, { useState } from "react";
import YouTube from "react-youtube";
import Layout from "../layout-components/Layout";
import LinkInput from "../Shared/LinkInput";
import RecentSnippetsSection from "./RecentSnippetsSection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { extractVideoId } from "@/utils/handlers";
import Cookies from "js-cookie";
import { AnimatePresence } from "framer-motion";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import NewSnippetWindow from "./NewSnippetWindow";
import SnippetWindow from "./SnippetWindow";
import { useDebounce } from "@/hooks/useDebounce";
import { useUserData } from "@/hooks/useUserData";
import useMediaQuery from "@/hooks/useMediaQuery";
import SnippetsControls from "./SnippetsControls";
import LinkActionButton from "../Shared/LinkActionButton";

const SnippetsPage = ({ initialUserData, initialSnippets }) => {
  const snippetsMaxLength =
    initialUserData.subscription.plan.snippets_max_length;
  const defaultEndTime = snippetsMaxLength > 60 ? 60 : snippetsMaxLength;
  const [startTimeSeconds, setStartTimeSeconds] = useState(0);
  const [endTimeSeconds, setEndTimeSeconds] = useState(defaultEndTime);
  const debouncedStartTimeSeconds = useDebounce(startTimeSeconds, 1000);
  const debouncedEndTimeSeconds = useDebounce(endTimeSeconds, 1000);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoId, setVideoId] = useState("");
  const [inputText, setInputText] = useState("");
  const [snippetWindowOpen, setSnippetWindowOpen] = useState(false);
  const [newSnippetWindowOpen, setNewSnippetWindowOpen] = useState(false);
  const [selectedSnippetData, setSelectedSnippetData] = useState(null);
  const [maxUsage, setMaxUsage] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1023px)");

  const { data: session, update } = useRefetchingSession();

  const { data: userData, refetch: refetchUserData } =
    useUserData(initialUserData);

  const { isLoading, data, isError, refetch } = useQuery(
    ["snippets"],
    () => getSnippets(session.accessToken),
    {
      initialData: initialSnippets,
      enabled: false,
    }
  );

  const snippetMutation = useMutation({
    mutationFn: (mutationArgs) => {
      const { id, start, end, token } = mutationArgs;
      return createSnippet(id, start, end, token);
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

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      start: debouncedStartTimeSeconds,
      end: debouncedEndTimeSeconds,
      fs: 0,
    },
  };

  console.log(debouncedStartTimeSeconds);

  const setEndTimeToDuration = (e) => {
    const duration = e.target.getDuration();
    // setEndTimeSeconds(duration - 1);
    setEndTimeSeconds(defaultEndTime);
    setVideoDuration(duration - 1);
  };

  const handleLoadVideo = (url) => {
    const id = extractVideoId(url);
    if (id === "Invalid YouTube URL") {
      alert("Please enter a valid YouTube URL");
    } else {
      setVideoId(id);
    }
  };

  return (
    <>
      <Layout>
        <div className="mt-4 flex h-auto w-full flex-col items-center gap-0 px-4 pb-32 md:gap-4 md:px-8 lg:mt-0 lg:gap-8 lg:px-0">
          <div className="flex h-12 w-full flex-row gap-2 lg:h-16 lg:w-4/5">
            <LinkInput inputText={inputText} setInputText={setInputText} />
            <LinkActionButton
              text={isMobile ? "Load" : "Load Video"}
              handleLoadVideo={handleLoadVideo}
              inputText={inputText}
            />
          </div>
          <div className="my-4 flex h-[50vh] w-full items-center justify-center md:h-[30vh] lg:my-0 lg:h-fit lg:min-h-[22.5rem]">
            {videoId === "" ? (
              <div className="relative flex h-full w-3/4 items-center justify-center overflow-hidden rounded-lg bg-gray-200 shadow-md dark:bg-darker lg:h-80 lg:w-2/3">
                <div className="h-fit w-fit text-xl font-normal text-gray-400">
                  {/* <Image src={YoutubePlayButton} alt="youtube play logo" /> */}
                  No video loaded
                </div>
              </div>
            ) : (
              <div className="flex h-fit w-fit scale-75 items-center justify-center overflow-hidden rounded-lg md:w-auto md:scale-100 lg:w-auto lg:scale-100">
                <YouTube
                  videoId={videoId}
                  opts={opts}
                  className="flex items-center overflow-hidden rounded-2xl md:rounded-none lg:rounded-none"
                  onReady={(e) => setEndTimeToDuration(e)}
                  // style={{ width: "100%", height: "100%" }}
                />
              </div>
            )}
          </div>
          <SnippetsControls
            startTimeSeconds={startTimeSeconds}
            endTimeSeconds={endTimeSeconds}
            setStartTimeSeconds={setStartTimeSeconds}
            setEndTimeSeconds={setEndTimeSeconds}
            videoDuration={videoDuration}
            videoId={videoId}
            snippetMutation={snippetMutation}
            setNewSnippetWindowOpen={setNewSnippetWindowOpen}
            userData={userData}
            setMaxUsage={setMaxUsage}
          />
          <RecentSnippetsSection
            data={data}
            setSnippetWindowOpen={setSnippetWindowOpen}
            setSelectedSnippetData={setSelectedSnippetData}
          />
          <AnimatePresence>
            {newSnippetWindowOpen ? (
              <NewSnippetWindow
                snippetWindowOpen={newSnippetWindowOpen}
                setSnippetWindowOpen={setNewSnippetWindowOpen}
                snippetMutation={snippetMutation}
                startTimeSeconds={startTimeSeconds}
                endTimeSeconds={endTimeSeconds}
                maxUsage={maxUsage}
                setMaxUsage={setMaxUsage}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence>
            {snippetWindowOpen ? (
              <SnippetWindow
                setSnippetWindowOpen={setSnippetWindowOpen}
                startTimeSeconds={startTimeSeconds}
                endTimeSeconds={endTimeSeconds}
                existingSnippetData={selectedSnippetData}
                setSelectedSnippetData={setSelectedSnippetData}
              />
            ) : null}
          </AnimatePresence>
        </div>
      </Layout>
    </>
  );
};

const createSnippet = async (videoId, start, end, token) => {
  const csrftoken = Cookies.get("csrftoken");
  const response = await fetch(
    `
        ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/text-snippet/
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
        start: start,
        end: end,
      }),
    }
  );
  const data = await response.json();
  return data;
};

const getSnippets = async (token) => {
  try {
    const csrftoken = Cookies.get("csrftoken");
    const response = await fetch(
      `
          ${process.env.NEXT_PUBLIC_BACKEND_API_BASE}/tools/text-snippet/
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
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};

export default withAuth()(SnippetsPage);
