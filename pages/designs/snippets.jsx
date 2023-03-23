import Frame from "@/components/design/Frame";
import SnippetsPageDesign from "@/components/design/SnippetsPageDesign";
import Head from "next/head";
import React, { useState } from "react";
import {
  FaHome,
  FaListAlt,
  FaRegHandScissors,
  FaSearchengin,
} from "react-icons/fa";

const SnippetsPage = () => {
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
        {/* <div className="flex h-64 w-64 items-center justify-center bg-green-400">
            <p className="5text-4xl font-extrabold text-black">ReTube</p>
          </div> */}
        <Frame
          navLinks={nav}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
          ContentSection={SnippetsPageDesign}
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

export default SnippetsPage;
