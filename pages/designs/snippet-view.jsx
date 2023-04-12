import Frame from "@/components/design/Frame";
import SnippetViewDesign from "@/components/design/SnippetViewDesign";
import Head from "next/head";
import React, { useState } from "react";

const SnippetViewPage = () => {
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
          ContentSection={SnippetViewDesign}
        />
      </main>
    </>
  );
};

export default SnippetViewPage;
