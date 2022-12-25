import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import { CommentsFromPostQuery, PostsQuery } from "../../api/PostsService";
import { useAppSelector } from "../../app/hooks";
import {
  getComments,
  getCommentsQueryParams,
  getPost,
  updateCommentsQueryParams,
} from "../../modules/post/postSlice";
import { Post } from "../../modules/posts/types";
import Filters from "../shared/Filters/Filters";
import Comment from "./Comment";

const Comments: React.FC = () => {
  const comments = useAppSelector(getComments);
  const post = useAppSelector(getPost);
  const { sort } = useAppSelector(getCommentsQueryParams);
  if (!post) return <CircularProgress />;

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography>Sort by</Typography>
        <Filters sort={sort} dispatchAction={updateCommentsQueryParams} />
      </Stack>

      <Stack direction="column" spacing={4}>
        {comments?.map((comment: any) => (
          <Comment key={comment.ID} comment={comment} />
        ))}
      </Stack>
    </>
  );
};

export default Comments;
