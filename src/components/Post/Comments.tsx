import { Stack } from "@mui/material";
import React from "react";
import type { Comment as CommentType } from "../../modules/comments/types";
import Comment from "./Comment";

interface Props {
  comments: CommentType[];
}

const Comments: React.FC<Props> = ({ comments }) => {
  return (
    <Stack direction="column" spacing={4}>
      {comments?.map((comment) => (
        <Comment key={comment.ID} comment={comment} />
      ))}
    </Stack>
  );
};

export default Comments;
