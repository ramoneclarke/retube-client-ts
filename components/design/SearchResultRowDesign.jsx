import Image from "next/image";
import React from "react";

const SearchResultRowDesign = () => {
  return (
    <div className="flex h-32 w-full flex-row items-center gap-4 rounded-xl bg-lightest/50 p-4 shadow-lg dark:border dark:border-dark/20 dark:bg-darker/70">
      <div className="relative h-full w-36 overflow-hidden rounded-lg">
        <Image
          src={`https://img.youtube.com/vi/GZGBl4ez4RA/maxresdefault.jpg`}
          fill
          // sizes="(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 75vw"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          alt={`thumbnail`}
        />
        {/* <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
  <Image
    alt="Youtube play icon"
    src={YoutubePlayButton}
    style={{ width: "60px", height: "30px" }}
  />
</div> */}
      </div>
      <div className="flex h-full flex-1 flex-col">
        <p className="font-semibold text-darker line-clamp-1 dark:text-light">
          Tailwind in 100 Seconds ascasxascg ascascas sacascas
        </p>
        <p className="text-dark line-clamp-3 dark:text-gray-500">
          &quot;while at the same time following the rules of a design system
          that you don&apos;t get with plain CSS. It lives in the sweet spot
          between convention and configuration. However, it does produce some
          ugly-ass HTML. You&apos;ve got tons of hard-to-read duplicated class
          names here. As your UI grows in complexity, code duplication is
          inevitable. But you can avoid it by creating reusable components with
          your favorite JavaScript framework or by using the apply
          directory.&quot;
        </p>
      </div>
    </div>
  );
};

export default SearchResultRowDesign;
