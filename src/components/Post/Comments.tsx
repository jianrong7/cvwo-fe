import { Stack, Typography } from "@mui/material";
import React from "react";
import { PostsQuery } from "../../api/PostsService";
import type { Comment as CommentType } from "../../modules/comments/types";
import { Post } from "../../modules/posts/types";
import FilterButton from "../FilterButton";
import Filters from "../Home/Filters";
import Comment from "./Comment";

interface Props {
  comments: CommentType[];
  post: Post;
}

const Comments: React.FC<Props> = ({ comments, post }) => {
  const { data, isSuccess, isFetching, isLoading, refetch } = PostsQuery();
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Typography>Sort by</Typography>
        <Filters refetch={refetch} />
      </Stack>

      <Stack direction="column" spacing={4}>
        {comments?.map((comment) => (
          <Comment key={comment.ID} comment={comment} post={post} />
        ))}
      </Stack>
    </>
  );
};

export default Comments;
