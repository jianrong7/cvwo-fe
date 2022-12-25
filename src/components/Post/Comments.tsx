import { Stack, Typography } from "@mui/material";
import React from "react";
import { PostsQuery } from "../../api/PostsService";
import { useAppSelector } from "../../app/hooks";
import { getComments } from "../../modules/post/postSlice";
import { Post } from "../../modules/posts/types";
import Filters from "../Home/Filters";
import Comment from "./Comment";

const Comments: React.FC = () => {
  const comments = useAppSelector(getComments);
  const { data, isSuccess, isFetching, isLoading, refetch } = PostsQuery();
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography>Sort by</Typography>
        <Filters refetch={refetch} />
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
