import React, { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useColorMode } from "@/context/ColorModeContext";

const SnippetSlider = ({
  endTimeSeconds,
  maxTimeSeconds,
  setStartTimeSeconds,
  setEndTimeSeconds,
  userData,
}) => {
  const { darkMode } = useColorMode();
  const snippetsMaxLength = userData?.subscription.plan.snippets_max_length;

  const [sliderColorLight, setSliderColorLight] = useState("e2e8f0"); //slate200
  const [sliderColorDark, setSliderColorDark] = useState("433E5A");

  const handleSliderChange = (v) => {
    if (v[1] - v[0] <= snippetsMaxLength) {
      setStartTimeSeconds(v[0]);
      setEndTimeSeconds(v[1]);
      setSliderColorLight("e2e8f0");
      setSliderColorDark("433E5A");
    } else {
      setSliderColorLight("f87171");
      setSliderColorDark("f87171");
    }
  };

  console.log("sliderColorLight = ", sliderColorLight);

  return (
    <Slider.Root
      className="relative flex h-[20px] w-4/5 touch-none select-none items-center"
      defaultValue={[0, endTimeSeconds]}
      onValueChange={(v) => handleSliderChange(v)}
      min={0}
      max={maxTimeSeconds}
      step={1}
      minStepsBetweenThumbs={1}
      aria-label="Volume"
    >
      <Slider.Track
        className={`rounded-full] relative h-2 flex-grow`}
        style={{
          backgroundColor: darkMode
            ? `#${sliderColorDark}`
            : `#${sliderColorLight}`,
        }}
      >
        <Slider.Range className="absolute h-full rounded-[9999px] bg-darker dark:bg-lighter" />
      </Slider.Track>
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg border-2 border-darker bg-lightest shadow-lg focus:shadow-lg focus:outline-none dark:border-light dark:bg-light" />
      <Slider.Thumb className="block h-5 w-5 cursor-grab rounded-lg border-2 border-darker bg-lightest shadow-lg focus:shadow-lg focus:outline-none dark:border-light dark:bg-light" />
    </Slider.Root>
  );
};

export default SnippetSlider;
