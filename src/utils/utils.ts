import { formatDuration, intervalToDuration } from "date-fns";

export const getBiggestTimeInterval = (start: string | Date) => {
  const duration = intervalToDuration({
    start: new Date(start),
    end: new Date(),
  });
  const formattedDuration = formatDuration(duration, {
    delimiter: ", ",
  });
  return formattedDuration.split(",")[0];
};
