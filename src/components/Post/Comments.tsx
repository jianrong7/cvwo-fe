import { Stack } from "@mui/material";
import React from "react";
import type { Comment as CommentType } from "../../modules/comments/types";
import { Post } from "../../modules/posts/types";
import Comment from "./Comment";

interface Props {
  comments: CommentType[];
  post: Post;
}

const Comments: React.FC<Props> = ({ comments, post }) => {
  return (
    <Stack direction="column" spacing={4}>
      {comments?.map((comment) => (
        <Comment key={comment.ID} comment={comment} post={post} />
      ))}
    </Stack>
  );
};

export default Comments;
