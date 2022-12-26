import { Box, CircularProgress, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { UserRatedQuery } from "../../api/UserService";
import { useAppSelector } from "../../app/hooks";
import { UserModel } from "../../modules/users/types";
import { getViewType } from "../../modules/users/userSlice";
import { extractUpvotesDownvotesPostsCommentsFromRatings } from "../../utils/utils";
import UserComments from "./UserComments";
import UserPosts from "./UserPosts";

export interface PayloadState {
  postIds: number[];
  commentIds: number[];
  userId: number;
}
interface Props {
  data: UserModel;
}

const MainContent: React.FC<Props> = ({ data }) => {
  const { posts, comments, ratings, ID } = data;

  const {
    upvotedCommentIds,
    downvotedCommentIds,
    upvotedPostIds,
    downvotedPostIds,
  } = extractUpvotesDownvotesPostsCommentsFromRatings(ratings);

  const [payload, setPayload] = useState<PayloadState>({
    postIds: upvotedPostIds,
    commentIds: upvotedCommentIds,
    userId: ID,
  });
  const { data: ratedData, isLoading, isFetching } = UserRatedQuery(payload);

  const viewType = useAppSelector(getViewType);

  useEffect(() => {
    if (viewType === "upvoted") {
      setPayload({
        postIds: upvotedPostIds,
        commentIds: upvotedCommentIds,
        userId: ID,
      });
    } else if (viewType === "downvoted") {
      setPayload({
        postIds: downvotedPostIds,
        commentIds: downvotedCommentIds,
        userId: ID,
      });
    }
    // eslint-disable-next-line
  }, [viewType]);

  if (isLoading || isFetching) return <CircularProgress />;

  const { comments: ratedComments, posts: ratedPosts } = ratedData;

  return (
    <Box sx={{ flex: 1, flexGrow: 3 }}>
      {viewType === "posts" ? (
        <UserPosts posts={posts} />
      ) : viewType === "comments" ? (
        <UserComments comments={comments} />
      ) : (
        <Stack spacing={4}>
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>
              Posts
            </Typography>
            <UserPosts posts={ratedPosts} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 20, fontWeight: 600, marginBottom: 2 }}>
              Comments
            </Typography>
            <UserComments comments={ratedComments} />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default MainContent;
