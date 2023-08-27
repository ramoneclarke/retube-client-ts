export function formatTimeFromSeconds(seconds: number) {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  var formattedTime = "";

  if (hours > 0) {
    formattedTime += hours + ":";
  }

  if (minutes < 10) {
    formattedTime += "0" + minutes;
  } else {
    formattedTime += minutes;
  }

  formattedTime += ":";

  if (remainingSeconds < 10) {
    formattedTime += "0" + remainingSeconds;
  } else {
    formattedTime += remainingSeconds;
  }

  return formattedTime;
}
