import {
  Box,
  Link,
  Stack,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks";

import type { Comment as CommentType } from "../../modules/comments/types";
import { UserData } from "../../modules/users/types";
import { getCurrentUser } from "../../modules/users/userSlice";
import { getBiggestTimeInterval } from "../../utils/utils";
import DeleteButton from "../DeleteButton";
import { Post } from "../../modules/posts/types";
import EditButton from "../EditButton";

interface Props {
  comment: CommentType;
  post: Post;
}

const Comment: React.FC<Props> = ({ comment, post }) => {
  const params = useParams();
  const curUser = useAppSelector(getCurrentUser);
  const { user, CreatedAt, UpdatedAt, ID } = comment;

  const { user: postUser, ID: postId } = post;

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
            {getBiggestTimeInterval(CreatedAt) === ""
              ? "0 seconds"
              : getBiggestTimeInterval(CreatedAt)}{" "}
            ago
            {CreatedAt !== UpdatedAt &&
              ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
            {postUser?.username === user.username && (
              <Chip
                sx={{ marginLeft: 2 }}
                label="OP"
                variant="outlined"
                color="primary"
                size="small"
              />
            )}
          </Typography>
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Box>
        {/* for ratings */}
        <Stack direction="row" spacing={2}>
          {curUser?.username === user.username && (
            <>
              <EditButton
                originalContent={comment.content}
                id={ID}
                postId={postId}
                isComment
              />
              <DeleteButton
                id={ID}
                isComment
                postId={parseInt(params.id as string)}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Comment;
