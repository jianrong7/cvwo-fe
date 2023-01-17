import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../app/hooks";
import { Comment as CommentType } from "../../modules/comments/types";
import {
  getComments,
  getCommentsQueryParams,
  getPost,
  updateCommentsQueryParams,
} from "../../modules/post/postSlice";
import Filters from "../shared/Filters/Filters";
import Comment from "./Comment";

const Comments: React.FC = () => {
  const comments = useAppSelector(getComments);
  const post = useAppSelector(getPost);
  const { sort } = useAppSelector(getCommentsQueryParams);
  if (!post) return <CircularProgress />;

  return (
    <>
      <Stack
        sx={{ flexDirection: { xs: "column", sm: "row" }, gap: 2 }}
        alignItems="center"
      >
        <Typography>Sort by</Typography>
        <Filters sort={sort} dispatchAction={updateCommentsQueryParams} />
      </Stack>

      <Stack direction="column" spacing={4}>
        {comments?.map((comment: CommentType) => (
          <Comment key={comment.ID} comment={comment} />
        ))}
      </Stack>
    </>
  );
};

export default Comments;
