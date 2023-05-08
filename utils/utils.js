import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn() {
  const inputs = Array.prototype.slice.call(arguments);
  return twMerge(clsx(inputs));
}

export const formatSummary = (text) => {
  const bulletPoints = text.split("- ").filter((point) => point.trim() !== "");
  return bulletPoints.map((point) => `- ${point.trim()}\n`).join("");
};

export const secondsToMinutes = (seconds) => {
  return Math.floor(seconds / 60);
};

export const formatDuration = (duration) => {
  let hours = Math.floor(duration / 3600);
  let minutes = Math.floor((duration % 3600) / 60);
  let seconds = duration % 60;
  let parts = [];

  if (hours > 0) {
    let hourText = hours === 1 ? "hour" : "hours";
    parts.push(`${hours} ${hourText}`);
  }

  if (minutes > 0) {
    let minuteText = minutes === 1 ? "minute" : "minutes";
    parts.push(`${minutes} ${minuteText}`);
  }

  if (seconds > 0 && hours === 0 && minutes === 0) {
    let secondText = seconds === 1 ? "second" : "seconds";
    parts.push(`${seconds} ${secondText}`);
  }

  return parts.join(" ");
};
