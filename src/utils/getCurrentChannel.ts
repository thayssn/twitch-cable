import { Show } from "@prisma/client";

export function getCurrentChannel(shows: Show[]): Show | undefined {
  if (!shows || !shows.length) return;
  return shows.reduce((acc, currentValue) => {
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours()}${currentDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const showIsOn: boolean =
      Number(currentTime) >= Number(currentValue.startTime.replace(":", ""));
    return showIsOn ? currentValue : acc;
  }, shows[0]);
}
