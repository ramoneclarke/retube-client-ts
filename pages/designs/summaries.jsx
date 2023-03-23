import Frame from "@/components/design/Frame";
import SummariesPageDesign from "@/components/design/SummariesPageDesign";
import Head from "next/head";
import React, { useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaRegHandScissors,
  FaSearchengin,
} from "react-icons/fa";

const SummariesPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <Frame
          navLinks={nav}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          ContentSection={SummariesPageDesign}
        />
      </main>
    </>
  );
};

const nav = [
  {
    text: "Home",
    icon: <FaHome size="1.3rem" className="text-brand" />,
  },
  {
    text: "Snippets",
    icon: <FaRegHandScissors size="1.3rem" className="text-brand" />,
  },
  {
    text: "Summaries",
    icon: <FaListAlt size="1.3rem" className="text-brand" />,
  },
  {
    text: "Search",
    icon: <FaSearchengin size="1.3rem" className="text-brand" />,
  },
];
export default SummariesPage;
