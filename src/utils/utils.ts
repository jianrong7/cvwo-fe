import { formatDuration, intervalToDuration } from "date-fns";
import { Rating } from "../modules/ratings/types";

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

export const extractUpvotesDownvotesPostsCommentsFromRatings = (
  ratings: Rating[]
) => {
  const upvotedCommentIds = ratings
    .filter((x: Rating) => x.value === 1 && x.entryType === "comment")
    .map((x) => x.ID);

  const downvotedCommentIds = ratings
    .filter((x: Rating) => x.value === -1 && x.entryType === "comment")
    .map((x) => x.ID);

  const upvotedPostIds = ratings
    .filter((x: Rating) => x.value === 1 && x.entryType === "post")
    .map((x) => x.ID);

  const downvotedPostIds = ratings
    .filter((x: Rating) => x.value === -1 && x.entryType === "post")
    .map((x) => x.ID);

  return {
    upvotedCommentIds,
    downvotedCommentIds,
    upvotedPostIds,
    downvotedPostIds,
  };
};
