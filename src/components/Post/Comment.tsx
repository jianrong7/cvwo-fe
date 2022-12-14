import { Box, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import type { Comment as CommentType } from "../../modules/comments/types";
import { getBiggestTimeInterval } from "../../utils/utils";

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
  console.log(comment);
  const { user, CreatedAt, UpdatedAt } = comment;
  return (
    <Box sx={{ paddingX: 2, borderLeft: "1px solid rgba(0,0,0,0.23)" }}>
      <Stack direction="column">
        <Stack direction="row">
          <Typography sx={{ fontSize: 12 }}>
            Posted by{" "}
            <Link component={RouterLink} to={`/user/${user.ID}`}>
              {user.username}
            </Link>
            {" · "}
            {getBiggestTimeInterval(CreatedAt)} ago
            {CreatedAt !== UpdatedAt &&
              ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
          </Typography>
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Box>

        {/* <Stack direction="row"></Stack>  for ratings*/}
      </Stack>
    </Box>
  );
};

export default Comment;
