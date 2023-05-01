import SnippetsPage from "@/components/snippets-components/SnippetsPage";
import { useColorMode } from "@/context/ColorModeContext";
import Head from "next/head";
import React from "react";

const Snippets = () => {
  const { darkMode, toggleDarkMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Snippets - ReTube</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${darkMode && "dark"}`}>
        <SnippetsPage />
      </main>
    </>
  );
};

export default Snippets;
